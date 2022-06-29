import styled from 'styled-components'
import dayjs from 'dayjs'

export default function Content({records}){
    return(
        records.map((record,index) => 
        <Container key={index} price={record.price}>
            <div>
                <h6>{dayjs(record.time).format('DD/MM')}</h6>
                <h4>{record.description}</h4>
            </div>
            <h5>{record.price}</h5>  
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
    }
`
