import {defineStore} from 'pinia'
import {OnlineUser} from "/src/axios/api/type/OnlineUser.ts";
import {forceLogoutRequest} from "/src/axios/api/onlineUserApi.ts";

interface UseOnlineUserStore {
    // IP地址
    ipAddress: string,
    // 用户名
    userName: string,

    // 最后一次查询的IP地址
    lastQueryIpAddress: string,
    // 最后一次查询的用户名
    lastQueryUserName: string,

    //表格数据
    tableData: OnlineUser[],

    //  当前页码
    pageNumber: number,
    //  总页数
    totalPages: number,
    //  最大页码按钮数
    pagerCount: number,
    //  每一页最大条数
    pageSize: number,
}

export const useOnlineUserStore = defineStore('onlineUser', {
    // 其他配置...
    state: (): UseOnlineUserStore => {
        return {
            ipAddress: '',
            userName: '',

            // 最后一次查询的IP地址
            lastQueryIpAddress: '',
            // 最后一次查询的用户名
            lastQueryUserName: '',

            //表格数据
            tableData: undefined,

            //  当前页码
            pageNumber: undefined,
            //  总页数
            totalPages: undefined,
            //  最大页码按钮数
            pagerCount: undefined,
            //  每一页最大条数
            pageSize: undefined,
        }
    },
    getters: {},
    actions: {
        forceLogout(tokenId: string) {
            return new Promise<string>((resolve, reject) => {
                forceLogoutRequest(tokenId).then(() => {
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
})
