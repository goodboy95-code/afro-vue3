import {useUserStore} from "/src/pinia/module/user/useUserStore.ts";

export class User {
    userId?: number;
    userName: string;
    nickName: string;
    email: string;
    phoneNumber: string;
    age: number;
    sex: string;
    avatar: string;
    password: string;
    status: string;
    delFlag: string;
    loginIp: string;
    loginDate: string;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
    remark: string;
}

export class UsersCondition {
    departmentId?: number;
    userName?: string;
    status?: string;
    phoneNumber?: string;
    pageNumber: number;
    pageSize: number;

    constructor(departmentId: number, pageNumber: number, userName?: string, status?: string, phoneNumber?: string) {
        this.departmentId = departmentId;
        this.userName = userName;
        this.status = status;
        this.phoneNumber = phoneNumber;
        this.pageNumber = pageNumber;
        this.pageSize = useUserStore().pageSize;
        useUserStore().pageNumber = pageNumber
    }
}

export class AddUserForm extends User {
    selectedRole: number[]
}