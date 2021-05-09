import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Message from "Components/Message";
import Loader from "Components/Loader";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: -1;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Title = styled.h3`
  font-size: 2rem;
  margin: 10px 0;
`;

const Overview = styled.p`
  font-size: 1rem;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;
const Data = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const CollectionData = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  margin-top: 10px;
`;

const CollectionTitle = styled.div`
  font-size: 0.8rem;
  text-align: center;
  line-height: 2;
  margin-bottom: 10px;
`;

const CollectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CollectionPoster = styled(Link)`
  margin-bottom: 10px;
  height: 350px;
  width: 250px;
  background-image: url(${(props) => props.bgimage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const CollectionPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Maxflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message />
  ) : (
    <Container>
      {console.log({ result })}
      <Helmet>
        <title>{result.name} | Maxflix</title>
      </Helmet>
      <Backdrop
        key={result.id}
        bgImage={
          result.backdrop_path !== null
            ? `https://image.tmdb.org/t/p/original${result.backdrop_path}`
            : result.poster_path
            ? `https://image.tmdb.org/t/p/original${result.poster_path}`
            : require("../../assets/noPosterSmall.png").default
        }
      />
      <Content>
        <Title>{result.name}</Title>
        <Overview>{result.overview}</Overview>
        <Data>
          <CollectionData>
            {result.parts.map((item) => (
              <CollectionContainer>
                <CollectionTitle>
                  {item.original_title.length > 30
                    ? `${item.original_title.substring(0, 30)}...`
                    : item.original_title}
                </CollectionTitle>
                <CollectionPoster
                  key={item.id}
                  bgimage={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                      : require("../../assets/noPosterSmall.png").default
                  }
                  to={`/movie/${item.id}`}
                ></CollectionPoster>
              </CollectionContainer>
            ))}
          </CollectionData>
        </Data>
      </Content>
    </Container>
  );

CollectionPresenter.propTyles = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default CollectionPresenter;
