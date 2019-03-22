<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="account">
      <Input class="login-input" size="large" v-model="form.account" placeholder="请输入账号"></Input>
    </FormItem>
    <FormItem prop="password">
      <Input class="login-input" size="large" type="password" v-model="form.password" placeholder="请输入密码"></Input>
    </FormItem>
    <Row class="attach-line">
      <Col span="12" style="text-align:left;"><Checkbox v-model="form.rememberme">记住账号</Checkbox></Col>
      <Col span="12" style="text-align:right;"><span class="forget">忘记密码</span></Col>
    </Row>
    <FormItem>
      <Button @click="handleSubmit" type="primary" class="login-btn" size="large" long :disabled="disabled">登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    accountRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    },
    disabled:{
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        account: '',
        password: '',
        rememberme:false
      }
    }
  },
  created(){
    var loginUser = this.$storage.getLocalObj('_login_user');
    if(loginUser){
      this.form.account = loginUser.u;
      this.form.password = loginUser.p;
      this.form.rememberme = true;
    }
  },
  computed: {
    rules () {
      return {
        account: this.accountRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            account: this.form.account,
            password: this.form.password,
            rememberme: this.form.rememberme
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .login-input .ivu-input{
    font-size: 16px;
    border-width: 0 0 1px 0;
    border-radius: 0;
    &:focus{
      box-shadow: none;
    }
  }
  .ivu-form-item-error .login-input .ivu-input{
    border-width: 0 0 1px 0;
    border-radius: 0;
    &:focus{
      box-shadow: none;
    }
  }
  .attach-line{
    padding-top:10px;
    margin-bottom:30px;
  }
  .attach-line .forget{
    color:#108ff5;
    cursor:pointer;
  }
  .login-btn.ivu-btn-large{
    font-size:16px;
    padding-top:8px;
    padding-bottom:8px;
  }
</style>
