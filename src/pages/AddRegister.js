import styled from "styled-components";
import axios from 'axios';
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import {Circles} from "react-loader-spinner";
import { toast,ToastContainer } from "react-toastify";

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

const notify2 = (msg)=>{
    toast(`✅ ${msg}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }

export default function AddRegister(){
    const [price, setPrice] = useState();
    const [description,setDescription] = useState();
    const [load,setLoad] = useState(false);

    const navigate = useNavigate();
    const { token,recordControl } = useContext(UserContext);

    function addRecord(event){
        event.preventDefault();

        setLoad(true);

        const body = {
            recordControl,
            price,
            description
        }

        const promise = axios.post("http://ryan-projeto13-mywallet.herokuapp.com/add", body, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        promise.then(()=>{
            notify2("Record successfully added!");
            setLoad(false);
            setTimeout(()=>{
                navigate("/initialpage");
            },2000);
        });

        promise.catch(Error => {
            setLoad(false);
            notify(Error.response.data.message);
        });
    }
    
    return(
        <>
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
        {
            
            load ? <LoaderContainer>
                    <h1>Adding record</h1> 
                    <Circles color={'#FF00FF'} />
                    </LoaderContainer> 
            :
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
                maxLength={26}
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
        }
        </>
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
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 46px;
            font-size: 20px;
            background-color: #A328D6;
            color: #FFFFFF;
            border: none;
            border-radius: 6px;
            
            > * {
                &:first-child{
                    transform: translateY(0.5rem);
                }
            }
        }
    }
`

export const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 915px;
    background-color: #8C11BE;

    h1{
        font-family: 'Saira Stencil One', cursive;
        font-size: 32px;
        color: #FFFFFF;
        margin-bottom: 40px;
    }
`