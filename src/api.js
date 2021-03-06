import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "83e4562556a8e370915aa2a360e7d4db",
    language: "en-US",
  },
});

export const moviesApi = {
  nowPlaying: (page) =>
    api.get("movie/now_playing", {
      params: {
        page,
      },
    }),
  upcoming: (page) =>
    api.get("movie/upcoming", {
      params: {
        page,
      },
    }),
  popular: (page) =>
    api.get("movie/popular", {
      params: {
        page,
      },
    }),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("search/movie", {
      params: {
        query: term,
      },
    }),
};

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  showDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("search/tv", {
      params: {
        query: term,
      },
    }),
};

export const collectionApi = {
  getDetail: (id) => api.get(`collection/${id}`),
};
