import styled from 'styled-components';

export const Container = styled.div`
    margin-left: 17%;
    overflow-x: hidden;
`

export const ModalContainer = styled.div`
    position: absolute;
    z-index: 20;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;
`

export const InternContainer = styled.div`
    width: 40%;
    height: 50%;
    background-color: #FFF;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    
    label{
        /* width: 100%; */
        font-size: 18px;
        margin-top: 3%;
    }

    input{
        color: #707070;
        font-size: 20px;
        border: none;
        border-bottom: 1px solid #428DFF;
        margin-top: 5%;
    }

    @media(min-width: 1920px){
        h1{
            margin-top: 9%;
        }

        p{
            margin-top: 4.5%;
        }
    }
`

export const CloseButton = styled.div`
    display: flex;
    justify-content: flex-end;
    margin:10px 20px 0 0 ;

    button{
        border: none;
        outline: none;
        background-color: transparent;
    }
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3%;
`

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-top: 5%;
    margin-bottom: 10%;
`

export const SaleButton = styled.button`
    width: 300px;
    height: 45px;
    background-color: #428DFF;
    color: #FFF;
    font-weight: bold;
    border: none;
    outline: none;
    border-radius: 4px;
`