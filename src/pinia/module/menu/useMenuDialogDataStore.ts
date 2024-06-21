import {defineStore} from 'pinia'
import {Menu} from "/src/axios/api/type/Menu.ts";

interface UseDialogDataStore {
    // 菜单信息对话框开关
    menuDialogVisibleForInfo: boolean,
    // 菜单信息编辑对话框开关
    menuDialogVisibleForEdit: boolean,
    // 菜单信息删除对话框开关
    menuDialogVisibleForDelete: boolean,
    // 菜单信息添加对话框开关
    menuDialogVisibleForAdd: boolean,
    // 菜单信息内容
    menuDialogRaw: Menu
    // 菜单信息内容
    menuDialogRawForAdd: Menu
}

export const useMenuDialogDataStore = defineStore('menuDialogData', {
    // 其他配置...
    state: (): UseDialogDataStore => {
        return {
            menuDialogVisibleForInfo: false,
            menuDialogVisibleForEdit: false,
            menuDialogVisibleForDelete: false,
            menuDialogVisibleForAdd: false,
            menuDialogRaw: undefined,
            menuDialogRawForAdd: new Menu(),
        }
    },
    getters: {},
    actions: {
        // 生成路由
    }
})
