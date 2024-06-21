import {defineStore} from 'pinia'
import {queryRoutesByRoleIdRequest} from "/src/axios/api/menuApi.ts";
import Utils from "/src/utils/Utils.ts";
import router from "/src/router";
import {RouteRecordRaw} from "vue-router";
import {MenuForRoute} from "/src/axios/api/type/Menu.ts";
import {Navigation} from "/src/axios/api/type/Navigation.ts";

interface UseRouteStoreData {
    //从后端获取动态添加的路由
    dynamicRoute: RouteRecordRaw[],
    //已经添加的的快捷导航
    navigations: Navigation[],
}

export const useRouteStore = defineStore('route', {
    // 其他配置...
    state: (): UseRouteStoreData => {
        return {
            dynamicRoute: undefined,
            //包含路由空组件
            navigations: []
        }
    },
    getters: {
        //获取侧边栏路由
        getSideBarRoutes: (state: UseRouteStoreData) => {
            let filtrateOptionsRoutes = router.options.routes.filter((value: RouteRecordRaw) => {
                return !value.meta.hidden
            });
            return filtrateOptionsRoutes.concat(state.dynamicRoute)
        },
        getNavigations: (state: UseRouteStoreData): Navigation[][] => {
            let navigations = state.navigations.filter((navigation: Navigation) => {
                return !Utils.isEmpty(navigation.path.trim())
            });
            const chunkSize: number = 9;
            const result: Navigation[][] = [];
            for (let i = 0; i < navigations.length; i += chunkSize) {
                result.push(navigations.slice(i, i + chunkSize));
            }
            return result;
        }
    },
    actions: {
        //生成包含组件懒加载的的路由
        generateRoutes(roleId: number) {
            return new Promise<RouteRecordRaw[]>((resolve) => {
                // 向后端请求路由数据
                queryRoutesByRoleIdRequest(roleId).then((res: MenuForRoute[]) => {
                    const menu: RouteRecordRaw[] = JSON.parse(JSON.stringify(res))
                    const modules = import.meta.glob<object>('/src/components/layout/rightSection/main/views/*/*.vue')
                    this.navigations = []
                    this.dynamicRoute = this.filterAsyncRouter(menu, modules);
                    resolve(this.dynamicRoute)
                })
            })
        },
        //添加组件懒加载
        filterAsyncRouter(asyncRouterMap: RouteRecordRaw[], modules: Record<string, () => Promise<object>>): RouteRecordRaw[] {
            return asyncRouterMap.filter((routeRecordRaw: RouteRecordRaw) => {
                if (Utils.isUrlW(routeRecordRaw.path)) {
                    routeRecordRaw.path = 'https://' + routeRecordRaw.path
                } else if (routeRecordRaw.path && !routeRecordRaw.path.startsWith('/') && !Utils.isUrlH(routeRecordRaw.path)) {
                    routeRecordRaw.path = '/' + routeRecordRaw.path
                }
                if (routeRecordRaw.component && Utils.isEqualIgnoreCase(typeof routeRecordRaw.component, "string")) {
                    let componentName = "/src/components/layout/rightSection/main/views/" + routeRecordRaw.component + ".vue"
                    routeRecordRaw.component = modules[componentName]
                }
                if (routeRecordRaw.children && routeRecordRaw.children.length > 0) {

                    routeRecordRaw.children = this.filterAsyncRouter(routeRecordRaw.children, modules)
                }
                return true
            });
        },
    }
})