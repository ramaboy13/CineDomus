<template>
  <div class="px-8 py-16 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold text-center mb-8">Search Results</h1>
    <div
      v-if="movies.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
    >
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <img
          :src="getImageUrl(movie.poster_path)"
          alt="Movie Poster"
          class="w-full h-64 object-cover"
        />
        <div class="p-4">
          <h2 class="text-lg font-semibold truncate">{{ movie.title }}</h2>
          <p class="text-sm text-gray-600 mt-2">{{ movie.release_date }}</p>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-gray-600">
      <p>No movies found for "{{ $route.query.q }}"</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchData, getImageUrl } from "../api";
import { useRoute } from "vue-router";

const movies = ref([]);
const route = useRoute();

const fetchSearchResults = async () => {
  const query = route.query.q;
  if (!query) return;

  try {
    const response = await fetchData("/search/movie", { query });
    movies.value = response.results || [];
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};

onMounted(() => {
  fetchSearchResults();
});
</script>
