<template>
  <div>
    <KolshyStyleHeader />
    <basiceSetting />
    <footerC />
  </div>
</template>

<script>
import KolshyStyleHeader from "@/components/Global/topBar"
import footerC from "@/components/Global/footer"
import basiceSetting from "@/components/User/setting/basiceSetting";
export default {
    name: "CustomerSetting",
    components: {
        basiceSetting,
        KolshyStyleHeader,
        footerC
    },
}
</script>

<style>

</style>