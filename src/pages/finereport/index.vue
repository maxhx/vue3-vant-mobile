<script setup>
// 使用代理后的 URL，避免跨域问题
const reportUrl
  = '/finereport/webroot/decision/view/report?viewlet=demo%252Ftest%252Fmy_example1_mobile.cpt&op=h5'
</script>

<template>
  <div class="report-container">
    <iframe
      :src="reportUrl"
      frameborder="0"
      width="95%"
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
  name: 'FineReport'
}
</route>
