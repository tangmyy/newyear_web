<template>
  <div class="step-content">
    <section>
      <b-field label="为图片添加标签🏷">
        <b-taginput
          v-model="localTags"
          :maxtags="maxs">
        </b-taginput>
      </b-field>
    </section>
  </div>
</template>

<script>
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex';

export default {
  name: 'ImageTag',

  data() {
    return {
      maxs: 5,      // 最大标签数量
    };
  },


  methods: {
    ...mapMutations(['updateTags']),
  },

  computed: {
    ...mapState(['tags']),
    localTags: {
      get() {
        console.log('tags:', this.tags);
        return this.intro;
      },
      set(value) {
        this.updateTags(value);
      }
    }
  },


  
}
</script>

<style scoped>
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
</style>
