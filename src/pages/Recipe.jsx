import { useState, useEffect } from "react";
import styled from "styled-components";
import {useParams} from 'react-router-dom'

const Recipe = () => {
let params = useParams();
const [details,setDetails] = useState({});

const [activeTab,setActiveTab] = useState('instructions')

const fetchDetails = async ()=>{
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const detailData = await data.json();
    setDetails(detailData);
    console.log(detailData);
}
useEffect(()=>{
    fetchDetails()
},[params.name]);



  return (
   
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt='' />
      </div>
      <Info>
        <Button className ={activeTab==='instructions'? 'active':''}
        onClick={()=>{setActiveTab('instructions')
        }}>
            Instructons
            </Button>
        <Button className ={activeTab==='ingredients' ? 'active':''}
        onClick={()=>setActiveTab('ingredients')}
        >
            Ingredients</Button>
            {activeTab==='instructions'&&(
                <div>
                <p dangerouslySetInnerHTML= {{__html: details.summary }}></p>
                <p dangerouslySetInnerHTML= {{__html: details.instructions }}></p>

            </div>
            )}
            {activeTab==='ingredients'&&(
                 <ul>
                 {details.extendedIngredients.map((ingredient)=>(
                   <li key={ingredient.id}>{ingredient.original}</li>
                 ))}
             </ul>
             )}
           
      </Info>
    </DetailWrapper>
  )
}
const DetailWrapper= styled.div`
    display: flex;
    margin-top:10rem;
    margin-bottom:5rem;
    .active{
        background: linear-gradient(35deg,#494949,#313131);
        color: white;
    }

    h2{
        margin-bottom:2rem;
    }
    li{
        font-size:1rem;
        line-height:2rem;

    }
    ul{
        margin-top:2rem;
    }
    p{
        margin: 1.5rem;
    }
`
const Button = styled.button`
    margin-top:2rem;
    padding: 1rem 2rem;
    color: #313131;
    background:white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight:600;
`;
const Info = styled.div`
    
    
    margin:0rem 1rem;
    margin-left: 2rem;
    
`

export default Recipe

