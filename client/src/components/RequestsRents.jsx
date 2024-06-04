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
  font-size: 24px;
  color: #333;
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

const VerifiedLabel = styled.label`
  font-size: 16px;
  color: black;
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

const ShowContractButton = styled.button`
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

const RequestsRents = ({request}) => 
{
    const [product, setProduct] = useState('')
    const [renttype, setrenttype] = useState(request.renttype)
    const [price, setprice] = useState(request.proposed_price)
    const [selected, setselected]=useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [updated, setupdated] = useState(false)
    const [show, setshow] = useState(false)


    const handleclick = (e)=>{
      setselected(current => !current)
    }

    const handleaccept = () =>{
      setShowConfirmation(true);
    }

    const handleConfirm = async(e) => {
      e.preventDefault()
      // Perform the action after confirmation
      console.log('Action confirmed');
      await axios.post('http://localhost:3000/api/products/rentreq/verifyowner/'+request._id, {price, renttype})
      .then((response) =>{
        console.log(response)
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

    const handleCancel = () => {
      // Cancel the action
      console.log('Action canceled');
      setShowConfirmation(false);
    };

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
        const getRequests = async () => {
          try {
            const res = await axios.get('http://localhost:3000/api/products/rentreq/pending/' + request.owner_id);
            if (Array.isArray(res.data) && res.data.length === 0) {
              console.log('Response is empty for rent');
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

      const text= `this is a contract for `//${product.title} `

    return (
        <>
            <Wrapper>
      {/* <Title>{product.title}</Title> */}
      <Label>Preferred rent type: {renttype}</Label>
      <Label>Change rent type?</Label>
      {!updated && (
        <SelectInput value={renttype} onChange={(e) => setrenttype(e.target.value)}>
          <option value="choose">Choose</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </SelectInput>
      )}
      <Label>Preferred price: {price}</Label>
      <Label>Change price?</Label>
      <PriceInput
        type="number"
        onChange={(e) => setprice(e.target.value)}
        value={price}
      />

      <li>
        <MessageLink to={`/messege?data=${request.sender_id}`}>Message</MessageLink>
      </li>

      {show || request.owner_verify || updated ? (
        <VerifiedLabel>This product is already verified</VerifiedLabel>
      ) : (
        <VerifyButton onClick={handleaccept}>Verify</VerifyButton>
      )}

      {showConfirmation && (
        <ConfirmationDialog
          message="Are you sure you want to verify? Once you verify, the contract will be generated and you can't undo."
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {(request.owner_verify || updated) && (
        <ShowContractButton onClick={handleclick}>Show Contract</ShowContractButton>
      )}

      {selected && <Contractforexc text={text} />}
    </Wrapper>
        </>
    )
}


export default RequestsRents;