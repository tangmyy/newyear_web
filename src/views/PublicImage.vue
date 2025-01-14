<template>
  <div class="container">
    <div style="margin-top: 15px">
      <el-input placeholder="搜索关键字" v-model="keyword" v-enter="searchImages" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="searchImages"></el-button>
      </el-input>
    </div>

    <div class="tags-container">
      <el-tag v-for="tag in tags" :key="tag" @click="searchByTag($event, tag)" class="tag-item">{{ tag }}</el-tag>
    </div>

    <div v-if="images.length === 0 && !isLoading" class="no-results">没找到</div>

    <div v-if="isLoading">加载中...</div>

    <div v-if="images.length > 0" class="Waterfall wf-content">
      <div class="wf-item" v-for="(image, index) in images" :key="index">
        <div
          class="image-container"
          @mouseover="showInfo(index)"
          @mouseleave="hideInfo(index)"
          @click="openImageModal(image.imageurl)"
        >
          <img alt="图片跑丢啦..." :src="image.imageurl" @load="imageonload(index)" />

          <div class="info-box" :class="{ 'show-info': image.showInfo }">
            <p>{{ image.description }}</p>
            <div class="tags">
              <el-tag
                v-for="tag in image.tags.split(';')"
                :key="tag"
                @click="searchByTag($event, tag)"
                class="tag-item"
                >{{ tag }}</el-tag
              >
            </div>
          </div>
        </div>

        <br />
        <br />
        <div class="block">
          <span class="demonstration">评分</span>
          <el-rate v-model="image.value" :colors="colors" @change="rateImage(image)"></el-rate>
        </div>
        <el-button size="small" icon="el-icon-warning-outline" class="" type="danger" round>举报</el-button>
        <el-button size="mini" round
          ><i class="layui-icon layui-icon-praise" style="font-size: 15px; color: #1e9fff"></i
        ></el-button>
      </div>
    </div>

    <el-dialog :visible.sync="imageModalVisible" width="50%" :show-close="false">
      <img :src="currentImageUrl" alt="Image" class="full-image" />
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { PuBu } from "@/components/JS/PuBu";

export default {
  name: "PublicImage",
  data() {
    return {
      keyword: "",
      images: [],
      tags: [],
      isLoading: false,
      imageModalVisible: false,
      currentImageUrl: "",

      //
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    };
  },
  computed: {
    ...mapState(["HTTP", "PublicImages"]),
  },
  created() {
    this.fetchPublicImages().then(() => {
      this.fetchImagesAndRatings();
    });
    // this.fetchTags()     是否需要 向/images/tags 请求获取标签 有待考证
  },
  directives: {
    enter: {
      bind(el, binding) {
        el.addEventListener("keyup", (event) => {
          if (event.keyCode === 13) {
            binding.value();
          }
        });
      },
    },
  },
  methods: {
    ...mapActions(["fetchPublicImages", "fetchImageRatings"]),
    ...mapMutations({
      setPublicImages: "setPublicImages",
      setImageRatings: "setImageRatings",
    }),

    imageonload(index) {
      const img = new Image();
      img.src = this.images[index].imageurl; // 使用当前图片的 URL
      img.onload = () => {
        console.log(`图片宽度: ${img.naturalWidth}px`);
        console.log(`图片高度: ${img.naturalHeight}px`);
        console.log("当前图片的完整信息:", this.images[index]);
        // 可以在这里对图片宽高进行处理，例如记录到某个数据结构中
      };

      new PuBu({
        el: ".wf-content",
        column: 4, // 列数
        gap: 20, // 间距
      });
    },

    fetchImagesAndRatings() {
      // 首先加载图片
      this.fetchPublicImages()
        .then(() => {
          // 然后加载评分
          return this.fetchImageRatings();
        })
        .then(() => {
          // 整合后更新组件数据
          this.updateImageUrls();
        })
        .catch((error) => {
          console.error("Error fetching images and ratings:", error);
        });
    },
    updateImageUrls() {
      this.images = this.PublicImages.map((image) => ({
        ...image,
        // imageurl: this.HTTP + image.url,
        imageurl: image.filePath,
        showInfo: false, // 新增属性用于控制信息框的显示
        value: 0, // 初始化评分
      }));
    },
    rateImage(image) {
      // 确保传递了 imageId 和评分值 value
      if (!image.imageId || !image.value) {
        this.$message.error("图片ID或评分值不能为空！");
        return;
      }
      this.$http
        .post(
          "/likeimages/value",
          {
            imageId: image.imageId, // 图片的唯一 ID
            value: image.value, // 用户评分的值
          },
          {
            withCredentials: true, // 确保发送 Cookie，用于会话验证
          },
        )
        .then(() => {
          this.$message.success("评分提交成功！");
        })
        .catch((error) => {
          console.error("评分提交失败：", error);
          if (error.response && error.response.status === 401) {
            this.$message.error("用户未登录，请先登录后评分！");
          } else {
            this.$message.error("评分提交失败，请稍后重试！");
          }
        });
    },

    showInfo(index) {
      this.$set(this.images[index], "showInfo", true);
    },
    hideInfo(index) {
      this.$set(this.images[index], "showInfo", false);
    },

    // 点击放大
    openImageModal(imageUrl) {
      this.currentImageUrl = imageUrl;
      this.imageModalVisible = true;
    },

    // 将标签作为 keyword 模糊搜索
    searchByTag(event, tag) {
      event.stopPropagation(); // 阻止事件冒泡
      this.keyword = tag;
      this.searchImages();
    },

    async searchImages() {
      try {
        this.isLoading = true;
        const response = await this.$http.get("/images/search", {
          params: { keyword: this.keyword },
          withCredentials: true,
        });
        console.log("搜索结果:", response.data);
        this.images = response.data.map((image) => ({
          ...image,
          // imageurl: this.$store.state.HTTP + image.url,
          imageurl: image.filePath,
          showInfo: false, // 新增属性用于控制信息框的显示
        }));
        this.isLoading = false;
        if (this.images.length === 0) {
          this.$nextTick(() => {
            const noResults = document.querySelector(".no-results");
            noResults.classList.add("bounce-in");
          });
        }
      } catch (error) {
        console.error("搜索失败:", error);
        alert("暂未登录!搜索失败!");
        this.isLoading = false;
      }
    },

    // 向/images/tags 请求获取标签
    async fetchTags() {
      try {
        const response = await this.$http.get("/images/tags");
        this.tags = Array.isArray(response.data) ? response.data : [];
      } catch (error) {
        console.error("获取标签失败:", error);
      }
    },
  },
};
</script>

<style scoped>
/* 瀑布流容器样式，设置相对定位 */
.Waterfall {
  position: relative;
}
/* 瀑布流项样式，设置绝对定位、边框和阴影 */
.wf-item {
  position: absolute;
  border: 5px solid white;
  box-shadow: -3px 2px 5px rgba(0, 0, 0, 0.5);
}
/* 瀑布流项中的图片样式，设置图片的宽度和高度为100% */
.wf-item img {
  width: 100%;
  height: 100%;
  /* width: 200px;
  height: 300px; */
  object-fit: contain; /* 裁剪图片以填充框 */
  border-radius: 8px; /* 圆角，可选 */
}

/* 容器样式，设置宽度为960px，并水平居中 */
.container {
  width: 960px;
  height: 960px;
  margin: 0 auto;
}
/* 图片容器样式，设置相对定位 */
.image-container {
  position: relative;
}

/* 信息框样式，设置绝对定位、大小、背景、阴影、初始位置、透明度和过渡效果 */
.info-box {
  position: absolute;
  top: 0;
  left: -100%;
  width: 200px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transform: translateX(-10px);
  opacity: 0;
  transition:
    transform 0.2s,
    opacity 1s;
}

/* 标签容器样式，设置上下外边距 */
.tags-container {
  margin: 10px 0;
}
/* 标签项样式，设置鼠标悬停时的样式和右侧外边距 */
.tag-item {
  cursor: pointer;
  margin-right: 5px;
}
/* 显示信息框样式，设置信息框的最终位置和透明度 */
.show-info {
  transform: translateX(0);
  opacity: 1;
}
/* 没有结果时的样式，设置字体大小、文本对齐、顶部外边距和动画效果 */
.no-results {
  font-size: 1.5em;
  text-align: center;
  margin-top: 20px;
  animation: bounce-in 1s ease-out;
}
/* 没有结果时的样式，弹跳进入动画关键帧，设置从顶部偏移和透明到位置正常和不透明 */
@keyframes bounce-in {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 模态框中的图片样式，设置图片宽度为50%，高度自适应 */
.full-image {
  width: 60%;
  height: 60%;
}

/* El-Select 组件中的输入框样式，设置宽度为130px */
.el-select .el-input {
  width: 130px;
}
/* 带选择框的输入框样式，设置输入组前置元素的背景色 */
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
