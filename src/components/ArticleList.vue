<script setup>

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

const {data:articleArr} = await useFetch('/api/articles')


let articles1 = ref([]);
articles1.value = articleArr.value.data;
articles1.value.forEach((ele)=>{
  ele.img.url = `http://localhost:1337${ele.img.url}`
})

let pagenum = 1;
let scrollBar = ref();
let list = ref();
let tagid = ref(2);

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
    if(pagenum > 4)pagenum = 1;
    const { data } = await useFetch(`/api/page?pagenum=${pagenum++}&tag=${tagid.value || 2}`)
    if (!data.value)return;
    data.value.forEach((ele)=>{
      ele.img.url = `http://localhost:1337${ele.img.url}`
  })
      articles1.value.push(...data.value)
  }
})

async function changeArticle(str){
  const url = ref(`/api/${str}`);
  let {data} = await useFetch(url);
  articles1.value = data.value.data;
  articles1.value.forEach((ele)=>{
    ele.img.url = `http://localhost:1337${ele.img.url}`
  })
}

watch(route, () => {
  pagenum = 1
}, { immediate: true, deep: true })
onMounted(() => {
  window.addEventListener('scroll', addArtListItem)
})
onUnmounted(() => {
  window.removeEventListener('scroll', addArtListItem)
})
</script>

<template>
<div class="content" ref="scrollBar">
            <div class="content-nav">
              <!-- <div v-for="(index,item) in seetag" :key="index" @click="changeArticle(item.en)">{{ item.tag }}</div> -->
              <div @click="changeArticle('articles')">推荐</div>
              <div @click="changeArticle('new')">最新</div>
              <div @click="changeArticle('like')" style="border-right: none;">热榜</div>
            </div>
            <div ref="list">
            <div class="content-body" v-for="(item,index) in articles1" :key="index">
              <div class="list-tab">
                <span class="tad-write">{{item.author.name}} | {{computeTime(item.createdAt)}}  <span v-for="(item,index) in item.tags.data" :key="index">| {{ item.tittle }}</span></span>
              </div>
              <div class="main-content">
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
                      <svg t="1677636028466" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6601" width="16" height="16"><path d="M512 65.536C230.4 65.536 1.024 257.024 1.024 492.544c0 99.328 39.936 190.464 108.544 263.168l0 0c0 0-5.12 180.224-43.008 203.776 0 0 138.24 0 226.304-79.872 66.56 26.624 140.288 40.96 219.136 40.96 281.6 0 510.976-191.488 510.976-427.008C1022.976 257.024 793.6 65.536 512 65.536zM512 878.592c-71.68 0-140.288-13.312-203.776-37.888-5.12-2.048-10.24-3.072-15.36-3.072-10.24 0-19.456 4.096-27.648 10.24-38.912 35.84-91.136 53.248-132.096 61.44 4.096-16.384 7.168-34.816 9.216-56.32 5.12-40.96 7.168-78.848 7.168-92.16 2.048-12.288-2.048-24.576-10.24-33.792-63.488-67.584-97.28-149.504-97.28-234.496 0-212.992 210.944-386.048 470.016-386.048s470.016 173.056 470.016 386.048C982.016 705.536 771.072 878.592 512 878.592z" p-id="6602" fill="#5e6d82"></path><path d="M321.536 512m-55.296 0a5.4 5.4 0 1 0 110.592 0 5.4 5.4 0 1 0-110.592 0Z" p-id="6603" fill="#5e6d82"></path><path d="M527.36 512m-55.296 0a5.4 5.4 0 1 0 110.592 0 5.4 5.4 0 1 0-110.592 0Z" p-id="6604" fill="#5e6d82"></path><path d="M733.184 512m-55.296 0a5.4 5.4 0 1 0 110.592 0 5.4 5.4 0 1 0-110.592 0Z" p-id="6605" fill="#5e6d82"></path></svg>
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

</template>

<style lang="scss" scoped>
@import "@/assets/scss/home.scss";
</style>