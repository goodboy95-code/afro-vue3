export class OnlineUser {
    // 令牌ID
    private tokenId: string;
    // 部门名称
    private departmentName: string;
    // 用户名称
    private userName: string;
    // 登录IP地址
    private ipAddress: string;
    // 登录地址
    private loginLocation: string;
    // 浏览器类型
    private browserType: string;
    // 操作系统
    private operatingSystem: string;
    // 登录时间
    private loginTime: number;

    constructor(
        tokenId: string,
        departmentName: string,
        userName: string,
        ipAddress: string,
        loginLocation: string,
        browserType: string,
        operatingSystem: string,
        loginTime: number
    ) {
        this.tokenId = tokenId;
        this.departmentName = departmentName;
        this.userName = userName;
        this.ipAddress = ipAddress;
        this.loginLocation = loginLocation;
        this.browserType = browserType;
        this.operatingSystem = operatingSystem;
        this.loginTime = loginTime;
    }
}

export class OnlineUserCondition {
    ipAddress?: string;
    userName?: string;

    constructor(ipAddress: string, userName: string) {
        this.ipAddress = ipAddress;
        this.userName = userName;
    }
}

