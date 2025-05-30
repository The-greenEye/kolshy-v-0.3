<template>
  <div>
    <KolshyStyleHeader />
    <div class="products-page p-4">
      <!-- Top Bar -->
      <div class="top-bar">
        <div>
          <el-tag>All (1)</el-tag>
          <el-tag type="success">Online (1)</el-tag>
          <el-tag type="info">In stock (1)</el-tag>
        </div>
        <div class="actions">
          <el-button style="background: #e51748; font-weight: bold; color: white" @click="goToAddProduct">Add new product</el-button>
          <el-button>Import</el-button>
          <el-button>Export</el-button>
        </div>
      </div>

      <!-- Filters -->
      <div class="filters">
        <el-select v-model="filters.date" placeholder="All dates" style="width: 140px">
          <el-option label="All dates" value="all" />
        </el-select>
        <el-select v-model="filters.category" placeholder="- Select a category -" style="width: 180px">
          <el-option label="- Select a category -" value="" />
        </el-select>
        <el-select v-model="filters.type" placeholder="Product type" style="width: 140px">
          <el-option label="Product type" value="" />
        </el-select>
        <el-select v-model="filters.filter" placeholder="- Select Filter -" style="width: 160px">
          <el-option label="- Select Filter -" value="" />
        </el-select>
        <el-button>FILTER</el-button>
        <el-button>Reset</el-button>
        <el-input v-model="search" placeholder="Search Products" style="width: 200px" />
        <el-button>SEARCH</el-button>
      </div>

      <!-- Bulk Actions -->
      <div class="bulk-actions">
        <el-input placeholder="Bulk Actions" style="width: 200px" />
        <el-button>APPLY</el-button>
      </div>

      <!-- Products Table -->
      <el-table :data="products" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="IMAGE" width="80">
          <template #default>
            <!-- No image for fake data -->
          </template>
        </el-table-column>
        <el-table-column prop="name" label="NAME" />
        <el-table-column label="STATUS" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 'Online'" type="success">Online</el-tag>
            <el-tag v-else type="info">Offline</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="sku" label="SKU" width="80" />
        <el-table-column label="STOCK" width="100">
          <template #default="scope">
            <span style="color: #4caf50">{{ scope.row.stock }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="PRICE" width="120" />
        <el-table-column prop="earning" label="EARNING" width="100" />
        <el-table-column prop="type" label="TYPE" width="80" />
        <el-table-column prop="views" label="VIEWS" width="80" />
        <el-table-column label="DATE" width="140">
          <template #default="scope">
            <div>{{ scope.row.date }}</div>
            <div>Published</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <footerC />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const search = ref("");
const filters = ref({
  date: "all",
  category: "",
  type: "",
  filter: "",
});

// Fake data
const products = ref([
  {
    id: 1,
    name: "Reverse Withdrawal Payment",
    status: "Online",
    sku: "-",
    stock: "In stock",
    price: "AED 0.00",
    earning: "-",
    type: "cloud",
    views: 0,
    date: "May 27, 2025",
  },
]);

function goToAddProduct() {
  router.push("/add_product");
}
</script>

<script>
import KolshyStyleHeader from "@/components/Global/topBar";
import footerC from "@/components/Global/footer";

export default {
  name: "ProductsPage",
    components: {
        KolshyStyleHeader,
        footerC,
    },
    data(){
        return {

        }
    }
};
</script>

<style scoped>
.products-page {
  font-family: Arial, sans-serif;
  padding: 24px;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.top-bar .actions > * {
  margin-left: 0.5rem;
}
.filters,
.bulk-actions {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.5rem;
}
</style>
