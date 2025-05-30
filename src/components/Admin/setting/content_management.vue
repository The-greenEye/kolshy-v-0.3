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
        <div class="d-flex justify-content-start align-items-center">
          <span class="me-4"><i class="bi bi-tags-fill" style="color: #e51748; font-size: 40px"></i></span>
          <b class="fw-bold text-dark fs-5">Categories List</b>
        </div>
        <i class="bi bi-chevron-right" style="color: #010101; font-size: 40px"></i>
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
    <!-- Categories Section -->
    <div class="p-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="d-flex">
          <span class="me-4"><i class="bi bi-tags-fill" style="color: #e51748; font-size: 40px"></i></span>
          Categories List
        </h2>
        <button class="btn text-light rounded-3 fw-bold" style="padding: 10px 25px; background: #e51748"><span class="me-1">+</span> Add New Category</button>
      </div>
      <div class="mt-4">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col" v-for="hd in headers" :key="hd">{{ hd.text }}</th>
            </tr>
          </thead>
          <tbody>
            <!-- <div v-if="categories.length === 0 || null" class="text-uppercase text-danger fw-bold text-center">Not Found Any Category Plz Add one</div> -->
            <tr class="w-100">
              <td>1</td>
              <td>Apple Phone 12pro</td>
              <td>Mobilre</td>
              <td>32</td>
              <td><input type="number" value="1" class="form-control w-50" /></td>
              <td class="text-success fw-bold">203$</td>
              <td class="d-flex justify-content-center align-items-center">
                <span class="fs-4 cursor-pointer fw-bold" @click="showAction === true">...</span>
                <div :class="{ 'd-block': showAction }" style="display: none">
                  <v-btn class="bg-danger text-uppercase">Delete</v-btn>
                  <v-btn class="bg-info text-uppercase">Update</v-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
