<template>
  <el-card shadow="never">
    <div class="info-card-style">
      <el-image :src="book" fit="cover" style="height: 140px"/>
      <div class="weather-info-style">
        <h1 style="font-family: AlimamaShuHeiTi-Bold,serif">早安, 🧑‍🎓, 开始您一天的工作吧！</h1>
        <span> 今日晴，20摄氏度 - 32摄氏度！ </span>
      </div>
      <div class="tasks-info-style">
        <el-badge :value="12">
          <el-button plain type="primary">消息</el-button>
        </el-badge>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import book from "/src/assets/image/book.png";
</script>

<style lang="scss" scoped>
.el-card {
  border: none;

  ::v-deep(.el-card__body) {
    background-image: linear-gradient(to right, var(--el-color-primary), var(--el-color-primary-light-3));
  }

  .info-card-style {
    display: flex;
    align-items: center;

    .weather-info-style {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      margin-left: 20px;
    }

    .tasks-info-style {
      margin-right: 30px;
      display: flex;
      justify-content: flex-end;
      flex-grow: 1;

      div {
        display: flex;
        flex-direction: column;
      }
    }
  }
}


</style>