<template>
  <el-card shadow="never">
    <el-carousel :autoplay=false :loop=false arrow="always" trigger="click">
      <el-carousel-item v-for="(navigations) in useRouteStore().getNavigations">
        <el-row>
          <el-col v-for="(navigation) in navigations" :span="8">
            <el-dropdown style="width: 100%" trigger="contextmenu">
              <el-card class="flex-card"
                       shadow="never"
                       @click="navigationPath(navigation.path)">
                <component :is="navigation.meta.icon" fill="#DA4F49" size="30"></component>
                <span style="user-select: none;margin-top: 15px;font-size: 12px">{{ navigation.meta.title }}</span>
              </el-card>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :icon="DeleteOne" @click.stop="closeIcon(navigation.menuId)">删除
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>
  </el-card>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {useRouteStore} from "/src/pinia/module/useRouteStore.ts";
import {deleteBatchRequest, queryNavigationsRequest} from "/src/axios/api/userRoleMenuApi.ts";
import {DeleteOne} from "@icon-park/vue-next";
import {startsWith} from "lodash-es";
import {useRoleStore} from "/src/pinia/module/role/useRoleStore.ts";
import {UserRoleMenu} from "/src/axios/api/type/UserRoleMenu.ts";
import {useUserInfoStore} from "/src/pinia/module/userInfo/useUserInfoStore.ts";
import Utils from "/src/utils/Utils.ts";
import {useMenuStore} from "/src/pinia/module/menu/useMenuStore.ts";
import {useCommonStore} from "/src/pinia/module/useCommonStore.ts";

const router = useRouter();

const navigationPath = (path: string) => {
  console.log(startsWith(null, '/'))
  if (startsWith(path, '/')) {
    router.push({path})
  } else {
    router.push({path: '/' + path})
  }
}

const closeIcon = (menuId: number) => {
  let userRoleMenus: UserRoleMenu[] = useCommonStore().setUserRoleMenu(
      menuId,
      useRoleStore().selectedRole.roleId,
      useUserInfoStore().userInfo.user.userId
  );
  if (Utils.isEmpty(userRoleMenus)) {
    userRoleMenus = []
  }
  deleteBatchRequest(userRoleMenus).then(() => {
    queryNavigationsRequest(useRoleStore().selectedRole.roleId).then((res) => {
      useRouteStore().navigations = res
      for (let i = 0; i < res.length; i++) {
        useMenuStore().owningNavigationIds.push(res[i].menuId);
      }
      useMenuStore().selectedNavigationIds = useMenuStore().owningNavigationIds
    })
  })
}

</script>

<style lang="scss" scoped>
@use "/src/assets/styles/scss/card";

.el-card {
  @include card.cardTheme;
  height: 340px;
  background-color: var(--el-bg-color-overlay);
  border: none;

  ::v-deep(.el-card__body) {
    padding: 0;

    .el-carousel {
      padding: 20px 38px;

      .el-carousel__indicators {
        button {
          background-color: var(--el-border-color-dark);
        }
      }

      .el-carousel__arrow {
        background-color: transparent;
        color: var(--el-text-color-regular);
      }

      .el-carousel__arrow--left {
        left: -34px;
      }

      .el-carousel__arrow--right {
        right: -34px;
      }

      .flex-card {
        border: none;
        width: 100%;
        height: 100px;
        margin: 0;

        .el-card__body {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          position: relative;

          .close-style {
            position: absolute;
            top: 0;
            right: 0;
          }

          span {
            margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>