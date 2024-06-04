import React from "react";
import { Add, Remove, Delete } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeProduct } from "../redux/cartRedux";
import { Dispatch } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
  margin-left: 20px;
  margin-right: 20px;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor : pointer;
`;

const RemoveButton = styled.button`
  width: 10%;
  height: 50px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor : pointer;
    
  margin-top: 35px;
`;


const Cart = () => {

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct(productId));
  };


  return (
    <Container>
      <Announcement />
      <Navbar />
      
      <Wrapper>

        <Title>YOUR BAG</Title>

        <Top>
          <Link to= "/ProductList" >                  
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <Link to= "/messege">
          <TopButton type="filled">CHAT WITH OWNER</TopButton>
          </Link>
        </Top>

        <Bottom>

          <Info>

            {cart.products.map((product)=>(
            
              <Product key={product.id} product={product} handleRemoveProduct={handleRemoveProduct}>

              <ProductDetail>
                <Image src={product.img} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {product.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {product.id}
                  </ProductId>
                  <ProductColor color="black" />
                  <ProductSize>
                    <b>Size:</b> A
                  </ProductSize>
                </Details>
              </ProductDetail>
              
              <PriceDetail>
                <ProductAmountContainer>
                  <ProductAmount> Quantity: {product.quantity} </ProductAmount>
                </ProductAmountContainer>
                <ProductPrice> {product.price*product.quantity} /=</ProductPrice>
              </PriceDetail>

              <RemoveButton onClick={() => handleRemoveProduct(product.id)}>REMOVE</RemoveButton>
            
            </Product>

            ))}

            


          </Info>


          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice> {cart.total} /=</SummaryItemPrice>
            </SummaryItem>
           
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice> {cart.total} /=</SummaryItemPrice>
            </SummaryItem>
            <Button>CASH ON DELIVERY</Button>
          </Summary>

        </Bottom>

      </Wrapper>

      <Hr /><Hr /><Hr /><Hr />

      <Footer />
    </Container>
  );
};

export default Cart;