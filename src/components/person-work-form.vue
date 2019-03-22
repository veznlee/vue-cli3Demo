<template>
  <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
    <FormItem label="起始时间" prop="beginDate">
      <DatePicker type="date" size="large" placement="bottom-end" v-model="formCustom.beginDate" placeholder="" :clearable="true"
       style="width:100%;" @on-change="selectBeginDate"></DatePicker>
    </FormItem>
    <FormItem label="终止时间" prop="endDate">
      <DatePicker type="date" size="large" placement="bottom-end" v-model="formCustom.endDate" placeholder="" :clearable="true"
       style="width:100%;" @on-change="selectEndDate"></DatePicker>
    </FormItem>
    <FormItem label="所在单位" prop="workUnit">
      <Input type="text" v-model="formCustom.workUnit" size="large"/>
    </FormItem>
    <FormItem label="担任职务" prop="workPost">
      <Input type="text" v-model="formCustom.workPost" size="large"/>
    </FormItem>
  </Form>
</template>

<script>
  export default {
    props:{
      formData:{
        type:Object,
        default:function(){
          return {
            beginDate: '',
            endDate: '',
            workUnit: '',
            workPost:''
          }
        }
      }
    },
    data () {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password'));
        } else {
          if (this.formCustom.passwdCheck !== '') {
              // 对第二个密码框单独验证
              this.$refs.formCustom.validateField('passwdCheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('Please enter your password again'));
        } else if (value !== this.formCustom.passwd) {
            callback(new Error('The two input passwords do not match!'));
        } else {
            callback();
        }
      };
      const validateAge = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('Age cannot be empty'));
        }
        // 模拟异步验证效果
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('Please enter a numeric value'));
          } else {
            if (value < 18) {
              callback(new Error('Must be over 18 years of age'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
            
      return {
        ruleCustom: {
          passwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          passwdCheck: [
            { validator: validatePassCheck, trigger: 'blur' }
          ],
          age: [
            { validator: validateAge, trigger: 'blur' }
          ],
          required:[
            { required: true, message: '必填项不能为空', trigger: 'blur' }
          ],
          beginDate: [
            { required: true, message: '必填项不能为空', trigger: 'blur' }
          ],
          endDate: [
            { required: true, message: '必填项不能为空', trigger: 'blur' },
          ],
          workUnit: [
            { required: true, message: '必填项不能为空', trigger: 'blur' }
          ],
          workPost: [
            { required: true, message: '必填项不能为空', trigger: 'blur' },
          ]
        }
      }
    },
    computed:{
      formCustom(){
        return this.formData
      }
    },
    methods: {
      selectBeginDate(date,type){
        this.formCustom.beginDate = date;
      },
      selectEndDate(date,type){
        this.formCustom.endDate = date;
      },
      handleSubmit () {
        this.$refs.formCustom.validate((valid) => {
          if (valid) {
            this.$emit('submit',this.formCustom);
          } else {
            return false;
          }
        })
      },
      handleReset () {
        this.$refs.formCustom.resetFields();
      }
    }
  }
</script>
