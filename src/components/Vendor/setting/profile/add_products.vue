<template>
  <div>
    <KolshyStyleHeader />
    <el-loading :fullscreen="true" lock text="Loading..." v-if="isLoading" />

    <div class="add-product-page" v-else>
      <el-row class="top-bar" align="middle" justify="space-between">
        <el-col :span="12" class="logo-search">
          <el-input v-model="search" placeholder="Search for the products and information" class="search-input" />
          <el-button type="primary" class="search-btn">Search</el-button>
        </el-col>
        <el-col :span="12" class="top-actions" style="text-align: right">
          <el-button type="danger" @click="saveProduct"> <i class="bi bi-save me-4"></i> Save </el-button>
        </el-col>
      </el-row>

      <el-divider />
      <h2 class="section-title">{{ $route.query.id ? 'Edit Product' : 'Add New Product' }}</h2>

      <el-form :model="form" label-width="120px" class="product-form" ref="productForm">
        <el-row :gutter="20">
          <el-col :xs="24" :md="16">
            <el-form-item label="Category" required>
              <el-select v-model="form.category_id" placeholder="Select a category">
                <el-option v-for="cat in categories" :key="cat.id" :label="cat.name" :value="cat.id" />
              </el-select>
            </el-form-item>

            <el-form-item label="Product Name (EN)" required>
              <el-input v-model="form.name_en" />
            </el-form-item>
            <el-form-item label="Product Name (AR)" required>
              <el-input v-model="form.name_ar" />
            </el-form-item>

            <el-row :gutter="10">
              <el-col :xs="24" :sm="12">
                <el-form-item label="Price" required>
                  <el-input v-model="form.base_price" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item label="Sale Price">
                  <el-input v-model="form.base_sale" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="Stock Quantity">
              <el-input-number v-model="form.base_stock" :min="0" />
            </el-form-item>

            <el-form-item label="Warranty">
              <el-input v-model="form.warranty" />
            </el-form-item>

            <el-form-item label="Description (EN)">
              <el-input type="textarea" v-model="form.description_en" :rows="4" />
            </el-form-item>
            <el-form-item label="Description (AR)">
              <el-input type="textarea" v-model="form.description_ar" :rows="4" />
            </el-form-item>

            <el-form-item label="About (EN)">
              <el-input type="textarea" v-model="form.about_en" :rows="3" />
            </el-form-item>
            <el-form-item label="About (AR)">
              <el-input type="textarea" v-model="form.about_ar" :rows="3" />
            </el-form-item>

            <el-card class="section-card" shadow="never">
              <template #header><span><i class="bi bi-list-ul"></i> Specifications</span></template>
              <div v-for="(item, index) in form.specifications" :key="index" class="attribute-row">
                <el-input v-model="item.key" placeholder="Key" style="width: 30%" />
                <el-input v-model="item.value" placeholder="Value" style="width: 60%" />
                <el-button icon="el-icon-delete" circle @click="form.specifications.splice(index, 1)" />
              </div>
              <el-button type="primary" size="small" @click="form.specifications.push({ key: '', value: '' })">+ Add Specification</el-button>
            </el-card>

            <el-card class="section-card" shadow="never">
              <template #header><span><i class="bi bi-card-text"></i> Details</span></template>
              <div v-for="(item, index) in form.details" :key="index" class="attribute-row">
                <el-input v-model="item.key" placeholder="Key" style="width: 30%" />
                <el-input v-model="item.value" placeholder="Value" style="width: 60%" />
                <el-button icon="el-icon-delete" circle @click="form.details.splice(index, 1)" />
              </div>
              <el-button type="primary" size="small" @click="form.details.push({ key: '', value: '' })">+ Add Detail</el-button>
            </el-card>

            <el-card class="section-card" shadow="never">
              <template #header><span><i class="bi bi-grid-1x2-fill"></i> Pattern</span></template>
              <div v-for="(item, index) in form.pattern" :key="index" class="attribute-row">
                <el-input v-model="item.key" placeholder="Key" style="width: 30%" />
                <el-input v-model="item.value" placeholder="Value" style="width: 60%" />
                <el-button icon="el-icon-delete" circle @click="form.pattern.splice(index, 1)" />
              </div>
              <el-button type="primary" size="small" @click="form.pattern.push({ key: '', value: '' })">+ Add Pattern</el-button>
            </el-card>

            <el-card class="section-card" shadow="never">
              <template #header><span><i class="bi bi-sliders"></i> Variants</span></template>
              <div v-for="(variant, vIdx) in form.variants" :key="vIdx" class="mb-4">
                <el-row :gutter="10">
                  <el-col :span="8">
                    <el-form-item label="Stock">
                      <el-input-number v-model="variant.stock" :min="0" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="Price">
                      <el-input v-model="variant.price" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="Sale">
                      <el-input v-model="variant.sale" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="Variant Image">
                  <input type="file" @change="e => variant.image = e.target.files[0]" />
                </el-form-item>
                <div v-for="(option, oIdx) in variant.options" :key="oIdx" class="attribute-row">
                  <el-input v-model="option.category_option_id" placeholder="Category Option ID" style="width: 30%" />
                  <el-input v-model="option.value" placeholder="Value" style="width: 60%" />
                </div>
                <el-button icon="el-icon-delete" circle type="danger" @click="form.variants.splice(vIdx, 1)" />
              </div>
              <el-button type="primary" size="small" @click="form.variants.push({ stock: 0, price: '', sale: '', image: null, options: [] })">
                + Add Variant
              </el-button>
            </el-card>
          </el-col>

          <el-col :xs="24" :md="8">
            <el-card class="section-card" shadow="never">
        <template #header>
          <div class="d-flex justify-content-between align-items-center">
            <span><i class="bi bi-image"></i> Product Images</span>
            <el-button type="danger" size="small" @click="clearImages">Delete All Images</el-button>
          </div>
        </template>

        <el-upload
          class="upload-demo"
          drag
          action="#"
          :show-file-list="false"
          :before-upload="() => false"
          :on-change="handleImageChange"
          multiple
        >
          <i class="bi bi-upload" style="font-size: 2rem"></i>
          <div class="el-upload__text">Drop files here or <em>click to upload</em></div>
        </el-upload>

        <div v-if="form.imageUrls.length" class="image-preview-grid">
          <div
            v-for="(url, i) in form.imageUrls"
            :key="i"
            class="image-preview-item"
          >
            <img @click="removeImage(i)" :src="url" class="product-image-preview" style="cursor: delete" />
          </div>
        </div>
      </el-card>

            <el-card class="section-card" shadow="never">
              <template #header><span><i class="bi bi-toggle-on"></i> Status</span></template>
              <el-form-item label="Status">
                <el-radio-group v-model="form.status">
                  <el-radio v-for="opt in statusOptions" :key="opt.value" :label="opt.value">{{ opt.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-card>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <footerC />
  </div>
</template>

<script>
import KolshyStyleHeader from "@/components/Global/topBar";
import footerC from "@/components/Global/footer";
import axios from "axios";
import { useStoreApp } from "../../../../stores/app";
import { useToast } from "vue-toastification";

export default {
  name: "AddProductVendor",
  components: { KolshyStyleHeader, footerC },
  data() {
    return {
      search: "",
      categories: [],
      statusOptions: [],
      isLoading: false,
      form: {
        category_id: "",
        name_en: "",
        name_ar: "",
        description_en: "",
        description_ar: "",
        about_en: "",
        about_ar: "",
        base_price: "",
        base_sale: "",
        base_stock: 0,
        status: "1",
        warranty: "",
        images: [],
        imageUrls: [],
        specifications: [],
        details: [],
        pattern: [],
        variants: []
      },
      toast: useToast(),
      storeApp: useStoreApp(),
    };
  },
  created() {
    this.fetchFormOptions();
    const id = this.$route.query.id;
    if (id) {
      this.loadProduct(id);
    }
  },
  methods: {
    async fetchFormOptions() {
      try {
        const token = localStorage.getItem("tokenkolshyvendor");
        const response = await axios.get(`${this.storeApp.baseUrl}seller/products/form-data`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { categories, status } = response.data.data;
        this.categories = categories;
        this.statusOptions = Object.entries(status).map(([value, label]) => ({ value, label }));
      } catch (err) {
        this.toast.error("Failed to load product form data");
      }
    },
    async loadProduct(id) {
      this.isLoading = true;
      try {
        const token = localStorage.getItem("tokenkolshyvendor");
        const res = await axios.get(`${this.storeApp.baseUrl}seller/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.data;

        this.form.category_id = data.category_id;
        this.form.name_en = data.name.en;
        this.form.name_ar = data.name.ar;
        this.form.description_en = data.description.en;
        this.form.description_ar = data.description.ar;
        this.form.about_en = data.about.en;
        this.form.about_ar = data.about.ar;
        this.form.base_price = data.base_price;
        this.form.base_sale = data.base_sale;
        this.form.base_stock = data.base_stock;
        this.form.status = data.status.toString();
        this.form.warranty = data.warranty;
        this.form.imageUrls = data.images || [];
        this.form.specifications = data.specifications || [];
        this.form.details = data.details || [];
        this.form.pattern = data.pattern || [];
        this.form.variants = data.variants || [];
      } catch (err) {
        this.toast.error('Failed to load product data');
      } finally {
        this.isLoading = false;
      }
    },
    handleImageChange(file) {
      if (!file || !file.raw) {
        this.toast.error("Invalid image file");
        return;
      }
      this.form.images.push(file.raw);
      this.form.imageUrls.push(URL.createObjectURL(file.raw));
    },
    removeImage(index) {
      this.form.imageUrls.splice(index, 1);
      this.form.images.splice(index, 1);
    },
    clearImages() {
      this.form.imageUrls = [];
      this.form.images = [];
    },
    async saveProduct() {
      this.isLoading = true;
      try {
        const formData = new FormData();
        const f = this.form;

        formData.append("category_id", f.category_id);
        formData.append("name[en]", f.name_en);
        formData.append("name[ar]", f.name_ar);
        formData.append("description[en]", f.description_en);
        formData.append("description[ar]", f.description_ar);
        formData.append("about[en]", f.about_en);
        formData.append("about[ar]", f.about_ar);
        formData.append("base_price", f.base_price);
        formData.append("base_sale", f.base_sale);
        formData.append("base_stock", f.base_stock);
        formData.append("status", f.status);
        formData.append("warranty", f.warranty);

        f.images.forEach(img => formData.append("images[]", img));

        f.specifications.forEach((s, i) => {
          formData.append(`specifications[${i}][key]`, s.key);
          formData.append(`specifications[${i}][value]`, s.value);
        });
        f.details.forEach((d, i) => {
          formData.append(`details[${i}][key]`, d.key);
          formData.append(`details[${i}][value]`, d.value);
        });
        f.pattern.forEach((p, i) => {
          formData.append(`pattern[${i}][key]`, p.key);
          formData.append(`pattern[${i}][value]`, p.value);
        });

        f.variants.forEach((v, i) => {
          formData.append(`variants[${i}][stock]`, v.stock);
          formData.append(`variants[${i}][price]`, v.price);
          formData.append(`variants[${i}][sale]`, v.sale);
          if (v.image) formData.append(`variants[${i}][image]`, v.image);
          v.options.forEach((opt, j) => {
            formData.append(`variants[${i}][options][${j}][category_option_id]`, opt.category_option_id);
            formData.append(`variants[${i}][options][${j}][value]`, opt.value);
          });
        });

        const token = localStorage.getItem("tokenkolshyvendor");
        const id = this.$route.query.id;
        let url = `${this.storeApp.baseUrl}seller/products`;

        if (id) {
          formData.append("_method", "PUT");
          url += `/${id}`;
        }

        const response = await axios.post(url, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        this.toast.success(id ? "Product updated successfully!" : "Product created successfully!");
      } catch (err) {
        console.error("Product Save Error:", err);
        this.toast.error("Failed to save product.");
      } finally {
        this.isLoading = false;
      }
    }
  },
};
</script>



<style scoped>
.add-product-page {
  padding: 16px;
  max-width: 1200px;
  margin: auto;
}
.top-bar {
  margin-bottom: 16px;
}
.logo-search {
  display: flex;
  align-items: center;
}
.search-input {
  width: 320px;
  margin: 0 8px;
}
.section-title {
  margin: 24px 0 16px 0;
  font-weight: bold;
}
.section-card {
  margin-bottom: 20px;
}
.attribute-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.product-image-preview {
  width: 100%;
  max-width: 200px;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid #eee;
}
@media (max-width: 768px) {
  .search-input {
    width: 100%;
  }
  .add-product-page {
    padding: 4px;
  }
}
</style>
