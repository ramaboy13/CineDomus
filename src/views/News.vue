<template>
  <div class="min-h-screen bg-navy-900 pt-20 px-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-white mb-8">Latest News</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <article
          v-for="article in news"
          :key="article.id"
          class="bg-navy-800 rounded-lg overflow-hidden group"
        >
          <img :src="article.image" class="w-full h-48 object-cover" />
          <div class="p-6">
            <h2
              class="text-xl font-bold text-white group-hover:text-red-500 transition-colors mb-2"
            >
              {{ article.title }}
            </h2>
            <p class="text-gray-400 mb-4">{{ article.excerpt }}</p>
            <div
              class="flex items-center justify-between text-sm text-gray-500"
            >
              <span>{{ article.date }}</span>
              <span>By {{ article.author }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const news = ref([]);

onMounted(async () => {
  // Fetch news from your API
});
</script>
