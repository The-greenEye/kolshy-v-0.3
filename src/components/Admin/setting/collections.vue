<template>
  <div class="p-4 bg-light mt-4">
    <!-- Header and Actions omitted -->
    <!-- Virtualized Collections List -->
    <div class="bg-white p-2 p-sm-4 rounded shadow mt-4 table-responsive">
      <RecycleScroller :items="collections" :item-size="72" class="virtual-list">
        <template #default="{ item, index }" >
          <div class="virtual-row d-flex align-items-center p-2 border-bottom" :key="index">
            <el-avatar :src="item.thumbnail" size="large" class="me-3" />
            <div class="flex-grow-1">
              <div class="fw-bold">{{ item.name.en }}</div>
              <div class="text-muted small">Products: {{ item.products_count }}</div>
            </div>
            <div class="me-3 small">{{ formatDate(item.created_at) }}</div>
            <el-button type="primary" size="small" @click="editCollection(item)">Edit</el-button>
            <el-button type="danger" size="small" @click="deleteCollection(item)">Delete</el-button>
          </div>
        </template>
      </RecycleScroller>
      <el-table :data="collections" border style="width: 100%" size="small" :header-cell-style="{ background: '#f5f7fa', color: '#333' }" v-loading="loading">
        <el-table-column type="selection" width="55" />
        <el-table-column label="Collection" min-width="200">
          <template #default="scope">
            <div class="d-flex align-items-center">
              <el-avatar :src="scope.row.thumbnail" size="large" class="me-3" />
              <div><div class="fw-bold">{{ scope.row.name.en }}</div></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Description" min-width="200">
          <template #default="scope">{{ scope.row.description.en }}</template>
        </el-table-column>
        <el-table-column prop="products_count" label="Products" width="100" align="center" />
        <el-table-column label="Created At" width="160">
          <template #default="scope">{{ formatDate(scope.row.created_at) }}</template>
        </el-table-column>
        <el-table-column label="Updated At" width="160">
          <template #default="scope">{{ formatDate(scope.row.updated_at) }}</template>
        </el-table-column>
        <el-table-column label="Actions" align="center" width="180">
          <template #default="scope">
            <el-button type="primary" size="small" @click="editCollection(scope.row)">
              <i class="bi bi-pencil me-1"></i> Edit
            </el-button>
            <el-button type="danger" size="small" @click="deleteCollection(scope.row)">
              <i class="bi bi-trash me-1"></i> Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="totalCollections" :page-size="pageSize" :current-page="currentPage" @current-change="handlePageChange" class="mt-3" />
    </div>

    <!-- Sidebar Form -->
    <transition name="sidebar-slide">
      <div v-if="showCollectionSidebar" class="collection-sidebar">
        <h4 class="fw-bold text-primary mb-3 d-flex justify-content-between">
          {{ editingId ? 'Edit Collection' : 'Add New Collection' }}
          <el-row :gutter="12" class="mt-4">
            <el-col :xs="12">
              <el-button @click="cancelForm" type="primary" plain class="w-100">Cancel</el-button>
            </el-col>
            <el-col :xs="12">
              <el-button type="primary" @click="submitForm" class="w-100">{{ editingId ? 'Update' : 'Add' }}</el-button>
            </el-col>
          </el-row>
        </h4>
        <el-form label-position="top" :disabled="loading">
            <el-spin v-if="loading" size="large" style="display:block; margin: 0 auto 16px auto;" />
          <el-form-item label="Collection Name (English)">
            <el-input v-model="form.name" placeholder="Enter name in English" />
          </el-form-item>
          <el-form-item label="Collection Name (Arabic)">
            <el-input v-model="form.name_ar" placeholder="ادخل الاسم بالعربية" />
          </el-form-item>
          <el-form-item label="Description (English)">
            <el-input type="textarea" v-model="form.desc" rows="3" placeholder="Enter English description" />
          </el-form-item>
          <el-form-item label="Description (Arabic)">
            <el-input type="textarea" v-model="form.desc_ar" rows="3" placeholder="ادخل الوصف بالعربية" />
          </el-form-item>
          <el-form-item label="Categories">
            <el-select v-model="form.categories" multiple filterable placeholder="Select categories" class="w-100">
              <el-option v-for="(name, id) in categories" :key="id" :label="name" :value="id" />
            </el-select>
          </el-form-item>
          <el-form-item label="Thumbnail">
            <el-upload class="w-100" :show-file-list="false" :before-upload="() => false" :on-change="handleFileChange">
              <el-button type="primary" plain>Browse Image</el-button>
            </el-upload>
            <div v-if="form.thumbnailUrl" class="mt-2">
              <img :src="form.thumbnailUrl" alt="Preview" style="max-width: 100%; max-height: 120px; border-radius: 8px" />
            </div>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
import { RecycleScroller } from 'vue3-virtual-scroller';
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useAdminCategoryApi } from '@/composables/useAdminCategoryApi';
import { useAdminCollectionApi } from '@/composables/useAdminCollectionApi';

export default {
  name: 'CollectionsAdmin',
  setup() {
    // Composables for categories & collections
    const categoryApi = useAdminCategoryApi();
    const collectionApi = useAdminCollectionApi();

    // Reactive state
    const showCollectionSidebar = ref(false);
    const loading = ref(false);
    const currentPage = ref(1);
    const pageSize = ref(6);
    const totalCollections = ref(0);
    const collections = ref([]);
    const categories = reactive({}); // { id: name_en }

    const editingId = ref(null);

    const form = reactive({
      name: '',
      name_ar: '',
      desc: '',
      desc_ar: '',
      categories: [],
      thumbnail: null,
      thumbnailUrl: null,
    });

    // Format date helper
    const formatDate = (dateStr) => {
      if (!dateStr) return '—';
      const date = new Date(dateStr);
      return (
        date.toLocaleDateString() +
        ' ' +
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    };

    // Fetch categories for form select
    /**
     * Fetch categories for the form select dropdown.
     */
    const fetchCategories = async () => {
      try {
        const res = await categoryApi.getCategories(1, 100);
        categoriesClear();
        res.data.data.data.forEach((cat) => {
          categories[cat.id] = cat.name.en;
        });
      } catch (err) {
        // Log error for debugging in development
        if (process.env.NODE_ENV === 'development') {
          console.error("Error loading categories:", err);
        }
        ElMessage.error('Failed to load categories. Please try again later.');
      }
    };

    const categoriesClear = () => {
      Object.keys(categories).forEach((key) => delete categories[key]);
    };

    // Load collections list
    /**
     * Load collections for the current page.
     * Updates the collections list and total count.
     */
    const loadCollections = async (page = 1) => {
      loading.value = true;
      try {
        const res = await collectionApi.getCollections(page, pageSize.value);
        const data = res.data.data;
        collections.value = data.data;
        totalCollections.value = data.total;
      } catch (err) {
        // Log error for debugging in development
        if (process.env.NODE_ENV === 'development') {
          console.error("Error loading collections:", err);
        }
        ElMessage.error('Failed to load collections. Please try again later.');
      } finally {
        loading.value = false;
      }
    };

    // Pagination handler
    const handlePageChange = (page) => {
      currentPage.value = page;
      loadCollections(page);
    };

    // Handle thumbnail file input
    const handleFileChange = (file) => {
      form.thumbnail = file.raw;
      const reader = new FileReader();
      reader.onload = (e) => {
        form.thumbnailUrl = e.target.result;
      };
      reader.readAsDataURL(file.raw);
    };

    // Reset form
    const resetForm = () => {
      form.name = '';
      form.name_ar = '';
      form.desc = '';
      form.desc_ar = '';
      form.categories = [];
      form.thumbnail = null;
      form.thumbnailUrl = null;
      editingId.value = null;
    };

    // Cancel form and hide sidebar
    const cancelForm = () => {
      resetForm();
      showCollectionSidebar.value = false;
    };

    // Submit form (create or update)
    /**
     * Submit the collection form (create or update).
     * Shows a success message on success, error message on failure.
     */
    const submitForm = async () => {
      loading.value = true;
      const formData = new FormData();
      formData.append('name[en]', form.name);
      formData.append('name[ar]', form.name_ar);
      formData.append('description[en]', form.desc);
      formData.append('description[ar]', form.desc_ar);
      if (form.thumbnail) formData.append('thumbnail', form.thumbnail);
      form.categories.forEach((id) => formData.append('category_ids[]', id));

      try {
        if (editingId.value) {
          await collectionApi.updateCollection(editingId.value, formData);
          ElMessage.success('Collection updated');
        } else {
          await collectionApi.createCollection(formData);
          ElMessage.success('Collection created');
        }
        cancelForm();
        loadCollections(currentPage.value);
      } catch (err) {
        // Log error for debugging in development
        if (process.env.NODE_ENV === 'development') {
          console.error("Error saving collection:", err);
        }
        ElMessage.error('Error saving collection. Please check your input and try again.');
      } finally {
        loading.value = false;
      }
    };

    // Edit existing collection
    /**
     * Edit an existing collection (populate the form for editing).
     * @param {Object} row
     */
    const editCollection = (row) => {
      editingId.value = row.id;
      form.name = row.name?.en || '';
      form.name_ar = row.name?.ar || '';
      form.desc = row.description?.en || '';
      form.desc_ar = row.description?.ar || '';
      form.thumbnail = null;
      form.thumbnailUrl = row.thumbnail;
      form.categories = row.categories?.map((cat) => cat.id) || [];
      showCollectionSidebar.value = true;
    };

    // Delete existing collection
    /**
     * Delete an existing collection by row data.
     * @param {Object} row
     */
    const deleteCollection = async (row) => { 
      try {
        await collectionApi.deleteCollection(row.id);
        ElMessage.success('Collection deleted');
        loadCollections(currentPage.value);
      } catch (err) {
        // Log error for debugging in development
        if (process.env.NODE_ENV === 'development') {
          console.error("Error deleting collection:", err);
        }
        ElMessage.error('Error deleting collection. Please try again later.');
      }
    };
  
    // Export CSV same as before
    /**
     * Export the collections list to a CSV file.
     */
    const exportToCSV = () => {
      const headers = ['ID', 'Name (EN)', 'Description', 'Products', 'Created At', 'Updated At'];
      const rows = collections.value.map((col) => [
        col.id,
        col.name.en,
        col.description.en,
        col.products_count,
        col.created_at,
        col.updated_at,
      ]);
      const csvContent = [headers, ...rows]
        .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
        .join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'collections_export.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    // On mount fetch initial data
    onMounted(() => {
      const t0 = performance.now();
      fetchCategories();
      loadCollections();
      const t1 = performance.now();
      console.log(`CollectionsAdmin mounted in ms`);
      fetchCategories();
      loadCollections();
    });

    return {
      showCollectionSidebar,
      currentPage,
      pageSize,
      totalCollections,
      collections,
      categories,
      editingId,
      form,
      formatDate,
      cancelForm,
      handleFileChange,
      submitForm,
      editCollection,
      handlePageChange,
      exportToCSV,
      deleteCollection,
    };
  },
};
</script>


  <style scoped>
  /* Sidebar responsiveness */
  .collection-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 30vw;
    max-width: 400px;
    min-width: 280px;
    background: #fff;
    border-radius: 1rem 0 0 1rem;
    padding: 2rem 1.5rem 1.5rem 1.5rem;
    box-shadow: -2px 0 16px rgba(0, 0, 0, 0.15);
    z-index: 1050;
    overflow-y: scroll;
    transition: all 0.4s cubic-bezier(0.77, 0, 0.18, 1);
    display: flex;
    flex-direction: column;
  }
  .sidebar-slide-enter-active,
  .sidebar-slide-leave-active {
    transition: all 0.4s;
  }
  .sidebar-slide-enter-from,
  .sidebar-slide-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }
  
  /* Table responsiveness */
  .table-responsive {
    overflow-x: auto;
  }
  .el-table {
    min-width: 600px;
  }
  @media (max-width: 1200px) {
    .collection-sidebar {
      width: 40vw;
      max-width: 100vw;
      min-width: 200px;
    }
  }
  @media (max-width: 900px) {
    .collection-sidebar {
      width: 60vw;
      max-width: 100vw;
      min-width: 160px;
      padding: 1.2rem 0.7rem 1rem 0.7rem;
    }
    .el-table {
      font-size: 0.97rem;
    }
    .el-avatar {
      width: 36px !important;
      height: 36px !important;
    }
  }
  @media (max-width: 768px) {
    .collection-sidebar {
      width: 100vw;
      max-width: 100vw;
      min-width: 0;
      border-radius: 0;
      padding: 1.2rem 0.5rem 1rem 0.5rem;
    }
    .el-table {
      font-size: 0.93rem;
      min-width: 480px;
    }
    .el-avatar {
      width: 32px !important;
      height: 32px !important;
    }
    .fw-bold,
    h2,
    h5 {
      font-size: 1.1rem !important;
    }
    .el-input,
    .el-textarea,
    .el-button {
      width: 100% !important;
      font-size: 1rem !important;
    }
    .d-flex.justify-content-between {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
  @media (max-width: 480px) {
    .collection-sidebar {
      padding: 0.7rem 0.2rem 0.7rem 0.2rem;
    }
    .el-table {
      font-size: 0.89rem;
      min-width: 350px;
    }
    .el-avatar {
      width: 28px !important;
      height: 28px !important;
    }
    .fw-bold,
    h2,
    h5 {
      font-size: 1rem !important;
    }
  }
  </style>