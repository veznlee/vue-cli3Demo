<template>
  <div class="home">
    <div class="home-top"></div>
    <div class="home-nav-container">
      <div class="home-nav-card" v-for="modalItem in menu" :key="modalItem.id">
        <div class="card-title">
          <i class="home-nav-icon" :class="modalItem.mata.icon"></i><span>{{modalItem.mata.title}}</span>
        </div>
        <div class="card-body">
          <ul class="home-nav-list clearfix">
            <li class="nav-item" v-for="item in modalItem.children" :key="item.id">
              <a href="javascript:;" :class="item.mata.icon" @click="toChild(item)">
                <span>{{item.mata.title}}</span>
              </a>
            </li>
          </ul>
         </div>
       </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return{
      menu:[]
    }
  },
  created(){
    this.getMenu();
    console.log(this.menu);
  },
  methods:{
    ...mapGetters([
      'getToken'
    ]),
    getMenu(){
      this.menu = this.$storage.getLocalObj('_app_permission');
    },
    toChild(item){
      if(item.children && item.children[0]){
        let first = item.children[0];
        this.$router.push({name:first.name});
      }
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
