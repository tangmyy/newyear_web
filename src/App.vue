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
  font-family: Avenir, Helvetica, Arial, sans-serif; // 设置全局字体系列，优先使用 Avenir，备选为 Helvetica 和 Arial
  -webkit-font-smoothing: antialiased; // 开启字体的抗锯齿效果，提升字体渲染质量（仅适用于 Webkit 内核浏览器）
  -moz-osx-font-smoothing: grayscale; // 开启字体的抗锯齿效果（仅适用于 macOS 和 Firefox 浏览器）
  text-align: center; // 设置文本的水平对齐方式为居中
  color: #2c3e50; // 设置文字颜色为深蓝灰色
  margin-top: 10px; // 在顶部添加 10 像素的外边距
  background: #f7f7f7; // 设置背景颜色为浅灰色
  min-height: 100vh; // 设置容器的最小高度为视窗高度，确保内容始终至少占满屏幕
  display: flex; // 启用 Flexbox 布局，将子元素作为弹性盒子布局
  flex-direction: column; // 设置弹性容器的主轴为垂直方向（从上到下排列子元素）
  align-items: stretch; // center 让子元素沿交叉轴（水平）方向拉伸宽度，填满父容器
}
</style>
