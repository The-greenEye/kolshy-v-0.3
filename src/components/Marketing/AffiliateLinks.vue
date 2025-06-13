<template>
  <el-card class="affiliate-links-card">
    <div class="card-header">
      <i class="bi bi-link-45deg"></i>
      <span>Referral Links</span>
    </div>
    <div class="table-responsive">
  <el-table :data="links" style="width: 100%; min-width: 600px;">
      <el-table-column prop="name" label="Campaign" />
      <el-table-column prop="url" label="Link">
        <template #default="scope">
          <el-input :model-value="scope.row.url" readonly>
  <template #suffix>
    <i class="bi bi-clipboard" style="cursor:pointer" @click.stop="copyToClipboard(scope.row.url)"></i>
  </template>
</el-input>
        </template>
      </el-table-column>
      <el-table-column label="Actions">
        <template #default="scope">
          <el-button size="small" @click="copyToClipboard(scope.row.url)">
  <i class="bi bi-clipboard"></i> Copy
</el-button>
        </template>
      </el-table-column>
    </el-table>
</div>
    <el-divider />
    <el-form :model="newLink" inline @submit.prevent="addLink">
      <el-form-item label="Campaign">
        <el-input v-model="newLink.name" placeholder="Campaign name">
  <template #suffix>
    <i class="bi bi-pencil"></i>
  </template>
</el-input>
      </el-form-item>
      <el-form-item label="Link">
        <el-input v-model="newLink.url" placeholder="Referral link">
  <template #suffix>
    <i class="bi bi-link-45deg"></i>
  </template>
</el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addLink">Add</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import 'bootstrap-icons/font/bootstrap-icons.css';

const links = ref([
  { name: 'Default', url: 'https://kolshy.com/ref/abc123' },
]);
const newLink = ref({ name: '', url: '' });

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  ElMessage.success('Copied to clipboard!');
}

function addLink() {
  if (newLink.value.name && newLink.value.url) {
    let url = newLink.value.url;
    if (!url.startsWith('https://kolshy.com/ref/')) {
      url = 'https://kolshy.com/ref/' + url.replace(/^\/+/, '');
    }
    links.value.push({ name: newLink.value.name, url });
    newLink.value.name = '';
    newLink.value.url = '';
    ElMessage.success('Link added!');
  } else {
    ElMessage.warning('Please fill in both fields.');
  }
}
</script>

<style scoped>
.affiliate-links-card {
  max-width: 900px;
  margin: 0 auto;
}
.card-header {
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  gap: 0.5rem;
}
@media (max-width: 600px) {
  .affiliate-links-card {
    padding: 0.5rem;
  }
  .card-header {
    font-size: 1rem;
  }
  .table-responsive {
    width: 100%;
    overflow-x: auto;
  }
  .table-responsive .el-table {
    min-width: 600px;
  }
}
</style>
