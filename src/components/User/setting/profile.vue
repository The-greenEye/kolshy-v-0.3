<template>
  <div class="customer-profile-page">
    <KolshyStyleHeader />
    <el-row :gutter="24" class="profile-container">
      <el-col :xs="24" :md="8">
        <el-card class="profile-card">
          <div class="section-header">
            <i class="bi bi-person-circle"></i> Your Profile
          </div>
          <el-divider></el-divider>
          <div class="profile-photo-section">
            <img :src="profilePhotoUrl || defaultPhoto" class="profile-photo" alt="Profile Photo" />
            <input type="file" accept="image/*" @change="onPhotoChange" class="photo-upload-input" />
          </div>
          <el-form :model="profileForm" label-width="80px" class="profile-form">
            <el-form-item label="Name">
              <el-input v-model="profileForm.name" />
            </el-form-item>
            <el-form-item label="Email">
              <el-input v-model="profileForm.email" disabled />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveProfile" :loading="isSaving" size="default">Save Changes</el-button>
            </el-form-item>
          </el-form>

          <el-divider></el-divider>
          <div class="section-header">
            <i class="bi bi-envelope"></i> Email Settings
          </div>
          <el-form :model="emailForm" label-width="80px" class="profile-form">
            <el-form-item label="New Email">
              <el-input v-model="emailForm.newEmail" placeholder="Enter new email" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveEmail" :loading="isEmailSaving" size="default">Update Email</el-button>
            </el-form-item>
            <p v-if="emailSuccess" class="success-message">Email updated successfully!</p>
            <p v-if="emailError" class="error-message">{{ emailError }}</p>
          </el-form>

          <el-divider></el-divider>
          <div class="section-header">
            <i class="bi bi-lock"></i> Password Settings
          </div>
          <el-form :model="passwordForm" label-width="120px" class="profile-form">
            <el-form-item label="Current Pass.">
              <el-input v-model="passwordForm.currentPassword" type="password" show-password placeholder="Current Password" />
            </el-form-item>
            <el-form-item label="New Pass.">
              <el-input v-model="passwordForm.newPassword" type="password" show-password placeholder="New Password" />
            </el-form-item>
            <el-form-item label="Confirm New Pass.">
              <el-input v-model="passwordForm.confirmPassword" type="password" show-password placeholder="Confirm New Password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="changePassword" :loading="isPasswordChanging" size="default">Change Password</el-button>
            </el-form-item>
            <p v-if="passwordSuccess" class="success-message">Password changed successfully!</p>
            <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
          </el-form>
        </el-card>
      </el-col>

      <el-col :xs="24" :md="8">
        <el-card class="profile-card">
          <div class="section-header">
            <i class="bi bi-geo-alt-fill"></i> Your Addresses
          </div>
          <el-divider></el-divider>
          <div v-if="addresses.length === 0" class="fake-address-block">
            <div class="fake-address-title">No address on file</div>
            <div class="fake-address-desc">Add a delivery address to make shopping easier.</div>
            <router-link to="/setting/addresses">
              <el-button type="primary" size="default">Manage Addresses</el-button>
            </router-link>
          </div>
          <div v-else>
            <el-card v-for="(addr, idx) in addresses" :key="idx" class="address-card" shadow="never">
              <div class="address-main">
                <div><b>{{ addr.full_name }}</b></div>
                <div>{{ addr.address }}</div>
                <div>{{ addr.city_id }}, {{ addr.country_id }}</div>
                <div>{{ addr.phone }}</div>
              </div>
              <div class="address-actions">
                <router-link :to="`/setting/addresses?edit=${addr.id}`">
                  <el-button size="small" type="info">Edit</el-button>
                </router-link>
              </div>
            </el-card>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :md="8">
        <el-card class="profile-card">
          <div class="section-header">
            <i class="bi bi-credit-card"></i> Your Payments
          </div>
          <el-divider></el-divider>
          <el-table :data="payments" style="width: 100%" size="default" v-if="payments.length">
            <el-table-column prop="date" label="Date" width="120" />
            <el-table-column prop="amount" label="Amount" width="auto" />
            <el-table-column prop="method" label="Method" width="auto" />
            <el-table-column prop="status" label="Status" width="auto" />
          </el-table>
          <div v-else class="fake-address-block">
            <div class="fake-address-title">No payment history yet.</div>
            <div class="fake-address-desc">View your transactions and payment methods here.</div>
            <el-button type="primary" size="default">Manage Payment Methods</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <footerC />
  </div>
</template>

<script>
import KolshyStyleHeader from '@/components/Global/topBar';
import footerC from '@/components/Global/footer';
import { useStoreApp, useStoreCustomer } from '../../../stores/app';
import axios from 'axios';
import { ElMessage } from 'element-plus';

export default {
  name: 'ProfileCustomer',
  components: { KolshyStyleHeader, footerC },
  data() {
    return {
      api: useStoreApp(),
      customer: useStoreCustomer(),
      profileForm: {
        name: '',
        email: '',
      },
      profilePhotoUrl: '',
      defaultPhoto: 'https://ui-avatars.com/api/?name=Customer', // يمكنك تغيير هذا إلى صورة افتراضية أجمل
      isSaving: false,
      addresses: [],
      payments: [],

      // ---- New Data for Email & Password Settings ----
      emailForm: {
        newEmail: '',
      },
      isEmailSaving: false,
      emailSuccess: false,
      emailError: '',

      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      isPasswordChanging: false,
      passwordSuccess: false,
      passwordError: '',
      // ------------------------------------------------
    };
  },
  methods: {
    async fetchProfile() {
      try {
        const token = localStorage.getItem('tokenkolshy');
        const res = await axios.get(this.api.baseUrl + this.api.endPoint.globel.profile.show_profile, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data && res.data.data) {
          this.profileForm.name = res.data.data.name;
          this.profileForm.email = res.data.data.email;
          this.profilePhotoUrl = res.data.data.photo_url || '';
        }
      } catch (e) {
        ElMessage.error('Failed to fetch profile');
        console.error(e);
      }
    },
    async saveProfile() {
      this.isSaving = true;
      try {
        const token = localStorage.getItem('tokenkolshy');
        await axios.post(this.api.baseUrl + this.api.endPoint.globel.profile.update_profile, {
          name: this.profileForm.name,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        ElMessage.success('Profile updated');
        this.fetchProfile();
      } catch (e) {
        ElMessage.error('Failed to update profile');
        console.error(e);
      } finally {
        this.isSaving = false;
      }
    },
    onPhotoChange(e) {
      const file = e.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('photo', file);
      const token = localStorage.getItem('tokenkolshy');
      axios.post(this.api.baseUrl + this.api.endPoint.globel.profile.update_profile, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(() => {
          ElMessage.success('Photo updated');
          this.fetchProfile();
        })
        .catch((e) => {
          ElMessage.error('Failed to update photo');
          console.error(e);
        });
    },
    async fetchAddresses() {
      try {
        const token = localStorage.getItem('tokenkolshy');
        const res = await axios.get(this.api.baseUrl + this.api.endPoint.customer.address.get_address, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.addresses = res.data.data || [];
      } catch (e) {
        ElMessage.error('Failed to fetch addresses');
        console.error(e);
      }
    },
    async fetchPayments() {
      // This is a stub. Replace with real API if available.
      this.payments = [
        { date: '2024-06-01', amount: '$100.00', method: 'Visa', status: 'Completed' },
        { date: '2024-05-15', amount: '$50.00', method: 'PayPal', status: 'Pending' },
        { date: '2024-04-20', amount: '$25.50', method: 'MasterCard', status: 'Completed' },
      ];
    },

    // ---- New Methods for Email & Password Settings ----
    async saveEmail() {
      this.isEmailSaving = true;
      this.emailSuccess = false;
      this.emailError = '';

      // Mock API call simulation
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

      if (this.emailForm?.newEmail && this.emailForm?.newEmail.includes('@')) {
        // Here you would make your actual API call to update the email
        // try {
        //   const token = localStorage.getItem('tokenkolshy');
        //   await axios.post(this.api.baseUrl + this.api.endPoint.globel.profile.update_email, {
        //     email: this.emailForm.newEmail,
        //   }, {
        //     headers: { Authorization: `Bearer ${token}` },
        //   });
        //   this.emailSuccess = true;
        //   ElMessage.success('Email updated successfully!');
        //   this.profileForm.email = this.emailForm.newEmail; // Update displayed email
        //   this.emailForm.newEmail = ''; // Clear input
        // } catch (e) {
        //   this.emailError = 'Failed to update email. Please try again.';
        //   ElMessage.error(this.emailError);
        //   console.error(e);
        // }

        // Mock success
        this.emailSuccess = true;
        this.profileForm.email = this.emailForm.newEmail; // Update displayed email
        this.emailForm.newEmail = ''; // Clear input
        ElMessage.success('Email updated successfully! (Mock)');

      } else {
        this.emailError = 'Please enter a valid email address.';
        ElMessage.error(this.emailError);
      }
      this.isEmailSaving = false;
    },

    async changePassword() {
      this.isPasswordChanging = true;
      this.passwordSuccess = false;
      this.passwordError = '';

      // Mock API call simulation
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

      if (!this.passwordForm.currentPassword || !this.passwordForm.newPassword || !this.passwordForm.confirmPassword) {
        this.passwordError = 'All password fields are required.';
        ElMessage.error(this.passwordError);
      } else if (this.passwordForm.newPassword.length < 6) {
        this.passwordError = 'New password must be at least 6 characters long.';
        ElMessage.error(this.passwordError);
      } else if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
        this.passwordError = 'New password and confirm password do not match.';
        ElMessage.error(this.passwordError);
      } else {
        // Here you would make your actual API call to change the password
        // try {
        //   const token = localStorage.getItem('tokenkolshy');
        //   await axios.post(this.api.baseUrl + this.api.endPoint.globel.profile.change_password, {
        //     current_password: this.passwordForm.currentPassword,
        //     new_password: this.passwordForm.newPassword,
        //     new_password_confirmation: this.passwordForm.confirmPassword,
        //   }, {
        //     headers: { Authorization: `Bearer ${token}` },
        //   });
        //   this.passwordSuccess = true;
        //   ElMessage.success('Password changed successfully!');
        //   // Clear password fields
        //   this.passwordForm.currentPassword = '';
        //   this.passwordForm.newPassword = '';
        //   this.passwordForm.confirmPassword = '';
        // } catch (e) {
        //   this.passwordError = e.response?.data?.message || 'Failed to change password. Please check your current password.';
        //   ElMessage.error(this.passwordError);
        //   console.error(e);
        // }

        // Mock success
        this.passwordSuccess = true;
        this.passwordForm.currentPassword = 'reset'; // Clear input for demo
        this.passwordForm.newPassword = 'reset';
        this.passwordForm.confirmPassword = 'reset';
        ElMessage.success('Password changed successfully! (Mock)');
      }
      this.isPasswordChanging = false;
    },
    // ------------------------------------------------
  },
  mounted() {
    this.fetchProfile();
    this.fetchAddresses();
    this.fetchPayments();
  },
};
</script>

 <style>
 /* Global reset for box-sizing and font-family for overall consistency */
/* تأكد أن هذا موجود في ملف CSS عام أو في HomeView.vue لتجنب تكراره */
/*
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #eaeded; // لون خلفية عام موحد للصفحات الداخلية
}
*/

.customer-profile-page {
  background: #eaeded; /* خلفية رمادية فاتحة للصفحة بالكامل */
  min-height: 100vh;
}
.profile-container {
  max-width: 1200px; /* عرض أقصى للحاوية الرئيسية */
  margin: 30px auto; /* توسيط مع مسافة علوية وسفلية */
  padding: 0 15px; /* حشوة جانبية */
}
.profile-card {
  margin-bottom: 24px;
  border-radius: 8px; /* حواف مستديرة للبطاقة */
  box-shadow: 0 2px 8px rgba(0,0,0,0.06); /* ظل خفيف */
  background-color: #fff; /* خلفية بيضاء للبطاقة */
  padding: 20px; /* حشوة داخلية */
  min-height: 380px; /* ارتفاع أدنى للبطاقات المتشابهة */
  display: flex;
  flex-direction: column;
}

.section-header {
  font-size: 1.2rem; /* حجم أكبر للعناوين الفرعية */
  font-weight: bold;
  color: #141414; /* لون نص داكن */
  margin-bottom: 15px; /* مسافة أسفل العنوان */
  display: flex;
  align-items: center;
  gap: 10px; /* مسافة بين الأيقونة والنص */
  padding-bottom: 10px; /* حشوة قبل الخط الفاصل */
  border-bottom: 1px solid #eee; /* خط فاصل خفيف */
}
.section-header i {
  color: #e51748; /* لون أيقونة العنوان بلونك الأحمر */
  font-size: 1.4rem; /* حجم أكبر للأيقونات */
}

/* Profile Info Card */
.profile-photo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}
.profile-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e51748; /* حدود بلونك الأحمر */
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.photo-upload-input {
  /* يمكن تنسيق زر رفع الصورة ليكون أكثر جاذبية */
  margin-top: 8px;
  font-size: 14px;
  color: #007185; /* لون أزرق للرابط */
  cursor: pointer;
}
.profile-form {
  max-width: 100%;
}
.profile-form .el-form-item {
  margin-bottom: 18px; /* تباعد بين حقول الفورم */
}
.profile-form .el-form-item__label {
  font-weight: bold;
  color: #555;
}
.profile-form .el-input__inner {
  border-radius: 4px;
  border: 1px solid #ddd;
}
.profile-form .el-button--primary {
  width: 100%;
  background-color: #e51748; /* لونك الأحمر */
  border-color: #e51748;
  font-weight: bold;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}
.profile-form .el-button--primary:hover {
  background-color: #ca2e52; /* لون أغمق عند التمرير */
  border-color: #ca2e52;
}

/* Addresses Card & Payments Card (Blocks for no content) */
.fake-address-block {
  text-align: center;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1; /* لتملأ المساحة المتاحة في البطاقة */
}
.fake-address-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 8px;
  color: #141414;
}
.fake-address-desc {
  color: #888;
  font-size: 0.97rem;
  margin-bottom: 20px;
  line-height: 1.4;
}
.fake-address-block .el-button--primary {
  background-color: #e51748;
  border-color: #e51748;
  font-weight: bold;
  width: auto; /* لا يأخذ عرض 100% هنا */
  padding: 10px 20px;
  border-radius: 5px;
}
.fake-address-block .el-button--primary:hover {
  background-color: #ca2e52;
  border-color: #ca2e52;
}


/* Specific Address Card (inside Addresses section) */
.address-card {
  margin-bottom: 15px; /* مسافة بين كروت العناوين */
  background: #fdfdfd; /* خلفية فاتحة جداً لكروت العناوين الداخلية */
  border-radius: 6px;
  border: 1px solid #eee;
  padding: 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.address-main {
  font-size: 0.95rem;
  color: #333;
}
.address-main div {
  margin-bottom: 4px;
}
.address-main div:last-child {
  margin-bottom: 0;
}
.address-main b {
  font-weight: bold;
  color: #141414;
}
.address-actions {
  display: flex;
  gap: 10px;
}
.address-actions .el-button--info {
  background-color: #007185; /* لون أزرق لزر التعديل */
  border-color: #007185;
  color: #fff;
  font-size: 0.85rem;
  padding: 8px 15px;
  border-radius: 5px;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}
.address-actions .el-button--info:hover {
  background-color: #005666; /* أزرق أغمق عند التمرير */
  border-color: #005666;
}

/* Payments Table */
.el-table {
  font-size: 0.9rem;
  color: #333;
}
.el-table th {
  background-color: #f8f8f8;
  color: #555;
  font-weight: bold;
}
.el-table td, .el-table th {
  padding: 12px 0;
}
/* No payment history yet text */
.profile-card .fake-address-desc {
    margin-top: 20px;
    text-align: center;
}


/* Responsive Styles */
@media (max-width: 991px) {
  .profile-container {
    padding: 0 10px;
  }
  .profile-card {
    min-height: unset; /* إزالة الارتفاع الأدنى للسماح بالتكيف */
    padding: 15px;
  }
  .section-header {
    font-size: 1.1rem;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }
  .section-header i {
    font-size: 1.2rem;
  }
}

@media (max-width: 767px) {
  .profile-container {
    flex-direction: column; /* جعل الأعمدة تتراص عموديًا */
    padding: 0; /* إزالة الحشوة الجانبية على الجوال */
    margin: 20px auto;
  }
  .profile-card {
    margin-bottom: 15px;
    border-radius: 0; /* إزالة الحواف المستديرة للبطاقة على الجوال */
    box-shadow: none; /* إزالة الظل على الجوال */
    padding: 15px;
  }
  .profile-photo {
    width: 80px;
    height: 80px;
  }
  .fake-address-block {
    padding: 15px 0;
  }
  .address-card {
    flex-direction: column; /* ترتيب محتوى كارت العنوان عمودياً */
    align-items: center;
    text-align: center;
    padding: 12px;
  }
  .address-main {
    margin-bottom: 10px;
  }
}
 </style>
