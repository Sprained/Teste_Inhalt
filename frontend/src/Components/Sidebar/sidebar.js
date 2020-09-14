import React from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FaHome } from 'react-icons/fa';
import { AiFillCalendar, AiFillProfile } from 'react-icons/ai';
import { GiExitDoor } from 'react-icons/gi';
import { RiUserAddFill, RiFileAddFill } from 'react-icons/ri';
import { SiBrandfolder } from 'react-icons/si';

import {
    Container,
    MenuContainer
} from './styles';

import api from '../../Services/api';

export default function Sidebar(){
    const history = useHistory();

    const singOut = () => {
        localStorage.removeItem('inhalt-token');

        history.push('/');

        window.location.reload(); 
    }

    const report = async () => {
        await api.get('/sale').then(resp => {
            window.open(resp.data);
            console.log(resp.data)
        }).catch(err => {
            console.log(err.response)
        })
    }

    return(
        <Container>
            <MenuContainer>
                {/* <Link> */}
                    <li onClick={() => history.push('/home')}>
                        <FaHome color='#424242' size={20}/>
                        Home
                    </li>
                    <li>
                        <AiFillCalendar color='#424242' size={20}/>
                        Relatório
                    </li>
                    <li onClick={() => history.push('/provider')}>
                        <AiFillProfile color='#424242' size={20}/>
                        Novo Fornecedor
                    </li>
                    <li onClick={() => history.push('/brand')}>
                        <SiBrandfolder color='#424242' size={20}/>
                        Nova Marca
                    </li>
                    <li onClick={() => history.push('/item')}>
                        <RiFileAddFill color='#424242' size={20}/>
                        Novo Produto
                    </li>
                    {/* <li onClick={() => report()}>
                        Relatorio
                    </li> */}
                    <li onClick={() => history.push('/user')}>
                        <RiUserAddFill color='#424242' size={20}/>
                        Novo Usuario
                    </li>
                    <li onClick={() => singOut()}>
                        <GiExitDoor color='#424242' size={20}/>
                        Sair
                    </li>
                {/* </Link> */}
            </MenuContainer>
        </Container>
    )
}