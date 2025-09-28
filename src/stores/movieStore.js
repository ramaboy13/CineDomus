import { defineStore } from "pinia";
import { apiHelpers, movieAPI } from "../api/api";

export const useMovieStore = defineStore("movie", {
  state: () => ({
    movies: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
  }),

  actions: {
    async fetchMovies(category = "popular", page = 1) {
      this.loading = true;
      try {
        let data;
        switch (category) {
          case "popular":
            data = await movieAPI.getPopular(page);
            break;
          case "top_rated":
            data = await movieAPI.getTopRated(page);
            break;
          case "now_playing":
            data = await movieAPI.getNowPlaying(page);
            break;
          case "upcoming":
            data = await movieAPI.getUpcoming(page);
            break;
        }

        this.movies = data.results;
        this.currentPage = data.page;
        this.totalPages = data.total_pages;
        this.error = null;
      } catch (error) {
        this.error = apiHelpers.formatError(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
