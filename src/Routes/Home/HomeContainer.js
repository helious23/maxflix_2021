import React from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "api";

export default class extends React.Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true,
    page: 1,
  };

  nextPage = async (next) => {
    this.setState({
      page: next,
    });
    const {
      data: { results: nowPlaying },
    } = await moviesApi.nowPlaying(next);
    this.setState({
      nowPlaying,
    });
  };

  previousPage = async (prev) => {
    if (prev >= 1) {
      this.setState({
        page: prev,
      });
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying(prev);
      this.setState({
        nowPlaying,
      });
    }
  };

  async componentDidMount() {
    const { page } = this.state;
    try {
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying(page);
      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      this.setState({
        nowPlaying,
        upcoming,
        popular,
      });
    } catch {
      this.setState({
        error: "Can't find movie information.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { nowPlaying, upcoming, popular, error, loading, page } = this.state;

    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
        page={page}
        nextPage={this.nextPage}
        previousPage={this.previousPage}
      />
    );
  }
}
