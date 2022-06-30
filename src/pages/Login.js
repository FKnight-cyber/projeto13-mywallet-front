import styled from "styled-components";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios'
import { useState,useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function Login(){
    const { setUser,setToken } = useContext(UserContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();
    function signIn(event){
        event.preventDefault();
        const promise = axios.post("http://localhost:5000/", {
            headers:{
                user: email,
                password
            }
        });

        promise.then(res => {
            if(res.data.hasRegister){
                setUser(res.data.user);
                setToken(res.data.token);
                navigate('/initialpage');
            }
        });

        promise.catch(Error => {
            alert(Error.response.data);
        });
    }
    return(
        <Container>
            <h1>My Wallet</h1>
            <form onSubmit={signIn}>
                <input type="email" 
                placeholder="E-mail" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)} />
                <input type="password" 
                placeholder="Senha"
                required
                value={password}
                onChange={e => setPassword(e.target.value)} />
                <button type="submit">Entrar</button>
            </form>
            <Link to="/register" style={{textDecoration:'none'}}>
                <h3>Primeira vez? cadastre-se!</h3>
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

    h3{
        margin-top: 36px;
        font-size: 16px;
        color: #FFFFFF;
    }
`