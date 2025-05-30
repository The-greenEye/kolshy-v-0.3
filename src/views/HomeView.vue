<template>
  <div class="home">
    <KolshyStyleHeader />
    <div class="basice_home"><Home /></div>
    <footerC />
  </div>
</template>

<script>
import KolshyStyleHeader from "@/components/Global/topBar";
import footerC from "@/components/Global/footer";
import Home from "@/components/User/Home"
export default {
  name: "HomeView",
  components: {
    KolshyStyleHeader,
      footerC,
    Home,
  },
};
</script>
