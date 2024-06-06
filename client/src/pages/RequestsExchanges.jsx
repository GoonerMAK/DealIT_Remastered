import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Requestsexchange from "../components/Requestsexchange"
import RequestsRents from "../components/RequestsRents";
import { useAuthContext } from '../hooks/useAuthContext'
import styled from "styled-components";

const Label = styled.label`
  font-size: 19px;
  color: black;
  margin-bottom: 3px;
  margin-top: 3px;
  margin-left: 3px;
  margin-right: 3px;
`;


const RequestsExchanges=()=>{
    const upperuser = JSON.parse(localStorage.getItem('user'))
    const user=upperuser.user

    const [requests, setrequests]= useState([])
    const [rentrequests, setrentrequests] = useState([])
    const [show, setshow] = useState(false)
    

    useEffect(() => {
        const getrequests = async () => {
          try {
            const res = await axios.get('http://localhost:3000/api/products/exchangereq/' + user._id);
            // console.log("for message", res.data)
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
            setrequests(res.data);
            console.log(res.data)
          } catch (err) {
            console.log(err);
          }
        };
        getrequests();
      }, [user._id]);

      useEffect(() => {
        const getrentrequests = async () => {
          try {
            const res = await axios.get('http://localhost:3000/api/products/rentreq/' + user._id);
            // console.log("for message", res.data)
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
            setrentrequests(res.data);
            console.log(res.data)
          } catch (err) {
            console.log(err);
          }
        };
        getrentrequests();
      }, [user._id]);

      return (
        <>{show?
        <>
        {requests.map((request) => (
        <Requestsexchange  key={request._id} request={request} />
      ))}
      {rentrequests.map((request) => (
        <RequestsRents  key={request._id} request={request} />
      ))}
      
        </>:<Label>No requesting products</Label>}
        </>
      )
    
    
}
export default RequestsExchanges