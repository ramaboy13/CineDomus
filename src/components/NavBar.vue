<template>
  <nav class="px-6 py-4 flex items-center justify-between bg-gradient-to-r from-black via-gray-900 to-black fixed w-full z-50 backdrop-blur-lg border-b border-gray-800/20">
    <!-- Logo -->
    <router-link to="/" class="flex items-center space-x-3 group">
   <div class="w-10 h-10 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-all duration-300">
  <img src="/img/logo.png" alt="logo">
</div>

      <h1 class="text-2xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent group-hover:from-red-400 group-hover:via-red-500 group-hover:to-red-600 transition-all duration-300">
        <span class="text-red-500">Cine</span>Domous
      </h1>
    </router-link>

    <!-- Desktop Navigation -->
    <div class="hidden lg:flex items-center space-x-8">
      <router-link
        v-for="item in navItems"
        :key="item.name"
        :to="item.path"
        class="relative text-gray-300 hover:text-white transition-all duration-300 group py-2"
        :class="{ 'text-red-500': $route.path === item.path }"
      >
        {{ item.name }}
        <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"
              :class="{ 'w-full': $route.path === item.path }"></span>
      </router-link>
    </div>

    <!-- Right Side Actions -->
    <div class="flex items-center space-x-4">
      <!-- Desktop Search -->
      <div class="hidden md:flex items-center relative">
        <div class="relative group">
          <input
            type="text"
            v-model="searchQuery"
            @focus="isSearchFocused = true"
            @blur="isSearchFocused = false"
            @keyup.enter="handleSearch"
            placeholder="Search movies..."
            class="w-64 px-4 py-2 pl-10 bg-gray-800/50 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
            :class="{ 'ring-2 ring-red-500 border-transparent': isSearchFocused }"
          />
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Mobile Controls -->
      <div class="flex items-center md:hidden space-x-3">
        <!-- Mobile Search Button -->
        <button @click="toggleSearch" 
                class="p-2 rounded-full bg-gray-800/50 text-white hover:bg-gray-700/50 transition-all duration-300 focus:outline-none">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        <!-- Hamburger Button -->
        <button @click="toggleMenu" 
                class="p-2 rounded-full bg-gray-800/50 text-white hover:bg-gray-700/50 transition-all duration-300 focus:outline-none">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Search Overlay -->
    <transition name="search-slide">
      <div v-show="isSearchOpen" 
           class="absolute top-full left-0 w-full px-4 py-4 bg-black/95 backdrop-blur-lg border-b border-gray-800 md:hidden">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            placeholder="Search movies..."
            class="w-full px-4 py-3 pl-12 bg-gray-800/70 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <button @click="handleSearch" 
                  class="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-red-500 text-white text-sm rounded-full hover:bg-red-600 transition-colors">
            Search
          </button>
        </div>
      </div>
    </transition>

    <!-- Mobile Menu Overlay -->
    <transition name="menu-slide">
      <div v-show="isMenuOpen" 
           class="fixed top-20 left-0 w-full h-screen bg-black/95 backdrop-blur-lg md:hidden z-40">
        <div class="px-6 py-8 space-y-6">
          <router-link
            v-for="item in navItems"
            :key="item.name"
            :to="item.path"
            @click="isMenuOpen = false"
            class="block text-xl font-medium text-gray-300 hover:text-red-500 transition-colors py-3 border-b border-gray-800/50"
            :class="{ 'text-red-500': $route.path === item.path }"
          >
            {{ item.name }}
          </router-link>
          
          <!-- Mobile Menu Footer -->
          <div class="pt-8 border-t border-gray-800/50">
            <p class="text-gray-500 text-sm">© 2025 CineDomous</p>
            <div class="flex items-center space-x-4 mt-4">
              <a href="#" class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500 transition-all duration-300">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500 transition-all duration-300">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.748.099.12.112.224.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.163-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.754-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.017 0z.017 0"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Navigation items
const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "News", path: "/news" },
  { name: "Discover", path: "/discover" },
  { name: "Community", path: "/community" },
  
];

// State management
const searchQuery = ref("");
const router = useRouter();
const isMenuOpen = ref(false);
const isSearchOpen = ref(false);
const isSearchFocused = ref(false);

// Search handler
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: "/search", query: { q: searchQuery.value } });
    searchQuery.value = "";
    isSearchOpen.value = false;
    isMenuOpen.value = false;
  }
};

// Toggle handlers
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isSearchOpen.value) isSearchOpen.value = false;
};

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value;
  if (isMenuOpen.value) isMenuOpen.value = false;
};
</script>

<style scoped>
/* Transitions */
.search-slide-enter-active,
.search-slide-leave-active {
  transition: all 0.3s ease;
}

.search-slide-enter-from,
.search-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all 0.3s ease;
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

/* Custom scrollbar for mobile menu */
.mobile-menu::-webkit-scrollbar {
  width: 4px;
}

.mobile-menu::-webkit-scrollbar-track {
  background: transparent;
}

.mobile-menu::-webkit-scrollbar-thumb {
  background: #ef4444;
  border-radius: 2px;
}

/* Backdrop blur support */
@supports (backdrop-filter: blur(16px)) {
  .backdrop-blur-lg {
    backdrop-filter: blur(16px);
  }
}

/* Prevent body scroll when mobile menu is open */
body:has(.mobile-menu-open) {
  overflow: hidden;
}
</style>