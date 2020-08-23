import React, { useState, useEffect } from 'react';

import { connect, useDispatch } from 'react-redux';

import { MdClose } from 'react-icons/md';

import api from '../../Services/api';

import { pointMask } from '../../Utils/mask'

import {
    Container,
    ModalContainer,
    InternContainer,
    CloseButton,
    ButtonContainer,
    SaleButton,
    FlexContainer
} from './styles';

function Sale(props){
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(1);
    const [item, setItem] = useState({});
    const [value, setValue] = useState();

    useEffect(() => {
        requestItem();
    }, [])

    const requestItem = async () => {
        await api.get(`/product/${props.id}`).then(resp => {
            setItem(resp.data[0]);
            setValue(parseFloat(pointMask(resp.data[0].value)))
        }).catch(err => {
            alert(err.response);
        });
    }

    const closeModal = () => {
        dispatch({
            type: 'MODAL_CLOSE'
        })
    }

    const sale = async () => {
        const info = {
            amount: parseInt(amount)
        }
        await api.post(`/sale/${props.id}`, info).then(resp => {
            alert('Compra realizada com sucesso!');
            closeModal();
        }).catch(err => {
            alert(err.response.data.message);
        });
    }

    return(
        <>
            {
                props.modalOpen ? (
                    <Container>
                        <ModalContainer>
                            <InternContainer>
                                <CloseButton
                                    onClick={() => closeModal()}
                                >
                                    <button>
                                        <MdClose
                                            color='#000'  
                                            size={25} 
                                        />
                                    </button>
                                </CloseButton>

                                <FlexContainer>
                                    <h2>{item.name}</h2>
                                    <h1>Valor Total</h1>
                                    <p>R$ {amount * value}</p>
                                    <p>Valor Unitario: {item.value}</p>
                                    <input
                                        value={amount}
                                        onChange={e => setAmount(e.target.value)}
                                        type='number'
                                    />
                                </FlexContainer>

                                <ButtonContainer>
                                    <SaleButton
                                        onClick={() => sale()}
                                    >
                                        Realizar Compra!
                                    </SaleButton>
                                </ButtonContainer>
                            </InternContainer>
                        </ModalContainer>
                    </Container>
                ) : (
                    null
                )
            }
        </>
    )
}

const mapStateToProps = state => ({
    modalOpen: state.modal[0],
    id: state.modal[1]
});

export default connect(mapStateToProps)(Sale)