<template>
  <div class="min-h-screen bg-navy-900 text-white px-8 py-12">
    <h1 class="text-2xl font-bold mb-8 mt-10">All Movies</h1>
    <div class="grid grid-cols-5 gap-6">
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="group relative rounded-lg overflow-hidden"
        @click="goToDetail(movie.id)"
      >
        <img :src="getImageUrl(movie.poster_path)" class="w-full h-auto" />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div class="absolute bottom-0 p-4">
            <h3 class="font-bold">{{ movie.title }}</h3>
            <div class="flex items-center space-x-2 text-sm">
              <span>{{ movie.release_date?.split("-")[0] }}</span>
              <span>•</span>
              <span>{{ movie.vote_average }}/10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getAllMoviesFromEndpoints, getImageUrl } from "../api";

export default {
  name: "AllMovies",
  setup() {
    const movies = ref([]);

    const fetchMovies = async () => {
      try {
        // Ambil semua data film dari berbagai endpoint
        movies.value = await getAllMoviesFromEndpoints(70); // 5 adalah jumlah halaman maksimum
      } catch (error) {
        console.error("Error fetching all movies:", error);
      }
    };

    const goToDetail = (movieId) => {
      window.location.href = `/movie/${movieId}`;
    };

    onMounted(() => {
      fetchMovies();
    });

    return {
      movies,
      getImageUrl,
      goToDetail,
    };
  },
};
</script>

<style scoped>
.movie-card {
  margin: 10px;
  display: inline-block;
  width: 200px;
  text-align: center;
}
</style>
