<template>
  <div class="step-content">
    <b-field>
      <b-upload v-model="localFiles" multiple drag-drop expanded @input="updateFiles">
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon icon="upload" size="is-large"></b-icon>
            </p>
            <p>将文件拖到此处，或点击上传</p>
          </div>
        </section>
      </b-upload>
    </b-field>
    <div class="tags">
      <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary">
        {{ file.name }}
        <button class="delete is-small" type="button" @click="removeFile(index)"></button>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "ImageAdd",

  computed: {
    ...mapState(["dropFiles"]),
    localFiles: {
      get() {
        return this.dropFiles;
      },
      set(files) {
        this.updateDropFiles(files);
      },
    },
  },

  methods: {
    ...mapMutations(["updateDropFiles", "deleteDropFile"]),
    removeFile(index) {
      this.deleteDropFile(index);
    },
    updateFiles(newFiles) {
      this.updateDropFiles(newFiles);
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
  margin-right: 400px;
  /* 设置水平间距 */
}

.step-content {
  margin-left: 400px;
  /* 设置水平间距 */
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
  bottom: 20px;
  /* 距离底部20px */
  right: 20px;
  /* 距离右侧20px */
  padding: 10px;
  /* 内边距 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /* 阴影效果 */
}
</style>
