<template>
  <div class="admin-page p-4">
    <h2>Add New Product</h2>
    <el-form :model="form" :rules="rules" ref="prodForm" label-width="120px" class="mt-4">
      <el-form-item label="Product Title" prop="title">
        <el-input v-model="form.title" placeholder="Product title" />
      </el-form-item>
      <el-form-item label="SKU" prop="sku">
        <el-input v-model="form.sku" placeholder="SKU code" />
      </el-form-item>
      <el-form-item label="Price" prop="price">
        <el-input-number v-model="form.price" :min="0" placeholder="Price" style="width: 100%;" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveProduct">Save</el-button>
        <el-button @click="resetForm">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddProductAdmin',
  data() {
    return {
      form: { title: '', sku: '', price: null },
      rules: {
        title: [{ required: true, message: 'Title required', trigger: 'blur' }],
        sku: [{ required: true, message: 'SKU required', trigger: 'blur' }],
        price: [{ required: true, message: 'Price required', trigger: 'blur' }]
      }
    };
  },
  methods: {
    saveProduct() {
      this.$refs.prodForm.validate(valid => {
        if (valid) {
          const prods = JSON.parse(localStorage.getItem('adminProducts')) || [];
          prods.push({ ...this.form });
          localStorage.setItem('adminProducts', JSON.stringify(prods));
          this.$message.success('Product added');
          this.resetForm();
        }
      });
    },
    resetForm() {
      this.$refs.prodForm.resetFields();
    }
  }
};
</script>

<style scoped>
.admin-page { max-width: 600px; margin: auto; background: #fff; border-radius: 8px; padding: 24px; }
.admin-page h2 { color: #e51742; margin-bottom: 16px; }
</style>
