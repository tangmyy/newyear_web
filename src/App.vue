<template>
  <div>
    <Navbar></Navbar>

    <!-- 中间内容 -->
    <template>
      <div id="app">
        <router-view></router-view>
      </div>
    </template>
  </div>
</template>

<script>
import Home from "./views/Home.vue";
import Navbar from "./components/E-Navbar.vue";

export default {
  name: "App",
  components: {
    Home,
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
  background: #f7f7f7;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
