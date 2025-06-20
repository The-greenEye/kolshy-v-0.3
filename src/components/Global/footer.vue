<template>
  <section class="kolshy-footer-section">
    <div class="footer-back-to-top" @click="scrollToTop">
      <b>Back to top</b>
      <span class="mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024">
          <path fill="#E51742" d="M572.235 205.282v600.365a30.118 30.118 0 1 1-60.235 0V205.282L292.382 438.633a28.913 28.913 0 0 1-42.646 0a33.43 33.43 0 0 1 0-45.236l271.058-288.045a28.913 28.913 0 0 1 42.647 0L834.5 393.397a33.43 33.43 0 0 1 0 45.176a28.913 28.913 0 0 1-42.647 0l-219.618-233.23z" />
        </svg>
      </span>
    </div>

    <v-footer class="main-footer-content w-100 position-relative">
      <div class="container main-footer-container">
        <div class="row footer-links-row">
          <div class="col-lg-3 col-md-6 col-12 footer-col">
            <b>Get To Know Us</b>
            <ul class="list-unstyled">
              <li><router-link to="/" class="footer-link">About Kolshy</router-link></li>
              <li><router-link to="/" class="footer-link">Careers</router-link></li>
              <li><router-link to="/" class="footer-link">Kolshy Sense</router-link></li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-6 col-12 footer-col">
            <b>Shop With Us</b>
            <ul class="list-unstyled">
              <li><router-link to="/setting" class="footer-link">Your Account</router-link></li>
              <li><router-link to="/vendor_orders" class="footer-link">Your Orders</router-link></li>
              <li><router-link to="/setting/addresses" class="footer-link">Your Addresses</router-link></li>
              <li><router-link to="/" class="footer-link">Your Lists</router-link></li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-6 col-12 footer-col">
            <b>Make Money With Us</b>
            <ul class="list-unstyled">
              <li><router-link to="/register_seller" class="footer-link">Protect and build your brand</router-link></li>
              <li><router-link to="/register_seller" class="footer-link">Sell on Kolshy</router-link></li>
              <li><router-link to="/vendor_dashboard" class="footer-link">Fulfillment by Kolshy</router-link></li>
              <li><router-link to="/vendor_product" class="footer-link">Advertise Your Products</router-link></li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-6 col-12 footer-col">
            <b>Let Us Help You</b>
            <ul class="list-unstyled">
              <li><router-link to="/customer-service" class="footer-link">Help</router-link></li>
              <li><router-link to="/" class="footer-link">Shipping & Delivery</router-link></li>
              <li><router-link to="/" class="footer-link">Returns & Replacements</router-link></li>
              <li><router-link to="/" class="footer-link">Recalls and Product Safety Alerts</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </v-footer>

    <div class="footer-bottom-section">
      <div class="container footer-bottom-container">
        <div class="footer-logo-lang-wrap">
          <img src="https://kolshy.ae/wp-content/uploads/2025/02/Untitled-3000-x-750-px.gif" class="img-fluid footer-logo" alt="Kolshy Logo" />
          <div class="language-selector">
            <v-btn class="lang-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                <mask id="circleFlagsEg0"><circle cx="256" cy="256" r="256" fill="#fff" /></mask>
                <g mask="url(#circleFlagsEg0)">
                  <path fill="#eee" d="m0 144l256-32l256 32v224l-256 32L0 368Z" />
                  <path fill="#d80027" d="M0 0h512v144H0Z" />
                  <path fill="#333" d="M0 368h512v144H0Z" />
                  <path fill="#ff9811" d="M250 191c-8 0-17 4-22 14c5-3 16-1 16 13c0 4-2 8-5 10c-8 0-14-14-29-14c-10 0-19 7-19 17v69l46-7l-14 27h66l-14-27l46 7v-69c0-10-9-17-19-17c-15 0-21 14-29 14c8-23-7-37-23-37" />
                </g>
              </svg>
              Ar
            </v-btn>
            <v-btn class="lang-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                <mask id="circleFlagsGbEng0"><circle cx="256" cy="256" r="256" fill="#fff" /></mask>
                <g mask="url(#circleFlagsGbEng0)">
                  <path fill="#eee" d="M0 0h208l48 32l48-32h208v208l-32 48l32 48v208H304l-48-32l-48 32H0V304l32-48l-32-48Z" />
                  <path fill="#d80027" d="M208 0v208H0v96h208v208h96V304h208v-96H304V0z" />
                </g>
              </svg>
              En
            </v-btn>
          </div>
        </div>
        <div class="footer-copyright">
          © Copyright {{ currentYear }}. All Rights Reserved.
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "footer", // Changed name from "footer" to "footerC" for consistency with parent component
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }
}
</script>

<style>
/* Global reset for box-sizing and font-family for overall consistency */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif; /* خط عام نظيف */
}

.kolshy-footer-section {
  background-color: #000336; /* اللون الأزرق الداكن للتذييل بأكمله */
  color: #fff; /* لون النص الافتراضي في التذييل */
}

/* Back to top section (شريط العودة للأعلى) */
.footer-back-to-top {
  width: 100%;
  text-align: center;
  padding: 15px 0; /* حشوة أكبر */
  background-color: #af176bc9; /* لون أزرق أغمق قليلاً من الشريط العلوي */
  color: #fff; /* نص أبيض */
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px; /* مسافة بين النص والأيقونة */
}
.footer-back-to-top:hover {
  background-color: #364759; /* لون أغمق عند التمرير */
}
.footer-back-to-top svg path {
  fill: #fff; /* لجعل أيقونة السهم بيضاء */
}

/* Main Footer Content - Section 1 (القسم الرئيسي للروابط) */
.main-footer-content {
  background-color: #000336; /* لونك الأزرق الداكن */
  padding: 40px 0; /* حشوة كبيرة */
  border-bottom: 1px solid #3a4553; /* خط فاصل خفيف */
  color: #fff; /* لون النص الافتراضي */
}

.main-footer-container {
  max-width: 1200px; /* عرض أقصى للمحتوى */
  margin: 0 auto;
  padding: 0 15px; /* حشوة جانبية */
}

.footer-links-row {
  display: flex;
  flex-wrap: wrap; /* للسماح للعناصر بالانتقال لسطر جديد */
  justify-content: space-between; /* توزيع الأعمدة */
}

.footer-col {
  padding: 15px; /* حشوة داخلية للأعمدة */
  margin-bottom: 20px; /* مسافة بين الأعمدة في الشاشات الصغيرة */
}

.footer-col b {
  display: block; /* لجعل العنوان يأخذ سطرًا كاملاً */
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #fff; /* عناوين الأقسام بيضاء */
}

.footer-col .list-unstyled {
  list-style: none; /* إزالة نقاط القائمة */
  padding: 0;
  margin: 0;
}

.footer-col .footer-link {
  color: #ccc; /* لون رمادي فاتح للروابط */
  text-decoration: none;
  font-size: 14px;
  line-height: 2; /* تباعد الأسطر */
  display: block; /* لجعل الرابط يأخذ سطرًا كاملاً */
  transition: color 0.2s ease;
}
.footer-col .footer-link:hover {
  color: #e51742; /* لونك الأحمر عند التمرير */
  text-decoration: underline; /* تسطير عند التمرير */
}

/* Footer Bottom - Logo, Language & Copyright (الطبقة السفلية) */
.footer-bottom-section {
  background-color: #000336; /* لونك الأزرق الداكن */
  padding: 30px 0; /* حشوة */
  color: #fff;
}

.footer-bottom-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  text-align: center;
}

.footer-logo-lang-wrap {
  display: flex;
  flex-direction: column; /* لترتيب الشعار ومحدد اللغة عموديًا */
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  padding-bottom: 20px; /* مسافة قبل حقوق النشر */
  border-bottom: 1px solid #3a4553; /* خط فاصل */
}

.footer-logo {
  height: 45px; /* حجم أكبر للشعار في التذييل */
  object-fit: contain;
  margin-bottom: 15px;
}
/* لا تغيير filter لجعل الشعار أبيض، لأنه يجب أن يكون ملونًا كما في الصورة التي أرسلتها (لوجو أمازون في التذييل يكون أبيض) */
/* إذا كان شعارك الأصلي ملونًا وتريد أن يظهر أبيض في التذييل، أضف هذا: */
/* filter: brightness(0) invert(1); */


.language-selector {
  display: flex;
  gap: 10px; /* مسافة بين أزرار اللغة */
}

.lang-btn {
  /* Vuetify button styles. يجب التأكد من عدم وجود تعارض. */
  background-color: transparent !important; /* خلفية شفافة */
  border: 1px solid #888 !important; /* حدود رمادية */
  color: #fff !important; /* نص أبيض */
  padding: 8px 12px !important;
  font-weight: 600 !important;
  border-radius: 4px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 5px; /* مسافة بين الأيقونة والنص */
  transition: background-color 0.2s ease, border-color 0.2s ease;
  box-shadow: none !important; /* إزالة الظل الافتراضي من Vuetify */
}
.lang-btn:hover {
  background-color: rgba(255, 255, 255, 0.1) !important; /* خلفية شفافة أفتح عند التمرير */
  border-color: #fff !important; /* حدود بيضاء عند التمرير */
}
.lang-btn svg {
  width: 20px;
  height: 20px;
}
.lang-btn svg path {
  fill: currentColor; /* لجعل لون الأيقونات يتبع لون النص */
}

.footer-copyright {
  font-size: 13px;
  color: #ccc; /* نص رمادي فاتح */
  margin-top: 20px; /* مسافة من القسم العلوي */
}

/* Responsive Styles */
@media (max-width: 991px) { /* Medium devices (tablets) */
  .footer-links-row {
    justify-content: space-around; /* توزيع الأعمدة بشكل أفضل */
  }
  .footer-col {
    flex: 0 0 45%; /* عمودين في الصف */
    max-width: 45%;
    text-align: center; /* توسيط النص في الأعمدة */
  }
  .footer-col b, .footer-col .list-unstyled {
    align-items: center; /* توسيط المحتوى في أعمدة الروابط */
  }
  .footer-col .footer-link {
    text-align: center;
  }
}

@media (max-width: 767px) { /* Small devices (mobile phones) */
  .main-footer-content {
    padding: 30px 0;
  }
  .footer-links-row {
    flex-direction: column; /* عمود واحد في الصف */
    align-items: center; /* توسيط الأعمدة */
  }
  .footer-col {
    flex: 0 0 100%;
    max-width: 100%;
    padding: 10px 0;
    text-align: center; /* التأكيد على توسيط النص */
  }
  .footer-col b {
    margin-bottom: 10px;
  }
  .footer-col .footer-link {
    line-height: 1.8;
  }
  .footer-logo-lang-wrap {
    flex-direction: column; /* الشعار واختيار اللغة عمودياً */
    gap: 15px;
    padding-bottom: 15px;
  }
  .footer-logo {
    height: 40px;
    margin-bottom: 10px;
  }
  .language-selector {
    flex-wrap: wrap; /* تسمح للأزرار بالانتقال لسطر جديد إذا كانت كثيرة */
    justify-content: center;
  }
  .footer-copyright {
    margin-top: 15px;
  }
}
</style>