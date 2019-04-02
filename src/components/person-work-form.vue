<template>
  <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
    <FormItem label="起始时间" prop="beginDate">
      <DatePicker type="date" 
      size="large" 
      placement="bottom-end" 
      v-model="formCustom.beginDate" 
      placeholder="" 
      :options="maxTodayOption"
      :clearable="true"
      style="width:100%;"
      @on-change="selectBeginDate"></DatePicker>
    </FormItem>
    <FormItem label="终止时间" prop="endDate">
      <DatePicker type="date" 
      size="large" 
      placement="bottom-end" 
      v-model="formCustom.endDate" 
      placeholder="" 
      :options="maxTodayOption"
      :clearable="true"
      style="width:100%;" 
      @on-change="selectEndDate"></DatePicker>
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
      return {
        ruleCustom: {
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
        },
        maxTodayOption:{
          disabledDate (date) {
            return date && date.valueOf() >= (new Date()).getTime();
          }
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
