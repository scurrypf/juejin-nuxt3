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
let articles = articles1.value;
console.log(articles)
articles1.value.forEach((ele)=>{
  ele.img.url = `http://localhost:1337${ele.img.url}`
})
// console.log(articles)

let page = ref(1)
let allList = ref([])  //存放文章列表数据的数组
let itemHeight = ref(129) 
let showNum = ref(0) 
let start = ref(0);
let canScroll = ref(true)
let scrollBar = ref();
let list = ref();
let isRequest = ref(false);
let lower = ref(150)
let scrollTop = ref(0)
let articleArr1 = ref([]);
let data = ref([])

// async function getData() {
//   isRequest = true  // 正在请求中
//   data.value = await useFetch('/api/page')
//   console.log(data.value.data)
//   articleArr1.value = data.value.data;
//   console.log(articleArr1.value);
//   articleArr1.value.forEach((ele)=>{
//     ele.img.url = `http://localhost:1337${ele.img.url}`
//   })
//   allList.value = [...allList.value, ...articleArr1.value];
//   isRequest = false;
// }


// function canShowNum() {
//     // ~~ 按位两次取反，得到整数
//     showNum = ~~(scrollBar.value.offsetHeight / itemHeight) + 2;
// }

// function handleScroll(e) {
//       if (canScroll) {
//         canScroll = false
//         // 处理数据
//         handleData(e)
//         // 节流
//         let timer = setTimeout(() => {
//           canScroll = true
//           clearTimeout(timer)
//           timer = null
//         }, 30)
//       }
//   }

// function handleData(e) {
//       // 记录当前元素滚动的高度
//       scrollTop = e.target.scrollTop
//       // 可见区域第一个元素的index
//       const curIndex = ~~(e.target.scrollTop / itemHeight)
//       // 渲染区域第一个元素的index，这里缓冲区域的列表条数使用的是this.showNum
//       start = curIndex < showNum ? 0 : curIndex - showNum
//       // 滚动距离底部，还有this.lower距离时，触发触底事件，正在请求中不发送数据
//       if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight - lower && !isRequest) {
//         getData()
//       }
//     }


// const endIndex = computed({
//   get(){
//     // let end = start + showNum * 3; // 3倍是需要预留缓冲区域
//     return start + showNum * 3 >= allList.length ? allList.length : start + showNum * 3;  // 结束元素大于所有元素的长度时，就取元素长度
//   }
// })

// const showList = computed({
//   get(){
//     return allList.value.slice(start, endIndex)
//   }
// })

// const paddingStyle = computed({
//   get(){
//     return {
//         paddingTop: start * itemHeight + 'px',
//         paddingBottom: (allList.length - endIndex) * itemHeight + 'px'
//     }
//   }
// })



// getData();
// onMounted(()=>{
  
//   canShowNum();  // 获取可见区域能展示多少条数据
//   window.onresize = canShowNum();  // 监听窗口变化，需要重新计算一屏能展示多少条数据
//   window.onorientationchange = canShowNum();  // 监听窗口翻转
//   window.addEventListener('scroll', handleScroll)
//   nextTick(()=>{
//       // 定位到之前的高度
//       scrollBar.value.scrollTop = scrollTop;
//     })
// })

const route = useRoute()
let pagenum = 1
const { data: artlist} = await useFetch('/api/page?pageNum=1')
console.log(artlist)
const addArtListItem = useThrottle(async () => {
  if (useScrollBottom() && artlist.value != null) {
    const { data } = await useFetch(`/api/page?pageNum=${++pagenum}`)
    if (!data.value)
      return
    artlist.value.push(...data.value)
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
            <div ref="list" :style="paddingStyle">
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
                      <svg t="1677458452890" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8724" width="16" height="16"><path d="M181.950464 904.356864c-10.888192 0-21.697536-0.336896-32.377856-0.99328l-48.2304-2.963456 42.43968-22.79936c50.363392-27.060224 90.082304-70.546432 112.79872-123.194368C156.571648 689.539072 99.479552 593.496064 99.479552 489.30816c0-187.336704 188.312576-339.760128 419.76832-339.760128S938.998784 301.971456 938.998784 489.30816c0 187.341824-188.294144 339.760128-419.750912 339.760128-18.069504 0-36.352-0.960512-54.388736-2.854912-42.69568 26.135552-90.272768 46.212096-141.495296 59.675648C276.752384 898.148352 229.175296 904.356864 181.950464 904.356864zM519.248896 177.015808c-216.107008 0-391.93088 140.096512-391.93088 312.292352 0 97.857536 56.060928 188.228608 153.796608 247.955456l9.73312 5.958656-4.037632 10.551296c-18.650112 48.950272-50.323456 91.405312-91.144192 122.9312 40.2944-1.074176 80.775168-6.902784 120.51968-17.350656 50.148352-13.182976 96.55808-33.00352 137.920512-58.91584l4.174848-2.598912 4.891648 0.562176c18.571264 2.132992 37.436416 3.204096 56.076288 3.204096 216.09472 0 391.907328-140.091392 391.907328-312.297472C911.156224 317.11232 735.342592 177.015808 519.248896 177.015808z" fill="#272636" p-id="8725"></path></svg>
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
                <router-link to="/detail" class="tittle" target="_blank">
                  {{item.tittle}}
                </router-link>
                <div class="head-content">
                   <router-link to="/detail" class="test" target="_blank">
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
                      <svg t="1677458452890" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8724" width="16" height="16"><path d="M181.950464 904.356864c-10.888192 0-21.697536-0.336896-32.377856-0.99328l-48.2304-2.963456 42.43968-22.79936c50.363392-27.060224 90.082304-70.546432 112.79872-123.194368C156.571648 689.539072 99.479552 593.496064 99.479552 489.30816c0-187.336704 188.312576-339.760128 419.76832-339.760128S938.998784 301.971456 938.998784 489.30816c0 187.341824-188.294144 339.760128-419.750912 339.760128-18.069504 0-36.352-0.960512-54.388736-2.854912-42.69568 26.135552-90.272768 46.212096-141.495296 59.675648C276.752384 898.148352 229.175296 904.356864 181.950464 904.356864zM519.248896 177.015808c-216.107008 0-391.93088 140.096512-391.93088 312.292352 0 97.857536 56.060928 188.228608 153.796608 247.955456l9.73312 5.958656-4.037632 10.551296c-18.650112 48.950272-50.323456 91.405312-91.144192 122.9312 40.2944-1.074176 80.775168-6.902784 120.51968-17.350656 50.148352-13.182976 96.55808-33.00352 137.920512-58.91584l4.174848-2.598912 4.891648 0.562176c18.571264 2.132992 37.436416 3.204096 56.076288 3.204096 216.09472 0 391.907328-140.091392 391.907328-312.297472C911.156224 317.11232 735.342592 177.015808 519.248896 177.015808z" fill="#272636" p-id="8725"></path></svg>
                      <span>{{ item.discuss }}</span>
                    </div>  
                  </div>
                </div>
                <router-link to="/detail" class="main-img" target="_blank">
                  <img :src="item.img.url" width="120" height="80" />
                </router-link>
              </div>
            </div>
            <div class="content-body" v-for="(item,index) in showList" :key="index">
              <div class="list-tab">
                <span class="tad-write">{{item.author.name}} | {{computeTime(item.createdAt)}}  <span v-for="(item,index) in item.tags.data" :key="index">| {{ item.tittle }}</span></span>
              </div>
              <div class="main-content">
                <!--TODO:文章列表-->
                <router-link to="/detail" class="tittle" target="_blank">
                  {{item.tittle}}
                </router-link>
                <div class="head-content">
                   <router-link to="/detail" class="test" target="_blank">
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
                      <svg t="1677458452890" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8724" width="16" height="16"><path d="M181.950464 904.356864c-10.888192 0-21.697536-0.336896-32.377856-0.99328l-48.2304-2.963456 42.43968-22.79936c50.363392-27.060224 90.082304-70.546432 112.79872-123.194368C156.571648 689.539072 99.479552 593.496064 99.479552 489.30816c0-187.336704 188.312576-339.760128 419.76832-339.760128S938.998784 301.971456 938.998784 489.30816c0 187.341824-188.294144 339.760128-419.750912 339.760128-18.069504 0-36.352-0.960512-54.388736-2.854912-42.69568 26.135552-90.272768 46.212096-141.495296 59.675648C276.752384 898.148352 229.175296 904.356864 181.950464 904.356864zM519.248896 177.015808c-216.107008 0-391.93088 140.096512-391.93088 312.292352 0 97.857536 56.060928 188.228608 153.796608 247.955456l9.73312 5.958656-4.037632 10.551296c-18.650112 48.950272-50.323456 91.405312-91.144192 122.9312 40.2944-1.074176 80.775168-6.902784 120.51968-17.350656 50.148352-13.182976 96.55808-33.00352 137.920512-58.91584l4.174848-2.598912 4.891648 0.562176c18.571264 2.132992 37.436416 3.204096 56.076288 3.204096 216.09472 0 391.907328-140.091392 391.907328-312.297472C911.156224 317.11232 735.342592 177.015808 519.248896 177.015808z" fill="#272636" p-id="8725"></path></svg>
                      <span>{{ item.discuss }}</span>
                    </div>  
                  </div>
                </div>
                <router-link to="/detail" class="main-img" target="_blank">
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
          <div class="toTop">
        <!--TODO:backtotop-->
        <i>
          <svg data-v-0b2d23d8="" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="icon-feedback">
            <path data-v-0b2d23d8="" fill-rule="evenodd" clip-rule="evenodd" d="M1.8252 4.002C1.8252 2.80032 2.79935 1.82617
                  4.00102 1.82617H12.001C13.2027 1.82617 14.1768 2.80032 14.1768 4.002V9.71628C14.1768 10.918 13.2027 11.8921 12.001
                  11.8921H9.43308L6.92709 14.1281C6.4455 14.5578 5.68234 14.216 5.68234 13.5706V11.8921H4.00102C2.79934 11.8921 1.8252
                  10.918 1.8252 9.71628V4.002ZM11.2414 7.86753C11.3826 7.65526 11.3249 7.36878 11.1126 7.22764C10.9004 7.08651 10.6139
                  7.14417 10.4728 7.35643C9.94042 8.15705 9.03153 8.68309 7.99997 8.68309C6.96841 8.68309 6.05952 8.15705 5.52719 
                  7.35643C5.38605 7.14417 5.09957 7.08651 4.88731 7.22764C4.67504 7.36878 4.61738 7.65526 4.75852 7.86753C5.45467 
                  8.91452 6.64645 9.60617 7.99997 9.60617C9.35349 9.60617 10.5453 8.91452 11.2414 7.86753Z" fill="#1E80FF">
            </path>
          </svg>
        </i>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/home.scss";
.container{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .nav{
    height: 60px;
    width: 100%;
    // position: sticky;
    // top: 0px;
    // z-index: 993;
    background-color: white;
    
  }
  .body{
    background-color: #f4f5f5;
    height: auto;
    padding: 0 286px 0 286px;
  }
  .main{
    width: 960px;
    padding-top: 15px;
    display: flex;
    .content{
      background-color: white;
      width: 700px;
      height: auto;
      //overflow-y: auto;
      .content-nav{
        height: 15px;
        padding: 15px 12px 15px 12px;
        border-bottom: 1px solid #f4f4f4;
        display: flex;
  
        div{
          font-size: 14px;
          color: #5e6d82;
          padding: 0 14.5px 0 14.5px;
          border-right: 1px solid #f4f4f4;
          &:hover{
            cursor: pointer;
            color: #1e80ff;
          }
        }
      }
      
    }
    // .tips{
      // background-color: white;
      // width: 240px;
      // height: 48px;
      // margin-left: 20px;
      .tip-first{
        background-color: white;
        margin-left: 20px;
        width: 208px;
        height: 48px;
        padding: 16px;
        margin-bottom: 16px;
        display: flex;
        .icon-text{
          .night{
          font-weight: 600;
          font-size: 16px;
          color: black;
        }
        div{
          color: #abb0ba;
          font-size: 12px;
          width: 108px;
          height: 24px;
          vertical-align:middle;
        }
        }
        .btn{
          width: 74px;
          height: 36px;
          margin-left: 28px;
          text-align: right;
        }
      }
      .tip-second{
        margin-left: 20px;
        margin-bottom: 16px;
      }
    //}
  }

  .nav-bottom{
      height: 46px;
      width: 100%;
      position: sticky;
      top: 0px;
      z-index: 999;
      background-color: white;
      .Tab{
        position: absolute;
        left: 274px;
        width: 960px;
        height: 100%;
        display: flex;
        flex-wrap:wrap;
        div{
          padding: 0 12px 0 12px;
          font-size: 14px;
          color: #5e6d82;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover{
            cursor: pointer;
            color: #1e80ff;
          }
        }
      }
    }
    .content-body{
        width: 660px;
        height: 129px;
        margin: 12px 20px 0px 20px;
        border-bottom: 1px solid #f4f5f5;
      }
.main-content{
  color: black;
  width: 660px;
  height: 84px;
  margin-top: 6px;
  padding-bottom: 12px;
  position: relative;
  .main-img{
    position: relative;
    left: 540px;
    bottom: 90px;
  }
  .tittle{
    color: black;
    text-decoration:none;
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 24px;
  }
  .head-content{
    
    margin-top: 10px;
    .bottom-tab{
      margin-top: 10px;
      font-size: 13px;
      color: #5e6d82;
      width: 516px;
      height: 22px;
      display: flex;
      
      &:hover{
        cursor: pointer;
      }
      .bottom-see{
        width: auto;
        height: 20px;
        display: flex;
        margin-right: 20px;
        align-items: center;
        svg{
          margin-right: 5px;
        }
      }
      .bottom-good{
        width: auto;
        height: 20px;
        display: flex;
        align-items: center;
        margin-right: 20px;
        svg{
          margin-right: 5px;
        }
        &:hover{
          color: #1e80ff;
        }
      }
    }
  }
}
.toTop{
  position: fixed;
  bottom: 25px;
  right: 25px;
  background-color: #fff;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: #409eff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 0 6px rgb(0 0 0 / 12%);
  cursor: pointer;
  z-index: 5;
}
.list-tab{
  width: 660px;
  height: 22px;
  .tad-write{
    font-size: 14px;
  }
}
.test{
  color: #5e6d82;
  text-decoration:none;
  font-size: 14px;
  width: 516px;
  height: 22px;
}
</style>
