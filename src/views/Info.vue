<template>
  <div>
    <el-page-header @back="goBack" content="个人信息"> </el-page-header>
    <br />
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="电话" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>

      <el-form-item label="余额">
        <el-input v-model="ruleForm.balance" disabled></el-input>
      </el-form-item>

      <el-form-item label="账户状态" prop="status">
        <el-input v-model="ruleForm.status" disabled></el-input>
      </el-form-item>

      <el-form-item label="个性签名" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Info",

  computed: {
    ...mapState(["isLoggedIn", "UserId"]),
  },

  // 钩子调用此函数
  created() {
    this.fetchUserInfo();
  },

  data() {
    return {
      ruleForm: {
        username: "用户名",
        phone: "电话号",
        email: "邮箱号",
        balance: 0.0,
        status: "ACTIVE",
        desc: "这个人有点懒...",
        userId: "", // 添加 userId 字段
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "请输入正确的中国大陆手机号码",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        status: [
          {
            required: true,
            message: "用户状态不能为空",
            trigger: "blur",
          },
          {
            validator: (rule, value, callback) => {
              const validStatuses = ["ACTIVE", "BANNED"];
              if (!validStatuses.includes(value)) {
                callback(new Error("状态必须是 'ACTIVE' 或 'BANNED'"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],

        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 如果验证通过，调用更新用户信息的函数
          this.updateUserInfo();
          alert("更新成功!");
        } else {
          console.log("更新error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    goBack() {
      console.log("go back");
    },

    async fetchUserInfo() {
      try {
        const response = await this.$http.get("/users/info", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // 确保跨域请求携带 Cookies
        });

        console.log("用户信息获取成功：", response.data);

        // 将返回的用户数据映射到表单数据
        this.ruleForm = {
          name: response.data.username || "用户名",
          phone: response.data.phone || "电话号",
          email: response.data.email || "邮箱号",
          balance: response.data.balance || "0.00",
          status: response.data.status || "ACTIVE",
          desc: response.data.desc || "这个人有点懒...",
          userId: response.data.userId || "", // 设置 userId
        };

        // 更新 Vuex 中的 UserId
        this.$store.commit("setUserId", response.data.userId); // 存储 UserId
        // console.log("从响应中获取的 UserId：", response.data.userId);
        // console.log("Vuex 中的 UserId：", this.$store.state.UserId);
      } catch (error) {
        console.error("获取用户信息失败：", error);
        this.$message.error("无法获取用户信息，请检查网络或重新登录！");
      }
    },

    async updateUserInfo() {
      try {
        const response = await this.$http.put("/users/update", this.ruleForm, {
          withCredentials: true, // 确保跨域请求时发送 Cookie
        });
        this.$message.success("用户信息更新成功");
        console.log("用户信息更新成功：", response.data);
      } catch (error) {
        console.error("用户信息更新失败：", error.response?.data || error.message);
        this.$message.error(error.response?.data || "更新用户信息时发生错误");
      }
    },
  },
};
</script>
