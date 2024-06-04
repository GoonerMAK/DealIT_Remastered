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
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
`;

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
  width: 50%;
  display: flex;
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

const Button = styled.button`
  width: 15%;
  padding: 15px;
  border: 3px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;



const Product = () => {

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [isexchange, setisexchange]= useState(false)
  const [isrent, setisrent]= useState(false)
  const [owner, setowner]=useState('')
  const dispatch = useDispatch();

  const upperuser = JSON.parse(localStorage.getItem('user'))
  const user=upperuser.user


  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);


  useEffect(() => {
    const getuser = async () => {
      if(product){
      try{
        const res = await axios.get('http://localhost:3000/api/user/find/'+product.user_email)
        setowner(res.data)
        console.log(res.data)
      }catch(error)
      {
        console.log(error)
      }
    }
  };
  getuser();
  },[product.user_email]);



  const handleexchange = (e)=>{
      setisexchange(current => !current)
  }

  const handlerent = async(e) => {
    e.preventDefault()
    const owner_id=owner._id
    const sender_id=user._id 
    console.log("sender",owner_id)
    const objectid=product._id
    console.log("product",objectid)
    const proposed_price=product.price
    const renttype=product.prefer
    await axios.post('http://localhost:3000/api/Addition/rentrequest', 
        {sender_id, owner_id, objectid,proposed_price,renttype}
        ).then((response)=>{
            console.log(response)
            setisrent(true)
          }).catch((error)=>{
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
          <Title> <strong> Product Name: </strong> {product.title}</Title>
          <Desc> <strong> Description: </strong> {product.desc} </Desc>
          <Desc>
          {product.categories && product.categories.map((category, index) => (
          <span key={index}>
          {category}
          {index !== product.categories.length - 1 && ', '}
          </span>
          ))}
          </Desc>
          {product.price && <Price>{product.price}/=</Price>}

          {product.exchangetype && <Desc>
            {product.exchangetype}
          </Desc>}
          {product.prefer && <Desc>
            {product.prefer}
          </Desc>}
          <Title>Owner name: {owner.username}</Title>

          <FilterContainer> </FilterContainer> 

          <Button>
            <Link to= {`/messege?data=${product.user_email}`}>Message</Link>
          </Button>

          <FilterContainer>
            {/* <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="black" />
              <FilterColor color="darkblue" />
              <FilterColor color="gray" />
            </Filter> }
            { <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter> */}
          </FilterContainer> 



          {product.purpose==="Exchange"?<Button onClick={handleexchange}>Exchange</Button>:null}
          {product.purpose==="Rent"?<Button onClick={handlerent}>Rent</Button>:null}
          {product.purpose==="Sell"?

          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick} >ADD TO CART</Button>
            
          </AddContainer>:null}
        {isexchange&&<Exchangerequest Product={product} />}
        {isrent&&<label>rent request has been sent</label>}

        </InfoContainer>

      </Wrapper> 

      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;