///NOT INCKUDED*******

import { useState } from "react"
import Select from "react-select";
import styled from "styled-components";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'
import React from 'react'


const Form = styled.form`
  max-width: 400px;
  margin-left: 70px;
  margin-top: 10px;
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const FileInput = styled.input`
  display: block;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: teal;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 15px; 
  &:hover {
    background-color: rgb(10%, 60.2%, 70.2%);
  }
`;

const Error = styled.div`
  color: red;
  margin-top: 10px;
`;


const Rentrequests = (product) =>{
    const { user } = useAuthContext()
    const {Product} = product

    const [returndate, setreturndate] = useState('')
    //price
    //prefer
    const [error, setError] = useState(null)




    const handleSubmit  = async(e) => {
        handleimagesave()
        const owner_id=Product.user_email
        const sender_id=user.user._id 
        console.log("sender",owner_id)
        const objectid=Product._id
        console.log("product",objectid)
        e.preventDefault()
        //add to the backend part 

        console.log(img)
        await axios.post('http://localhost:3000/api/Addition/exchangerequest', 
        {sender_id, owner_id, objectid,returndate}
        ).then((response)=>{
            console.log(response)
            setTitle('')
            setdesc('')
            setreturndate('')
            setimg('')
            setError(null)
            setimgfile('')
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

    }


    return (
        <Form className="exchange" onSubmit={handleSubmit} encType='multipart/form-data'> 
            <Title>Place a request for exchange</Title>

            <Label>Product Price:{Product.price}</Label>
            <Label>Set a preferred price?</Label>
            <Input 
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            // className={emptyFields.includes('title') ? 'error' : ''}
            />
          <Label>Description: </Label>

          <Input 
            type="text"
            onChange={(e) => setdesc(e.target.value)}
            value={desc}
            // className={emptyFields.includes('reps') ? 'error' : ''}
          />

          <Label>Image: </Label>
          <FileInput 
            type="file"
            name="photos"
            onChange={handleimage}
            className="form-control-file"
            multiple
            // className={emptyFields.includes('reps') ? 'error' : ''}
          />

          <Label>Return Date:</Label>

        <Input type="date" onChange={(e) => setreturndate(e.target.value)} value={returndate}/>
          <Button>Place a Request</Button>

          {error && <Error className="error">{error}</Error>}
        </Form>

        )

}
export default Rentrequests;