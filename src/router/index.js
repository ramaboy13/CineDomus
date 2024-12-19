import { createRouter, createWebHistory } from "vue-router";
import About from "../views/About.vue";
import AllMovies from "../views/AllMovies.vue";
import Community from "../views/Community.vue";
import DetailMovie from "../views/DetailMovie.vue";
import Discover from "../views/Discover.vue";
import Home from "../views/Home.vue";
import News from "../views/News.vue";
import SearchResults from "../views/SearchResults.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/news",
    name: "news",
    component: News,
  },
  {
    path: "/discover",
    name: "discover",
    component: Discover,
  },
  {
    path: "/community",
    name: "community",
    component: Community,
  },
  {
    path: "/all-movies",
    name: "AllMovies",
    component: AllMovies,
  },
  {
    path: "/movie/:id",
    name: "DetailMovie",
    component: DetailMovie,
  },
  {
    path: "/search",
    name: "SearchResults",
    component: SearchResults,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
