
import styled from "styled-components";
import React from 'react'

const Container = styled.div`
    height: 25px;   
    margin-bottom: 10px;
`;

const Description = styled.div`
    font-size: 35px;
    padding-left: 50px;
`;

const Heading = () => {
  return (

    <Container>
            <Description>
                Browse Products
            </Description>
    </Container>
    
  )
}

export default Heading