import { useState, useEffect } from "react"
import Select from "react-select";
import styled from "styled-components";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'
import { useLocation, Link } from "react-router-dom";
import Contractforexc from "./Contractforexc";
import { current } from "@reduxjs/toolkit";
import ConfirmationDialog from "./ConfirmationDialog";
import Announcement from "./Announcement";
import Navbar from "./Navbar";
import Newsletter from "./Newsletter";
import Footer from "./Footer";
import React from 'react'


const Wrapper = styled.div`
  padding: 10px;
  display: flex;
`;

const Title = styled.h1`
font-size:38px;
color:teal;
  margin-bottom: 10px;
  text-align: center;
`;

const RequestContainer = styled.div`
  margin: 2rem auto;
  width: 1000px;
  padding: 2rem;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  height: 100%;
`;

const Info = styled.div`
  flex: 3;
  margin-left: 20px;
  margin-right: 20px;

  // &:hover {
  //   background-color: lightgray;
  // }

  // cursor: pointer;
`;

const Label = styled.label`
  font-size: 19px;
  color: black;
  margin-bottom: 3px;
`;

const VerificationLabel = styled.label`
  font-size: 19px;
  color: black;
  margin-left: 30px;
  margin-top: 8px;

`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  padding: 5px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Input = styled.input`
  width: 40%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  margin-left: 200px;

`;

const MessageButton = styled.button`
padding: 8px;
border: 3px solid teal;
background-color: white;
cursor: pointer;
font-weight: 700;
font-size: 15px;
width: 10%;

margin-left: 290px;

&:hover{
    background-color: #f8f4f9;
}
`;

const VerifyButton = styled.button`
padding: 8px;
border: 3px solid teal;
background-color: white;
cursor: pointer;
font-weight: 700;
font-size: 15px;
width: 10%;

margin-left: 50px;

&:hover{
    background-color: #f8f4f9;
}
`;

const Requestsexchange = ({ request }) => {

  const [product, setProduct] = useState('')
  const [returndate, setreturndate] = useState(request.return_date)
  const [selected, setselected] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [updated, setupdated] = useState(false)
  const [show, setshow] = useState(false)


  const handleclick = (e) => {
    setselected(current => !current)
  }

  const handleaccept = () => {
    setShowConfirmation(true);
  }

  const handleConfirm = async (e) => {
    e.preventDefault()
    // Perform the action after confirmation
    console.log('Action confirmed');
    await axios.post('http://localhost:3000/api/products/exchangereq/verifyowner/' + request._id, { returndate })
      .then((response) => {
        console.log(response)
        setupdated(true)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      })
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    // Cancel the action
    console.log('Action canceled');
    setShowConfirmation(false);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3000/api/products/find/' + request.objectid
        );
        // console.log(res);
        setProduct(res.data);
        console.log(returndate)
      } catch (err) { }
    };
    getProducts();
  }, [request.objectid]);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/products/exchangereq/find/' + request.owner_id);
        if (Array.isArray(res.data) && res.data.length === 0) {
          console.log('Response is empty');
          setshow(false)
        } else if (typeof res.data === 'object' && Object.keys(res.data).length === 0) {
          console.log('Response is empty');
          setshow(false)
          // Handle the case when the response is empty
        } else {
          setshow(true);
          console.log('Check if any requests exist', res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getRequests();
  }, [request.owner_id, request.owner_verify]);

  const text = `this is a contract for` //${product.title} `


  return (
    <>

      <Wrapper>
        <RequestContainer>
          <Title>Pending Exchange Requests</Title>

          <Info>
            <Product>

              <ProductDetail>
                <Image src={request.img} />

                <Details>
                  {/* <Label> <strong>Product: </strong> {product.title}</Label> */}
                  <Label> <strong>Request: </strong> {request.title}</Label>
                  <Label> <strong>Description: </strong> {request.desc}</Label>
                  <Label> <strong>Return Date: </strong> {returndate}</Label>
                </Details>

              </ProductDetail>

            </Product>

            <Product>

              {!updated && (
                <Input
                  type="date"
                  onChange={(e) => setreturndate(e.target.value)}
                  value={returndate}
                />
              )}

            </Product>


            <Product>

              <ProductDetail>

                <MessageButton> <Link to={`/messege?data=${request.sender_id}`}>Message</Link> </MessageButton>

                {show || request.owner_verify || updated ? (
                  <VerificationLabel>This Product is Already Verified</VerificationLabel>
                ) : (
                  <VerifyButton onClick={handleaccept}>Verify</VerifyButton>
                )}

              </ProductDetail>

            </Product>


            <Product>

              {showConfirmation && (
                <ConfirmationDialog
                  message="Are you sure you want to verify? Once you verify, the contract will be generated and you can't undo."
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                />
              )}
              {(request.owner_verify || updated) && (
                <VerifyButton onClick={handleclick}>Show Contract</VerifyButton>
              )}
              {selected && <Contractforexc text={text} />}
            </Product>

          </Info>
        </RequestContainer>
      </Wrapper>


    </>
  )
}


export default Requestsexchange