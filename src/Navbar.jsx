import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Nav = styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #add8e6;
  color: #fff;
  text-align: center; 
  
  @media (min-width: 768px) {
    flex-direction: row; 
  }
`;

const Title = styled.div`
display: flex;
align-items: center;
`;

const TitleName = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
  font-weight: bold;
  color: #071317;
  display: block;

  @media (max-width: 768px) {
    display:none;
  }
`;

const Icon = styled.img`
  width: 32%;
  height: 32%;
`;

const Logo = styled.img`
  width: 3rem;
  height: 3rem;
`;

function Navbar() {
  return (
    <>
      <Nav>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Title>
            <Logo src="/market-research.png" alt="Market Research" />
            <TitleName>
              StockHarbor
            </TitleName>
          </Title>
        </Link>
        <div>
          <Link to="watch-list">
            <Icon src="https://cdn-icons-png.flaticon.com/128/44/44499.png" alt="watch-list-icon" />
          </Link>
        </div>
      </Nav >
    </>
  );
}

export default Navbar;
