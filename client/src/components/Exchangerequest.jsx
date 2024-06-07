import React, { useState } from "react"
import Select from "react-select";
import styled from "styled-components";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'

const Form = styled.form`
  max-width: 400px;
  // margin-left: 70px;
  margin-top: 10px;
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  font-size:38px;
  color:teal;
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


const Exchangerequest = (product) =>{
    const { user } = useAuthContext()
    const {Product} = product
    const [title, setTitle] = useState('')
    const [imgfile, setimgfile]=useState('')
    const [img, setimg] = useState('')
    const [returndate, setreturndate] = useState('')
    const [desc, setdesc] = useState('')
    const [error, setError] = useState(null)


    const handleimage= (e)=>{
        e.preventDefault()
        // const formData = new FormData()
  
        var fileObject = e.target.files[0];
        setimgfile(fileObject);
      }


      const handleimagesave=()=>{
        const formData = new FormData()
          formData.append("file", imgfile)
          formData.append("upload_preset", "Product_image")
  
          axios.post(
            "https://api.cloudinary.com/v1_1/dcpremwwm/image/upload",formData)
            .then((response) => {
              console.log("for image URL", response);
              setimg(response.data.secure_url);
              }).catch((error) => {
                console.log(error);
            })
      }

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
        {title, desc, img, sender_id, owner_id, objectid,returndate}
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
            {/* <Title>Place a request for exchange</Title> */}
    
            <Label>Product Title:</Label>
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
export default Exchangerequest;