<script setup>
import { ref } from 'vue'

const ad4 = await useFetch('/api/ad?adid=4');
const ad5 = await useFetch('/api/ad?adid=5');

const adSrc4 = `http://localhost:1337${ad4.data.value.adimg.url}`
const adSrc5 = `http://localhost:1337${ad5.data.value.adimg.url}`

let authorArr = ref([]);
const data1 = await useFetch('/api/author/authors');
authorArr.value = data1.data.value;

authorArr.value.forEach((ele) => {
    ele.level.url = `http://localhost:1337${ele.level.url}`
    ele.headImg.url = `http://localhost:1337${ele.headImg.url}`
});

// 跟随系统显示问候语
let word = ref('');
let h = new Date().getHours();
if (h < 8) word.value = '早上好!'
else if (h < 12) word.value = '上午好!'
else if (h < 18) word.value = '下午好!'
else if (h < 24) word.value = '晚上好!'

</script>

<template>
    <div class="tips">
        <div class="tip-first">
            <div class="icon-text">
                <div class="night">{{ word }}</div>
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
            <a target="blank"
                href="https://juejin.cn/video/7202149403342143520?utm_source=web_banner&utm_medium=banner&utm_campaign=xiaoce_nuxt3_20230301">
                <img width="240" height="200" :src="adSrc5" /></a>
        </div>
        <div class="tip-juejin">
            <div class="juejin-img">
                <img width="50" height="50"
                    src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/home.59780ae.png" />
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
            <div class="author-main" v-for="(item, index) in authorArr" :key="index">
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
                        {{ item.discuss }}
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
                <img width="36" height="36"
                    src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/juejin-tutu.d58819c.png" />
                <span class="des">稀土掘金漫游指南</span>
            </div>
            <div class="xitu-main">
                <img width="36" height="36"
                    src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/juejin-extension-icon.4b79fb4.png" />
                <span class="des">安装掘金浏览器插件</span>
            </div>
            <div class="xitu-main">
                <img width="36" height="36"
                    src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/juejin-miner.b78347c.png" />
                <span class="des">前往掘金翻译计划</span>
            </div>
        </div>
        <div class="tip-footer">
            <div class="foot-div">
                <NuxtLink
                    to="https://lf3-cdn-tos.draftstatic.com/obj/ies-hotsoon-draft/juejin/86857833-55f6-4d9e-9897-45cfe9a42be4.html"
                    class="foot-span">用户协议</NuxtLink>
                <NuxtLink to="https://juejin.cn/license" class="foot-span">营业执照</NuxtLink>
                <NuxtLink
                    to="https://lf3-cdn-tos.draftstatic.com/obj/ies-hotsoon-draft/juejin/7b28b328-1ae4-4781-8d46-430fef1b872e.html"
                    class="foot-span">隐私政策</NuxtLink>
                <NuxtLink to="https://juejin.cn/more_posts" class="foot-span">关于我们</NuxtLink>
            </div>
            <div class="foot-div">
                <NuxtLink to="https://juejin.cn/map-author-A-1" class="foot-span">站点地图</NuxtLink>
                <NuxtLink to="https://juejin.cn/book/6844733795329900551" class="foot-span">使用指南</NuxtLink>
                <NuxtLink to="https://juejin.cn/links" class="foot-span">友情链接</NuxtLink>
                <NuxtLink to="https://juejin.cn/about" class="foot-span">更多文章</NuxtLink>
            </div>
            <div class="foot-div">
                <NuxtLink to="https://beian.miit.gov.cn/#/Integrated/index" class="foot-span">京ICP备18012699号-3</NuxtLink>
            </div>
            <div class="foot-police">
                <img width="19" height="19"
                    src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/police.d0289dc.png" />
                京公网安备11010802026719号
            </div>
            <div class="foot-write">版权所有：北京北比信息技术有限公司</div>
            <div class="foot-write">公司地址：北京市海淀区信息路甲28号13层B座13B-5</div>
            <div class="foot-write">公司座机：010-83434395</div>
            <div class="foot-write">举报邮箱：<NuxtLink class="foot-span">feedback@xitu.io</NuxtLink>
            </div>
            <div class="foot-juejin">©2023 稀土掘金</div>
        <div style="margin-top: 10px;">
            <img width="24" height="24" class="img-weibo"
                src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/weibo.0cd39f5.png" />
            <img width="24" height="24" class="img-chat"
                src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/wechat.ce329e6.png" />
        </div>
    </div>
</div></template>

<style lang="scss" scoped>@import "../assets/scss/home.scss";</style>