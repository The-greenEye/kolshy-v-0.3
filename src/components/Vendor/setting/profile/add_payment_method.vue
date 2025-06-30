<template>
  <div>
    <KolshyStyleHeader />
    <div class="vendor-payment-page p-4">
      <h2 class="page-title">Payment Methods</h2>
      <div class="payment-cards">
        <el-card v-for="(m, i) in methods" :key="i" class="method-card">
          <div class="method-info">
            <span class="card-name">{{ m.cardName }}</span>
            <span class="card-number">•••• {{ last4(m.cardNumber) }}</span>
          </div>
          <el-button type="danger" size="mini" @click="deleteMethod(i)">Remove</el-button>
        </el-card>
        <el-card class="method-add-card" @click="dialogVisible = true">
          <div class="add-block">
            <i class="bi bi-plus-circle-fill add-icon"></i>
            <span>Add New Method</span>
          </div>
        </el-card>
      </div>

      <el-dialog title="Add Payment Method" v-model="dialogVisible" width="500px" center>
        <el-form :model="form" ref="paymentForm" label-width="120px" :rules="rules">
          <el-form-item label="Cardholder" prop="cardName">
            <el-input v-model="form.cardName" placeholder="Name on card" />
          </el-form-item>
          <el-form-item label="Card Number" prop="cardNumber">
            <el-input v-model="form.cardNumber" placeholder="1234 5678 9012 3456" maxlength="19" />
          </el-form-item>
          <el-form-item label="Expiry" prop="expiryDate">
            <el-date-picker
              v-model="form.expiryDate"
              type="month"
              placeholder="MM/YYYY"
              format="MM/yyyy"
              value-format="yyyy-MM"
              style="width: 100%;"
            />
          </el-form-item>
          <el-form-item label="CVV" prop="cvv">
            <el-input v-model="form.cvv" placeholder="123" maxlength="3" show-password />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="savePaymentMethod">Save</el-button>
        </span>
      </el-dialog>
    </div>
    <footerC />
  </div>
</template>

<script>
import KolshyStyleHeader from "@/components/Global/topBar";
import footerC from "@/components/Global/footer";
export default {
  name: "AddPaymentMethod",
  components: { KolshyStyleHeader, footerC },
  data() {
    return {
      methods: JSON.parse(localStorage.getItem("paymentMethods")) || [],
      dialogVisible: false,
      form: {
        cardName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      },
      rules: {
        cardName: [{ required: true, message: "Please enter cardholder name", trigger: "blur" }],
        cardNumber: [
          { required: true, message: "Please enter card number", trigger: "blur" },
          { pattern: /^\\d{4}\\s?\\d{4}\\s?\\d{4}\\s?\\d{4}$/, message: "Invalid card number format", trigger: "blur" }
        ],
        expiryDate: [{ required: true, message: "Please select expiry date", trigger: "change" }],
        cvv: [
          { required: true, message: "Please enter CVV", trigger: "blur" },
          { pattern: /^\\d{3}$/, message: "CVV must be 3 digits", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    last4(number) {
      return number.replace(/\s+/g, '').slice(-4);
    },
    deleteMethod(index) {
      this.methods.splice(index, 1);
      localStorage.setItem("paymentMethods", JSON.stringify(this.methods));
      this.success("Payment method removed");
    },
    savePaymentMethod() {
      this.paymentForm.validate(valid => {
        if (valid) {
          this.methods.push({ ...this.form });
          localStorage.setItem("paymentMethods", JSON.stringify(this.methods));
          this.success("Payment method added successfully");
          this.resetForm();
          this.dialogVisible = false;
        }
      });
    },
    resetForm() {
      this.form = { cardName: "", cardNumber: "", expiryDate: "", cvv: "" };
      this.paymentForm.clearValidate();
    }
  }
};
</script>

<style scoped>
.vendor-payment-page {
  max-width: 1000px;
  margin: auto;
  padding: 24px;
  background: #f3f5f6;
}
.page-title {
  font-size: 1.5rem;
  margin-bottom: 16px;
  color: #e51742;
  font-weight: 600;
}
.payment-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.method-card, .method-add-card {
  width: 200px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.method-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 12px;
  flex-direction: column;
}
.method-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
}
.card-name {
  font-weight: 500;
  color: #333;
}
.card-number {
  font-size: 0.9rem;
  color: #555;
}
.method-add-card {
  border: 2px dashed #bbb;
  background: #fafafa;
}
.add-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #888;
}
.add-icon {
  font-size: 2rem;
  margin-bottom: 4px;
  color: #e51742;
}
.dialog-footer {
  text-align: right;
}
@media (max-width: 600px) {
  .payment-cards {
    justify-content: center;
  }
}

.add-payment-method-page {
  max-width: 600px;
  margin: auto;
  background: #fff;
  border-radius: 6px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
