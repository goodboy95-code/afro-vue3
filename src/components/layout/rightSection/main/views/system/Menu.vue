<template>
  <AddDialog/>
  <InfoDialog/>
  <EditDialog/>
  <el-row :gutter="20" style="height: 100%">
    <el-col :span="24">
      <el-card shadow="never">
        <el-row :gutter="10">
          <el-col :span="9" :xs="10">
            <el-input v-model="useMenuStore().menuName" placeholder="请输入菜单名称"/>
          </el-col>
          <el-col :span="4" :xs="9">
            <el-select v-model="useMenuStore().statusForSelect" clearable placeholder="菜单状态">
              <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
            </el-select>
          </el-col>
          <el-col :span="6" :xs="4">
            <el-button type="primary" @click="queryByCondition">确定</el-button>
            <el-button @click="resetData">重置</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card shadow="never">
        <el-button style="margin-bottom: 10px" type="primary" @click="addMenu">添加菜单</el-button>
        <el-table :data="useMenuStore().tableData" row-key="menuId">
          <el-table-column :min-width="useResponsiveLayoutStore().isMobile?66:165" fixed="left" label="菜单ID"
                           prop="menuId"/>
          <el-table-column label="菜单名称" min-width="165" prop="menuName"/>
          <el-table-column label="父菜单ID" min-width="165" prop="parentId"/>
          <el-table-column label="菜单icon" min-width="80" prop="icon">
            <template #default="scope">
              <el-icon>
                <component :is="scope.row.icon"></component>
              </el-icon>
            </template>
          </el-table-column>
          <el-table-column label="排序" min-width="66" prop="orderNum"/>
          <el-table-column label="权限标识" min-width="260" prop="perms"/>
          <el-table-column label="组件路径" min-width="200" prop="path"/>
          <el-table-column label="状态" min-width="66" prop="status"/>
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
          <el-table-column label="备注" prop="remark">
            <template #default="scope">
              <el-text truncated>{{ scope.row.remark }}</el-text>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="139">
            <template #default="scope">
              <el-button link size="small" type="primary" @click="getInfo(scope.row)">详情</el-button>
              <el-button link size="small" type="primary" @click="editMenu(scope.row)">修改</el-button>
              <el-button link size="small" type="primary">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {queryByPageRequest, queryMenuTreeRequest} from "/src/axios/api/menuApi.ts";
import {Menu, MenuCondition} from "/src/axios/api/type/Menu.ts";
import {status} from "/src/data/option.ts";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import {useMenuDialogDataStore} from "/src/pinia/module/menu/useMenuDialogDataStore.ts";
import AddDialog from "/src/components/layout/rightSection/main/views/system/menu/AddDialog.vue";
import InfoDialog from "/src/components/layout/rightSection/main/views/system/menu/InfoDialog.vue";
import {cloneDeep} from "lodash-es";
import EditDialog from "/src/components/layout/rightSection/main/views/system/menu/EditDialog.vue";
import {useMenuStore} from "/src/pinia/module/menu/useMenuStore.ts";
import {SpringPage} from "/src/axios/api/type/Page.ts";

queryMenuTreeRequest().then((res: Menu[]) => {
  useMenuStore().tableData = res
})

const addMenu = () => {
  useMenuDialogDataStore().menuDialogVisibleForAdd = true
}

const getInfo = (data: Menu) => {
  useMenuDialogDataStore().menuDialogRaw = data
  useMenuDialogDataStore().menuDialogVisibleForInfo = true
}

const editMenu = (data: Menu) => {
  useMenuDialogDataStore().menuDialogRaw = cloneDeep(data)
  useMenuDialogDataStore().menuDialogVisibleForEdit = true
}

const queryByCondition = () => {
  queryByPageRequest(
      new MenuCondition(
          0,
          useMenuStore().menuName,
          useMenuStore().statusForSelect,
      )
  ).then(
      (res: SpringPage<Menu>) => {
        useMenuStore().lastQueryMenuName = useMenuStore().menuName
        useMenuStore().lastQueryStatusForSelect = useMenuStore().statusForSelect
        useMenuStore().tableData = res.content
        useMenuStore().totalPages = res.totalPages
      }
  )
}

const resetData = () => {
  useMenuStore().$reset()
  queryMenuTreeRequest().then((res: Menu[]) => {
    useMenuStore().tableData = res
  })
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
  }

  .el-pagination {
    @include pagination.paginationTheme;
  }
}
</style>