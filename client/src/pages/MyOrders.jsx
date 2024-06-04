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
  margin: 2rem auto;
  width: 1000px;
  padding: 2rem;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  height: 100%;
`;


const Title = styled.h1`
  text-align: center;
`;


const MyOrders = () => {


  return (

    <>
      <Announcement />
      <Navbar />
      
      <MyOrdersPage>
        <Sidebar />
        <MyOrdersContainer>
          <Title>The Orders Made</Title>
          <Pendingrequest/>
        </MyOrdersContainer>
      </MyOrdersPage>

      <Footer />
    </>
  );
};

export default MyOrders;