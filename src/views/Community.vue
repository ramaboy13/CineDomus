<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/20 to-transparent"></div>
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
    </div>
  
    <!-- Header -->
    <div class="relative pt-24 pb-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12" data-aos="fade-up">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Community <span class="text-red-500">Hub</span>
          </h1>
          <p class="text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of movie enthusiasts sharing reviews, discussions, and recommendations
          </p>
        </div>

        <!-- Community Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12" data-aos="fade-up" data-aos-delay="100">
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-700/50">
            <div class="text-2xl font-bold text-red-500 mb-1">15.2K</div>
            <div class="text-gray-400 text-sm">Active Members</div>
          </div>
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-700/50">
            <div class="text-2xl font-bold text-red-500 mb-1">45.8K</div>
            <div class="text-gray-400 text-sm">Movie Reviews</div>
          </div>
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-700/50">
            <div class="text-2xl font-bold text-red-500 mb-1">2.3K</div>
            <div class="text-gray-400 text-sm">Discussions</div>
          </div>
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-700/50">
            <div class="text-2xl font-bold text-red-500 mb-1">850</div>
            <div class="text-gray-400 text-sm">Movie Lists</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left Column - Chat & Discussions -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Live Chat Section -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50" data-aos="fade-right">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-white flex items-center">
                <div class="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                Live Chat
              </h2>
              <span class="text-sm text-gray-400">{{ onlineCount }} online</span>
            </div>
            
            <!-- Chat Messages -->
            <div class="space-y-4 h-80 overflow-y-auto custom-scrollbar mb-4">
              <div 
                v-for="message in chatMessages" 
                :key="message.id"
                class="flex items-start space-x-3 hover:bg-gray-700/30 p-3 rounded-lg transition-all"
              >
                <img :src="message.avatar" class="w-10 h-10 rounded-full flex-shrink-0" />
                <div class="flex-1 min-w-0">
                  <div class="flex items-center space-x-2 mb-1">
                    <span class="text-white font-semibold text-sm">{{ message.user }}</span>
                    <span class="text-xs text-gray-500">{{ message.time }}</span>
                    <span v-if="message.badge" class="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                      {{ message.badge }}
                    </span>
                  </div>
                  <p class="text-gray-300 text-sm">{{ message.content }}</p>
                  <div v-if="message.reactions" class="flex items-center space-x-2 mt-2">
                    <button 
                      v-for="reaction in message.reactions" 
                      :key="reaction.emoji"
                      class="flex items-center space-x-1 text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      <span>{{ reaction.emoji }}</span>
                      <span>{{ reaction.count }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Chat Input -->
            <div class="flex items-center space-x-3">
              <input 
                v-model="newMessage"
                @keyup.enter="sendMessage"
                type="text" 
                placeholder="Type your message..."
                class="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
              />
              <button 
                @click="sendMessage"
                class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Trending Discussions -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50" data-aos="fade-right" data-aos-delay="100">
            <h2 class="text-2xl font-bold text-white mb-6">🔥 Trending Discussions</h2>
            <div class="space-y-4">
              <div 
                v-for="discussion in trendingDiscussions" 
                :key="discussion.id"
                class="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transition-all cursor-pointer group"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h3 class="text-white font-semibold group-hover:text-red-500 transition-colors">
                      {{ discussion.title }}
                    </h3>
                    <p class="text-gray-400 text-sm mt-1">{{ discussion.preview }}</p>
                    <div class="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                      <span>By {{ discussion.author }}</span>
                      <span>{{ discussion.replies }} replies</span>
                      <span>{{ discussion.time }}</span>
                    </div>
                  </div>
                  <img :src="discussion.moviePoster" class="w-12 h-16 rounded object-cover ml-4" />
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Reviews Section -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50" data-aos="fade-right" data-aos-delay="200">
            <h2 class="text-2xl font-bold text-white mb-6">📝 Latest Reviews</h2>
            <div class="space-y-4">
              <div 
                v-for="review in recentReviews" 
                :key="review.id"
                class="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transition-all"
              >
                <div class="flex items-start space-x-4">
                  <img :src="review.moviePoster" class="w-16 h-20 rounded object-cover flex-shrink-0" />
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-2">
                      <h3 class="text-white font-semibold">{{ review.movieTitle }}</h3>
                      <div class="flex items-center">
                        <div class="flex text-yellow-500 mr-2">
                          <span v-for="i in review.rating" :key="i" class="text-sm">★</span>
                          <span v-for="i in (5 - review.rating)" :key="'empty-' + i" class="text-gray-600 text-sm">★</span>
                        </div>
                        <span class="text-sm text-gray-400">{{ review.rating }}/5</span>
                      </div>
                    </div>
                    <p class="text-gray-300 text-sm mb-2">{{ review.content }}</p>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-2">
                        <img :src="review.userAvatar" class="w-6 h-6 rounded-full" />
                        <span class="text-xs text-gray-500">{{ review.author }}</span>
                      </div>
                      <div class="flex items-center space-x-3 text-xs text-gray-500">
                        <button class="hover:text-red-500 transition-colors">❤️ {{ review.likes }}</button>
                        <button class="hover:text-blue-500 transition-colors">💬 {{ review.comments }}</button>
                        <span>{{ review.time }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Sidebar -->
        <div class="space-y-6">
          
          <!-- Top Contributors -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50" data-aos="fade-left">
            <h2 class="text-xl font-bold text-white mb-4 flex items-center">
              <span class="mr-2">👑</span>
              Top Contributors
            </h2>
            <div class="space-y-3">
              <div 
                v-for="(user, index) in topUsers" 
                :key="user.id"
                class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700/30 transition-all"
              >
                <div class="relative">
                  <img :src="user.avatar" class="w-12 h-12 rounded-full" />
                  <div class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {{ index + 1 }}
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-white">{{ user.name }}</h3>
                  <p class="text-sm text-gray-400">{{ user.contributions }} reviews</p>
                  <div class="flex items-center space-x-1 mt-1">
                    <span class="text-yellow-500 text-xs">★</span>
                    <span class="text-xs text-gray-400">{{ user.rating }} avg rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Popular Movie Lists -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50" data-aos="fade-left" data-aos-delay="100">
            <h2 class="text-xl font-bold text-white mb-4 flex items-center">
              <span class="mr-2">📚</span>
              Popular Lists
            </h2>
            <div class="space-y-4">
              <div 
                v-for="list in movieLists" 
                :key="list.id"
                class="group cursor-pointer p-3 rounded-lg hover:bg-gray-700/30 transition-all"
              >
                <h3 class="font-semibold text-white group-hover:text-red-500 transition-colors mb-1">
                  {{ list.name }}
                </h3>
                <p class="text-sm text-gray-400 mb-2">{{ list.description }}</p>
                <div class="flex items-center justify-between text-xs text-gray-500">
                  <span>{{ list.movieCount }} movies</span>
                  <span>{{ list.followers }} followers</span>
                </div>
                <div class="flex items-center space-x-1 mt-2">
                  <img :src="list.creatorAvatar" class="w-4 h-4 rounded-full" />
                  <span class="text-xs text-gray-500">by {{ list.creator }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Community Events -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50" data-aos="fade-left" data-aos-delay="200">
            <h2 class="text-xl font-bold text-white mb-4 flex items-center">
              <span class="mr-2">🎬</span>
              Upcoming Events
            </h2>
            <div class="space-y-4">
              <div 
                v-for="event in upcomingEvents" 
                :key="event.id"
                class="bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-lg p-4 border border-red-500/30"
              >
                <div class="flex items-center space-x-2 mb-2">
                  <span class="text-lg">{{ event.emoji }}</span>
                  <h3 class="font-semibold text-white">{{ event.title }}</h3>
                </div>
                <p class="text-sm text-gray-300 mb-3">{{ event.description }}</p>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-red-400">{{ event.date }}</span>
                  <span class="bg-red-500 text-white px-2 py-1 rounded-full">{{ event.participants }} going</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Reactive data
const newMessage = ref('')
const onlineCount = ref(1247)

// Chat messages
const chatMessages = ref([
  {
    id: 1,
    user: 'MovieBuff2024',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    content: 'Just watched Oppenheimer! The cinematography is absolutely incredible 🎬',
    time: '2 min ago',
    badge: 'VIP',
    reactions: [
      { emoji: '🔥', count: 5 },
      { emoji: '👍', count: 12 }
    ]
  },
  {
    id: 2,
    user: 'CinemaLover99',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    content: 'Anyone else excited for the new Marvel movie coming out next month?',
    time: '5 min ago',
    reactions: [
      { emoji: '🦸‍♂️', count: 8 },
      { emoji: '💯', count: 3 }
    ]
  },
  {
    id: 3,
    user: 'FilmCritic',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    content: 'The plot twists in Everything Everywhere All at Once still blow my mind! 🤯',
    time: '8 min ago',
    badge: 'Pro',
    reactions: [
      { emoji: '🤯', count: 15 },
      { emoji: '❤️', count: 7 }
    ]
  },
  {
    id: 4,
    user: 'ActionFan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    content: 'Top Gun: Maverick has some of the best aerial sequences ever filmed!',
    time: '12 min ago',
    reactions: [
      { emoji: '✈️', count: 9 },
      { emoji: '👌', count: 4 }
    ]
  },
  {
    id: 5,
    user: 'HorrorQueen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    content: 'Hereditary still gives me chills every time I think about it 😱',
    time: '15 min ago',
    reactions: [
      { emoji: '😱', count: 11 },
      { emoji: '🎭', count: 6 }
    ]
  }
])

// Trending discussions
const trendingDiscussions = ref([
  {
    id: 1,
    title: 'Is Christopher Nolan the best director of our time?',
    preview: 'Let\'s discuss his filmography and impact on modern cinema...',
    author: 'FilmTheory',
    replies: 127,
    time: '1 hour ago',
    moviePoster: 'https://images.unsplash.com/photo-1489599735734-79b4211ef945?w=100&h=150&fit=crop'
  },
  {
    id: 2,
    title: 'Marvel vs DC: The eternal debate continues',
    preview: 'With the latest releases, which universe do you think is winning?',
    author: 'ComicBookFan',
    replies: 89,
    time: '3 hours ago',
    moviePoster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=150&fit=crop'
  },
  {
    id: 3,
    title: 'Hidden gems you must watch this weekend',
    preview: 'Share your favorite underrated movies that deserve more attention...',
    author: 'IndieWatcher',
    replies: 45,
    time: '5 hours ago',
    moviePoster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=100&h=150&fit=crop'
  }
])

// Recent reviews
const recentReviews = ref([
  {
    id: 1,
    movieTitle: 'The Batman',
    moviePoster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=150&fit=crop',
    content: 'A dark and gritty take on the Dark Knight. Robert Pattinson delivers an outstanding performance.',
    author: 'DarkKnightFan',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=30&h=30&fit=crop&crop=face',
    rating: 4,
    likes: 34,
    comments: 12,
    time: '30 min ago'
  },
  {
    id: 2,
    movieTitle: 'Spider-Man: No Way Home',
    moviePoster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=150&fit=crop',
    content: 'The multiverse concept was executed perfectly. A love letter to Spider-Man fans everywhere.',
    author: 'WebSlinger',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=30&h=30&fit=crop&crop=face',
    rating: 5,
    likes: 78,
    comments: 23,
    time: '1 hour ago'
  },
  {
    id: 3,
    movieTitle: 'Dune',
    moviePoster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=100&h=150&fit=crop',
    content: 'Visually stunning masterpiece. Denis Villeneuve has created something truly epic.',
    author: 'SciFiLover',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=30&h=30&fit=crop&crop=face',
    rating: 5,
    likes: 56,
    comments: 18,
    time: '2 hours ago'
  }
])

// Top contributors
const topUsers = ref([
  {
    id: 1,
    name: 'CinephileMax',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    contributions: 245,
    rating: 4.8
  },
  {
    id: 2,
    name: 'MovieMaven',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
    contributions: 198,
    rating: 4.7
  },
  {
    id: 3,
    name: 'FilmGuru',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
    contributions: 176,
    rating: 4.9
  },
  {
    id: 4,
    name: 'CriticalThinker',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
    contributions: 134,
    rating: 4.6
  }
])

// Movie lists
const movieLists = ref([
  {
    id: 1,
    name: 'Mind-Bending Sci-Fi Movies',
    description: 'Films that will make you question reality',
    movieCount: 25,
    followers: 1234,
    creator: 'SciFiMaster',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=20&h=20&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Best Horror Films of All Time',
    description: 'The scariest movies ever made',
    movieCount: 50,
    followers: 2156,
    creator: 'HorrorExpert',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=20&h=20&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Hidden Netflix Gems',
    description: 'Underrated movies you might have missed',
    movieCount: 32,
    followers: 987,
    creator: 'StreamingPro',
    creatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=20&h=20&fit=crop&crop=face'
  }
])

// Upcoming events
const upcomingEvents = ref([
  {
    id: 1,
    title: 'Movie Night: Inception',
    description: 'Community watch party with live chat',
    date: 'Tonight 8 PM',
    participants: 156,
    emoji: '🍿'
  },
  {
    id: 2,
    title: 'Director Spotlight: Denis Villeneuve',
    description: 'Discussion about his masterpieces',
    date: 'Tomorrow 7 PM',
    participants: 89,
    emoji: '🎬'
  },
  {
    id: 3,
    title: 'Horror Movie Marathon',
    description: '24-hour horror fest this weekend',
    date: 'This Saturday',
    participants: 234,
    emoji: '👻'
  }
])

// Methods
const sendMessage = () => {
  if (newMessage.value.trim()) {
    chatMessages.value.unshift({
      id: Date.now(),
      user: 'You',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
      content: newMessage.value,
      time: 'now',
      reactions: []
    })
    newMessage.value = ''
  }
}

onMounted(() => {
  AOS.init({
    duration: 800,
    offset: 100,
    easing: 'ease-in-out',
    once: true
  })
})
</script>

<style scoped>
/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #374151;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #ef4444;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #dc2626;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}

/* Responsive */
@media (max-width: 768px) {
  .h-80 {
    height: 16rem;
  }
}
</style>