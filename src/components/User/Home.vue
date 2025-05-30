<template>
  <div class="home_com">
    <div class="mb-2 p-0 position-relative d-lg-block d-none slider_home" style="height: 700px">
      <div>
        <div style="height: 600px">
          <div id="carouselExampleControlsNoTouching overflow-y-hidden" class="carousel w-100 slide" data-bs-touch="false">
            <div class="carousel-inner">
              <div v-for="(slide, index) in sliderHome" :key="index" :class="['carousel-item', { active: index === 0 }]">
                <img :src="slide.image" class="d-block w-100" height="550" alt="Slider" />
              </div>
            </div>
            <button class="carousel-control-prev opacity-0" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next opacity-0" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    <button class="btn z-3 position-absolute start-0 translate-middle-y z-3" style="    top: 85%;
    font-size: 80px;
    background-color: #dbd8d870;
    backdrop-filter: blur(6px);" @click="scrollLeft">
      ‹
    </button>
    <button class="btn z-3 position-absolute end-0 translate-middle-y z-3" style="    top: 85%;
    font-size: 80px;
    background-color: #dbd8d870;
    backdrop-filter: blur(6px);" @click="scrollRight">
      ›
    </button>
      <div class="d-flex overflow-x-auto z-2 justify-content-start mb-4 align-items-center border-0 position-absolute w-100" style="backdrop-filter: blur(2px); top: 70%; padding: 10px 45px ">
        <div v-for="(serv, index) in servise" :key="index" class="d-flex flex-column m-2 justify-content-start p-4 bg-light border-0">
          <h4>{{ serv.text }}</h4>
          <div class="d-flex justify-content-start align-items">
            <i :class="serv.icon" class="me-4" style="font-size: 40px"></i>
            <div>
              <b class="text-dark">{{ serv.text }}</b>
              <p class="text-secondary">{{ serv.subText }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row p-3">
      <div v-for="(block, blockIndex) in productHome[0].block_title" :key="blockIndex" style=" background-color: white" class="col d-flex flex-column justify-content-start rounded-0 border-0 m-2 box-show">
        <h4 class="fw-bold mb-2">{{ block.title }}</h4>

        <div class="row justify-content-start">
          <div v-for="(img, index) in block.items[0].image" :key="index" class="col-6 mb-3 d-flex flex-column">
            <img :src="img" :width="block.items[0].image.length > 1 ? 80 : 300" :height="block.items[0].image.length > 1 ? 80 : 300" alt="Product" />
            <p class="text-truncate text-center" style="max-width: 100px">
              {{ block.items[0].text[index] }}
            </p>
            <p class="text-dark fs-4 fw-bold mb-0">$29<sub class="text-muted text-decoration-line-through">$36</sub></p>
          </div>
          <p class="text-primary fs-5 fw-bold mb-0" v-if="block.items[0].image.length === 1">Shop Now Kolshy Store</p>
        </div>
      </div>
    </div>
    <div class="d-lg-flex p-4 d-none justify-content-start overflow-x-auto mb-4 align-items-start p-3 border w-100" style="height: 350px; background: white; scroll-snap-align: center">
      <div class="p-0 d-flex flex-column justify-content-start align-items-start cursor-pointer m-3" v-for="(sale, index) in mustSales" :key="index" style="max-width: 200px; min-width: 200px">
        <div>
          <img :src="sale.image" width="200" height="120" alt="Product" />
        </div>
        <p class="fw-bold mt-2 text-truncate" :title="sale.title">{{ sale.title }}</p>
        <hr class="w-100" />
        <p class="text-info small mb-1">{{ sale.description.slice(0, 30) }}...</p>
        <div class="d-flex justify-content-start align-items-center fw-bold mb-1">${{ sale.newPrice }}</div>
      </div>
    </div>
    <div class="text-center d-lg-block d-none p-4">
      <img src="https://i.pinimg.com/736x/bd/ae/85/bdae85ae6a435aa664878b321214f320.jpg" style="object-fit: cover; height: 200px" alt="" />
    </div>
    <div class="p-2">
      <div style="background-color: white; padding: 15px">
        <h3>Explore Categories</h3>
        <div class="row text-center p-4">
          <div v-for="(cat, n) in categories" :key="n" class="col-lg-3 col-6 d-flex flex-column justify-content-center">
            <p class="fw-bold">{{ cat.text }}</p>
            <img :src="cat.image" class="img-fluid" width="180" height="100" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex p-4"></div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Home",
  data() {
    return {
      showDec: ref(false),
      sliderHome: [{ image: "https://i.pinimg.com/736x/b9/dc/03/b9dc032fef51b3d8d0fedbf4bfc1cb2f.jpg" }, { image: "https://i.pinimg.com/originals/a5/43/0d/a5430d131e591c8ac612d13e7b9556f8.gif" }, { image: "https://i.pinimg.com/736x/06/aa/f4/06aaf4b866bb9f4db0c5eeef37bed7f1.jpg" }],
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
        { text: "Officale Product", image: "https://m.media-amazon.com/images/G/01/AmazonBusiness/CatTiles/2018New/OfficeProducts._CB459383234_.png" },
        { text: "Books", image: "https://m.media-amazon.com/images/G/01/AmazonBusiness/CatTiles/2018New/Books._CB459383261_.png" },
        { text: "Software", image: "https://m.media-amazon.com/images/G/01/AmazonBusiness/CatTiles/2018New/3software._CB443113980_.png" },
        { text: "Computers", image: "https://m.media-amazon.com/images/G/01/AmazonBusiness/CatTiles/2018New/3OfficeLaptop._CB443113981_.png" },
        { text: "Officale Product", image: "https://m.media-amazon.com/images/G/01/AmazonBusiness/CatTiles/2018New/OfficeProducts._CB459383234_.png" },
        { text: "Books", image: "https://m.media-amazon.com/images/G/01/AmazonBusiness/CatTiles/2018New/Books._CB459383261_.png" },
        { text: "Software", image: "https://m.media-amazon.com/images/G/01/AmazonBusiness/CatTiles/2018New/3software._CB443113980_.png" },
        { text: "Computers", image: "https://m.media-amazon.com/images/G/01/AmazonBusiness/CatTiles/2018New/3OfficeLaptop._CB443113981_.png" },
      ],
    };
  },
  methods: {
    scrollLeft() {
      this.$refs.slider.scrollLeft -= 300;
    },
    scrollRight() {
      this.$refs.slider.scrollLeft += 300;
    },
  },
};
</script>

<style>
*::-webkit-scrollbar {
  width: 0;
  opacity: 0;
}
body {
  background-color: rgb(17, 17, 17);
}
.banar-home-slider1 {
  background-image: url("https://i.pinimg.com/736x/c7/3a/f7/c73af76a1a47e3e08bc2194eb2d82e03.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 8px;
  margin: 0 0 5px 0;
  height: 300;
}
.banar-home-slider2 {
  background-image: url("https://i.pinimg.com/736x/68/73/62/6873623b0f298b8464b0ca473ed3a2cd.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 8px;
  height: 300;
}
@media (min-width: 800px) {
  .box-show {
    width: 100%
  }
}
</style>
