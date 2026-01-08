<script setup>
// 使用代理后的 URL，避免跨域问题
const reportUrl
  = '/finereport/webroot/decision/view/duchamp?viewlet=demo%252Ftest%252Ftab_demo1.fvs&page_number=1'
</script>

<template>
  <div class="report-container">
    <iframe
      :src="reportUrl"
      frameborder="0"
      width="100%"
      height="100%"
    />
  </div>
</template>

<style>
.report-container {
  width: 100vw;
  height: 100vh;
}
iframe {
  border: none;
}
</style>

<route lang="json5">
{
  name: 'FineReportTab'
}
</route>
