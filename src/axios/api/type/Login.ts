export interface Login {
    token: string,
}

export class LoginCondition {
    username: string;
    password: string;
    captchaImageCode: string;
    uuid: string;

    constructor(username: string, password: string, captchaImageCode: string, uuid: string) {
        this.username = username;
        this.password = password;
        this.captchaImageCode = captchaImageCode;
        this.uuid = uuid;
    }
}