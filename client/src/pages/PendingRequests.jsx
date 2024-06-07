import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import styled from "styled-components";
import RequestsExchanges from "../components/RequestsExchanges"


const PendingRequestsPage = styled.div`
  display: flex;
`;

const PendingRequestsContainer = styled.div`
margin: 1rem auto;
// width: 1000px;
min-width:70vw;
  padding: 2rem;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  height: 100%;
`;


const Title = styled.h1`
  text-align: center;
  font-size:38px;
  color:teal;
`;


const PendingRequests = () => {


  return (

    <>
      <Announcement />
      <Navbar />
      
      <PendingRequestsPage>
        <Sidebar activePage={"PendingRequests"}/>
        <PendingRequestsContainer>
          <Title>Pending Requests</Title>
          <RequestsExchanges/>
        </PendingRequestsContainer>
      </PendingRequestsPage>

      <Footer />
    </>
  );
};

export default PendingRequests;