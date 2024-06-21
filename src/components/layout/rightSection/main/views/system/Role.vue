<template>
  <InfoDialog/>
  <EditDialog/>
  <AddDialog/>
  <AddRoleMenu/>
  <el-row :gutter="20" style="height: 100%">
    <el-col :span="24">
      <el-card shadow="never">
        <el-row :gutter="10">
          <el-col :span="9" :xs="10">
            <el-input v-model="useRoleStore().roleName" placeholder="请输入角色名称"/>
          </el-col>
          <el-col :span="4" :xs="9">
            <el-select v-model="useRoleStore().statusForSelect" clearable placeholder="角色状态">
              <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="2" :xs="4">
            <el-button type="primary" @click="queryByCondition">确定</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card shadow="never">
        <el-button style="margin-bottom: 10px" type="primary" @click="addRole">添加角色</el-button>
        <el-table :data="useRoleStore().tableData" style="width: 100%" table-layout="auto">
          <el-table-column :width="useResponsiveLayoutStore().isMobile?90:165" fixed="left" label="角色ID"
                           prop="roleId"/>
          <el-table-column label="角色名称" prop="roleName" width="165"/>
          <el-table-column label="显示顺序" prop="roleSort" width="100"/>
          <el-table-column label="创建时间" prop="createTime" width="100">
            <template #default="scope">
              <el-text truncated>{{ scope.row.createTime }}</el-text>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="status" width="159">
            <template #default="prop">
              <el-switch v-model="prop.row.status"
                         active-text="正常" active-value="0"
                         inactive-text="停用"
                         inactive-value="1"
                         @change="currentRoleStatus"/>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="139">
            <template v-if="useResponsiveLayoutStore().isMobile" #default="scope">
              <el-button link size="small" type="primary" @click="getInfo(scope.row)">详情</el-button>
              <el-dropdown>
                <el-button link size="small" type="primary">
                  <el-icon class="el-icon--right">
                    <arrow-down/>
                  </el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      <el-button link size="small" type="primary" @click="editRole(scope.row)">编辑</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button link size="small" type="primary" @click="deleteRole(scope.row)">删除</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button link size="small" type="primary" @click="addRoleMenu(scope.row)">
                        添加菜单
                      </el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
            <template v-else #default="scope">
              <el-button link size="small" type="primary" @click="getInfo(scope.row)">详情</el-button>
              <el-button link size="small" type="primary" @click="editRole(scope.row)">编辑</el-button>
              <el-button link size="small" type="primary" @click="deleteRole(scope.row)">删除</el-button>
              <el-button link size="small" type="primary" @click="addRoleMenu(scope.row)">
                添加菜单
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="useRoleStore().pageNumber+1"
                       :page-count="useRoleStore().totalPages"
                       :page-size="useRoleStore().pageSize"
                       :pager-count="useRoleStore().pagerCount"
                       background
                       layout="prev, pager, next"
                       @current-change="currentChange"
        />
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {deleteByIdRequest, queryByPageRequest} from "/src/axios/api/roleApi.ts";
import {SpringPage} from "/src/axios/api/type/Page.ts";
import {Role, RoleCondition} from "/src/axios/api/type/Role.ts";
import {useRoleDialogDataStore} from "/src/pinia/module/role/useRoleDialogDataStore.ts";
import InfoDialog from "/src/components/layout/rightSection/main/views/system/role/InfoDialog.vue";
import EditDialog from "/src/components/layout/rightSection/main/views/system/role/EditDialog.vue";
import {useRoleStore} from "/src/pinia/module/role/useRoleStore.ts";
import Utils from "/src/utils/Utils.ts";
import {cloneDeep} from "lodash-es";
import {status} from "/src/data/option.ts";
import AddDialog from "/src/components/layout/rightSection/main/views/system/role/AddDialog.vue";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import AddRoleMenu from "/src/components/layout/rightSection/main/views/system/role/AddRoleMenuDialog.vue";
import {queryMenuTreeBDMByRoleIdRequest, queryMenuTreeBDMRequest,} from "/src/axios/api/menuApi.ts";
import {Menu} from "/src/axios/api/type/Menu.ts";
import {useMenuStore} from "/src/pinia/module/menu/useMenuStore.ts";
import {ElMessage} from "element-plus";
import {queryByRoleIdRequest} from "/src/axios/api/roleDepartmentApi.ts";
import {RoleDepartment} from "/src/axios/api/type/RoleDepartment.ts";
import {useDepartmentStore} from "/src/pinia/module/department/useDepartmentStore.ts";
import {ArrowDown} from "@element-plus/icons-vue";

queryByPageRequest(
    new RoleCondition(
        0
    )
).then((res: SpringPage<Role>) => {
  useRoleStore().tableData = res.content
  useRoleStore().totalPages = res.totalPages
})

const addRole = () => {
  useRoleDialogDataStore().roleDialogVisibleForAdd = true
}

const deleteRole = (data: Role) => {
  deleteByIdRequest(data.roleId).then((res: number) => {
    if (res) {
      ElMessage.success("删除成功")
    }
  })
}
const editRole = (data: Role) => {
  useRoleStore().tableRoleId = data.roleId
  queryByRoleIdRequest(data.roleId).then((res: RoleDepartment[]) => {
    if (!Utils.isEmpty(res)) {
      useDepartmentStore().ownedDepartmentIds = useDepartmentStore().selectedDepartmentIds = res.map(item => item.departmentId)
    }
    useRoleDialogDataStore().roleDialogRaw = cloneDeep(data)
    useRoleDialogDataStore().roleDialogVisibleForEdit = true
  })
}
const getInfo = (data: Role) => {
  useRoleDialogDataStore().roleDialogRaw = data
  useRoleDialogDataStore().roleDialogVisibleForInfo = true
}

const addRoleMenu = (data: Role) => {
  useRoleStore().tableRoleId = data.roleId
  queryMenuTreeBDMRequest().then((res: Menu) => {
    useMenuStore().allMenus = [res]
    queryMenuTreeBDMByRoleIdRequest(data.roleId).then((res: Menu) => {
      if (!Utils.isEmpty(res)) {
        let flattenMenuId = Utils.flattenMenuId(res);
        useMenuStore().selectedMenuIds = useMenuStore().owningMenuIds = flattenMenuId
      }
      useRoleDialogDataStore().roleDialogVisibleForAddMenu = true
    })
  })
}
//条件获取角色列表
const queryByCondition = () => {
  queryByPageRequest(
      new RoleCondition(
          0,
          useRoleStore().roleName,
          useRoleStore().statusForSelect,
      )
  ).then(
      (res: SpringPage<Role>) => {
        useRoleStore().lastQueryRoleName = useRoleStore().roleName
        useRoleStore().lastQueryStatusForSelect = useRoleStore().statusForSelect
        useRoleStore().tableData = res.content
        useRoleStore().totalPages = res.totalPages
      }
  )
}
const currentChange = (pageNumber: number) => {
  if (!Utils.isEmpty(useRoleStore().tableData)) {
    queryByPageRequest(
        new RoleCondition(
            pageNumber - 1,
            useRoleStore().lastQueryRoleName,
            useRoleStore().lastQueryStatusForSelect,
        )
    ).then(
        (res: SpringPage<Role>) => {
          useRoleStore().pageNumber = pageNumber - 1
          useRoleStore().tableData = res.content
          useRoleStore().totalPages = res.totalPages
        }
    )
  }
}
const currentRoleStatus = (pageNumber: number) => {
  console.log(pageNumber)
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