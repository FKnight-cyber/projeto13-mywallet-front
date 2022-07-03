import { Container,LoaderContainer } from "./AddRegister";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { useContext,useState } from "react";
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

export default function EditRegister(){
    const [price, setPrice] = useState();
    const [description,setDescription] = useState();
    const { recordControl,token } = useContext(UserContext);
    const [load,setLoad] = useState(false);

    const navigate = useNavigate();

    const {index} = useParams();

    function updateRecord(event){
        event.preventDefault();

        setLoad(true);

        const body = {
            recordControl,
            price,
            description
        }

        const promise = axios.put(`https://ryan-projeto13-mywallet.herokuapp.com/initialpage/edit/${index}`, body, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        promise.then(()=>{
            notify2("Record successfully updated!");
            setLoad(false);
            setTimeout(()=>{
                navigate("/initialpage");
            },1000);
        });

        promise.catch(Error => {
            if(Error.response.status === 422){
                setLoad(false);
                return notify(Error.response.data);
            } 
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
            <h1>Updating record</h1> 
            <Circles color={'#FF00FF'} />
            </LoaderContainer> 
            :
            <Container>
            {
                recordControl ? <h1>Editar saída</h1> : <h1>Editar entrada</h1>
            }
            <form onSubmit={updateRecord}>
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
                recordControl ? <h1>Atualizar saída</h1> : <h1>Atualizar entrada</h1>
                }
                </button>
            </form>
        </Container>
        }
        </>
    );
}