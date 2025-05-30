<template>
  <main class="p-4">
    <div class="w-100 d-flex justify-content-between align-items-center mb-4">
      <h2>Kolshy Products</h2>
      <v-btn style="background-color: #e51748; font-weight: bold; color: white; padding: 8px 25px"> <span>+</span> Add New Product </v-btn>
    </div>

    <div class="bg-white p-2 rounded shadow">
      <div class="mb-4">
        <h2 style="color: #e51748; margin: 15px 0; display: block">Filters</h2>
        <div class="d-flex justify-content-between align-items-center">
          <v-select clearable chips label="Select Category" class="mr-4 rounded-pill text-no-wrap text-uppercase font-weight-bold" :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" multiple variant="solo"></v-select>

          <v-select clearable chips label="Select Stock" class="ml-4 rounded-pill text-no-wrap text-uppercase font-weight-bold" :items="['28', '28', '130', '20', '70', '80']" multiple variant="solo"></v-select>
        </div>
      </div>

      <div class="row mt-4 p-2">
        <div v-if="!loading && products.length === 0" class="text-center py-4 w-100">
          <h4 class="text-muted">We don't find any product, please add one</h4>
        </div>
        <table class="table table-striped">
            <thead>
          <tr>
              <th scope="col">#</th>
              <th v-for="hd in headers" :key="hd">{{ hd.text }}</th>
          </tr>
            </thead>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "KolshyProduct",
  data() {
    return {
      products: [],
      headers: [
        { text: "Name", value: "name" },
        { text: "Category", value: "category" },
        { text: "Stock", value: "stock" },
        { text: "Count", value: "count" },
        { text: "Price", value: "price" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      page: 1,
      itemsPerPage: 10,
      totalProducts: 0,
      loading: false,
    };
  },
  mounted() {
    this.loadItems();
  },
  methods: {
    async loadItems() {
      this.loading = true;
      const token = localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      try {
        // If this endpoint is available, it will populate real data
        const response = await axios.get("/admin/products", config);
        this.products = response.data.data;
        this.totalProducts = response.data.meta?.total || this.products.length;
      } catch (error) {
        console.error("Failed to fetch products. Using placeholder data.", error);
        // Placeholder data if API fails or is missing
        this.products = [
          {
            name: "Sample Product A",
            category: "Electronics",
            stock: 25,
            count: 10,
            price: 99.99,
          },
          {
            name: "Sample Product B",
            category: "Home",
            stock: 8,
            count: 2,
            price: 149.99,
          },
        ];
        this.totalProducts = this.products.length;
      } finally {
        this.loading = false;
      }
    },

    editProduct(item) {
      console.log("Edit product:", item);
      // TODO: Implement edit logic
    },

    deleteProduct(item) {
      console.log("Delete product:", item);
      // TODO: Implement delete logic
    },
  },
};
</script>

<style scoped>
.text-muted {
  color: #6c757d;
}
</style>
