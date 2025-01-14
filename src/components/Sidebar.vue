<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <b-sidebar
        position="static"
        :mobile="mobile"
        :expand-on-hover="expandOnHover"
        :reduce="reduce"
        :delay="expandWithDelay ? 500 : null"
        type="is-light"
        open
      >
        <div class="p-1">
          <div class="block">
            <img src="@/assets/logo.png" alt="Mirro的Logo" />
          </div>
          <b-menu class="is-custom-mobile">
            <!-- 默认选中active expanded -->
            <b-menu-list label="菜单">
              <b-menu-item active expanded icon="information-outline" label="信息"></b-menu-item>

              <b-menu-item icon="account" label="我的账户">
                <b-menu-item icon="account-box" label="账户数据"></b-menu-item>
                <b-menu-item icon="home-account" label="地址"></b-menu-item>
              </b-menu-item>

              <b-menu-item icon="settings" label="钱包">
                <b-menu-item icon="account" label="全部订单"></b-menu-item>
                <b-menu-item icon="cellphone-link" label="余额"></b-menu-item>
                <b-menu-item icon="cash-multiple" label="充值" disabled></b-menu-item>
              </b-menu-item>
            </b-menu-list>

            <b-menu-list>
              <b-menu-item @click="activeMenu = 'UPimage'" label="上传图片" icon="link"></b-menu-item>
            </b-menu-list>

            <b-menu-list label="操作">
              <b-menu-item @click="activeMenu = 'Complaint'" label="投诉" icon="link"></b-menu-item>
              <b-menu-item icon="logout" label="用户"></b-menu-item>
              <b-menu-item icon="logout" label=" "></b-menu-item>
              <b-menu-item icon="logout" label=" "></b-menu-item>
              <b-menu-item icon="logout" label=" "></b-menu-item>
              <b-menu-item icon="logout" label=" "></b-menu-item>
              <b-menu-item icon="logout" label=" "></b-menu-item>
              <b-menu-item icon="logout" label=" "></b-menu-item>
              <b-menu-item icon="logout" label=" "></b-menu-item>
              <b-menu-item icon="logout" label=" "></b-menu-item>
            </b-menu-list>
          </b-menu>
        </div>
      </b-sidebar>
      <!-- 动态内容展示区域 -->
      <div class="content-area">
        <UPimage v-if="activeMenu === 'UPimage'" />
        <Info v-if="activeMenu === 'Info'" />
        <Complaint v-if="activeMenu === 'Complaint'" />
      </div>
    </section>
  </div>
</template>

<script>
import UPimage from "./Image/UPimage.vue";
import Complaint from "./Complaint.vue";
// import Info from "./Info.vue";

export default {
  name: "UserCenter",
  components: {
    UPimage,
    // Info,
    Complaint,
  },

  data() {
    return {
      // 侧边栏参数
      reduce: false, // 自动缩放
      mobile: "reduce", // 自定义移动端布局:fullwidth, reduce, hide
      expandOnHover: true, // 悬停展开
      expandWithDelay: false, // 延迟悬停展开
      //
      activeMenu: "", // 默认为空，或者设置为默认展示的内容
    };
  },
};
</script>

<style lang="scss">
// 内容展示区域样式
.sidebar-layout {
  display: flex; // 使用 Flex 布局
  flex-direction: row; // 左右排列
  min-height: 100vh; // 确保布局区域占满屏幕高度
}

.content-area {
  flex: 1; // 让内容区域占据剩余空间
  padding: 20px; // 添加内边距
  background: #ffffff; // 设置背景色
  // border: 10px solid #ff0000; // （可选）用于调试的红色边框
}

// 侧边栏样式
.p-1 {
  padding: 1em; // 添加 1em 的内边距
}
.sidebar-page {
  display: flex; // 启用 Flexbox 布局，方便子元素的排列
  flex-direction: column; // 设置主轴方向为垂直方向（从上到下排列子元素）
  width: 100%; // 设置容器的宽度占据父容器的 100%
  // min-height: 100%; // 设置容器的最小高度为父容器的高度
  min-height: 100vh; // （可选）将最小高度设置为视窗高度，保证填满屏幕

  .sidebar-layout {
    display: flex; // 启用 Flexbox 布局，用于子元素的横向排列
    flex-direction: row; // 设置主轴方向为水平方向（从左到右排列子元素）
    min-height: 100%; // 设置容器的最小高度为父容器的高度
    // min-height: 100vh; // （可选）将最小高度设置为视窗高度，保证填满屏幕
  }
}
@media screen and (max-width: 1023px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini-mobile {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover):not(.is-mini-delayed) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover):not(.is-mini-delayed) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
.is-mini-expand {
  .menu-list a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
