<template>
  <section>
    <div class="block"></div>
    <b-steps
      v-model="activeStep"
      :animated="isAnimated"
      :rounded="isRounded"
      :has-navigation="hasNavigation"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
      :label-position="labelPosition"
      :mobile-mode="mobileMode"
    >
      <b-step-item step="1" label="上传图片" :clickable="isStepsClickable" class="step-item">
        <ImageAdd></ImageAdd>
      </b-step-item>

      <b-step-item
        step="2"
        label="图片描述"
        :clickable="isStepsClickable"
        :type="{ 'is-success': isProfileSuccess }"
        class="step-item"
      >
        <ImageIntro></ImageIntro>
      </b-step-item>

      <b-step-item step="3" label="选择标签" :clickable="isStepsClickable" disabled class="step-item">
        <ImageTag></ImageTag>
      </b-step-item>

      <b-step-item step="4" label="公开状态" :clickable="isStepsClickable" class="step-item">
        <ImagePublic></ImagePublic>
      </b-step-item>

      <b-step-item step="5" label="预览" :clickable="isStepsClickable" disabled class="step-item">
        <ImageCard></ImageCard>
      </b-step-item>

      <template v-if="customNavigation" #navigation="{ previous, next }">
        <b-button
          outlined
          type="is-danger"
          icon-pack="fas"
          icon-left="backward"
          :disabled="previous.disabled"
          @click.prevent="previous.action"
        >
          Previous
        </b-button>
        <b-button
          outlined
          type="is-success"
          icon-pack="fas"
          icon-right="forward"
          :disabled="next.disabled"
          @click.prevent="next.action"
        >
          Next
        </b-button>
      </template>
    </b-steps>
  </section>
</template>

<script>
import ImageAdd from "@/views/Image/ImageAdd.vue";
import ImageIntro from "@/views/Image/ImageIntro.vue";
import ImageTag from "@/views/Image/ImageTag.vue";
import ImagePublic from "@/views/Image/ImagePublic.vue";
import ImageCard from "@/views/Image/ImageCard.vue";

export default {
  name: "Image",
  // 挂载组件
  components: {
    ImageAdd,
    ImageIntro,
    ImageTag,
    ImagePublic,
    ImageCard,
  },
  data() {
    return {
      isRounded: true,
      isAnimated: true,
      isStepsClickable: true,

      hasNavigation: true,
      customNavigation: false,
      isProfileSuccess: false,

      prevIcon: "chevron-left",
      nextIcon: "chevron-right",
      labelPosition: "bottom",
      mobileMode: "minimalist",
    };
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
