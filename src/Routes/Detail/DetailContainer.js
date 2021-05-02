/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import DetailPresenter from "./DetailPresenter";

export default class extends React.Component {
  state = {
    result: null,
    error: null,
    loading: true,
  };
  render() {
    const { result, loading, error } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
