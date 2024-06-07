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
border: 3px solid teal;
background-color: white;
color:teal;
border-radius:7px;
  margin-bottom:10px;
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

const Description = styled.label`
  font-size: 16px;
  color: black;
`;

const ReturnDate = styled.label`
  font-size: 16px;
  color: black;
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


const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
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

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Input = styled.input`
  width: 40%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  margin-left: 200px;

`;

const Label = styled.label`
  font-size: 19px;
  color: black;
  margin-bottom: 3px;
`;

const Image = styled.img`
  width: 200px;
`;

const MessageLink = styled(Link)`
  text-decoration: none;
  color: blue;
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


const   Pendingexchange = ({ request }) => {
  const [product, setProduct] = useState('')
  const [returndate, setreturndate] = useState(request.return_date)
  const [selected, setselected] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [ShowConfirmationRe, setShowConfirmationRe] = useState(false);
  const [updated, setupdated] = useState(false)
  const [show, setshow] = useState(false)
  const [owner, setowner] = useState('')
  const [sender, setsender] = useState('')

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
  2. Verification:
     - The owner has verified the item.
     - The sender has yet to verify the item.
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

  const handleConfirm = async (e) => {
    e.preventDefault()
    // Perform the action after confirmation
    console.log('Action confirmed');
    await axios.post('http://localhost:3000/api/products/exchangereq/sender/' + request._id, { text })
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
    await axios.post('http://localhost:3000/api/products/exchangereq/sender/reject/' + request._id)
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
              <Image src={request.img} />

              <Details>
                {/* <Label> <strong>Product: </strong> {product.title}</Label> */}
                <Link to={`/product/${product._id}`} style={{
                  textDecoration: "none",
                  ":hover": {
                    textDecoration: "underline",
                  }
                }}><Title>{product.title}</Title></Link>

                <Label> <strong>Exchange Item: </strong> {request.title}</Label>
                <Label> <strong>Description: </strong> {request.desc}</Label>
                <Label> <strong>Return Date: </strong> {new Date(returndate).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</Label>
              </Details>

            </ProductDetail>
            <div><Link to={`/messege?data=${request.sender_id}`}><MessageButton> Message</MessageButton></Link></div>
          </Product>

        </Info>



        {!updated && (
          <>{request.owner_verify ? (
              <>
                <label>This product has been verified by the owner.</label>
              </>
            ) : (
              <>
                <label>Owner hasn't verified this product yet. </label>
              </>
            )}
            {(!request.sender_verify && request.owner_verify)  ? (
              <div>
                <VerifyButton onClick={handleaccept}>Verify</VerifyButton>
                <RejectButton onClick={handlereject}>Reject</RejectButton>
              </div>
            ) : (
              <>
              </>
            )}
            
          </>
        )}




        {showConfirmation && (
          <ConfirmationDialog
            message="Are you sure you want to verify? Once you verify, the contract will be generated and you can't undo."
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}

        {ShowConfirmationRe && (
          <ConfirmationDialog
            message="Are you sure you want to reject? Once you reject, you can't undo."
            onConfirm={handleConfirmRe}
            onCancel={handleCancel}
          />
        )}

        {(request.sender_verify || updated) && (
          <ContractButton onClick={handleclick}>{selected? "Hide Contract": "Show Contract"}</ContractButton>
        )}

        {selected && <Contractforexc text={text} />}
      </RequestContainer>
      </Wrapper>

    </>
  )
}


export default Pendingexchange