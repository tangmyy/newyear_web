<template>
  <div class="step-content">
    <b-field>
      <div>
        <b-switch v-model="localIsPublic">公开图片</b-switch>
      </div>
      <div>
        <p>图片公开状态: {{ localIsPublic ? "公开" : "私密" }}</p>
      </div>
    </b-field>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "ImagePublic",

  computed: {
    ...mapState(["isPublic"]),
    localIsPublic: {
      get() {
        return this.isPublic === "PUBLIC";
      },
      set(value) {
        this.updateIsPublic(value ? "PUBLIC" : "PRIVATE"); // 转换为枚举值
      },
    },
  },

  methods: {
    ...mapMutations(["updateIsPublic"]),
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
