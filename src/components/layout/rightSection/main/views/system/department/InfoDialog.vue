<template>
  <el-dialog
      v-model="useDepartmentDialogDataStore().departmentDialogVisibleForInfo"
      :before-close="handleClose"
      title="详情"
      :width="useResponsiveLayoutStore().isMobile?'90%':'60%'"
  >
    <el-descriptions
        :column="useResponsiveLayoutStore().isMobile?1:3"
        border
    >
      <el-descriptions-item label="部门ID">{{ useDepartmentDialogDataStore().departmentDialogRaw.departmentId }}</el-descriptions-item>
      <el-descriptions-item label="父级部门ID">{{ useDepartmentDialogDataStore().departmentDialogRaw.parentId }}</el-descriptions-item>
      <el-descriptions-item label="部门名">{{ useDepartmentDialogDataStore().departmentDialogRaw.departmentName }}</el-descriptions-item>
      <el-descriptions-item label="祖级列表">{{ useDepartmentDialogDataStore().departmentDialogRaw.ancestors }}</el-descriptions-item>
      <el-descriptions-item label="部门排序">{{ useDepartmentDialogDataStore().departmentDialogRaw.orderNum }}</el-descriptions-item>
      <el-descriptions-item label="负责人">{{ useDepartmentDialogDataStore().departmentDialogRaw.leader }}</el-descriptions-item>
      <el-descriptions-item label="联系电话">{{ useDepartmentDialogDataStore().departmentDialogRaw.phone }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{ useDepartmentDialogDataStore().departmentDialogRaw.email }}</el-descriptions-item>
      <el-descriptions-item label="部门状态">{{ useDepartmentDialogDataStore().departmentDialogRaw.status }}</el-descriptions-item>
      <el-descriptions-item label="删除标志">{{ useDepartmentDialogDataStore().departmentDialogRaw.delFlag }}</el-descriptions-item>
      <el-descriptions-item label="缩写">{{ useDepartmentDialogDataStore().departmentDialogRaw.abbreviation }}</el-descriptions-item>
      <el-descriptions-item label="创建者">{{ useDepartmentDialogDataStore().departmentDialogRaw.createBy }}</el-descriptions-item>
      <el-descriptions-item label="创建时间">{{ useDepartmentDialogDataStore().departmentDialogRaw.createTime }}</el-descriptions-item>
      <el-descriptions-item label="更新者">{{ useDepartmentDialogDataStore().departmentDialogRaw.updateBy }}</el-descriptions-item>
      <el-descriptions-item label="更新时间">{{ useDepartmentDialogDataStore().departmentDialogRaw.updateTime }}</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script lang="ts" setup>
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import {useDepartmentDialogDataStore} from "/src/pinia/module/department/useDepartmentDialogDataStore.ts";

const handleClose = (done: () => void) => {
  done()
}
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
