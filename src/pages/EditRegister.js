import { Container } from "./AddRegister";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { useContext,useState } from "react";

export default function EditRegister(){
    const [price, setPrice] = useState();
    const [description,setDescription] = useState();
    const { recordControl,token } = useContext(UserContext);

    const navigate = useNavigate();

    const {idRegister} = useParams();

    function updateRecord(event){
        event.preventDefault();

        const body = {
            recordControl,
            price,
            description
        }

        const promise = axios.put(`http://localhost:5000/initialpage/edit/${idRegister}`, body, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        promise.then(()=>{
            navigate("/initialpage");
            alert("Record successfully updated!");
        });

        promise.catch(Error => {
            alert(Error.response.data);
        });
    }
    return(
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
    );
}