import styled from 'styled-components';

export const Container = styled.div`
    top: 0;
    height: 100vh;
    width: 16vw;
    display: flex;
    flex-direction: column;
    position: fixed;
    background-color: #f5f5f5;
`

export const MenuContainer = styled.ul`
    list-style: none;
    margin-top: 60px;
    margin-left: 30px;

    a{
        text-decoration: none;
    }

    li{
        display: flex;
        text-decoration: none;
        color: #424242;
        font-weight: bold;
        align-items: center;
        margin-bottom: 2%;
        cursor: pointer;
    }

    svg{
        margin-right: 6px;
    }
`