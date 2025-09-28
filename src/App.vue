<script>
import Footer from "./components/Footer.vue";
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
    Footer,
  },
};
</script>


<template>
  <div id="app">
    <NavBar />
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
