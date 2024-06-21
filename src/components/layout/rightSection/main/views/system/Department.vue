<template>
  <AddDialog/>
  <InfoDialog/>
  <EditDialog/>
  <el-row :gutter="20" style="height: 100%">
    <el-col :span="24">
      <el-card shadow="never">
        <el-row :gutter="10">
          <el-col :span="9">
            <el-input v-model="useDepartmentStore().departmentName" placeholder="请输入部门名称"/>
          </el-col>
          <el-col :span="4">
            <el-select v-model="useDepartmentStore().statusForSelect" clearable placeholder="部门状态">
              <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="queryByCondition">确定</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card shadow="never">
        <el-button style="margin-bottom: 10px" type="primary" @click="addDepartment">添加部门</el-button>
        <el-table :data="useDepartmentStore().tableData" style="width: 100%" table-layout="auto">
          <el-table-column fixed="left" label="部门ID" width="66" prop="departmentId"/>
          <el-table-column label="父部门ID" min-width="165" prop="parentId"/>
          <el-table-column label="部门名称" min-width="165" prop="departmentName"/>
          <el-table-column label="祖级列表" min-width="165" prop="ancestors"/>
          <el-table-column label="显示顺序" min-width="165" prop="orderNum"/>
          <el-table-column label="负责人" min-width="165" prop="leader"/>
          <el-table-column label="联系电话" min-width="165" prop="phone"/>
          <el-table-column label="邮箱" min-width="165" prop="email"/>
          <el-table-column label="部门状态" min-width="165" prop="status"/>
          <el-table-column label="删除标志" min-width="165" prop="delFlag"/>
          <el-table-column label="缩写" min-width="100" prop="abbreviation">
            <template #default="scope">
              <el-text truncated>{{ scope.row.abbreviation }}</el-text>
            </template>
          </el-table-column>
          <el-table-column label="创建者" min-width="100" prop="createBy">
            <template #default="scope">
              <el-text truncated>{{ scope.row.createBy }}</el-text>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" min-width="100" prop="createTime">
            <template #default="scope">
              <el-text truncated>{{ scope.row.createTime }}</el-text>
            </template>
          </el-table-column>
          <el-table-column label="更新者" min-width="100" prop="updateBy">
            <template #default="scope">
              <el-text truncated>{{ scope.row.updateBy }}</el-text>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" min-width="100" prop="updateTime">
            <template #default="scope">
              <el-text truncated>{{ scope.row.updateTime }}</el-text>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="66">
            <template #default="scope">
              <el-button link size="small" type="primary" @click="getInfo(scope.row)">详情</el-button>
              <el-button link size="small" type="primary" @click="editDepartment(scope.row)">编辑</el-button>
              <DeleteButton></DeleteButton>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="useDepartmentStore().pageNumber+1"
                       :page-count="useDepartmentStore().totalPages"
                       :page-size="useDepartmentStore().pageSize"
                       :pager-count="useDepartmentStore().pagerCount"
                       background
                       layout="prev, pager, next"
                       @current-change="currentChange"
        />
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {SpringPage} from "/src/axios/api/type/Page.ts";
import {Department, DepartmentCondition} from "/src/axios/api/type/Department.ts";
import {queryByPageRequest} from "/src/axios/api/departmentApi.ts";
import Utils from "/src/utils/Utils.ts";
import DeleteButton from "/src/components/layout/rightSection/main/views/system/department/DeleteButton.vue";
import {useDepartmentDialogDataStore} from "/src/pinia/module/department/useDepartmentDialogDataStore.ts";
import {cloneDeep} from "lodash-es";
import EditDialog from "/src/components/layout/rightSection/main/views/system/department/EditDialog.vue";
import InfoDialog from "/src/components/layout/rightSection/main/views/system/department/InfoDialog.vue";
import AddDialog from "/src/components/layout/rightSection/main/views/system/department/AddDialog.vue";
import {useDepartmentStore} from "/src/pinia/module/department/useDepartmentStore.ts";
import {status} from "/src/data/option.ts";

queryByPageRequest(
    new DepartmentCondition(
        0
    )
).then((res: SpringPage<Department>) => {
  console.log(res)
  useDepartmentStore().tableData = res.content
  useDepartmentStore().totalPages = res.totalPages
})

const queryByCondition = () => {
  queryByPageRequest(
      new DepartmentCondition(
          0,
          useDepartmentStore().departmentName,
          useDepartmentStore().statusForSelect,
      )
  ).then((res: SpringPage<Department>) => {
    useDepartmentStore().tableData = res.content
    useDepartmentStore().totalPages = res.totalPages
  })
}

const addDepartment =  () => {
  useDepartmentDialogDataStore().departmentDialogVisibleForAdd = true
}

const editDepartment = (data: Department) => {
  useDepartmentDialogDataStore().departmentDialogRaw = cloneDeep(data)
  useDepartmentDialogDataStore().departmentDialogVisibleForEdit = true
}

const getInfo = (data: Department) => {
  useDepartmentDialogDataStore().departmentDialogRaw = data
  useDepartmentDialogDataStore().departmentDialogVisibleForInfo = true
}

//改变当前页
const currentChange = (pageNumber: number) => {
  //如果tableData为空，条件查询 有数据->空数据 会触发currentChange
  if (!Utils.isEmpty(useDepartmentStore().tableData)) {
    queryByPageRequest(
        new DepartmentCondition(
            pageNumber - 1,
            useDepartmentStore().lastQueryDepartmentName,
            useDepartmentStore().lastQueryStatusForSelect,
        )
    ).then(
        (res: SpringPage<Department>) => {
          useDepartmentStore().tableData = res.content
          useDepartmentStore().totalPages = res.totalPages
        }
    )
  }
}
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/scss/card";
@use "/src/assets/styles/scss/table";
@use "/src/assets/styles/scss/pagination";

.el-card {
  @include card.cardTheme;

  .el-table {
    @include table.tableTheme;

    ::v-deep(.el-table__body td .cell) {
      white-space: nowrap
    }
  }

  .el-pagination {
    @include pagination.paginationTheme;
  }
}
</style>