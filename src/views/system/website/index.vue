<template>
  <div class="app-container">
    <el-form v-loading="loading" ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="90px" style="width: 90%; margin-left:50px;">
      <el-form-item label="网站标题" prop="title">
        <el-input v-model.trim="temp.title"/>
      </el-form-item>
      <el-form-item label="关键词" prop="keyword">
        <el-input v-model.trim="temp.keyword"/>
      </el-form-item>
      <el-form-item label="描述" prop="webDescribe">
        <el-input v-model.trim="temp.webDescribe" type="textarea"/>
      </el-form-item>
      <el-form-item label="简略标题" prop="shortTitle">
        <el-input v-model.trim="temp.shortTitle"/>
      </el-form-item>
      <el-form-item label="摘要" prop="summary">
        <el-input v-model.trim="temp.summary"/>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="primary" @click="createData()">立即提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { update, getOne } from '@/api/website'

export default {
  name: 'Index',
  data() {
    return {
      temp: {
        id: 1
      },
      query: {
        id: 1
      },
      rules: {
        title: [
          { required: true, message: '请填写网站标题', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        webDescribe: [
          { required: true, message: '请填写网站描述', trigger: 'blur' }
        ],
        keyword: [
          { required: true, message: '请填写网站关键字', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getOne()
  },
  methods: {
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          update(this.temp).then(() => {
            this.loading = false
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    getOne() {
      this.loading = true
      getOne(this.query).then(response => {
        this.temp = response.data.data
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.error(err)
        this.$message({
          message: '请求超时，请重试',
          type: 'error'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
