<template>
  <div class="min-h-screen bg-black relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0">
      <div class="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-red-900/20 to-transparent"></div>
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
    </div>

    <!-- Header Section -->
    <div class="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Breadcrumb -->
        <nav class="text-sm text-gray-400 mb-6" data-aos="fade-down">
          <router-link to="/" class="hover:text-red-500 transition-colors">Home</router-link>
          <span class="mx-2">/</span>
          <span class="text-white">News & Updates</span>
        </nav>

        <!-- Hero Section -->
        <div class="text-center mb-12" data-aos="fade-up">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Entertainment
            <span class="text-red-500">News</span>
          </h1>
          <p class="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Stay updated with the latest movie releases, celebrity news, and entertainment industry insights
          </p>
          <div class="w-24 h-1 bg-red-500 mx-auto"></div>
        </div>

        <!-- Filter Tabs
        <div class="flex flex-wrap justify-center gap-4 mb-12" data-aos="fade-up" data-aos-delay="200">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="activeCategory = category.id"
            :class="[
              'px-6 py-3 rounded-full font-medium transition-all duration-300',
              activeCategory === category.id 
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                : 'bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
            ]"
          >
            {{ category.name }}
          </button>
        </div> -->
      </div>
    </div>

    <!-- Featured News Section -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Featured Article -->
        <div class="lg:col-span-2" data-aos="fade-right">
          <div v-if="news.length > 0" class="relative group cursor-pointer" @click="goTo(news[0].url)">
            <div class="relative h-80 md:h-96 rounded-2xl overflow-hidden">
              <img
                :src="news[0].image || 'https://images.unsplash.com/photo-1489599735734-79b4211ef945?w=800&h=600&fit=crop'"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Featured news"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <!-- Featured Badge -->
              <div class="absolute top-4 left-4">
                <span class="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Featured Story
                </span>
              </div>

              <!-- Content Overlay -->
              <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div class="flex items-center space-x-4 mb-4">
                  <span class="text-red-400 text-sm font-medium">{{ news[0].date }}</span>
                  <span class="text-gray-400 text-sm">{{ news[0].author }}</span>
                </div>
                <h2 class="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  {{ news[0].title }}
                </h2>
                <p class="text-gray-300 text-lg leading-relaxed line-clamp-3">
                  {{ news[0].excerpt }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Side Featured Articles -->
        <div class="space-y-6" data-aos="fade-left">
          <div v-for="(article, index) in news.slice(1, 4)" :key="`featured-${article.id}`" class="group cursor-pointer" @click="goTo(article.url)">
            <div class="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800/50 overflow-hidden hover:border-red-500/50 transition-all duration-300">
              <div class="flex">
                <div class="w-24 h-20 md:w-32 md:h-24 flex-shrink-0">
                  <img
                    :src="article.image || 'https://images.unsplash.com/photo-1489599735734-79b4211ef945?w=200&h=150&fit=crop'"
                    class="w-full h-full object-cover"
                    alt="News thumbnail"
                  />
                </div>
                <div class="flex-1 p-4">
                  <div class="flex items-center space-x-2 mb-2">
                    <span class="text-red-400 text-xs font-medium">{{ article.date }}</span>
                  </div>
                  <h3 class="text-white font-semibold text-sm md:text-base line-clamp-2 group-hover:text-red-400 transition-colors">
                    {{ article.title }}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main News Grid -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div class="flex items-center justify-between mb-8" data-aos="fade-up">
        <h2 class="text-2xl md:text-3xl font-bold text-white">Latest Updates</h2>
        <div class="flex items-center space-x-4">
          <select class="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-300 rounded-lg px-4 py-2 text-sm focus:border-red-500 focus:outline-none">
            <option>Most Recent</option>
            <option>Most Popular</option>
            <option>Trending</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <article
          v-for="(article, index) in news.slice(4)"
          :key="article.id"
          class="group cursor-pointer"
          :data-aos="'fade-up'"
          :data-aos-delay="index * 50"
          @click="goTo(article.url)"
        >
          <div class="bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-800/30 overflow-hidden hover:border-red-500/50 hover:bg-gray-800/50 transition-all duration-500 hover:scale-105">
            <!-- Image Container -->
            <div class="relative h-44 md:h-48 overflow-hidden">
              <img
                :src="article.image || 'https://images.unsplash.com/photo-1489599735734-79b4211ef945?w=400&h=300&fit=crop'"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="News image"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              <!-- Category Badge -->
              <div class="absolute top-3 left-3">
                <span class="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                  Entertainment
                </span>
              </div>

              <!-- Read Time -->
              <div class="absolute top-3 right-3">
                <span class="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                  {{ Math.floor(Math.random() * 5) + 2 }} min read
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-5">
              <div class="flex items-center justify-between mb-3">
                <span class="text-red-400 text-sm font-medium">{{ article.date }}</span>
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9Z"/>
                  </svg>
                  <span class="text-gray-500 text-xs">{{ Math.floor(Math.random() * 100) + 50 }}</span>
                </div>
              </div>

              <h3 class="text-white font-bold text-base md:text-lg mb-3 line-clamp-2 group-hover:text-red-400 transition-colors leading-tight">
                {{ article.title }}
              </h3>

              <p class="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                {{ article.excerpt }}
              </p>

              <div class="flex items-center justify-between">
                <span class="text-gray-500 text-xs">By {{ article.author }}</span>
                <button class="text-red-500 hover:text-red-400 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Load More Section -->
      <div class="text-center mt-12" data-aos="fade-up">
        <button
          @click="loadMore"
          :disabled="loading"
          class="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-xl hover:from-red-500 hover:to-red-400 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/30"
        >
          <span v-if="!loading" class="flex items-center space-x-2">
            <span>Load More Stories</span>
            <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
          </span>
          <span v-else class="flex items-center space-x-2">
            <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading...</span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchEntertainmentNews } from "@/api/apinews";
import AOS from "aos";
import "aos/dist/aos.css";

const news = ref([]);
const page = ref(1);
const loading = ref(false);
const activeCategory = ref(1);

const categories = ref([
  { id: 1, name: 'All News' },
  { id: 2, name: 'Movies' },
  { id: 3, name: 'TV Shows' },
  { id: 4, name: 'Celebrity' },
  { id: 5, name: 'Reviews' },
  { id: 6, name: 'Trending' }
]);

async function loadNews() {
  loading.value = true;
  try {
    const items = await fetchEntertainmentNews(page.value, 12);
    // gabung
    news.value = news.value.concat(items);
  } catch (error) {
    console.error('Error loading news:', error);
  } finally {
    loading.value = false;
  }
}

function loadMore() {
  page.value += 1;
  loadNews();
}

function goTo(url) {
  window.open(url, "_blank");
}

onMounted(async () => {
  AOS.init({
    duration: 800,
    offset: 50,
    easing: "ease-out-cubic",
    once: false,
    mirror: true
  });
  await loadNews();
});
</script>

<style scoped>
/* Custom line-clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

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

/* Smooth transitions */
* {
  transition: all 0.3s ease;
}

/* Backdrop blur support */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }
}

/* Mobile responsive adjustments */
@media (max-width: 640px) {
  .grid-cols-1 {
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  
  .featured-content {
    padding: 1.5rem;
  }
}

/* Hover animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.group:hover .float-on-hover {
  animation: float 2s ease-in-out infinite;
}

/* Loading animation */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>