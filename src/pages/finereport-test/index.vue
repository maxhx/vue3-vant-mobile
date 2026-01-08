<script setup>
import { ref, onMounted } from 'vue'

const testResults = ref([])
const isLoading = ref(false)

async function testProxy(url, description) {
  try {
    isLoading.value = true
    const response = await fetch(url, { 
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin'
    })
    
    const result = {
      url,
      description,
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      contentType: response.headers.get('content-type'),
      timestamp: new Date().toLocaleTimeString()
    }
    
    testResults.value.push(result)
    console.log(`Test result for ${description}:`, result)
  } catch (error) {
    const result = {
      url,
      description,
      error: error.message,
      timestamp: new Date().toLocaleTimeString()
    }
    testResults.value.push(result)
    console.error(`Test failed for ${description}:`, error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  // 测试不同的 URL
  const tests = [
    {
      url: '/finereport/webroot/decision/view/report?viewlet=demo%2Ftest%2Fmy_example1.cpt',
      description: '主报表页面'
    },
    {
      url: '/finereport/',
      description: 'FineReport 根路径'
    },
    {
      url: '/webroot/decision/view/report?op=resource&resource=/com/fr/web/core/js/socket.io.js',
      description: '静态资源（socket.io.js）'
    },
    {
      url: '/finereport/webroot/decision/view/report?op=resource&resource=/com/fr/web/core/js/socket.io.js',
      description: '带前缀的静态资源'
    }
  ]
  
  // 依次执行测试
  tests.forEach((test, index) => {
    setTimeout(() => {
      testProxy(test.url, test.description)
    }, index * 1000)
  })
})
</script>

<template>
  <div class="test-container">
    <h1>FineReport 代理测试</h1>
    
    <div class="test-controls">
      <button 
        @click="testResults = []" 
        :disabled="isLoading"
        class="clear-btn"
      >
        清除结果
      </button>
    </div>
    
    <div v-if="isLoading" class="loading">
      测试中...
    </div>
    
    <div class="results">
      <div 
        v-for="(result, index) in testResults" 
        :key="index"
        class="result-item"
        :class="{ 
          'success': result.ok, 
          'error': result.error || !result.ok 
        }"
      >
        <div class="result-header">
          <strong>{{ result.description }}</strong>
          <span class="timestamp">{{ result.timestamp }}</span>
        </div>
        <div class="result-url">URL: {{ result.url }}</div>
        <div v-if="result.status !== undefined">
          状态: {{ result.status }} {{ result.statusText }}
        </div>
        <div v-if="result.contentType">
          Content-Type: {{ result.contentType }}
        </div>
        <div v-if="result.error" class="error-message">
          错误: {{ result.error }}
        </div>
      </div>
    </div>
    
    <div class="direct-links">
      <h3>直接访问链接：</h3>
      <ul>
        <li>
          <a href="/finereport/webroot/decision/view/report?viewlet=demo%2Ftest%2Fmy_example1.cpt" target="_blank">
            FineReport 报表
          </a>
        </li>
        <li>
          <a href="http://localhost:8075/webroot/decision/view/report?viewlet=demo%2Ftest%2Fmy_example1.cpt" target="_blank">
            直接访问 FineReport (端口 8075)
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.test-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.test-controls {
  margin-bottom: 20px;
}

.clear-btn {
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.clear-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading {
  padding: 10px;
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 4px;
  margin-bottom: 20px;
}

.results {
  margin-bottom: 30px;
}

.result-item {
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.result-item.success {
  background-color: #f6ffed;
  border-color: #b7eb8f;
}

.result-item.error {
  background-color: #fff2f0;
  border-color: #ffccc7;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.timestamp {
  font-size: 12px;
  color: #666;
}

.result-url {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
  word-break: break-all;
}

.error-message {
  color: #ff4d4f;
  font-weight: bold;
}

.direct-links ul {
  list-style-type: none;
  padding: 0;
}

.direct-links li {
  margin-bottom: 10px;
}

.direct-links a {
  color: #1890ff;
  text-decoration: none;
}

.direct-links a:hover {
  text-decoration: underline;
}
</style>

<route lang="json5">
{
  name: 'FineReportTest'
}
</route>