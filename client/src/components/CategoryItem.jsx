import { Link } from "react-router-dom";
import styled from "styled-components";
import React from 'react';


const Button = styled.button`
  padding: 8px 15px;
  border: 2px solid teal;
  color: teal;
  background-color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  border-radius: 10px;
  transition: all 200ms ease;
  opacity: 0;

  &:hover {
    background-color: teal;
    color: white;
  }
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
  transition: opacity 0.3s ease;
`;

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  &:hover ${Button} {
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 30%;
  filter: blur(2px);
`;

const Title = styled.h1`
  margin-bottom: 10px;
  text-align: center;
  font-size: 38px;
  color: teal;
`;


const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
  opacity: 100%;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Link to={`/products/${item.cat}`}>
          <Button>BROWSE</Button>
        </Link>
      </Info>
    </Container>
  );
};

export default CategoryItem;
