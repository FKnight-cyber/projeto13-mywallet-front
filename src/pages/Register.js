import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import Loader from "../components/loader";
import { ToastContainer, toast } from "react-toastify";

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

export default function Register(){
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [load,setLoad] = useState(false);

    const navigate = useNavigate();

    function registerAccount(event){
        event.preventDefault();

        setLoad(true);

        if(confirmPassword !== password){
            setLoad(false);
            return notify('Could not register! check your password and its confirmation!');
        }

        const body = {
            name,
            email,
            password
        }

        const promise = axios.post("http://localhost:5000/register",body);

        promise.then(() => {
            alert("Successfully registered!");
            setLoad(false);
            navigate("/"); 
        })

        promise.catch(Error =>{
            notify(Error.response.data.message);
            setLoad(false);
        })
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
                 <button type="submit" disabled={load} >
                    {
                        load ? <Loader /> : 'Cadastrar'
                    }
                </button>
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