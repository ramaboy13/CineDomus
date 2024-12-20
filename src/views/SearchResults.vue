<template>
  <div class="min-h-screen bg-navy-900 text-white">
    <!-- Search Results Header -->
    <div class="relative px-8 py-12">
      <div class="max-w-7xl mx-auto mt-16">
        <h1 class="text-2xl md:text-3xl font-bold mb-4">
          Search Results for "{{ $route.query.q }}"
        </h1>
        <p class="text-gray-400">Found {{ movies.length }} results</p>
      </div>
    </div>

    <!-- Results Grid Section -->
    <section class="px-8 pb-12">
      <div class="max-w-7xl mx-auto">
        <div
          v-if="movies.length > 0"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          <div
            v-for="movie in movies"
            :key="movie.id"
            class="group relative rounded-lg overflow-hidden cursor-pointer"
            @click="goToDetail(movie.id)"
          >
            <img
              :src="getImageUrl(movie.poster_path)"
              :alt="movie.title"
              class="w-full h-auto aspect-[2/3] object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div class="absolute bottom-0 p-4">
                <h3 class="font-bold text-white">{{ movie.title }}</h3>
                <div class="flex items-center space-x-2 text-sm mt-2">
                  <span>{{ movie.release_date?.split("-")[0] }}</span>
                  <span>•</span>
                  <span class="flex items-center">
                    <span class="text-yellow-400">★</span>
                    <span class="ml-1"
                      >{{ movie.vote_average?.toFixed(1) }}/10</span
                    >
                  </span>
                </div>
                <p class="text-sm text-gray-300 mt-2 line-clamp-2">
                  {{ movie.overview }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-16">
          <div class="text-gray-400 mb-4">
            <svg
              class="w-16 h-16 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h2 class="text-xl font-semibold mb-2">No Results Found</h2>
            <p>We couldn't find any movies matching "{{ $route.query.q }}"</p>
          </div>
          <button
            @click="$router.push('/')"
            class="px-6 py-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchData, getImageUrl } from "../api";

const movies = ref([]);
const route = useRoute();
const router = useRouter();

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

const goToDetail = (movieId) => {
  router.push(`/movie/${movieId}`);
};

// Watch for query changes to update results
watch(
  () => route.query.q,
  () => {
    fetchSearchResults();
  }
);

onMounted(() => {
  fetchSearchResults();
});
</script>

<style scoped>
.bg-navy-900 {
  background-color: #0f172a;
}
</style>
