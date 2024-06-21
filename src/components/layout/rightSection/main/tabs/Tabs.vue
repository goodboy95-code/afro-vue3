<template>
  <el-tag
      v-for="item in tabsViewData.editableTabs"
      :key="item.key"
      :effect="item.effect"
      closable
      @click="handleClick(item)"
      @close="removeTab(item.key)"
  >
    {{ item.title }}
  </el-tag>
</template>

<script lang="ts" setup>
import {reactive, ref, watch} from 'vue'
import {useRoute} from "vue-router";
import router from "/src/router";
import {isEqual} from "lodash-es";

interface EditableTabs {
  title: string,
  key: string,
  content: any,
  path: string,
  effect: string
}

interface TabsViewData {
  editableTabs: EditableTabs[]
}

const route = useRoute()
const editableTabsValue = ref('1')
let tabIndex = 0
const tabsViewData: TabsViewData = reactive({
  editableTabs: []
})

watch(route, (route) => {
  let newTabKey: string;
  let currentTab: EditableTabs;
  const hasTag = tabsViewData.editableTabs.some((obj: EditableTabs) => {
    if (isEqual(obj.title, route.meta.title)) {
      currentTab = obj
      editableTabsValue.value = currentTab.key
      tabsViewData.editableTabs.forEach((tab) => {
        if (obj.title == tab.title) {
          tab.effect = 'light';
        } else {
          tab.effect = 'dark';
        }
      });
      return true
    }
  })
  if (!hasTag) {
    tabsViewData.editableTabs.forEach((tab) => {
      tab.effect = 'dark'; // 将其他tab的effect设置为dark
    });
    newTabKey = `${++tabIndex}`
    tabsViewData.editableTabs.push({
      title: route.meta.title as string,
      key: newTabKey,
      content: 'New Tab content',
      path: route.path,
      effect: 'light'
    })
    editableTabsValue.value = newTabKey
  }
}, {
  deep: true,
  immediate: true
})
const removeTab = (targetTabKey: string) => {
  if (isEqual(editableTabsValue.value, targetTabKey)) {
    tabsViewData.editableTabs.forEach((tab, index) => {
      if (isEqual(tab.key, targetTabKey)) {
        const nextTab = tabsViewData.editableTabs[index + 1] || tabsViewData.editableTabs[index - 1]
        if (nextTab) {
          editableTabsValue.value = nextTab.key
          router.push({path: nextTab.path})
        }
      }
    })
  }
  tabsViewData.editableTabs = tabsViewData.editableTabs.filter((tab) => tab.key !== targetTabKey)
}

const handleClick = (tab: EditableTabs) => {
  tabsViewData.editableTabs.some((obj: EditableTabs) => {
    if (isEqual(obj.key,tab.key)) {
      tab.effect = 'light'
      router.push({path: obj.path})
    } else {
      obj.effect = 'dark'; // 设置未点击的effect为dark
    }
  })
}
</script>

<style lang="scss" scoped>
.el-tag {
  height: 30px;
  cursor: pointer;
  margin: 0 5px;
}
</style>
