import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import ReactSearchBox from 'react-search-box'

import { coinMask, numMask } from '../../Utils/mask';

import {
    Container
} from './styles';

import api from '../../Services/api';

const schema = Yup.object().shape({
    name: Yup.string()
        .required('Campo de usuario é obrigatório!'),
    value: Yup.string()
        .required('Campo de valor é obrigatório!'),
    amount: Yup.string()
        .required('Campo de quantidade é obrigatório!')
});

export default function AddItem(){
    const [value, setValue] = useState('');
    const [amount, setAmount] = useState();
    const [name, setName] = useState('');
    const [brand, setBrand] = useState();
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        getBrands();
    }, []);

    const getBrands = async () => {
        const token = localStorage.getItem('inhalt-token');

        if (token) {
            api.defaults.headers.authorization = `Bearer ${token}`;
        }

        await api.get('/brand').then(resp => {
            const info = resp.data.map(item => ({
                ...item,
                value: item.name
            }))
            setBrands(info);
        }).catch(err => {
            console.log(err)
        });
    }

    const addItem = async () => {
        const info = {
            name,
            value: parseFloat(value),
            amount: parseInt(amount),
            brandId: brand.id
        }

        console.log(info);

        await api.post('/product', info).then(resp => {
            alert('Produto cadastrado com sucesso!');
            // console.log(resp.data);
        }).catch(err => {
            alert(err);
            console.log(err.response)
        })
    }

    return(
        <Container>
            <Form schema={schema} onSubmit={addItem}>
                <div>
                    <label>Nome do Produto</label>
                    <Input
                        onChange={e => setName(e.target.value)}
                        name='name'
                    />
                </div>

                <div>
                    <label>Estoque</label>
                    <Input
                        value={amount}
                        onChange={e => setAmount(numMask(e.target.value))}
                        name='amount'
                    />
                </div>

                <div>
                    <label>Preço do Produto</label>
                    <Input
                        value={value}
                        onChange={e => setValue(coinMask(e.target.value))}
                        maxLength='10'
                        name='value'
                    />
                </div>

                <div>
                    <ReactSearchBox
                        data={brands}
                        onSelect={record => setBrand(record)}
                        placeholder='Selecione uma marca'
                    />
                </div>

                <button type='submit'>Cadastrar</button>
            </Form>
        </Container>
    )
}