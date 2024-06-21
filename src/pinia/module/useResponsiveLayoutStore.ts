import {defineStore} from 'pinia'

interface UseResponsiveLayoutStore {
    //是否移动设备
    isMobile: boolean;
    //是否ipad设备
    isPad: boolean;
    //是否电脑设备
    isDesktop: boolean;
    //表单ID
    formId: string;
    //是否显示sideBar
    showPopoverSideBar: boolean;
    //是否旋转汉堡包按钮
    rotateHamburger: boolean;
}

export const useResponsiveLayoutStore = defineStore('responsiveLayout', {
    // 其他配置...
    state: (): UseResponsiveLayoutStore => {
        return {
            isMobile: false,
            isPad: false,
            isDesktop: false,
            formId: 'login-normal-form',
            showPopoverSideBar: false,
            rotateHamburger: false,
        }
    },
    getters: {
        computedChartWidth: (state) => {
            return state.isMobile ? '100%' : '400px';
        },
        showLoginLeft: (state) => {
            return !state.isPad && !state.isMobile;
        }
    },
    actions: {
        updateLayout(formId?: string) {
            // 可视窗口宽度
            const width = document.body.getBoundingClientRect().width;
            if (width <= 1024 && width >= 450) {
                useResponsiveLayoutStore().isPad = true
                useResponsiveLayoutStore().isMobile = false
                useResponsiveLayoutStore().isDesktop = false
            } else if (width < 450) {
                useResponsiveLayoutStore().isPad = false
                useResponsiveLayoutStore().isMobile = true
                useResponsiveLayoutStore().isDesktop = false
            } else {
                useResponsiveLayoutStore().isPad = false
                useResponsiveLayoutStore().isMobile = false
                useResponsiveLayoutStore().isDesktop = true
            }

            if (formId) {
                let elementForm: HTMLElement | null = document.getElementById(formId);
                //登录页响应式
                //这里可以添加更多的响应式布局逻辑
                const element = document.getElementById('login-right');
                if (element) {
                    element.style.width = '100%';
                    if (width < 450) {
                        if (elementForm) {
                            let number = width - 50;
                            elementForm.style.width = number + 'px';
                            elementForm.style.minWidth = 300 + 'px';
                        }
                    } else {
                        elementForm.style.width = '400px';
                    }
                }
            }
        },
        showPopoverSideBarAction() {
            useResponsiveLayoutStore().showPopoverSideBar = true
        },
        closePopoverSidebarAction() {
            if (this.isDesktop) {
                useResponsiveLayoutStore().rotateHamburger = true
            }
            useResponsiveLayoutStore().showPopoverSideBar = false
        }
    }
})
