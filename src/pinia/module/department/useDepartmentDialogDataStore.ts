import {defineStore} from 'pinia'
import {Department} from "/src/axios/api/type/Department.ts";

interface UseDialogDataStore {
    // 部门信息对话框开关
    departmentDialogVisibleForInfo: boolean,
    // 部门信息编辑对话框开关
    departmentDialogVisibleForEdit: boolean,
    // 部门信息删除对话框开关
    departmentDialogVisibleForDelete: boolean,
    // 部门信息添加对话框开关
    departmentDialogVisibleForAdd: boolean,
    // 部门信息内容
    departmentDialogRaw: Department
    departmentDialogRawForAdd: Department
}

export const useDepartmentDialogDataStore = defineStore('departmentDialogData', {
    // 其他配置...
    state: (): UseDialogDataStore => {
        return {
            departmentDialogVisibleForInfo: false,
            departmentDialogVisibleForEdit: false,
            departmentDialogVisibleForDelete: false,
            departmentDialogVisibleForAdd: false,
            departmentDialogRaw: undefined,
            departmentDialogRawForAdd: new Department()
        }
    },
    getters: {},
    actions: {
        // 生成路由
    }
})
