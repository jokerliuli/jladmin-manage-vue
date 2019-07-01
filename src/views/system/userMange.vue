<template>
  <div class="app-container" >
    <div class="filter-container">
      <el-input v-model="user.name" clearable placeholder="用户名" style="width: 200px;" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" >查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate" >新增</el-button>
    </div>

    <div style="margin: 20px;"/>

    <el-table
      v-loading="loading"
      :data="userList"
      border
      style="width: 100%"
    >
      <el-table-column fixed="left" prop="id" label="ID" width="65px"/>
      <el-table-column fixed="left" prop="updateDate" label="修改时间 " width="155px"/>
      <el-table-column prop="loginName" label="登录名"/>
      <el-table-column prop="trueName" label="真实姓名"/>
      <el-table-column prop="userType" label="用户类型"/>
      <el-table-column prop="sex" label="性别"/>
      <el-table-column prop="brithday" label="生日"/>
      <el-table-column prop="email" label="电子邮箱"/>
      <el-table-column prop="mobile" label="手机号"/>
      <el-table-column prop="phone" label="固定电话"/>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="headImg"
        label="头像"
      />
      <el-table-column prop="registerDate" label="注册日期"/>
      <el-table-column prop="lastLoginTime" label="上次登录时间"/>
      <el-table-column prop="sort" label="排序"/>
      <el-table-column fixed="right" label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 20px;"/>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListBypage" />

  </div>
</template>

<script>
import { page, update, remove } from '@/api/user'

import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'User',
  components: { Pagination },
  // filters: {
  //   publishFilter(publishStatus) {
  //     const statusMap = {
  //       2: '发布',
  //       1: '草稿'
  //     }
  //     return statusMap[publishStatus]
  //   },
  //   statusFilter(publishStatus) {
  //     const statusMap = {
  //       2: 'success',
  //       1: 'info'
  //     }
  //     return statusMap[publishStatus]
  //   }
  // },
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      user: {},
      userList: []
    }
  },
  watch: {
    '$route': 'getListBypage'
  },
  created() {
    this.getListBypage()
  },
  methods: {
    handleCreate() {
      this.$router.push({ path: '/information/AddSuccess' })
    },
    handleUpdate(id) {
      this.$router.push({ path: '/information/EditSuccess', query: { id: id }})
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getListBypage()
    },
    handleModifyStatus(row, status) {
      row.publishStatus = status
      this.user = Object.assign({}, row) // copy obj
      update(this.user).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },
    handleDelete(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        remove(row).then(response => {
          this.loading = false
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getListBypage()
        }).catch(err => {
          this.loading = false
          console.error(err)
          this.$message({
            message: '请求超时，请重试',
            type: 'error'
          })
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    getListBypage() {
      this.loading = true
      page(this.listQuery, this.user).then(response => {
        this.userList = response.data.data.records
        this.total = response.data.data.total
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
