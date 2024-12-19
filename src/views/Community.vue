<template>
  <div class="min-h-screen bg-navy-900 pt-20 px-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-white mb-8">Community</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-navy-800 p-6 rounded-lg">
          <h2 class="text-2xl font-bold text-white mb-4">Top Contributors</h2>
          <div class="space-y-4">
            <div
              v-for="user in topUsers"
              :key="user.id"
              class="flex items-center space-x-4"
            >
              <img :src="user.avatar" class="w-12 h-12 rounded-full" />
              <div>
                <h3 class="font-bold text-white">{{ user.name }}</h3>
                <p class="text-sm text-gray-400">
                  {{ user.contributions }} contributions
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-navy-800 p-6 rounded-lg">
          <h2 class="text-2xl font-bold text-white mb-4">Recent Reviews</h2>
          <div class="space-y-4">
            <div
              v-for="review in recentReviews"
              :key="review.id"
              class="border-b border-gray-700 pb-4"
            >
              <div class="flex items-center space-x-2 mb-2">
                <span class="text-white font-bold">{{
                  review.movieTitle
                }}</span>
                <div class="flex text-yellow-500">
                  <span v-for="i in 5" :key="i" class="text-lg"> ★ </span>
                </div>
              </div>
              <p class="text-gray-400 text-sm">{{ review.content }}</p>
              <p class="text-gray-500 text-xs mt-2">By {{ review.author }}</p>
            </div>
          </div>
        </div>

        <div class="bg-navy-800 p-6 rounded-lg">
          <h2 class="text-2xl font-bold text-white mb-4">Movie Lists</h2>
          <div class="space-y-4">
            <div
              v-for="list in movieLists"
              :key="list.id"
              class="group cursor-pointer"
            >
              <h3
                class="font-bold text-white group-hover:text-red-500 transition-colors"
              >
                {{ list.name }}
              </h3>
              <p class="text-sm text-gray-400">{{ list.movieCount }} movies</p>
              <p class="text-xs text-gray-500">Created by {{ list.creator }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const topUsers = ref([]);
const recentReviews = ref([]);
const movieLists = ref([]);

onMounted(async () => {
  // Fetch community data
});
</script>
