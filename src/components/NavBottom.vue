<script setup>

let tag = ref([]);
const tagsArr = await useFetch('/api/tags')
tag = tagsArr.data.value.data;

let tagid = ref(2);

async function changeTagArticle(id){
  const url = ref(`/api/artlist/${id}`);
  tagid.value = id;
  let {data} = await useFetch(url);
  articles1.value = data.value.data;
  articles1.value.forEach((ele)=>{
    ele.img.url = `http://localhost:1337${ele.img.url}`
  })
}

let isActive = shallowRef(0);
function tonum(index){
  isActive.value = index;
}

</script>

<template>
<div class="nav-bottom">
    <div class="Tab">
        <div v-for="(item,index) in tag" :key="index" @click="changeTagArticle(item.id) ,tonum(index)"
        :class="{ active: index == isActive.valueOf }">{{ item.tittle }}</div>
    </div>
</div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/home.scss";
</style>