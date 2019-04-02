<template>
  <!-- <div class="home">
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
  </div> -->

  <div class="fh-full-scroll module-top-nav-container f-pr">
    <div class="module-top-nav home-nav">
      <div class="nav-inner clearfix">
        <div class="nav-head">
          <router-link class="icon-box" :to="{name:'home'}">
            <i class="app-icon app-icon-index"></i>
          </router-link>
          <span class="text">纪委政务办公及政治研判平台</span>
        </div>
        <div class="nav-body">
          <div class="system-info-wrap clear-fix">
            <ul class="sys-info-list">
              <li class="sys-item">
                <div class="user-info clearfix" @mouseenter="openMenu" @mouseleave="closeMenu">
                  <div class="user-head img-box">
                    <!-- <img src="/assets/source/user_head.png" alt="用户头像"> -->
                  </div>
                  <div class="user-name">{{user.realName}}</div>
                  <transition name="fade">
                    <div class="user-menu" v-show="menuIsOpen">
                      <ul>
                        <li class="user-menu-item">修改密码</li>
                      </ul>
                    </div>
                  </transition>
                </div>
              </li>
              <li class="sys-item">
                <div class="login-out">
                  <span class="login-out-btn" @click="loginOut">退出</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
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
import userHead from "@/assets/source/user_head.png"
import updatePassword from "@/components/update-password.vue"
import '@/assets/app.scss'
import { mapGetters } from 'vuex'
export default {
  components:{
    updatePassword
  },
  data(){
    return{
      menu:[],
      user:{
        realName:'',
        username:''
      },
      menuIsOpen:false
    }
  },
  created(){
    this.getMenu();
    this.getUser();
  },
  methods:{
    ...mapGetters([
      'getToken'
    ]),
    getMenu(){
      this.menu = this.$storage.getLocalObj('_app_permission');
    },
    getUser(){
      const user = this.$storage.getLocalObj('_app_user');
      if(user){
        this.user = user;
      }
    },
    toChild(item){
      if(item.children && item.children[0]){
        let first = item.children[0];
        this.$router.push({name:first.name});
      }
    },
    doLoginOut(){
      this.$storage.removeLocal('_app_user');
      this.$storage.removeLocal('_app_permission');
      this.$storage.removeLocal('accessToken');
      this.$router.push({name:'login'});
    },
    loginOut(){
      let token = this.$storage.getLocal('accessToken');
      let _this = this;
      this.$http({
        url:this.$urlConfig.serverUrl+this.$urlConfig.loginOut,
        headers:{token:token}
      }).then(data=>{
        _this.doLoginOut();
      }).catch(function (error) {
        _this.doLoginOut();
      });
    },
    openMenu(){
      this.menuIsOpen = true;
    },
    closeMenu(){
      this.menuIsOpen = false;
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

  .module-top-nav.home-nav{
    .nav-inner{
      width:1240px;
    }
    .nav-head{
      width:440px;
    }
    .nav-body{
      width:800px;
    }
  }

  .system-info-wrap{
    .sys-info-list{
      float:right;
      padding:20px 0;
    }
    .sys-item{
      float:left;
      padding:3px 10px;
      margin-left:10px;
    }
    .user-info{
      position:relative;
      font-size:20px;
      color:#fff;
      cursor:pointer;
      .user-head{
        float:left;
        width:40px;
        height:40px;
        border-radius: 50%;
        overflow: hidden;
        background:url(../assets/source/user_head.png) no-repeat;
        img{
          width:40px;
          height:40px;
        }
      }
      .user-name{
        float:left;
        margin-left:15px;
        line-height:40px;
      }
      .user-menu{
        width:186px;
        position:absolute;
        left:0;
        top:100%;
        padding-top:23px;
        background:#108ff5;
      }
      .user-menu-item{
        height:56px;
        padding:10px 40px;
        line-height: 36px;
        font-size:20px;
        background: #31A2FC;
        transition: all 0.5s ease-out;
        &:hover{
          background:#108FF5;
        }
      }
    }
    .login-out{
      padding:6px 0;
    }
    .login-out-btn{
      display:inline-block;
      width:60px;
      height:28px;
      border:1px solid rgba(255,255,255,1);
      border-radius:14px;
      line-height: 26px;
      text-align: center;
      font-size:16px;
      color:#fff;
      cursor:pointer;
      transition: all 0.5s ease-out;
      &:hover{
        box-shadow: inset 0 0 6px 0 #fff;
      }
    }
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
