<script setup>

let tag = ref([]);
const tagsArr = await useFetch('/api/tags')
tag = tagsArr.data.value.data;

const route = useRoute();

let isActive = ref();
isActive.value = route.params.type || 2;

</script>

<template>
  <div class="nav-bottom">
    <div class="Tab">
      <div v-for="(item, index) in tag" :key="index">
        <NuxtLink :to="`/${item.id}`" :class="{ active: item.id == isActive }" class="tab-link">
          {{ item.tittle }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/home.scss";
</style>