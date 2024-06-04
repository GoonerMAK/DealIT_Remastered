import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import PhoneIcon from '@material-ui/icons/Phone';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import styled from "styled-components";


const ProfileContainer = styled.div`
  display: flex;
`;

const ProfileRight = styled.div`
  flex: 9;
`;

const ProfileCover = styled.div`
  height: 11.25rem;
  position: relative;
`;

const ProfileCoverImg = styled.img`
  width: 100%;
  height: 15.625rem;
  object-fit: cover;
`;

const ProfileUserImg = styled.img`
  width: 9.375rem;
  height: 9.375rem;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 2.5rem;
  border: 0.1875rem solid white;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 5rem;
`;

const Text = styled.p`
  border: 0.0625rem solid gray;
  padding: 0.625rem;
  width: 25rem;
  border-radius: 0.3125rem;
  background-color: #fff;
  margin-top: 0.3125rem;
`;

const Label = styled.label`
  font-size: larger;
  margin-top: 0.625rem;
  padding-bottom: 0.625rem;
`;

const Info = styled.div`
  margin-top: 0.625rem;
  padding-bottom: 0.625rem;
`;

const Icon = styled.span`
  margin-bottom: -0.3125rem;
  margin-right: 0.125rem;
`;


const Profile = () => {
  const upperuser = JSON.parse(localStorage.getItem('user'))
  const user=upperuser.user
    
  return (
    <>
    <Announcement />
    <Navbar />
    <ProfileContainer>
        <Sidebar />
        <ProfileRight>
          <div className="profileRightTop">
            <ProfileCover>
              <ProfileUserImg
                src="https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
                alt="Profile Cover"
              />
            </ProfileCover>
            <ProfileInfo>
              <div className="info">
                <Icon className="icon">
                  <PersonIcon />
                </Icon>
                <Label className="label">Name</Label>
                <Text className="text">{user.username}</Text>
              </div>
              <div className="info">
                <Icon className="icon">
                  <EmailIcon />
                </Icon>
                <Label className="label">Email</Label>
                <Text className="text">{user.email}</Text>
              </div>
              <div className="info">
                <Icon className="icon">
                  <PhoneIcon />
                </Icon>
                <Label className="label">Phone</Label>
                <Text className="text">{user.Phone}</Text>
              </div>
              <div className="info">
                <Icon className="icon">
                  <AssignmentIndIcon />
                </Icon>
                <Label className="label">NID</Label>
                <Text className="text">{user.NID}</Text>
              </div>
            </ProfileInfo>
          </div>
          <div className="profileRightBottom"></div>
        </ProfileRight>
      </ProfileContainer>
    <Footer />
    </>
  );
};

export default Profile;