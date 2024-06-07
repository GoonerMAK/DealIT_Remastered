import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";                               // to get get and post requests
import React from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";



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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 10px;
  opacity: 0.5;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

const Products = ({ cat, filters, sort }) => {
  //console.log(cat, filters, sort)
  console.log("filter", filters)

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage); 


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


  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (<>
    <Title>Browse Products</Title>

    <Container>
        {displayedProducts.map((item) => (
          <Product item={item} key={item.id} />
        ))}

    </Container>

    <PaginationContainer>
        <Arrow onClick={handlePrevPage} disabled={currentPage === 1}>
          <ArrowLeftOutlined />
        </Arrow>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Arrow onClick={handleNextPage} disabled={currentPage === totalPages}>
          <ArrowRightOutlined />
        </Arrow>
      </PaginationContainer>
  </>
  );
};

export default Products;