export class Navigation {
    menuId: number;
    //路由名字
    name: string;
    //路由地址
    path: string;
    //组件
    component: string;
    //其他元素
    meta: {
        title: string,
        icon: string,
        cache: boolean,
        link: string,
        hidden?: boolean,
        query?: string,
    };
}