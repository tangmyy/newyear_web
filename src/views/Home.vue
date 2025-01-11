<template>
  <div id="Home">
    <!-- 
    <KinesisContainer>
      <KinesisElement :strength="100">
        <img alt="Vue logo" src="@/assets/logo.png" class="animate__heartBeat" />
      </KinesisElement>
    </KinesisContainer> 
    -->
    <!-- 页面内容 -->
    <div class="content">
      <h1>首页内容</h1>
    </div>
  </div>
</template>

<script>
import Page from "../components/Page.vue";
import Navbar from "../components/E-Navbar.vue";

export default {
  name: "Home",
  components: {
    Page,
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
#Home {
  display: flex;
  flex-direction: column;
  align-items: stretch; /* 让子元素拉伸宽度 */
  min-height: 100vh; /* 让容器高度填满视窗 */
  background: #f7f7f7; /* 背景颜色一致 */
  margin: 0; /* 移除默认 margin */
}
.Navbar {
  position: sticky; /* 或 fixed */
  top: 0;
  z-index: 1000; /* 避免被内容遮挡 */
  width: 100%; /* 让导航栏填满宽度 */
}

// vue自带
// h3 {
//   margin: 40px 0 0;
// }
// ul {
//   list-style-type: none;
//   padding: 0;
// }
// li {
//   display: inline-block;
//   margin: 0 10px;
// }
// a {
//   color: #42b983;
// }
</style>
