<template>
  <div class="p-4 bg-light mt-4">
    <!-- Header and Actions omitted for brevity -->
    <!-- Virtualized Categories List -->
    <div class="bg-white p-2 p-sm-4 rounded shadow mt-4 table-responsive">
      <RecycleScroller :items="categories" :item-size="72" class="virtual-list">
        <template #default="{ item }">
          <div class="virtual-row d-flex align-items-center p-2 border-bottom">
            <el-avatar :src="item.thumbnail" size="large" class="me-3" />
            <div class="flex-grow-1 fw-bold">{{ item.name.en }}</div>
            <div class="me-3">{{ formatDate(item.created_at) }}</div>
            <el-button type="primary" size="small" @click="editCategory(item)">Edit</el-button>
          </div>
        </template>
      </RecycleScroller>
        v-loading="loading"
        :data="categories"
        border
        style="width: 100%; min-width: 600px"
        :header-cell-style="{ background: '#f5f7fa', color: '#333' }"
        size="small"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="Category" min-width="200">
          <template #default="scope">
            <div class="d-flex align-items-center">
              <el-avatar :src="scope.row.thumbnail" size="large" class="me-3" />
              <div>
                <div class="fw-bold">{{ scope.row.name.en }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Description" min-width="200">
          <template #default="scope">
            {{ scope.row.description.en }}
          </template>
        </el-table-column>
        <el-table-column label="Options" min-width="180">
          <template #default="scope">
            <span v-if="scope.row.options && scope.row.options.length">
              {{ scope.row.options.map((opt) => opt.name.en).join(", ") }}
            </span>
            <span v-else class="text-muted">—</span>
          </template>
        </el-table-column>
        <el-table-column prop="products_count" label="Products" width="100" align="center" />
        <el-table-column label="Created At" width="160">
          <template #default="scope">
            {{ formatDate(scope.row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="Updated At" width="160">
          <template #default="scope">
            {{ formatDate(scope.row.updated_at) }}
          </template>
        </el-table-column>
        <el-table-column label="Actions" align="center" width="180">
          <template #default="scope">
            <el-button type="primary" size="small" @click="editCategory(scope.row)">
              <i class="bi bi-pencil me-1"></i> Edit
            </el-button>
          </template>
        </el-table-column>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCategories"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
        class="mt-3"
      />
    </div>

    <!-- Sidebar (Form) -->
    <transition name="sidebar-slide">
      <div v-if="showCategorySidebar" class="category-sidebar">
        <h4 class="fw-bold text-danger mb-3">{{ editingId ? "Edit Category" : "Add New Category" }}</h4>
        <el-form label-position="top" :disabled="loading">
            <el-spin v-if="loading" size="large" style="display:block; margin: 0 auto 16px auto;" />
          <el-form-item label="Category Name (English)">
            <el-input v-model="form.name" placeholder="Enter category name in English" />
          </el-form-item>
          <el-form-item label="Category Name (Arabic)">
            <el-input v-model="form.name_ar" placeholder="ادخل اسم التصنيف بالعربية" />
          </el-form-item>
          <el-form-item label="Description (English)">
            <el-input type="textarea" v-model="form.desc" rows="3" placeholder="Enter description in English" />
          </el-form-item>
          <el-form-item label="Description (Arabic)">
            <el-input type="textarea" v-model="form.desc_ar" rows="3" placeholder="ادخل الوصف بالعربية" />
          </el-form-item>
          <el-form-item label="Thumbnail">
            <el-upload class="w-100" :show-file-list="false" :before-upload="() => false" :on-change="handleFileChange">
              <el-button type="danger" plain>Browse Image</el-button>
            </el-upload>
            <div v-if="form.thumbnailUrl" class="mt-2">
              <img :src="form.thumbnailUrl" alt="Preview" style="max-width: 100%; max-height: 120px; border-radius: 8px" />
            </div>
          </el-form-item>
          <el-row :gutter="12" class="mt-4">
            <el-col :xs="12" :sm="12">
              <el-button @click="cancelForm" type="danger" plain class="w-100">Cancel</el-button>
            </el-col>
            <el-col :xs="12" :sm="12">
              <el-button type="danger" @click="submitForm" class="w-100">{{ editingId ? "Update" : "Add" }}</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
import { RecycleScroller } from 'vue3-virtual-scroller';
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { ElMessage } from "element-plus";
import { useAdminCategoryApi } from "@/composables/useAdminCategoryApi";

export default {
  name: "categoriesAdmin",
  data() {
    return {
     startTime : performance.now(),
      loading: false,
      showCategorySidebar: false,
      currentPage: 1,
      pageSize: 6,
      totalCategories: 0,
      categories: [],
      editingId: null,
      form: {
        name: "",
        name_ar: "",
        desc: "",
        desc_ar: "",
        thumbnail: null,
        thumbnailUrl: null,
      },
    };
  },
  created() {
    const api = useAdminCategoryApi();
    this.getCategories = api.getCategories;
    this.createCategory = api.createCategory;
    this.updateCategory = api.updateCategory;
    this.api = api.api;
  },
  methods: {
    /**
     * Format a date string to a readable format.
     * @param {string} dateStr
     * @returns {string}
     */
    formatDate(dateStr) {
      if (!dateStr) return "—";
      const date = new Date(dateStr);
      return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    },
    /**
     * Cancel the form and hide the sidebar.
     */
    cancelForm() {
      this.resetForm();
      this.showCategorySidebar = false;
    },
    /**
     * Handle file input change for category thumbnail.
     * @param {File} file
     */
    handleFileChange(file) {
      this.form.thumbnail = file.raw;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.form.thumbnailUrl = e.target.result;
      };
      reader.readAsDataURL(file.raw);
    },
    /**
     * Export the categories list to a CSV file.
     */
    exportToCSV() {
      const headers = ["ID", "Name (EN)", "Description", "Options", "Products", "Created At", "Updated At"];
      const rows = this.categories.map((cat) => {
        return [cat.id, cat.name?.en || "", cat.description?.en || "", cat.options?.map((o) => o.name.en).join("; ") || "", cat.products_count || 0, cat.created_at || "", cat.updated_at || ""];
      });

      const csvContent = [headers, ...rows].map((e) => e.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "categories_export.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    /**
     * Reset the category form to its initial state.
     */
    resetForm() {
      this.form = {
        name: "",
        name_ar: "",
        desc: "",
        desc_ar: "",
        thumbnail: null,
        thumbnailUrl: null,
      };
      this.editingId = null;
    },
    /**
     * Load categories for the current page.
     * Updates the categories list and total count.
     */
    async loadCategories(page = 1) {
      this.loading = true;
      try {
        const res = await this.getCategories(page, this.pageSize);
        const data = res.data.data;
        this.categories = data.data;
        this.totalCategories = data.meta.total;
      } catch (e) {
        ElMessage.error("Failed to load categories", e);
      } finally {
        this.loading = false;
      }
    },
    /**
     * Handle page change for pagination.
     * @param {number} page
     */
    handlePageChange(page) {
      this.currentPage = page;
      this.loadCategories(page);
    },
    /**
     * Submit the category form (create or update).
     * Shows a success message on success, error message on failure.
     */
    async submitForm() {
      this.loading = true;
      const formData = new FormData();
      formData.append("name[en]", this.form.name);
      formData.append("name[ar]", this.form.name_ar);
      formData.append("description[en]", this.form.desc);
      formData.append("description[ar]", this.form.desc_ar);
      formData.append("parent_id", "");
      if (this.form.thumbnail) formData.append("thumbnail", this.form.thumbnail);

      formData.append("options[0][name][en]", "Color");
      formData.append("options[0][name][ar]", "اللون");
      formData.append("options[0][type]", "2");
      formData.append("options[0][required]", "1");
      formData.append("options[0][priority]", "1");

      try {
        if (this.editingId) {
          await this.updateCategory(this.editingId, formData);
          ElMessage.success("Category updated");
        } else {
          await this.createCategory(formData);
          ElMessage.success("Category created");
        }
        this.cancelForm();
        this.loadCategories(this.currentPage);
      } catch (err) {
        // Log error for debugging in development
        if (process.env.NODE_ENV === 'development') {
          console.error("Error saving category:", err);
        }
        ElMessage.error("Error saving category. Please check your input and try again.");
      }
    },
    /**
     * Edit an existing category (populate the form for editing).
     * @param {Object} row
     */
    editCategory(row) {
      this.editingId = row.id;
      this.form.name = row.name?.en || "";
      this.form.name_ar = row.name?.ar || "";
      this.form.desc = row.description?.en || "";
      this.form.desc_ar = row.description?.ar || "";
      this.form.thumbnail = null;
      this.form.thumbnailUrl = row.thumbnail;
      this.showCategorySidebar = true;
    },
  },
  mounted() {
      const t0 = performance.now();
      this.loadCategories();
      const t1 = performance.now();
      console.log(`CategoriesAdmin mounted in ms`);
    },
};
</script>

<style scoped>
/* Sidebar responsiveness */
.category-sidebar {
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
  overflow-y: auto;
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
  .category-sidebar {
    width: 40vw;
    max-width: 100vw;
    min-width: 200px;
  }
}
@media (max-width: 900px) {
  .category-sidebar {
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
  .category-sidebar {
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
  .category-sidebar {
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