import styled from 'styled-components';

export const Container = styled.div`
    margin-left: 17%;
    overflow-x: hidden;
    /* margin-left: 40px; */
    margin-top: 20px;
`;

export const Menu = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const SearchCamp = styled.div`
    width: 100%;
    margin-right: 20px;

    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 24px;
    /* span{
        height: 37px;
    } */

    input{
        width: 450px;
        margin-right: 20px;
        font-size: 20px;
        border-radius: 4px;
        padding: 0.3%;
    }
    button{
        width: 150px;
        height: 37px;
        background-color: #428DFF;
        border: none;
        border-radius: 4px;
        color: #fff;
        font-weight: bold;
        font-size: 20px;
    }
`

export const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, auto));
`

export const Card = styled.div`
    width: 400px;
    padding: 10px;
    height: 150px;
    border-radius: 4px;
    margin-right: 20px;
    margin-bottom: 20px;
    margin-top: 3%;
    /* cursor: pointer; */

    &:hover{
        border: 2px solid  #428DFF;
    }

    h5{
        color: #428DFF;
        font-weight: bold;
        font-size: 30px;
        margin-top: 5px;
        margin-bottom: 5%;
    }
`

export const Divisor = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    div{
        display: flex;
        flex-direction: column;
    }

    p{
        font-weight: bold;
        color: #C4C4C4;
        margin-bottom: 3%;
    }

    button{
        margin-top: 20px;
        width: 150px;
        height: 40px;
        background-color: #428DFF;
        border: none;
        border-radius: 4px;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
    }
`