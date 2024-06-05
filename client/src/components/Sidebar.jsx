import React from "react";
import EditIcon from '@material-ui/icons/Edit';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import StorageIcon from '@material-ui/icons/Storage';
import StoreIcon from '@material-ui/icons/Store';
import styled from "styled-components";
import { Link } from "react-router-dom";


const SidebarWrapper = styled.div`
  padding: 20px;
`;

const SidebarList = styled.ul`
  padding: 10;
  margin: 0;
  list-style: none;
  padding-top: 40px;
`;

const SidebarListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: larger;
  padding-bottom: 10px;
  cursor: pointer;
  color: black;

  &:hover {
    background-color: lightgray;
  }

  &.active {
    color: teal; 
  }

`;

const SidebarIcon = styled.div`
  margin-right: 15px;
  color: teal;
`;

const Bar = styled.div`
  height: 80vh;
  overflow-y: scroll;
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

const Sidebar = () => {

  return (
    <Bar>

      <SidebarWrapper>

        <Scrollbar>

          <SidebarList>

            <StyledLink to = "/EditProfile">
            <SidebarListItem>
              <SidebarIcon>
                <EditIcon />
              </SidebarIcon>
              <SidebarListItemText>Edit Profile</SidebarListItemText>
            </SidebarListItem>
            </StyledLink>

            <StyledLink to = "/Myrentexchange">
            <SidebarListItem>
              <SidebarIcon>
                <StorageIcon />
              </SidebarIcon>
              <SidebarListItemText>My Rented or Exchanged Products</SidebarListItemText>
            </SidebarListItem>
            </StyledLink>

            <StyledLink to = "/myproducts">
            <SidebarListItem>
              <SidebarIcon>
                <StorageIcon />
              </SidebarIcon>
              <SidebarListItemText>My Products</SidebarListItemText>
            </SidebarListItem>
            </StyledLink>

            <StyledLink to = "/MyOrders">
            <SidebarListItem>
              <SidebarIcon>
                <LocalMallIcon />
              </SidebarIcon>
              <SidebarListItemText>My Orders</SidebarListItemText>
            </SidebarListItem>
            </StyledLink>

            <StyledLink to = "/PendingRequests">
            <SidebarListItem>
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