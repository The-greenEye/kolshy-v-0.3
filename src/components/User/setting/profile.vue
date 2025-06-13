<template>
  <div class="customer-profile-page">
    <KolshyStyleHeader />
    <el-row class="profile-container" :gutter="24">
      <!-- Profile Info Card -->
      <el-col :xs="24" :md="8">
        <el-card class="profile-card">
          <div class="profile-photo-section">
            <img :src="profilePhotoUrl || defaultPhoto" class="profile-photo" alt="Profile Photo" />
            <input type="file" accept="image/*" @change="onPhotoChange" class="photo-upload-input" />
          </div>
          <el-divider></el-divider>
          <el-form :model="profileForm" label-width="80px" class="profile-form">
            <el-form-item label="Name">
              <el-input v-model="profileForm.name" />
            </el-form-item>
            <el-form-item label="Email">
              <el-input v-model="profileForm.email" disabled />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveProfile" :loading="isSaving" size="small" style="width:100%">Save Changes</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <!-- Addresses Card -->
      <el-col :xs="24" :md="8">
        <el-card class="profile-card">
          <div class="section-header">
            <i class="bi bi-geo-alt-fill"></i> Addresses
          </div>
          <el-divider></el-divider>
          <div v-if="addresses.length === 0" class="fake-address-block">
            <div class="fake-address-title">No address on file</div>
            <div class="fake-address-desc">Add a delivery address to make shopping easier.</div>
            <router-link to="/setting/addresses">
              <el-button type="primary" size="small">Manage Addresses</el-button>
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
                <router-link to="/setting/addresses">
                  <el-button size="small" type="info">Edit</el-button>
                </router-link>
              </div>
            </el-card>
          </div>
        </el-card>
      </el-col>

      <!-- Payments Card -->
      <el-col :xs="24" :md="8">
        <el-card class="profile-card">
          <div class="section-header">
            <i class="bi bi-credit-card"></i> Payments
          </div>
          <el-divider></el-divider>
          <el-table :data="payments" style="width: 100%" size="small" v-if="payments.length">
            <el-table-column prop="date" label="Date" width="100" />
            <el-table-column prop="amount" label="Amount" width="80" />
            <el-table-column prop="method" label="Method" width="100" />
            <el-table-column prop="status" label="Status" width="80" />
          </el-table>
          <div v-else class="fake-address-desc">No payment history yet.</div>
        </el-card>
      </el-col>
    </el-row>
    <footerC />
  </div>
</template>

<script>
import KolshyStyleHeader from '@/components/Global/topBar';
import footerC from '@/components/Global/footer';
import { useStoreApp, useStoreCustomer } from '@/stores/app';
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
      defaultPhoto: 'https://ui-avatars.com/api/?name=Customer',
      isSaving: false,
      addresses: [],
      payments: [],
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
        .catch(() => {
          ElMessage.error('Failed to update photo');
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
      }
    },
    async fetchPayments() {
      // This is a stub. Replace with real API if available.
      this.payments = [
        { date: '2024-06-01', amount: '$100.00', method: 'Visa', status: 'Completed' },
        { date: '2024-05-15', amount: '$50.00', method: 'PayPal', status: 'Pending' },
      ];
    },
  },
  mounted() {
    this.fetchProfile();
    this.fetchAddresses();
    this.fetchPayments();
  },
};
</script>

<style scoped>
.customer-profile-page {
  background: #f6f6f6;
  min-height: 100vh;
}
.profile-container {
  max-width: 1200px;
  margin: 32px auto;
  padding: 0 8px;
}
.profile-card {
  margin-bottom: 24px;
  border-radius: 12px;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.section-header {
  font-size: 1.1rem;
  font-weight: 600;
  color: #e51742;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.profile-photo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.profile-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e51742;
}
.photo-upload-input {
  margin-top: 8px;
}
.profile-form {
  max-width: 100%;
}
.fake-address-block {
  text-align: center;
  padding: 24px 0;
}
.fake-address-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 6px;
}
.fake-address-desc {
  color: #888;
  font-size: 0.97rem;
  margin-bottom: 12px;
}
.address-card {
  margin-bottom: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 12px 16px;
}
.address-main {
  margin-bottom: 8px;
}
.address-actions {
  display: flex;
  gap: 8px;
}
@media (max-width: 991px) {
  .profile-container {
    max-width: 100%;
    padding: 0 4px;
  }
}
@media (max-width: 768px) {
  .profile-container {
    flex-direction: column;
    padding: 0;
  }
  .profile-card {
    min-height: unset;
    margin-bottom: 18px;
  }
}
@media (max-width: 576px) {
  .profile-container {
    padding: 0;
  }
  .profile-card {
    padding: 10px 4px;
  }
  .profile-photo {
    width: 70px;
    height: 70px;
  }
}
</style>
