<script setup>
import {ref,onMounted } from 'vue'

const ad4 = await useFetch('/api/ad?adid=4');
const ad5 = await useFetch('/api/ad?adid=5');

const adSrc4 = `http://localhost:1337${ad4.data.value.adimg.url}`
const adSrc5 = `http://localhost:1337${ad5.data.value.adimg.url}`

let authorArr = ref([]);
const data1 = await useFetch('/api/author/authors');
authorArr.value = data1.data.value;

authorArr.value.forEach((ele)=>{
  ele.level.url = `http://localhost:1337${ele.level.url}`
  ele.headImg.url = `http://localhost:1337${ele.headImg.url}`
 });

</script>

<template>
<div class="tips">
    <div class="tip-first">
        <div class="icon-text">
            <div class="night">晚上好！</div>
            <div>点亮在社区的每一天</div>
        </div>
        <div class="btn">
            <el-button type="primary" plain size="small">去签到</el-button>
        </div>
    </div>
    <div class="tip-second">
        <a target="blank" href="https://juejin.cn/pin/topic/7202454509627375655">
          <img width="240" height="200" :src="adSrc4" />  
        </a>
    </div>
    <div class="tip-second">
        <a target="blank" href="https://juejin.cn/video/7202149403342143520?utm_source=web_banner&utm_medium=banner&utm_campaign=xiaoce_nuxt3_20230301" >
            <img width="240" height="200" :src="adSrc5" /></a>    
    </div>
    <div class="tip-juejin">
        <div class="juejin-img">
            <img width="50" height="50" src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/home.59780ae.png" />
        </div>
        <div class="juejin-ms">
            <div class="ms-tittle">
                下载稀土掘金APP
            </div>
            <div class="ms-content">
                一个帮助开发者成长的社区
            </div>
        </div>
    </div>
    <div class="tip-author">
        <div class="author-tittle">
            🎖️作者榜
        </div>
        <div class="author-main" v-for="(item,index) in authorArr" :key="index">
            <div class="main-img">
                <img :src="item.headImg.url" class="headImg" />
            </div>
            <div class="main-con">
                <div class="main-name">
                    {{ item.name }}
                    <span>
                        <img width="35" height="16" :src="item.level.url" />
                    </span>
                </div>
                <div class="main-dis">
                    {{item.discuss}}
                </div>
            </div>
        </div>
        <div class="author-end">
            <NuxtLink class="link" to="https://juejin.cn/recommendation/authors/recommended" target="_blank">
               完整榜单> 
            </NuxtLink>
        </div>
    </div>
    <div class="tip-xitu">
        <div class="xitu-main">
            <img width="36" height="36" src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/juejin-tutu.d58819c.png" />
            <span class="des">稀土掘金漫游指南</span>
        </div>
        <div class="xitu-main">
            <img width="36" height="36" src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/juejin-extension-icon.4b79fb4.png" />
            <span class="des">安装掘金浏览器插件</span>
        </div>
        <div class="xitu-main">
            <img width="36" height="36" src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/juejin-miner.b78347c.png" />
            <span class="des">前往掘金翻译计划</span>
        </div>
    </div>
    <div class="tip-footer">

    </div>
</div>

</template>

<style lang="scss" scoped>
@import "@/assets/scss/home.scss";
</style>