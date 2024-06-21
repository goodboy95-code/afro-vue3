<template>
  <el-dialog
      v-model="useMenuDialogDataStore().menuDialogVisibleForInfo"
      :before-close="handleClose"
      title="详情"
      :width="useResponsiveLayoutStore().isMobile?'90%':'60%'"
  >
    <el-descriptions
        :column="useResponsiveLayoutStore().isMobile?1:3"
        border
    >
      <el-descriptions-item label="菜单ID">{{ useMenuDialogDataStore().menuDialogRaw.menuId }}</el-descriptions-item>
      <el-descriptions-item label="菜单名">{{ useMenuDialogDataStore().menuDialogRaw.menuName }}</el-descriptions-item>
      <el-descriptions-item label="父菜单ID">{{useMenuDialogDataStore().menuDialogRaw.parentId }}
      </el-descriptions-item>
      <el-descriptions-item label="菜单icon">
        <el-icon>
          <component :is="useMenuDialogDataStore().menuDialogRaw.icon"></component>
        </el-icon>
      </el-descriptions-item>
      <el-descriptions-item label="排序">{{ useMenuDialogDataStore().menuDialogRaw.orderNum }}</el-descriptions-item>
      <el-descriptions-item label="路由地址">{{ useMenuDialogDataStore().menuDialogRaw.path }}</el-descriptions-item>
      <el-descriptions-item label="组件路径">{{ useMenuDialogDataStore().menuDialogRaw.component }}</el-descriptions-item>
      <el-descriptions-item label="可见性">{{ useMenuDialogDataStore().menuDialogRaw.visible }}</el-descriptions-item>
      <el-descriptions-item label="菜单状态">{{ useMenuDialogDataStore().menuDialogRaw.status }}</el-descriptions-item>
      <el-descriptions-item label="权限标识">{{ useMenuDialogDataStore().menuDialogRaw.perms }}</el-descriptions-item>
      <el-descriptions-item label="创建者">{{ useMenuDialogDataStore().menuDialogRaw.createBy }}</el-descriptions-item>
      <el-descriptions-item label="创建时间">{{useMenuDialogDataStore().menuDialogRaw.createTime }}
      </el-descriptions-item>
      <el-descriptions-item label="更新者">{{ useMenuDialogDataStore().menuDialogRaw.updateBy }}</el-descriptions-item>
      <el-descriptions-item label="更新时间">{{useMenuDialogDataStore().menuDialogRaw.updateTime }}
      </el-descriptions-item>
      <el-descriptions-item label="备注">{{useMenuDialogDataStore().menuDialogRaw.remark }}
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script lang="ts" setup>
import {useMenuDialogDataStore} from "/src/pinia/module/menu/useMenuDialogDataStore.ts";
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
