import React, { useState, useEffect } from 'react';

import { connect, useDispatch } from 'react-redux';

import { MdClose } from 'react-icons/md';

import api from '../../Services/api';

import { coinMask, numMask } from '../../Utils/mask';

import {
    Container,
    ModalContainer,
    InternContainer,
    CloseButton,
    ButtonContainer,
    SaleButton,
    FlexContainer
} from './styles';

function Edit(props){
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(1);
    const [name, setName] = useState({});
    const [value, setValue] = useState();

    useEffect(() => {
        requestItem();
    }, [])

    const requestItem = async () => {
        await api.get(`/product/${props.id}`).then(resp => {
            setName(resp.data[0].name);
            setValue(resp.data[0].value)
            setAmount(resp.data[0].amount)
        }).catch(err => {
            console.log(err.response);
        });
    }

    const closeModal = () => {
        dispatch({
            type: 'EDIT_CLOSE'
        })
    }

    const att = async () => {
        const info = {
            name,
            value: parseFloat(value),
            amount: parseInt(amount)
        }
        await api.put(`/product/${props.id}`, info).then(resp => {
            alert('Atualização realizada com sucesso!');
            closeModal();
        }).catch(err => {
            alert(err.response.data.message);
            console.log(err.response)
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
                                    <label>Nome do Produto</label>
                                    <input
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                    <label>Estoque</label>
                                    <input
                                        value={amount}
                                        onChange={e => setAmount(numMask(e.target.value))}
                                        type='number'
                                    />
                                    <label>Preço do Produto</label>
                                    <input
                                        value={value}
                                        onChange={e => setValue(coinMask(e.target.value))}
                                    />
                                    
                                </FlexContainer>

                                <ButtonContainer>
                                    <SaleButton
                                        onClick={() => att()}
                                    >
                                        Atualizar!
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
    modalOpen: state.edit[0],
    id: state.edit[1]
});

export default connect(mapStateToProps)(Edit)