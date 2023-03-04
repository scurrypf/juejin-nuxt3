<template>
  <div>
    <NavComp />
    <NuxtPage></NuxtPage>  
  </div>
</template>

<script setup>
useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
  ],
})
</script>

<style lang="scss">
@import "./assets/scss/default.scss";
</style>