<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/20 to-transparent"></div>
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
    </div>

    <!-- Header Section -->
    <div class="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto text-center" data-aos="fade-up">
        <nav class="text-sm text-gray-400 mb-8">
          <router-link to="/" class="hover:text-red-500 transition-colors">Home</router-link>
          <span class="mx-2">/</span>
          <span class="text-white">About Us</span>
        </nav>
        <h1 class="text-5xl md:text-6xl font-bold text-white mb-4">About Us</h1>
        <div class="w-20 h-1 bg-red-500 mx-auto"></div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      
      <!-- First Section - Our Story -->
      <div class="mb-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Text Content -->
          <div class="order-2 lg:order-1" data-aos="fade-right">
            <div class="mb-6">
              <span class="text-red-500 text-sm font-semibold uppercase tracking-wide">Our Story</span>
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Your Gateway To <span class="text-red-500">Cinema</span><br>
              Excellence <span class="text-red-500">Get Noticed</span> Discover<br>
              Movies <span class="text-red-500">Dominate</span>.
            </h2>
<p class="text-gray-300 text-lg leading-relaxed mb-8">
  CineDomus is a cutting-edge platform designed to help you discover movies from every genre. 
  Our mission is to make it easier for film enthusiasts to explore, search, and learn more about 
  their favorite titles with a modern interface and reliable information.
</p>


            <!-- Stats -->
            <div class="grid grid-cols-4 gap-6">
              <div class="text-center" data-aos="fade-up" data-aos-delay="100">
                <div class="text-2xl md:text-3xl font-bold text-red-500 mb-1">10K+</div>
                <div class="text-gray-400 text-xs md:text-sm">Movies Collection</div>
              </div>
              <div class="text-center" data-aos="fade-up" data-aos-delay="200">
                <div class="text-2xl md:text-3xl font-bold text-red-500 mb-1">15K</div>
                <div class="text-gray-400 text-xs md:text-sm">Active Users</div>
              </div>
              <div class="text-center" data-aos="fade-up" data-aos-delay="300">
                <div class="text-2xl md:text-3xl font-bold text-red-500 mb-1">10K+</div>
                <div class="text-gray-400 text-xs md:text-sm">Hours Watched</div>
              </div>
              <div class="text-center" data-aos="fade-up" data-aos-delay="400">
                <div class="text-2xl md:text-3xl font-bold text-red-500 mb-1">45+</div>
                <div class="text-gray-400 text-xs md:text-sm">Countries</div>
              </div>
            </div>

            <!-- Team Avatars and Watch Intro -->
            <div class="flex items-center justify-between mt-8">
              <div class="flex -space-x-3">
                <img class="w-10 h-10 rounded-full border-2 border-gray-700" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Team member" />
                <img class="w-10 h-10 rounded-full border-2 border-gray-700" src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" alt="Team member" />
                <img class="w-10 h-10 rounded-full border-2 border-gray-700" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Team member" />
                <div class="w-10 h-10 rounded-full border-2 border-gray-700 bg-red-500 flex items-center justify-center">
                  <span class="text-white text-xs font-semibold">+5</span>
                </div>
              </div>
              <button class="flex items-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-white hover:bg-white/20 transition-all duration-300">
                <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <span class="text-sm font-medium">WATCH INTRO</span>
              </button>
            </div>
          </div>

          <!-- Image Content -->
          <div class="order-1 lg:order-2" data-aos="fade-left">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
              
              <!-- Main Hero Image -->
              <div class="relative rounded-2xl w-full h-80 md:h-96 overflow-hidden shadow-2xl bg-gray-800">
                <img v-if="featuredMovie" 
                     :src="getImageUrl(featuredMovie.backdrop_path)" 
                     :alt="featuredMovie.title"
                     class="w-full h-full object-cover" />
                <div v-else class="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div class="text-center text-gray-400">
                    <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
                    </svg>
                    <p class="text-sm">Loading Featured Movie...</p>
                  </div>
                </div>
                
                <!-- Overlay gradient -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              
              <!-- Floating Tags -->
              <div class="absolute top-4 left-4 flex space-x-2">
                <span class="bg-red-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  {{ popularMovies.length > 0 ? 'Popular' : 'Hot Movies' }}
                </span>
                <span class="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">Trending</span>
              </div>
              <div class="absolute top-4 right-4 flex space-x-2">
                <span class="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">4K Quality</span>
                <span class="bg-yellow-500/90 backdrop-blur-sm text-black px-3 py-1 rounded-full text-sm font-medium shadow-lg">Premium</span>
              </div>
              
              <!-- Movie posters overlay -->
              <div class="absolute -bottom-4 -right-4 grid grid-cols-2 gap-2">
                <div v-for="(movie, index) in overlayMovies.slice(0, 2)" 
                     :key="movie.id"
                     class="relative group cursor-pointer transform hover:scale-105 transition-all duration-300">
                  <img :src="getImageUrl(movie.poster_path)" 
                       :alt="movie.title"
                       class="w-16 h-24 rounded-lg shadow-lg object-cover border-2 border-gray-600 group-hover:border-red-500" />
                  <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 rounded-lg transition-all duration-300 flex items-center justify-center">
                    <svg v-show="false" class="w-4 h-4 text-white opacity-0 group-hover:opacity-100" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <!-- Rating badge -->
                  <div class="absolute -top-1 -left-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                    {{ Math.round(movie.vote_average * 10) / 10 }}
                  </div>
                </div>
              </div>
              
              <!-- Featured movie info -->
              <div v-if="featuredMovie" class="absolute bottom-4 left-4 right-4">
                <div class="bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white">
                  <h3 class="font-bold text-lg truncate">{{ featuredMovie.title }}</h3>
                  <p class="text-sm text-gray-300 mt-1 line-clamp-2">{{ featuredMovie.overview }}</p>
                  <div class="flex items-center justify-between mt-3">
                    <div class="flex items-center space-x-2">
                      <div class="flex items-center space-x-1">
                        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span class="text-sm font-medium">{{ Math.round(featuredMovie.vote_average * 10) / 10 }}</span>
                      </div>
                      <span class="text-gray-400 text-sm">•</span>
                      <span class="text-sm text-gray-300">{{ new Date(featuredMovie.release_date).getFullYear() }}</span>
                    </div>
                    <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors">
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Second Section - Our Journey -->
      <div class="mb-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Image Content -->
          <div data-aos="fade-right">
            <div class="relative">
              <img src="https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=600&h=400&fit=crop" 
                   alt="Cinema Experience" 
                   class="rounded-2xl w-full h-80 md:h-96 object-cover shadow-2xl" />
              
              <!-- Timeline -->
              <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-md">
                <div class="bg-black/80 backdrop-blur-sm rounded-2xl p-6">
                  <div class="flex justify-between items-center text-white text-sm">
                    <div class="text-center">
                      <div class="w-3 h-3 bg-red-500 rounded-full mx-auto mb-2"></div>
                      <div class="font-semibold">2020</div>
                    </div>
                    <div class="text-center">
                      <div class="w-3 h-3 bg-gray-400 rounded-full mx-auto mb-2"></div>
                      <div class="font-semibold">2021</div>
                    </div>
                    <div class="text-center">
                      <div class="w-3 h-3 bg-gray-400 rounded-full mx-auto mb-2"></div>
                      <div class="font-semibold">2022</div>
                    </div>
                    <div class="text-center">
                      <div class="w-3 h-3 bg-gray-400 rounded-full mx-auto mb-2"></div>
                      <div class="font-semibold">2023</div>
                    </div>
                    <div class="text-center">
                      <div class="w-3 h-3 bg-red-500 rounded-full mx-auto mb-2"></div>
                      <div class="font-semibold">2024</div>
                    </div>
                  </div>
                  <div class="text-center mt-4 text-white">
                    <div class="font-bold">Establishment &</div>
                    <div class="font-bold">Foundation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Text Content -->
          <div data-aos="fade-left">
            <div class="mb-6">
              <span class="text-red-500 text-sm font-semibold uppercase tracking-wide">Our Journey</span>
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Your Gateway To <span class="text-red-500">Online</span><br>
              <span class="text-red-500">Excellence</span> Dream Big In Movies.
            </h2>
<p class="text-gray-300 text-lg leading-relaxed mb-8">
  Since its launch, CineDomus has evolved into a trusted platform for discovering movies 
  from around the world. Powered by data from The Movie Database (TMDB), we provide 
  comprehensive information including movie details, cast, ratings, and release dates. 
  Our mission is to help film enthusiasts explore, research, and stay updated with the 
  latest in cinema — anytime, anywhere.
</p>

            
            <!-- CTA Button -->
            <a href="/all-movies" class="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
              Explore Movies
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { getPopularMovies, getNowPlayingMovies, getImageUrl } from '../api/api'

export default {
  name: 'AboutUs',
  data() {
    return {
      popularMovies: [],
      nowPlayingMovies: [],
      featuredMovie: null,
      overlayMovies: [],
      loading: true
    }
  },
  async mounted() {
    AOS.init({
      duration: 800,
      offset: 100,
      easing: 'ease-in-out',
      once: true
    })
    
    await this.loadMovies()
  },
  methods: {
    getImageUrl,
    async loadMovies() {
      try {
        this.loading = true
        
        // Fetch popular and now playing movies
        const [popularResponse, nowPlayingResponse] = await Promise.all([
          getPopularMovies(1),
          getNowPlayingMovies(1)
        ])
        
        this.popularMovies = popularResponse.results || []
        this.nowPlayingMovies = nowPlayingResponse.results || []
        
        // Set featured movie (first popular movie)
        if (this.popularMovies.length > 0) {
          this.featuredMovie = this.popularMovies[0]
        }
        
        // Set overlay movies (mix of popular and now playing)
        const allMovies = [...this.popularMovies, ...this.nowPlayingMovies]
        this.overlayMovies = allMovies.slice(1, 5) // Get 4 movies for overlay
        
        this.loading = false
      } catch (error) {
        console.error('Error loading movies:', error)
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
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

/* Smooth animations */
* {
  transition: all 0.3s ease;
}

/* Text clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2; /* Add this line */
}

/* Responsive typography */
@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 1.875rem;
  }
}
</style>