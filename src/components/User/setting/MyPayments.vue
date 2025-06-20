<template>
    <div class="customer-payments-page">
      <KolshyStyleHeader />
      <div class="payments-main-container">
        <h2 class="page-title">Your Payments</h2>
  
        <el-row :gutter="24" class="payments-grid">
          <el-col :xs="24" :md="12">
            <el-card class="payments-card">
              <div class="section-header">
                <i class="bi bi-credit-card-fill"></i> Your Payment Methods
              </div>
              <el-divider></el-divider>
              <div v-if="paymentMethods.length === 0" class="empty-state-block">
                <i class="bi bi-credit-card empty-icon"></i>
                <p>No payment methods on file.</p>
                <el-button type="primary" size="default" @click="openAddPaymentDialog">Add a Payment Method</el-button>
              </div>
              <div v-else class="payment-methods-list">
                <div v-for="method in paymentMethods" :key="method.id" class="payment-method-item">
                  <div class="method-details">
                    <span class="method-icon">
                      <i :class="getCardIcon(method.card_type)"></i>
                    </span>
                    <div class="method-info">
                      <span class="method-name">{{ method.card_type }} ending in {{ method.last_four }}</span>
                      <span class="method-expiry">Expires: {{ method.expiry_date }}</span>
                    </div>
                  </div>
                  <div class="method-actions">
                    <el-button type="text" size="small" @click="editPaymentMethod(method)">Edit</el-button>
                    <el-button type="text" size="small" @click="removePaymentMethod(method.id)">Remove</el-button>
                  </div>
                </div>
                <el-button type="text" size="default" class="add-new-method-btn" @click="openAddPaymentDialog">
                  <i class="bi bi-plus-circle me-2"></i> Add another payment method
                </el-button>
              </div>
            </el-card>
          </el-col>
  
          <el-col :xs="24" :md="12">
            <el-card class="payments-card">
              <div class="section-header">
                <i class="bi bi-receipt"></i> Transaction History
              </div>
              <el-divider></el-divider>
              <div v-if="transactions.length === 0" class="empty-state-block">
                <i class="bi bi-journal-x empty-icon"></i>
                <p>No transactions found.</p>
                <el-button type="info" size="default">View All Orders</el-button>
              </div>
              <div v-else class="transactions-list">
                <el-table :data="transactions" style="width: 100%" size="small">
                  <el-table-column prop="date" label="Date" width="100" />
                  <el-table-column prop="description" label="Description" />
                  <el-table-column prop="amount" label="Amount" width="100">
                    <template #default="scope">
                      {{ formatCurrency(scope.row.amount) }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="status" label="Status" width="100" />
                </el-table>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
  
      <el-dialog v-model="addPaymentDialogVisible" :title="editMode ? 'Edit Payment Method' : 'Add New Payment Method'" width="500px" :close-on-click-modal="false" :close-on-press-escape="true" class="add-payment-dialog" align-center>
        <el-form :model="paymentForm" label-width="120px" ref="paymentFormRef">
          <el-form-item label="Card Type" prop="card_type" :rules="[{ required: true, message: 'Card Type is required', trigger: 'change' }]">
            <el-select v-model="paymentForm.card_type" placeholder="Select Card Type">
              <el-option label="Visa" value="Visa"></el-option>
              <el-option label="MasterCard" value="MasterCard"></el-option>
              <el-option label="American Express" value="Amex"></el-option>
              <el-option label="Discover" value="Discover"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Card Number" prop="card_number" :rules="[{ required: true, message: 'Card Number is required', trigger: 'blur' }]">
            <el-input v-model="paymentForm.card_number" placeholder="Full Card Number" type="password" show-password></el-input>
          </el-form-item>
          <el-form-item label="Expiry Date" prop="expiry_date" :rules="[{ required: true, message: 'Expiry Date is required', trigger: 'blur' }]">
            <el-input v-model="paymentForm.expiry_date" placeholder="MM/YY"></el-input>
          </el-form-item>
          <el-form-item label="Card Holder" prop="card_holder_name" :rules="[{ required: true, message: 'Card Holder Name is required', trigger: 'blur' }]">
            <el-input v-model="paymentForm.card_holder_name" placeholder="Name on Card"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="closeAddPaymentDialog" plain>Cancel</el-button>
          <el-button type="primary" @click="saveOrUpdatePaymentMethod" :loading="isSavingPaymentMethod">{{ editMode ? 'Update Method' : 'Add Method' }}</el-button>
        </template>
      </el-dialog>
  
      <footerC />
    </div>
  </template>
  
  <script>
  import KolshyStyleHeader from '@/components/Global/topBar';
  import footerC from '@/components/Global/footer';
  import { useStoreApp } from '../../../stores/app';
  import axios from 'axios';
  import { ElMessage } from 'element-plus';
  
  export default {
    name: 'YourPayments',
    components: { KolshyStyleHeader, footerC },
    data() {
      return {
        api: useStoreApp(),
        paymentMethods: [],
        transactions: [],
        loading: true,
        addPaymentDialogVisible: false,
        editMode: false,
        currentEditMethodId: null,
        paymentForm: {
          card_type: '',
          card_number: '',
          last_four: '', // سيتم استخراجه من card_number
          expiry_date: '',
          card_holder_name: '',
        },
        isSavingPaymentMethod: false,
  
        // Mock Data
        mockPaymentMethods: [
          { id: 1, card_type: 'Visa', last_four: '1234', expiry_date: '12/25', card_holder_name: 'Ahmed Yassine' },
          { id: 2, card_type: 'MasterCard', last_four: '5678', expiry_date: '08/24', card_holder_name: 'Ahmed Yassine' },
        ],
        mockTransactions: [
          { id: 1, date: '2024-06-15', description: 'Order #123-4567890', amount: 150.75, status: 'Completed' },
          { id: 2, date: '2024-06-10', description: 'Order #987-6543210', amount: 50.00, status: 'Completed' },
          { id: 3, date: '2024-06-05', description: 'Subscription Renewal', amount: 9.99, status: 'Completed' },
          { id: 4, date: '2024-05-20', description: 'Order #111-2223334', amount: 320.00, status: 'Completed' },
        ],
      };
    },
    methods: {
      getCardIcon(cardType) {
        switch (cardType.toLowerCase()) {
          case 'visa': return 'bi bi-credit-card-2-front-fill'; // Bootstrap Icons
          case 'mastercard': return 'bi bi-credit-card-fill';
          case 'amex': return 'bi bi-credit-card-fill'; // لا يوجد أيقونة مخصصة لـ Amex في Bootstrap Icons
          case 'discover': return 'bi bi-credit-card-fill';
          default: return 'bi bi-credit-card';
        }
      },
      formatCurrency(amount) {
        if (typeof amount !== 'number') return 'N/A';
        return `$${amount.toFixed(2)}`;
      },
  
      openAddPaymentDialog() {
        this.editMode = false;
        this.currentEditMethodId = null;
        this.paymentForm = { card_type: '', card_number: '', last_four: '', expiry_date: '', card_holder_name: '' };
        if (this.$refs.paymentFormRef) {
          this.$refs.paymentFormRef.resetFields();
        }
        this.addPaymentDialogVisible = true;
      },
      closeAddPaymentDialog() {
        this.addPaymentDialogVisible = false;
      },
      editPaymentMethod(method) {
        this.editMode = true;
        this.currentEditMethodId = method.id;
        // Note: Full card number is usually not returned by API for security.
        // For mock, we'll just copy last_four. In real app, you'd only send new full number.
        this.paymentForm = { ...method, card_number: '' }; // Clear sensitive info
        this.addPaymentDialogVisible = true;
      },
      saveOrUpdatePaymentMethod() {
        this.$refs.paymentFormRef.validate(async (valid) => {
          if (valid) {
            this.isSavingPaymentMethod = true;
            this.paymentForm.last_four = this.paymentForm.card_number.slice(-4); // Get last 4 digits
  
            try {
              const token = localStorage.getItem('tokenkolshy');
              if (this.editMode) {
                // API call for update: PUT or POST to specific endpoint
                // await axios.put(`${this.api.baseUrl}${this.api.endPoint.customer.payments.update_method}/${this.currentEditMethodId}`, this.paymentForm, { headers: { Authorization: `Bearer ${token}` } });
                
                // Mock Update
                await new Promise(resolve => setTimeout(resolve, 500));
                const index = this.mockPaymentMethods.findIndex(m => m.id === this.currentEditMethodId);
                if (index !== -1) {
                  this.mockPaymentMethods[index] = { ...this.paymentForm, id: this.currentEditMethodId };
                }
                ElMessage.success('Payment method updated successfully! (Mock)');
              } else {
                // API call for add: POST
                // await axios.post(this.api.baseUrl + this.api.endPoint.customer.payments.add_method, this.paymentForm, { headers: { Authorization: `Bearer ${token}` } });
                
                // Mock Add
                await new Promise(resolve => setTimeout(resolve, 500));
                this.mockPaymentMethods.push({ ...this.paymentForm, id: Date.now() });
                ElMessage.success('Payment method added successfully! (Mock)');
              }
              this.addPaymentDialogVisible = false;
              this.fetchPaymentMethods(); // Refresh list
            } catch (e) {
              ElMessage.error('Failed to save payment method. (Mock Error)');
              console.error(e);
            } finally {
              this.isSavingPaymentMethod = false;
            }
          }
        });
      },
      async removePaymentMethod(id) {
        if (!confirm('Are you sure you want to remove this payment method?')) {
          return;
        }
        try {
          const token = localStorage.getItem('tokenkolshy');
          // API call to remove method: DELETE
          // await axios.delete(`${this.api.baseUrl}${this.api.endPoint.customer.payments.delete_method}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
          
          // Mock Remove
          await new Promise(resolve => setTimeout(resolve, 300));
          this.mockPaymentMethods = this.mockPaymentMethods.filter(m => m.id !== id);
          ElMessage.success('Payment method removed successfully! (Mock)');
          this.fetchPaymentMethods(); // Refresh list
        } catch (e) {
          ElMessage.error('Failed to remove payment method. (Mock Error)');
          console.error(e);
        }
      },
  
      async fetchPaymentMethods() {
        this.loading = true; // Use a general loading state if needed
        try {
          const token = localStorage.getItem('tokenkolshy');
          // API call to get payment methods
          // const response = await axios.get(this.api.baseUrl + this.api.endPoint.customer.payments.get_methods, { headers: { Authorization: `Bearer ${token}` } });
          // this.paymentMethods = response.data.data;
          
          // Mock Data
          await new Promise(resolve => setTimeout(resolve, 700));
          this.paymentMethods = [...this.mockPaymentMethods]; // Deep copy to allow mock changes
          ElMessage.success('Payment methods loaded! (Mock)');
        } catch (e) {
          ElMessage.error('Failed to load payment methods. Displaying mock data.');
          console.error(e);
          this.paymentMethods = [...this.mockPaymentMethods];
        } finally {
          this.loading = false;
        }
      },
  
      async fetchTransactions() {
        try {
          const token = localStorage.getItem('tokenkolshy');
          // API call to get transactions
          // const response = await axios.get(this.api.baseUrl + this.api.endPoint.customer.payments.get_transactions, { headers: { Authorization: `Bearer ${token}` } });
          // this.transactions = response.data.data;
          
          // Mock Data
          await new Promise(resolve => setTimeout(resolve, 600));
          this.transactions = [...this.mockTransactions];
          ElMessage.success('Transactions loaded! (Mock)');
        } catch (e) {
          ElMessage.error('Failed to load transactions. Displaying mock data.');
          console.error(e);
          this.transactions = [...this.mockTransactions];
        }
      }
    },
    mounted() {
      this.fetchPaymentMethods();
      this.fetchTransactions();
    }
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

.customer-payments-page {
  background: #eaeded; /* خلفية رمادية فاتحة للصفحة بالكامل */
  min-height: 100vh;
}
.payments-main-container {
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

.payments-grid {
  /* El-col handles the layout based on :xs, :sm, :md */
}

.payments-card {
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.section-header {
  font-size: 1.2rem;
  font-weight: bold;
  color: #141414;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.section-header i {
  color: #e51748; /* لون أيقونة العنوان بلونك الأحمر */
  font-size: 1.4rem;
}

/* Empty State Block */
.empty-state-block {
  text-align: center;
  padding: 30px 0;
}
.empty-state-block .empty-icon {
  font-size: 3rem;
  color: #bfbfbf;
  margin-bottom: 15px;
}
.empty-state-block p {
  color: #888;
  font-size: 0.95rem;
  margin-bottom: 20px;
}
.empty-state-block .el-button--primary,
.empty-state-block .el-button--info {
  background-color: #e51748;
  border-color: #e51748;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
}
.empty-state-block .el-button--primary:hover,
.empty-state-block .el-button--info:hover {
  background-color: #ca2e52;
  border-color: #ca2e52;
}

/* Payment Methods List */
.payment-methods-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.payment-method-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 15px;
  background-color: #fdfdfd;
}
.method-details {
  display: flex;
  align-items: center;
  gap: 15px;
}
.method-icon {
  font-size: 2.2rem;
  color: #007185; /* لون أزرق لأيقونات البطاقات */
}
.method-info {
  display: flex;
  flex-direction: column;
}
.method-name {
  font-weight: bold;
  color: #141414;
  font-size: 1rem;
}
.method-expiry {
  font-size: 0.85rem;
  color: #777;
}
.method-actions .el-button--text {
  color: #007185;
  font-weight: 500;
  transition: color 0.2s ease;
}
.method-actions .el-button--text:hover {
  color: #c45500;
}
.add-new-method-btn {
  color: #007185 !important;
  font-weight: bold !important;
  margin-top: 10px;
}
.add-new-method-btn:hover {
  color: #c45500 !important;
  text-decoration: underline;
}
.add-new-method-btn i {
  font-size: 1.2em;
}

/* Transactions List Table */
.transactions-list .el-table {
  font-size: 0.9rem;
  color: #333;
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
}
.transactions-list .el-table th {
  background-color: #f8f8f8;
  color: #555;
  font-weight: bold;
  padding: 12px 10px;
}
.transactions-list .el-table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.transactions-list .el-table__row:last-child td {
  border-bottom: none;
}

/* Add/Edit Payment Method Dialog */
.add-payment-dialog .el-dialog__header {
  background-color: #000336;
  color: #fff;
  padding: 15px 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.add-payment-dialog .el-dialog__title {
  color: #fff;
  font-weight: bold;
}
.add-payment-dialog .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}
.add-payment-dialog .el-dialog__body {
  padding: 20px;
}
.add-payment-dialog .el-form-item {
  margin-bottom: 20px;
}
.add-payment-dialog .el-form-item__label {
  font-weight: bold;
  color: #555;
}
.add-payment-dialog .el-input__inner,
.add-payment-dialog .el-select .el-input__inner {
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 0 12px;
  height: 40px;
}
.add-payment-dialog .el-input__inner:focus,
.add-payment-dialog .el-select .el-input__inner:focus {
  border-color: #e51748;
  box-shadow: 0 0 0 2px rgba(229, 23, 66, 0.2);
}
.add-payment-dialog .el-dialog__footer {
  text-align: right;
  padding: 15px 20px;
  border-top: 1px solid #eee;
}
.add-payment-dialog .el-button {
  font-weight: bold;
  border-radius: 4px;
}
.add-payment-dialog .el-button--plain {
  color: #555;
  border-color: #ddd;
}
.add-payment-dialog .el-button--plain:hover {
  color: #e51748;
  border-color: #e51748;
  background-color: #f8f8f8;
}
.add-payment-dialog .el-button--primary {
  background-color: #e51748;
  border-color: #e51748;
  color: #fff;
}
.add-payment-dialog .el-button--primary:hover {
  background-color: #ca2e52;
  border-color: #ca2e52;
}


/* Responsive Styles */
@media (max-width: 991px) {
  .payments-main-container {
    padding: 0 10px;
  }
  .page-title {
    font-size: 24px;
    margin-bottom: 25px;
    padding-bottom: 12px;
  }
  .payments-grid .el-col {
    /* El-col handles responsive column stacking */
  }
  .payments-card {
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
  .payment-method-item {
    flex-direction: column; /* ترتيب العناصر عمودياً */
    align-items: flex-start;
    gap: 10px;
  }
  .method-details {
    width: 100%;
    justify-content: flex-start;
  }
  .method-actions {
    width: 100%;
    justify-content: flex-end; /* تحريك الأزرار لليمين */
  }
  .transactions-list .el-table th,
  .transactions-list .el-table td {
    padding: 8px 5px; /* حشوة أقل للجدول */
  }
  .transactions-list .el-table th:first-child,
  .transactions-list .el-table td:first-child {
    padding-left: 10px; /* حشوة يسارية للعمود الأول */
  }
  .transactions-list .el-table th:last-child,
  .transactions-list .el-table td:last-child {
    padding-right: 10px; /* حشوة يمينية للعمود الأخير */
  }
}

@media (max-width: 767px) {
  .payments-main-container {
    padding: 0;
    margin: 20px auto;
  }
  .page-title {
    font-size: 22px;
    margin-bottom: 20px;
    text-align: center;
    border-bottom: none;
  }
  .payments-grid .el-col {
    padding: 0 15px !important; /* إضافة حشوة جانبية للأعمدة على الجوال */
  }
  .payments-card {
    margin-bottom: 15px;
    border-radius: 0;
    box-shadow: none;
    padding: 15px;
  }
  .empty-state-block {
    padding: 20px 0;
  }
  .payment-method-item {
    padding: 10px;
  }
  .add-payment-dialog .el-dialog {
    width: 95% !important;
  }
  .add-payment-dialog .el-dialog__header,
  .add-payment-dialog .el-dialog__footer {
    padding: 12px 15px;
  }
  .add-payment-dialog .el-form-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .add-payment-dialog .el-form-item__label {
    width: 100% !important;
    text-align: left !important;
    margin-bottom: 5px;
  }
  /* Ensure El-select is also full width on mobile if needed */
  .add-payment-dialog .el-select {
    width: 100%;
  }
}
</style>