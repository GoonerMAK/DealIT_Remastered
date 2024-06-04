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
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  padding: 5px;
  font-size: 15px;
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
`

const IconSpan = styled.span`
  display: block;
  height: 30px;
  width: 30px;
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

const Button = styled.button`
  padding: 8px;
  border: 3px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 700;
  font-size: 15px;

  &:hover{
      background-color: #f8f4f9;
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
                    <Language>EN</Language>   
                    <SearchContainer>
                        <Input placeholder="Search"/>
                        <Search style={{color: "gray", fontSize: 20}}/>
                    </SearchContainer>                 
                </Left>

                <Center>
                  <Link to= "/">
                    <Logo>
                         <img src="https://i.ibb.co/wsWfKKn/logo-spl.png" alt="logo-spl" /> 
                    </Logo>
                  </Link>
                    
                </Center>

                <Right>

                
              {user&&

                <MenuItem>
                  <AddIconContainer>
                    <Tooltip>Add Product</Tooltip>
                    <Link to="/addition">
                     <IconSpan>
                      <Add/>
                     </IconSpan>
                     </Link>
                  </AddIconContainer>
                  
                  <LeftPadding> </LeftPadding>
                </MenuItem>  
              }

            {user&&
                <MenuItem>
                  <ChatContainer>
                  <Link to="/messege">
                    <Tooltip>Chats</Tooltip>
                     <IconSpan>
                      <Chat/>
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
                     <IconSpan>
                     <Link to="/Profile">
                      <PersonOutline/>
                      </Link>
                     </IconSpan>
                  </ProfileContainer>
                  
                  <LeftPadding> </LeftPadding>
                </MenuItem>
                 </div>
                )}
                

                {user && (
                  <div>
                <MenuItem>
                  <Button onClick={handleClick}>Log out</Button>
                 </MenuItem>
                 </div>
                )}


                <MenuItem>

                {!user && (
                <MenuItem>
                <Link to="/login"><Button>Login</Button></Link>
                <LeftPadding> </LeftPadding>
                <Link to="/signup"><Button>Signup</Button></Link>
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
                      <IconSpan>
                        <Link to="/Cart">
                        <Badge badgeContent={quantity} color="primary">
                        
                        <ShoppingCartOutlined />
                        </Badge>
                        </Link>
                      </IconSpan>

                      </CartContainer>
                      
                    </MenuItem>
                    

                </Right>
            </Wrapper>
        </Container>
      
    );
  };
  
  export default Navbar;




// npm audit fix --force