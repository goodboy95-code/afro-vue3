import {createApp} from 'vue'
import App from '/src/App.vue'
import ElementPlus from 'element-plus'
import {setupCalendar} from 'v-calendar';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import "element-plus/theme-chalk/src/index.scss"

// 引入默认的被动事件支持,解决浏览器对passive属性的支持问题
import 'default-passive-events'
import '/src/assets/styles/main.scss'
import '/src/assets/font/font.scss'
import 'v-calendar/style.css'

import theme from '/src/assets/echarts/theme.project.json';

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import {install} from '@icon-park/vue-next/es/all';
import '@icon-park/vue-next/styles/index.css';

import {createPinia} from 'pinia'

import router from "./router"

const pinia = createPinia()

const app = createApp(App)

install(app)
app.use(router)
app.use(ElementPlus, {locale: zhCn})
app.use(pinia)
app.use(setupCalendar, {})

app.config.globalProperties.$theme = theme;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')

