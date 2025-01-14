<template>
  <div id="home">
    <div class="interaction">
      <p>给 "Big Model" 发送消息</p>
      <div class="input-group">
        <input type="text" v-model="question" placeholder="Ask your question here" />
        <button @click="askQuestion">Ask</button>
      </div>
    </div>
    <div class="response">
      <p>大模型:</p>
      <div class="answer-box">
        <span>{{ answer }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",

  data() {
    return {
      // 大模型
      question: "",
      answer: "", // 用于存储实时显示的回答
    };
  },

  computed: {
    ...mapState(["UserID", "HTTP"]),
  },

  methods: {
    async askQuestion() {
      this.answer = ""; // 清空之前的回答
      try {
        const response = await this.$http.post(
          "/bigmodel/ask",
          {
            question: this.question,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          },
        );
        console.log("问答成功:", response.data);
        this.displayAnswer(response.data.answer);
      } catch (error) {
        console.error("问答失败:", error);
        this.answer = "Error: " + error.message;
      }
    },
    displayAnswer(answer) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < answer.length) {
          this.answer += answer[index];
          index++;
        } else {
          clearInterval(interval);
        }
      }, 100); // 每100毫秒显示一个字，可以根据需要调整时间间隔
    },
  },
};
</script>

<style scoped>
#home {
  margin: 40px 0;
  font-family: Arial, sans-serif;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.interaction {
  margin-bottom: 20px;
  text-align: center;
}

.input-group {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

input[type="text"] {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
  margin-right: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #42b983;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #369b72;
}

.response {
  text-align: center;
}

.answer-box {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  width: 300px;
  min-height: 50px;
  margin-top: 10px;
  background-color: #f9f9f9;
}
</style>
