import request from "/src/axios/request.ts";
import {RegisterCondition} from "/src/axios/api/type/Register.ts";
import {SmsInfo} from "/src/axios/api/type/SmsInfo.ts";

/**
 * @description 注册
 * @param registerCondition 注册条件
 * @return Promise<Register> 注册成功后返回信息
 */
export function registerRequest(registerCondition: RegisterCondition) {
    return request<string, string, RegisterCondition>({
        url: '/register',
        method: 'post',
        timeout: 20000,
        headers: {
            isToken: false
        },
        data: registerCondition
    })
}


/**
 * @description 发送短信验证码
 * @param phoneNumber 手机号码
 * @return Promise<Register> 注册成功后返回信息
 */
export function sendRequest(phoneNumber: string) {
    return request<SmsInfo, SmsInfo>({
        url: '/sms/send',
        method: 'get',
        timeout: 20000,
        headers: {
            isToken: false
        },
        params: {phoneNumber}
    })
}

