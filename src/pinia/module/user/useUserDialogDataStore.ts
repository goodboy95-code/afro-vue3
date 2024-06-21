import {defineStore} from 'pinia'
import {AddUserForm, User} from "/src/axios/api/type/User.ts";

interface UseUserDialogDataStore {
    // 用户信息对话框开关
    userDialogVisibleForInfo: boolean,
    // 用户信息编辑对话框开关
    userDialogVisibleForEdit: boolean,
    // 用户信息删除对话框开关
    userDialogVisibleForDelete: boolean,
    // 用户信息添加对话框开关
    userDialogVisibleForAdd: boolean,
    // 用户信息
    userDialogRaw: User
    // 添加用户
    userDialogRawForAdd: AddUserForm
}

export const useUserDialogDataStore = defineStore('dialogData', {
    // 其他配置...
    state: (): UseUserDialogDataStore => {
        return {
            userDialogVisibleForInfo: false,
            userDialogVisibleForEdit: false,
            userDialogVisibleForDelete: false,
            userDialogVisibleForAdd: false,
            userDialogRaw: undefined,
            userDialogRawForAdd: new AddUserForm(),
        }
    },
    getters: {},
    actions: {
        // 生成路由
    }
})
