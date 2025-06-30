<template>
  <div class="admin-page p-4">
    <h2>User Management</h2>
    <el-button type="primary" @click="dialogVisible = true">Add User</el-button>
    <el-table :data="users" class="mt-4" style="width: 100%">
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="email" label="Email" />
      <el-table-column prop="role" label="Role" />
      <el-table-column label="Actions" width="120">
        <template #default="{ row, $index }">
          <el-button type="danger" size="mini" @click="removeUser($index)">Remove</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Add New User" v-model="dialogVisible" width="400px" center>
      <el-form :model="form" :rules="rules" ref="userForm" label-width="100px">
        <el-form-item label="Name" prop="name">
          <el-input v-model="form.name" placeholder="User name" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" placeholder="User email" />
        </el-form-item>
        <el-form-item label="Role" prop="role">
          <el-select v-model="form.role" placeholder="Select role">
            <el-option label="Admin" value="Admin" />
            <el-option label="Editor" value="Editor" />
            <el-option label="Viewer" value="Viewer" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="saveUser">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UsersManagement',
  data() {
    const stored = JSON.parse(localStorage.getItem('adminUsers')) || [];
    return {
      users: stored.length ? stored : [{ name: 'Test User', email: 'test@example.com', role: 'Admin' }],
      dialogVisible: false,
      form: { name: '', email: '', role: '' },
      rules: {
        name: [{ required: true, message: 'Name required', trigger: 'blur' }],
        email: [{ required: true, type: 'email', message: 'Valid email required', trigger: 'blur' }],
        role: [{ required: true, message: 'Role required', trigger: 'change' }]
      }
    };
  },
  methods: {
    saveUser() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.users.push({ ...this.form });
          localStorage.setItem('adminUsers', JSON.stringify(this.users));
          this.$message.success('User added');
          this.resetForm();
          this.dialogVisible = false;
        }
      });
    },
    removeUser(index) {
      this.users.splice(index, 1);
      localStorage.setItem('adminUsers', JSON.stringify(this.users));
      this.$message.success('User removed');
    },
    resetForm() {
      this.$refs.userForm.resetFields();
    }
  }
};
</script>

<style scoped>
.admin-page { background: #fff; border-radius: 8px; padding: 24px; }
.admin-page h2 { color: #e51742; margin-bottom: 16px; }
.dialog-footer { text-align: right; }
</style>
