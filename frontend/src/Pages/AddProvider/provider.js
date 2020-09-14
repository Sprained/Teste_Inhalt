import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { phoneMask, cleanMask } from '../../Utils/mask';

import {
    Container
} from './styles';

import api from '../../Services/api';

const schema = Yup.object().shape({
    name: Yup.string()
        .required('Campo de usuario é obrigatório!'),
    phone: Yup.string()
        .required('Campo de senha é obrigatório!'),
    email: Yup.string()
        .email('Email informado invalido!')
        .required('Campo de email obrigatorio')
});

export default function AddProvider(){
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState();
    const [name, setName] = useState('');

    const addProvider = async () => {
        const token = localStorage.getItem('inhalt-token');

        if(token) {
            api.defaults.headers.authorization = `Bearer ${token}`;
        }

        const cleanPhone = cleanMask(phone);
        
        const info = {
            name,
            email,
            phone: parseInt(cleanPhone)
        }

        await api.post('/provider', info).then(resp => {
            alert('Fornecedor cadastrado com sucesso!');
        }).catch(err => {
            alert(err);
        })
    }

    return(
        <Container>
            <Form schema={schema} onSubmit={addProvider}>
                <div>
                    <label>Nome</label>
                    <Input
                        onChange={e => setName(e.target.value)}
                        name='name'
                    />
                </div>

                <div>
                    <label>Telefone</label>
                    <Input
                        value={phone}
                        onChange={e => setPhone(phoneMask(e.target.value))}
                        maxLength='15'
                        name='phone'
                    />
                </div>

                <div>
                    <label>Email</label>
                    <Input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        name='email'
                    />
                </div>

                <button type='submit'>Cadastrar</button>
            </Form>
        </Container>
    )
}