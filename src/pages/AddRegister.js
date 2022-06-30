import styled from "styled-components";
import axios from 'axios';
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function AddRegister(){
    const [price, setPrice] = useState();
    const [description,setDescription] = useState();

    const navigate = useNavigate();
    const { token,recordControl } = useContext(UserContext);

    function addRecord(event){
        event.preventDefault();

        const body = {
            recordControl,
            price,
            description
        }

        const promise = axios.post("http://localhost:5000/add", body, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        promise.then(()=>{
            alert("Record successfully added!");
            navigate("/initialpage");
        })

        promise.catch(Error => {
            alert(Error.response.data);
        })
    }
    
    return(
        <Container>
            {
                recordControl ? <h1>Nova Saída</h1> : <h1>Nova Entrada</h1>
            }
            <form onSubmit={addRecord}>
                <input type="number"
                placeholder="Valor"
                required
                value={price}
                onChange={e => setPrice(e.target.value)} />
                <input type="text" 
                placeholder="Descrição" 
                maxLength={30}
                required
                value={description}
                onChange={e => setDescription(e.target.value)} />
                <button type="submit">
                {
                recordControl ? <h1>Salvar Saída</h1> : <h1>Salvar Entrada</h1>
                }
                </button>
            </form>
        </Container>
    );
}

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height:915px;
    background-color: #8C11BE;
    padding: 24px;

    h1{
        font-size: 26px;
        color: #FFFFFF;
        margin-bottom: 24px;
    }

    form{
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        width: 100%;
        height: 200px;

        input{
            width: 100%;
            height: 56px;
            background-color: #FFFFFF;
            border: none;
            border-radius: 6px;
            padding-left: 16px;

            &::placeholder{
                font-size: 20px;
                color: #000000;
            }
        }

        button{
            width: 100%;
            height: 46px;
            font-size: 20px;
            background-color: #A328D6;
            color: #FFFFFF;
            border: none;
            border-radius: 6px;
        }
    }
`