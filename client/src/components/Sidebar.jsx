import React from "react";
import EditIcon from '@material-ui/icons/Edit';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import StorageIcon from '@material-ui/icons/Storage';
import StoreIcon from '@material-ui/icons/Store';
import styled from "styled-components";
import { Link } from "react-router-dom";

const SidebarWrapper = styled.div`
  padding: 20px;
  overflow-y:hidden;
`;

const SidebarList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  padding-top: 40px;
`;

const SidebarIcon = styled.div`
  margin-right: 15px;
  height: 25px;
`;

const SidebarListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: larger;
  padding: 10px 0px 10px 5px;
  cursor: pointer;
  color: black;
  border-radius: 8px;
  transition: all 200ms ease;

  &.active {
    background-color: teal;
    color: white;
  }
  &.active:hover {
    background-color: teal;
    color: white;
  }
  &:hover{
    background-color: lightgray;
    color:teal
  }

`;

const Bar = styled.div`
  height: 80vh;
  overflow-y: auto;
  position: sticky;
  top: 50px;
  width: 300px;
`;

const Scrollbar = styled.div`
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(179, 179, 179);
  }
`;

const SidebarListItemText = styled.div`
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Sidebar = ({ activePage }) => {
  return (
    <Bar>
      <SidebarWrapper>
        <Scrollbar>
          <SidebarList>
            <StyledLink to="/EditProfile">
              <SidebarListItem className={activePage === "EditProfile" ? "active" : ""}>
                <SidebarIcon>
                  <EditIcon />
                </SidebarIcon>
                <SidebarListItemText>Edit Profile</SidebarListItemText>
              </SidebarListItem>
            </StyledLink>

            <StyledLink to="/Myrentexchange">
              <SidebarListItem className={activePage === "Myrentexchange" ? "active" : ""}>
                <SidebarIcon>
                  <StorageIcon />
                </SidebarIcon>
                <SidebarListItemText>Rented & Exchanged Products</SidebarListItemText>
              </SidebarListItem>
            </StyledLink>

            <StyledLink to="/myproducts">
              <SidebarListItem className={activePage === "myproducts" ? "active" : ""}>
                <SidebarIcon>
                  <StorageIcon />
                </SidebarIcon>
                <SidebarListItemText>My Products</SidebarListItemText>
              </SidebarListItem>
            </StyledLink>

            <StyledLink to="/MyOrders">
              <SidebarListItem className={activePage === "MyOrders" ? "active" : ""}>
                <SidebarIcon>
                  <LocalMallIcon />
                </SidebarIcon>
                <SidebarListItemText>My Orders</SidebarListItemText>
              </SidebarListItem>
            </StyledLink>

            <StyledLink to="/PendingRequests">
              <SidebarListItem className={activePage === "PendingRequests" ? "active" : ""}>
                <SidebarIcon>
                  <StoreIcon />
                </SidebarIcon>
                <SidebarListItemText>Pending Request</SidebarListItemText>
              </SidebarListItem>
            </StyledLink>
          </SidebarList>
        </Scrollbar>
      </SidebarWrapper>
    </Bar>
  );
};

export default Sidebar;
