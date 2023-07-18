<script >
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/icons/NavBar.vue';
import Footercomp from './components/icons/Footer.vue';

export default{
  components:{
    NavBar,
    Footercomp
  }
}

</script>

<template>
  <NavBar/>
  <RouterView/>
  <Footercomp/>
</template>

<style scoped>

</style>
