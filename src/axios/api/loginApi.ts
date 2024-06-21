import request from "/src/axios/request.ts";
import {Login, LoginCondition} from "/src/axios/api/type/Login.ts";

/**
 * @description 登录
 * @param loginCondition 登录条件
 * @return Promise<Login> 登录成功后返回信息
 */
export function loginRequest(loginCondition: LoginCondition) {
    return request<Login, Login, LoginCondition>({
        url: '/login',
        method: 'post',
        timeout: 20000,
        headers: {
            isToken: false
        },
        data: loginCondition
    })
}

/**
 *  @description 登出
 *  @return Promise<string> 登出成功后返回信息
 */
export function logoutRequest() {
    return request<string, string>({
        url: '/logout',
        method: 'post'
    })
}
