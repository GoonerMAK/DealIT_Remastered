import React, { useState } from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import axios from "axios";

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
  font-size: 15px;

  &:hover {
    background-color: rgb(1, 163, 163);
  }
`;

const AddRentItem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [imgfile, setImgFile] = useState("");

  const handleImageChange = (e) => {
    e.preventDefault()
    setImgFile(e.target.files[0]);
  };

  const handleImageSave = async () => {
    const formData = new FormData();
    formData.append("file", imgfile);
    formData.append("upload_preset", "Product_image");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dcpremwwm/image/upload",
        formData
      );
      console.log("Image uploaded:", response.data.secure_url);
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedImageURL = await handleImageSave();

    const formData = {
      title,
      description,
      price,
      categories,
      image: uploadedImageURL,
    };

    console.log("Form Data:", formData);

    // Reset form fields
    setTitle("");
    setDescription("");
    setPrice("");
    setCategories("");
    setImgFile("");
  };

  return (
    <div>
      <Announcement />
      <Navbar />

      <Container>
        <Title>Add Items For Rent</Title>
        <StyledForm onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="title">Title:</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description:</Label>
            <TextArea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)} required
            />
          </div>
          <div>
            <Label htmlFor="image">Image:</Label>
            <FileInput
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange} required
            />
          </div>
          <div>
            <Label htmlFor="price">Price:</Label>
            <Input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)} required
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

export default AddRentItem;
