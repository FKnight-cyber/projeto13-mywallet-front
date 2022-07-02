import React from 'react';
import styled from "styled-components";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { useState,useContext } from "react";
import UserContext from "../contexts/UserContext";
import Loader from "../components/loader";
import { ToastContainer, toast } from "react-toastify";
import wallet from "../assets/wallet2.png"

const notify = (error)=>{
    toast(`❗ ${error}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }

export default function Login(){
    const { setUser,setToken } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [load,setLoad] = useState(false);

    const navigate = useNavigate();
    function signIn(event){
        event.preventDefault();
        setLoad(true);
        const promise = axios.post("https://ryan-projeto13-mywallet.herokuapp.com/", {
            headers:{
                user: email,
                password
            }
        });

        promise.then(res => {
            if(res.data.hasRegister){
                setUser(res.data.user);
                setToken(res.data.token);
                setLoad(false);
                navigate('/initialpage');
            }
        });

        promise.catch(Error => {
            notify(Error.response.data);
            setLoad(false);
        });
    }
    return(
        <Container load={load}>
           <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={true}
                limit={1}
            />
            <img src={wallet} alt="" />
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
                <button type="submit" disabled={load} >
                    {
                        load ? <Loader /> : 'Entrar'
                    }
                </button>
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
    height:100vh;
    background-color: #8C11BE;

    img{
        object-fit: cover;
        width: 100px;
        height: 100px;
        margin-bottom: 40px;
    }

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
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 46px;
            font-size: 20px;
            background-color: ${props => props.load ? '#AA336A' : '#A328D6'};
            color: #FFFFFF;
            border: none;
            border-radius: 6px;

            > * {
                &:first-child{
                    transform: translateY(${props => props.load ? '1rem' : '0'});
                }
            }
        }
    }

    h3{
        margin-top: 36px;
        font-size: 16px;
        color: #FFFFFF;
    }
`