<template>
  <div>
    <KolshyStyleHeader />
    <loginUser />
    <footerC />
  </div>
</template>

<script>
import KolshyStyleHeader from "@/components/Global/topBar"
import footerC from "@/components/Global/footer"
import loginUser from '@/components/User/auth/login'
export default {
    name: 'SigninView',
    components: {
        loginUser,
        KolshyStyleHeader,
        footerC
    }
}
</script>

<style>

</style>