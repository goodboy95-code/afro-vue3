import {defineStore} from 'pinia'
import {Menu} from "/src/axios/api/type/Menu.ts";

interface UseMenuStore {
    //菜单名称
    menuName: string,
    //账号状态（0 正常）（1 停用）
    statusForSelect: string,

    // 最后一次查询的菜单名
    lastQueryMenuName: string,
    //  最后一次查询的菜单状态
    lastQueryStatusForSelect: string,

    //  表格数据
    tableData: Menu[],

    //  总页数
    totalPages: number,
    //  最大页码按钮数
    pagerCount: number,
    //  当前页码
    pageNumber: number,
    //  每一页最大条数
    pageSize: number,

    //系统所有菜单
    allMenus: Menu[],
    //角色拥有的菜单Id
    owningMenuIds: number[],
    //当前被选中的菜单Id
    selectedMenuIds: number[][] | number[],

    //用户角色拥有的快捷导航Id
    owningNavigationIds: number[],
    //当前被选中的快捷导航Id
    selectedNavigationIds: number[],
}

export const useMenuStore = defineStore('menu', {
    // 其他配置...
    state: (): UseMenuStore => {
        return {
            menuName: '',
            statusForSelect: '',

            lastQueryMenuName: '',
            lastQueryStatusForSelect: '',

            tableData: [],

            pageNumber: 1,
            totalPages: 0,
            pagerCount: 5,
            pageSize: 6,

            allMenus: [],
            owningMenuIds: [],
            selectedMenuIds: [],

            owningNavigationIds: [],
            selectedNavigationIds: [],
        }
    },
    getters: {},
    actions: {}
})
