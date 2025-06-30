<template>
  <div class="admin-page p-4">
    <h2>Add New Language</h2>
    <el-form :model="form" :rules="rules" ref="langForm" label-width="120px" class="mt-4">
      <el-form-item label="Language Code" prop="code">
        <el-input v-model="form.code" placeholder="e.g. en, fr, ar" />
      </el-form-item>
      <el-form-item label="Display Name" prop="name">
        <el-input v-model="form.name" placeholder="English, Français, العربية" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveLanguage">Save</el-button>
        <el-button @click="resetForm">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddLanguage',
  data() {
    return {
      form: { code: '', name: '' },
      rules: {
        code: [{ required: true, message: 'Code required', trigger: 'blur' }],
        name: [{ required: true, message: 'Name required', trigger: 'blur' }]
      }
    };
  },
  methods: {
    saveLanguage() {
      this.$refs.langForm.validate(valid => {
        if (valid) {
          const langs = JSON.parse(localStorage.getItem('adminLanguages')) || [];
          langs.push({ ...this.form });
          localStorage.setItem('adminLanguages', JSON.stringify(langs));
          this.$message.success('Language added');
          this.resetForm();
        }
      });
    },
    resetForm() {
      this.$refs.langForm.resetFields();
    }
  }
};
</script>

<style scoped>
.admin-page { max-width: 600px; margin: auto; background: #fff; border-radius: 8px; padding: 24px; }
.admin-page h2 { color: #e51742; margin-bottom: 16px; }
</style>
