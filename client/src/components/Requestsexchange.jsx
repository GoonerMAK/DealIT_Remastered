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
margin: 1rem auto;
// width: 1000px;
min-width:70vw;
padding: 1rem;
  background-color: white;
  border-radius: 5px;
  // box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

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

const Productdate = styled.div`
margin-left:10px;`

const Image = styled.img`
  width: 200px;
  padding: 5px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
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
padding: 10px 20px;
  background-color: teal;
  border:1px solid teal;
  color: white;
  border: none;
  border-radius:25px;
  cursor: pointer;
  font-size: 15px;
  margin-top:10px;
  transition: all 500ms ease;
  &:hover {
    background-color: rgb(1, 163, 163);

  }
`;

const VerifyButton = styled.button`
padding: 10px 20px;
  background-color: teal;
  color: #fff;
  border: none;
  border-radius:25px;
  cursor: pointer;
  font-size: 15px;
  margin-top:10px;
  margin-bottom:10px;
  &:hover {
    background-color: rgb(1, 163, 163);
  }
`;

const Requestsexchange = ({ request }) => {

  const [product, setProduct] = useState('')
  const [returndate, setreturndate] = useState(request.return_date)
  const [selected, setselected] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [updated, setupdated] = useState(false)
  const [show, setshow] = useState(false)
  const [owner, setowner] = useState('')
  const [sender, setsender] = useState('')

  const handleclick = (e) => {
    setselected(current => !current)
  }

  const handleaccept = () => {
    setShowConfirmation(true);
  }

  useEffect(() => {
    const getsender = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/user/find/' + request.sender_id)
        setsender(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    };
    getsender();
  }, [request.sender_id]);

  useEffect(() => {
    const getowner = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/user/find/' + request.owner_id)
        setowner(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    };
    getowner();
  }, [request.owner_id]);

  const handleConfirm = async (e) => {
    e.preventDefault()
    // Perform the action after confirmation
    console.log('Action confirmed');
    await axios.post('http://localhost:3000/api/products/exchangereq/verifyowner/' + request._id, { returndate })
      .then((response) => {
        console.log(response)
        setupdated(true)
      }).catch((error) => {
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

  const text = `Exchange Contract

  This document serves as a legal agreement between the parties involved in the exchange transaction. The details outlined below must be adhered to by both parties:
  
  Item To Be Exchanged:
  - Item: ${product.title}
  Item Offered By Sender:
  - Item: ${request.title}
  - Description: ${request.desc}
  Details
  - Owner Name: ${owner.username}
  - Sender Name: ${sender.username}
  
  Terms and Conditions:
  1. Exchange Agreement: The parties agree to exchange the above item(s) under the terms specified in this contract.
  2. Verification: Both parties have verified.
  3. Return Date: The item(s) must be returned by ${new Date(request.returndate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })}.
  4. Condition of Item: The item was handed over in good condition and should be returned in the same condition at the agreed-upon return date.
  5. Responsibilities:
     - The owner is responsible for ensuring the item(s) are in good working condition before the exchange.
     - The sender is responsible for verifying the item(s) upon receipt and returning them on time.
  6. Dispute Resolution: Any disputes arising from this agreement shall be resolved through mediation or arbitration.`

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  return (
    <>
      <Wrapper>
        <RequestContainer>
          {/* <Title>Pending Exchange Requests</Title> */}
          <Info>
            <Product>

              <ProductDetail>
                <Image src={request.img} />

                <Details>
                  <Label>
                    <strong>Product: </strong>
                    <Link to={`/product/${product._id}`}>{product.title}</Link>
                  </Label>
                  {/* <Label> <strong>Product: </strong> {product.title}</Label> */}
                  <Label> <strong>Request: </strong> {request.title}</Label>
                  <Label> <strong>Description: </strong> {request.desc}</Label>
                  <Label> <strong>Return Date: </strong> {new Date(returndate).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</Label>
                </Details>

              </ProductDetail>
              <div><Link to={`/messege?data=${request.sender_id}`}><MessageButton> Message</MessageButton></Link>

              </div>
            </Product>
            <Productdate>
              {!updated && (
                <Input
                  type="date"
                  onChange={(e) => setreturndate(e.target.value)}
                  value={formatDate(returndate)}
                />
              )}
            </Productdate>


            <Product>

              <ProductDetail>

                {request.owner_verify || updated ? (
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

            </Product>
            {(request.owner_verify || updated) && (
              <VerifyButton onClick={handleclick}>Show Contract</VerifyButton>
            )}
            {selected && <Contractforexc text={text} />}
          </Info>
        </RequestContainer>
      </Wrapper>


    </>
  )
}


export default Requestsexchange