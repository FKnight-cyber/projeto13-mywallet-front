import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

export default function Register(){
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const navigate = useNavigate();

    function registerAccount(event){
        event.preventDefault();

        if(confirmPassword !== password){
            return alert("Could not register! check your password and its confirmation!");
        }

        const body = {
            name,
            email,
            password
        }

        const promise = axios.post("http://localhost:5000/register",body);

        promise.then(() => {
            alert("Successfully registered!");
            navigate("/"); 
        })

        promise.catch(Error =>{
            alert(Error.response.data);
        })
    }

    return(
        <Container>
            <h1>My Wallet</h1>
            <form onSubmit={registerAccount}>
                <input type="text" 
                placeholder="Nome" 
                required
                value={name}
                onChange={e => setName(e.target.value)}
                />
                <input type="email" 
                placeholder="E-mail"
                required
                value={email}
                onChange={e => setEmail(e.target.value)} />
                <input type="password" 
                placeholder="Senha" 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}/>
                <input type="password" 
                placeholder="Confirme a senha" 
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}/>
                <button type="submit">Cadastrar</button>
            </form>
            <Link to="/" style={{textDecoration:'none'}}>
                <h3>Já tem uma conta? entre agora!</h3>
            </Link> 
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height:915px;
    background-color: #8C11BE;

    h1{
        font-family: 'Saira Stencil One', cursive;
        font-size: 32px;
        color: #FFFFFF;
        margin-bottom: 24px;
    }

    form{
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        width: 326px;
        height: 320px;

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

    h3{
        margin-top: 36px;
        font-size: 16px;
        color: #FFFFFF;
    }
`