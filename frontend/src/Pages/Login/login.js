import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '../../Services/api';

import {
    Container
} from './styles';

const schema = Yup.object().shape({
    name: Yup.string()
        .required('Campo de usuario é obrigatório!'),
        password: Yup.string()
        .required('Campo de senha é obrigatório!')
});

export default function Login(){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    useEffect(() => {
        userLogged();
    }, []);

    const userLogged = () => {
        const token = localStorage.getItem('inhalt-token');

        if(token){
            api.defaults.headers.authorization = `Bearer ${token}`;
            return history.push('/home');
        }
    }

    const handleLogin = async () => {
        const info = { name, password };

        await api.post('/session', info).then(resp => {
            api.defaults.headers.authorization = `Bearer ${resp.data.token}`;

            localStorage.setItem('inhalt-token', resp.data.token);

            history.push('/home');

            window.location.reload(); 

            setName('');
            setPassword('');
        }).catch(err => {
            alert(err.response.data.message);
        });
    }

    const handelTest = async () => {
        await api.post('/teste').catch(err => {
            alert(err.response.data.message);
        })
    }

    return(
        <Container>
            <Form schema={schema} onSubmit={handleLogin}>
                <div>
                    <label>Usuario</label>
                    <Input 
                        value={name} 
                        onChange={text => setName(text.target.value)} 
                        name='name'
                    />
                </div>

                <div>
                    <label>Senha</label>
                    <Input 
                        value={password} 
                        onChange={text => setPassword(text.target.value)} 
                        name='password'
                    />
                </div>

                <div>
                    <a onClick={handelTest}>Teste</a>
                </div>

                <button type='submit'>Logar</button>
            </Form>
        </Container>
    )
}