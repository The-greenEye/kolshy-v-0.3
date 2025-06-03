// COLLECTION API
import axios from "axios";

const token = localStorage.getItem("tokenAdminKolshy"); // adjust based on your storage

const api = axios.create({
  baseURL: "https://back.kolshy.ae/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
export function useAdminCollectionApi() {
  const getCollections = (page = 1, perPage = 10) => {
    return api.get(`/admin/collections?page=${page}&per_page=${perPage}`);
  };

  const createCollection = (formData) => {
    return api.post("/admin/collections", formData);
  };

  const updateCollection = (id, formData) => {
    formData.append("_method", "PUT");
    return api.post(`/admin/collections/${id}`, formData);
  };

  const getCollectionById = (id) => {
    return api.get(`/admin/collections/${id}`);
  };

  const deleteCollection = (id) => {
    return api.delete(`/admin/collections/${id}`);
  };
  return {
    // collections
    getCollections,
    createCollection,
    updateCollection,
    getCollectionById,
    deleteCollection,
  };
}
