<template>
    <div>
      <KolshyStyleHeader />
      <div class="add-product-page">
        <!-- Top Bar -->
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
  
        <h2 class="section-title">Add New Product</h2>
  
        <el-form :model="form" label-width="120px" class="product-form" ref="productForm">
          <el-row :gutter="20">
            <el-col :xs="24" :md="16">
              <!-- Product Name -->
              <el-form-item label="Product Name (EN)" required>
                <el-input v-model="form.name_en" placeholder="Enter product name in English" />
              </el-form-item>
              <el-form-item label="Product Name (AR)" required>
                <el-input v-model="form.name_ar" placeholder="Enter product name in Arabic" />
              </el-form-item>
  
              <!-- Price, Sale Price -->
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
  
              <!-- Stock -->
              <el-form-item label="Stock Quantity">
                <el-input-number v-model="form.base_stock" :min="0" />
              </el-form-item>
  
              <!-- Warranty -->
              <el-form-item label="Warranty">
                <el-input v-model="form.warranty" />
              </el-form-item>
  
              <!-- Description -->
              <el-form-item label="Description (EN)">
                <el-input type="textarea" v-model="form.description_en" :rows="4" />
              </el-form-item>
              <el-form-item label="Description (AR)">
                <el-input type="textarea" v-model="form.description_ar" :rows="4" />
              </el-form-item>
  
              <!-- About -->
              <el-form-item label="About (EN)">
                <el-input type="textarea" v-model="form.about_en" :rows="3" />
              </el-form-item>
              <el-form-item label="About (AR)">
                <el-input type="textarea" v-model="form.about_ar" :rows="3" />
              </el-form-item>
  
              <!-- Specifications -->
              <el-card class="section-card" shadow="never">
                <div slot="header">
                  <span><i class="bi bi-list-ul"></i> Specifications</span>
                </div>
                <div v-for="(item, index) in form.specifications" :key="'spec-'+index" class="attribute-row">
                  <el-input v-model="item.key" placeholder="Key" style="width: 30%" />
                  <el-input v-model="item.value" placeholder="Value" style="width: 60%" />
                </div>
              </el-card>
  
              <!-- Details -->
              <el-card class="section-card" shadow="never">
                <div slot="header">
                  <span><i class="bi bi-card-text"></i> Details</span>
                </div>
                <div v-for="(item, index) in form.details" :key="'detail-'+index" class="attribute-row">
                  <el-input v-model="item.key" placeholder="Key" style="width: 30%" />
                  <el-input v-model="item.value" placeholder="Value" style="width: 60%" />
                </div>
              </el-card>
  
              <!-- Pattern -->
              <el-card class="section-card" shadow="never">
                <div slot="header">
                  <span><i class="bi bi-grid-1x2-fill"></i> Pattern</span>
                </div>
                <div v-for="(item, index) in form.pattern" :key="'pattern-'+index" class="attribute-row">
                  <el-input v-model="item.key" placeholder="Key" style="width: 30%" />
                  <el-input v-model="item.value" placeholder="Value" style="width: 60%" />
                </div>
              </el-card>
  
              <!-- Variants -->
              <el-card class="section-card" shadow="never">
                <div slot="header">
                  <span><i class="bi bi-sliders"></i> Variants</span>
                </div>
                <div v-for="(variant, vIdx) in form.variants" :key="'variant-'+vIdx" class="mb-4">
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
                    <input type="file" @change="(e) => variant.image = e.target.files[0]" />
                  </el-form-item>
  
                  <div v-for="(option, oIdx) in variant.options" :key="`option-${vIdx}-${oIdx}`" class="attribute-row">
                    <el-input v-model="option.category_option_id" placeholder="Category Option ID" style="width: 30%" />
                    <el-input v-model="option.value" placeholder="Value" style="width: 60%" />
                  </div>
                </div>
              </el-card>
            </el-col>
  
            <!-- Image Upload -->
            <el-col :xs="24" :md="8">
              <el-card class="section-card" shadow="never">
                <div slot="header"><span><i class="bi bi-image"></i> Product Images</span></div>
                <el-upload
                  class="upload-demo"
                  drag
                  action="#"
                  :show-file-list="false"
                  :on-change="handleImageChange"
                  multiple
                >
                  <i class="bi bi-upload" style="font-size: 2rem"></i>
                  <div class="el-upload__text">Drop files here or <em>click to upload</em></div>
                </el-upload>
                <div v-if="form.imageUrl">
                  <img :src="form.imageUrl" class="product-image-preview" />
                </div>
              </el-card>
  
              <!-- Status -->
              <el-card class="section-card" shadow="never">
                <div slot="header"><span><i class="bi bi-toggle-on"></i> Status</span></div>
                <el-form-item label="Status">
                  <el-radio-group v-model="form.status">
                    <el-radio label="draft">Draft</el-radio>
                    <el-radio label="published">Published</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
  
          <!-- Save Button -->
          <el-row justify="end" style="margin-top: 24px">
            <el-button type="danger" size="large" @click="saveProduct"> <i class="bi bi-save me-4"></i> Save Product </el-button>
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
  components: {
    KolshyStyleHeader,
    footerC,
  },
  data() {
    return {
      search: "",
      form: {
        category_id: 1,
        name_en: "Sample Product EN",
        name_ar: "منتج تجريبي AR",
        description_en: "This is the English description.",
        description_ar: "هذا هو الوصف باللغة العربية.",
        about_en: "About the product in English.",
        about_ar: "حول المنتج باللغة العربية.",
        base_price: "100.00",
        base_sale: "80.00",
        base_stock: 20,
        status: "published", // or "draft"
        warranty: "12 months",

        // Must be File objects (from file inputs)
        images: [],

        specifications: [
          { key: "Material", value: "Cotton" },
          { key: "Size", value: "Large" },
        ],

        details: [
          { key: "Country", value: "Turkey" },
          { key: "Brand", value: "Kolshy" },
        ],

        pattern: [
          { key: "Color", value: "Red" },
          { key: "Style", value: "Casual" },
        ],

        variants: [
          {
            stock: 10,
            price: "100.00",
            sale: "90.00",
            image: null, // Single File
            options: [
              { category_option_id: 1, value: "Red" },
              { category_option_id: 2, value: "L" },
            ],
          },
        ],
      },
    };
  },
  setup() {
    const toast = useToast();
    const storeApp = useStoreApp();
    return { toast, storeApp };
  },
  methods: {
    addAttribute() {
      this.form.attributes.push({ name: "", value: "" });
    },
    removeAttribute(index) {
      this.form.attributes.splice(index, 1);
    },
    handleImageChange(file) {
      this.form.imageUrl = URL.createObjectURL(file.raw);
    },
    async saveProduct() {
      try {
        const formData = new FormData();

        // Required fields
        formData.append("category_id", this.form.category_id);
        formData.append("name[en]", this.form.name_en);
        formData.append("name[ar]", this.form.name_ar);
        formData.append("description[en]", this.form.description_en);
        formData.append("description[ar]", this.form.description_ar);
        formData.append("about[en]", this.form.about_en);
        formData.append("about[ar]", this.form.about_ar);
        formData.append("base_price", this.form.base_price);
        formData.append("base_sale", this.form.base_sale);
        formData.append("base_stock", this.form.base_stock);
        formData.append("status", this.form.status);
        formData.append("warranty", this.form.warranty);

        // Images
        this.form.images.forEach((file) => {
          formData.append("images[]", file);
        });

        // Specifications
        this.form.specifications.forEach((spec, i) => {
          formData.append(`specifications[${i}][key]`, spec.key);
          formData.append(`specifications[${i}][value]`, spec.value);
        });

        // Details
        this.form.details.forEach((detail, i) => {
          formData.append(`details[${i}][key]`, detail.key);
          formData.append(`details[${i}][value]`, detail.value);
        });

        // Pattern
        this.form.pattern.forEach((p, i) => {
          formData.append(`pattern[${i}][key]`, p.key);
          formData.append(`pattern[${i}][value]`, p.value);
        });

        // Variants
        this.form.variants.forEach((variant, i) => {
          formData.append(`variants[${i}][stock]`, variant.stock);
          formData.append(`variants[${i}][price]`, variant.price);
          formData.append(`variants[${i}][sale]`, variant.sale);
          formData.append(`variants[${i}][image]`, variant.image);

          variant.options.forEach((opt, j) => {
            formData.append(`variants[${i}][options][${j}][category_option_id]`, opt.category_option_id);
            formData.append(`variants[${i}][options][${j}][value]`, opt.value);
          });
        });

        const token = localStorage.getItem("tokenkolshyvendor");
        const url = this.storeApp.baseUrl;

        const response = await axios.post(`${url}seller/products`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        this.toast.success("Product created successfully!");
        console.log(response.data);
      } catch (err) {
        this.toast.error("Failed to create product.");
        console.error("Product Create Error:", err);
      }
    },
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
.logo {
  height: 40px;
  margin-right: 16px;
  vertical-align: middle;
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
