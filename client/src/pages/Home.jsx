import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";



/* rafce created this function */

const Home = () => {
  return (
    <div>
      <Announcement/>
      <Navbar/>
      {/* <Heading/> */}
      {/* <Products/> */}
      <Slider/>

      <Categories/>
      <Products/>
      
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;


// npm i styled-components