import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import News from "../views/News.vue";
import Discover from "../views/Discover.vue";
import Community from "../views/Community.vue";
import AllMovies from "../views/AllMovies.vue";
import DetailMovie from "../views/DetailMovie.vue";
import SearchResults from "../views/SearchResults.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/news", name: "News", component: News },
  { path: "/discover", name: "Discover", component: Discover },
  { path: "/community", name: "Community", component: Community },
  { path: "/all-movies", name: "AllMovies", component: AllMovies },
  { path: "/movie/:id", name: "DetailMovie", component: DetailMovie },
  { path: "/search", name: "SearchResults", component: SearchResults },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
      return { top: 0 };
    }
  },
});

export default router;
