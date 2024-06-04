import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components"
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";

const Container = styled.div`
`;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;

const Option = styled.option``;


const ProductList = () => {

  const location = useLocation();
  // console.log(location.pathname.split("/")[2]);
  const cat = location.pathname.split("/")[2];
  console.log(cat)
  const [filters, setFilters] = useState('');
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters(value);
  };
  // console.log(filters)
  
  
  return (
    <Container>
        <Announcement/>
        <Navbar/>

        <Title>Products</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter :</FilterText>

          <Select name="Categories" onChange={handleFilters}>
            <Option disabled selected>
              Categories
            </Option>
            <Option>Electronics</Option>
            <Option>Pc Components</Option>
            <Option>Sports</Option>
            <Option>Gadgets</Option>
            <Option>Laptop</Option>
            <Option>Home & Living</Option>
            <Option>Education</Option>
                <Option>phone</Option>
            <Option>Others</Option>
          </Select>

          {/* <Select name="Location" onChange={handleFilters}>
            <Option disabled selected>
              Location
            </Option>
            <Option>Dhaka</Option>
            <Option>Rajshahi</Option>
            <Option>Chattogram</Option>
            <Option>Khulna</Option>
            <Option>Barishal</Option>
            <Option>Sylhet</Option>
            <Option>Mymensingh</Option>
            <Option>Rangpur</Option>
          </Select> */}
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="oldest">Oldest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
        
        <Products cat={cat} filters={filters} sort={sort} />

        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default ProductList