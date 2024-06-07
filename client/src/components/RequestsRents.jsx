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

const Title = styled.h1`
font-size:20px;
color:teal;
`;

const Label = styled.label`
  font-size: 16px;
  color: black;
  margin-bottom: 3px;
`;

const SelectInput = styled.select`
  width: 200px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const PriceInput = styled.input`
  width: 200px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const MessageLink = styled(Link)`
  text-decoration: none;
  color: blue;
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
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
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

const Image = styled.img`
  width: 200px;
`;

const VerifiedLabel = styled.label`
  font-size: 16px;
  color: black;
`;

const VerifyButton = styled.button`
  margin-top:10px;
  padding: 8px;
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

const ContractButton = styled.button`
  margin-top:10px;
  padding: 8px;
  border: 3px solid teal;
  background-color: white;
  color:teal;
  border-radius:7px;
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  transition: all 500ms ease;
  margin-bottom:10px;

  &:hover {
    background-color: teal;
    color: white;
  }
`;

const ContractViewer = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const RequestsRents = ({ request }) => {
  const [product, setProduct] = useState('')
  const [renttype, setrenttype] = useState(request.renttype)
  const [price, setprice] = useState(request.proposed_price)
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

  const handleConfirm = async (e) => {
    e.preventDefault()
    // Perform the action after confirmation
    console.log('Action confirmed');
    await axios.post('http://localhost:3000/api/products/rentreq/verifyowner/' + request._id, { price, renttype })
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
        setProduct(res.data);
      } catch (err) { }
    };
    getProducts();
  }, [request.objectid]);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/products/rentreq/pending/' + request.owner_id);
        if (Array.isArray(res.data) && res.data.length === 0) {
          setshow(false)
        } else if (typeof res.data === 'object' && Object.keys(res.data).length === 0) {
          setshow(false)
        } else {
          setshow(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getRequests();
  }, [request.owner_id, request.owner_verify]);

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

  const text = `Rent Contract

  This document serves as a legal agreement between the parties involved in the rental transaction. The details outlined below must be adhered to by both parties:
  
  Product Details:
  - Product: ${product.title}
  - Owner ID: ${request.owner_id}
  - Owner Name: ${owner.username}
  - Receiver ID: ${request.sender_id}
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
  6. Dispute Resolution: Any disputes arising from this agreement shall be resolved through mediation or arbitration.
`

  return (
    <>
      <Wrapper>
        <Info>
          <Product>
            <ProductDetail>
              <Image src={product.img} />
              <Details>
                <Link to={`/product/${product._id}`} style={{
                  textDecoration: "none",
                  ":hover": {
                    textDecoration: "underline",
                  }
                }}><Title>{product.title}</Title></Link>
                <Label>Preferred rent type: {renttype}</Label>
                <Label>Change rent type?</Label>
                {!request.owner_verify && !updated && (
                  <SelectInput value={renttype} onChange={(e) => setrenttype(e.target.value)}>
                    <option value="choose">Choose</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </SelectInput>
                )}
                <Label>Preferred price: {price}</Label>
                {!request.owner_verify && (<>
                  <Label>Change price?</Label>
                  <PriceInput
                    type="number"
                    onChange={(e) => setprice(e.target.value)}
                    value={price}
                  />
                </>)}
                {!updated && !request.owner_verify ? (
                  <>
                    <VerifyButton onClick={handleaccept}>Verify</VerifyButton>
                  </>
                ) : (
                  <label>You have processed this request. </label>
                )}

                {!updated && !request.sender_verify ? (
                  <>
                    <label>Awaiting verification from sender. </label>
                  </>
                ) : (
                  <label>Sender has verified the request. </label>
                )}
              </Details>
            </ProductDetail>
            <div><Link to={`/messege?data=${request.owner_id}`}><MessageButton>Message</MessageButton></Link></div>
          </Product>

          {(request.owner_verify) && (
            <ContractViewer>
              <ContractButton onClick={handleclick}>{selected ? "Hide Contract" : "Show Contract"}</ContractButton>
            </ContractViewer>
          )}
          <ContractViewer>{selected && <Contractforexc text={text} />}</ContractViewer>
        </Info>

        {showConfirmation && (
          <ConfirmationDialog
            message="Are you sure you want to verify? Once you verify, the contract will be generated and you can't undo."
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}


      </Wrapper>
    </>
  )
}

export default RequestsRents;
