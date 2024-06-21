<template>
  <el-card shadow="never">
    <template #header>
      <div>
        <span>消息</span>
      </div>
    </template>
    <el-row :gutter="5">
      <el-col :span="24">
        <el-descriptions :column='1' border title="张三的请假条">
          <template #extra>
            <el-button type="primary">Operation</el-button>
          </template>
          <el-descriptions-item label="身份信息">
            <el-tag size="small">学生</el-tag>
            <el-tag size="small">七年级二班</el-tag>
            <el-tag size="small">李华</el-tag>
            <el-tag size="small">11324234（学号）</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="请假原因">
            <el-text style="width: 200px" truncated>
              <el-popover
                  :width="300"
                  placement="bottom"
                  title="张三的请假条"
                  trigger="click"
              >
                <template #reference>
                  <el-button class="m-2">尊敬的老师...</el-button>
                </template>
                <p>尊敬的老师：</p>
                <p style="text-indent: 2em;">
                  我是您班上的学生李华，我因为家庭原因需要请假三天，从2023年5月12日到2023年5月14日。我将会在这段时间内安排好我的学业，尽量完成所有作业并在回到学校后尽快补上我错过的课程内容。
                  我已经告知我的同学并让他们帮我留意这三天的学习内容，以便我回来后可以迅速跟进。同时，我也会在每天的上午9点和下午3点通过微信与我的同学进行交流，了解班级的最新情况。如果有什么需要我协助或者注意的事项，您可以随时通过微信与我联系。
                </p>
                <p style="display: flex;justify-content: flex-end">2023年4月8号</p>
              </el-popover>

            </el-text>
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/scss/card";

.el-card {
  @include card.cardTheme;
  border: none;

  ::v-deep(.el-descriptions__body) {
    background-color: var(--el-bg-color
);
  }
}
</style>