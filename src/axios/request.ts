import axios from 'axios'
import {getItem, getItemWithExpiration, selectedRole, TokenKey} from "/src/utils/LocalStorage.ts";
import {ElMessage, ElMessageBox} from "element-plus";
import {useUserStore} from "/src/pinia/module/user/useUserStore.ts";
import {has, isNumber, isString, toNumber} from "lodash-es";
import {Role} from "/src/axios/api/type/Role.ts";
import Utils from "/src/utils/Utils.ts";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const request = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: '/afro',
    // 超时
    timeout: 10000,
})
request.interceptors.request.use(config => {
        if (config.headers && config.headers.isToken) {
            if (getItemWithExpiration(TokenKey)) {
                config.headers['Authorization'] = getItemWithExpiration<string>(TokenKey).value
                let role = getItem<Role>(selectedRole);
                if (!Utils.isEmpty(role)) {
                    config.headers['RoleId'] = role.roleId
                }
            }
        } else {
            // isToken不为true的逻辑处理
        }
        return config;
    }
)

request.interceptors.response.use(onFulfilled => {
        // 未设置状态码则默认 1129 状态
        if (onFulfilled.status == 200) {
            let code = 200
            if (has(onFulfilled.data, 'statusCodeValue')) {
                if (isString(onFulfilled.data.statusCodeValue)) {
                    // 如果是string，使用lodash的toNumber函数将其转换为number
                    code = toNumber(onFulfilled.data.statusCodeValue);
                } else if (isNumber(onFulfilled.data.statusCodeValue)) {
                    code = onFulfilled.data.statusCodeValue
                }
            }
            // 获取错误信息
            //const msg = onFulfilled.statusText || errorCodes[code] || errorCodes['default']
            switch (code) {
                case 200:
                    return Promise.resolve(onFulfilled.data)
                case 401:
                    ElMessageBox.confirm(
                        '登录状态已过期，您可以继续留在该页面，或者重新登录', 'info',
                        {
                            confirmButtonText: '重新登录',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }
                    ).then(() => {
                        useUserStore().logOut().then(() => {
                            location.href = '/login';
                        })
                    });
                    return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
                case 404:
                    ElMessage({message: onFulfilled.data.body, type: 'error'})
                    return Promise.reject(new Error("404异常"))
                case 500:
                    ElMessage({message: "500异常", type: 'error'})
                    return Promise.reject(new Error("500异常"))
                case 601:
                    ElMessage({message: "601异常", type: 'warning'})
                    return Promise.reject('601异常')
                case 1129:
                    ElMessage({message: "1129异常", type: 'warning'})
                    return Promise.reject(new Error("1129异常"))
                default:
                    ElMessage.error({message: "未知异常"})
                    return Promise.reject("未知异常")
            }
        }
    },
    onRejected => {
        let {message, response} = onRejected;
        if (message == "Network Error") {
            message = "后端接口连接异常";
        } else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        } else if (message.includes("Request failed with status code")) {
            message = response.data;
        }
        ElMessage({message: message, type: 'error', duration: 5 * 1000})
        return Promise.reject(onRejected)
    });
export default request
