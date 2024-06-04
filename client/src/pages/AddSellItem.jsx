import React, { useState } from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";


const Container = styled.div`
  max-width: 650px;
  margin: 0 auto;
  padding: 20px;
  background-color: #e9e9e9;
  padding: 50px;

  margin-top: 50px;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  text-align: center;
`;

const StyledForm = styled.form`
  display: grid;
  gap: 20px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
`;

const FileInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: teal;
  color: #fff;
  border: none;
  cursor: pointer;
  Font-size: 15px;

  &:hover {
    background-color: rgb(1, 163, 163);
  }
`;


const AddSellItem = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Price:", price);
    console.log("Categories:", categories);

  
    setTitle("");
    setDescription("");
    setPrice("");
    setCategories("");
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Perform necessary operations with the selected file
    // For example, you can store it in state or display a preview of the image.
    console.log("Selected file:", file);
  };


  return (
    <div>
      <Announcement />
      <Navbar />

      <Container>
        <Title>Add Items For Sell</Title>
        <StyledForm onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="title">Title:</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Description:</Label>
            <TextArea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></TextArea>
          </div>
          <div>
            <Label htmlFor="image">Image:</Label>
            <FileInput
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <Label htmlFor="price">Price:</Label>
            <Input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="categories">Categories:</Label>
            <Input
              type="text"
              id="categories"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
            />
          </div>
          <SubmitButton type="submit">Add Product</SubmitButton>
        </StyledForm>
      </Container>

      <Footer />
    </div>
  );
};

export default AddSellItem;