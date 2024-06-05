
import { Link } from "react-router-dom";
import styled from "styled-components"
import { categories } from "../data"
import React from 'react'


const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 30%;
  filter: blur(2px);
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  

`;

const Title = styled.h1`
    color:teal;
    margin-bottom: 20px;
`;

const Button = styled.button`
padding: 8px 15px;
border: 2px solid teal;
color:teal;
background-color: white;
cursor: pointer;
font-weight: 600;
font-size: 15px;
border-radius:10px;
transition: all 200ms ease;

&:hover{
    // background-color: #f8f4f9;
    background-color: teal;
    color:white;
    
}
    
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
  opacity: 100%;
`;

const CategoryItem = ({item}) => {
  return (
    <Container>
      
      <Image src={item.img} />

      <Info>

          <Title>{item.title} </Title>
          <Link to={`/products/${item.cat}`}>
          
          <Button>GO</Button>

          </Link>

      </Info>
      
    </Container>
  )
}

export default CategoryItem