import {useMenuStore} from "/src/pinia/module/menu/useMenuStore.ts";

export class Menu {
    menuId:number;
    menuName: string;
    parentId:number;
    orderNum:number;
    path: string;
    component?: string | null | undefined;
    isFrame:string;
    isCache:string;
    menuType:string;
    visible:string;
    status:string;
    perms:string;
    icon:string;
    createBy:string;
    createTime:string;
    updateBy:string;
    updateTime:string;
    remark:string;
    meta?: {
        title: string;
        icon: string;
        cache: boolean;
        link: string;
        hidden?: boolean;
        query?: string;
    };
    children?: MenuForRoute[];
}

export class MenuCondition {
    menuName?: string;
    status?: string;
    pageNumber: number;
    pageSize: number;

    constructor(pageNumber: number, menuName?: string, status?: string) {
        this.menuName = menuName;
        this.status = status;
        this.pageNumber = pageNumber;
        this.pageSize = useMenuStore().pageSize;
        useMenuStore().pageNumber = pageNumber
    }
}

export class MenuForRoute {
    menuId:number;
    name: string;
    path: string;
    component?: string | null | undefined;
    meta?: {
        title: string;
        icon: string;
        cache: boolean;
        link: string;
        hidden?: boolean;
        query?: string;
    };
    children?: MenuForRoute[];
}