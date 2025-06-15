<template>
  <el-card class="affiliate-commission-card">
    <div class="card-header">
      <i class="bi bi-percent"></i>
      <span>Commission Settings</span>
    </div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Global Rate" name="global">
        <el-form label-width="140px">
          <el-form-item label="Default Commission (%)">
            <el-input-number v-model="globalRate" :min="0" :max="100" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveGlobal">Save</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Category Overrides" name="category">
        <el-button type="primary" @click="addCategory">Add Override</el-button>
        <el-table :data="categoryOverrides" style="margin-top: 1rem; width: 100%;">
          <el-table-column prop="category" label="Category" />
          <el-table-column prop="rate" label="Rate (%)" />
          <el-table-column label="Actions">
            <template #default="scope">
              <el-button type="text" size="small" @click="editCategory(scope.row)">Edit</el-button>
              <el-button type="text" size="small" @click="removeCategory(scope.$index)">Remove</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Product Overrides" name="product">
        <el-button type="primary" @click="addProduct">Add Override</el-button>
        <el-table :data="productOverrides" style="margin-top: 1rem; width: 100%;">
          <el-table-column prop="product" label="Product ID" />
          <el-table-column prop="rate" label="Rate (%)" />
          <el-table-column label="Actions">
            <template #default="scope">
              <el-button type="text" size="small" @click="editProduct(scope.row)">Edit</el-button>
              <el-button type="text" size="small" @click="removeProduct(scope.$index)">Remove</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';
import 'bootstrap-icons/font/bootstrap-icons.css';

const activeTab = ref('global');
const globalRate = ref(5);
const categoryOverrides = ref([
  { category: 'Electronics', rate: 8 },
  { category: 'Books', rate: 10 }
]);
const productOverrides = ref([
  { product: '123', rate: 12 },
]);

function saveGlobal() {
  // TODO: save to backend or store
  alert(`Global rate set to ${globalRate.value}%`);
}
function addCategory() {
  const cat = prompt('Enter category name');
  const rate = parseFloat(prompt('Enter commission rate (%)'));
  if (cat && !isNaN(rate)) {
    categoryOverrides.value.push({ category: cat, rate });
  }
}
function editCategory(row) {
  const rate = parseFloat(prompt('Enter new rate (%)', row.rate));
  if (!isNaN(rate)) row.rate = rate;
}
function removeCategory(index) {
  categoryOverrides.value.splice(index, 1);
}
function addProduct() {
  const pid = prompt('Enter product ID');
  const rate = parseFloat(prompt('Enter commission rate (%)'));
  if (pid && !isNaN(rate)) {
    productOverrides.value.push({ product: pid, rate });
  }
}
function editProduct(row) {
  const rate = parseFloat(prompt('Enter new rate (%)', row.rate));
  if (!isNaN(rate)) row.rate = rate;
}
function removeProduct(index) {
  productOverrides.value.splice(index, 1);
}
</script>

<style scoped>
.affiliate-commission-card {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  color: #e51742;
}
</style>
