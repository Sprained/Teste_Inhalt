import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    margin: 0 40%;
    max-width: 30%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        label{
            width: 100%;
            font-size: 24px;
            line-height: 29px;
        }

        input{
            width: 100%;
            border: none;
            border-bottom: 1px solid #428DFF;
            font-size: 24px;
            line-height: 29px;
            margin-top: 3%;
        }
    }

    div{
        width: 100%;
        margin: 10% auto;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    button{
        background: #428DFF;
        border: none;
        border-radius: 100px;
        width: 100%;
        height: 50px;
        color: #fff;
        font-weight: bold;
        font-size: 22px;
        line-height: 27px;
    }
`