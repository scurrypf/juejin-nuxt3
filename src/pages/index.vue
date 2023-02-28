<script setup>
import {onMounted , nextTick ,ref} from 'vue'

const computeTime = function(createdAt){
  const created = new Date(createdAt);
  const now = new Date();
  // console.log(created,now);
  const duration = (now.getTime() - created.getTime()) / 1000 / 60;
  let res = '刚刚';
  if (duration > 0 && duration < 60){
    // 一小时内
    // 使用toFixed去掉时间后的小数
    res = `${(duration).toFixed(0)}分钟前`
  }else if (duration < 60 * 24){
    // 一天内
    res = `${(duration / 60).toFixed(0)}小时前`
  }else if (duration < 60 * 24 * 30){
     // 一个月内
    res = `${(duration / 60 / 24).toFixed(0)}天前`
  }else if (duration < 60 * 24 * 30 * 365){
     // 一年内
    res = `${(duration / 60 / 24 / 30).toFixed(0)}月前`
  }else if (duration >= 60 * 24 * 30 * 365){
     // 超过一年
    res = `${(duration / 60 / 24 / 30 / 365).toFixed(0)}年前`
  }
  return res;
}

const article = await useFetch('/api/article');
const {data:articleArr} = await useFetch('/api/articles')
// console.log(data.value)

const display = article.data.value.summary;
const tittle = article.data.value.tittle;
const creatAt = article.data.value.createdAt;
const src = `http://localhost:1337${article.data.value.img.url}`
const good = article.data.value.good;
const discuss = article.data.value.discuss;
const see = article.data.value.see;
const authorName = article.data.value.author.name;
const tagArr = article.data.value.tags.data;

const time = computeTime(creatAt);

// console.log(articleArr)
let articles1 = ref([]);
articles1.value = articleArr.value.data;
// console.log(articles)
articles1.value.forEach((ele)=>{
  ele.img.url = `http://localhost:1337${ele.img.url}`
})
// console.log(articles)

let pagenum = 1;
let scrollBar = ref();
let list = ref();

const route = useRoute();

function Throttle(fn, wait = 500){
  let timer = null;
  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fn && fn()
      }, wait)
    }
  }
}

function useScrollBottom(){
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const clientHeight = document.documentElement.clientHeight
  const scrollHeight = document.documentElement.scrollHeight
  if (scrollTop + clientHeight + 200 >= scrollHeight)// 还未到底部就先开始请求
    return true
  return false
}

const addArtListItem = Throttle(async () => {
  if (useScrollBottom() && articles1.value != null) {
    const { data } = await useFetch(`/api/page?pagenum=${pagenum++}`)
    if (!data.value)return;
    data.value.forEach((ele)=>{
      ele.img.url = `http://localhost:1337${ele.img.url}`
  })
      articles1.value.push(...data.value)
  }
})
watch(route, () => {
  pagenum = 1
}, { immediate: true, deep: true })
onMounted(() => {
  window.addEventListener('scroll', addArtListItem)
})
onUnmounted(() => {
  window.removeEventListener('scroll', addArtListItem)
})

useHead({
  title:'掘金',
})

</script>

<template>
  <div>
    <div class="container">
      <!-- <div class="nav">
        <NavComp />
      </div>  -->
      <div class="nav-bottom">
            <div class="Tab">
            <div>综合</div>
            <div>后端</div>
            <div>前端</div>
            <div>Android</div>
            <div>IOS</div>
            <div>人工智能</div>
            <div>开发工具</div>
            <div>代码人生</div>
            <div>阅读</div>
          </div>
      </div>
      <div class="body"> 
        <div class="main">
          <div class="content" ref="scrollBar">
            <div class="content-nav">
              <div>推荐</div>
              <div>最新</div>
              <div style="border-right: none;">热榜</div>
            </div>
            <div ref="list">
            <div class="content-body">
              <div class="list-tab">
                <span class="tad-write">{{authorName}} | {{time}}<span v-for="(item,index) in tagArr" :key="index">| {{ item.tittle }}</span> </span>
              </div>
              <div class="main-content">
                <!--TODO:文章列表-->
                <router-link to="/detail" class="tittle" target="_blank">
                  {{tittle}}
                </router-link>
                <div class="head-content">
                   <router-link to="/detail" class="test" target="_blank">
                    {{display}}...
                  </router-link>
                  <div class="bottom-tab">
                    <div class="bottom-see">
                      <svg t="1677457805402" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1947" width="16" height="16"><path d="M515.2 224c-307.2 0-492.8 313.6-492.8 313.6s214.4 304 492.8 304 492.8-304 492.8-304S822.4 224 515.2 224zM832 652.8c-102.4 86.4-211.2 140.8-320 140.8s-217.6-51.2-320-140.8c-35.2-32-70.4-64-99.2-99.2-6.4-6.4-9.6-12.8-16-19.2 3.2-6.4 9.6-12.8 12.8-19.2 25.6-35.2 57.6-70.4 92.8-102.4 99.2-89.6 208-144 329.6-144s230.4 54.4 329.6 144c35.2 32 64 67.2 92.8 102.4 3.2 6.4 9.6 12.8 12.8 19.2-3.2 6.4-9.6 12.8-16 19.2C902.4 585.6 870.4 620.8 832 652.8z" p-id="1948"></path><path d="M512 345.6c-96 0-169.6 76.8-169.6 169.6 0 96 76.8 169.6 169.6 169.6 96 0 169.6-76.8 169.6-169.6C681.6 422.4 604.8 345.6 512 345.6zM512 640c-67.2 0-121.6-54.4-121.6-121.6 0-67.2 54.4-121.6 121.6-121.6 67.2 0 121.6 54.4 121.6 121.6C633.6 582.4 579.2 640 512 640z" p-id="1949"></path></svg>
                      <span>{{ see }}</span>
                    </div>
                    <div class="bottom-good">
                      <svg t="1677458374711" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3054" width="16" height="16"><path d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z" p-id="3055" fill="#707070"></path></svg>
                      <span>{{good}}</span>
                    </div>
                    <div class="bottom-good">
                      <svg t="1677590296747" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4386" width="16" height="16"><path d="M512 0C226.742857 0 0 197.485714 0 446.171429c0 138.971429 73.142857 270.628571 190.171429 351.085714L190.171429 1024l226.742857-138.971429c29.257143 7.314286 65.828571 7.314286 95.085714 7.314286 285.257143 0 512-197.485714 512-446.171429C1024 197.485714 797.257143 0 512 0zM256 512C219.428571 512 190.171429 482.742857 190.171429 446.171429S219.428571 380.342857 256 380.342857c36.571429 0 65.828571 29.257143 65.828571 65.828571S292.571429 512 256 512zM512 512C475.428571 512 446.171429 482.742857 446.171429 446.171429S475.428571 380.342857 512 380.342857c36.571429 0 65.828571 29.257143 65.828571 65.828571S548.571429 512 512 512zM768 512C731.428571 512 702.171429 482.742857 702.171429 446.171429s29.257143-65.828571 65.828571-65.828571c36.571429 0 65.828571 29.257143 65.828571 65.828571S804.571429 512 768 512z" p-id="4387" fill="#515151"></path></svg>
                      <span>{{discuss}}</span>
                    </div>  
                  </div>
                </div>
                <router-link to="/detail" class="main-img" target="_blank">
                  <img :src="src" width="120" height="80" />
                </router-link>
              </div>
            </div>
            <div class="content-body" v-for="(item,index) in articles1" :key="index">
              <div class="list-tab">
                <span class="tad-write">{{item.author.name}} | {{computeTime(item.createdAt)}}  <span v-for="(item,index) in item.tags.data" :key="index">| {{ item.tittle }}</span></span>
              </div>
              <div class="main-content">
                <!--TODO:文章列表-->
                <router-link :to="`/article/${item.id}`" class="tittle" target="_blank">
                  {{item.tittle}}
                </router-link>
                <div class="head-content">
                   <router-link :to="`/article/${item.id}`" class="test" target="_blank">
                    {{item.summary}}
                  </router-link>
                  <div class="bottom-tab">
                    <div class="bottom-see">
                      <svg t="1677457805402" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1947" width="16" height="16"><path d="M515.2 224c-307.2 0-492.8 313.6-492.8 313.6s214.4 304 492.8 304 492.8-304 492.8-304S822.4 224 515.2 224zM832 652.8c-102.4 86.4-211.2 140.8-320 140.8s-217.6-51.2-320-140.8c-35.2-32-70.4-64-99.2-99.2-6.4-6.4-9.6-12.8-16-19.2 3.2-6.4 9.6-12.8 12.8-19.2 25.6-35.2 57.6-70.4 92.8-102.4 99.2-89.6 208-144 329.6-144s230.4 54.4 329.6 144c35.2 32 64 67.2 92.8 102.4 3.2 6.4 9.6 12.8 12.8 19.2-3.2 6.4-9.6 12.8-16 19.2C902.4 585.6 870.4 620.8 832 652.8z" p-id="1948"></path><path d="M512 345.6c-96 0-169.6 76.8-169.6 169.6 0 96 76.8 169.6 169.6 169.6 96 0 169.6-76.8 169.6-169.6C681.6 422.4 604.8 345.6 512 345.6zM512 640c-67.2 0-121.6-54.4-121.6-121.6 0-67.2 54.4-121.6 121.6-121.6 67.2 0 121.6 54.4 121.6 121.6C633.6 582.4 579.2 640 512 640z" p-id="1949"></path></svg>
                      <span>{{item.see}}</span>
                    </div>
                    <div class="bottom-good">
                      <svg t="1677458374711" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3054" width="16" height="16"><path d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z" p-id="3055" fill="#707070"></path></svg>
                      <span>{{item.good}}</span>
                    </div>
                    <div class="bottom-good">
                      <svg t="1677590296747" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4386" width="16" height="16"><path d="M512 0C226.742857 0 0 197.485714 0 446.171429c0 138.971429 73.142857 270.628571 190.171429 351.085714L190.171429 1024l226.742857-138.971429c29.257143 7.314286 65.828571 7.314286 95.085714 7.314286 285.257143 0 512-197.485714 512-446.171429C1024 197.485714 797.257143 0 512 0zM256 512C219.428571 512 190.171429 482.742857 190.171429 446.171429S219.428571 380.342857 256 380.342857c36.571429 0 65.828571 29.257143 65.828571 65.828571S292.571429 512 256 512zM512 512C475.428571 512 446.171429 482.742857 446.171429 446.171429S475.428571 380.342857 512 380.342857c36.571429 0 65.828571 29.257143 65.828571 65.828571S548.571429 512 512 512zM768 512C731.428571 512 702.171429 482.742857 702.171429 446.171429s29.257143-65.828571 65.828571-65.828571c36.571429 0 65.828571 29.257143 65.828571 65.828571S804.571429 512 768 512z" p-id="4387" fill="#515151"></path></svg>
                      <span>{{ item.discuss }}</span>
                    </div>  
                  </div>
                </div>
                <router-link :to="`/article/${item.id}`" class="main-img" target="_blank">
                  <img :src="item.img.url" width="120" height="80" />
                </router-link>
              </div>
            </div>
            </div>

          </div>
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
              <img width="240" height="200"
                src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4023ed80e2794fb48858b4809b17f139~tplv-k3u1fbpfcp-no-mark:480:400:0:0.awebp?"
                >
            </div>
            <div class="tip-first">
              晚上好
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/home.scss";
</style>
