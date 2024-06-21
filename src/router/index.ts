import {createRouter, createWebHistory, RouteLocationNormalized, RouteRecordRaw} from 'vue-router'
import {useRouteStore} from '/src/pinia/module/useRouteStore.ts'
import {getItem, getItemWithExpiration, setItem, TokenKey} from "/src/utils/LocalStorage.ts";
import {ElMessage} from "element-plus";
import {getAvatarRequest, getInfoRequest} from "/src/axios/api/userInfoApi.ts";
import {queryNavigationsRequest} from "/src/axios/api/userRoleMenuApi.ts";
import Utils from "/src/utils/Utils.ts";
import {UserInfo} from "/src/axios/api/type/UserInfo.ts";
import {useRoleStore} from "/src/pinia/module/role/useRoleStore.ts";
import {useUserInfoStore} from "/src/pinia/module/userInfo/useUserInfoStore.ts";
import {Role} from "/src/axios/api/type/Role.ts";
import {useMenuStore} from "/src/pinia/module/menu/useMenuStore.ts";
import {useDepartmentStore} from "/src/pinia/module/department/useDepartmentStore.ts";
import {queryDepartmentTreeRequest} from "/src/axios/api/departmentApi.ts";
import {isEqual} from "lodash-es";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: '页面不存在',
            component: () => import('/src/components/layout/Layout.vue'),
            meta: {title: '页面不存在', icon: 'lock', hidden: true},
            children: [
                {
                    name: '页面不存在',
                    path: '/:path(.*)',
                    component: () => import('/src/components/layout/rightSection/main/views/notFound/NotFound.vue')
                }
            ]
        },
        {
            path: '/workbench',
            name: '工作台',
            component: () => import('/src/components/layout/Layout.vue'),
            meta: {title: '工作台', icon: 'icon-workbench', hidden: false},
            children: [
                {
                    path: '/workbench/analyse',
                    component: () => import('/src/components/layout/rightSection/main/views/workbench/analyse/Analyse.vue'),
                    name: '分析',
                    meta: {title: '分析', icon: 'icon-analysis', hidden: false}
                },
                {
                    path: '/workbench/console',
                    component: () => import('/src/components/layout/rightSection/main/views/workbench/console/Console.vue'),
                    name: '操作',
                    meta: {title: '操作', icon: 'icon-click', hidden: false}
                },
                {
                    path: '/userInfo',
                    component: () => import('/src/components/layout/rightSection/main/views/system/UserInfo.vue'),
                    name: '用户信息',
                    meta: {title: '用户信息', icon: 'icon-people', hidden: true}
                },
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('/src/components/login/Login.vue'),
            meta: {title: '登录', icon: 'dashboard', hidden: true}
        }
    ]
})

const whiteList = ['/login', '/register']

router.beforeEach(async (to) => {
    if (getItemWithExpiration(TokenKey)) {
        if (to.path === '/login' || to.path === '/') {
            return '/workbench/analyse'
        } else {
            if (!hasNecessaryRoute(to) || useUserInfoStore().userInfo.roles.length === 0) {
                router.addRoute(
                    {
                        path: '/',
                        name: 'Layout',
                        component: () => import('/src/components/layout/Layout.vue'),
                        meta: {title: 'Layout', icon: 'lock', hidden: true}
                    }
                )
                await getInfoRequest().then((res: UserInfo) => {
                    useUserInfoStore().userInfo.roles = res.roles
                    useUserInfoStore().userInfo.permissions = res.permissions
                    useUserInfoStore().userInfo.user = res.user
                    useRoleStore().selectedRole = getItem<Role>("selectedRole", true) || res.roles[0] || new Role()
                    setItem("selectedRole", JSON.stringify(useRoleStore().selectedRole, ['roleId', 'roleName']))
                })
                await queryDepartmentTreeRequest().then(res => {
                    useDepartmentStore().departmentTree = res
                });
                await getAvatarRequest().then((res: Blob) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(res);
                    reader.onload = () => {
                        typeof reader.result === "string" ? useUserInfoStore().avatarImage = reader.result : ElMessage.error("Not a valid base64 string(index97)",);
                    };
                    reader.onerror = () => {
                       ElMessage.error("获取头像失败(index100)")
                    };
                })
                await useRouteStore().generateRoutes(useRoleStore().selectedRole.roleId).then((accessRoutes: RouteRecordRaw[]) => {
                    accessRoutes.forEach((item: RouteRecordRaw) => {
                        router.addRoute('Layout', item);
                    })
                }).catch(() => {
                    ElMessage({
                        message: useRoleStore().selectedRole.roleName + '角色添加路由失败',
                        type: 'error',
                    })
                })
                if (useUserInfoStore().userInfo.roles.length === 0) {
                    ElMessage({
                        message: '该用户没有添加角色',
                        type: 'error',
                    })
                    return false
                }
                await queryNavigationsRequest(useRoleStore().selectedRole.roleId).then((res) => {
                    useRouteStore().navigations = res
                    for (let i = 0; i < res.length; i++) {
                        useMenuStore().owningNavigationIds.push(res[i].menuId);
                    }
                    useMenuStore().selectedNavigationIds = useMenuStore().owningNavigationIds
                })
                if (!hasNecessaryRoute(to)) {
                    ElMessage.warning("没有找到对应的地址，返回首页")
                    return '/workbench/analyse'
                }
                //为了获取路由数据  此时return true拿不到路由数据
                return to.path
            } else {
                return true
            }
        }
    } else {
        // 没有token
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            return true
        } else {
            ElMessage({
                message: '登录过期，请重新登录',
                type: 'warning',
            })
            return `/login?redirect=${encodeURIComponent(to.fullPath)}`
        }
    }
})

function hasNecessaryRoute(to: RouteLocationNormalized) {
    if (Utils.isEqualIgnoreCase(to.path, '/workbench/analyse') && Utils.isEqualIgnoreCase(to.path, '/workbench/console')) {
        return false;
    }
    const routes = router.getRoutes();
    for (let i = 0; i < routes.length; i++) {
        if (isEqual(routes[i].path,to.path)) {
            return true;
        }
    }
    return false;
}

export default router
