<template>
  <div id="Home">
    <KinesisContainer>
      <KinesisElement :strength="100">
        <img alt="Vue logo" src="@/assets/logo.png" class="animate__heartBeat" />
      </KinesisElement>
    </KinesisContainer>

    <!-- 页码导航栏 -->
    <hr />
    <section>
      <b-pagination
        :total="total"
        v-model="current"
        :range-before="rangeBefore"
        :range-after="rangeAfter"
        :order="order"
        :size="size"
        :simple="isSimple"
        :rounded="isRounded"
        :per-page="perPage"
        :icon-prev="prevIcon"
        :icon-next="nextIcon"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        :page-input="hasInput"
        :page-input-position="inputPosition"
        :debounce-page-input="inputDebounce"
      />
    </section>
    <hr />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      // 页码导航栏
      total: 200, // 总记录数
      current: 1, // 当前页数
      perPage: 10, // 每页记录数
      rangeBefore: 2, // 前面有几页
      rangeAfter: 2, // 后面有几页
      order: "is-centered", // 升序或降序    is-right
      size: "is-medium", // 组件的大小  is-small is-medium   is-large
      isSimple: false, // 简化模式
      isRounded: true, // 圆角样式
      hasInput: true, // 页码输入框
      prevIcon: "chevron-left",
      nextIcon: "chevron-right",
      inputPosition: "", // 页码输入框的位置
      inputDebounce: "500", // 页码输入的防抖时间
    };
  },

  // computed: {
  //   ...mapState(["count", "todos", "UserID", "HTTP"]),
  //   ...mapGetters({
  //   }),
  // },

  // methods: {
  //   ...mapMutations({
  //   }),
  // },
};
</script>

<style scoped>
#Home {
  margin: 40px 0 0;
  color: #42b983;
  font-weight: bold;
  font-size: 44px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
