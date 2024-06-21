import {useDepartmentStore} from "/src/pinia/module/department/useDepartmentStore.ts";

/**
 * 部门表(Department)实体类
 *
 * @author lemon
 */
export class Department
 {
    /**
     * 部门ID
     */
    departmentId: number;
    /**
     * 父部门ID
     */
    parentId: number;
    /**
     * 祖级列表
     */
    ancestors: string;
    /**
     * 部门名称
     */
    departmentName: string;
    /**
     * 显示顺序
     */
    orderNum: number;
    /**
     * 负责人
     */
    leader: string;
    /**
     * 联系电话
     */
    phone: string;
    /**
     * 邮箱
     */
    email: string;
    /**
     * 部门状态（0 正常，1 停用）
     */
    status: string;
    /**
     * 删除标志（0 代表存在，2 代表删除）
     */
    delFlag: string;
    /**
     * 创建者
     */
    createBy: string;
    /**
     * 创建时间
     */
    createTime: Date;
    /**
     * 更新者
     */
    updateBy: string;
    /**
     * 更新时间
     */
    updateTime: Date;
    /**
     * 缩写
     */
    abbreviation: string;
    /**
     * 子部门
     */
    children: Department[];
}

export class DepartmentCondition {
    departmentName?: string;
    status?: string;
    pageNumber: number;
    pageSize: number;

    constructor(pageNumber: number, departmentName?: string, status?: string) {
        this.departmentName = departmentName;
        this.status = status;
        this.pageNumber = pageNumber;
        this.pageSize = useDepartmentStore().pageSize;
        useDepartmentStore().pageNumber = pageNumber
    }
}

//el-tree的节点属性
export class DepartmentInfo {
    id: number;
    label: string;
    value: number;
    leaf: boolean;
    //子路由
    children: DepartmentInfo[];
}

