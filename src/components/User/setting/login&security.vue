<template>
    <div class="customer-security-page">
      <KolshyStyleHeader />
      <div class="security-main-container">
        <h2 class="page-title">Login & Security</h2>
  
        <el-row :gutter="24" class="security-grid">
          <el-col :xs="24" :md="12">
            <el-card class="security-card">
              <div class="section-header">
                <i class="bi bi-person-badge"></i> Your Account Information
              </div>
              <el-divider></el-divider>
              <div class="info-item">
                <span class="info-label">Name:</span>
                <span class="info-value">{{ securityInfo.name }}</span>
                <el-button type="text" size="small" @click="openEditNameDialog">Edit</el-button>
              </div>
              <div class="info-item">
                <span class="info-label">Email:</span>
                <span class="info-value">{{ securityInfo.email }}</span>
                <el-button type="text" size="small" @click="openEditEmailDialog">Edit</el-button>
              </div>
              <div class="info-item">
                <span class="info-label">Mobile Number:</span>
                <span class="info-value">{{ securityInfo.mobile_number || 'Not added' }}</span>
                <el-button type="text" size="small" @click="openEditMobileDialog">Edit</el-button>
              </div>
              <div class="info-item">
                <span class="info-label">Password:</span>
                <span class="info-value">**********</span>
                <el-button type="text" size="small" @click="openChangePasswordDialog">Change</el-button>
              </div>
            </el-card>
          </el-col>
  
          <el-col :xs="24" :md="12">
            <el-card class="security-card">
              <div class="section-header">
                <i class="bi bi-shield-lock"></i> Two-Step Verification
              </div>
              <el-divider></el-divider>
              <div class="info-item">
                <span class="info-label">Status:</span>
                <span class="info-value">
                  <el-tag :type="twoStepEnabled ? 'success' : 'info'">{{ twoStepEnabled ? 'Enabled' : 'Disabled' }}</el-tag>
                </span>
                <el-button type="text" size="small" @click="toggleTwoStep">{{ twoStepEnabled ? 'Disable' : 'Enable' }}</el-button>
              </div>
              <p class="description-text">
                Two-step verification adds an extra layer of security to your account by requiring a code from your phone in addition to your password.
              </p>
            </el-card>
          </el-col>
  
          <el-col :xs="24">
            <el-card class="security-card">
              <div class="section-header">
                <i class="bi bi-laptop"></i> Active Devices
              </div>
              <el-divider></el-divider>
              <el-table :data="activeDevices" style="width: 100%" size="small">
                <el-table-column prop="device" label="Device" />
                <el-table-column prop="location" label="Location" />
                <el-table-column prop="last_activity" label="Last Activity" />
                <el-table-column label="Action" width="100">
                  <template #default="scope">
                    <el-button type="danger" size="small" @click="logoutDevice(scope.row.id)">Logout</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div v-if="activeDevices.length === 0" class="empty-state-text">No active sessions found.</div>
            </el-card>
          </el-col>
        </el-row>
      </div>
  
      <el-dialog v-model="editNameDialogVisible" title="Edit Name" width="400px" align-center>
        <el-form :model="editForm" label-width="80px">
          <el-form-item label="Name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="editNameDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="saveName" :loading="isSaving">Save</el-button>
        </template>
      </el-dialog>
  
      <el-dialog v-model="editEmailDialogVisible" title="Edit Email" width="400px" align-center>
        <el-form :model="editForm" label-width="80px">
          <el-form-item label="Email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="editEmailDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="saveEmail" :loading="isSaving">Save</el-button>
        </template>
      </el-dialog>
  
      <el-dialog v-model="editMobileDialogVisible" title="Edit Mobile Number" width="400px" align-center>
        <el-form :model="editForm" label-width="120px">
          <el-form-item label="Mobile Number">
            <el-input v-model="editForm.mobile_number"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="editMobileDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="saveMobile" :loading="isSaving">Save</el-button>
        </template>
      </el-dialog>
  
      <el-dialog v-model="changePasswordDialogVisible" title="Change Password" width="400px" align-center>
        <el-form :model="passwordForm" label-width="120px">
          <el-form-item label="Current Pass.">
            <el-input v-model="passwordForm.currentPassword" type="password" show-password></el-input>
          </el-form-item>
          <el-form-item label="New Pass.">
            <el-input v-model="passwordForm.newPassword" type="password" show-password></el-input>
          </el-form-item>
          <el-form-item label="Confirm New Pass.">
            <el-input v-model="passwordForm.confirmPassword" type="password" show-password></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="changePasswordDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="changePassword" :loading="isSaving">Change Password</el-button>
        </template>
      </el-dialog>
  
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
    name: 'LoginSecurityCus', // اسم جديد للمكون
    components: { KolshyStyleHeader, footerC },
    data() {
      return {
        api: useStoreApp(),
        customerStore: useStoreCustomer(), // تم تغيير الاسم لتجنب التعارض مع securityInfo.customer
        securityInfo: {
          name: 'Mock Customer', // بيانات وهمية
          email: 'mock.customer@example.com',
          mobile_number: '123-456-7890',
          // يمكنك إضافة حقول أخرى مثل last_password_change, etc.
        },
        editForm: { // نموذج للحوارات (dialogs)
          name: '',
          email: '',
          mobile_number: ''
        },
        passwordForm: {
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        },
        twoStepEnabled: false, // حالة وهمية للتحقق بخطوتين
        activeDevices: [], // قائمة الأجهزة النشطة
  
        // حالات التحميل والحوارات
        isSaving: false,
        editNameDialogVisible: false,
        editEmailDialogVisible: false,
        editMobileDialogVisible: false,
        changePasswordDialogVisible: false,
      };
    },
    methods: {
      // ---- Mock API Calls for Demo (استبدلها بـ API الحقيقي لاحقاً) ----
  
      async fetchSecurityInfo() {
        this.isSaving = true; // يمكن استخدام هذا كحالة تحميل عامة للصفحة
        try {
          const token = localStorage.getItem('tokenkolshy');
          // هنا سيكون استدعاء الـ API الحقيقي لجلب معلومات الأمان
          // const res = await axios.get(this.api.baseUrl + this.api.endPoint.globel.security.get_info, { headers: { Authorization: `Bearer ${token}` } });
          // this.securityInfo = res.data.data;
          // this.twoStepEnabled = res.data.data.two_step_enabled;
          
          // Mock data loading
          await new Promise(resolve => setTimeout(resolve, 500));
          this.securityInfo = {
            name: 'Ahmed Yassine',
            email: 'ahmed.yassine@kolshy.com',
            mobile_number: '01012345678',
          };
          this.twoStepEnabled = true; // افتراضياً مفعّل للموك
  
          ElMessage.success('Security info loaded (Mock)');
        } catch (e) {
          ElMessage.error('Failed to load security info. Using mock data.');
          console.error(e);
          // Fallback to initial mock data if API fails
        } finally {
          this.isSaving = false;
        }
      },
  
      openEditNameDialog() {
        this.editForm.name = this.securityInfo.name;
        this.editNameDialogVisible = true;
      },
      async saveName() {
        this.isSaving = true;
        try {
          const token = localStorage.getItem('tokenkolshy');
          // API call to update name
          // await axios.post(this.api.baseUrl + this.api.endPoint.globel.profile.update_name, { name: this.editForm.name }, { headers: { Authorization: `Bearer ${token}` } });
          
          // Mock success
          await new Promise(resolve => setTimeout(resolve, 500));
          this.securityInfo.name = this.editForm.name;
          ElMessage.success('Name updated successfully! (Mock)');
          this.editNameDialogVisible = false;
        } catch (e) {
          ElMessage.error('Failed to update name. (Mock Error)');
          console.error(e);
        } finally {
          this.isSaving = false;
        }
      },
  
      openEditEmailDialog() {
        this.editForm.email = this.securityInfo.email;
        this.editEmailDialogVisible = true;
      },
      async saveEmail() {
        this.isSaving = true;
        try {
          const token = localStorage.getItem('tokenkolshy');
          // API call to update email
          // await axios.post(this.api.baseUrl + this.api.endPoint.globel.profile.update_email, { email: this.editForm.email }, { headers: { Authorization: `Bearer ${token}` } });
          
          // Mock success
          await new Promise(resolve => setTimeout(resolve, 500));
          this.securityInfo.email = this.editForm.email;
          ElMessage.success('Email updated successfully! (Mock)');
          this.editEmailDialogVisible = false;
        } catch (e) {
          ElMessage.error('Failed to update email. (Mock Error)');
          console.error(e);
        } finally {
          this.isSaving = false;
        }
      },
  
      openEditMobileDialog() {
        this.editForm.mobile_number = this.securityInfo.mobile_number;
        this.editMobileDialogVisible = true;
      },
      async saveMobile() {
        this.isSaving = true;
        try {
          const token = localStorage.getItem('tokenkolshy');
          // API call to update mobile number
          // await axios.post(this.api.baseUrl + this.api.endPoint.globel.profile.update_mobile, { mobile_number: this.editForm.mobile_number }, { headers: { Authorization: `Bearer ${token}` } });
          
          // Mock success
          await new Promise(resolve => setTimeout(resolve, 500));
          this.securityInfo.mobile_number = this.editForm.mobile_number;
          ElMessage.success('Mobile number updated successfully! (Mock)');
          this.editMobileDialogVisible = false;
        } catch (e) {
          ElMessage.error('Failed to update mobile number. (Mock Error)');
          console.error(e);
        } finally {
          this.isSaving = false;
        }
      },
  
      openChangePasswordDialog() {
        // Clear password fields when opening dialog
        this.passwordForm.currentPassword = '';
        this.passwordForm.newPassword = '';
        this.passwordForm.confirmPassword = '';
        this.changePasswordDialogVisible = true;
      },
      async changePassword() {
        this.isSaving = true; // استخدام isSaving عامة هنا
        try {
          // Basic validation
          if (!this.passwordForm.currentPassword || !this.passwordForm.newPassword || !this.passwordForm.confirmPassword) {
            ElMessage.error('All password fields are required.');
            return;
          }
          if (this.passwordForm.newPassword.length < 6) {
            ElMessage.error('New password must be at least 6 characters.');
            return;
          }
          if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
            ElMessage.error('New password and confirmation do not match.');
            return;
          }
  
          const token = localStorage.getItem('tokenkolshy');
          // API call to change password
          // await axios.post(this.api.baseUrl + this.api.endPoint.globel.profile.change_password, {
          //   current_password: this.passwordForm.currentPassword,
          //   new_password: this.passwordForm.newPassword,
          //   new_password_confirmation: this.passwordForm.confirmPassword,
          // }, { headers: { Authorization: `Bearer ${token}` } });
          
          // Mock success
          await new Promise(resolve => setTimeout(resolve, 1000));
          ElMessage.success('Password changed successfully! (Mock)');
          this.changePasswordDialogVisible = false;
        } catch (e) {
          ElMessage.error('Failed to change password. (Mock Error)');
          console.error(e);
        } finally {
          this.isSaving = false;
        }
      },
  
      async toggleTwoStep() {
        this.isSaving = true; // استخدام isSaving لعملية التحقق بخطوتين
        try {
          // API call to toggle two-step verification
          // await axios.post(this.api.baseUrl + this.api.endPoint.globel.security.toggle_two_step, {
          //   enable: !this.twoStepEnabled
          // }, { headers: { Authorization: `Bearer ${token}` } });
          
          // Mock toggle
          await new Promise(resolve => setTimeout(resolve, 500));
          this.twoStepEnabled = !this.twoStepEnabled;
          ElMessage.success(`Two-Step Verification ${this.twoStepEnabled ? 'Enabled' : 'Disabled'}! (Mock)`);
        } catch (e) {
          ElMessage.error('Failed to update Two-Step Verification. (Mock Error)');
          console.error(e);
        } finally {
          this.isSaving = false;
        }
      },
  
      async fetchActiveDevices() {
        this.isSaving = true;
        try {
          const token = localStorage.getItem('tokenkolshy');
          // API call to fetch active devices
          // const res = await axios.get(this.api.baseUrl + this.api.endPoint.globel.security.get_active_devices, { headers: { Authorization: `Bearer ${token}` } });
          // this.activeDevices = res.data.data;
  
          // Mock data loading
          await new Promise(resolve => setTimeout(resolve, 700));
          this.activeDevices = [
            { id: 1, device: 'Desktop (Chrome)', location: 'Cairo, Egypt', last_activity: 'Just now' },
            { id: 2, device: 'Mobile (Android, Firefox)', location: 'Alexandria, Egypt', last_activity: '2 hours ago' },
            { id: 3, device: 'Tablet (Safari)', location: 'Dubai, UAE', last_activity: 'Yesterday' },
          ];
          ElMessage.success('Active devices loaded! (Mock)');
        } catch (e) {
          ElMessage.error('Failed to load active devices. Using mock data.');
          console.error(e);
          // Fallback to empty or predefined mock data
        } finally {
          this.isSaving = false;
        }
      },
  
      async logoutDevice(deviceId) {
        if (!confirm('Are you sure you want to log out this device?')) {
          return;
        }
        try {
          const token = localStorage.getItem('tokenkolshy');
          // API call to logout specific device
          // await axios.post(`${this.api.baseUrl}${this.api.endPoint.globel.security.logout_device}/${deviceId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
          
          // Mock logout
          await new Promise(resolve => setTimeout(resolve, 500));
          this.activeDevices = this.activeDevices.filter(device => device.id !== deviceId);
          ElMessage.success('Device logged out successfully! (Mock)');
        } catch (e) {
          ElMessage.error('Failed to log out device. (Mock Error)');
          console.error(e);
        }
      },
  
      // ------------------------------------------------
    },
    mounted() {
      this.fetchSecurityInfo();
      this.fetchActiveDevices();
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

.customer-security-page {
  background: #eaeded; /* خلفية رمادية فاتحة للصفحة بالكامل */
  min-height: 100vh;
}
.security-main-container {
  max-width: 1200px; /* عرض أقصى للحاوية الرئيسية */
  margin: 30px auto; /* توسيط مع مسافة علوية وسفلية */
  padding: 0 15px; /* حشوة جانبية */
}

.page-title {
  font-size: 28px; /* حجم عنوان أكبر */
  font-weight: bold; /* خط سميك */
  margin-bottom: 30px; /* مسافة أكبر أسفل العنوان */
  text-align: left; /* محاذاة لليسار */
  color: #141414; /* لون نص داكن */
  border-bottom: 1px solid #eee; /* خط فاصل أسفل العنوان */
  padding-bottom: 15px; /* حشوة تحت النص قبل الخط */
}

.security-grid {
  /* No specific grid styles here, as el-col handles the layout */
}

.security-card {
  margin-bottom: 24px;
  border-radius: 8px; /* حواف مستديرة للبطاقة */
  box-shadow: 0 2px 8px rgba(0,0,0,0.06); /* ظل خفيف */
  background-color: #fff; /* خلفية بيضاء للبطاقة */
  padding: 20px; /* حشوة داخلية */
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

.info-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0; /* خط فاصل خفيف بين العناصر */
}
.info-item:last-of-type {
  border-bottom: none; /* إزالة الخط الفاصل للعنصر الأخير */
}

.info-label {
  font-weight: bold;
  color: #555;
  flex-basis: 150px; /* عرض ثابت للـ label */
  flex-shrink: 0;
}
.info-value {
  color: #141414;
  flex-grow: 1; /* للسماح للقيمة بأخذ المساحة المتبقية */
}
.info-item .el-button--text {
  color: #007185; /* لون أزرق لزر التعديل/التغيير */
  font-weight: 500;
  transition: color 0.2s ease;
  padding: 0;
  height: auto; /* لضمان عدم وجود ارتفاع افتراضي من Element Plus */
  min-height: unset;
}
.info-item .el-button--text:hover {
  color: #c45500; /* برتقالي عند التمرير */
}

.el-tag {
  font-weight: bold;
}

.description-text {
  font-size: 0.9rem;
  color: #777;
  line-height: 1.5;
  margin-top: 15px;
}

.empty-state-text {
  text-align: center;
  color: #888;
  padding: 20px 0;
  font-size: 0.95rem;
}

/* El-Dialog (Popups) styles - same as in profile.vue, ensuring consistency */
.el-dialog__header {
  background-color: #000336; /* خلفية الرأس بلونك الأزرق الداكن */
  color: #fff;
  padding: 15px 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.el-dialog__title {
  color: #fff;
  font-weight: bold;
}
.el-dialog__headerbtn .el-dialog__close {
  color: #fff; /* لون زر الإغلاق أبيض */
}
.el-dialog__body {
  padding: 20px;
}
.el-form-item {
  margin-bottom: 20px;
}
.el-form-item__label {
  font-weight: bold;
  color: #555;
}
.el-input__inner {
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 0 12px;
  height: 40px;
}
.el-input__inner:focus {
  border-color: #e51748;
  box-shadow: 0 0 0 2px rgba(229, 23, 66, 0.2);
}
.el-dialog__footer {
  text-align: right;
  padding: 15px 20px;
  border-top: 1px solid #eee;
}
.el-button {
  font-weight: bold;
  border-radius: 4px;
}
.el-button--primary {
  background-color: #e51748;
  border-color: #e51748;
  color: #fff;
}
.el-button--primary:hover {
  background-color: #ca2e52;
  border-color: #ca2e52;
}
.el-button--default { /* For the 'Cancel' button */
  color: #555;
  border-color: #ddd;
}
.el-button--default:hover {
  color: #e51748;
  border-color: #e51748;
  background-color: #f8f8f8;
}

/* El-Table (Active Devices) */
.el-table {
  font-size: 0.9rem;
  color: #333;
  border: 1px solid #eee; /* حدود للجدول */
  border-radius: 4px;
  overflow: hidden; /* لضمان تطبيق border-radius */
}
.el-table th {
  background-color: #f8f8f8;
  color: #555;
  font-weight: bold;
  padding: 12px 10px;
}
.el-table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.el-table__row:last-child td {
  border-bottom: none;
}
.el-table .el-button--danger {
  background-color: #F44336;
  border-color: #F44336;
  color: #fff;
  font-size: 0.8rem;
  padding: 6px 12px;
  border-radius: 4px;
}
.el-table .el-button--danger:hover {
  background-color: #D32F2F;
  border-color: #D32F2F;
}

/* Responsive Styles */
@media (max-width: 991px) {
  .security-main-container {
    padding: 0 10px;
  }
  .page-title {
    font-size: 24px;
    margin-bottom: 25px;
    padding-bottom: 12px;
  }
  .security-grid .el-col {
    /* El-col will handle column stacking based on :xs, :sm, :md */
  }
  .security-card {
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
  .info-label {
    flex-basis: 100px; /* تصغير عرض الـ label قليلاً */
  }
}

@media (max-width: 767px) {
  .security-main-container {
    padding: 0;
    margin: 20px auto;
  }
  .page-title {
    font-size: 22px;
    margin-bottom: 20px;
    text-align: center;
    border-bottom: none;
  }
  .security-grid .el-col {
    padding: 0 15px !important; /* إضافة حشوة جانبية للأعمدة على الجوال */
  }
  .security-card {
    margin-bottom: 15px;
    border-radius: 0;
    box-shadow: none;
    padding: 15px;
  }
  .info-item {
    flex-direction: column; /* ترتيب العناصر عمودياً */
    align-items: flex-start;
  }
  .info-label {
    width: 100%;
    margin-bottom: 5px;
    text-align: left;
  }
  .info-value {
    width: 100%;
    margin-bottom: 5px;
  }
  .info-item .el-button--text {
    align-self: flex-end; /* وضع زر التعديل في نهاية العنصر */
  }
  .el-dialog { /* للـ popup dialogs */
    width: 95% !important; /* عرض أكبر للـ modal على الجوال */
  }
  .el-dialog__header, .el-dialog__footer {
    padding: 12px 15px;
  }
  .el-form-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .el-form-item__label {
    width: 100% !important;
    text-align: left !important;
    margin-bottom: 5px;
  }
}
  </style>