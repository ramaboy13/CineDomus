<template>
  <div class="relative min-h-screen bg-gray-900 text-white overflow-hidden">
    <!-- Background Image Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-transparent z-10"
    />

    <!-- Main Content -->
    <div
      class="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-10"
    >
      <div
        v-if="movie"
        class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      >
        <!-- Left Column - Text Content -->
        <div class="space-y-6">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {{ movie.title }}
          </h1>

          <div
            class="flex items-center flex-wrap space-x-2 text-sm text-gray-400"
          >
            <span>{{ movie.release_date }}</span>
            <span>•</span>
            <span>{{
              movie.genres?.map((genre) => genre.name).join(", ")
            }}</span>
          </div>

          <div class="space-y-4">
            <h2 class="text-lg md:text-xl font-semibold">The Story</h2>
            <p class="text-gray-300 leading-relaxed">
              {{ movie.overview }}
            </p>
            <button
              v-if="movie.trailers?.length"
              @click="showTrailer = true"
              class="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Watch Trailer
            </button>
          </div>

          <!-- Trailers Section -->
          <div v-if="movie.trailers?.length" class="space-y-4">
            <h2 class="text-lg md:text-xl font-semibold">Trailers</h2>
            <div class="flex space-x-4 overflow-x-auto pb-4">
              <button
                v-for="(trailer, index) in movie.trailers"
                :key="trailer.id"
                @click="
                  selectedTrailer = index;
                  showTrailer = true;
                "
                class="relative rounded-lg overflow-hidden flex-shrink-0 group w-32 h-20 sm:w-40 sm:h-24"
              >
                <img
                  :src="trailer.thumbnail"
                  :alt="trailer.name"
                  class="w-full h-full object-cover"
                />
                <div
                  class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 sm:w-8 sm:h-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span
                  class="absolute bottom-1 right-1 bg-black/60 px-1 sm:px-2 rounded text-xs"
                >
                  {{ trailer.type }}
                </span>
              </button>
            </div>
          </div>

          <!-- Footer Links -->
          <div
            class="flex items-center flex-wrap space-x-4 text-sm text-gray-400 pt-8"
          >
            <a href="#" class="hover:text-white">Privacy Policy</a>
            <span>•</span>
            <a href="#" class="hover:text-white">Terms of Use</a>
            <span>•</span>
            <a href="#" class="hover:text-white">Settings</a>
            <span>•</span>
            <a href="#" class="hover:text-white">Credits</a>
          </div>
        </div>

        <!-- Right Column - Movie Poster -->
        <div class="lg:flex justify-center">
          <img
            :src="getImageUrl(movie.poster_path)"
            :alt="movie.title"
            class="rounded-lg shadow-2xl max-w-xs md:max-w-sm lg:max-w-md w-full"
          />
        </div>
      </div>

      <div v-else class="text-white text-center py-20">
        <div
          class="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"
        ></div>
        Loading...
      </div>
    </div>

    <!-- Trailer Modal -->
    <div
      v-if="showTrailer && movie?.trailers?.length"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
    >
      <div
        class="relative w-full max-w-2xl sm:max-w-4xl bg-black rounded-lg overflow-hidden"
      >
        <button
          @click="showTrailer = false"
          class="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 sm:w-6 sm:h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="relative pt-[56.25%]">
          <iframe
            :src="movie.trailers[selectedTrailer].url"
            class="absolute inset-0 w-full h-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getImageUrl, getMovieDetails } from "../api";

export default {
  name: "DetailMovie",
  data() {
    return {
      movie: null,
      selectedTrailer: 0,
      showTrailer: false,
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
