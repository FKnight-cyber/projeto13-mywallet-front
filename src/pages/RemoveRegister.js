import { Container } from "./AddRegister";
import axios from 'axios';
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function AddRegister(){
    const [price, setPrice] = useState();
    const [description,setDescription] = useState();

    const navigate = useNavigate();
    const { token,balance,setBalance } = useContext(UserContext);

    function addRecord(event){
        event.preventDefault();

        const body = {
            price,
            description
        }

        const promise = axios.post("http://localhost:5000/remove", body, {
            headers:{
                user: token
            }
        });

        promise.then(()=>{
            alert("Record successfully added!");
            setBalance(balance-price);
            navigate("/initialpage");
        })

        promise.catch(Error => {
            alert(Error.response.data);
        })
    }
    
    return(
        <Container>
            <h1>Nova Saída</h1>
            <form onSubmit={addRecord}>
                <input type="number"
                placeholder="Valor"
                required
                value={price}
                onChange={e => setPrice(e.target.value)} />
                <input type="text" 
                placeholder="Descrição" 
                maxLength={20}
                required
                value={description}
                onChange={e => setDescription(e.target.value)} />
                <button type="submit">Salvar Saída</button>
            </form>
        </Container>
    );
}
