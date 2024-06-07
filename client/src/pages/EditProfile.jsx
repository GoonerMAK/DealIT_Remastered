import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import styled from "styled-components";


const EditProfilePage = styled.div`
  display: flex;
`;

const EditProfileContainer = styled.div`
  margin: 3rem auto;
  width: 600px;
  padding: 3rem;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  height: 100%;
`;

const Form = styled.form`
  gap: 0px;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Title = styled.h1`
  text-align: center;
  font-size:38px;
  color:teal;
`;

const SubmitButton = styled.button`
padding: 10px 20px;
  background-color: teal;
  color: #fff;
  border: none;
  border-radius:25px;
  cursor: pointer;
  font-size: 15px;
  margin-top:10px;
  &:hover {
    background-color: rgb(1, 163, 163);
  }
`;

const Label=styled.label`
  color:teal;`


const EditProfile = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nid, setNid] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [updated, setUpdated] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdated(true);
  };


  return (

    <>
      <Announcement />
      <Navbar />
      
      <EditProfilePage>
        <Sidebar activePage={"EditProfile"}/>
        <EditProfileContainer>
          <Title>Edit Profile</Title>
          <Form onSubmit={handleUpdate}>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>NID</Label>
              <Input
                type="text"
                value={nid}
                onChange={(e) => setNid(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Phone Number</Label>
              <Input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <SubmitButton type="submit">Update</SubmitButton>
          </Form>
        </EditProfileContainer>
      </EditProfilePage>

      <Footer />
    </>
  );
};

export default EditProfile;
