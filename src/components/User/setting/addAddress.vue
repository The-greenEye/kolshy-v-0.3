<template>
  <div>
    <KolshyStyleHeader />
    <div class="address-list-container p-4">
      <!-- Add Address Card -->
      <el-card class="add-address-card" shadow="hover" @click="openDialog">
        <div class="add-address-content">
          <i class="bi bi-plus-lg add-address-icon"></i>
          <div class="add-address-text">Add Address</div>
        </div>
      </el-card>

      <!-- Add Address Modal -->
      <el-dialog v-model="dialogVisible" title="Add New Address" width="400px" :close-on-click-modal="false" :close-on-press-escape="true" class="add-address-dialog" align-center>
        <el-spin v-if="loading" size="large" style="display:block; margin: 0 auto 16px auto;" />
        <el-form :model="addressForm" label-width="90px" class="address-form">
          <el-form-item label="Name">
            <el-input v-model="addressForm.full_name" placeholder="Full Name" />
          </el-form-item>
          <el-form-item label="Street">
            <el-input v-model="addressForm.address" placeholder="Street Address" />
          </el-form-item>
          <el-form-item label="City ID">
            <el-input v-model="addressForm.city_id" placeholder="City ID" />
          </el-form-item>
          <el-form-item label="State">
            <el-input v-model="addressForm.building" placeholder="Building (Optional)" />
          </el-form-item>
          <el-form-item label="Zip">
            <el-input v-model="addressForm.postcode" placeholder="Zip Code" />
          </el-form-item>
          <el-form-item label="Country ID">
            <el-input v-model="addressForm.country_id" placeholder="Country ID" />
          </el-form-item>
          <el-form-item label="Phone">
            <el-input v-model="addressForm.phone" placeholder="Phone Number" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="closeDialog" plain> <i class="bi bi-x-circle"></i> Cancel </el-button>
          <el-button type="primary" @click="saveAddress"> <i class="bi bi-save"></i> Save </el-button>
        </template>
      </el-dialog>

      <!-- Example Address Card -->
      <el-card v-for="(ress, index) in address" :key="index" class="example-address-card" shadow="hover">
        <div class="example-address-header d-flex justify-content-between">
          <el-tag size="small" type="info" class="default-tag">Default</el-tag>
          <span class="amazon-tag">{{ ress.created_at }}</span>
        </div>
        <div class="example-address-body">
          <div class="address-name">{{ress.full_name}}</div>
          <div class="address-line">{{ ress.address }}</div>
          <div class="address-line">MIDDLEBURG, {{ ress.postcode }}</div>
          <div class="address-line">{{ ress.building }}</div>
          <div class="address-line">Phone number: {{ ress.phone }}</div>
          <a href="#" class="edit-link">Edit delivery preferences</a>
        </div>
        <div class="example-address-footer">
          <a href="#" class="edit-action">Edit</a>
          <span class="divider">|</span>
          <a href="#" class="remove-action">Remove</a>
        </div>
      </el-card>
    </div>
    <footerC />
  </div>
</template>

<script>
import axios from "axios";
import KolshyStyleHeader from "@/components/Global/topBar";
import footerC from "@/components/Global/footer";
import { ElMessage } from "element-plus";
import { useStoreApp } from "@/stores/app";
export default {
  name: "CustomerAddressList",
  components: {
    KolshyStyleHeader,
    footerC,
  },
  setup() {
   const api = useStoreApp();
    return { api };
  },
  data() {
    return {
      dialogVisible: false,
      address: [],
      loading: false,
      addressForm: {
        full_name: "",
        phone: "",
        country_id: 1,
        city_id: 1,
        address: "",
        building: "",
        postcode: "",
        neiborhood: "",
        landmark: "",
        preference: "home",
        default: 1,
      },
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    /**
     * Save a new address for the customer.
     * Shows a success message on success, error message on failure.
     */
    async saveAddress() {
      this.loading = true;
      try {
        const token = localStorage.getItem("tokenkolshy");
        const response = await axios.post(this.api.baseUrl + this.api.endPoint.customer.address.add_address, this.addressForm, {
          headers: {
            Authorization: `Bearer `,
            "Content-Type": "application/json",
          },
        });
        ElMessage.success("Address added successfully");
        this.dialogVisible = false;
        this.getAllAddress();
      } catch (error) {
        // Log error for debugging in development
        if (process.env.NODE_ENV === 'development') {
          console.error("Error adding address:", error);
        }
        // Show user-friendly error message
        ElMessage.error("Failed to add address. Please check your input and try again.");
        // Optionally, keep the dialog open for user correction
      } finally {
        this.loading = false;
      }
    },
    /*
     * Fetch all addresses for the current customer.
     * Updates the address list on success, shows error on failure.
     */
    async getAllAddress() {
      this.loading = true;
      try {
        const token = localStorage.getItem("tokenkolshy");
        const res_get_address = await axios.get(this.api.baseUrl + this.api.endPoint.customer.address.get_address, {
          headers: {
            Authorization: `Bearer `,
          },
        });
        if ([201, 200].includes(res_get_address.status)) {
          ElMessage.success("Address Get it successfully");
          this.api.customer.address = [...res_get_address.data.data];
          this.address = res_get_address.data.data;
        }
      } catch (err) {
        // Log error for debugging in development
        if (process.env.NODE_ENV === 'development') {
          console.error("Error fetching addresses:", err);
        }
        // Show user-friendly error message
        ElMessage.error("Failed to get address. Please try again later.");
      } finally {
        this.loading = false;
      }
    },
  },
    /**
     * Lifecycle hook: Fetch all addresses when component is mounted.
     */
    mounted() {
    this.getAllAddress()
  }
};
</script>

<style scoped>
.address-list-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-start;
}

.add-address-card,
.example-address-card {
  width: 320px;
  height: auto;
  min-height: 240px;
  margin-bottom: 16px;
}

.add-address-card {
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: box-shadow 0.2s;
  background: #fafafa;
}

.add-address-card:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
  border-color: #409eff;
}

.add-address-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.add-address-icon {
  font-size: 3rem;
  color: #bfbfbf;
  margin-bottom: 12px;
}

.add-address-text {
  font-size: 1.25rem;
  color: #595959;
  font-weight: 500;
}

@media (max-width: 768px) {
  .address-list-container {
    justify-content: center;
  }

  .add-address-card,
  .example-address-card {
    width: 100%;
    max-width: 100%;
  }
}
</style>
