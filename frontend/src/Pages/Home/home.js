import React, { useState, useEffect } from 'react';

import { connect, useDispatch } from 'react-redux';

import { IoIosSearch } from 'react-icons/io';

import api from '../../Services/api';

import Sale from '../Sale/sale';

import {
    Container,
    Menu,
    SearchCamp,
    Card,
    Divisor,
    CardContainer
} from './styles';

function Home(props){
    const dispatch = useDispatch();
    const [itens, setItens] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        userLogged();
        if(!filter) {
            requestItens();
        }
        else {
            filterItens();
        }
    }, [filter, props.modalOpen])

    const userLogged = () => {
        const token = localStorage.getItem('inhalt-token');

        if(token) {
            api.defaults.headers.authorization = `Bearer ${token}`;
        }
    }

    const requestItens = async () => {
        await api.get('/product').then(resp => {
            setItens(resp.data);
        }).catch(err => {
            alert(err.response);
        })
    }
    
    const filterItens = async () => {
        const info = {
            name: filter
        }
        console.log(info);
        await api.post('/filter', info).then(resp => {
            setItens(resp.data);
        }).catch(err => {
            alert(err.response.data.errors.name[0]);
        })
    }

    const saleItem = (id) => {
        dispatch({
            type: 'MODAL',
            id
        })
    }

    return(
        <>
            <Container>
                <Menu>
                    <SearchCamp>
                        <div>
                            <span>
                                <IoIosSearch 
                                    size='25px'
                                />
                            </span>
                        </div>
                        <input 
                            onChange={e => setFilter(e.target.value)}
                            placeholder='Digite o nome do produto'
                        />
                        <button
                            onClick={() => filterItens()}
                        >Buscar</button>
                    </SearchCamp>
                </Menu>

                <CardContainer>
                    {
                        itens.map(item => 
                            <Card key={item.id}>
                                <h5>{item.name}</h5>
                                <Divisor>
                                    <div>
                                        <p>Quantidade em estoque: {item.amount}</p>
                                        <p>Preço Unitario: R$ {item.value}</p>
                                    </div>

                                    <button
                                        onClick={() => saleItem(item.id)}
                                    >
                                        Comprar
                                    </button>
                                </Divisor>
                            </Card>
                        )
                    }
                </CardContainer>
            </Container>

            {
                props.modalOpen ? (
                    <Sale/>
                ) : (
                    null
                )
            }
        </>
    )
}
const mapStateToProps = state => ({
    modalOpen: state.modal[0]
});

export default connect(mapStateToProps)(Home)