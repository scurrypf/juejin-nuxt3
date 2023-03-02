<script setup>

let tag = ref([]);
const tagsArr = await useFetch('/api/tags')
tag = tagsArr.data.value.data;

let isActive = shallowRef(0);
function tonum(index){
  isActive.value = index;
}

</script>

<template>
<div class="nav-bottom">
    <div class="Tab">
        <div v-for="(item,index) in tag" :key="index" @click="tonum(index)"
        :class="{ active: index == isActive }">
        <NuxtLink :to="`/${item.id}`">
          {{ item.tittle }}
        </NuxtLink>  
      </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/home.scss";
</style>