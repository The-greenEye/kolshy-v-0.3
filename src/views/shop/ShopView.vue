<template>
    <div>
        <KolshyStyleHeader />
        <shopPage />
        <footerC />
    </div>
</template>
<script>
import shopPage from "@/components/Shop/shop.vue";
import KolshyStyleHeader from '@/components/Global/topBar';
import footerC from '@/components/Global/footer';
export default {
  name: "ShopView",
  components: {
    KolshyStyleHeader,
    footerC,
    shopPage,
  },
}
</script>
<style scoped>
</style>