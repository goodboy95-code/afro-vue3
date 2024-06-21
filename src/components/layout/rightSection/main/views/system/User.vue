<template>
  <InfoDialog/>
  <EditDialog/>
  <AddDialog/>
  <el-row :gutter="20" style="height: 100%">
    <el-col :span="6" :xs="24">
      <el-card shadow="never">
        <template #header>
          <span>部门列表</span>
        </template>
        <el-tree :class="{'is-mobile':useResponsiveLayoutStore().isMobile}"
                 :data="useDepartmentStore().departmentTree"
                 current-node-key=[1]
                 default-expand-all
                 node-key="id"
                 @node-click="handleNodeClick"/>
      </el-card>
    </el-col>
    <el-col :span="18" :xs="24">
      <el-card shadow="never">
        <el-row :gutter="10">
          <el-col :span="9" :xs="12">
            <el-input v-model="useUserStore().userName" placeholder="请输入用户名"/>
          </el-col>
          <el-col :span="9" :xs="12">
            <el-input v-model="useUserStore().phoneNumber" placeholder="请输入手机号"/>
          </el-col>
          <el-col :class="{'is-mobile':useResponsiveLayoutStore().isMobile}" :span="4" :xs="12">
            <el-select v-model="useUserStore().statusForSelect" placeholder="用户状态">
              <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :class="{'is-mobile':useResponsiveLayoutStore().isMobile}" :span="2" :xs="12">
            <el-button type="primary" @click="queryByCondition">确定</el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <el-button style="margin-bottom: 10px" type="primary" @click="addUser">添加用户</el-button>
        <el-table :data="useUserStore().tableData">
          <el-table-column :width="useResponsiveLayoutStore().isMobile?90:165" fixed="left" label="用户ID"
                           prop="userId">
            <template #default="scope">
              <el-text truncated>{{ scope.row.userId }}</el-text>
            </template>
          </el-table-column>
          <el-table-column label="用户名" prop="userName" width="100"/>
          <el-table-column label="昵称" prop="nickName" width="165">
            <template #default="scope">
              <el-text truncated>{{ scope.row.nickName }}</el-text>
            </template>
          </el-table-column>
          <el-table-column label="电子邮件" prop="email" width="80">
            <template #default="scope">
              <el-text truncated>{{ scope.row.email }}</el-text>
            </template>
          </el-table-column>
          <el-table-column label="电话" prop="phoneNumber" width="100">
            <template #default="scope">
              <el-text truncated>{{ scope.row.phoneNumber }}</el-text>
            </template>
          </el-table-column>
          <el-table-column label="年龄" prop="age" width="52"/>
          <el-table-column label="性别" prop="sex" width="52">
            <template #default="scope">
              <el-text v-if="scope.row.sex=='M'" truncated>男</el-text>
              <el-text v-else-if="scope.row.sex=='F'" truncated>女</el-text>
              <el-text v-else truncated>未知</el-text>
            </template>
          </el-table-column>
          <el-table-column label="头像" prop="avatar" width="100">
            <template #default="scope">
              <el-text truncated>{{ scope.row.avatar }}</el-text>
            </template>
          </el-table-column>
          <el-table-column label="账号状态" prop="status" width="80"/>
          <el-table-column label="删除标志" prop="delFlag" width="80"/>
          <el-table-column label="登录IP" prop="loginIp" width="100">
            <template #default="scope">
              <el-text truncated>{{ scope.row.loginIp }}</el-text>
            </template>
          </el-table-column>
          <el-table-column label="最后登录日期" prop="loginDate" width="107">
            <template #default="scope">
              <el-text truncated>{{ scope.row.loginDate }}</el-text>
            </template>
          </el-table-column>
          <el-table-column label="创建者" prop="createBy" width="100">
            <template #default="scope">
              <el-text truncated>{{ scope.row.createBy }}</el-text>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="createTime" width="100">
            <template #default="scope">
              <el-text truncated>{{ scope.row.createTime }}</el-text>
            </template>
          </el-table-column>
          <el-table-column label="更新者" prop="updateBy" width="100">
            <template #default="scope">
              <el-text truncated>{{ scope.row.updateBy }}</el-text>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" prop="updateTime" width="100">
            <template #default="scope">
              <el-text truncated>{{ scope.row.updateTime }}</el-text>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="remark" width="100">
            <template #default="scope">
              <el-text truncated>{{ scope.row.remark }}</el-text>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="138">
            <template #default="scope">
              <el-button link size="small" type="primary" @click="getInfo(scope.row)">详情</el-button>
              <el-button link size="small" type="primary" @click="editUser(scope.row)">编辑</el-button>
              <el-button link size="small" type="primary" @click="deleteUser(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="useUserStore().pageNumber+1"
                       :page-count="useUserStore().totalPages"
                       :page-size="useUserStore().pageSize"
                       :pager-count="useUserStore().pagerCount"
                       background
                       layout="prev, pager, next"
                       @current-change="currentChange"/>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {deleteByIdRequest, queryByDepartmentIdRequest} from "/src/axios/api/userApi.ts";
import {User, UsersCondition} from "/src/axios/api/type/User.ts";
import {SpringPage} from "/src/axios/api/type/Page.ts";
import InfoDialog from "/src/components/layout/rightSection/main/views/system/user/InfoDialog.vue";
import {useUserDialogDataStore} from "/src/pinia/module/user/useUserDialogDataStore.ts";
import EditDialog from "/src/components/layout/rightSection/main/views/system/user/EditDialog.vue";
import {useRoleStore} from "/src/pinia/module/role/useRoleStore.ts";
import {useUserStore} from "/src/pinia/module/user/useUserStore.ts";
import Utils from "/src/utils/Utils.ts";
import {cloneDeep} from "lodash-es";
import {useDepartmentStore} from "/src/pinia/module/department/useDepartmentStore.ts";
import {DepartmentInfo} from "/src/axios/api/type/Department.ts";
import {status} from "/src/data/option.ts";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import AddDialog from "/src/components/layout/rightSection/main/views/system/user/AddDialog.vue";
import {ElMessage} from "element-plus";

//组件加载后获取用户列表
queryByDepartmentIdRequest(
    new UsersCondition(
        useUserStore().departmentId,
        0
    )
).then((res: SpringPage<User>) => {
  useUserStore().tableData = res.content
  useUserStore().totalPages = res.totalPages
})

const addUser = () => {
  useUserDialogDataStore().userDialogVisibleForAdd = true
  useRoleStore().getAllRoles()
}

const deleteUser = (data: User) => {
  deleteByIdRequest(data.userId).then((res: number) => {
    if (res) {
      ElMessage.success("删除成功")
    }
  })
}

//打开修改对话框
const editUser = (data: User) => {
  //修改userDialogRaw会影响data所以使用cloneDeep(data)
  useUserDialogDataStore().userDialogRaw = cloneDeep(data)
  useUserDialogDataStore().userDialogVisibleForEdit = true
  useRoleStore().getAllRoles()
  useRoleStore().getOwningRoles(data.userId)
}

//打开用户信息对话框
const getInfo = (data: User) => {
  useUserDialogDataStore().userDialogRaw = data
  useUserDialogDataStore().userDialogVisibleForInfo = true
}

//选中el-tree中的节点
const handleNodeClick = (data: DepartmentInfo) => {
  console.log(data)
  if (data.leaf) {
    queryByDepartmentIdRequest(
        new UsersCondition(
            data.value,
            0,
        )
    ).then((res: SpringPage<User>) => {
      useUserStore().tableData = res.content
      useUserStore().totalPages = res.totalPages
      useUserStore().departmentId = Number(data.value)
    })
  }
}

//条件获取用户列表
const queryByCondition = () => {
  queryByDepartmentIdRequest(
      new UsersCondition(
          useUserStore().departmentId,
          0,
          useUserStore().userName,
          useUserStore().statusForSelect,
          useUserStore().phoneNumber,
      )
  ).then(
      (res: SpringPage<User>) => {
        useUserStore().lastQueryUserName = useUserStore().userName
        useUserStore().lastQueryStatusForSelect = useUserStore().statusForSelect
        useUserStore().lastQueryPhoneNumber = useUserStore().phoneNumber
        useUserStore().tableData = res.content
        useUserStore().totalPages = res.totalPages
      }
  )
}

//改变当前页
const currentChange = (pageNumber: number) => {
  //如果tableData为空，条件查询 有数据->空数据 会触发currentChange
  if (!Utils.isEmpty(useUserStore().tableData)) {
    queryByDepartmentIdRequest(
        new UsersCondition(
            useUserStore().departmentId,
            pageNumber - 1,
            useUserStore().lastQueryUserName,
            useUserStore().lastQueryStatusForSelect,
            useUserStore().lastQueryPhoneNumber,
        )
    ).then(
        (res: SpringPage<User>) => {
          useUserStore().pageNumber = pageNumber - 1
          useUserStore().tableData = res.content
          useUserStore().totalPages = res.totalPages
          //useUserStore().pageSize = res.pageable.pageSize
        }
    )
  }
}
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/scss/card";
@use "/src/assets/styles/scss/table";
@use "/src/assets/styles/scss/tree";
@use "/src/assets/styles/scss/pagination";

.el-card {
  @include card.cardTheme;

  .el-col {
    &.is-mobile {
      margin-top: 5px;
    }
  }

  .el-tree {
    height: 500px;

    &.is-mobile {
      height: 100%;
    }

    @include tree.treeTheme;
  }

  @include tree.treeHighlightTheme;

  .el-table {
    @include table.tableTheme;
  }

  .el-pagination {
    @include pagination.paginationTheme;
  }
}
</style>