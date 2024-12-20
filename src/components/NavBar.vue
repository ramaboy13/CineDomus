<template>
  <nav
    class="px-6 py-4 flex items-center justify-between bg-navy-900 fixed w-full z-50"
  >
    <!-- Logo -->
    <router-link to="/" class="flex items-center space-x-2">
      <h1 class="text-2xl font-bold text-white">CineDomus</h1>
    </router-link>

    <!-- Hamburger Menu for Mobile -->
    <div class="flex items-center md:hidden">
      <!-- Mobile Search Button -->
      <button @click="toggleSearch" class="text-white mr-4 focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
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
      </button>

      <!-- Hamburger Button -->
      <button @click="toggleMenu" class="text-white focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            v-if="!isMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Search Bar -->
    <div
      v-show="isSearchOpen"
      class="absolute top-16 left-0 w-full px-4 py-2 bg-navy-900 md:hidden"
    >
      <form
        class="flex items-center bg-white rounded-full overflow-hidden"
        @submit.prevent="handleSearch"
      >
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search movies..."
          class="px-4 py-2 w-full focus:outline-none text-black"
        />
        <button
          type="submit"
          class="px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          Search
        </button>
      </form>
    </div>

    <!-- Navigation Menu -->
    <div
      class="fixed md:static top-16 left-0 w-full md:w-auto h-screen md:h-auto bg-navy-900 md:bg-transparent transform transition-transform duration-300 ease-in-out"
      :class="[
        isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        'md:block',
      ]"
    >
      <div
        class="flex flex-col md:flex-row items-start md:items-center md:space-x-6 p-4 md:p-0 space-y-4 md:space-y-0"
      >
        <router-link
          v-for="item in navItems"
          :key="item.name"
          :to="item.path"
          class="text-white hover:text-red-500 transition-colors cursor-pointer w-full md:w-auto"
          :class="{ 'text-red-500': $route.path === item.path }"
          @click="isMenuOpen = false"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>

    <!-- Desktop Search Form -->
    <form
      class="hidden md:flex items-center bg-white rounded-full overflow-hidden"
      @submit.prevent="handleSearch"
    >
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search movies..."
        class="px-4 py-2 w-48 focus:outline-none text-black"
      />
      <button
        type="submit"
        class="px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
      >
        Search
      </button>
    </form>
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
  background-color: #1a2238;
}

@media (min-width: 768px) {
  .md\:block {
    display: block !important;
  }
}

/* Add smooth transition for menu items */
.router-link-active {
  color: #ef4444;
}

/* Prevent body scroll when mobile menu is open */
@media (max-width: 767px) {
  body:has(.mobile-menu-open) {
    overflow: hidden;
  }
}
</style>
