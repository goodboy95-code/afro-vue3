import {useRoleStore} from "/src/pinia/module/role/useRoleStore.ts";

export class Role {
    //角色ID
    roleId: number;
    //角色名称
    roleName: string;
    //显示顺序
    roleSort: number;
    //角色状态（0正常 1停用）
    status: string;
    //删除标志（0 代表存在 1 代表删除）
    delFlag: string;
    //创建者
    createBy: string;
    //创建时间
    createTime: string;
    //更新者
    updateBy: string;
    //更新时间
    updateTime: string;
    //备注
    remark: string;
}

export class RoleCondition {
    roleName?: string;
    status?: string;
    pageNumber: number;
    pageSize: number;

    constructor(pageNumber: number, roleName?: string, status?: string) {
        this.roleName = roleName;
        this.status = status;
        this.pageNumber = pageNumber;
        this.pageSize = useRoleStore().pageSize;
        useRoleStore().pageNumber = pageNumber
    }
}