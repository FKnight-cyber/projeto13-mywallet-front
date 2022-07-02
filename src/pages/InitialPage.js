import styled from "styled-components"
import { IoExitOutline,IoAddCircleOutline,IoRemoveCircleOutline } from "react-icons/io5"
import { Link,useNavigate } from "react-router-dom";
import { useContext,useState,useEffect } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import Content from "../components/Content";
import { Rings } from  'react-loader-spinner'
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

export default function InitialPage(){
    const { user,setUser,token,setToken,balance,setBalance,setRecordControl } = useContext(UserContext);
    const [records, setRecords] = useState([]);
    const [load,setLoad] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const promise = axios.get("http://http://ryan-projeto13-mywallet.herokuapp.com/initialpage",
        {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });

    promise.then(res => {
        setBalance(res.data.balance);
        setRecords([...res.data.records]);
        setLoad(false);
    })

    promise.catch(Error => {
        notify(Error.response.data.message);
        setLoad(false);
    })

    },[balance,setBalance,token]);

    function logOut(){
        setUser();
        setToken();
        navigate('/');
    }

    return(
        <Container>
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
            <header>
                <h1>Olá, {user}</h1>
                <IoExitOutline size={40} color={'#ffffff'} onClick={logOut} />
            </header>
            <Contents records={records} balance={balance}>
                <div>
                    {
                        records.length === 0 ? <h2>Não há registros de entrada ou saída!</h2>
                        :
                        <Content setLoad={setLoad} records={records} setRecords={setRecords}></Content>
                    }
                </div>
                {
                    records.length === 0 ? null
                    :
                    <div>
                        <h1>Saldo</h1>
                        <h5>{balance}</h5>
                    </div>
                }
                    <LoaderContainer>
                        {
                            load ? <Rings color={'#FF00FF'} /> : ''
                        }      
                    </LoaderContainer>
            </Contents>
            <Section>
                <div>
                    <Link onClick={()=>setRecordControl(false)} to="/add" style={{textDecoration:'none', color:'#ffffff'}}>
                        <IoAddCircleOutline  size={22}/>
                    </Link>
                    <h3>Nova entrada</h3>
                </div>
                <div>
                    <Link onClick={()=>setRecordControl(true)} to="/add" style={{textDecoration:'none', color:'#ffffff'}}>
                        <IoRemoveCircleOutline size={22}/>
                    </Link>
                    <h3>Nova saída</h3>
                </div>
            </Section>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height:915px;
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 24px;
    padding-bottom: 16px;
    background-color: #8C11BE;

    header{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1{
            font-style: bold;
            font-size: 26px;
            color: #FFFFFF;
        }
    }

    h3{
        margin-top: 36px;
        font-size: 16px;
        color: #FFFFFF;
    }
`

const Contents = styled.div`
    display: flex;
    justify-content: ${props => props.records.length === 0 ? 'center' : 'space-between'};;
    align-items: ${props => props.records.length === 0 ? 'center' : 'stretch'};
    flex-direction: column;
    background-color: #ffffff;
    margin-top:22px;
    width: 100%;
    position: relative;

    h2{
        width: 180px;
        height: 46px;
        font-size: 20px;
        color:#868686;
        text-align: center;
    }

    > * {
      &:first-child {
        display: flex;
        justify-content: ${props => props.records.length === 0 ? 'center !important' : 'flex-start'};
        align-items: ${props => props.records.length === 0 ? 'center' : 'stretch'};
        flex-direction: column;
        width: 100%;
        height: 410px;
        overflow-y: scroll;
      }
    }

    > * {
      &:nth-child(2) {
         display: flex;
         width: 100%;
         justify-content: space-between;
         padding-left: 12px;
         padding-right: 12px;
         padding-bottom: 12px;

         h1{
            color: #000000;
            font-size: 18px;
            font-style: bold;
         }

         h5{
            color: ${props => props.balance > 0 ? 'green' : 'red'};
        }
      }
    }
`

const Section = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 114px;
    margin-top: 14px;

    div{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 48%;
        background-color: #A328D6;
        border: none;
        border-radius: 6px;
        padding: 8px;
        
        color: #FFFFFF;

        h3{
            font-size: 18px;
            width: 44px;
            height: 40px;
        }
    }
`

const LoaderContainer = styled.div`
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -25px 0 0 -25px;
`
