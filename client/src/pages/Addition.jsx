import { useState } from "react"
import Addexchangeproduct from "../components/Addexchangeproduct";
import Addsell from "../components/Addsell";
import Addrent from "../components/Addrent";
import styled from "styled-components"
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";


const Selection = styled.select`
  width: 20%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 20px;
  background-color: white;

  &:focus {
    outline: none;
  }
`;


const Container = styled.div`
`;

const FormContainer = styled.div`
  min-height: 105vh;
  background-image: url(https://i.ibb.co/rFCz9rL/addition-page-background.png);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding:10px 0;
`;

const DropdownContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const Addition = () => {

    const [selected, setselected] = useState('')
    const [exchange, setexchange] = useState('')
    const [sell, setsell] = useState(true)
    const [rent, setrent] = useState('')


    const handleselect = (e) => {
        setselected(e.target.value)
        Check()
    }
    const Check = () => {
        if (selected === "Exchange") {
            setexchange(true)
            setrent(false)
            setsell(false)
        } else if (selected === 'Rent') {
            setrent(true)
            setexchange(false)
            setsell(false)
        } else if (selected === "Sell") {
            setsell(true)
            setrent(false)
            setexchange(false)
        }
    }
    return (
        <>
            <Container>
                <Announcement />
                <Navbar />

                <FormContainer>

                    <DropdownContainer>
                        <Selection value={selected} onChange={handleselect}>
                            <option value="Sell">Sell</option>
                            <option value="Rent">Rent</option>
                            <option value="Exchange">Exchange</option>      {/*value={exchange} onSelect={setexchange(true)}*/}
                            <option>others</option>
                        </Selection>
                    </DropdownContainer>
                    {exchange && <Addexchangeproduct />}
                    {sell && <Addsell />}
                    {rent && <Addrent />}
                </FormContainer>
            </Container>
            <Newsletter />
            <Footer />
        </>
    )
}
export default Addition