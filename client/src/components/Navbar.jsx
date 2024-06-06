import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined, Chat, Add, PersonOutline } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import { useSelector } from "react-redux";


const Container = styled.div`
    height: 65px;
    background-color: aliceblue;
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 0.5px solid #BEEFDA;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  border-radius:5px;
`;

const Input = styled.input`
  border: none;
  padding: 5px;
  font-size: 15px;
  outline: none;
  border-radius:4px;
  &:focus {
    outline: none;
    // border: 1px solid teal;
  }
`;

const Logo = styled.div`
  font-weight: bold;
  position: relative;
`;


const Center = styled.div`
    flex: 1;
    text-align: center;
`
const MenuItem = styled.div`
  display: flex;
  font-size: 14px;
  cursor: pointer;
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 50px;
`
const LeftPadding = styled.div`
    padding-left: 20px;
`

const IconContainer = styled.div`
  margin: 5px;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  z-index: 2;
  transition: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  &:hover span,
  &:hover .tooltip {
    text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.4);
  }
  &:hover{
    color:white;
  }
`

const IconSpan = styled.span`
  display: block;
  height: 30px;
  width: 30px;
  color:teal;
  background: white;
  border-radius: 50%;
  position: relative;
  z-index: 2;
  box-shadow: 0px 10px 10px rgba(0,0,0,0.1);
  transition: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  &:hover {
    color: white;
  }
`

const Tooltip = styled.div`
position: absolute;
top: 0;
z-index: 1;
background: teal;
color: #fff;
padding: 10px 18px;
font-size: 15px;
font-weight: 500;
border-radius: 25px;
opacity: 0;
pointer-events: none;
box-shadow: 0px 10px 10px rgba(0,0,0,0.1);
transition: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  ${IconContainer}:hover & {
  top: +40px;
  opacity: 1;
  pointer-events: auto;
  }

&:before {
  position: absolute;
  content: '';
  height: 0px;
  width: 0px;
  background: #fff;
  left: 50%;
  bottom: -6px;
  transform: translateX(-50%) rotate(45deg);
  transition: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
`
const ChatContainer = styled(IconContainer)`
  &:hover ${IconSpan},
  &:hover ${Tooltip},
  &:hover ${Tooltip}:before {
    background: teal;
  }
`

const CartContainer = styled(IconContainer)`
  &:hover ${IconSpan},
  &:hover ${Tooltip},
  &:hover ${Tooltip}:before {
    background: teal;
  }
`
const AddIconContainer = styled(IconContainer)`
  &:hover ${IconSpan},
  &:hover ${Tooltip},
  &:hover ${Tooltip}:before {
    background: teal;
  }
`
const ProfileContainer = styled(IconContainer)`
  &:hover ${IconSpan},
  &:hover ${Tooltip},
  &:hover ${Tooltip}:before {
    background: teal;   
  }
`

const PrimaryButton = styled.button`
  padding: 8px;
  border: 2px solid teal;
  color:teal;
  background-color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  border-radius:10px;
  transition: all 200ms ease;

  &:hover{
      // background-color: #f8f4f9;
      background-color: teal;
      color:white;
      
  }
`

const SecondaryButton = styled.button`
  padding: 8px;
  border: none;
  color:teal;
  background-color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  border-radius:10px;
  transition: all 200ms ease;

  &:hover{
      // background-color: #f8f4f9;
      background-color: teal;
      color:white;
      
  }
`


const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  console.log(user)

  const handleClick = () => {
    logout()
  }

  const quantity = useSelector(state => state.cart.quantity)

  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "teal", fontSize: 20, marginLeft: '5px', marginRight: '2px' }} />
          </SearchContainer>
        </Left>

        <Center>
          <Link to="/">
            <Logo>
              <img src="https://i.ibb.co/wsWfKKn/logo-spl.png" alt="logo" />
            </Logo>
          </Link>

        </Center>

        <Right>


          {user &&

            <MenuItem>
              <AddIconContainer>
                <Tooltip>Add Product</Tooltip>
                <Link to="/addition">
                  <IconSpan>
                  <div style={{paddingTop:'2.5px'}}>
                    <Add />
                    </div>
                    </IconSpan>
                </Link>
              </AddIconContainer>

              <LeftPadding> </LeftPadding>
            </MenuItem>
          }

          {user &&
            <MenuItem>
              <ChatContainer>
                  <Tooltip>Chats</Tooltip>
                <Link to="/messege">
                  <IconSpan>
                    <div style={{paddingTop:'4px'}}>
                    <Chat />
                    </div>
                  </IconSpan>
                </Link>
              </ChatContainer>

              <LeftPadding> </LeftPadding>
            </MenuItem>
          }


          {user && (
            <div>
              <MenuItem>
                <ProfileContainer>
                    <Tooltip>{user.email}</Tooltip>
                  <Link to="/Profile">
                    <IconSpan>
                    <div style={{paddingTop:'2px'}}>
                      <PersonOutline />
                      </div>
                    </IconSpan>
                  </Link>
                </ProfileContainer>

                <LeftPadding> </LeftPadding>
              </MenuItem>
            </div>
          )}


          {user && (
            <div>
              <MenuItem>
                <PrimaryButton onClick={handleClick}>Log out</PrimaryButton>
              </MenuItem>
            </div>
          )}


          <MenuItem>

            {!user && (
              <MenuItem>
                <Link to="/signup"><SecondaryButton>Register</SecondaryButton></Link>
                <LeftPadding> </LeftPadding>
                <Link to="/login"><PrimaryButton>Login</PrimaryButton></Link>
              </MenuItem>
            )}
            {/* <Link to="/signup">Register</Link>
                  <Link to="/login"> LogIN </Link> */}
            {/* <MenuItem>REGISTER</MenuItem>
                    <MenuItem>SIGN IN</MenuItem> */}
          </MenuItem>


          <MenuItem>
            <LeftPadding> </LeftPadding>
            <CartContainer>
                <Tooltip> Cart </Tooltip>
              <Link to="/Cart">
                <IconSpan>
                  <Badge badgeContent={quantity} color="primary">

                <div style={{paddingTop:'4px'}}>
                    <ShoppingCartOutlined /></div>
                  </Badge>
                </IconSpan>
              </Link>

            </CartContainer>

          </MenuItem>


        </Right>
      </Wrapper>
    </Container>

  );
};

export default Navbar;