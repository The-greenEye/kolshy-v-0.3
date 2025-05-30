<template>
    <div>
  <KolshyStyleHeader />
  <forget />  
  <footer />      
    </div>
</template>

<script>
import KolshyStyleHeader from "@/components/Global/topBar"
import footer from "@/components/Global/footer"
import forget from '@/components/Global/forgetpassword.vue'
export default {
    name: 'ForPassGet',
    components: {
        forget,
        KolshyStyleHeader,
        footer
    }
}
</script>

<style>

</style>