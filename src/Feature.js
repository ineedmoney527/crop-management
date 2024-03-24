// src/components/Features.js
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const FeaturesContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fbe7;
  padding: 100px 0;
  min-height: 100vh;
`;

const Feature = styled.div`
  background-color: #c8e6c9;
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Features = () => {
  return (
    <FeaturesContainer
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Feature>Feature 1</Feature>
      <Feature>Feature 2</Feature>
      <Feature>Feature 3</Feature>
    </FeaturesContainer>
  );
};

export default Features;
