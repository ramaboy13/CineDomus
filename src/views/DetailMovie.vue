<template>
  <div class="relative min-h-screen bg-black text-white overflow-hidden">
    <!-- Hero Background -->
    <div
      v-if="movie"
      class="absolute inset-0 w-full h-screen"
    >
      <img
        :src="getImageUrl(movie.backdrop_path)"
        :alt="movie.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
      <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-transparent" />
    </div>

    <!-- Main Content -->
    <div class="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <div v-if="movie" class="space-y-12">
        
        <!-- Hero Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start min-h-[80vh] pt-12">
          <!-- Left Column - Movie Info -->
          <div class="lg:col-span-2 space-y-6 lg:space-y-8" data-aos="fade-right">
            <!-- Title & Meta -->
            <div class="space-y-4">
              <h1 class="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
                {{ movie.title }}
              </h1>
              
              <div class="flex items-center flex-wrap gap-4 text-sm lg:text-base">
                <div class="flex items-center space-x-2">
                  <span class="bg-red-600 px-2 py-1 rounded text-xs font-semibold">
                    {{ movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A' }}
                  </span>
                  <span class="text-green-400 font-medium">{{ movie.release_date?.split('-')[0] }}</span>
                </div>
                <span class="text-gray-300">•</span>
                <span class="text-gray-300">{{ formatRuntime(movie.runtime) }}</span>
                <span class="text-gray-300">•</span>
                <span class="text-gray-300">{{ movie.adult ? '18+' : '13+' }}</span>
              </div>

              <!-- Genres -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="genre in movie.genres?.slice(0, 4)"
                  :key="genre.id"
                  class="px-3 py-1 bg-gray-800/80 backdrop-blur-sm rounded-full text-sm border border-gray-700"
                >
                  {{ genre.name }}
                </span>
              </div>
            </div>

            <!-- Description -->
            <div class="space-y-4 max-w-3xl">
              <h2 class="text-xl lg:text-2xl font-semibold">Overview</h2>
              <p class="text-gray-200 text-base lg:text-lg leading-relaxed">
                {{ movie.overview }}
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                v-if="movie.trailers?.length"
                @click="showTrailer = true; selectedTrailer = 0"
                class="flex items-center justify-center px-8 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition-all duration-300 font-semibold text-lg group"
              >
                <svg class="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Play Trailer
              </button>
              <button 
                @click="shareMovie"
                class="flex items-center justify-center px-4 py-3 bg-transparent border-2 border-gray-600 text-white rounded-md hover:border-white transition-all duration-300 group relative"
                :class="{ 'border-green-500 bg-green-500/10': shareSuccess }"
              >
                <svg v-if="!shareSuccess" class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                </svg>
                <svg v-else class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                
                <!-- Tooltip -->
                <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {{ shareSuccess ? 'Link copied!' : 'Share movie' }}
                  <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
            </div>

            <!-- Movie Details -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
              <div class="space-y-2" data-aos="fade-up" data-aos-delay="200">
                <h3 class="text-gray-400 text-sm uppercase tracking-wide">Language</h3>
                <p class="text-white font-medium">{{ movie.original_language?.toUpperCase() }}</p>
              </div>
              <div class="space-y-2" data-aos="fade-up" data-aos-delay="300">
                <h3 class="text-gray-400 text-sm uppercase tracking-wide">Release Date</h3>
                <p class="text-white font-medium">{{ formatDate(movie.release_date) }}</p>
              </div>
            </div>
          </div>

          <!-- Right Column - Movie Poster -->
          <div class="lg:col-span-1 flex justify-center lg:justify-end" data-aos="fade-left">
            <div class="relative group">
              <img
                :src="getImageUrl(movie.poster_path)"
                :alt="movie.title"
                class="rounded-xl shadow-2xl max-w-xs sm:max-w-sm lg:max-w-md w-full transform group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>

        <!-- Trailers Section -->
        <div v-if="movie.trailers?.length" class="space-y-6 pt-12" data-aos="fade-up">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl lg:text-3xl font-bold">Trailers & Videos</h2>
            <div class="flex space-x-2">
              <button
                @click="scrollTrailers('left')"
                class="p-2 bg-gray-800/80 backdrop-blur-sm rounded-full hover:bg-gray-700 transition-colors"
                :disabled="scrollPosition === 0"
                :class="{ 'opacity-50 cursor-not-allowed': scrollPosition === 0 }"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <button
                @click="scrollTrailers('right')"
                class="p-2 bg-gray-800/80 backdrop-blur-sm rounded-full hover:bg-gray-700 transition-colors"
                :disabled="scrollPosition >= maxScroll"
                :class="{ 'opacity-50 cursor-not-allowed': scrollPosition >= maxScroll }"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Carousel Container -->
          <div class="relative overflow-hidden">
            <div 
              ref="trailerCarousel"
              class="flex space-x-4 transition-transform duration-500 ease-out"
              :style="{ transform: `translateX(-${scrollPosition * 100}%)` }"
            >
              <div
                v-for="(trailer, index) in movie.trailers"
                :key="trailer.id"
                class="relative rounded-lg overflow-hidden flex-shrink-0 group cursor-pointer w-80 h-44 sm:w-96 sm:h-52"
                @click="selectedTrailer = index; showTrailer = true"
              >
                <img
                  :src="trailer.thumbnail || getImageUrl(movie.backdrop_path)"
                  :alt="trailer.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div class="w-16 h-16 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <svg class="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <div class="absolute bottom-4 left-4 right-4">
                  <h3 class="text-white font-semibold text-sm sm:text-base mb-1 line-clamp-1">{{ trailer.name || 'Official Trailer' }}</h3>
                  <div class="flex items-center justify-between">
                    <span class="bg-red-600 px-2 py-1 rounded text-xs font-semibold uppercase">{{ trailer.type || 'Trailer' }}</span>
                    <span class="text-gray-300 text-xs">{{ trailer.duration || '2:30' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else class="flex items-center justify-center min-h-screen">
        <div class="text-center space-y-4">
          <div class="animate-spin w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full mx-auto"></div>
          <p class="text-gray-400">Loading movie details...</p>
        </div>
      </div>
    </div>

    <!-- Trailer Modal -->
    <div
      v-if="showTrailer && movie?.trailers?.length"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      @click.self="showTrailer = false"
    >
      <div class="relative w-full max-w-2xl sm:max-w-4xl lg:max-w-6xl bg-black rounded-xl overflow-hidden shadow-2xl">
        <button
          @click="showTrailer = false"
          class="absolute top-4 right-4 z-10 p-2 bg-black/70 backdrop-blur-sm rounded-full hover:bg-black transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
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
        
        <!-- Modal Footer -->
        <div class="p-6 bg-gray-900">
          <h3 class="text-xl font-semibold mb-2">{{ movie.trailers[selectedTrailer].name || 'Official Trailer' }}</h3>
          <p class="text-gray-400">{{ movie.title }} - {{ movie.release_date?.split('-')[0] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getImageUrl, getMovieDetails } from "../api/api";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: "DetailMovie",
  data() {
    return {
      movie: null,
      selectedTrailer: 0,
      showTrailer: false,
      scrollPosition: 0,
      maxScroll: 0,
      shareSuccess: false,
    };
  },
  methods: {
    async fetchMovieDetails() {
      try {
        const movieId = this.$route.params.id;
        const data = await getMovieDetails(movieId);
        this.movie = data;
        
        // Calculate max scroll for trailer carousel
        this.$nextTick(() => {
          this.calculateMaxScroll();
        });
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    },
    
    getImageUrl(path) {
      return getImageUrl(path);
    },
    
    formatRuntime(minutes) {
      if (!minutes) return 'N/A';
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
    },
    
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    },
    
    scrollTrailers(direction) {
      const container = this.$refs.trailerCarousel;
      if (!container) return;
      
      if (direction === 'left') {
        this.scrollPosition = Math.max(0, this.scrollPosition - 1);
      } else {
        this.scrollPosition = Math.min(this.maxScroll, this.scrollPosition + 1);
      }
    },
    
    calculateMaxScroll() {
      if (!this.movie?.trailers?.length) return;
      
      const itemsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
      this.maxScroll = Math.max(0, this.movie.trailers.length - itemsPerView);
    },
    
    handleResize() {
      this.calculateMaxScroll();
      this.scrollPosition = Math.min(this.scrollPosition, this.maxScroll);
    },
    
    async shareMovie() {
      try {
        const currentUrl = window.location.href;
        const shareData = {
          title: `${this.movie?.title} - CineDomous`,
          text: `Check out "${this.movie?.title}" on CineDomous`,
          url: currentUrl
        };

        // Try using Web Share API first (for mobile devices)
        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
          await navigator.share(shareData);
        } else {
          // Fallback to copying to clipboard
          await navigator.clipboard.writeText(currentUrl);
          this.shareSuccess = true;
          
          // Reset success state after 2 seconds
          setTimeout(() => {
            this.shareSuccess = false;
          }, 2000);
        }
      } catch (error) {
        // If clipboard API fails, show the URL in an alert
        if (error.name !== 'AbortError') {
          const currentUrl = window.location.href;
          prompt('Copy this link to share:', currentUrl);
        }
      }
    }
  },
  
  async created() {
    await this.fetchMovieDetails();
  },
  
  mounted() {
    AOS.init({
      duration: 800,
      offset: 100,
      easing: 'ease-in-out',
      once: true
    });
    
    window.addEventListener('resize', this.handleResize);
  },
  
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>

<style scoped>
/* Line clamp utility */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  line-clamp: 1;
  box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #ef4444;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #dc2626;
}

/* Smooth transitions */
* {
  transition: all 0.3s ease;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (max-width: 768px) {
  .text-7xl {
    font-size: 3rem;
  }
}

/* Backdrop filter support */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }
}

/* Button hover effects */
button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}
</style>