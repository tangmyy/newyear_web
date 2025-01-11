<template>
  <div class="step-content">
    <b-field>
      <b-switch v-model="beLazy">点击试试！</b-switch>
    </b-field>
    
    <b-field>
      <p>
        <br>
        <b-input type="text"
        :lazy="beLazy"
        v-model="localDescription"
        placeholder="请输入...">
      </b-input>
      <br>
      照片描述: {{localDescription}}
    </p>
  </b-field>
</div>
</template>



<script>
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex';

export default {
  name: 'ImageIntro',
  data() {
    return {
      beLazy: false,  // 是否懒加载
    }
  },
  computed: {
    ...mapState(['description']),
    localDescription: {
      get() {
        return this.description;
      },
      set(value) {
        this.updateDescription(value);
      }
    }
  },
  

  methods: {
    ...mapMutations(['updateDescription']),
  },


}
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

