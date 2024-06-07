import React, { useState, useEffect } from "react"
import Select from "react-select";
import styled from "styled-components";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'
import { useLocation, Link } from "react-router-dom";
import Contractforexc from "./Contractforexc";
import { current } from "@reduxjs/toolkit";
import ConfirmationDialog from "./ConfirmationDialog";


const Wrapper = styled.div`
  padding: 10px;
  display: flex;
`;

const Title = styled.h1`
  margin-bottom: 10px;
font-size:20px;
color:teal;
`;

const RequestContainer = styled.div`
margin: 1rem 0;
// width: 1000px;
max-width:70vw;
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
  padding:6px;
  border-radius:8px;

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
padding: 10px 20px;
  background-color: teal;
  border:1px solid teal;
  color: white;
  border: none;
  justify-content: flex-end;
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


const ProductTitle = styled.h1`
  font-size: 24px;
  color: #333;
`;


const MessageLink = styled(Link)`
  font-size: 16px;
  color: teal;
  text-decoration: none;
  margin-right: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const ContractButton = styled.button`
margin-top:10px;
  margin-bottom:10px;
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

const AlreadyRented = ({ product }) => {

  const [selected, setselected] = useState(false)
  const [Uproduct, setUproduct] = useState('')
  const [isowner, setisowner] = useState(false)
  const [issender, setissender] = useState(false)
  const [owner, setowner] = useState('')
  const [sender, setsender] = useState('')
  const [productData, setProductData] = useState('')



  const [show, setshow] = useState(false)

  const upperuser = JSON.parse(localStorage.getItem('user'))
  const user = upperuser.user

  const handleclick = (e) => {
    setselected(current => !current)
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3000/api/products/find/' + product.objectid
        );
        // console.log(res);
        setUproduct(res.data);

      } catch (err) { }
    };
    getProducts();
  }, [product.objectid]);


  useEffect(() => {
    const getuser = async () => {
      if (user._id === product.owner_id) {
        try {
          const res = await axios.get('http://localhost:3000/api/user/find/' + product.sender_id)
          setsender(res.data)
          setisowner(true)
          console.log("User", res.data)
        } catch (error) {
          console.log(error)
        }
      } else if (user._id === product.sender_id) {
        try {
          const res = await axios.get('http://localhost:3000/api/user/find/' + product.owner_id)
          setowner(res.data)
          setissender(true)
          console.log("user", res.data)
        } catch (error) {
          console.log(error)
        }
      }
    };
    getuser();
  }, [user._id]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3000/api/products/find/' + product.objectid
        );
        // console.log(res);
        setProductData(res.data);
      } catch (err) { }
    };
    getProducts();
  }, [product.objectid]);

  return (
    <>

      <Wrapper>
        <RequestContainer>
          {/* <Title>Rented Product</Title> */}

          <Info>
            <Product>

              <ProductDetail>
                <Image src={productData.img} />

                <Details>
                <Link to={`/product/${productData._id}`} style={{
                  textDecoration: "none",
                  ":hover": {
                    textDecoration: "underline",
                  }
                }}><Title>{productData.title}</Title></Link>
                  {isowner && <Label><strong>Rented to:</strong> {sender.username}</Label>}
                  {issender && <Label><strong>Rented from:</strong> {owner.username}</Label>}
                  <Label><strong>Rented For:</strong> {product.renttype}</Label>
                  <Label><strong>Description:</strong> {productData.desc}</Label>
                  <Label><strong>Rent:</strong> {product.rent_price}</Label>
                </Details>

              </ProductDetail>
              <div><Link to={`/messege?data=${product.sender_id}`}><MessageButton> Message</MessageButton></Link>

              </div>
            </Product>

            <ContractButton onClick={handleclick}>{selected? "Hide Contract": "Show Contract"}</ContractButton>
            {selected && <Contractforexc text={product.contract} />}


          </Info>
        </RequestContainer>
      </Wrapper>


    </>
  )
}


export default AlreadyRented