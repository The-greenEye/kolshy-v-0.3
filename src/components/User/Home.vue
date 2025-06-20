<template>
  <div class="home-component-wrapper">
    <div class="main-slider-section d-lg-block d-none">
      <el-carousel :interval="4000" type="card" height="500px"> <el-carousel-item v-for="(slide, index) in sliderHome" :key="index">
          <img :src="slide.image" class="d-block w-100 slider-img" alt="Slider" />
        </el-carousel-item>
      </el-carousel>
      </div>

    <div class="service-blocks-container d-lg-flex d-none">
      <div v-for="(serv, index) in servise" :key="index" class="service-block">
        <i :class="serv.icon" class="service-icon"></i>
        <div class="service-text-content">
          <h5 class="service-title">{{ serv.text }}</h5>
          <p class="service-description">{{ serv.subText }}</p>
        </div>
      </div>
    </div>

    <div class="product-blocks-grid">
      <div v-for="(block, blockIndex) in productHome[0].block_title" :key="blockIndex" class="product-block-card">
        <h4 class="block-title">{{ block.title }}</h4>
        <div class="block-items-grid">
          <div v-for="(img, index) in block.items[0].image" :key="index" class="block-item">
            <img :src="img" class="block-item-img" alt="Product" />
            <p class="block-item-text">{{ block.items[0].text[index] }}</p>
            <p class="block-item-price">$29<sub class="block-item-old-price">$36</sub></p>
          </div>
          <router-link to="/shop" class="block-shop-link" v-if="block.items[0].image.length === 1">Shop Now Kolshy Store</router-link>
        </div>
      </div>
    </div>

    <div class="horizontal-carousel-section d-lg-flex d-none">
      <h3 class="carousel-section-title">Must Sales Today</h3>
      <div class="products-horizontal-carousel">
        <div v-for="(sale, index) in mustSales" :key="index" class="carousel-product-card">
          <el-image :src="sale.image" class="carousel-product-img" fit="cover" />
          <div class="carousel-product-info">
            <p class="carousel-product-title">{{ sale.title }}</p>
            <p class="carousel-product-description">{{ sale.description.slice(0, 30) }}...</p>
            <div class="carousel-product-price-wrap">
              <span class="carousel-product-new-price">${{ sale.newPrice }}</span>
              <span class="carousel-product-old-price">${{ sale.oldPrice }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="large-promo-banner d-lg-block d-none">
      <img src="https://i.pinimg.com/736x/bd/ae/85/bdae85ae6a435aa664878b321214f320.jpg" class="img-fluid" alt="Promotional Banner" />
    </div>

    <div class="explore-categories-section">
      <h3 class="categories-section-title">Explore Categories</h3>
      <div class="categories-grid">
        <div v-for="(cat, n) in categories" :key="n" class="category-card">
          <p class="category-title">{{ cat.text }}</p>
          <img :src="cat.image" class="category-img img-fluid" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Home",
  data() {
    return {
      showDec: ref(false),
      sliderHome: [
        { image: "https://i.pinimg.com/736x/b9/dc/03/b9dc032fef51b3d8d0fedbf4bfc1cb2f.jpg" },
        { image: "https://i.pinimg.com/originals/a5/43/0d/a5430d131e591c8ac612d13e7b9556f8.gif" },
        { image: "https://i.pinimg.com/736x/06/aa/f4/06aaf4b866bb9f4db0c5eeef37bed7f1.jpg" }
      ],
      srcList: [
        "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
        "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
        "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
        "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg"
      ],
      productHome: [
        {
          block_title: [
            {
              title: "Business priced items you may like",
              items: [
                {
                  image: ["https://images-na.ssl-images-amazon.com/images/I/71NjfIf7q2L._AC_UL160_SR160,160_.jpg", "https://images-na.ssl-images-amazon.com/images/I/61ZKK9lcc+L._AC_UL160_SR160,160_.jpg", "https://images-na.ssl-images-amazon.com/images/I/71tmNOQi7NL._AC_UL160_SR160,160_.jpg", "https://images-na.ssl-images-amazon.com/images/I/81plf2nDq9L._AC_UL160_SR160,160_.jpg"],
                  text: ["NIBOSI Men Watch", "Gray Glass Panel", "Pickpiff Jewelry", "Gallery Glass Wall Art"],
                },
              ],
            },
            {
              title: "Up to 20% off business essentials",
              items: [
                {
                  image: ["https://m.media-amazon.com/images/G/01/AmazonBusiness/MarketingFY25/OnsiteEvents/Tier2/MDS/Onsite/US-EN_AB_MD25_P1_113_GW_Category_Card_Desktop_758X608_2X._CB796248953_.jpg", "https://m.media-amazon.com/images/I/81QpkIctqPL._AC_SX679_.jpg"],
                  text: ["Office Chairs Deluxe", "Ergonomic Keyboard Pro"],
                },
              ],
            },
            {
              title: "Trending electronics for your workspace",
              items: [
                {
                  image: ["https://i.pinimg.com/736x/78/82/6e/78826e700b8d11b924f6dbba16075a49.jpg", "https://i.pinimg.com/736x/33/a8/b5/33a8b581f5afd2dbeb56e309f9708389.jpg", "https://i.pinimg.com/736x/4e/3f/85/4e3f8579c50978674b6ee0a44024a71f.jpg"],
                  text: ["Noise Cancelling Headphones", "Smart Webcam HD", 'Portable Monitor 15.6"'],
                },
              ],
            },
            {
              title: "Up to 50% off business essentials",
              items: [
                {
                  image: ["https://m.media-amazon.com/images/G/01/AmazonBusiness/MarketingFY25/OnsiteEvents/Tier2/MDS/Onsite/US-EN_AB_MD25_P1_113_GW_Category_Card_Desktop_758X608_2X._CB796248953_.jpg"],
                  text: ["Office Chairs Deluxe"],
                },
              ],
            },
          ],
        },
      ],
      servise: [
        { icon: "bi bi-award", text: "Free Delivery", subText: "For all orders over $99" },
        { icon: "bi bi-arrow-clockwise", text: "90 Days Return", subText: "If goods have problems" },
        { icon: "bi bi-credit-card", text: "Secure Payment", subText: "100% secure payment" },
        { icon: "bi bi-chat-text", text: "24/7 Support", subText: "Dedicated support" },
        { icon: "bi bi-gift", text: "Gift Service", subText: "Support gift service" },
      ],
      mustSales: [
        {
          sale: true,
          image: "https://i.pinimg.com/736x/6d/4c/38/6d4c3873f1332e691e1fe56da3b980ca.jpg",
          title: "Samsung Galaxy S21",
          oldPrice: "899",
          newPrice: "749",
          description: "High-performance Android smartphone with triple camera.",
          rate: "4.5",
          solde: "150",
        },
        {
          sale: true,
          image: "https://i.pinimg.com/736x/f7/e0/03/f7e00329b723103ab6bdf2eaa85e9bff.jpg",
          title: "Apple iPhone 13",
          oldPrice: "999",
          newPrice: "849",
          description: "The latest iPhone with A15 chip and amazing battery life.",
          rate: "4.8",
          solde: "200",
        },
        {
          sale: true,
          image: "https://i.pinimg.com/736x/76/bf/62/76bf621e0a44ce3bdb132feafbea8a48.jpg",
          title: "Xiaomi Redmi Note 11",
          oldPrice: "299",
          newPrice: "249",
          description: "Affordable phone with great features and solid performance.",
          rate: "4.2",
          solde: "300",
        },
        {
          sale: true,
          image: "https://i.pinimg.com/736x/bd/ab/c4/bdabc47e32d0770253c1899894e30648.jpg",
          title: "OnePlus 10 Pro",
          oldPrice: "799",
          newPrice: "699",
          description: "Flagship killer with high refresh rate display and fast charging.",
          rate: "4.6",
          solde: "180",
        },
        {
          sale: true,
          image: "https://i.pinimg.com/736x/46/70/fe/4670fed6e60903e9c33baa25d1a804c9.jpg",
          title: "Google Pixel 6",
          oldPrice: "699",
          newPrice: "599",
          description: "Google’s clean Android experience with powerful AI features.",
          rate: "4.4",
          solde: "220",
        },
        {
          sale: true,
          image: "https://i.pinimg.com/736x/10/38/88/103888373306dab6bc32e412b7444591.jpg",
          title: "Realme GT Neo 3",
          oldPrice: "459",
          newPrice: "399",
          description: "Performance beast with Dimensity 8100 and fast charging.",
          rate: "4.3",
          solde: "170",
        },
      ],
      categories: [
        { text: "Official Product", image: "https://m.media-amazon.com/images/G/01/AmazonBusiness/CatTiles/2018New/OfficeProducts._CB459383234_.png" },
        { text: "Books", image: "https://m.media-amazon.com/images/G/01/AmazonBusiness/CatTiles/2018New/Books._CB459383261_.png" },
        { text: "Software", image: "https://m.media-amazon.com/images/G/01/AmazonBusiness/CatTiles/2018New/3software._CB443113980_.png" },
        { text: "Computers", image: "https://m.media-amazon.com/images/G/01/AmazonBusiness/CatTiles/2018New/3OfficeLaptop._CB443113981_.png" },
        { text: "Official Product", image: "https://m.media-amazon.com/images/G/01/AmazonBusiness/CatTiles/2018New/OfficeProducts._CB459383234_.png" },
        { text: "Books", image: "https://m.media-amazon.com/images/G/01/AmazonBusiness/CatTiles/2018New/Books._CB459383261_.png" },
        { text: "Software", image: "https://m.media-amazon.com/images/G/01/AmazonBusiness/CatTiles/2018New/3software._CB443113980_.png" },
        { text: "Computers", image: "https://m.media-amazon.com/images/G/01/AmazonBusiness/CatTiles/2018New/3OfficeLaptop._CB443113981_.png" },
      ],
    };
  },
  methods: {
    // scrollLeft() { /* el-carousel handles this internally */ },
    // scrollRight() { /* el-carousel handles this internally */ },
  },
};
</script>

<style>
/* Global styles for the entire home component wrapper */
.home-component-wrapper {
  background-color: #eaeded; /* خلفية رمادية فاتحة مثل أمازون */
  padding-bottom: 50px; /* حشوة سفلية لتوفير مساحة قبل الفوتر */
}

/* Main Slider Section */
.main-slider-section {
  position: relative;
  margin-bottom: -150px; /* سحب الأقسام التالية للأعلى لتتراكب مع السلايدر */
  z-index: 1; /* لضمان ظهور السلايدر فوق المحتوى الآخر قليلاً */
}
.main-slider-section .el-carousel {
  width: 100%;
}
.main-slider-section .slider-img {
  width: 100%;
  height: 500px; /* ارتفاع ثابت للسلايدر */
  object-fit: cover;
  /* El-Carousel handles responsiveness of images, but adjust height for mobile */
}

/* Service/Priority Blocks Section (أقسام الخدمات) */
.service-blocks-container {
  display: flex;
  justify-content: center; /* توسيط الكتل */
  flex-wrap: wrap; /* للسماح بالانتقال لسطر جديد */
  gap: 15px; /* مسافة بين الكتل */
  max-width: 1500px;
  margin: 0 auto 30px auto; /* توسيط مع مسافة سفلية */
  padding: 10px 15px;
  position: relative; /* لتحديد الموضع النسبي */
  z-index: 2; /* لضمان أنها فوق السلايدر */
}
.service-block {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 20px;
  display: flex;
  align-items: center;
  flex: 1; /* لتوزيع المساحة بالتساوي */
  min-width: 240px; /* عرض أدنى لكل كتلة */
  max-width: 300px; /* عرض أقصى */
  transition: box-shadow 0.2s ease;
}
.service-block:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.service-icon {
  font-size: 2.5rem; /* حجم كبير للأيقونات */
  color: #e51748; /* لونك الأحمر المميز */
  margin-right: 15px;
}
.service-text-content {
  flex-grow: 1;
}
.service-title {
  font-size: 16px;
  font-weight: bold;
  color: #141414;
  margin-bottom: 5px;
}
.service-description {
  font-size: 13px;
  color: #555;
  margin: 0;
}

/* Product Blocks Section (أقسام كروت المنتجات 4 في الصف) */
.product-blocks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* 4 أعمدة متجاوبة */
  gap: 20px; /* مسافة بين الكروت */
  max-width: 1500px;
  margin: 30px auto; /* مسافة علوية وسفلية */
  padding: 0 15px;
}
.product-block-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 380px; /* ارتفاع أدنى للبطاقة */
  transition: box-shadow 0.2s ease;
}
.product-block-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.block-title {
  font-size: 20px;
  font-weight: bold;
  color: #141414;
  margin-bottom: 15px;
}
.block-items-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2x2 grid for items inside */
  gap: 10px; /* مسافة بين المنتجات الصغيرة */
  flex-grow: 1; /* لتملأ المساحة المتاحة */
}
.block-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}
.block-item-img {
  width: 100%;
  height: 100px; /* ارتفاع ثابت للصور الصغيرة */
  object-fit: contain;
  margin-bottom: 5px;
}
/* For single image block, ensure it fills the space better */
.block-items-grid .block-item:only-child .block-item-img {
    height: 180px; /* ارتفاع أكبر للصور الفردية */
    object-fit: cover;
    margin-bottom: 15px;
}


.block-item-text {
  font-size: 13px;
  color: #555;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* يمنع التفاف النص */
  max-width: 100%; /* مهم لـ text-overflow */
}
.block-item-price {
  font-size: 18px;
  font-weight: bold;
  color: #141414;
  margin: 0;
  display: flex;
  align-items: baseline;
  gap: 5px;
}
.block-item-old-price {
  font-size: 13px;
  color: #888;
  text-decoration: line-through;
}
.block-shop-link {
  font-size: 14px;
  color: #007185; /* أزرق للروابط */
  text-decoration: none;
  font-weight: 500;
  margin-top: 15px;
  transition: color 0.2s ease;
}
.block-shop-link:hover {
  color: #c45500; /* برتقالي عند التمرير */
  text-decoration: underline;
}

/* Horizontal Product Carousel Section (Must Sales) */
.horizontal-carousel-section {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin: 30px auto;
  max-width: 1500px;
  display: flex;
  flex-direction: column; /* لترتيب العنوان ثم الشرائح */
}
.carousel-section-title {
  font-size: 24px;
  font-weight: bold;
  color: #141414;
  margin-bottom: 20px;
}
.products-horizontal-carousel {
  display: flex;
  overflow-x: auto; /* للسماح بالتمرير الأفقي */
  -webkit-overflow-scrolling: touch; /* لتحسين التمرير على الجوال */
  padding-bottom: 15px; /* حشوة سفلية لشريط التمرير */
  gap: 15px; /* مسافة بين البطاقات */
  scroll-snap-type: x mandatory; /* لجعل التمرير يتوقف عند بطاقات كاملة */
}
/* إخفاء شريط التمرير */
.products-horizontal-carousel::-webkit-scrollbar {
  height: 0;
}
.products-horizontal-carousel {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.carousel-product-card {
  flex: 0 0 auto; /* يمنع البطاقات من التقلص */
  width: 200px; /* عرض ثابت لكل بطاقة */
  scroll-snap-align: start; /* محاذاة البطاقات عند التمرير */
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #eee; /* حدود خفيفة */
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  padding: 10px;
  text-align: left;
  transition: box-shadow 0.2s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.carousel-product-card:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.carousel-product-img {
  width: 100%;
  height: 150px; /* ارتفاع ثابت للصورة */
  object-fit: contain; /* لتناسب الصورة داخل المساحة */
  margin-bottom: 10px;
}
.carousel-product-info {
  flex-grow: 1;
}
.carousel-product-title {
  font-size: 14px;
  font-weight: 600;
  color: #141414;
  margin-bottom: 5px;
  height: 40px; /* لتجنب تغير الارتفاع */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* عرض سطرين كحد أقصى */
  -webkit-box-orient: vertical;
}
.carousel-product-description {
  font-size: 12px;
  color: #777;
  margin-bottom: 10px;
}
.carousel-product-price-wrap {
  display: flex;
  align-items: baseline;
  gap: 5px;
}
.carousel-product-new-price {
  font-size: 16px;
  font-weight: bold;
  color: #b12704; /* أحمر سعر أمازون */
}
.carousel-product-old-price {
  font-size: 12px;
  color: #888;
  text-decoration: line-through;
}

/* Large Promotional Banner (بانر إعلاني كبير) */
.large-promo-banner {
  max-width: 1500px;
  margin: 30px auto;
  padding: 0 15px;
  text-align: center;
}
.large-promo-banner img {
  width: 100%;
  max-height: 250px; /* ارتفاع أقصى للبانر */
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Explore Categories Section (أقسام الفئات) */
.explore-categories-section {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin: 30px auto;
  max-width: 1500px;
  text-align: center;
}
.categories-section-title {
  font-size: 24px;
  font-weight: bold;
  color: #141414;
  margin-bottom: 20px;
  text-align: left; /* عنوان القسم يكون على اليسار */
}
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); /* أعمدة متجاوبة للفئات */
  gap: 15px; /* مسافة بين الفئات */
  justify-content: center; /* توسيط العناصر */
}
.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid #eee; /* حدود خفيفة */
  border-radius: 8px;
  transition: box-shadow 0.2s ease;
  cursor: pointer;
}
.category-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.category-title {
  font-size: 14px;
  font-weight: bold;
  color: #141414;
  margin-bottom: 10px;
}
.category-img {
  width: 100px; /* حجم ثابت للصور */
  height: 100px;
  object-fit: contain;
}

/* Responsive Adjustments for Home.vue */
@media (max-width: 1200px) {
  .product-blocks-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* 3 أعمدة أو أقل */
  }
}

@media (max-width: 991px) { /* Medium devices (tablets) */
  .main-slider-section {
    margin-bottom: -100px; /* سحب أقل على التابلت */
  }
  .service-blocks-container {
    padding: 10px 10px;
    gap: 10px;
  }
  .service-block {
    min-width: unset; /* إزالة الحد الأدنى للعرض */
    max-width: 48%; /* عمودين في الصف */
    padding: 15px;
  }
  .product-blocks-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); /* 2-3 أعمدة */
    padding: 0 10px;
  }
  .horizontal-carousel-section {
    padding: 15px;
  }
  .carousel-product-card {
    width: 180px;
  }
  .large-promo-banner {
    padding: 0 10px;
  }
  .explore-categories-section {
    padding: 15px;
  }
  .categories-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
}

@media (max-width: 767px) { /* Small devices (mobile phones) */
  .main-slider-section {
    margin-bottom: 0; /* لا تراكب على الجوال */
    height: auto; /* ارتفاع تلقائي */
  }
  .main-slider-section .slider-img {
    height: 250px; /* ارتفاع أقل للسلايدر على الجوال */
    object-fit: cover;
  }
  .service-blocks-container {
    margin-bottom: 20px;
    padding: 10px;
    flex-direction: column; /* ترتيب الخدمات عمودياً */
    align-items: center; /* توسيط العناصر */
  }
  .service-block {
    max-width: 100%; /* عرض كامل للكتل */
  }
  .product-blocks-grid {
    grid-template-columns: 1fr; /* عمود واحد */
    padding: 0 10px;
    gap: 15px;
  }
  .product-block-card {
    min-height: unset; /* إزالة الارتفاع الأدنى */
    padding: 15px;
  }
  .block-items-grid {
    grid-template-columns: 1fr; /* عمود واحد للصور داخل الكارد */
    gap: 15px;
  }
  .block-item {
    align-items: center; /* توسيط محتوى المنتج الواحد */
  }
  .block-item-img {
    height: 120px; /* صور المنتجات أصغر */
  }
  .block-items-grid .block-item:only-child .block-item-img {
    height: 150px; /* ارتفاع أكبر للصور الفردية */
  }
  .horizontal-carousel-section {
    padding: 10px;
    margin: 20px auto;
  }
  .carousel-section-title {
    font-size: 20px;
  }
  .carousel-product-card {
    width: 150px; /* عرض أصغر للبطاقات */
  }
  .large-promo-banner {
    margin: 20px auto;
    padding: 0 10px;
  }
  .large-promo-banner img {
    max-height: 150px;
  }
  .explore-categories-section {
    padding: 15px;
    margin: 20px auto;
  }
  .categories-section-title {
    font-size: 20px;
    text-align: center;
  }
  .categories-grid {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 10px;
  }
  .category-img {
    width: 80px;
    height: 80px;
  }
}

</style>
