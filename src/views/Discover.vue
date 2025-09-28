<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
    <!-- Hero Section with Search -->
    <div class="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="absolute inset-0 bg-gradient-to-r from-red-500/10 via-purple-500/5 to-blue-500/10"></div>
      <div class="relative max-w-7xl mx-auto text-center" data-aos="fade-up">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
          Discover Your Next
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">
            Favorite Movie
          </span>
        </h1>
        <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Explore thousands of movies across all genres. From blockbusters to hidden gems, find your perfect watch.
        </p>
        
        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto mb-8" data-aos="fade-up" data-aos-delay="200">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search for movies..."
              class="w-full px-6 py-4 pl-12 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              @input="handleSearch"
            />
            <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        <!-- Category Filter -->
        <div class="flex flex-wrap justify-center gap-3" data-aos="fade-up" data-aos-delay="300">
          <button
            v-for="category in categories"
            :key="category"
            @click="activeCategory = category"
            class="px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
            :class="[
              activeCategory === category
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25'
                : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20 hover:text-white border border-white/10',
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </div>

    <!-- Movies Grid Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <!-- Section Header -->
      <div class="flex items-center justify-between mb-8" data-aos="fade-right">
        <div>
          <h2 class="text-3xl font-bold text-white mb-2">{{ activeCategory }} Movies</h2>
          <p class="text-gray-400">{{ movies.length }} movies found</p>
        </div>
        
        <!-- View Toggle -->
        <div class="flex bg-black/30 backdrop-blur-sm rounded-lg p-1 border border-white/10">
          <button
            @click="viewMode = 'grid'"
            :class="[
              'px-4 py-2 rounded-md transition-all duration-200',
              viewMode === 'grid' ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-white'
            ]"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/>
            </svg>
          </button>
          <button
            @click="viewMode = 'list'"
            :class="[
              'px-4 py-2 rounded-md transition-all duration-200',
              viewMode === 'list' ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-white'
            ]"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <div
          v-for="n in 10"
          :key="n"
          class="animate-pulse"
        >
          <div class="bg-gray-800 aspect-[2/3] rounded-xl"></div>
          <div class="mt-3 space-y-2">
            <div class="bg-gray-800 h-4 rounded w-3/4"></div>
            <div class="bg-gray-800 h-3 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <!-- Grid View -->
      <div
        v-else-if="viewMode === 'grid'"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
      >
        <div
          v-for="(movie, index) in movies"
          :key="movie.id"
          class="group relative rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10"
          @click="goToDetail(movie.id)"
          data-aos="fade-up"
          :data-aos-delay="index * 50"
        >
          <!-- Movie Poster -->
          <div class="relative aspect-[2/3] overflow-hidden bg-gray-800">
            <img
              :src="getImageUrl(movie.poster_path)"
              :alt="movie.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              @error="handleImageError"
            />
            
            <!-- Rating Badge -->
            <div class="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
              <div class="flex items-center space-x-1">
                <svg class="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span class="text-white text-xs font-medium">{{ movie.vote_average.toFixed(1) }}</span>
              </div>
            </div>

            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <!-- Play Button -->
                <div class="flex justify-center mb-3">
                  <button class="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
                
                <!-- Movie Info -->
                <h3 class="font-bold text-white text-sm mb-1 line-clamp-2">{{ movie.title }}</h3>
                <div class="flex items-center justify-between text-xs text-gray-300">
                  <span>{{ new Date(movie.release_date).getFullYear() }}</span>
                  <span class="px-2 py-1 bg-white/10 rounded">{{ getGenre(movie.genre_ids?.[0]) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- List View -->
      <div v-else class="space-y-4">
        <div
          v-for="(movie, index) in movies"
          :key="movie.id"
          class="group bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 cursor-pointer hover:bg-black/50 transition-all duration-300"
          @click="goToDetail(movie.id)"
          data-aos="fade-right"
          :data-aos-delay="index * 100"
        >
          <div class="flex items-center space-x-6">
            <!-- Movie Poster -->
            <div class="flex-shrink-0 w-24 h-36 rounded-lg overflow-hidden">
              <img
                :src="getImageUrl(movie.poster_path)"
                :alt="movie.title"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
            </div>

            <!-- Movie Info -->
            <div class="flex-1 min-w-0">
              <h3 class="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                {{ movie.title }}
              </h3>
              <p class="text-gray-300 text-sm mb-3 line-clamp-2">{{ movie.overview }}</p>
              
              <div class="flex items-center space-x-4 text-sm text-gray-400">
                <span>{{ new Date(movie.release_date).getFullYear() }}</span>
                <span>•</span>
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>{{ movie.vote_average.toFixed(1) }}/10</span>
                </div>
                <span>•</span>
                <span>{{ movie.popularity.toLocaleString() }} views</span>
              </div>
            </div>

            <!-- Action Button -->
            <div class="flex-shrink-0">
              <button class="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
                Watch Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && movies.length === 0" class="text-center py-20" data-aos="fade-up">
        <div class="max-w-md mx-auto">
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <svg class="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7a1 1 0 01-1-1V5a1 1 0 011-1h4z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">No movies found</h3>
          <p class="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
          <button
            @click="clearSearch"
            class="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Clear Search
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { fetchData, getImageUrl } from "@/api/api";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import AOS from 'aos'
import 'aos/dist/aos.css'

const categories = ["Popular", "Top Rated", "Now Playing", "Upcoming"];
const activeCategory = ref("Popular");
const movies = ref([]);
const loading = ref(false);
const searchQuery = ref("");
const viewMode = ref("grid");
const router = useRouter();

// Genre mapping
const genreMap = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
  99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
  27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi",
  10770: "TV", 53: "Thriller", 10752: "War", 37: "Western"
};

const fetchMovies = async () => {
  loading.value = true;
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
    movies.value = [];
  } finally {
    loading.value = false;
  }
};

const handleSearch = async () => {
  if (searchQuery.value.trim() === "") {
    fetchMovies();
    return;
  }

  loading.value = true;
  try {
    const data = await fetchData(`/search/movie?query=${encodeURIComponent(searchQuery.value)}`);
    movies.value = data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    movies.value = [];
  } finally {
    loading.value = false;
  }
};

const goToDetail = (movieId) => {
  router.push({ name: "DetailMovie", params: { id: movieId } });
};

const getGenre = (genreId) => {
  return genreMap[genreId] || "Unknown";
};

const handleImageError = (event) => {
  event.target.src = "https://via.placeholder.com/300x450/1f2937/9ca3af?text=No+Image";
};

const clearSearch = () => {
  searchQuery.value = "";
  fetchMovies();
};

watch(activeCategory, () => {
  searchQuery.value = "";
  fetchMovies();
});

onMounted(() => {
  AOS.init({
    duration: 600,
    offset: 50,
    easing: 'ease-out-cubic',
    once: true
  });
  fetchMovies();
});
</script>

<style scoped>
/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2; 
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.5);
}

::-webkit-scrollbar-thumb {
  background: #ef4444;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #dc2626;
}

/* Smooth animations */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Enhanced hover effects */
.group:hover .transform {
  transform: scale(1.05) translateZ(0);
}

/* Backdrop blur support */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Responsive grid improvements */
@media (max-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
}

@media (min-width: 1280px) {
  .xl\:grid-cols-6 {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}
</style>