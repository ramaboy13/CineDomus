<!-- Home.vue -->
<template>
  <div class="min-h-screen bg-navy-900 text-white">
    <!-- Hero Section -->
    <div class="relative h-[500px] px-8 py-12 mb-48">
      <div class="relative z-10 max-w-7xl mx-auto mt-16">
        <h1 class="text-2xl mb-8">Your weekend buddy for this week</h1>

        <!-- Movie Carousel -->
        <div class="relative">
          <button
            @click="prevSlide"
            class="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-2 rounded-full hover:bg-black transition"
          >
            <span class="sr-only">Previous</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div class="flex items-center overflow-hidden relative">
            <div
              v-for="(movie, index) in featuredMovies"
              :key="movie.id"
              :class="[
                'relative flex-none w-full transition-transform duration-700',
                currentSlide === index
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-full opacity-0 hidden',
              ]"
            >
              <img
                :src="getImageUrl(movie.backdrop_path)"
                class="rounded-lg shadow-lg w-full h-[300px] sm:h-[500px] object-cover object-center"
                alt="Movie backdrop"
              />

              <div
                class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/60 text-white"
              >
                <div
                  class="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6"
                >
                  <img
                    :src="getImageUrl(movie.poster_path)"
                    class="w-24 md:w-32 rounded-lg shadow-lg"
                    alt="Movie poster"
                  />
                  <div>
                    <h2 class="text-xl md:text-2xl font-bold">
                      {{ movie.title }}
                    </h2>
                    <div class="flex items-center space-x-4 mt-2">
                      <div class="flex items-center text-lg">
                        <span class="font-bold text-yellow-400">
                          {{ movie.vote_average.toFixed(1) }}/10
                        </span>
                      </div>
                    </div>
                    <p
                      class="mt-2 text-sm md:text-base text-gray-300 line-clamp-2"
                    >
                      {{ movie.overview }}
                    </p>
                    <button
                      @click="playTrailer(movie.id)"
                      class="mt-4 px-4 py-2 bg-red-500 text-sm md:text-base rounded-full hover:bg-red-600 transition"
                    >
                      Watch Trailer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            @click="nextSlide"
            class="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-2 rounded-full hover:bg-black transition"
          >
            <span class="sr-only">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- Discover Movies Section -->
    <section class="px-4 sm:px-8 py-12">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg sm:text-xl font-bold">Discover Movies</h2>
          <div class="flex space-x-4">
            <button
              v-for="tab in ['Random', 'Popular', 'Recent']"
              :key="tab"
              :class="[
                'px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base transition-colors',
                activeTab === tab ? 'bg-red-500' : 'hover:bg-gray-800',
              ]"
              @click="changeTab(tab)"
            >
              {{ tab }}
            </button>
          </div>
        </div>

        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
        >
          <div
            v-for="movie in discoveredMovies"
            :key="movie.id"
            class="group relative rounded-lg overflow-hidden cursor-pointer"
            @click="goToDetail(movie.id)"
          >
            <img :src="getImageUrl(movie.poster_path)" class="w-full h-auto" />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <div class="absolute bottom-0 p-4">
                <h3 class="font-bold text-sm sm:text-base">
                  {{ movie.title }}
                </h3>
                <div class="flex items-center space-x-2 text-xs sm:text-sm">
                  <span>{{ movie.release_date?.split("-")[0] }}</span>
                  <span>•</span>
                  <span>{{ movie.vote_average }}/10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          class="mt-8 px-4 sm:px-6 py-2 sm:py-3 bg-red-500 rounded-full mx-auto block hover:bg-red-600 transition-colors"
          @click="goToAllMovies"
        >
          See All
        </button>
      </div>
    </section>

    <!-- Trailer Modal -->
    <div v-if="isTrailerModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div
        class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0"
      >
        <div
          class="fixed inset-0 transition-opacity"
          aria-hidden="true"
          @click="closeTrailerModal"
        >
          <div class="absolute inset-0 bg-black/75"></div>
        </div>

        <div
          class="relative inline-block w-full max-w-4xl p-6 overflow-hidden text-left align-middle transition-all transform bg-navy-900 shadow-xl rounded-2xl"
        >
          <div class="absolute top-0 right-0 pt-4 pr-4">
            <button
              @click="closeTrailerModal"
              class="text-gray-400 hover:text-white focus:outline-none"
            >
              <span class="sr-only">Close</span>
              <svg
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="mt-2">
            <div class="relative pt-[56.25%]">
              <iframe
                v-if="currentTrailerKey"
                :src="`https://www.youtube.com/embed/${currentTrailerKey}?autoplay=1`"
                class="absolute inset-0 w-full h-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <div
                v-else
                class="absolute inset-0 flex items-center justify-center bg-gray-900"
              >
                <p class="text-gray-400">No trailer available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { fetchData, getImageUrl } from "../api";

export default {
  name: "Home",
  setup() {
    const router = useRouter();
    const navItems = ["Home", "About", "News", "Discover", "Community"];
    const activeTab = ref("Random");
    const featuredMovies = ref([]);
    const discoveredMovies = ref([]);
    const currentSlide = ref(0);
    const isTrailerModalOpen = ref(false);
    const currentTrailerKey = ref("");

    const topReviewers = ref([
      {
        id: 1,
        name: "Emma Freeman",
        reviews: 2332,
        year: 2023,
        avatar: "/avatars/emma.jpg",
      },
      {
        id: 2,
        name: "Israel Hammond",
        reviews: 2029,
        year: 2023,
        avatar: "/avatars/israel.jpg",
      },
      // Add more reviewers...
    ]);

    const news = ref([
      {
        id: 1,
        title: "Suicide Squad Is a Hit, But DC Needs to Start Making Movies",
        image: "/news/suicide-squad.jpg",
        timeAgo: "2 Hours Ago",
        author: "Yogi",
      },
      // Add more news...
    ]);

    const fetchMovies = async () => {
      try {
        const popular = await fetchData("/movie/popular");
        featuredMovies.value = popular.results.slice(0, 5);
        discoveredMovies.value = popular.results.slice(5, 15);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchMoviesByTab = async (tab) => {
      try {
        if (tab === "Random") {
          const random = await fetchData("/movie/random");
          discoveredMovies.value = random.results.slice(0, 15);
        } else if (tab === "Popular") {
          const popular = await fetchData("/movie/popular");
          discoveredMovies.value = popular.results.slice(0, 15);
        } else if (tab === "Recent") {
          const recent = await fetchData("/movie/recent");
          discoveredMovies.value = recent.results.slice(0, 15);
        }
      } catch (error) {
        console.error(`Error fetching movies for tab ${tab}:`, error);
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

    const playTrailer = async (movieId) => {
      const trailerKey = await fetchMovieTrailer(movieId);
      if (trailerKey) {
        currentTrailerKey.value = trailerKey;
        isTrailerModalOpen.value = true;
      } else {
        alert("No trailer available");
      }
    };

    const closeTrailerModal = () => {
      isTrailerModalOpen.value = false;
      currentTrailerKey.value = "";
    };

    const prevSlide = () => {
      currentSlide.value =
        (currentSlide.value - 1 + featuredMovies.value.length) %
        featuredMovies.value.length;
    };

    const nextSlide = () => {
      currentSlide.value =
        (currentSlide.value + 1) % featuredMovies.value.length;
    };

    const changeTab = async (tab) => {
      activeTab.value = tab;
      await fetchMoviesByTab(tab);
      console.log(`Tab changed to: ${tab}`);
    };
    const goToDetail = (movieId) => {
      router.push({ name: "DetailMovie", params: { id: movieId } });
    };

    const goToAllMovies = () => {
      router.push({ path: "/all-movies" });
    };

    onMounted(() => {
      fetchMovies();
    });

    return {
      navItems,
      activeTab,
      featuredMovies,
      discoveredMovies,
      topReviewers,
      news,
      currentSlide,
      prevSlide,
      nextSlide,
      getImageUrl,
      goToDetail,
      goToAllMovies,
      isTrailerModalOpen,
      currentTrailerKey,
      playTrailer,
      closeTrailerModal,
      changeTab,
    };
  },
};
</script>

<style>
.bg-navy-900 {
  background-color: #0a1229;
}
</style>
