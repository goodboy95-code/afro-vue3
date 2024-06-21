import request from "/src/axios/request.ts";
import {CaptchaImage} from "/src/axios/api/type/CaptchaImage.ts";

/**
 * @description 获取验证码
 * @return Promise<CaptchaImage> 验证码
 */
export function getCaptchaImageRequest() {
    return request<CaptchaImage, CaptchaImage>({
        url: '/getCaptchaImage',
        method: 'get',
        timeout: 20000,
        headers: {
            isToken: false
        },
    })
}