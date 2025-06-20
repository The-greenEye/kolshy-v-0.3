<template>
    <div class="customer-messages-page">
      <KolshyStyleHeader />
      <div class="messages-main-container">
        <h2 class="page-title">Your Messages</h2>
  
        <div v-if="loading" class="loading-state">
          <el-spinner size="large"></el-spinner>
          <p>Loading your messages...</p>
        </div>
  
        <div v-else-if="messages.length === 0" class="empty-messages-state">
          <i class="bi bi-chat-dots empty-icon"></i>
          <h3>No messages found.</h3>
          <p>It looks like you don't have any messages yet. You can contact sellers regarding your orders here.</p>
          <el-button type="primary" size="default" @click="startNewMessage">Start a New Message</el-button>
        </div>
  
        <div v-else class="messages-list-card">
          <el-card class="messages-card">
            <div class="section-header">
              <i class="bi bi-inbox"></i> Inbox
            </div>
            <el-divider></el-divider>
            <div class="messages-list">
              <div v-for="message in messages" :key="message.id" class="message-item" @click="viewMessage(message.id)">
                <div class="message-header">
                  <span class="message-sender">{{ message.sender }}</span>
                  <span class="message-date">{{ formatMessageDate(message.date) }}</span>
                </div>
                <div class="message-subject">{{ message.subject }}</div>
                <div class="message-snippet">{{ message.body.substring(0, 100) }}...</div>
              </div>
            </div>
            <el-button type="primary" size="default" class="send-new-message-btn" @click="startNewMessage">
              <i class="bi bi-plus-circle me-2"></i> Compose New Message
            </el-button>
          </el-card>
        </div>
      </div>
      <footerC />
    </div>
  </template>
  
  <script>
  import KolshyStyleHeader from '@/components/Global/topBar';
  import footerC from '@/components/Global/footer';
  import { useStoreApp } from '../../../stores/app'; // تأكد من المسار الصحيح لـ useStoreApp
  import axios from 'axios';
  import { ElMessage } from 'element-plus';
  
  export default {
    name: 'YourMessages',
    components: { KolshyStyleHeader, footerC },
    data() {
      return {
        api: useStoreApp(),
        messages: [],
        loading: true,
        // بيانات وهمية للرسائل
        mockMessages: [
          {
            id: 1,
            sender: 'Seller: TechGadget Co.',
            subject: 'Your order #123-4567890 has been shipped',
            body: 'Hello! We are happy to inform you that your order with ID 123-4567890 for Wireless Headphones X1 has been shipped. You can track your package using the link provided in your order details. Thank you for your purchase!',
            date: '2024-06-18T10:00:00Z',
          },
          {
            id: 2,
            sender: 'Kolshy Customer Service',
            subject: 'Regarding your recent inquiry about returns',
            body: 'Dear Customer, we received your inquiry regarding returns. Please visit our returns policy page or contact us directly at support@kolshy.com for assistance. We aim to respond within 24 hours.',
            date: '2024-06-16T15:30:00Z',
          },
          {
            id: 3,
            sender: 'Seller: OfficeSolutions',
            subject: 'Special offer for you!',
            body: 'Hi, we have a special limited-time offer on ergonomic office chairs. As a valued customer, you can get 20% off your next purchase. Use code OFFICE20 at checkout!',
            date: '2024-06-10T09:00:00Z',
          },
        ],
      };
    },
    methods: {
      async fetchMessages() {
        this.loading = true;
        try {
          const token = localStorage.getItem('tokenkolshy');
          // هنا سيكون استدعاء الـ API الحقيقي لجلب الرسائل
          // const response = await axios.get(this.api.baseUrl + this.api.endPoint.customer.messages.get_all, {
          //   headers: { Authorization: `Bearer ${token}` }
          // });
          // if (response.data && response.data.data) {
          //   this.messages = response.data.data;
          //   ElMessage.success('Messages loaded successfully!');
          // }
  
          // Mock data loading simulation
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
          this.messages = this.mockMessages;
          ElMessage.success('Messages loaded successfully! (Mock Data)');
  
        } catch (e) {
          console.error('Error fetching messages:', e);
          ElMessage.error('Failed to load messages. Displaying mock data.');
          this.messages = this.mockMessages; // Fallback to mock data
        } finally {
          this.loading = false;
        }
      },
      formatMessageDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        const today = new Date();
        if (date.toDateString() === today.toDateString()) {
          return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // 10:30 AM
        } else if (date.getFullYear() === today.getFullYear()) {
          return date.toLocaleDateString([], { month: 'short', day: 'numeric' }); // Jun 18
        } else {
          return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' }); // Jun 18, 2024
        }
      },
      viewMessage(messageId) {
        // هنا يمكنك التوجيه لصفحة تفاصيل الرسالة أو فتح نافذة منبثقة لعرض الرسالة كاملة
        ElMessage.info(`Viewing message with ID: ${messageId}`);
        console.log('Navigate to message details page or open a modal');
        // router.push(`/messages/${messageId}`); // إذا كان لديك مسار لصفحة تفاصيل الرسالة
      },
      startNewMessage() {
        ElMessage.info('Starting a new message / Composing new email.');
        console.log('Navigate to compose message page or open a compose modal');
        // router.push('/messages/compose'); // إذا كان لديك مسار لصفحة إنشاء رسالة جديدة
      }
    },
    mounted() {
      this.fetchMessages();
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

.customer-messages-page {
  background: #eaeded; /* خلفية رمادية فاتحة للصفحة بالكامل */
  min-height: 100vh;
}
.messages-main-container {
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

/* Loading State */
.loading-state {
  text-align: center;
  padding: 50px 0;
  color: #555;
  font-size: 1.1rem;
}

/* Empty Messages State */
.empty-messages-state {
  text-align: center;
  padding: 50px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  margin-top: 30px;
}
.empty-messages-state .empty-icon {
  font-size: 4rem;
  color: #bfbfbf;
  margin-bottom: 20px;
}
.empty-messages-state h3 {
  font-size: 1.8rem;
  color: #141414;
  margin-bottom: 15px;
}
.empty-messages-state p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.empty-messages-state .el-button--primary {
  background-color: #e51748;
  border-color: #e51748;
  font-weight: bold;
  padding: 12px 30px;
  border-radius: 5px;
  font-size: 1rem;
}
.empty-messages-state .el-button--primary:hover {
  background-color: #ca2e52;
  border-color: #ca2e52;
}

/* Messages List Card */
.messages-list-card .messages-card {
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.messages-list-card .section-header {
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
.messages-list-card .section-header i {
  color: #e51748;
  font-size: 1.4rem;
}

.messages-list {
  display: flex;
  flex-direction: column;
  border: 1px solid #eee; /* حدود حول قائمة الرسائل */
  border-radius: 6px;
  overflow: hidden; /* لضمان تطبيق border-radius */
  margin-bottom: 20px;
}

.message-item {
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.message-item:last-child {
  border-bottom: none; /* إزالة الخط الفاصل للعنصر الأخير */
}
.message-item:hover {
  background-color: #f8f8f8; /* خلفية خفيفة عند التمرير */
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}
.message-sender {
  font-weight: bold;
  color: #141414;
  font-size: 1rem;
}
.message-date {
  font-size: 0.85rem;
  color: #777;
}
.message-subject {
  font-weight: 600;
  color: #007185; /* أزرق لموضوع الرسالة */
  font-size: 0.95rem;
  margin-bottom: 5px;
}
.message-subject:hover {
  text-decoration: underline;
}
.message-snippet {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* يمنع التفاف النص */
}

.send-new-message-btn {
  background-color: #e51748 !important; /* لونك الأحمر */
  border-color: #e51748 !important;
  color: #fff !important;
  font-weight: bold;
  padding: 10px 20px !important;
  border-radius: 5px !important;
  font-size: 1rem !important;
  width: auto; /* يجعل الزر بعرض المحتوى */
}
.send-new-message-btn:hover {
  background-color: #ca2e52 !important;
  border-color: #ca2e52 !important;
}
.send-new-message-btn i {
  font-size: 1.2em;
}

/* Responsive Styles */
@media (max-width: 991px) {
  .messages-main-container {
    padding: 0 10px;
  }
  .page-title {
    font-size: 24px;
    margin-bottom: 25px;
    padding-bottom: 12px;
  }
  .messages-list-card .messages-card {
    padding: 15px;
  }
  .messages-list-card .section-header {
    font-size: 1.1rem;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }
  .messages-list-card .section-header i {
    font-size: 1.2rem;
  }
  .message-item {
    padding: 12px 15px;
  }
  .message-sender {
    font-size: 0.95rem;
  }
  .message-date {
    font-size: 0.8rem;
  }
  .message-subject {
    font-size: 0.9rem;
  }
  .message-snippet {
    font-size: 0.85rem;
  }
}

@media (max-width: 767px) {
  .messages-main-container {
    padding: 0;
    margin: 20px auto;
  }
  .page-title {
    font-size: 22px;
    margin-bottom: 20px;
    text-align: center;
    border-bottom: none;
  }
  .messages-list-card .messages-card {
    border-radius: 0;
    box-shadow: none;
    padding: 15px;
  }
  .messages-list-card .section-header {
    text-align: center;
    justify-content: center;
  }
  .message-item {
    flex-direction: column; /* ترتيب العناصر عمودياً */
    align-items: flex-start; /* محاذاة لليسار */
    padding: 10px 15px;
  }
  .message-header {
    flex-direction: column-reverse; /* لجعل التاريخ يظهر قبل المرسل على الجوال */
    align-items: flex-start;
    width: 100%;
    margin-bottom: 8px;
  }
  .message-sender {
    font-size: 0.9rem;
    width: 100%;
  }
  .message-date {
    font-size: 0.75rem;
    margin-bottom: 5px;
    width: 100%;
  }
  .message-subject {
    font-size: 0.85rem;
    width: 100%;
    white-space: normal; /* السماح بالتفاف النص */
    overflow: visible;
    text-overflow: clip;
  }
  .message-snippet {
    font-size: 0.8rem;
    width: 100%;
    white-space: normal; /* السماح بالتفاف النص */
    overflow: visible;
    text-overflow: clip;
    -webkit-line-clamp: 3; /* عرض 3 أسطر كحد أقصى */
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .send-new-message-btn {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    display: block; /* لضمان أخذ العرض الكامل */
  }
}
  </style>