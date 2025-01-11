<template>
  <div class="user-center">
    <!-- 顶部导航栏 -->
    <b-navbar type="is-primary">
      <b-navbar-brand>
        <b-navbar-item>
          <h1 class="title has-text-white">个人中心</h1>
        </b-navbar-item>
      </b-navbar-brand>
    </b-navbar>

    <!-- 主要内容区域 -->
    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-9">
            <div class="box content-box">
              <h3 class="title is-4">个人信息</h3>
              <div class="user-info">
                <div class="field">
                  <label class="label">用户名</label>
                  <div class="control">
                    <input class="input" type="text" v-model="userInfo.username" readonly />
                  </div>
                </div>
                <div class="field">
                  <label class="label">电话</label>
                  <div class="control">
                    <input class="input" type="text" v-model="userInfo.phone" readonly />
                  </div>
                </div>
                <div class="field">
                  <label class="label">邮箱</label>
                  <div class="control">
                    <input class="input" type="email" v-model="userInfo.email" readonly />
                  </div>
                </div>
                <div class="field">
                  <label class="label">收藏图片数</label>
                  <div class="control">
                    <input class="input" type="text" :value="userInfo.favoriteCount + ' 张'" readonly />
                  </div>
                </div>
                <div class="field mt-5">
                  <div class="control">
                    <button class="button is-primary" @click="editInfo">编辑信息</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCenter",
  data() {
    return {
      userInfo: {
        username: "JohnDoe",
        phone: "13800138000",
        email: "john@example.com",
        favoriteCount: 12,
      },
    };
  },
  methods: {
    editInfo() {
      this.$buefy.toast.open({
        message: "编辑功能开发中...",
        type: "is-info",
      });
    },
  },
};
</script>

<style scoped>
.user-center {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.navbar.is-primary {
  background-color: #a69dbe !important;
  margin-bottom: 1rem;
}

.title.has-text-white {
  font-size: 1.5rem;
}

/* 侧边栏样式 */
.menu {
  background-color: white;
  padding: 1.5rem;
  border-radius: 6px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1);
}

.menu-label {
  color: #7a7a7a;
  font-size: 0.9em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.menu-list a {
  color: #4a4a4a;
  font-size: 1rem;
  padding: 0.8em 1em;
  border-radius: 4px;
}

.menu-list a:hover {
  background-color: #f5f5f5;
  color: #a69dbe;
}

.menu-list a.is-active {
  background-color: #a69dbe;
  color: white;
}

/* 内容区样式 */
.content-box {
  padding: 2rem;
  height: 100%;
  min-height: 500px;
}

.user-info {
  max-width: 500px;
}

.field {
  margin-bottom: 1.5rem;
}

.input[readonly] {
  background-color: #f8f9fa;
}

.button.is-primary {
  background-color: #a69dbe;
  transition: all 0.3s ease;
}

.button.is-primary:hover {
  background-color: #8b7ba4;
}

/* 响应式调整 */
@media screen and (max-width: 768px) {
  .columns {
    margin: 0;
  }

  .column.is-3,
  .column.is-9 {
    padding: 0.75rem;
  }
}
</style>
