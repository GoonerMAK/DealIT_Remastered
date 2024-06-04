import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import styled from "styled-components";
import AlreadyExchangedProducts from "../components/AlreadyExchangedProducts";
import AlreadyRented from "../components/AlreadyRented";
import axios from "axios";



const MyOrdersPage = styled.div`
  display: flex;
`;

const MyOrdersContainer = styled.div`
  margin: 2rem auto;
  width: 1000px;
  padding: 2rem;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  height: 100%;
`;


const Title = styled.h1`
  text-align: center;
`;


const MyexchangeRentproducts = () => {

  const [products, setproducts] = useState([])
  const [rentproducts, setrentproducts] = useState([])
  const [show, setshow]=useState(false)
  const [showRe, setshowRe]=useState(false)
  const upperuser = JSON.parse(localStorage.getItem('user'))
  const user=upperuser.user
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3000/api/products/exchanged/find/'+ user._id
        );
        if (Array.isArray(res.data) && res.data.length === 0) {
          console.log('Response is empty');
          setshowRe(false)
        } else if (typeof res.data === 'object' && Object.keys(res.data).length === 0) {
          console.log('Response is empty');
          setshowRe(false)
          // Handle the case when the response is empty
        } else {
          setshowRe(true);
          console.log('Check if any requests exist', res.data);
        }
        console.log(res.data);
        setproducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [user._id]);

  useEffect(() => {
    const getrentProducts = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3000/api/products/rented/find/'+ user._id
        );
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
        console.log(res.data);
        setrentproducts(res.data);
      } catch (err) {}
    };
    getrentProducts();
  }, [user._id]);

  return (

    <>
      <Announcement />
      <Navbar />
      
      <MyOrdersPage>
        <Sidebar />
        <MyOrdersContainer>
          <Title>Exchanged or Rented Product</Title>
          {showRe&&products.map((product) => (
        < AlreadyExchangedProducts key={product._id} product={product} />
        
      ))}
       {show&&rentproducts.map((product) => (
        < AlreadyRented key={product._id} product={product} />
        
      ))}
      {(!showRe&&!show)&&<label>NO Products</label>}
        </MyOrdersContainer>
      </MyOrdersPage>

      <Footer />
    </>
  );
};

export default MyexchangeRentproducts;
