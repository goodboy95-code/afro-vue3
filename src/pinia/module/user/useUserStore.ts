import {defineStore} from 'pinia'
import {deleteItem, TokenKey} from "/src/utils/LocalStorage.ts";
import {logoutRequest} from "/src/axios/api/loginApi.ts";
import {User} from "/src/axios/api/type/User.ts";

interface UseUserStore {
    // 用户名
    userName: string,
    // 手机号
    phoneNumber: string,
    //  账号状态（0 正常）（1 停用）
    statusForSelect: string,

    // 最后一次查询的用户名
    lastQueryUserName: string,
    // 最后一次查询的手机号
    lastQueryPhoneNumber: string,
    //  最后一次查询的账号状态（0 正常）（1 停用）
    lastQueryStatusForSelect: string,

    //  表格数据
    tableData: User[],

    //  当前页码
    pageNumber: number,
    //  总页数
    totalPages: number,
    //  最大页码按钮数
    pagerCount: number,
    //  每一页最大条数
    pageSize: number,

    //  部门ID
    departmentId: number,

}

export const useUserStore = defineStore('user', {
    // 其他配置...
    state: (): UseUserStore => {
        return {
            userName: '',
            phoneNumber: '',
            statusForSelect: '0',

            lastQueryUserName: '',
            lastQueryPhoneNumber: '',
            lastQueryStatusForSelect: '',

            tableData: undefined,

            pageNumber: 1,
            totalPages: 0,
            pagerCount: 5,
            pageSize: 6,

            departmentId: undefined,
        }
    },
    getters: {
    },
    actions: {
        logOut() {
            return new Promise<string>((resolve, reject) => {
                logoutRequest().then(() => {
                    this.token = ''
                    deleteItem(TokenKey)
                    resolve('/login')
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
})
