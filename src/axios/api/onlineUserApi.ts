import request from "/src/axios/request.ts";
import {OnlineUser, OnlineUserCondition} from "/src/axios/api/type/OnlineUser.ts";
import Utils from "/src/utils/Utils.ts";

/**
 * @description 通过用户ip和用户名获取在线用户列表
 * @return Promise<OnlineUser[]> 在线用户列表
 */
export const queryByConditionRequest = (onlineUserCondition: OnlineUserCondition) => {
    const params: OnlineUserCondition = {};
    if (!Utils.isEmpty(onlineUserCondition.ipAddress)) {
        params.ipAddress = onlineUserCondition.ipAddress;
    }
    if (!Utils.isEmpty(onlineUserCondition.userName)) {
        params.userName = onlineUserCondition.userName;
    }

    return request<OnlineUser[], OnlineUser[]>({
        url: '/monitor/queryByCondition',
        method: 'get',
        headers: {
            isToken: true
        },
        params: params
    })
}
/**
 * @description 强制退出用户
 * @return Promise<number> 退出个数
 */
export const forceLogoutRequest = (tokenId: string) => {
    return request<number, number>({
        url: '/monitor/forceLogout',
        method: 'delete',
        headers: {
            isToken: true
        },
        params: {tokenId}
    })
}