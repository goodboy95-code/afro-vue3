export interface Register {
    username: string;
    /**
     * 用户密码
     */
    password: string;
    /**
     * 手机号码
     */
    phoneNumber: string;
    /**
     * 短信验证码
     */
    smsCode: string;
    /**
     * 短信验证码redis key
     */
    smsCodeRedisKey: string;
}

export class RegisterCondition {
    username: string;
    /**
     * 用户密码
     */
    password: string;
    /**
     * 手机号码
     */
    phoneNumber: string;
    /**
     * 短信验证码
     */
    smsCode: string;
    /**
     * uuid
     */
    uuid: string;

    constructor(username: string, password: string, phoneNumber: string, smsCode: string, uuid: string) {
        this.username = username;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.smsCode = smsCode;
        this.uuid = uuid;
    }
}