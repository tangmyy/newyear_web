<template>
  <div class="register-container">
    <el-card class="register-card">
      <h2 class="register-title">注册</h2>

      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="form.confirmPassword"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="diybutton" type="primary" @click="submitForm('form')">注册</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/, // 中国大陆手机号正则
            message: "请输入正确的手机号",
            trigger: ["blur", "change"],
          },
        ],

        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        confirmPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.password) {
                callback(new Error("两次输入密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      // 验证表单
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 如果表单验证通过，发送请求
          this.$http
            .post("/users/register", this.form, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              // 注册成功处理
              alert("注册成功!");
              setTimeout(() => {
                console.log("跳转到登录页面");
                this.$router.push({ name: "Login" });
              }, 500);
            })
            .catch((error) => {
              // 注册失败
              console.error(error);
              alert("注册失败，请重试");
              // 注册失败不跳转
            });
        } else {
          // 表单验证失败，提示用户输入有效数据
          alert("请填写有效的注册信息");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #f5f5f5;
}

.register-card {
  width: 400px;
  padding: 20px;
}

.register-title {
  text-align: center;
  color: #409eff;
  margin-bottom: 20px;
}
</style>
