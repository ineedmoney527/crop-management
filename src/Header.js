// src/components/Header.js
import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  background-color: #2e7d32;
  color: white;
  padding: 20px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Agriculture Crop Management</h1>
      <p>Welcome to our application!</p>
    </HeaderContainer>
  );
};

export default Header;
