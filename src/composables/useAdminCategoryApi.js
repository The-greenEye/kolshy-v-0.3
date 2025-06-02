// src/composables/useAdminCategoryApi.js
import axios from "axios";
const token = localStorage.getItem("tokenAdminKolshy"); // adjust based on your storage

const api = axios.create({
  baseURL: "https://back.kolshy.ae/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export function useAdminCategoryApi() {
  const getCategories = (page = 1, perPage = 10) => {
    return api.get(`/admin/categories?page=${page}&per_page=${perPage}`);
  };

  const createCategory = (formData) => {
    return api.post("/admin/categories", formData);
  };

  const updateCategory = (id, formData) => {
    formData.append("_method", "PUT");
    return api.post(`/admin/categories/${id}`, formData);
  };

  const getCategoryById = (id) => {
    return api.get(`/admin/categories/${id}`);
  };

  return {
    getCategories,
    createCategory,
    updateCategory,
    getCategoryById,
  };
}
