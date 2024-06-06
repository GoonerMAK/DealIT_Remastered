import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components"
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { publicRequest } from "../requestMethods";
import Product from "../components/Product";

const Container = styled.div`
`;

const ProductContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;                /* To wrap them */
    justify-content: space-between;
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


const SearchResultPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState("");
  const [sort, setSort] = useState("newest");
  const [searchQuery, setSearchQuery] = useState('')
  console.log("search page")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const search = searchParams.get("query");
        setSearchQuery(search)
        console.log("search ", search)
        const res = await publicRequest.get(`/products/search/?search=${search}`);
        setProducts(res.data);
        console.log(res.data)
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [location.search]);

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters(value);
  };

  return (<>
    <Announcement />
    <Navbar />

    <Title>Showing results for "{searchQuery}":</Title>
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

    <ProductContainer>
      {products.length === 0 ? (
        <div>No products found.</div>
      ) : (
        <>
          {products.map((item) => (
            <Product item={item} key={item.id} />
          ))}
        </>
      )}
    </ProductContainer>
    <Newsletter />
    <Footer />
  </>
  );
}

export default SearchResultPage