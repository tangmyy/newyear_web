<template>
  <!-- 首页导航栏 -->
  <b-navbar>
    <template #brand>
      <!-- src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png" -->
      <b-navbar-item tag="router-link" :to="{ path: '/PublicImage' }">
        <img src="@/assets/MirrorLogo.png" alt="图片被臭冥冥吃了" />
      </b-navbar-item>
    </template>

    <template #start>
      <router-link class="new" to="/Home">
        <b-navbar-item> 首页 </b-navbar-item>
      </router-link>

      <router-link class="new" to="/PublicImage">
        <b-navbar-item> 公共相册 </b-navbar-item>
      </router-link>

      <router-link class="new" to="/PrivateImage">
        <b-navbar-item> 个人相册 </b-navbar-item>
      </router-link>

      <router-link class="new" to="/Collect">
        <b-navbar-item> 收藏夹 </b-navbar-item>
      </router-link>

      <router-link class="new" to="/Wishlist">
        <b-navbar-item> 愿望单 </b-navbar-item>
      </router-link>

      <b-navbar-dropdown label="其他">
        <router-link class="new" to="/BigModel">
          <b-navbar-item> 星火认知大模型 </b-navbar-item>
        </router-link>
      </b-navbar-dropdown>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-light" v-if="!isLoggedIn">
            <router-link to="/Login">登录</router-link>
          </a>

          <router-link to="/Register" v-if="!isLoggedIn">
            <a class="button is-primary">
              <strong>注册</strong>
            </a>
          </router-link>

          <div v-if="isLoggedIn" class="user-section">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <router-link to="/UserCenter">
              <el-button type="success" plain> {{ UserID }}：欢迎您！👏 </el-button>
            </router-link>
            <el-button type="warning" @click="Logout" plain>退出登录</el-button>
          </div>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Navbar",

  // 定义组件的方法
  methods: {
    ...mapMutations(["login", "logout"]),

    Logout() {
      this.logout(); // 调用 Vuex 的 logout
      // 删除所有 cookies
      document.cookie.split(";").forEach((cookie) => {
        document.cookie = cookie
          .replace(/^ +/, "") // 匹配字符串开头的一个或多个空格,并将其替换为空字符串,确保后续操作的正确性。
          .replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
        // 匹配等号及其后面的所有字符，并将其替换为 =;expires= + UTC 时间 + ;path=/。
      });

      // 跳转到登录页
      this.$router.push({ path: "/Login" });
    },
  },

  // 定义计算属性(具有缓存性)
  computed: {
    ...mapState(["isLoggedIn", "UserID"]),
  },
};
</script>

<style lang="scss" scoped>
.new {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中，可选 */
}
.user-section {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中，可选 */

  .el-avatar {
    margin-right: 10px; /* 设置头像和按钮之间的间距 */
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中，可选 */
  }

  .el-button {
    margin: 0 8px; /* 为按钮设置左右间距 */
  }
}
</style>
