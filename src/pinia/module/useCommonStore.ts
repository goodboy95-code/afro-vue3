import {defineStore} from 'pinia'
import {RoleMenu} from "/src/axios/api/type/RoleMenu.ts";
import Utils from "/src/utils/Utils.ts";
import {UserRoleMenu} from "/src/axios/api/type/UserRoleMenu.ts";
import {UserRole} from "/src/axios/api/type/UserRole.ts";
import {RoleDepartment} from "/src/axios/api/type/RoleDepartment.ts";


export const useCommonStore = defineStore('common', {
    // 其他配置...
    state: () => {return {}},
    getters: {},
    actions: {
        setUserRole(roleIds: number[], userId: number){
            let userRoleList: UserRole[] = [];
            for (const roleId of roleIds) {
                userRoleList.push(new UserRole(userId, roleId))
            }
            return userRoleList;
        },
        setRoleMenu(arr: number[][], roleId: number) {
            let roleMenuList: RoleMenu[] = [];
            let menuIds = Utils.handleArray(arr);
            for (const menuId of menuIds) {
                roleMenuList.push(new RoleMenu(roleId, menuId))
            }
            return roleMenuList;
        },
        setRoleDepartment(departmentIds: number[], roleId: number){
            let userRoleList: RoleDepartment[] = [];
            for (const departmentId of departmentIds) {
                userRoleList.push(new RoleDepartment(roleId, departmentId))
            }
            return userRoleList;
        },
        setUserRoleMenu(arr: number[][] | number[] | number, roleId: number, userId: number): UserRoleMenu[] {
            let userRoleMenuList: UserRoleMenu[] = [];
            if (Array.isArray(arr)) {
                if (arr.length > 0 && Array.isArray(arr[0])) {
                    // 当arr是二维数组时
                    let menuIds: number[] = Utils.handleArray(arr as number[][]);
                    for (const menuId of menuIds) {
                        userRoleMenuList.push(new UserRoleMenu(userId, roleId, menuId));
                    }
                } else {
                    // 当arr是一维数组时
                    for (const menuId of arr as number[]) {
                        userRoleMenuList.push(new UserRoleMenu(userId, roleId, menuId));
                    }
                }
            } else {
                // 当arr是单个数字时
                userRoleMenuList.push(new UserRoleMenu(userId, roleId, arr as number));
            }
            return userRoleMenuList;
        }

    }
})
