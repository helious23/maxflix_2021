import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.div`
  padding: 20px;
`;

const NextPage = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  all: unset;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: ${(props) => props.page};
  color: white;
  text-align: center;
  border-radius: 5px;
  font-size: 50px;
`;

const PrevPage = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  all: unset;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: ${(props) => props.page};
  color: white;
  text-align: center;
  border-radius: 5px;
  font-size: 50px;
`;

const HomePresenter = ({
  nowPlaying,
  upcoming,
  popular,
  loading,
  error,
  page,
  nextPage,
  previousPage,
  upcomingPage,
  upcomingPrev,
  upcomingNext,
  popularPage,
  popularPrev,
  popularNext,
}) => {
  return (
    <>
      <Helmet>
        <title>Movies | Maxflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          {nowPlaying && nowPlaying.length > 0 && (
            <Section title="Now Playing">
              <PrevPage
                page={page - 0.9}
                onClick={() => previousPage(page - 1)}
              >
                ⬅
              </PrevPage>
              {nowPlaying.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  title={movie.original_title}
                  imageUrl={movie.poster_path}
                  rating={movie.vote_average}
                  year={
                    movie.release_date && movie.release_date.substring(0, 4)
                  }
                  isMovie={true}
                />
              ))}
              <NextPage page={page} onClick={() => nextPage(page + 1)}>
                ➡
              </NextPage>
            </Section>
          )}
          {upcoming && upcoming.length > 0 && (
            <Section title="Upcoming">
              <PrevPage
                page={upcomingPage - 0.9}
                onClick={() => upcomingPrev(upcomingPage - 1)}
              >
                ⬅
              </PrevPage>
              {upcoming.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  title={movie.original_title}
                  imageUrl={movie.poster_path}
                  rating={movie.vote_average}
                  year={
                    movie.release_date && movie.release_date.substring(0, 4)
                  }
                  isMovie={true}
                />
              ))}
              <NextPage
                page={upcomingPage}
                onClick={() => upcomingNext(upcomingPage + 1)}
              >
                ➡
              </NextPage>
            </Section>
          )}
          {popular && popular.length > 0 && (
            <Section title="Popular Movies">
              <PrevPage
                page={popularPage - 0.9}
                onClick={() => popularPrev(popularPage - 1)}
              >
                ⬅
              </PrevPage>
              {popular.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  title={movie.original_title}
                  imageUrl={movie.poster_path}
                  rating={movie.vote_average}
                  year={
                    movie.release_date && movie.release_date.substring(0, 4)
                  }
                  isMovie={true}
                />
              ))}
              <NextPage
                page={popularPage}
                onClick={() => popularNext(popularPage + 1)}
              >
                ➡
              </NextPage>
            </Section>
          )}
          {error && <Message color="#e74c3c" text={error} />}
        </Container>
      )}
    </>
  );
};

HomePresenter.propTyles = {
  nowPlaying: PropTypes.array,
  upcoming: PropTypes.array,
  popular: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  page: PropTypes.number.isRequired,
  nextPage: PropTypes.func.isRequired,
  upcomingPrev: PropTypes.func.isRequired,
  upcomingNext: PropTypes.func.isRequired,
  popularPrev: PropTypes.func.isRequired,
  popularNext: PropTypes.func.isRequired,
  upcomingPage: PropTypes.number.isRequired,
  popularPage: PropTypes.number.isRequired,
};

export default HomePresenter;
