import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Requestsexchange from "../components/Requestsexchange"
import RequestsRents from "../components/RequestsRents";
import React from 'react'

import { useAuthContext } from '../hooks/useAuthContext'


const ProductRnetedorExchanged=()=>{
    const upperuser = JSON.parse(localStorage.getItem('user'))
    const user=upperuser.user

    
    const [products, setProducts]=useState([])
    const [show, setshow] = useState(false)
    

    useEffect(() => {
        const getproducts = async () => {
          try {
            const res = await axios.get('http://localhost:3000/api/products/exchanged/find/' + user._id);
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
            setProducts(res.data);
            console.log(res.data)
          } catch (err) {
            console.log(err);
          }
        };
        getproducts();
      }, [user._id]);

      

      return (
        <>{show?
        <>
        {products.map((product) => (
        <Requestsexchange  key={product._id} product={product} />
      ))}
      
        </>:<label>No products requested</label>}
        </>
      )
    
    
}
export default ProductRnetedorExchanged