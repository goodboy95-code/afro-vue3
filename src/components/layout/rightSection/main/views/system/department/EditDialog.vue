<template>
  <el-dialog
      v-model="useDepartmentDialogDataStore().departmentDialogVisibleForEdit"
      :before-close="handleClose"
      :width="useResponsiveLayoutStore().isMobile?'90%':'60%'"
      class="dialog-edit"
      title="修改部门信息"
  >
    <el-form ref="editDepartmentRef"
             :inline="true"
             :model="useDepartmentDialogDataStore().departmentDialogRaw"
             :rules="rulesForDepartment"
             label-width="100px">
      <el-row>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="父部门ID" prop="parentId">
            <el-input v-model="useDepartmentDialogDataStore().departmentDialogRaw.parentId" clearable
                      placeholder="父部门ID"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="祖级列表" prop="ancestors">
            <el-input v-model="useDepartmentDialogDataStore().departmentDialogRaw.ancestors" clearable
                      placeholder="祖级列表"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="部门名称" prop="departmentName">
            <el-input v-model="useDepartmentDialogDataStore().departmentDialogRaw.departmentName" clearable
                      placeholder="部门名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="显示顺序" prop="orderNum">
            <el-input v-model="useDepartmentDialogDataStore().departmentDialogRaw.orderNum" clearable
                      placeholder="显示顺序"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="负责人" prop="leader">
            <el-input v-model="useDepartmentDialogDataStore().departmentDialogRaw.leader" clearable
                      placeholder="负责人"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="负责人电话" prop="phone">
            <el-input v-model="useDepartmentDialogDataStore().departmentDialogRaw.phone" clearable
                      placeholder="负责人电话"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="部门邮箱" prop="email">
            <el-input v-model="useDepartmentDialogDataStore().departmentDialogRaw.email" clearable
                      placeholder="部门邮箱"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="部门状态" prop="status">
            <el-radio-group v-model="useDepartmentDialogDataStore().departmentDialogRaw.status" class="ml-4">
              <el-radio label="0" size="large"> 正常</el-radio>
              <el-radio label="1" size="large"> 停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="删除标志" prop="delFlag">
            <el-input v-model="useDepartmentDialogDataStore().departmentDialogRaw.delFlag" clearable
                      placeholder="删除标志"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="缩写" prop="abbreviation">
            <el-input v-model="useDepartmentDialogDataStore().departmentDialogRaw.abbreviation" clearable
                      placeholder="缩写"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="useDepartmentDialogDataStore().departmentDialogVisibleForEdit = false">取消</el-button>
        <el-button type="primary" @click="editDepartment(editDepartmentRef)">
          修改
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {useDepartmentDialogDataStore} from "/src/pinia/module/department/useDepartmentDialogDataStore.ts";
import {editRequest, queryByPageRequest} from "/src/axios/api/departmentApi.ts";
import {ElMessage, FormInstance} from "element-plus";
import {SpringPage} from "/src/axios/api/type/Page.ts";
import {Department, DepartmentCondition} from "/src/axios/api/type/Department.ts";
import {useDepartmentStore} from "/src/pinia/module/department/useDepartmentStore.ts";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import {ref} from "vue";
import {rulesForDepartment} from "/src/components/layout/rightSection/main/views/system/department/departmentData.ts";

const handleClose = (done: () => void) => {
  done()
}

const editDepartmentRef = ref<FormInstance>()

const editDepartment = (formEl: FormInstance | undefined) => {
  formEl.validate((valid) => {
    if (valid) {
      editRequest(useDepartmentDialogDataStore().departmentDialogRaw).then(
          () => {
            ElMessage({
              message: '修改部门信息成功',
              type: 'success',
            })
            queryByPageRequest(
                new DepartmentCondition(
                    useDepartmentStore().pageNumber,
                    useDepartmentStore().departmentName,
                    useDepartmentStore().lastQueryStatusForSelect,
                )
            ).then(
                (res: SpringPage<Department>) => {
                  useDepartmentStore().tableData = res.content
                  useDepartmentStore().totalPages = res.totalPages
                }
            )
            useDepartmentDialogDataStore().departmentDialogVisibleForEdit = false
          },
      )
    }
  })
}
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.dialog-edit {
  border-radius: .75rem
}
</style>
