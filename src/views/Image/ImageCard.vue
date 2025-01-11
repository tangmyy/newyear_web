<template>
  <div class="step-content">
    <section>
      <div class="buttons">
        <b-button label="点击预览（效果图）" type="is-primary" size="is-medium" @click="isCardModalActive = true" />
      </div>

      <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="imageSrc" alt="哎呀，图片走丢啦..." />
            </figure>
          </div>

          <div class="card-content">
            <div class="media">
              <!-- <div class="media-left">
                <figure class="image is-48x48">
                  <img src="/static/img/placeholder-1280x960.png" alt="头像">
                </figure>
              </div> -->
              <div class="media-content">
                <p class="title is-4">{{ UserID }}</p>
                <p class="subtitle is-6">{{ UserID }}</p>
              </div>
            </div>

            <div class="content">
              <!-- 这是作品描述这是作品描述这是作品描述这是作品描述这是作品描述这是作品描述。 -->
              {{ description }}
              <a>@话题</a>. <a> #{{ texts }}</a>
              <br />
              <small>11:09 PM - 1 Jan 2016（上传时间）</small>
            </div>
          </div>
        </div>
      </b-modal>
    </section>
    <br />
    <b-field class="file">
      <a class="button is-primary is-fullwidth" @click="uploadImage">
        <b-icon icon="upload"></b-icon>
        <span>{{ dropFiles.length > 0 ? "点击上传" : "上传图片" }}</span>
      </a>
    </b-field>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  mounted() {
    // console.log('文件数组:', this.dropFiles);
  },
  name: "ImageCard",
  data() {
    return {
      imageSrc: "", // 用于存储图片的 URL
      isCardModalActive: false, // 是否展示
    };
  },

  computed: {
    ...mapState(["dropFiles", "isPublic", "description", "texts", "price", "UserID"]),
  },

  watch: {
    dropFiles: "generateImageSrc",
  },

  methods: {
    ...mapMutations([
      "updateDropFiles",
      "deleteDropFile",
      "updateDescription",
      "updateIsPublic",
      "updateTags",
      "setActiveStep",
    ]),
    // URL.createObjectURL 是一个静态方法，用于创建一个表示给定 File 对象或 Blob 对象的 URL。
    // 这种 URL 是临时的，并且是浏览器特定的，通常用于预览用户上传的本地文件（例如图片或视频）而无需先将其上传到服务器。
    generateImageSrc() {
      if (this.dropFiles.length > 0) {
        this.imageSrc = URL.createObjectURL(this.dropFiles[0]);
      }
    },

    async uploadImage() {
      // 检查是否有文件被拖放上传
      if (this.dropFiles.length === 0) {
        alert("请先选择一个文件");
        return;
      }
      // FormData 是一种用于构建和发送 multipart/form-data 编码的表单数据的 Web API
      // formData.append 方法用于将键值对添加到 FormData 对象中。
      // 该方法允许你向 FormData 对象中添加任意数量的字段和文件，类似于 HTML 表单的字段
      // element：每次迭代时的元素  iterable：一个可迭代对象（如数组、字符串、Map、Set 等）for (const element of iterable)
      for (const file of this.dropFiles) {
        // 创建新的 FormData 对象
        const formData = new FormData();
        formData.append("file", file);
        formData.append("description", this.description);
        // formData.append('tags', JSON.stringify(this.texts)); // 将 tags 转换为 JSON 字符串
        // formData.append('isPublic', this.isPublic);
        formData.append("tags", JSON.stringify(this.texts)); // 确保将 tags 转换为 JSON 字符串
        formData.append("isPublic", this.isPublic.toString()); // 确保 isPublic 作为字符串传递
        formData.append("price", this.price.toString()); // 确保 isPublic 作为字符串传递

        // 打印 FormData 内容
        for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
        // 发送上传请求
        try {
          const response = await this.$http.post("/images/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          });
          alert("上传成功");
          // 上传成功后清空文件列表
          setTimeout(() => {
            this.updateDropFiles([]);
            this.imageSrc = "";
          }, 500);
        } catch (error) {
          console.error("网络异常，上传失败", error);
          alert("网络异常，上传失败");
        }
      }
    },
  },
};
</script>

<style scoped>
.upload-form {
  max-width: 500px;
  margin: 0 auto;
}

.step-item {
  margin-right: 400px; /* 设置水平间距 */
}

.step-content {
  margin-left: 400px; /* 设置水平间距 */
  margin-top: 150px;
  margin-bottom: 150px;
}

.little {
  margin-top: 20px;
}

.fixed-navigation {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
}

.fixed-div {
  position: absolute;
  bottom: 20px; /* 距离底部20px */
  right: 20px; /* 距离右侧20px */
  padding: 10px; /* 内边距 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}
</style>
