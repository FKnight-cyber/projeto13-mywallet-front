import styled from 'styled-components'
import dayjs from 'dayjs'
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Content({records,token,setRecords,setBalance,setRecordControl}){
    const navigate = useNavigate();

    function goToEditPage(price,index){
        if(price < 0){
            setRecordControl(true);
        }else{
            setRecordControl(false)
        }
        navigate(`/initialpage/edit/${index}`)
    }

    function removeRecord(index){
        if(window.confirm('Are you sure to delete this record?')){
            const promise = axios.delete(`http://localhost:5000/initialpage/${index}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });

            promise.then(res =>{
                setBalance(res.data.balance)
                setRecords([...res.data.records]);
                alert("Record sucessfully removed!");
            });

            promise.catch( Error =>{
                alert(Error.response.data);
            });
        }
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
