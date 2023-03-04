<script setup>

useHead({
  title:'掘金',
})

</script>

<template>
  <div>
    <div class="container">
      <NavBottom></NavBottom>
      <div class="body"> 
        <div class="main">
          <ArticleList></ArticleList>
          <TipComp />
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/home.scss";
</style>
