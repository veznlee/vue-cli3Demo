<template>
  <div class="login-page">
    <div class="login-form f-usn">
      <div class="login-card clearfix">
        <div class="card-header">
          <div class="title">纪委政务办公及政治研判平台</div>
          <p>廉政为民，刚正不阿</p>
        </div>
        <div class="card-body">
          <Alert type="error" v-show="loginErr">{{loginErrMsg}}！</Alert>
          <div class="form-con">
            <login-form @on-success-valid="handleSubmit" :disabled="loginDisabled"></login-form>
            <p class="login-tip">登录即同意 <span>《条款与协议》</span></p>
          </div>
        </div>
        <div class="card-footer">还没有账号？</div>
      </div>
    </div>
  </div>
</template>
<script>
import LoginForm from '@/components/login-form'
import {urlConfig} from '@/config/index.js'
import { mapActions } from 'vuex'
export default {
  components:{
    LoginForm
  },
  data() {
    return {
      title: '登录页面',
      loginErr: false,
      loginErrMsg: '',
      loginTime: 0,
      loginDisabled: false
    }

    
  },
  created(){
    // this.$downFile('file_attachment_prove\\20190320\\测试.zip')
  },
  methods:{
    ...mapActions([
      'setUser',
      'setPermission',
      'setToken'
    ]),
    handleSubmit (obj) {
      var time = (new Date()).getTime();
      if(time - this.loginTime  < 2000 ) return;
      // this.loginDisabled = true;
      this.loginTime = time;
      var loginData = {
        username:obj.account,
        password:obj.password
      };
      this.$thttp({
        url:urlConfig.serverUrl+urlConfig.login,
        method:'post',
        data:loginData
      })
      .then(data=>{
        if(data.code *1 == 0){
          this.$storage.setLocal('accessToken',data.token);
          this.$storage.setLocalObj('_app_user',data.operator);
          this.$storage.setLocalObj('_app_permission',data.data);
          // 测试vuex
          // this.setToken(data.token);
          console.log(loginData);
          if(obj.rememberme){
            this.$storage.setLocalObj('_login_user',loginData)
          }else{
            this.$storage.removeLocal('_login_user');
          }
          this.$router.push({
            name:'home'
          });
        }else{
          this.loginErr = true;
          this.loginErrMsg = data.msg;
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .login-page{
    width:100%;
    min-width: 1430px;
    height:100%;
    padding-top:88px;
    box-sizing: border-box;
  }
  .login-form{
    width:1420px;
    height:660px;
    margin:0 auto;
    padding-right:105px;
    padding-top:78px;
    background-color:#fff;
    background:url(../assets/img/login_form_bg.jpg) no-repeat;
    background-size:100% 100%;
  }
  .login-card{
    width:432px;
    float:right;
    border: 1px solid #e9e9e9;
    border-radius: 1px;
    .card-header{
      padding:44px 0 10px 0;
      text-align: center;
      .title{
        font-size:26px;
        font-weight: bold;
        line-height: 50px;
      }
      p{
        font-size:16px;
        line-height: 36px;
        color:#666;
      }
    }
    .card-body{
      width:352px;
      margin: 0 auto;
      .ivu-alert{
        margin-bottom: 0;
      }
      .form-con{
        padding-top:10px;
      }
      .login-tip{
        line-height: 20px;
        margin-bottom: 24px;
        text-align: left;
        span{
          color:#108aed;
          cursor:pointer;
        }
      }
    }
    .card-footer{
      text-align: center;
      line-height: 56px;
      background:#f9f9f9;
    }
  }
  .login-form-item{
    .login-input{
      width:100%;
      height:20px;
    }
  }
  .color{
    color:#f00;
  }
  .login-title{
    @extend .color;
    background:'#fff'
  }
</style>