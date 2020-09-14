import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import {
    Container
} from './styles';

import api from '../../Services/api';

const schema = Yup.object().shape({
    name: Yup.string()
        .required('Campo de usuario é obrigatório!'),
    password: Yup.string()
        .required('Campo de valor é obrigatório!')
});

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
            password,
            confirm_password: password
        }
        
        await api.post('/users', info).then(resp => {
            alert('Usuario cadastrado com sucesso!');
        }).catch(err => {
            alert(err.response.data)
        })
    }

    return(
        <Container>
            <Form schema={schema} onSubmit={addUser}>
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

                <button type='submit'>Cadastrar</button>
            </Form>
        </Container>
    )
}