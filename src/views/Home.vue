<!-- Home.vue -->
<template>
  <div class="min-h-screen bg-black text-white overflow-x-hidden">
    
    <!-- Hero Section with Featured Movie -->
    <section class="relative h-screen flex items-center justify-start">
      <!-- Background Image -->
      <div 
        v-if="featuredMovies.length > 0"
        class="absolute inset-0 w-full h-full"
      >
        <img
          :src="getBackdropUrl(featuredMovies[currentSlide]?.backdrop_path)"
          class="w-full h-full object-cover"
          alt="Featured movie backdrop"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div class="max-w-2xl" data-aos="fade-right">
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
            {{ featuredMovies[currentSlide]?.title }}
          </h1>
          
          <div class="flex items-center space-x-6 mb-6">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span class="text-yellow-400 font-semibold">{{ featuredMovies[currentSlide]?.vote_average?.toFixed(1) }}</span>
            </div>
            <span class="text-gray-300">{{ featuredMovies[currentSlide]?.release_date?.split('-')[0] }}</span>
            <span class="px-3 py-1 bg-red-600 text-xs font-semibold rounded-full">HD</span>
          </div>

          <p class="text-lg md:text-xl text-gray-300 mb-8 line-clamp-3 leading-relaxed">
            {{ featuredMovies[currentSlide]?.overview }}
          </p>

          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              @click="playTrailer(featuredMovies[currentSlide]?.id)"
              class="flex items-center justify-center space-x-3 px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span>Play Trailer</span>
            </button>
            
            <button
              @click="goToDetail(featuredMovies[currentSlide]?.id)"
              class="flex items-center justify-center space-x-3 px-8 py-4 bg-gray-600/50 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-gray-600/70 transition-all duration-300"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Hero Navigation Dots -->
      <div class="absolute bottom-8 right-8 flex space-x-2">
        <button
          v-for="(movie, index) in featuredMovies.slice(0, 5)"
          :key="movie.id"
          @click="currentSlide = index"
          :class="[
            'w-3 h-3 rounded-full transition-all duration-300',
            currentSlide === index ? 'bg-red-600 w-8' : 'bg-white/50 hover:bg-white/80'
          ]"
        ></button>
      </div>
    </section>

    <!-- Continue Watching Section -->
    <section class="py-12 px-4 sm:px-6 lg:px-8" data-aos="fade-up">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl md:text-3xl font-bold">Continue Watching</h2>
         <router-link 
  to="/all-movies" 
  class="text-red-500 hover:text-red-400 font-semibold"
>
  View All
</router-link>

        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(movie, index) in continueWatching"
            :key="movie.id"
            class="group relative bg-gray-900 rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300"
            @click="goToDetail(movie.id)"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="flex">
              <img 
                :src="getImageUrl(movie.poster_path)"
                class="w-24 h-36 object-cover"
                alt="Movie poster"
              />
              <div class="flex-1 p-4">
                <h3 class="font-bold text-lg mb-2 line-clamp-1">{{ movie.title }}</h3>
                <p class="text-gray-400 text-sm mb-3 line-clamp-2">{{ movie.overview }}</p>
                
                <!-- Progress Bar -->
                <div class="w-full bg-gray-700 rounded-full h-1 mb-2">
                  <div class="bg-red-600 h-1 rounded-full" :style="`width: ${Math.random() * 80 + 10}%`"></div>
                </div>
                <span class="text-xs text-gray-400">{{ Math.floor(Math.random() * 120 + 10) }} min left</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trending Now Section -->
    <section class="py-12 px-4 sm:px-6 lg:px-8" data-aos="fade-up">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl md:text-3xl font-bold">Trending Now</h2>
          <div class="flex space-x-4">
            <button
              v-for="tab in ['Movies', 'TV Shows', 'Popular']"
              :key="tab"
              :class="[
                'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300',
                activeTab === tab ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              ]"
              @click="changeTab(tab)"
            >
              {{ tab }}
            </button>
          </div>
        </div>

        <div class="relative">
          <!-- Movie Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            <div
              v-for="(movie, index) in trendingMovies"
              :key="movie.id"
              class="group relative rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300"
              @click="goToDetail(movie.id)"
              data-aos="zoom-in"
              :data-aos-delay="index * 50"
            >
              <img 
                :src="getImageUrl(movie.poster_path)"
                class="w-full h-auto aspect-[2/3] object-cover"
                alt="Movie poster"
              />
              
              <!-- Hover Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="absolute bottom-0 p-4 w-full">
                  <h3 class="font-bold text-sm mb-1 line-clamp-2">{{ movie.title }}</h3>
                  <div class="flex items-center justify-between text-xs text-gray-300">
                    <span>{{ movie.release_date?.split('-')[0] }}</span>
                    <div class="flex items-center space-x-1">
                      <svg class="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span>{{ movie.vote_average?.toFixed(1) }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Trending Badge -->
              <div class="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                #{{ index + 1 }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-12 px-4 sm:px-6 lg:px-8" data-aos="fade-up">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold mb-8">Browse by Categories</h2>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div
            v-for="(category, index) in categories"
            :key="category.id"
            class="group relative h-32 rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div :class="[
              'absolute inset-0 bg-gradient-to-br opacity-80',
              category.gradient
            ]"></div>
            <div class="relative z-10 h-full flex items-center justify-center">
              <span class="text-white font-bold text-lg text-center px-4">{{ category.name }}</span>
            </div>
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Top Movies This Week -->
    <section class="py-12 px-4 sm:px-6 lg:px-8" data-aos="fade-up">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold mb-8">Top 10 Movies This Week</h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div
            v-for="(movie, index) in topMovies.slice(0, 10)"
            :key="movie.id"
            class="group relative cursor-pointer"
            @click="goToDetail(movie.id)"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="relative">
              <!-- Large Number -->
              <div class="absolute -left-4 -top-4 z-10">
                <span class="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-lg">
                  {{ index + 1 }}
                </span>
              </div>
              
              <img 
                :src="getImageUrl(movie.poster_path)"
                class="w-full h-auto rounded-lg shadow-2xl transform group-hover:scale-105 transition-all duration-300"
                alt="Movie poster"
              />
              
              <!-- Hover Info -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <div class="absolute bottom-4 left-4 right-4">
                  <h3 class="font-bold text-sm mb-1 line-clamp-2">{{ movie.title }}</h3>
                  <div class="flex items-center space-x-2 text-xs text-gray-300">
                    <span>{{ movie.release_date?.split('-')[0] }}</span>
                    <span>•</span>
                    <div class="flex items-center space-x-1">
                      <svg class="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span>{{ movie.vote_average?.toFixed(1) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- New Releases -->
    <section class="py-12 px-4 sm:px-6 lg:px-8" data-aos="fade-up">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl md:text-3xl font-bold">New Releases</h2>
          <button class="text-red-500 hover:text-red-400 font-semibold">View All</button>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          <div
            v-for="(movie, index) in newReleases"
            :key="movie.id"
            class="group relative rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300"
            @click="goToDetail(movie.id)"
            data-aos="fade-up"
            :data-aos-delay="index * 50"
          >
            <img 
              :src="getImageUrl(movie.poster_path)"
              class="w-full h-auto aspect-[2/3] object-cover"
              alt="Movie poster"
            />
            
            <!-- New Badge -->
            <div class="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              NEW
            </div>

            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-0 p-4 w-full">
                <h3 class="font-bold text-sm mb-1 line-clamp-2">{{ movie.title }}</h3>
                <div class="flex items-center justify-between text-xs text-gray-300">
                  <span>{{ movie.release_date?.split('-')[0] }}</span>
                  <div class="flex items-center space-x-1">
                    <svg class="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span>{{ movie.vote_average?.toFixed(1) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trailer Modal -->
    <div v-if="isTrailerModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <!-- Overlay -->
        <div
          class="fixed inset-0 transition-opacity bg-black/80 backdrop-blur-sm"
          @click="closeTrailerModal"
        ></div>

        <!-- Modal Content -->
        <div class="relative inline-block w-full max-w-6xl p-6 overflow-hidden text-left align-middle transition-all transform bg-black/90 backdrop-blur-lg border border-gray-800 shadow-2xl rounded-2xl">
          <!-- Close Button -->
          <div class="absolute top-4 right-4 z-10">
            <button
              @click="closeTrailerModal"
              class="text-gray-400 hover:text-white focus:outline-none bg-black/50 rounded-full p-2 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Trailer -->
          <div class="relative pt-[56.25%] rounded-lg overflow-hidden">
            <iframe
              v-if="currentTrailerKey"
              :src="`https://www.youtube.com/embed/${currentTrailerKey}?autoplay=1&rel=0`"
              class="absolute inset-0 w-full h-full"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <div
              v-else
              class="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg"
            >
              <div class="text-center">
                <svg class="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p class="text-gray-400 text-lg">No trailer available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { fetchData, getImageUrl } from "../api/api";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: "Home",
  setup() {
    const router = useRouter();

    // State
    const activeTab = ref("Movies");
    const featuredMovies = ref([]);
    const trendingMovies = ref([]);
    const continueWatching = ref([]);
    const topMovies = ref([]);
    const newReleases = ref([]);
    const currentSlide = ref(0);
    const isTrailerModalOpen = ref(false);
    const currentTrailerKey = ref("");

    // Auto-play hero slider
    let heroInterval = null;

    // Categories
    const categories = ref([
      { id: 1, name: "Action", gradient: "from-red-600 to-red-800" },
      { id: 2, name: "Comedy", gradient: "from-yellow-500 to-orange-600" },
      { id: 3, name: "Drama", gradient: "from-purple-600 to-pink-600" },
      { id: 4, name: "Horror", gradient: "from-gray-800 to-black" },
      { id: 5, name: "Sci-Fi", gradient: "from-blue-600 to-cyan-600" },
      { id: 6, name: "Romance", gradient: "from-pink-500 to-rose-600" },
    ]);

    // Utils
    const getBackdropUrl = (path) =>
      path
        ? `https://image.tmdb.org/t/p/original${path}`
        : "https://via.placeholder.com/1920x1080?text=No+Image";

    // Fetch Functions
    const fetchMovies = async () => {
      try {
        const [popular, upcoming, topRated, nowPlaying] = await Promise.all([
          fetchData("/movie/popular"),
          fetchData("/movie/upcoming"),
          fetchData("/movie/top_rated"),
          fetchData("/movie/now_playing")
        ]);

        featuredMovies.value = popular.results.slice(0, 5);
        trendingMovies.value = popular.results.slice(5, 17);
        continueWatching.value = nowPlaying.results.slice(0, 6);
        topMovies.value = topRated.results;
        newReleases.value = upcoming.results.slice(0, 12);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchMovieTrailer = async (movieId) => {
      try {
        const response = await fetchData(`/movie/${movieId}/videos`);
        const trailer = response.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        return trailer?.key || null;
      } catch (error) {
        console.error("Error fetching trailer:", error);
        return null;
      }
    };

    // Actions
    const playTrailer = async (movieId) => {
      const trailerKey = await fetchMovieTrailer(movieId);
      if (trailerKey) {
        currentTrailerKey.value = trailerKey;
        isTrailerModalOpen.value = true;
      } else {
        alert("No trailer available for this movie");
      }
    };

    const closeTrailerModal = () => {
      isTrailerModalOpen.value = false;
      currentTrailerKey.value = "";
    };

    const changeTab = async (tab) => {
      activeTab.value = tab;
      // You can add different API calls based on tab selection
    };

    const goToDetail = (movieId) => {
      router.push({ name: "DetailMovie", params: { id: movieId } });
    };

    const startHeroAutoPlay = () => {
      heroInterval = setInterval(() => {
        currentSlide.value = (currentSlide.value + 1) % featuredMovies.value.length;
      }, 5000);
    };

    const stopHeroAutoPlay = () => {
      if (heroInterval) {
        clearInterval(heroInterval);
        heroInterval = null;
      }
    };

    // Lifecycle
    onMounted(() => {
      AOS.init({
        duration: 800,
        offset: 100,
        easing: 'ease-in-out',
        once: true
      });
      
      fetchMovies().then(() => {
        startHeroAutoPlay();
      });
    });

    onUnmounted(() => {
      stopHeroAutoPlay();
    });

    return {
      // State
      activeTab,
      featuredMovies,
      trendingMovies,
      continueWatching,
      topMovies,
      newReleases,
      categories,
      currentSlide,
      isTrailerModalOpen,
      currentTrailerKey,
      
      // Functions
      getImageUrl,
      getBackdropUrl,
      playTrailer,
      closeTrailerModal,
      changeTab,
      goToDetail,
    };
  },
};
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #111;
}

::-webkit-scrollbar-thumb {
  background: #ef4444;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #dc2626;
}

/* Line clamp utilities */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;

  line-clamp: 1;
  box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  line-clamp: 2;
  box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  line-clamp: 3;
  box-orient: vertical;
  overflow: hidden;
}

/* Smooth transitions */
* {
  transition-property: transform, opacity, background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hero section background animation */
@keyframes backgroundPan {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}

/* Responsive design enhancements */
@media (max-width: 640px) {
  .text-8xl {
    font-size: 4rem;
  }
  
  .aspect-\[2\/3\] {
    aspect-ratio: 2/3;
  }
}

@media (min-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid-cols-lg-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}
</style>