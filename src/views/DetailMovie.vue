<template>
  <div class="detail-film">
    <div v-if="movie">
      <h1>{{ movie.title }}</h1>
      <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" />
      <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
      <p><strong>Overview:</strong> {{ movie.overview }}</p>
      <p><strong>Rating:</strong> {{ movie.vote_average }}/10</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import { getMovieDetails, getImageUrl } from "../api";

export default {
  name: "DetailMovie",
  data() {
    return {
      movie: null,
    };
  },
  methods: {
    async fetchMovieDetails() {
      try {
        const movieId = this.$route.params.id;
        const data = await getMovieDetails(movieId);
        this.movie = data;
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    },
    getImageUrl(path) {
      return getImageUrl(path);
    },
  },
  async created() {
    await this.fetchMovieDetails();
  },
};
</script>

<style scoped>
.detail-film {
  padding: 20px;
}

.detail-film img {
  max-width: 300px;
  border-radius: 8px;
}
</style>
