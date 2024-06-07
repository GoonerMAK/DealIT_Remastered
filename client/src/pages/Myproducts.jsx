import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components"
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Product from "../components/Product"
import axios from "axios";
import Sidebar from "../components/Sidebar";

const MyOrdersPage = styled.div`
  display: flex;
`;

const MyOrdersContainer = styled.div`
margin: 1rem auto;
// width: 1000px;
min-width:70vw;
padding: 2rem;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  height: 100%;
`;


const Title = styled.h1`
  text-align: center;
font-size:38px;
color:teal;
`;


const Myproducts = () => {

  const [items, setitems] = useState([])
  const upperuser = JSON.parse(localStorage.getItem('user'))
  const user = upperuser.user

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3000/api/products/find/user/' + user._id
        );
        // console.log(res);
        setitems(res.data);

      } catch (err) { }
    };
    getProducts();
  }, [user._id]);
  // console.log(filters)


  return (

    <>
      <Announcement />
      <Navbar />

      <MyOrdersPage>
        <Sidebar activePage={"myproducts"} />
        <MyOrdersContainer>
          <Title>My Products</Title>
          {items.length === 0 ? (
            <div>No products found</div>
          ) : (
            items.map((item) => <Product item={item} key={item.id} />)
          )}
        </MyOrdersContainer>
      </MyOrdersPage>

      <Footer />
    </>

  )
}

export default Myproducts