<script setup lang="ts">
// 页面逻辑
</script>

<template>
  <div class="finereport-demos-page">
    <h1>FineReport Demos</h1>
    <p class="description">
      以下是FineReport相关的演示页面：
    </p>

    <div class="demo-links">
      <div class="demo-card">
        <h2>FineReport 基础演示</h2>
        <p>基本的FineReport报表展示页面</p>
        <router-link to="/finereport" class="demo-link">
          前往 FineReport 演示
        </router-link>
      </div>

      <div class="demo-card">
        <h2>FineReport Tab 演示</h2>
        <p>带有标签页的FineReport报表展示</p>
        <router-link to="/finereport-tab" class="demo-link">
          前往 FineReport Tab 演示
        </router-link>
      </div>

      <div class="demo-card">
        <h2>FineReport Test 演示</h2>
        <p>FineReport测试页面</p>
        <router-link to="/finereport-test" class="demo-link">
          前往 FineReport Test 演示
        </router-link>
      </div>

      <div class="demo-card">
        <h2>FineReport Phone示例 演示</h2>
        <p>FineReport Phone示例 演示</p>
        <router-link to="/finereport-phone" class="demo-link">
          前往 FineReport Phone示例 演示
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.finereport-demos-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    color: #333;
    margin-bottom: 10px;
  }

  .description {
    color: #666;
    margin-bottom: 30px;
    font-size: 16px;
  }

  .demo-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 30px;
  }

  .demo-card {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
    }

    h2 {
      color: #2c3e50;
      margin-bottom: 10px;
      font-size: 18px;
    }

    p {
      color: #7f8c8d;
      margin-bottom: 20px;
      line-height: 1.5;
    }

    .demo-link {
      display: inline-block;
      padding: 10px 20px;
      background: #3498db;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 500;
      transition: background-color 0.3s ease;

      &:hover {
        background: #2980b9;
      }
    }
  }
}
</style>

<route lang="json5">
{
  name: 'FineReportDemos'
}
</route>
