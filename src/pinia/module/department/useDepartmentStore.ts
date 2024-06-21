import {defineStore} from 'pinia'
import {Department, DepartmentInfo} from "/src/axios/api/type/Department.ts";

interface UseDepartmentStore {
    //部门名称
    departmentName: string,
    //账号状态（0 正常）（1 停用）
    statusForSelect: string,

    // 最后一次查询的部门名
    lastQueryDepartmentName: string,
    //  最后一次查询的部门状态
    lastQueryStatusForSelect: string,

    //  表格数据
    tableData: Department[],

    //  总页数
    totalPages: number,
    //  最大页码按钮数
    pagerCount: number,
    //  当前页码
    pageNumber: number,
    //  每一页最大条数
    pageSize: number,

    //当前被选中的部门Id
    selectedDepartmentIds: number[],
    //当前拥有的的部门Id
    ownedDepartmentIds: number[],

    //当前角色拥有的部门树
    departmentTree: DepartmentInfo[]
}

export const useDepartmentStore = defineStore('department', {
    // 其他配置...
    state: (): UseDepartmentStore => {
        return {
            departmentName: '',
            statusForSelect: '',

            lastQueryDepartmentName: '',
            lastQueryStatusForSelect: '',

            tableData: undefined,

            pageNumber: 1,
            totalPages: 0,
            pagerCount: 5,
            pageSize: 6,

            selectedDepartmentIds: undefined,
            ownedDepartmentIds: undefined,
            departmentTree: undefined,
        }
    },
    getters: {
        queryDepartmentOption(state: UseDepartmentStore) {
            return state.departmentTree[0].children.map((department: DepartmentInfo) => {
                return {
                    label: department.label,
                    options: department.children.map(child => {
                        return {
                            value: child.value,
                            label: child.label,
                        };
                    }),
                };
            });
        }
    },
})
