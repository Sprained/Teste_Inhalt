import React, { useState } from 'react';

import { coinMask } from '../../Utils/mask';

import {
    Container
} from './styles';

import api from '../../Services/api';

export default function AddItem(){
    const [value, setValue] = useState('');
    const [amount, setAmount] = useState();
    const [name, setName] = useState('');

    const addItem = async () => {
        const token = localStorage.getItem('inhalt-token');

        if(token) {
            api.defaults.headers.authorization = `Bearer ${token}`;
        }
        
        const info = {
            name,
            value,
            amount: parseInt(amount)
        }

        console.log(info);

        await api.post('/product', info).then(resp => {
            alert('Produto cadastrado com sucesso!');
            console.log(resp.data);
        }).catch(err => {
            alert(err);
        })
    }

    return(
        <Container>
            <form>
                <div>
                    <label>Nome do Produto</label>
                    <input
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label>Estoque</label>
                    <input
                        onChange={e => setAmount(e.target.value)}
                    />
                </div>

                <div>
                    <label>Preço do Produto</label>
                    <input
                        value={value}
                        onChange={e => setValue(coinMask(e.target.value))}
                        maxLength='10'
                    />
                </div>

                <button onClick={() => addItem()}>Cadastrar</button>
            </form>
        </Container>
    )
}