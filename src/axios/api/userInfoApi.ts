import request from "/src/axios/request.ts";
import {UserInfo} from "/src/axios/api/type/UserInfo.ts";
import {useUserInfoStore} from "/src/pinia/module/userInfo/useUserInfoStore.ts";

export const editUserInfoRequest = (useInfo:UserInfo) => {
    return request<UserInfo, UserInfo>({
        url: '/editUserInfo',
        method: 'put',
        headers: {
            isToken: true
        },
        data: useInfo
    })
}

/**
 * @description 获取用户身份信息
 * @return Promise<UserInfo> 用户身份信息
 */
export const getInfoRequest = () => {
    return request<UserInfo, UserInfo>({
        url: '/getInfo',
        method: 'get',
        headers: {
            isToken: true
        },
    })
}

export const getAvatarRequest = () => {
    return request<string, Blob>({
        url: useUserInfoStore().userInfo.user.avatar,
        method: 'get',
        responseType: 'blob',
        headers: {
            isToken: true
        },
    })
}
