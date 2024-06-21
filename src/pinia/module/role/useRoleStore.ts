import {defineStore} from 'pinia'
import {Role} from "/src/axios/api/type/Role.ts";
import {queryAllRequest, queryByUserIdRequest} from "/src/axios/api/roleApi.ts";
import {map} from "lodash-es";

interface UseRoleStore {
    //角色名称
    roleName: string,
    //账号状态（0 正常）（1 停用）
    statusForSelect: string,

    // 最后一次查询的角色名
    lastQueryRoleName: string,
    //  最后一次查询的角色状态
    lastQueryStatusForSelect: string,

    //  表格数据
    tableData: Role[],

    //  总页数
    totalPages: number,
    //  最大页码按钮数
    pagerCount: number,
    //  当前页码
    pageNumber: number,
    //  每一页最大条数
    pageSize: number,

    //系统所有角色
    allRoles: Role[],
    //用户拥有的角色Id
    owningRoleIds: number[],
    //当前被选中的角色Id
    selectedRoleIds: number[],
    //当前登录的角色
    selectedRole: Role,
    //当前打开的table角色Id
    tableRoleId: number,
}

export const useRoleStore = defineStore('role', {
    // 其他配置...
    state: (): UseRoleStore => {
        return {
            roleName: '',
            statusForSelect: '',

            lastQueryRoleName: '',
            lastQueryStatusForSelect: '',

            tableData: undefined,

            pageNumber: 1,
            totalPages: 0,
            pagerCount: 5,
            pageSize: 6,

            allRoles: undefined,
            owningRoleIds: undefined,
            selectedRoleIds: undefined,
            selectedRole: undefined,
            tableRoleId: undefined,
        }
    },
    getters: {},
    actions: {
        //获取系统所有角色
        getAllRoles() {
            queryAllRequest().then(res => {
                this.allRoles = res
            })
        },
        //获取用户拥有的角色Id
        getOwningRoles(userId: number) {
            queryByUserIdRequest(userId).then(res => {
                this.selectedRoleIds = this.owningRoleIds = map(res, (role: Role) => {
                    return role.roleId
                });
            })
        }
    }
})
