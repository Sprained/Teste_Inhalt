import React, { useState } from 'react';

import {
    Container
} from './styles';

import api from '../../Services/api';

export default function AddUser(){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('')

    const addUser = async () => {
        const token = localStorage.getItem('inhalt-token');

        if(token) {
            api.defaults.headers.authorization = `Bearer ${token}`;
        }
        
        const info = {
            name,
            password
        }
        
        await api.post('/users', info).then(resp => {
            alert('Usuario cadastrado com sucesso!');
        }).catch(err => {
            alert(err.response.data)
        })
    }

    return(
        <Container>
            <form>
                <div>
                    <label>Usuario</label>
                    <input
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label>Senha</label>
                    <input
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <button onClick={() => addUser()}>Cadastrar</button>
            </form>
        </Container>
    )
}