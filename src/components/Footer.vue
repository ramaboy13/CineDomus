<template>
  <footer class="bg-gradient-to-t from-black via-gray-900 to-black text-white relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/20 to-transparent"></div>
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
    </div>

    <!-- Main Footer Content -->
    <div class="relative max-w-7xl mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        
        <!-- Brand Section -->
        <div class="lg:col-span-2" data-aos="fade-up" data-aos-delay="100">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center">
              <img src="/img/logo.png" alt="logo">
            </div>
            <h2 class="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
              CineDomous
            </h2>
          </div>
          <p class="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
            Your ultimate destination for discovering and streaming the best movies and TV shows. 
            Join millions of movie enthusiasts worldwide in our cinematic community.
          </p>
          
          <!-- Newsletter Subscription -->
          <div class="space-y-4 text-gray-400">
           <p>&copy; 2025 CineDomus. All rights reserved.</p>
          </div>
        </div>

        <!-- Quick Links -->
        <div data-aos="fade-up" data-aos-delay="200">
          <h3 class="text-xl font-semibold mb-6 text-white">Quick Links</h3>
          <ul class="space-y-4">
            <li>
              <router-link to="/" class="text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center group">
                <span class="w-1 h-1 bg-red-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/movies" class="text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center group">
                <span class="w-1 h-1 bg-red-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                Movies
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center group">
                <span class="w-1 h-1 bg-red-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                About Us
              </router-link>
            </li>
            <li>
              <router-link to="/discover" class="text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center group">
                <span class="w-1 h-1 bg-red-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                Discover
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact & Support -->
        <div data-aos="fade-up" data-aos-delay="300">
          <h3 class="text-xl font-semibold mb-6 text-white">Get in Touch</h3>
          <ul class="space-y-4">
            <li class="flex items-center space-x-3 text-gray-400">
              <div class="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <span>+62 123 456 789</span>
            </li>
            <li class="flex items-center space-x-3 text-gray-400">
              <div class="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <span>baritosurya13@gmail.com</span>
            </li>
            <li class="flex items-start space-x-3 text-gray-400">
              <div class="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <span>Jakarta, Indonesia<br>Southeast Asia</span>
            </li>
          </ul>

          <!-- Social Media -->
          <div class="mt-8">
            <h4 class="text-lg font-semibold mb-4 text-white">Follow Us</h4>
            <div class="flex space-x-4">
              <a href="https://www.facebook.com/rama.buoys" 
                 class="w-10 h-10 bg-gray-800/50 hover:bg-blue-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                </svg>
              </a>
              <a href="https://x.com/ramaboy__" 
                 class="w-10 h-10 bg-gray-800/50 hover:bg-black rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/ramaboy_13/" 
                 class="w-10 h-10 bg-gray-800/50 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.98 0a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 6 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3.2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
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

// Search handler
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: "/search", query: { q: searchQuery.value } });
    searchQuery.value = "";
    isSearchOpen.value = false;
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
nav {
  background-color: 
#1a2238;
}

@media (min-width: 768px) {
  .md\:block {
    display: block !important;
  }
}

/* Add smooth transition for menu items */
.router-link-active {
  color: 
#ef4444;
}

/* Prevent body scroll when mobile menu is open */
@media (max-width: 767px) {
  body:has(.mobile-menu-open) {
    overflow: hidden;
  }
}
</style>

