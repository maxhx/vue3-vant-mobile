<script setup>
import { computed, ref } from 'vue'

// 定义报表选项
const reportOptions = [
  {
    label: '公司回款额-phone',
    value: 'demo/Phone/analytics/financial/公司回款额-phone.cpt',
  },
  {
    label: '公司年度利润表-phone',
    value: 'demo/Phone/analytics/financial/公司年度利润表-phone.cpt',
  },
  {
    label: '关键指标情况分析-phone',
    value: 'demo/Phone/analytics/financial/关键指标情况分析-phone.cpt',
  },
  {
    label: '库存管理-phone',
    value: 'demo/Phone/analytics/financial/库存管理-phone.cpt',
  },
  {
    label: '员工指标跟进-phone',
    value: 'demo/Phone/analytics/hr/员工指标跟进-phone.cpt',
  },
  {
    label: '今日／月度目标完成情况-phone',
    value: 'demo/Phone/analytics/operations/今日／月度目标完成情况-phone.cpt',
  },
  {
    label: '每日资金收支余分析-phone（深色）',
    value: 'demo/Phone/analytics/operations/每日资金收支余分析-phone（深色）.cpt',
  },
  {
    label: '签约情况分析-phone',
    value: 'demo/Phone/analytics/operations/签约情况分析-phone.cpt',
  },
  {
    label: '指标完成情况-phone',
    value: 'demo/Phone/analytics/operations/指标完成情况-phone.cpt',
  },
  {
    label: '每日资金收支余分析-phone（深色）',
    value: 'demo/Phone/analytics/sales/每日资金收支余分析-phone（深色）.cpt',
  },
  {
    label: '销售员整体分析-phone',
    value: 'demo/Phone/analytics/sales/销售员整体分析-phone.cpt',
  },
  {
    label: '销售员整体分析-phone（深色）',
    value: 'demo/Phone/analytics/sales/销售员整体分析-phone（深色）.cpt',
  },
  {
    label: '标题重复页内合计条件预警-phone',
    value: 'demo/Phone/basic/标题重复页内合计条件预警-phone.cpt',
  },
  {
    label: '产品明细-phone',
    value: 'demo/Phone/basic/产品明细-phone.cpt',
  },
  {
    label: '档案式报表-phone',
    value: 'demo/Phone/basic/档案式报表-phone.cpt',
  },
  {
    label: '段落明细表-phone',
    value: 'demo/Phone/basic/段落明细表-phone.cpt',
  },
  {
    label: '放大缩小报表-phone',
    value: 'demo/Phone/basic/放大缩小报表-phone.cpt',
  },
  {
    label: '分片与冻结-phone',
    value: 'demo/Phone/basic/分片与冻结-phone.cpt',
  },
  {
    label: '分组统计-phone',
    value: 'demo/Phone/basic/分组统计-phone.cpt',
  },
  {
    label: '高级条件分组-phone',
    value: 'demo/Phone/basic/高级条件分组-phone.cpt',
  },
  {
    label: '卡片分栏-phone',
    value: 'demo/Phone/basic/卡片分栏-phone.cpt',
  },
  {
    label: '数据钻取主报表-phone',
    value: 'demo/Phone/basic/数据钻取主报表-phone.cpt',
  },
  {
    label: '数据钻取子报表订单明细-phone',
    value: 'demo/Phone/basic/数据钻取子报表订单明细-phone.cpt',
  },
  {
    label: '数据钻取子报表物流信息-phone',
    value: 'demo/Phone/basic/数据钻取子报表物流信息-phone.cpt',
  },
  {
    label: '同比环比等财务统计表-phone',
    value: 'demo/Phone/basic/同比环比等财务统计表-phone.cpt',
  },
  {
    label: '图形化显示进度条-phone',
    value: 'demo/Phone/basic/图形化显示进度条-phone.cpt',
  },
  {
    label: '驾驶舱主页_名片-phone',
    value: 'demo/Phone/dashboard/驾驶舱主页_名片-phone.cpt',
  },
  {
    label: '驾驶舱主页_瀑布流-phone',
    value: 'demo/Phone/dashboard/驾驶舱主页_瀑布流-phone.cpt',
  },
  {
    label: '驾驶舱主页_瀑布流-phone（深色）',
    value: 'demo/Phone/dashboard/驾驶舱主页_瀑布流-phone（深色）.cpt',
  },
  {
    label: '简单自由填报-phone',
    value: 'demo/Phone/form/简单自由填报-phone.cpt',
  },
  {
    label: '客户拜访行程结果录入',
    value: 'demo/Phone/form/客户拜访行程结果录入.cpt',
  },
  {
    label: '请假申请phone',
    value: 'demo/Phone/form/请假申请phone.cpt',
  },
  {
    label: '填报可暂存-phone',
    value: 'demo/Phone/form/填报可暂存-phone.cpt',
  },
  {
    label: '物流信息登记-phone',
    value: 'demo/Phone/form/物流信息登记-phone.cpt',
  },
  {
    label: '移动端连续扫码-phone',
    value: 'demo/Phone/form/移动端连续扫码-phone.cpt',
  },
  {
    label: '工作内容录入-phone',
    value: 'demo/Phone/form/工作内容录入-phone.cpt',
  },
  {
    label: '客户拜访行程安排录入-phone',
    value: 'demo/Phone/form/客户拜访行程安排录入-phone.cpt',
  },
  {
    label: '人员分析-phone',
    value: 'demo/Phone/industry/人员分析-phone.cpt',
  },
  {
    label: '银行存贷汇总-phone',
    value: 'demo/Phone/industry/银行存贷汇总-phone.cpt',
  },
  {
    label: '银行存贷汇总-phone（深色）',
    value: 'demo/Phone/industry/银行存贷汇总-phone（深色）.cpt',
  },
  {
    label: '银行存贷汇总',
    value: 'demo/Phone/industry/银行存贷汇总.cpt',
  },
  {
    label: '银行头寸表-phone',
    value: 'demo/Phone/industry/银行头寸表-phone.cpt',
  },
  {
    label: '银行运营日报-phone',
    value: 'demo/Phone/industry/银行运营日报-phone.cpt',
  },
  {
    label: '参数查询-phone',
    value: 'demo/Phone/parameter/参数查询-phone.cpt',
  },
  {
    label: '复选框多值查询-phone',
    value: 'demo/Phone/parameter/复选框多值查询-phone.cpt',
  },
  {
    label: '复选框多值查询',
    value: 'demo/Phone/parameter/复选框多值查询.cpt',
  },
  {
    label: '下拉树与动态显示查询按钮-phone',
    value: 'demo/Phone/parameter/下拉树与动态显示查询按钮-phone.cpt',
  },
  {
    label: '自定义时间段查询-phone',
    value: 'demo/Phone/parameter/自定义时间段查询-phone.cpt',
  },
  {
    label: '自定义时间段查询',
    value: 'demo/Phone/parameter/自定义时间段查询.cpt',
  },
]

// 当前选中的报表
const selectedReport = ref(reportOptions[0].value)

// 计算属性生成报表URL
const reportUrl = computed(() => {
  const encodedValue = encodeURIComponent(selectedReport.value)
  return `/finereport/webroot/decision/view/report?viewlet=${encodedValue}`
})
</script>

<template>
  <div class="report-container">
    <div class="controls">
      <label for="report-select">选择报表: </label>
      <select
        id="report-select"
        v-model="selectedReport"
        class="report-select"
      >
        <option
          v-for="option in reportOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
    <iframe
      :src="reportUrl"
      frameborder="0"
      width="90%"
      height="calc(100% - 60px)"
    />
  </div>
</template>

<style>
.report-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.controls {
  padding: 15px;
  background-color: #f5f5;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
}

.controls label {
  margin-right: 10px;
  font-weight: bold;
}

.report-select {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  min-width: 250px;
}

iframe {
  border: none;
  flex: 1;
  width: 100%;
}
</style>

<route lang="json5">
{
  name: 'FineReportPhone'
}
</route>
