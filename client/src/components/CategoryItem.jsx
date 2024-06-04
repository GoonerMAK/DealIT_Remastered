
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
    color:white;
    margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 8px;
  border: 3px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 700;
  font-size: 15px;
  color: black;
  width: 150%;
  justify-content: center;
  
  &:hover{
      background-color: #f8f4f9;
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