import React, { useState, useEffect } from 'react';

import { connect, useDispatch } from 'react-redux';

import { IoIosSearch } from 'react-icons/io';
import { AiFillEdit } from 'react-icons/ai';

import api from '../../Services/api';

import Sale from '../Sale/sale';
import Edit from '../Edit/edit';

import {
    Container,
    Menu,
    SearchCamp,
    Card,
    Divisor,
    CardContainer,
    EditButton
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
    }, [filter, props.modalOpen, props.edit])

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
    
    const editItem = (id) => {
        dispatch({
            type: 'EDIT',
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
                                <EditButton
                                    onClick={() => editItem(item.id)}
                                >
                                    <button>
                                        <AiFillEdit
                                            color='#000'  
                                            size={25} 
                                        />
                                    </button>
                                </EditButton>
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
            {
                props.edit ? (
                    <Edit/>
                ) : (
                    null
                )
            }
        </>
    )
}
const mapStateToProps = state => ({
    modalOpen: state.modal[0],
    edit: state.edit[0]
});

export default connect(mapStateToProps)(Home)