<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="imageurl" label="图片" width="300">
      <template v-slot="scope">
        <img :src="scope.row.imageurl" alt="image" style="width: 100px; height: auto" />
      </template>
    </el-table-column>

    <el-table-column prop="isPublic" label="公开状态">
      <template v-slot="scope">
        <!-- <span>{{ scope.row.isPublic ? "公开" : "私密" }}</span> -->
        <span>{{ scope.row.isPublic === "PUBLIC" ? "公开" : "私密" }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="imageId" label="图片ID"></el-table-column>
    <el-table-column prop="tags" label="标签"></el-table-column>
    <el-table-column prop="description" label="图片描述"></el-table-column>

    <el-table-column label="编辑">
      <template v-slot="scope">
        <el-popover placement="top-start" title="编辑" width="200" trigger="hover" content="修改提交内容">
          <el-button slot="reference" @click="openEdit(scope.row)">点击以编辑</el-button>
        </el-popover>

        <!-- 更新表单 -->
        <el-dialog :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="图片ID" :label-width="formLabelWidth">
              <p>: {{ scope.row.imageId }}</p>
            </el-form-item>

            <el-form-item label="图片描述" :label-width="formLabelWidth">
              <el-input v-model="form.description" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="图片价格" :label-width="formLabelWidth">
              <el-input v-model="form.price" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="公开状态" :label-width="formLabelWidth">
              <!-- <b-switch v-model="form.isPublic">公开图片</b-switch>
              <p>图片公开状态: {{ form.isPublic ? "公开" : "私密" }}</p> -->
              <el-radio-group v-model="form.isPublic">
                <el-radio label="PUBLIC">公开</el-radio>
                <el-radio label="PRIVATE">私密</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="图片标签" :label-width="formLabelWidth">
              <b-taginput v-model="form.tags" :maxtags="maxs"></b-taginput>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelEdit">取 消</el-button>
            <el-button type="primary" @click="submitEdit">确 定</el-button>
          </div>
        </el-dialog>
      </template>
    </el-table-column>

    <el-table-column label="删除">
      <template v-slot="scope">
        <el-popover placement="top" width="160" v-model="scope.row.visible">
          <p>您确定删除这张图片吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="confirmDelete(scope.row)">确定</el-button>
          </div>
          <el-button slot="reference">删除</el-button>
        </el-popover>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      tableData: [], // 存储从服务器获取的图像数据，这些数据会在表格中显示
      maxs: 5, // 最大标签数量
      dialogFormVisible: false, // 控制编辑对话框的显示状态

      formLabelWidth: "120px", // 这决定了表单项标签的显示宽度
      form: {
        imageId: "",
        description: "",
        price: 0,
        isPublic: "PRIVATE", // 默认值为 'PRIVATE'
        tags: [],
      },
    };
  },
  created() {
    this.fetchData();
  },

  methods: {
    cancelEdit() {
      this.dialogFormVisible = false; // 取消编辑对话框
    },
    openEdit(row) {
      this.dialogFormVisible = true;
      this.form = { ...row, tags: row.tags ? row.tags.split(";") : [] }; // 复制当前行的数据到表单对象，并将 tags 转换为数组
      this.dialogFormVisible = true; // 显示编辑对话框
    },

    async fetchData() {
      try {
        const response = await this.$http.get("/images/user", {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, //   通过设置 withCredentials 可以确保在跨域请求中带上当前域名下的 Cookies。
        });
        console.log("检查点:response data:", response.data);
        this.tableData = response.data.map((images) => {
          // console.log("检查点:images:", images);
          return {
            ...images, // 使用对象展开运算符保留图像对象的所有属性
            imageurl: images.filePath,
            visible: false, // 为每行添加 visible 属性
          };
        });
      } catch (error) {
        console.error("未登录，请先登录！", error);
      }
    },
    // async confirmDelete(imageId) {
    //   try {
    //     console.log("data:", response.data);
    //     const response = await this.$http.delect(`/images/delete`, {
    //       params: { imageId }, // 传递图片ID
    //       withCredentials: true,
    //     });
    //     console.log("删除成功:", response.data);
    //     this.visible = false; // 关闭删除对话框
    //     await this.fetchData(); // 重新获取数据以更新表格
    //   } catch (error) {
    //     console.error("删除失败:", error);
    //     alert("删除失败");
    //   }
    // },

    async confirmDelete(row) {
      try {
        const response = await this.$http.put(
          "/images/delete",
          {
            imageId: row.imageId, // 以 JSON 格式传递参数
          },
          {
            withCredentials: true, // 确保携带 Cookies
          },
        );
        console.log("删除成功:", response.data);
        row.visible = false;
        await this.fetchData(); // 重新获取数据以更新表格
      } catch (error) {
        console.error("删除失败:", error);
        alert("删除失败");
      }
    },

    async submitEdit() {
      try {
        const tagsJson = JSON.stringify(this.form.tags); // 转换 tags 为 JSON 字符串
        // const parsedTagsJson = JSON.parse(tagsJson);
        // console.log("即将发送给后端的 tags:", tagsJson);
        // console.log("表单数据:", {
        //   imageId: parseInt(this.form.imageId),
        //   description: this.form.description,
        //   tags: tagsJson,
        //   price: this.form.price.toString(),
        //   isPublic: this.form.isPublic,
        // });
        const response = await this.$http.put(
          "/images/update",
          {
            imageId: parseInt(this.form.imageId), // 确保 id 是整数
            description: this.form.description,
            tags: tagsJson,
            price: this.form.price.toString(), // 强制将 price 转换为字符串
            isPublic: this.form.isPublic,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            withCredentials: true,
          },
        );
        console.log("更新成功:", response.data);
        this.dialogFormVisible = false; // 关闭编辑对话框
        // 重新获取数据以更新表格
        await this.fetchData();
      } catch (error) {
        console.error("更新失败:", error);
        alert("更新失败");
      }
    },
  },
};
</script>
