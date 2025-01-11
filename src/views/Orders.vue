<template>
  <div>
    <!-- 顶部导航栏 -->
    <b-navbar type="is-primary">
      <b-navbar-brand>
        <b-navbar-item>
          <h1 class="title has-text-white">订单</h1>
        </b-navbar-item>
      </b-navbar-brand>
    </b-navbar>

    <!-- 订单内容 -->
    <section class="section">
      <div class="container">
        <!-- 空订单提示 -->
        <div v-if="orders.length === 0" class="notification is-info has-text-centered">
          <p>暂无订单记录，快去选购心仪的图片吧！</p>
        </div>

        <!-- 表格 -->
        <div v-else>
          <!-- 全选功能 -->
          <div class="select-all mb-3">
            <b-checkbox v-model="isAllSelected" @input="toggleSelectAll">
              全选
            </b-checkbox>
          </div>

          <b-table
            :data="paginatedOrders"
            :hoverable="true"
            :striped="true"
            :bordered="true"
            class="is-fullwidth"
          >
            <!-- 选择框 -->
            <b-table-column field="selected" label="选择" v-slot="props" width="40" centered>
              <b-checkbox v-model="selectedItems" :native-value="props.row.wishlistId"></b-checkbox>
            </b-table-column>

            <!-- 图片预览 -->
            <b-table-column field="thumbnail" label="图片预览" v-slot="props" centered>
              <div class="image-container">
                <figure class="image is-64x64">
                  <img
                    :src="props.row.thumbnail"
                    alt="图片预览"
                    @click="viewDetails(props.row.imageId)"
                    style="cursor: pointer"
                  />
                </figure>
                <div class="image-preview" :style="{ backgroundImage: `url(${props.row.thumbnail})` }"></div>
              </div>
            </b-table-column>

            <!-- 图片描述 -->
            <b-table-column field="description" label="图片描述" v-slot="props">
              {{ props.row.description }}
            </b-table-column>

            <!-- 单价 -->
            <b-table-column field="price" label="单价" v-slot="props" centered>
              ¥{{ props.row.price.toFixed(2) }}
            </b-table-column>

            <!-- 小计 -->
            <b-table-column field="subtotal" label="小计" v-slot="props" centered>
              ¥{{ props.row.price.toFixed(2) }}
            </b-table-column>

            <!-- 操作 -->
            <b-table-column label="操作" v-slot="props" centered>
              <button
                class="button is-danger is-small"
                @click="removeItem(props.row.wishlistId)"
              >
                删除
              </button>
            </b-table-column>
          </b-table>

          <!-- 底部结算栏 -->
          <div class="cart-footer box">
            <div class="columns is-vcentered">
              <div class="column">
                已选择 <span class="has-text-primary">{{ selectedItems.length }}</span> 张图片
              </div>
              <div class="column">
                总计：<span class="has-text-danger price-total">¥{{ getSelectedTotal().toFixed(2) }}</span>
              </div>
              <div class="column has-text-right">
                <button 
                  class="button is-primary" 
                  @click="checkout"
                  :disabled="selectedItems.length === 0"
                >
                  支付
                </button>
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
  name: "OrdersPage",
  data() {
    return {
      orders: [], // 订单数据
      currentPage: 1,
      perPage: 5,
      selectedItems: [], // 选中的订单ID数组
      isAllSelected: false,
    };
  },
  computed: {
    // 订单总数
    totalOrders() {
      return this.orders.length;
    },
    // 总金额统计
    totalAmount() {
      return this.orders.reduce((sum, order) => sum + order.total_amount, 0);
    },
    // 当前页显示的数据
    paginatedOrders() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.orders.slice(start, end);
    },
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    // 获取订单数据
    fetchOrders() {
      // 模拟数据
      this.orders = [
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
        }
      ];
    },
    // 格式化时间
    formatTime(timestamp) {
      return timestamp;  // 实际项目中可以使用 moment.js 等库来格式化
    },
    // 移除商品
    removeItem(orderId) {
      if (confirm('确定要从购物车中移除这件商品吗？')) {
        this.orders = this.orders.filter(item => item.wishlistId !== orderId);
        this.selectedItems = this.selectedItems.filter(id => id !== orderId);
      }
    },
    // 全选/取消全选
    toggleSelectAll(value) {
      if (value) {
        this.selectedItems = this.orders.map(item => item.wishlistId);
      } else {
        this.selectedItems = [];
      }
    },
    // 计算选中订单的总价
    getSelectedTotal() {
      return this.orders
        .filter(item => this.selectedItems.includes(item.wishlistId))
        .reduce((sum, item) => sum + item.price, 0);
    },
    // 结算
    checkout() {
      if (this.selectedItems.length === 0) {
        alert('请先选择订单');
        return;
      }
      alert(`结算金额：¥${this.getSelectedTotal().toFixed(2)}`);
    },
    // 查看订单详情
    viewDetails(orderId) {
      this.$router.push(`/image/${orderId}`);
    },
    // 返回首页
    goToHome() {
      this.$router.push("/");
    },
  },
  watch: {
    // 监听选中项变化，更新全选状态
    selectedItems(newVal) {
      this.isAllSelected = newVal.length === this.orders.length;
    }
  }
};
</script>

<style>
/* 图片容器和预览样式 */
.image-container {
  position: relative;
  display: inline-block;
}

/* 修改图片容器样式 */
.image.is-64x64 {
  width: 64px !important;
  height: 64px !important;
  display: block !important;
  border-radius: 8px;
  overflow: hidden;
}

/* 修改图片样式 */
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

/* 预览窗口在表格底部行时的位置调整 */
tr:last-child .image-preview {
  top: auto;
  bottom: -120px;
}

/* 预览窗口在表格右侧时的位置调整 */
tr td:last-child .image-preview {
  left: auto;
  right: 0;
  transform: none;
}

.image-container:hover .image-preview {
  display: block;
}

/* 底部结算栏样式 */
.cart-footer {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 8px;
  border-top: 2px solid #f5f5f5;
  padding: 1rem;
  border-color: rgba(107, 79, 187, 0.1);
}

.price-total {
  font-size: 1.25rem;
  font-weight: 600;
  color: #6b4fbb;
}

/* 表格样式优化 */
.b-table {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

/* 选择框样式 */
.select-all {
  padding: 0.5rem 0;
}

/* 按钮样式 */
.button.is-primary {
  transition: all 0.2s ease;
  background-color: #6b4fbb;
}

.button.is-primary:hover:not([disabled]) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

/* 导航栏样式 */
.navbar.is-primary {
  background-color: #6b4fbb !important;
  padding: 1rem !important;
  margin-bottom: 1rem !important;
}

/* 按钮样式 */
.button.is-primary {
  background-color: #6b4fbb;
  transition: all 0.3s ease;
}

.button.is-primary:hover {
  background-color: #563d9f;
}

/* 表格样式 */
.b-table th {
  background: #f8fafc !important;
  font-weight: 600;
  color: #6b4fbb;
}

/* 价格和总计样式 */
.price-total {
  color: #6b4fbb;
  font-weight: bold;
  font-size: 1.2em;
}

/* 购物车底部样式 */
.cart-footer {
  border-top: 2px solid #f5f5f5;
  padding: 1rem;
  border-color: rgba(107, 79, 187, 0.1);
}

/* 选中项文本样式 */
.has-text-primary {
  color: #6b4fbb !important;
}
</style>
