<template>
  <div class="avatar-style" @click="editCropper()">
    <el-avatar
        :src="useUserInfoStore().avatarImage"
    />
  </div>
  <el-dialog
      v-model="dialogVisible"
      :before-close="handleClose"
      :width="useResponsiveLayoutStore().isMobile ? '90%' : '40%'"
      title="修改头像"
  >
    <el-row :gutter="20">
      <el-col :span="useResponsiveLayoutStore().isMobile ? 24 : 14" :style="{height: '300px'}">
        <vue-cropper
            ref="cropper"
            :auto-crop="option.autoCrop"
            :auto-crop-height="option.autoCropHeight"
            :auto-crop-width="option.autoCropWidth"
            :fixed-box="option.fixedBox"
            :img="option.img"
            :output-type="option.outputType"
            :outputSize="option.outputSize"
            style="width: 300px"
            @real-time="realTime"
        ></vue-cropper>
      </el-col>
      <el-col :span="useResponsiveLayoutStore().isMobile ? 24 : 10" :style="{height: '300px'}">
        <el-avatar :size="200" shape="circle">
          <div
              :style="{'width': option.previews.w + 'px','height': option.previews.h + 'px',  'overflow': 'hidden'}">
            <el-image :src="option.previews.url"
                      :style="option.previews.img"
                      alt="12345"/>
          </div>
        </el-avatar>
      </el-col>
    </el-row>
    <div class="avatar-button">
      <el-upload
          :before-upload="beforeUpload"
          action="#"
      >
        <template #trigger>
          <el-button size="small" type="primary">
            选择头像
            <el-icon class="el-icon--left">
              <UploadFilled/>
            </el-icon>
          </el-button>
        </template>
      </el-upload>
      <el-button :icon="Plus" class="plus" size="small" @click="changeScale(1)"></el-button>
      <el-button :icon="Minus" size="small" @click="changeScale(-1)"></el-button>
      <el-button :icon="RefreshLeft" size="small" @click="rotateLeft()"></el-button>
      <el-button :icon="RefreshRight" size="small" @click="rotateRight()"></el-button>
      <el-button class="submit" size="small" type="primary" @click="uploadImg()">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {VueCropper} from 'vue-cropper'
import 'vue-cropper/dist/index.css'

import {Minus, Plus, RefreshLeft, RefreshRight, UploadFilled} from "@element-plus/icons-vue";
import {uploadAvatar} from "/src/axios/api/userApi.ts";
import {ElMessage} from "element-plus";
import {useUserInfoStore} from "/src/pinia/module/userInfo/useUserInfoStore.ts";
import {getAvatarRequest} from "/src/axios/api/userInfoApi.ts";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";

const dialogVisible = ref(false)
const editCropper = () => {
  dialogVisible.value = true;
}
const handleClose = (done: () => void) => {
  done()
}
const option = reactive(
    {
      //头像
      img: useUserInfoStore().avatarImage,
      //裁剪生成图片的质量
      outputSize: 1,
      // 默认生成截图为PNG格式
      outputType: 'png',
      // 是否默认生成截图框
      autoCrop: true,
      // 默认生成截图框宽度
      autoCropWidth: 200,
      // 默认生成截图框高度
      autoCropHeight: 200,
      // 固定截图框大小 不允许改变
      fixedBox: true,
      // 文件名称
      filename: 'avatar',

      previews: {
        url: '',
        img: '',
        w: 0,
        h: 0,
        div: {}
      }
    })
const cropper = ref(null)

const realTime = (data: any) => {
  option.previews = data
}
// 图片缩放
const changeScale = (num: number) => {
  cropper.value.changeScale(num);
}
// 向左旋转
const rotateLeft = () => {
  cropper.value.rotateLeft();
}
// 向右旋转
const rotateRight = () => {
  cropper.value.rotateRight();
}
// 上传图片
const uploadImg = () => {
  cropper.value.getCropBlob(async (data: Blob) => {
    if (data) {
      let formData = new FormData();
      formData.append("avatarFile", data, option.filename);
      await uploadAvatar(formData).then((res: string) => {
        // 上传成功后的操作
        useUserInfoStore().userInfo.user.avatar = res;
        dialogVisible.value = false;
      });
      await getAvatarRequest().then((res: Blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onload = () => {
          typeof reader.result === "string" ? option.img = useUserInfoStore().avatarImage = reader.result : ElMessage.error('Not a valid base64 string139');
        };
        reader.onerror = () => {
          ElMessage.error('上传图片失败!142');
        };
      })
    } else {
      ElMessage.error('获取Blob对象失败');
    }
  });
}

// 上传预处理
const beforeUpload = (file: Blob) => {
  const isJPG = file.type === 'image/jpeg';
  const isPNG = file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isJPG && !isPNG) {
    ElMessage.error('上传图片只能是 JPG/PNG 格式!');
  }
  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过 2MB!');
  }
  if ((isJPG || isPNG) && isLt2M) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      typeof reader.result === "string" ? option.img = reader.result : ElMessage.error('Not a valid base64 string166');
    };
    reader.onerror = () => {
      ElMessage.error('上传图片失败!169');
    };
  }
}
</script>

<style lang="scss" scoped>
.avatar-style {
  width: 100px;
  height: 100px;
  margin-left: 100px;
  margin-bottom: 10px;

  .el-avatar {
    width: 100px;
    height: 100px;
  }
}

.avatar-button {
  margin-top: 10px;
  display: flex;

  > .plus {
    margin-left: 12px;
  }

  ::v-deep(.el-upload-list) {
    margin-top: 0;
  }

  > .submit {
    margin: 0 auto;
  }
}
</style>

