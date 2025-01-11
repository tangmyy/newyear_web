<template>
  <div>
    <!-- 顶部导航栏 -->
    <b-navbar type="is-primary">
      <b-navbar-brand>
        <b-navbar-item>
          <h1 class="title has-text-white">我的收藏</h1>
        </b-navbar-item>
      </b-navbar-brand>
    </b-navbar>

    <!-- 收藏内容 -->
    <section class="section">
      <div class="container">
        <!-- 空收藏提示 -->
        <div v-if="wishlist.length === 0" class="notification is-info has-text-centered">
          <p>还没有收藏任何内容，快去添加吧！</p>
        </div>

        <!-- 表格 -->
        <div v-else>
          <b-table
            :data="paginatedWishlist"
            :hoverable="true"
            :striped="true"
            :bordered="true"
            class="is-fullwidth"
          >
            <!-- 收藏编号 -->
            <b-table-column field="wishlistId" label="收藏编号" v-slot="props">
              {{ props.row.wishlistId }}
            </b-table-column>

            <!-- 图片预览 -->
            <b-table-column field="thumbnail" label="图片预览" v-slot="props">
              <div class="image-container">
                <figure class="image is-64x64">
                  <img
                    :src="props.row.thumbnail"
                    alt="图片预览"
                    @click="viewImageDetails(props.row.imageId)"
                    style="cursor: pointer"
                  />
                </figure>
                <div class="image-preview" :style="{ backgroundImage: `url(${props.row.thumbnail})` }"></div>
              </div>
            </b-table-column>

            <!-- 描述 -->
            <b-table-column field="description" label="描述" v-slot="props">
              {{ props.row.description }}
            </b-table-column>

            <!-- 收藏时间 -->
            <b-table-column field="addTime" label="收藏时间" v-slot="props">
              {{ props.row.addTime }}
            </b-table-column>

            <!-- 操作 -->
            <b-table-column label="操作" v-slot="props">
              <button
                class="button is-danger is-small"
                @click="confirmRemoveItem(props.row.wishlistId)"
              >
                取消收藏
              </button>
            </b-table-column>
          </b-table>

          <!-- 分页控件 -->
          <div class="pagination-wrapper">
            <b-pagination
              :total="wishlist.length"
              :current.sync="currentPage"
              :per-page="perPage"
              :simple="true"
              aria-next-label="下一页"
              aria-previous-label="上一页"
              class="mt-4"
            >
              <template #previous="props">
                <button class="pagination-previous" :disabled="props.disabled">上一页</button>
              </template>
              <template #next="props">
                <button class="pagination-next" :disabled="props.disabled">下一页</button>
              </template>
            </b-pagination>
          </div>

          <!-- 统计信息 -->
          <div class="box">
            <div class="columns is-vcentered">
              <div class="column">
                收藏总数：<span>{{ totalItems }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 返回首页按钮 -->
    <footer class="footer">
      <div class="content has-text-centered">
        <button class="button is-light" @click="goToHome">返回首页</button>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "WishlistPage",
  data() {
    return {
      wishlist: [], // 全部愿望单数据
      currentPage: 1, // 当前页码
      perPage: 5, // 每页显示的数据条数
    };
  },
  computed: {
    // 总数统计
    totalItems() {
      return this.wishlist.length;
    },
    // 总价统计
    totalPrice() {
      return this.wishlist.reduce((sum, item) => sum + item.price, 0);
    },
    // 当前页显示的数据
    paginatedWishlist() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.wishlist.slice(start, end);
    },
  },
  mounted() {
    this.fetchWishlist(); // 这里是否正确触发
  },
  methods: {
    // 模拟从后端 API 获取愿望单数据
    fetchWishlist() {
      this.wishlist = [
        {
          wishlistId: 1,
          imageId: 101,
          thumbnail: "https://g0.gph.netease.com/ngsocial/community/wjdlglr/res/blueprint/801.png?gameid=g86",
          description: "星系之间的距离，取决于他们在拉格朗日系统中的位置",
          addTime: "2025-01-11 14:30",
          price: 19.99,
        },
        {
          wishlistId: 2,
          imageId: 102,
          thumbnail: "https://g0.gph.netease.com/ngsocial/community/wjdlglr/res/blueprint/802.png?gameid=g86",
          description: "战略纵深的本质是用空间换时间，空间越大，交换的价值越高",
          addTime: "2025-01-10 10:00",
          price: 29.99,
        },
        {
          wishlistId: 3,
          imageId: 103,
          thumbnail: "https://g0.gph.netease.com/ngsocial/community/wjdlglr/res/blueprint/803.png?gameid=g86",
          description: "当危险来临时，它将制造出整个银河系中最强大的武装力量",
          addTime: "2025-01-09 16:00",
          price: 15.99,
        },
      ];
    },
    // 查看图片详情
    viewImageDetails(imageId) {
      alert(`跳转到图片详情页面，图片 ID: ${imageId}`);
      this.$router.push(`/image/${imageId}`);
    },
    // 确认并移除愿望单中的项目
    confirmRemoveItem(wishlistId) {
      if (confirm(`确定要移除愿望单编号为 ${wishlistId} 的项目吗？`)) {
        this.removeItem(wishlistId);
      }
    },
    // 从愿望单中移除项
    removeItem(wishlistId) {
      this.wishlist = this.wishlist.filter((item) => item.wishlistId !== wishlistId);
      alert(`已移除愿望单编号为 ${wishlistId} 的项目`);
    },
    // 返回首页
    goToHome() {
      this.$router.push("/");
    },
    // 模拟购买功能
    purchaseWishlist() {
      alert(`成功购买 ${this.totalItems} 件商品，总价为 ¥${this.totalPrice.toFixed(2)}`);
    },
  },
};
</script>

<style>
/* 导航栏样式 */
.navbar.is-primary {
  background-color: #6b4fbb !important;
  padding: 1rem !important;
  margin-bottom: 1rem !important;
}

/* 表格样式 */
.b-table {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.b-table th {
  background: #f8fafc !important;
  font-weight: 600;
  color: #6b4fbb;
}

/* 按钮样式 */
.button.is-danger.is-small {
  border-radius: 4px;
  transition: all 0.2s ease;
}

.button.is-danger.is-small:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 统计框样式 */
.box {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.box span {
  color: #6366f1;
  font-weight: 600;
}

/* 分页控件样式 */
.pagination-wrapper {
  margin: 1rem 0;
  display: flex;
  justify-content: center;
}

/* 图片容器和预览样式 */
.image-container {
  position: relative;
  width: 64px;
  height: 64px;
}

.image.is-64x64 {
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.image.is-64x64 img {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
  border-radius: 8px;
}

/* 预览窗口样式 */
.image-preview {
  display: none;
  position: absolute;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 200px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 10px;
}

.image-container:hover .image-preview {
  display: block;
}

/* 按钮样式 */
.button.is-primary {
  background-color: #6b4fbb;
  transition: all 0.3s ease;
}

.button.is-primary:hover {
  background-color: #563d9f;
}

/* 分页样式 */
.pagination-link.is-current {
  background-color: #6b4fbb;
  border-color: #6b4fbb;
  color: #fff;
}
</style>