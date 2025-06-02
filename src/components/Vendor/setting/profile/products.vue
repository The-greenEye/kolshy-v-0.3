<template>
  <div>
<KolshyStyleHeader />
  <main class="p-4">
    <div class="header-bar">
      <h2>Kolshy Products</h2>
      <el-button
        type="danger"
        class="add-btn"
        @click="$router.push('/add_product')"
      >
        <i class="bi bi-plus-circle me-2"></i>
        Add New Product
      </el-button>
    </div>

    <div class="bg-white p-3 rounded shadow">
      <div class="mb-4">
        <h2 class="text-danger mb-3">Filters</h2>
        <div class="filter-bar">
          <el-select
            v-model="filters.category"
            multiple
            clearable
            filterable
            placeholder="Select Category"
            class="filter-select"
          >
            <el-option
              v-for="cat in categories"
              :key="cat.id"
              :label="cat.name"
              :value="cat.id"
            />
          </el-select>
          <el-select
            v-model="filters.stock"
            multiple
            clearable
            placeholder="Select Stock"
            class="filter-select"
          >
            <el-option
              v-for="opt in stockOptions"
              :key="opt"
              :label="opt"
              :value="opt"
            />
          </el-select>
          <el-button type="primary" @click="loadItems" :loading="loading">
            <i class="bi bi-funnel-fill me-1"></i>
            Apply
          </el-button>
        </div>
      </div>

      <el-table
        :data="pagedProducts"
        border
        stripe
        style="width: 100%"
        class="products-table"
        v-loading="loading"
        :empty-text="loading ? 'Loading...' : 'No products found'"
      >
        <el-table-column prop="id" label="ID" width="70" align="center" />
        <el-table-column label="Image" width="100">
          <template #default="scope">
            <img
              :src="scope.row.images?.[0]"
              alt="Product Image"
              style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px"
            />
          </template>
        </el-table-column>
        <el-table-column label="Name" min-width="150">
          <template #default="scope">
            {{ scope.row.name?.en || 'Unnamed' }}
          </template>
        </el-table-column>
        <el-table-column label="Category" min-width="120">
          <template #default="scope">
            {{ getCategoryName(scope.row.category_id) }}
          </template>
        </el-table-column>
        <el-table-column label="Price" min-width="100" align="center">
          <template #default="scope">
            ${{ scope.row.base_price }}
          </template>
        </el-table-column>
        <el-table-column label="Status" width="100" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'info'">
              {{ scope.row.status === 1 ? 'Active' : 'Inactive' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Stock" width="80" align="center">
          <template #default="scope">
            {{ scope.row.base_stock }}
          </template>
        </el-table-column>
        <el-table-column label="Actions" min-width="120" align="center">
          <template #default="scope">
            <el-button
              size="small"
              @click="editProduct(scope.row)"
              circle
              type="primary"
            >
              <i class="bi bi-pencil"></i>
            </el-button>
            <el-button
              size="small"
              @click="deleteProduct(scope.row)"
              circle
              type="danger"
            >
              <i class="bi bi-trash"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-bar">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="filteredProducts.length"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </main>
  <footerC />
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStoreApp } from '@/stores/app'
import axios from 'axios'
const router = useRouter()
const products = ref([])
const categories = ref([])
const stockOptions = ['In Stock', 'Out of Stock']
const filters = ref({ category: [], stock: [] })
const loading = ref(false)
const pageSize = 10
const currentPage = ref(1)
const api = useStoreApp()

const getCategoryName = (id) => {
  const cat = categories.value.find(c => c.id === id)
  return cat ? cat.name : 'Unknown'
}

const filteredProducts = computed(() => {
  let result = products.value
  if (filters.value.category.length) {
    result = result.filter(p => filters.value.category.includes(p.categoryId))
  }
  if (filters.value.stock.length) {
    result = result.filter(p =>
      filters.value.stock.includes(p.base_stock > 0 ? 'In Stock' : 'Out of Stock')
    )
  }
  return result
})

const pagedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredProducts.value.slice(start, start + pageSize)
})

function handlePageChange(page) {
  currentPage.value = page
}

async function loadItems() {
  loading.value = true
  const token = localStorage.getItem('tokenkolshyvendor')
  try {
    const res = await axios.get(`${api.baseUrl}seller/products`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    products.value = res.data.data.data

    const resCat = await axios.get(`${api.baseUrl}seller/products/form-data`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    categories.value = resCat.data.data.categories || []
    console.log("Product:",res.data.data.data, "Form Data:",resCat.data.data)
  } catch (err) {
    ElMessage.warning('Using sample data due to API error.')
    products.value = [
      { id: 1, name: { en: 'Sample Product A' }, category: { name: { en: 'Electronics' } }, categoryId: 1, base_stock: 25, count: 10, base_price: 99.99, status: 1, images: [] },
      { id: 2, name: { en: 'Sample Product B' }, category: { name: { en: 'Home' } }, categoryId: 2, base_stock: 8, count: 2, base_price: 149.99, status: 2, images: [] }
    ]
    categories.value = [
      { id: 1, name: 'Electronics' },
      { id: 2, name: 'Home' }
    ]
  } finally {
    loading.value = false
  }
}

function editProduct(product) {
  router.push({
    path: '/add_product',
    query: { id: product.id }
  })
}

async function deleteProduct(product) {
  const token = localStorage.getItem('tokenkolshyvendor')
  try {
    await ElMessageBox.confirm(
      `Are you sure you want to delete: ${product.name?.en}?`,
      'Warning',
      { type: 'warning' }
    )
    await axios.delete(`${api.baseUrl}seller/products/${product.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    ElMessage.success('Product deleted')
    loadItems()
  } catch (err) {
    if (err !== 'cancel') {
      ElMessage.error('Error deleting product')
    }
  }
}

onMounted(loadItems)
</script>

<script>
import KolshyStyleHeader from "@/components/Global/topBar";
import footerC from "@/components/Global/footer";
export default {
  components: {
    KolshyStyleHeader,
    footerC
  }
}
</script>

<style scoped>
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.add-btn {
  font-weight: bold;
  padding: 8px 25px;
  border-radius: 5px;
}
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}
.filter-select {
  min-width: 180px;
  flex: 1 1 200px;
}
.products-table {
  margin-top: 1rem;
}
.pagination-bar {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
@media (max-width: 900px) {
  .header-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
  .add-btn {
    width: 100%;
  }
  .filter-bar {
    flex-direction: column;
    gap: 0.5rem;
  }
  .filter-select {
    width: 100%;
    min-width: 0;
  }
  .pagination-bar {
    justify-content: center;
  }
}
</style>