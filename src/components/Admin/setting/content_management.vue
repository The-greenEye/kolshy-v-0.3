<template>
  <div class="p-4 bg-light mt-4">
    <div class="d-flex flex-column p-2" id="control_content">
      <h2 class="mb-4 text-uppercase">Content Management</h2>

      <div id="ads" class="d-flex justify-content-between mt-4 align-items-center p-2 bg-white rounded shadow w-75 cursor-pointer content-btn">
        <div class="d-flex justify-content-start align-items-center">
          <span class="me-4"><i class="bi bi-badge-ad-fill" style="color: #e51748; font-size: 40px"></i></span>
          <b class="fw-bold text-dark fs-5">Sponsored Ads</b>
        </div>
        <i class="bi bi-chevron-right" style="color: #010101; font-size: 40px"></i>
      </div>

      <div id="categories" class="d-flex justify-content-between mt-4 align-items-center p-2 bg-white rounded shadow w-75 cursor-pointer content-btn">
       <router-link to="/admin/categories" class="d-flex justify-content-between w-100 align-items-center">
        <div class="d-flex justify-content-start align-items-center">
          <span class="me-4"><i class="bi bi-tags-fill" style="color: #e51748; font-size: 40px"></i></span>
          <b class="fw-bold text-dark fs-5">Categories List</b>
        </div>
        <i class="bi bi-chevron-right" style="color: #010101; font-size: 40px"></i>
        </router-link>
      </div>

      <div id="feature_products_kolshy" class="d-flex justify-content-between mt-4 align-items-center p-2 bg-white rounded shadow w-75 cursor-pointer content-btn">
        <div class="d-flex justify-content-start align-items-center">
          <span class="me-4"><i class="bi bi-bag-heart-fill" style="color: #e51748; font-size: 40px"></i></span>
          <b class="fw-bold text-dark fs-5">Featured Products On Kolshy</b>
        </div>
        <i class="bi bi-chevron-right" style="color: #010101; font-size: 40px"></i>
      </div>

      <div id="about_us" class="d-flex justify-content-between mt-4 align-items-center p-2 bg-white rounded shadow w-75 cursor-pointer content-btn">
        <div class="d-flex justify-content-start align-items-center">
          <span class="me-4"><i class="bi bi-info-circle-fill" style="color: #e51748; font-size: 40px"></i></span>
          <b class="fw-bold text-dark fs-5">About Us Content</b>
        </div>
        <i class="bi bi-chevron-right" style="color: #010101; font-size: 40px"></i>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import { useStoreApp } from "../../../stores/app.js";
export default {
  name: "contentManagement",
  data() {
    return {
      categories: [],
      showAction: false,
      headers: [
        { text: "Name", value: "name" },
        { text: "Category", value: "category" },
        { text: "Stock", value: "stock" },
        { text: "Count", value: "count" },
        { text: "Price", value: "price" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  setup() {
    return {
      api: useStoreApp(),
    };
  },
  async mounted() {
    const fullApi = this.api.baseUrl + this.api.endPoint.admin.categories.get_all;
    console.log(fullApi);
    try {
      const res_categories = axios.get(fullApi, {
        headers: {
          Authorization: `Bearer ${localStorage.tokenAdminKolshy}`,
        },
      });
      if ([200, 201].includes(res_categories)) {
        this.categories = (await res_categories).data;
        console.log(this.categories);
      }
    } catch (err) {
      console.error("Wrong Api Bitch", err);
    }
  },
};
</script>

<style scoped>
.content-btn:hover {
  translate: 0 -10px;
}
.content-btn {
  transition: all 0.3s;
}
</style>
