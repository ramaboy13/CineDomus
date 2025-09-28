<template>
  <div class="min-h-screen bg-gray-950 text-white px-4 py-12 sm:px-8">
    <!-- Header -->
    <h1
      class="text-3xl sm:text-4xl font-extrabold mb-10 mt-16 text-center"
      data-aos="fade-down"
    >
      All Movies
    </h1>

    <!-- Grid Movies -->
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6"
    >
      <div
        v-for="movie in paginatedMovies"
        :key="movie.id"
        class="group relative rounded-lg overflow-hidden cursor-pointer shadow-lg bg-gray-900"
        @click="goToDetail(movie.id)"
        data-aos="zoom-in"
        data-aos-delay="100"
      >
        <!-- Poster -->
        <img
          :src="getImageUrl(movie.poster_path)"
          class="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
          alt="Movie poster"
        />

        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div class="absolute bottom-0 p-3 sm:p-4">
            <h3 class="font-semibold text-sm sm:text-base line-clamp-2">
              {{ movie.title }}
            </h3>
            <div class="flex items-center space-x-2 text-xs sm:text-sm text-gray-300 mt-1">
              <span>{{ movie.release_date?.split("-")[0] }}</span>
              <span>•</span>
              <span>⭐ {{ movie.vote_average }}/10</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center items-center mt-12 space-x-2">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50"
      >
        Prev
      </button>

      <span class="px-3 py-2 bg-gray-700 rounded text-sm">
        Page {{ currentPage }} / {{ totalPages }}
      </span>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { getAllMoviesFromEndpoints, getImageUrl } from "../api/api";
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: "AllMovies",
  setup() {
    const movies = ref([]);
    const router = useRouter();

    // pagination states
    const currentPage = ref(1);
    const perPage = 18; 

    const totalPages = computed(() =>
      Math.ceil(movies.value.length / perPage)
    );

    const paginatedMovies = computed(() => {
      const start = (currentPage.value - 1) * perPage;
      const end = start + perPage;
      return movies.value.slice(start, end);
    });

const fetchMovies = async () => {
  try {
    // ambil 5 halaman aja biar ga berat
    movies.value = await getAllMoviesFromEndpoints(100);
  } catch (error) {
    console.error("Error fetching all movies:", error);
  }
};


    const goToDetail = (movieId) => {
      router.push({ name: "DetailMovie", params: { id: movieId } });
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    onMounted(() => {
      fetchMovies();
      AOS.init({ duration: 800, once: true });
    });

    return {
      movies,
      getImageUrl,
      goToDetail,
      paginatedMovies,
      currentPage,
      totalPages,
      nextPage,
      prevPage,
    };
  },
};
</script>

<style scoped>
/* Tambahan biar teks tidak terlalu panjang */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  line-clamp: 2;
  box-orient: vertical;
  overflow: hidden;
}
</style>
