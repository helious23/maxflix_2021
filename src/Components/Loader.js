import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 5rem;
  margin-top: 1.2rem;
  text-transform: uppercase;
  font-weight: bold;
  color: #e50914;
  letter-spacing: -5px;
`;

export default () => (
  <Container>
    <span>maxflex</span>
  </Container>
);
