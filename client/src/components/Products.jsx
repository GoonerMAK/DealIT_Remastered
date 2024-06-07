import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";                               // to get get and post requests
import React from 'react'


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;                /* To wrap them */
    justify-content: space-between;
`;

const Title = styled.h1`
  text-align: center;
font-size:38px;
color:teal;
`;

const Products = ({ cat, filters, sort }) => {
  //console.log(cat, filters, sort)
  console.log("filter", filters)

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);


  // when the category changes
  useEffect(() => {
    const getProducts = async () => {
      try {
        let url = "http://localhost:3000/api/products";
        if (cat) {
          url += `?categories=${cat}`;
          if (filters) {
            url += `&filters=${filters}`;
          }
        }
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getProducts();
  }, [cat, filters]);

  // useEffect(() => {
  //   cat &&
  //     setFilteredProducts(
  //       products.filter((item) =>
  //         Object.entries(filters).every(([key, value]) =>
  //           item[key].includes(value)
  //         )
  //       )
  //     );
  // }, [products, cat, filters]);


  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);



  return (<>
    <Title>Browse Products</Title>
    <Container>
      {cat
        ? products.map((item) => <Product item={item} key={item.id} />)
        : products
          .slice(0, 8)
          .map((item) => <Product item={item} key={item.id} />)}

    </Container>
  </>
  );
};

export default Products;