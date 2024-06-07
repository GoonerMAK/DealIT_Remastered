import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import styled from "styled-components";
import Pendingrequest from "../components/Pendingrequest";


const MyOrdersPage = styled.div`
  display: flex;
`;

const MyOrdersContainer = styled.div`
  margin: 1rem auto;
  padding: 2rem;
  min-width:70vw;
  background-color: white;
  border-radius: 5px;
  // box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  height: 100%;
`;


const Title = styled.h1`
  text-align: center;
  
font-size:38px;
color:teal;
`;


const MyOrders = () => {


  return (

    <>
      <Announcement />
      <Navbar />
      
      <MyOrdersPage>
        <Sidebar activePage={"MyOrders"}/>
        <MyOrdersContainer>
          <Title>My orders</Title>
          <Pendingrequest/>
        </MyOrdersContainer>
      </MyOrdersPage>

      <Footer />
    </>
  );
};

export default MyOrders;