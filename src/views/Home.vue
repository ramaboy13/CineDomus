<!-- App.vue -->
<template>
  <div class="min-h-screen bg-navy-900 text-white">
    <!-- Hero Section -->
    <div class="relative h-[500px] px-8 py-12">
      <div class="relative z-10 max-w-7xl mx-auto mt-10">
        <h1 class="text-2xl mb-8">Your weekend buddy for this week</h1>

        <!-- Movie Carousel -->
        <div class="relative">
          <button
            @click="prevSlide"
            class="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-2 rounded-full"
          >
            <span class="sr-only">Previous</span>
            <!-- Left arrow icon -->
          </button>

          <div class="flex items-center space-x-6 overflow-hidden">
            <div
              v-for="movie in featuredMovies"
              :key="movie.id"
              class="relative flex-none w-[800px]"
            >
              <img
                :src="getImageUrl(movie.backdrop_path)"
                class="rounded-lg shadow-lg"
              />

              <div
                class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80"
              >
                <div class="flex items-start space-x-4">
                  <img
                    :src="getImageUrl(movie.poster_path)"
                    class="w-32 rounded-lg shadow-lg"
                  />
                  <div>
                    <h2 class="text-xl font-bold">{{ movie.title }}</h2>
                    <div class="flex items-center space-x-4 mt-2">
                      <div class="flex items-center">
                        <span class="text-2xl font-bold"
                          >{{ movie.vote_average }}/10</span
                        >
                        <img src="./assets/imdb.png" class="h-4 ml-2" />
                      </div>
                      <div class="text-lg">{{ movie.vote_average * 10 }}%</div>
                    </div>
                    <p class="mt-2 text-sm text-gray-300 line-clamp-2">
                      {{ movie.overview }}
                    </p>
                    <button
                      class="mt-4 px-4 py-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
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
            class="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-2 rounded-full"
          >
            <span class="sr-only">Next</span>
            <!-- Right arrow icon -->
          </button>
        </div>
      </div>
    </div>

    <!-- Discover Movies Section -->
    <!-- Discover Movies Section -->
    <section class="px-8 py-12">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold">Discover Movies</h2>
          <div class="flex space-x-4">
            <button
              v-for="tab in ['Random', 'Popular', 'Recent']"
              :key="tab"
              :class="[
                'px-4 py-2 rounded-full transition-colors',
                activeTab === tab ? 'bg-red-500' : 'hover:bg-gray-800',
              ]"
              @click="activeTab = tab"
            >
              {{ tab }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-5 gap-6">
          <div
            v-for="movie in discoveredMovies"
            :key="movie.id"
            class="group relative rounded-lg overflow-hidden"
            @click="goToDetail(movie.id)"
          >
            <img :src="getImageUrl(movie.poster_path)" class="w-full h-auto" />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <div class="absolute bottom-0 p-4">
                <h3 class="font-bold">{{ movie.title }}</h3>
                <div class="flex items-center space-x-2 text-sm">
                  <span>{{ movie.release_date?.split("-")[0] }}</span>
                  <span>•</span>
                  <span>{{ movie.vote_average }}/10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          class="mt-8 px-6 py-3 bg-red-500 rounded-full mx-auto block hover:bg-red-600 transition-colors"
          @click="goToAllMovies"
        >
          See All
        </button>
      </div>
    </section>

    <!-- Hall of Fame Section -->
    <section class="px-8 py-12 border-t border-gray-800">
      <div class="max-w-7xl mx-auto grid grid-cols-2 gap-12">
        <!-- Top Reviewers -->
        <div>
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold">Hall of Fame</h2>
            <button
              class="text-sm text-gray-400 hover:text-white transition-colors"
            >
              See All
            </button>
          </div>

          <div class="space-y-4">
            <div
              v-for="reviewer in topReviewers"
              :key="reviewer.id"
              class="flex items-center space-x-4"
            >
              <img :src="reviewer.avatar" class="w-12 h-12 rounded-full" />
              <div class="flex-1">
                <h3 class="font-bold">{{ reviewer.name }}</h3>
                <p class="text-sm text-gray-400">
                  {{ reviewer.reviews }} reviews
                </p>
              </div>
              <div
                class="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm"
              >
                {{ reviewer.year }}
              </div>
            </div>
          </div>
        </div>

        <!-- News Section -->
        <div>
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold">News</h2>
            <button
              class="text-sm text-gray-400 hover:text-white transition-colors"
            >
              See All
            </button>
          </div>

          <div class="space-y-6">
            <div v-for="article in news" :key="article.id" class="group">
              <img
                :src="article.image"
                class="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 class="font-bold group-hover:text-red-500 transition-colors">
                {{ article.title }}
              </h3>
              <div
                class="flex items-center space-x-2 text-sm text-gray-400 mt-2"
              >
                <span>{{ article.timeAgo }}</span>
                <span>•</span>
                <span>by {{ article.author }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { fetchData, getImageUrl } from "../api";

export default {
  name: "Home",
  setup() {
    // Semua logic yang sama dari App.vue
    const navItems = ["Home", "About", "News", "Discover", "Community"];
    const activeTab = ref("Random");
    const featuredMovies = ref([]);
    const discoveredMovies = ref([]);
    const currentSlide = ref(0);

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

    const prevSlide = () => {
      currentSlide.value =
        (currentSlide.value - 1 + featuredMovies.value.length) %
        featuredMovies.value.length;
    };

    const nextSlide = () => {
      currentSlide.value =
        (currentSlide.value + 1) % featuredMovies.value.length;
    };

    onMounted(() => {
      fetchMovies();
    });

    const goToDetail = (movieId) => {
      // Navigasi ke halaman detail berdasarkan ID film
      window.location.href = `/movie/${movieId}`;
    };

    const goToAllMovies = () => {
      // Navigasi ke halaman See All
      window.location.href = "/all-movies";
    };

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
    };
  },
};
</script>

<style>
.bg-navy-900 {
  background-color: #0a1229;
}
</style>
