import 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        title: string,
        icon?: string,
        cache?: boolean,
        link?: string,
        hidden?: boolean,
        query?: string,
        isNavigation?: string
    }
}