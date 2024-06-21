<template>
  <el-dialog
      v-model="useRoleDialogDataStore().roleDialogVisibleForInfo"
      :before-close="handleClose"
      title="详情"
      :width="useResponsiveLayoutStore().isMobile?'90%':'60%'"
  >
    <el-descriptions
        :column="useResponsiveLayoutStore().isMobile?1:3"
        border
    >
      <el-descriptions-item label="角色ID">{{ useRoleDialogDataStore().roleDialogRaw.roleId }}</el-descriptions-item>
      <el-descriptions-item label="角色名">{{ useRoleDialogDataStore().roleDialogRaw.roleName }}</el-descriptions-item>
      <el-descriptions-item label="显示顺序">{{ useRoleDialogDataStore().roleDialogRaw.roleSort }}</el-descriptions-item>
      <el-descriptions-item label="角色状态">{{ useRoleDialogDataStore().roleDialogRaw.status }}</el-descriptions-item>
      <el-descriptions-item label="删除标志">{{ useRoleDialogDataStore().roleDialogRaw.delFlag }}</el-descriptions-item>
      <el-descriptions-item label="创建者">{{ useRoleDialogDataStore().roleDialogRaw.createBy }}</el-descriptions-item>
      <el-descriptions-item label="创建时间">{{ useRoleDialogDataStore().roleDialogRaw.createTime }}</el-descriptions-item>
      <el-descriptions-item label="更新者">{{ useRoleDialogDataStore().roleDialogRaw.updateBy }}</el-descriptions-item>
      <el-descriptions-item label="更新时间">{{ useRoleDialogDataStore().roleDialogRaw.updateTime }}</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script lang="ts" setup>
import {useRoleDialogDataStore} from "/src/pinia/module/role/useRoleDialogDataStore.ts";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";

const handleClose = (done: () => void) => {
  done()
}
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
