<template>
  <div class="home">
    <div class="home-top"></div>
    <div class="home-nav-container">
       <div class="home-nav-card">
         <div class="card-title">
           <i class="home-nav-icon icon-yw"></i><span>业务</span>
         </div>
         <div class="card-body">
           <ul class="home-nav-list clearfix">
             <li class="nav-item">
               <router-link :to="{name:'jd-person'}" class="router-xfjb">
                 <span>信访举报</span>
               </router-link>
             </li>
             <li class="nav-item">
               <router-link :to="{name:'jd-person'}" class="router-jdgl">
                 <span>监督管理</span>
               </router-link>
             </li>
             <li class="nav-item">
               <router-link :to="{name:'jd-person'}" class="router-zjsc">
                 <span>执纪审查</span>
               </router-link>
             </li>
             <li class="nav-item">
               <router-link :to="{name:'jd-person'}" class="router-slzj">
                 <span>审理执纪</span>
               </router-link>
             </li>
             <li class="nav-item">
               <router-link :to="{name:'jd-person'}" class="router-xsxc">
                 <span>巡视巡查</span>
               </router-link>
             </li>
             <li class="nav-item">
               <router-link :to="{name:'jd-person'}" class="router-lzda">
                 <span>廉政档案</span>
               </router-link>
             </li>
             <li class="nav-item">
               <router-link :to="{name:'jd-person'}" class="router-bgzd">
                 <span>请示报告制度</span>
               </router-link>
             </li>
             <li class="nav-item">
               <router-link :to="{name:'jd-person'}" class="router-bbba">
                 <span>报备备案</span>
               </router-link>
             </li>
              <li class="nav-item">
               <router-link :to="{name:'jd-person'}" class="router-lzyt">
                 <span>廉政约谈</span>
               </router-link>
             </li>
             <li class="nav-item">
               <router-link :to="{name:'jd-person'}" class="router-lzfx">
                 <span>廉政风险防控</span>
               </router-link>
             </li>
             <li class="nav-item">
               <router-link :to="{name:'jd-person'}" class="router-jcgz">
                 <span>基础工作</span>
               </router-link>
             </li>
           </ul>
         </div>
       </div>
       <div class="home-nav-card">
         <div class="card-title">
           <i class="home-nav-icon icon-set"></i><span>设置</span>
         </div>
         <div class="card-body">
           <ul class="home-nav-list clearfix">
             <li class="nav-item">
               <router-link :to="{name:'jd-person'}" class="router-ypsz">
                 <span>研判设置</span>
               </router-link>
             </li>
             <li class="nav-item">
               <router-link :to="{name:'jd-person'}" class="router-xtsz">
                 <span>系统设置</span>
               </router-link>
             </li>
           </ul>
         </div>
       </div>
    </div>
    <div class=""></div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  }
}
</script>

<style scoped lang="scss">
  .home{
    width:100%;
    min-width:1600px;
  }
  .home-top{
    width:100%;
    height:375px;
    background:url(../assets/img/home_top_bg.jpg) no-repeat;
    background-position: center center;
  }
  .home-nav-container{
    width:1240px;
    padding:20px 0;
    margin: 0 auto;
  }
  .home-nav-card{
    .home-nav-icon{
      display:inline-block;
      width:24px;
      height:24px;
      margin-right:10px;
      margin-top:-3px;
      vertical-align: middle;
      &.icon-yw{
        background:url(../assets/img/home-yw.png) no-repeat;
      }
      &.icon-set{
        background:url(../assets/img/home-setting.png) no-repeat;
      }
    }
    .card-title{
      margin-top:10px;
      height:60px;
      padding:15px 16px;
      line-height: 30px;
      font-size:24px;
      color:#171A29;
      border-bottom:1px solid #ACCEFF;
    }
    .card-body{
      padding:10px 0;
      width:100%;
      overflow:hidden;
    }
  }
  .home-nav-list{
    width:1260px;
    margin-left:-10px;
    .nav-item{
      float:left;
      width:158px;
      height:158px;
      margin:23px 26px;
      border:1px solid #4DB4FC;
      border-radius: 10px;
      // transition: all 2s ease;
      &:hover{
        transform: translate3d(-2px,-2px,0);
        box-shadow:0 0 35px 0 rgba(61,171,251,0.29);
      }
      &>a{
        display:block;
        height:100%;
        padding-top:105px;
        text-align: center;
        font-size:20px;
      }
    }
  }
  .router-{
    &xfjb{
      background:url(../assets/img/router-xfjb.png) no-repeat;
    }
    &jdgl{
      background:url(../assets/img/router-jdgl.png) no-repeat;
    }
    &zjsc{
      background:url(../assets/img/router-zjsc.png) no-repeat;
    }
    &slzj{
      background:url(../assets/img/router-slzj.png) no-repeat;
    }
    &xsxc{
      background:url(../assets/img/router-xsxc.png) no-repeat;
    }
    &lzda{
      background:url(../assets/img/router-lzda.png) no-repeat;
    }
    &bgzd{
      background:url(../assets/img/router-bgzd.png) no-repeat;
    }
    &bbba{
      background:url(../assets/img/router-bbba.png) no-repeat;
    }
    &lzyt{
      background:url(../assets/img/router-lzyt.png) no-repeat;
    }
    &lzfx{
      background:url(../assets/img/router-lzfx.png) no-repeat;
    }
    &jcgz{
      background:url(../assets/img/router-jcgz.png) no-repeat;
    }
    &ypsz{
      background:url(../assets/img/router-ypsz.png) no-repeat;
    }
    &xtsz{
      background:url(../assets/img/router-xtsz.png) no-repeat;
    }
  }
</style>
