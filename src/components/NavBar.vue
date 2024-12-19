<template>
  <nav
    class="px-8 py-4 flex items-center justify-between bg-navy-900 fixed w-full z-50"
  >
    <router-link to="/" class="flex items-center space-x-2">
      <h1 class="text-2xl font-bold text-white">CineDomus</h1>
    </router-link>

    <!-- Navigasi Tengah -->
    <div class="space-x-6 text-white flex-1 flex justify-center">
      <router-link
        v-for="item in navItems"
        :key="item.name"
        :to="item.path"
        class="hover:text-red-500 transition-colors cursor-pointer"
        :class="{ 'text-red-500': $route.path === item.path }"
      >
        {{ item.name }}
      </router-link>
    </div>

    <!-- Form Search -->
    <form
      class="flex items-center bg-white rounded-full overflow-hidden"
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

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "News", path: "/news" },
  { name: "Discover", path: "/discover" },
  { name: "Community", path: "/community" },
];

// State untuk query pencarian
const searchQuery = ref("");
const router = useRouter();

// Fungsi untuk menangani pencarian
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // Navigasi ke halaman hasil pencarian
    router.push({ path: "/search", query: { q: searchQuery.value } });
    searchQuery.value = ""; // Reset input
  }
};
</script>

<style scoped>
nav {
  background-color: #1a2238; /* Warna navy */
}
</style>
