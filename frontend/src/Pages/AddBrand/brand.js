import React, { useEffect, useState, useRef } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import ReactSearchBox from 'react-search-box'

import {
    Container
} from './styles';

import api from '../../Services/api';

const schema = Yup.object().shape({
    name: Yup.string()
        .required('Campo de usuario é obrigatório!')
});

export default function AddBrand() {
    const [name, setName] = useState('');
    const [providers, setProviders] = useState([]);
    const [provider, setProvider] = useState();

    useEffect(() => {
        getProviders();
    }, []);

    const getProviders = async () => {
        const token = localStorage.getItem('inhalt-token');

        if (token) {
            api.defaults.headers.authorization = `Bearer ${token}`;
        }

        await api.get('provider').then(resp => {
            const info = resp.data.map(item => ({
                ...item,
                value: item.name
            }))
            setProviders(info);
        }).catch(err => {
            console.log(err)
        });
    }

    const addBrand = async () => {
        const info = {
            name,
            providerId: provider.id
        }

        await api.post('/brand', info).then(resp => {
            alert('Fornecedor cadastrado com sucesso!');
        }).catch(err => {
            alert(err);
        })
    }

    return (
        <Container>
            <Form schema={schema} onSubmit={addBrand}>
                <div>
                    <label>Nome</label>
                    <Input
                        onChange={e => setName(e.target.value)}
                        name='name'
                    />
                </div>

                <ReactSearchBox
                    data={providers}
                    onSelect={record => setProvider(record)}
                    placeholder='Selecione um fornecedor'
                />

                <button type='submit'>Cadastrar</button>
            </Form>
        </Container>
    )
}