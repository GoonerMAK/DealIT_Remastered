import { useState, useEffect } from "react"
import Select from "react-select";
import styled from "styled-components";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'
import { useLocation , Link} from "react-router-dom";
import Contractforexc from "./Contractforexc";
import { current } from "@reduxjs/toolkit";
import ConfirmationDialog from "./ConfirmationDialog";
import React from 'react'


const Wrapper = styled.div`
  padding: 10px;
`;

const Title = styled.h1`
font-size:38px;
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

const VerifyButton = styled.button`
  padding: 8px;
  border: 3px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 700;
  font-size: 15px;

  &:hover {
    background-color: #f8f4f9;
  }
`;

const RejectButton = styled.button`
  padding: 8px;
  border: 3px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 700;
  font-size: 15px;

  &:hover {
    background-color: #f8f4f9;
  }
`;


const Pendingrentrequests = ({request}) => {

    const [product, setProduct] = useState('')
    const [renttype, setrenttype] = useState(request.renttype)
    const [price, setprice] = useState(request.proposed_price)
    const [selected, setselected]=useState(false)
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
            'http://localhost:3000/api/products/find/'+ request.objectid
          );
          // console.log(res);
          setProduct(res.data);
        } catch (err) {}
      };
      getProducts();
    }, [request.objectid]);

    useEffect(() => {
      const getsender = async () => {
        try{
          const res = await axios.get('http://localhost:3000/api/user/find/'+request.sender_id)
          setsender(res.data)
          console.log(res.data)
        }catch(error)
        {
          console.log(error)
        }
    };
    getsender();
    },[request.sender_id]);

    useEffect(() => {
      const getowner = async () => {
        try{
          const res = await axios.get('http://localhost:3000/api/user/find/'+request.owner_id)
          setowner(res.data)
          console.log(res.data)
        }catch(error)
        {
          console.log(error)
        }
    };
    getowner();
    },[request.owner_id]);
    
    const handleclick = (e)=>{
      setselected(current => !current)
    }

    const handleaccept = () =>{
      setShowConfirmation(true);
    }
    const handlereject = () =>{
      
      setShowConfirmationRe(true);
    }

    const text= `this is a contract for ${product.title}. 
    Where Owner ID: ${request.owner_id} Name: ${owner.username} 
    Rented this product to Reciever ID: ${request.sender_id} 
    Name: ${sender.username}. And ${request.renttype} t
    Rent is ${request.price}. 
    \n This product was handovered in good condition `
    
    const handleConfirm = async(e) => {
      e.preventDefault()
      // Perform the action after confirmation
      console.log('Action confirmed');
      await axios.post('http://localhost:3000/api/products/rentreq/sender/'+request._id, {text})
      .then((response) =>{
        console.log(response.data)
          setupdated(true)
      }).catch((error)=>{
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

    const handleConfirmRe = async(e) => {
      e.preventDefault()
      // Perform the action after confirmation
      console.log('Action confirmed');
      await axios.post('http://localhost:3000/api/products/rentreq/sender/reject/'+request._id)
      .then((response) =>{
        console.log(response)
          setupdated(false)
      }).catch((error)=>{
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
      {/* <Title>{product.title}</Title> */}
      <Price>{request.proposed_price}</Price>
      <RentType>{request.renttype}</RentType>
      <li>
        <MessageLink to={`/messege?data=${request.owner_id}`}>
          Message
        </MessageLink>
      </li>
      {updated ? (
        <>
          {request.owner_verify ? (
            <VerifyButton onClick={handleaccept}>Verify</VerifyButton>
          ) : (
            <label>Owner hasn't verified this product yet.</label>
          )}
          {request.owner_verify ? (
            <RejectButton onClick={handlereject}>Reject</RejectButton>
          ) : (
            <label>Owner hasn't verified this product yet.</label>
          )}
        </>
      ) : (
        <label>You have already processed this</label>
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
        <button onClick={handleclick}>Show Contract</button>
      )}
      {selected && <Contractforexc text={text} />}
    </Wrapper>
        </>
    )
}


export default Pendingrentrequests