import {defineStore} from 'pinia'
import {Role} from "/src/axios/api/type/Role.ts";

interface UseDialogDataStore {
    // 角色信息对话框开关
    roleDialogVisibleForInfo: boolean,
    // 角色信息编辑对话框开关
    roleDialogVisibleForEdit: boolean,
    // 角色信息删除对话框开关
    roleDialogVisibleForDelete: boolean,
    // 角色信息添加对话框开关
    roleDialogVisibleForAdd: boolean,
    // 角色信息内容
    roleDialogRaw: Role
    // 添加角色
    roleDialogRawForAdd: Role
    //添加菜单对话框开关
    roleDialogVisibleForAddMenu: boolean,
}

export const useRoleDialogDataStore = defineStore('roleDialogData', {
    // 其他配置...
    state: (): UseDialogDataStore => {
        return {
            roleDialogVisibleForInfo: false,
            roleDialogVisibleForEdit: false,
            roleDialogVisibleForDelete: false,
            roleDialogVisibleForAdd: false,
            roleDialogRaw: undefined,
            roleDialogRawForAdd: new Role(),
            roleDialogVisibleForAddMenu: false
        }
    },
    getters: {},
    actions: {
        // 生成路由
    }
})
