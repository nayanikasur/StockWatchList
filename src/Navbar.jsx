import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Logo = styled.img`
  width: 3rem;
  height: 3rem;
`;

const Title = styled.div`
display: flex;
align-items: center;
`;

const TitleText = styled.span`
font-family: 'Roboto', sans-serif;
font-size: 2rem;
font-weight: bold;
color: #071317;

@media (max-width: 768px) {
    display:none;
}
`;

const Nav = styled.div`
background-color: #add8e6;
overflow: hidden;
padding: 1rem;
`;

const RightButton = styled.div`
float: right;
`;

const LeftButton = styled(Link)`
float: left;
text-decoration: none;
`;

function Navbar() {
  return (
    <>
      <Nav>
        <LeftButton to="/" >
          <Title>
            <Logo src="/market-research.png" alt="Market Research" />
            <TitleText>StockHarbor</TitleText>
          </Title>
        </LeftButton>
        <RightButton>
          <Link to="watch-list">
            <Logo src="https://cdn-icons-png.flaticon.com/128/44/44499.png" alt="watch-list-icon" />
          </Link>
        </RightButton>
      </Nav >
    </>
  );
}

export default Navbar;
