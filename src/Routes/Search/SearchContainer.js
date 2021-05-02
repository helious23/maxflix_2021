/* eslint-disable import/no-anonymous-default-export */
import { moviesApi } from "api";
import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
  state = {
    movieResults: null,
    tvResult: null,
    searchTerm: "",
    loading: false,
    error: null,
  };

  async componentDidMount() {
    try {
      this.setState({});
    } catch {
      this.setState({
        error: "Can't search",
      });
    } finally {
      this.setState({
        loading: true,
      });
    }
  }
  render() {
    const { movieResults, tvResult, searchTerm, loading, error } = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResult={tvResult}
        searchTerm={searchTerm}
        loading={loading}
        error={error}
      />
    );
  }
}
