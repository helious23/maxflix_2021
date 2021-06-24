import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Message from "Components/Message";

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
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  height: 100%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const ItemContainer = styled.div`
  margin: 20px 0px;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
  display: ${(props) => props.dividerDisplay};
`;

const Overview = styled.p`
  font-size: 1rem;
  opacity: 0.7;
  line-height: 1.5;
  width: 80%;
`;

const IMDB = styled.a`
  background-color: #f4c518;
  color: black;
  border-radius: 2px;
  padding: 2px;
  font-weight: bold;
  display: ${(props) => props.display};
`;
const VideosContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Videos = styled.a`
  line-height: 1.5;
  font-size: 1rem;
  opacity: 0.7;
`;

const ProductionContainer = styled.div`
  margin-top: 10px;
  display: grid;
  height: 50px;
  width: 80%;
  grid-template-columns: repeat(auto-fill, 50px);
`;

const Company = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: 80%;
  background-repeat: no-repeat;
  border-radius: 5px;
`;

const Collection = styled(Link)`
  font-size: 1rem;
  opacity: 0.7;
  line-height: 1.5;
`;

const SeriesContainer = styled.div`
  margin-top: 10px;
  width: 80%;
  height: 40%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 80px);
`;

const Series = styled.div`
  background-image: url(${(props) => props.bgimage});
  background-position: center center;
  background-size: 80%;
  background-repeat: no-repeat;
  border-radius: 5px;
`;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Maxflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message error={error} color="#e74c3c" />
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Maxflix
        </title>
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
        <Cover
          key={result.poster_path}
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png").default
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date && result.release_date !== null
                ? result.release_date.substring(0, 4)
                : result.first_air_date !== null &&
                  result.first_air_date.substring(0, 4)}
            </Item>
            <Divider
              key={result.runtime || result.episode_run_time}
              dividerDisplay={
                result.runtime || result.episode_run_time ? "inline" : "none"
              }
            >
              ·
            </Divider>
            <Item>
              {result.runtime && result.runtime !== ""
                ? result.runtime
                : result.episode_run_time[0]}{" "}
              min
            </Item>
            <Divider
              key={result.genres}
              dividerDisplay={result.genres ? "inline" : "none"}
            >
              ·
            </Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <Divider
              key={result.production_countries}
              dividerDisplay={result.production_countries ? "inline" : "none"}
            >
              ·
            </Divider>
            <Item>
              {result.production_countries &&
                result.production_countries.map((country, index) =>
                  index === result.production_countries.length - 1
                    ? country.iso_3166_1
                    : `${country.iso_3166_1} / `
                )}
            </Item>
            <Divider
              key={result.imdb_id}
              dividerDisplay={result.imdb_id ? "inline" : "none"}
            >
              ·
            </Divider>
            <Item>
              <IMDB
                key={`key_${result.imdb_id}`}
                href={`https://www.imdb.com/title/${result.imdb_id}`}
                target="_blank"
                display={result.imdb_id ? "inline" : "none"}
              >
                IMDb
              </IMDB>
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <VideosContainer>
            {result.videos.results &&
              result.videos.results.map((title, index) => (
                <Videos
                  key={index}
                  target="_blank"
                  href={`https://www.youtube.com/watch?v=${result.videos.results[index].key}`}
                >
                  🎬 {title.name}
                </Videos>
              ))}
          </VideosContainer>
          {result.belongs_to_collection && (
            <Collection to={`/collection/${result.belongs_to_collection.id}`}>
              🎞 {result.belongs_to_collection.name}
            </Collection>
          )}
          <ProductionContainer>
            {result.production_companies &&
              result.production_companies.map((item) => (
                <Company
                  key={item.logo_path}
                  bgImage={
                    item.logo_path
                      ? `https://image.tmdb.org/t/p/w200${item.logo_path}`
                      : require("../../assets/noPosterSmall.png").default
                  }
                ></Company>
              ))}
          </ProductionContainer>
          <SeriesContainer>
            {result.seasons &&
              result.seasons.map((season) => (
                <Series
                  key={season.id}
                  bgimage={
                    season.poster_path
                      ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                      : require("../../assets/noPosterSmall.png").default
                  }
                ></Series>
              ))}
          </SeriesContainer>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
