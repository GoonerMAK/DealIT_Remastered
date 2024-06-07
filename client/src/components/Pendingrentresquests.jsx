import { useState, useEffect } from "react"
import Select from "react-select";
import styled from "styled-components";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'
import { useLocation, Link } from "react-router-dom";
import Contractforexc from "./Contractforexc";
import { current } from "@reduxjs/toolkit";
import ConfirmationDialog from "./ConfirmationDialog";
import React from 'react'


const Wrapper = styled.div`
  padding: 10px;
`;

const ContractButton = styled.button`
margin-top:10px;
padding: 8px;
  margin-bottom:10px;
  border: 3px solid teal;
background-color: white;
color:teal;
border-radius:7px;
cursor: pointer;
font-weight: 500;
font-size: 15px;
transition: all 500ms ease;

&:hover {
  background-color: teal;
  color: white;
}
`;

const Title = styled.h1`
font-size:20px;
color:teal;
`;

const Price = styled.h1`
  font-size: 24px;
  color: #333;
`;

const RentType = styled.label`
  font-size: 16px;
  color: black;
`;

const MessageLink = styled(Link)`
  text-decoration: none;
  color: blue;
`;

const Input = styled.input`
  width: 40%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  margin-left: 200px;

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
const Info = styled.div`
  flex: 3;
  margin-left: 20px;
  margin-right: 20px;

  // &:hover {
  //   background-color: lightgray;
  // }

  // cursor: pointer;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
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
`
const Label = styled.label`
  font-size: 19px;
  color: black;
  margin-bottom: 3px;
`;

const VerifyButton = styled.button`
  padding: 8px;
  border: 3px solid teal;
  background-color: white;
  border-radius:7px;
  color:teal;
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  transition: all 500ms ease;
margin-top:10px;
margin-right:10px;

  &:hover {
    background-color: teal;
    color: white;
  }
`;

const RejectButton = styled.button`
padding: 8px;
border: 3px solid teal;
background-color: white;
border-radius:7px;
color:teal;
cursor: pointer;
font-weight: 500;
font-size: 15px;
transition: all 500ms ease;
margin-right:10px;
margin-top:10px;

&:hover {
  background-color: teal;
  color: white;
}
`;

const Image = styled.img`
  width: 200px;
`;

const RequestContainer = styled.div`
margin: 1rem auto;
// width: 1000px;
max-width:70vw;
padding: 1rem;
  background-color: white;
  border-radius: 5px;
  // box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  height: 100%;
`;


const Pendingrentrequests = ({ request }) => {

  const [product, setProduct] = useState('')
  const [renttype, setrenttype] = useState(request.renttype)
  const [price, setprice] = useState(request.proposed_price)
  const [selected, setselected] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [ShowConfirmationRe, setShowConfirmationRe] = useState(false);
  const [updated, setupdated] = useState(false)
  const [show, setshow] = useState(false)
  const [owner, setowner] = useState('')
  const [sender, setsender] = useState('')

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3000/api/products/find/' + request.objectid
        );
        setProduct(res.data);
      } catch (err) { }
    };
    getProducts();
  }, [request.objectid]);

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

  const handleclick = (e) => {
    setselected(current => !current)
  }

  const handleaccept = () => {
    setShowConfirmation(true);
  }
  const handlereject = () => {

    setShowConfirmationRe(true);
  }

  const text = `Rent Contract

  This document serves as a legal agreement between the parties involved in the rental transaction. The details outlined below must be adhered to by both parties:
  
  Product Details:
  - Product: ${product.title}
  - Owner Name: ${owner.username}
  - Receiver Name: ${sender.username}
  - Rent Type: ${request.renttype}
  - Proposed Rent: ${request.proposed_price}
  
  Terms and Conditions:
  1. Rental Period: The rental period commences from [Start Date] to [End Date].
  2. Rent Payment: The agreed rental amount of ${request.proposed_price} is payable on a ${request.renttype} basis.
  3. Condition of Product: The product was handed over in good condition and should be returned in the same condition at the end of the rental period.
  4. Responsibilities:
     - The owner is responsible for maintaining the product's functionality and ensuring it is in good working condition.
     - The receiver is responsible for using the product responsibly and returning it in the condition it was received.
  5. Termination: Either party has the right to terminate this agreement with [Notice Period] days' notice.
  6. Dispute Resolution: Any disputes arising from this agreement shall be resolved through mediation or arbitration.`

  const handleConfirm = async (e) => {
    e.preventDefault()
    // Perform the action after confirmation
    console.log('Action confirmed');
    await axios.post('http://localhost:3000/api/products/rentreq/sender/' + request._id, { text })
      .then((response) => {
        console.log(response.data)
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

  const handleConfirmRe = async (e) => {
    e.preventDefault()
    // Perform the action after confirmation
    console.log('Action confirmed');
    await axios.post('http://localhost:3000/api/products/rentreq/sender/reject/' + request._id)
      .then((response) => {
        console.log(response)
        setupdated(false)
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
    setShowConfirmationRe(false);
  };

  const handleCancel = () => {
    // Cancel the action
    console.log('Action canceled');
    setShowConfirmationRe(false);
    setShowConfirmation(false);
  };


  return (
    <>
      <Wrapper>
        <RequestContainer>
          <Info>
            <Product>

              <ProductDetail>
                <Image src={product?.img} />
                <Details>
                  <Link to={`/product/${product._id}`} style={{
                    textDecoration: "none",
                    ":hover": {
                      textDecoration: "underline",
                    }
                  }}><Title>{product.title}</Title></Link>
                  <Label> <strong>Price: </strong> {request.proposed_price}</Label>
                  <Label> <strong>Type: </strong> {request.renttype}</Label>
                  {/* <Title>{request.title}</Title> */}
                </Details>
              </ProductDetail>

              <div><Link to={`/messege?data=${request.owner_id}`}><MessageButton> Message</MessageButton></Link></div>
            </Product>
          </Info>

          {(!updated && (!request.sender_verify || !request.owner_verify)) ? (
            <>
              {request.owner_verify ? (
                <>
                  <VerifyButton onClick={handleaccept}>Verify</VerifyButton>
                  <RejectButton onClick={handlereject}>Reject</RejectButton>
                </>) : (
                <label>Owner hasn't verified this product yet.</label>
              )}

            </>
          ) : (
            <label>Request has been processed.</label>
          )}
          {showConfirmation && (
            <ConfirmationDialog
              message="Are you sure you want to verify? Once you verify, a contract will be generated and you can't undo it."
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          )}
          {ShowConfirmationRe && (
            <ConfirmationDialog
              message="Are you sure you want to reject? Once you reject, you can't undo it."
              onConfirm={handleConfirmRe}
              onCancel={handleCancel}
            />
          )}
          {(request.sender_verify || updated) && (
            <ContractButton onClick={handleclick}>{selected ? "Hide Contract" : "Show Contract"}</ContractButton>
          )}
          {selected && <Contractforexc text={text} />}
        </RequestContainer>
      </Wrapper>
    </>
  )
}


export default Pendingrentrequests