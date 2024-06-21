import {defineStore} from 'pinia'
import {useToggle} from "@vueuse/shared";
import {useDark} from "@vueuse/core";
import {isEqual} from "lodash-es";


export const useThemeStore = defineStore('theme', {
    // 其他配置...
    state: () => {
        return {
            isDark: null
        }
    },
    getters: {},
    actions: {
        toggleToLogin() {
            let isDark = useDark({
                storageKey: 'afro-theme',
            });
            if (isDark.value) {
                isDark.value = false;
                useToggle(isDark)
            } else {
                useToggle(isDark)
            }
        },
        toggleToAppMain() {
            let isDark = useDark({
                storageKey: 'afro-theme'
            });
            if (!this.isDark) {
                this.isDark = isEqual(localStorage.getItem('afro-theme'), 'dark')
            }
            isDark.value = this.isDark;
            useToggle(isDark)
        }
    }
})
