import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";
  
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 330px;
  height: 330px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  flex-direction: column;


  &:hover ${Info}{        /* only applying hovering effect for "Info" inside the container */
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 55%;
  z-index: 2;        /* the image will be in front of the circle */
  margin-bottom: 10px;
`;

const Description = styled.div`,
  z-index: 2;
  display: flex;
  flex-direction: column;
  width: 70%;
`

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;        /* radius allows us to create a circle */
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;



const Product = ({ item }) => {
  return (
    <Container>
      
      <Image src={item.img} />
      
      <Description>
        <p><strong>Title</strong> : {item.title}</p>
        <p> {item.desc}</p>
        <p> <strong>Category</strong> :{item.category}</p>
        <p> <strong>Price</strong> :{item.price}/=</p>
        <p> <strong>Type</strong> :{item.type}</p>
      </Description>
      

      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>

        <Icon>
          <Link to={`/product/${item._id}`}>
          <SearchOutlined />
          </Link>
        </Icon>

        <Icon>
          <FavoriteBorderOutlined />
        </Icon>

      </Info>
      
    </Container>
  );
};

export default Product;