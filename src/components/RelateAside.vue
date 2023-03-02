<script setup>
const abouturl = ref(`/api/aboutArt?authid=${authid}`);
const about = await useFetch(abouturl);
console.log(about)

const aboutArr = about.data.value;
</script>

<template>
<div class="other">
                <div class="tittle">
                    相关文章
                </div>
                <div class="relation" v-for="(item,index) in aboutArr" :key="index">
                        <div class="rel-tittle">
                            <router-link :to="`/article/${item.id}`" class="rel-tittle" target="_blank">
                            {{ item.tittle }}
                            </router-link>
                        </div>
                        <div class="rel-data">
                            <router-link :to="`/article/${item.id}`" class="rel-data" target="_blank">
                                {{item.good}}点赞&nbsp; · &nbsp;{{item.discuss}}评论
                            </router-link>
                        </div>
                </div>
            </div>

</template>
<style lang="scss" scoped>
@import "@/assets/scss/article.scss";
</style>