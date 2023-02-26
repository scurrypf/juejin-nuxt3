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
          <div class="content">
            <div class="content-nav">
              <div>推荐</div>
              <div>最新</div>
              <div style="border-right: none;">热榜</div>
            </div>
            <div class="content-body">
              <div class="list-tab">
                <span class="tad-write">kokomi | 1天前 | 前端</span>
              </div>
              <div class="main-content">
                <!--TODO:文章列表-->
                <router-link to="/detail" class="tittle" target="_blank">
                  计算机网络模型
                </router-link>
                <div style="margin-top: 10px;">
                   <router-link to="/detail" class="test" target="_blank">
                    安卓高级工程师「奔波儿灞取经」，通过“数据结构+计算机网络+操作系统+设计模式”，软硬兼修，深入浅出带你夯实程序员基本功！
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
</template>

<script setup>

const { data } = await useFetch('/api/test');
useHead({
  title:'掘金',
})

</script>

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
    height: 6000px;
    padding: 0 286px 0 286px;
  }
  .main{
    width: 960px;;
    padding-top: 15px;
    display: flex;
    .content{
      background-color: white;
      width: 700px;
      height: 1000px;
      .content-nav{
        height: 15px;
        padding: 15px 12px 15px 12px;
        border-bottom: 1px solid #f4f4f4;
        display: flex;;
  
        div{
          font-size: 14px;;
          color: #5e6d82;
          padding: 0 14.5px 0 14.5px;
          border-right: 1px solid #f4f4f4;
          &:hover{
            cursor: pointer;
            color: #1e80ff;
          }
        }
      }
      .content-body{
        width: 660px;
        height: 129px;
        margin: 12px 20px 0px 20px;
        border-bottom: 1px solid #f4f5f5;
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
.main-content{
  color: black;
  width: 660px;
  height: 84px;
  margin-top: 6px;
  padding-bottom: 12px;
  .tittle{
    color: black;
    text-decoration:none;
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 24px;
  }
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
}
</style>
