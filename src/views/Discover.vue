<template>
  <div class="min-h-screen bg-navy-900 pt-20 px-8">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-bold text-white">Discover Movies</h1>
        <div class="flex space-x-4">
          <button
            v-for="category in categories"
            :key="category"
            @click="activeCategory = category"
            class="px-4 py-2 rounded-full transition-colors"
            :class="[
              activeCategory === category
                ? 'bg-red-500 text-white'
                : 'text-gray-400 hover:text-white',
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <div
          v-for="movie in movies"
          :key="movie.id"
          class="group relative rounded-lg overflow-hidden"
        >
          <img
            :src="getImageUrl(movie.poster_path)"
            :alt="movie.title"
            class="w-full h-auto"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div class="absolute bottom-0 p-4">
              <h3 class="font-bold text-white">{{ movie.title }}</h3>
              <div class="flex items-center space-x-2 text-sm text-gray-300">
                <span>{{ new Date(movie.release_date).getFullYear() }}</span>
                <span>•</span>
                <span>{{ movie.vote_average.toFixed(1) }}/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { fetchData, getImageUrl } from "@/api";

const categories = ["Popular", "Top Rated", "Now Playing", "Upcoming"];
const activeCategory = ref("Popular");
const movies = ref([]);

const fetchMovies = async () => {
  try {
    let endpoint = "";
    switch (activeCategory.value.toLowerCase()) {
      case "popular":
        endpoint = "/movie/popular";
        break;
      case "top rated":
        endpoint = "/movie/top_rated";
        break;
      case "now playing":
        endpoint = "/movie/now_playing";
        break;
      case "upcoming":
        endpoint = "/movie/upcoming";
        break;
    }
    const data = await fetchData(endpoint);
    movies.value = data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

watch(activeCategory, fetchMovies);

onMounted(fetchMovies);
</script>
