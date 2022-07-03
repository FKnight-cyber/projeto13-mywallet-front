import styled from 'styled-components'
import dayjs from 'dayjs'
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { useContext } from 'react';
import { toast } from "react-toastify";
import swal from 'sweetalert';

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

export default function Content({records,setRecords,setLoad}){
    const navigate = useNavigate();
    const {token, setRecordControl, setBalance} = useContext(UserContext);

    function goToEditPage(price,index){
        if(price < 0){
            setRecordControl(true);
        }else{
            setRecordControl(false)
        }
        navigate(`/initialpage/edit/${index}`)
    }

    function removeRecord(index){
        swal({
            title: "Are you sure to delete this record 🤔?",
            text: "Once deleted, you will not be able to recover it!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                const promise = axios.delete(`https://ryan-projeto13-mywallet.herokuapp.com/initialpage/${index}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
    
                promise.then(res =>{
                    setBalance(res.data.balance)
                    setRecords([...res.data.records]);
                    notify2("Record sucessfully removed!");
                    setLoad(false);
                });
    
                promise.catch( Error =>{
                    if(Error.response.status === 422){
                        setLoad(false);
                        return notify(Error.response.data);
                    } 
                    notify(Error.response.data.message);
                    setLoad(false);
                });
        } else{
              swal("Your record is safe!");
            }
          });
    
        return;
    }

    return(
        records.map((record,index) => 
        <Container key={index} price={record.price}>
            <div>
                <h6>{dayjs(record.time).format('DD/MM')}</h6>
                <h4 onClick={() => goToEditPage(record.price,index)}>{record.description}</h4>
            </div>
            <div>
                <h5>{record.price}</h5>
                <IoClose onClick={() => removeRecord(index)} color={'#C6C6C6'} />
            </div>  
        </Container>
    )
    );
}

const Container = styled.div`
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    padding: 12px 12px 24px 12px;

    div{
        display: flex;
        justify-content: center;
    }
    
    h6{
        color: #C6C6C6;
        margin-right: 8px;
    }

    h4{
        color:#000000;
    }

    h5{
        color: ${props => props.price > 0 ? 'green' : 'red'};
        margin-right: 6px;
    }
`
