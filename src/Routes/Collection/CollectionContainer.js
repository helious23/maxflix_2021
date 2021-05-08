import { collectionApi } from "api";
import React from "react";
import CollectionPresenter from "./CollectionPresenter";

export default class extends React.Component {
  state = {
    result: null,
    error: null,
    loading: true,
  };
  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    try {
      ({ data: result } = await collectionApi.getDetail(parsedId));
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result });
    }
  }
  render() {
    const { result, loading, error } = this.state;
    return (
      <CollectionPresenter result={result} error={error} loading={loading} />
    );
  }
}
