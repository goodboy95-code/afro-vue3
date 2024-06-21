<template>
  <el-dialog
      v-model="useDepartmentDialogDataStore().departmentDialogVisibleForAdd"
      :before-close="handleClose"
      :width="useResponsiveLayoutStore().isMobile?'90%':'60%'"
      title="添加部门信息"
  >
    <el-form ref="editDepartmentRef"
             :inline="true"
             :model="useDepartmentDialogDataStore().departmentDialogRawForAdd"
             :rules="rulesForDepartment"
             label-width="100px"
    >
      <el-row>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="父部门ID" prop="parentId">
            <el-input v-model="useDepartmentDialogDataStore().departmentDialogRawForAdd.parentId" clearable
                      placeholder="父部门ID"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="祖级列表" prop="ancestors">
            <el-input v-model="useDepartmentDialogDataStore().departmentDialogRawForAdd.ancestors" clearable
                      placeholder="祖级列表"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="部门名称" prop="departmentName">
            <el-input v-model="useDepartmentDialogDataStore().departmentDialogRawForAdd.departmentName" clearable
                      placeholder="部门名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="显示顺序" prop="orderNum">
            <el-input v-model="useDepartmentDialogDataStore().departmentDialogRawForAdd.orderNum" clearable
                      placeholder="显示顺序"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="负责人" prop="leader">
            <el-input v-model="useDepartmentDialogDataStore().departmentDialogRawForAdd.leader" clearable
                      placeholder="负责人"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="负责人电话" prop="phone">
            <el-input v-model="useDepartmentDialogDataStore().departmentDialogRawForAdd.phone" clearable
                      placeholder="负责人电话"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="部门邮箱" prop="email">
            <el-input v-model="useDepartmentDialogDataStore().departmentDialogRawForAdd.email" clearable
                      placeholder="部门邮箱"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="部门状态" prop="status">
            <el-radio-group v-model="useDepartmentDialogDataStore().departmentDialogRawForAdd.status" class="ml-4">
              <el-radio label="0" size="large"> 正常</el-radio>
              <el-radio label="1" size="large"> 停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="删除标志" prop="delFlag">
            <el-input v-model="useDepartmentDialogDataStore().departmentDialogRawForAdd.delFlag" clearable
                      placeholder="删除标志"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="缩写" prop="abbreviation">
            <el-input v-model="useDepartmentDialogDataStore().departmentDialogRawForAdd.abbreviation" clearable
                      placeholder="缩写"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="useDepartmentDialogDataStore().departmentDialogVisibleForAdd = false">取消</el-button>
        <el-button type="primary" @click="addDepartmentForm(addDepartmentRef)">
          添加
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {useDepartmentDialogDataStore} from "/src/pinia/module/department/useDepartmentDialogDataStore.ts";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import {ref} from "vue";
import {ElMessage, FormInstance} from "element-plus";
import {addRequest} from "/src/axios/api/departmentApi.ts";
import {Department} from "/src/axios/api/type/Department.ts";
import {isEmpty, isEqual} from "lodash-es";
import {rulesForDepartment} from "/src/components/layout/rightSection/main/views/system/department/departmentData.ts";

const handleClose = (done: () => void) => {
  done()
}

const addDepartmentRef = ref<FormInstance>()
const addDepartmentForm = (formEl: FormInstance | undefined) => {
  formEl.validate((valid) => {
    if (valid) {
      addRequest(useDepartmentDialogDataStore().departmentDialogRawForAdd).then((res: number) => {
        if (isEqual(res, 1)) {
          ElMessage({
            message: '添加用户角色成功',
            type: 'success',
          })
          useDepartmentDialogDataStore().departmentDialogVisibleForAdd = false
        }
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
