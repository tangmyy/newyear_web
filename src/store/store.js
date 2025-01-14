import Vue from 'vue'
import Vuex from 'vuex'
// 为什么这里也要导入 main.js不是全局的吗？
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:8088/api"
Vue.prototype.$http = axios

Vue.use(Vuex)

export default new Vuex.Store({
  // this.store.state.'xxx' 状态
  state: {
    UserId: "",
    UserName: '未登录',
    isLoggedIn: false,
    HTTP: 'http://localhost:8088',

    PublicImages: [],

    dropFiles: [], // 拖放上传的文件数组
    isPublic: 'PRIVATE', // 图像公开状态 默认为私密
    description: '',      // 图片描述
    texts: [],    // 标签数组
    price: 0.00,
  },

  // this.$store.commit('xxx') 提交
  mutations: {
    login(state, username) {
      state.isLoggedIn = true;
      state.UserName = username;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.UserName = '';
    },
    setUserId(state, userId) {
      state.UserId = userId;
    },
    
    setPublicImages(state, images) {
      state.PublicImages = images;
    },
    setImageRatings(state, ratings) {
      // 根据评分更新图片的 `value`
      state.PublicImages = state.PublicImages.map((image) => {
        const rating = ratings.find((r) => r.imageId === image.id);
        return {
          ...image,
          value: rating ? rating.value : 0, // 如果评分不存在，默认值为 0
        };
      });
    },

    updateDropFiles(state, files) {
      state.dropFiles = files;
      console.log('Files update:', state.dropFiles);
    },
    deleteDropFile(state, index) {
      state.dropFiles.splice(index, 1);
      console.log('Files delete:', state.dropFiles);
    },
    updateDescription(state, description) {
      state.description = description;
      console.log('value update:', state.description);
    },
    updateIsPublic(state, isPublic) {
      state.isPublic = isPublic;
      console.log('value public:', state.isPublic);

    },
    updateTags(state, texts) {
      console.log('value texts:', state.texts);
      state.texts = texts;
    }

  },

  //    
  /**
   * 获取状态(state)的派生状态(过滤/计数)
   * 注意，getter 在通过属性访问时
   * 是作为 Vue 的响应式系统的一部分缓存其中的
   **/
  getters: {
    // count: state => state.count,
    // doneTodos: state => {
    //   // filter创建一个新数组，其包含通过所提供函数实现的测试的所有元素,它不会改变原数组
    //   return state.todos.filter(todo => todo.done)
    // },
    // doneTodosCount:(state, getters) =>{
    //   return getters.doneTodos.length
    // }
  },
  /**
   * 派发异步操作的逻辑
   * 不做修改，修改只在mutations实现
   **/
  actions: {
    async fetchPublicImages({ commit }) {
      // 不可以使用 this.$http.get("/images/public")
      try {
        const response = await axios.get("http://localhost:8088/api/images/public")
        commit('setPublicImages', response.data)
      } catch (error) {
        console.error("Error fetching images:", error)
      }
    },
    async fetchImageRatings({ commit }) {
      return axios
        .get("http://localhost:8088/api/likeimages/get", { withCredentials: true })
        .then((response) => {
          commit("setImageRatings", response.data); // 保存评分到 Vuex 中
        })
        .catch((error) => {
          console.error("Error fetching image ratings:", error);
        });
    },
    
  },
  /**
   * 可分模块
   **/
  modules: {
    // 可分模块
  }

})


