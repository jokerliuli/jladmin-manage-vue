<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="dataList.name" clearable placeholder="名称" style="width: 200px;" class="filter-item" />
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search" >查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" >新增</el-button>
    </div>

    <div style="margin: 20px;"/>

    <el-table
      :data="dataList"
      border
      style="width: 100%;">
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        width="80"
        label="ID"/>
      <table-tree-column
        prop="name"
        header-align="center"
        tree-key="id"
        width="150"
        label="名称"/>
      <el-table-column
        prop="parentName"
        header-align="center"
        align="center"
        width="120"
        label="上级菜单"/>
      <!--      <el-table-column-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="图标">-->
      <!--        <template slot-scope="scope">-->
      <!--          <icon-svg :name="scope.row.icon || ''"/>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column
        prop="menuType"
        header-align="center"
        align="center"
        label="类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.menuType === 'CATALOG'" size="small">目录</el-tag>
          <el-tag v-else-if="scope.row.menuType === 'MENU'" size="small" type="success">菜单</el-tag>
          <el-tag v-else-if="scope.row.menuType === 'BUTTON'" size="small" type="info">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        header-align="center"
        align="center"
        label="排序号"/>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="component"
        header-align="center"
        align="center"
        width="150"
        label="菜单URL"/>
      <!--      <el-table-column-->
      <!--        :show-overflow-tooltip="true"-->
      <!--        prop="perms"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        width="150"-->
      <!--        label="授权标识"/>-->
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>
  </div>
</template>

<script>
import TableTreeColumn from '@/components/table-tree-column'
import { getTree } from '@/api/menu'
export default {
  components: {
    TableTreeColumn
    // AddOrUpdate
  },
  data() {
    return {
      dataForm: {},
      dataList: [],
      dataListLoading: false,
      addOrUpdateVisible: false
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      getTree().then(response => {
        this.dataList = response.data.data
        console.log(this.dataList)
        this.dataListLoading = false
      })
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle(id) {
      this.$confirm(`确定对[id=${id}]进行[删除]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl(`/admin/sys/menu/delete/${id}`),
          method: 'delete',
          data: this.$http.adornData()
        }).then(({ data }) => {
          if (data && data.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>

</style>
