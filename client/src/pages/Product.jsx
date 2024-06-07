import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import Exchangerequest from "../components/Exchangerequest"
import axios from "axios";
import { useParams } from "react-router-dom";


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: fit;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 500;
  color:teal;
`;

const Desc = styled.p`
  margin: 10px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 30px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
`;

const OwnerInfo = styled.div`
  font-size:16px;
  &.span{
    font-weight:600;
  }`

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
margin-top:10px;
  width: 50%;
  display: block;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  cursor : pointer;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  cursor : text;
`;

const PrimaryButton = styled.button`
padding: 8px;
border: 2px solid teal;
    background-color: teal;
    color:white;
cursor: pointer;
font-weight: 600;
font-size: 15px;
border-radius:10px;
transition: all 200ms ease;

&:hover{
    // background-color: #f8f4f9;
color:teal;
background-color: white;
    
}
`;

const SecondaryButton = styled.button`
  // padding: 4px;
  border: none;
  color:teal;
  background-color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  border-radius:10px;
  transition: all 200ms ease;
  // border:1px solid teal;
  margin-left:5px;

  &:hover{
      // background-color: #f8f4f9;
      background-color: teal;
      color:white;
      
  }
`

const CategoryContainer = styled.div`
display: flex;
margin-bottom:10px;
margin-top:4px;
`

const Category = styled.span`
background-color:#ccc;
color: teal;
padding:2px 6px;
border-radius: 5px;
margin-right:5px;
`

const Message = styled.div`
margin:10px 0;`


const Product = () => {

  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [isexchange, setisexchange] = useState(false)
  const [isrent, setisrent] = useState(false)
  const [owner, setowner] = useState('')
  const dispatch = useDispatch();

  const upperuser = JSON.parse(localStorage.getItem('user'))
  const user = upperuser.user


  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        console.log(res.data)
        setProduct(res.data);
      } catch { }
    };
    getProduct();
  }, [id]);


  useEffect(() => {
    const getuser = async () => {
      if (product) {
        try {
          const res = await axios.get('http://localhost:3000/api/user/find/' + product.user_email)
          setowner(res.data)
          console.log(res.data)
        } catch (error) {
          console.log(error)
        }
      }
    };
    getuser();
  }, [product.user_email]);



  const handleexchange = (e) => {
    setisexchange(current => !current)
  }

  const handlerent = async (e) => {
    e.preventDefault()
    const owner_id = owner._id
    const sender_id = user._id
    console.log("sender", owner_id)
    const objectid = product._id
    console.log("product", objectid)
    const proposed_price = product.price
    const renttype = product.prefer
    await axios.post('http://localhost:3000/api/Addition/rentrequest',
      { sender_id, owner_id, objectid, proposed_price, renttype }
    ).then((response) => {
      console.log(response)
      setisrent(true)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log("server responded");
      } else if (error.request) {
        console.log("network error");
      } else {
        console.log(error);
      }
    })
  }


  const handleQuantity = (type) => {
    if (type === "dec")  // decrease 
    {
      quantity > 1 && setQuantity(quantity - 1);
    } else  // increase 
    {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () =>     // Update Cart 
  {
    dispatch(
      addProduct({ ...product, quantity, Price })
    );
  };


  return (
    <Container>
      <Announcement />
      <Navbar />

      <Wrapper>

        <ImgContainer>

          <Image src={product.img} />

        </ImgContainer>

        <InfoContainer>
          <Title>{product.title}</Title>
          <OwnerInfo>Posted By <span>{owner.username}</span><Link to={`/messege?data=${product.user_email}`}>
            <SecondaryButton>
              Message
            </SecondaryButton>
          </Link></OwnerInfo>

          <Desc>Description<br /> <span>{product.desc}</span> </Desc>
          {product.categories && product.categories.length > 0 && (
            <div>Tags</div>
          )}
          <CategoryContainer>

            {product.categories && product.categories.map((category, index) => (
              <span key={index}>
                <Category>{category}</Category>
              </span>
            ))}
          </CategoryContainer>

          {product.price && <Price>Tk {product.price}</Price>}

          {product.exchangetype && <Desc>
            Preference: {product.exchangetype}
          </Desc>}
          {product.prefer && <Desc>
            {product.prefer}
          </Desc>}

          {product.purpose === "Exchange" ? <PrimaryButton onClick={handleexchange}>Exchange</PrimaryButton> : null}
          {product.purpose === "Rent" ? <PrimaryButton onClick={handlerent}>Rent</PrimaryButton> : null}
          {product.purpose === "Sell" ?

            <AddContainer>
              <AmountContainer>
                <Remove onClick={() => handleQuantity("dec")} />
                <Amount>{quantity}</Amount>
                <Add onClick={() => handleQuantity("inc")} />
              </AmountContainer>
              <br />
              <div>
                <PrimaryButton onClick={handleClick} >Add to cart</PrimaryButton>
              </div>
            </AddContainer> : null}
          {isexchange && <Exchangerequest Product={product} />}
          {isrent && <Message>Rent request has been sent!</Message>}

        </InfoContainer>

      </Wrapper>

      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;