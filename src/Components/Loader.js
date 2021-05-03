/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin-top: 1.2rem;
`;

export default () => (
  <Container>
    <span role="img" aria-label="Loading">
      ⏳
    </span>
  </Container>
);
