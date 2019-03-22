<template>
  <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
    <FormItem label="关系" prop="relation">
      <Input type="text" v-model="formCustom.relation" size="large"/>
    </FormItem>
    <FormItem label="姓名" prop="fullName">
      <Input type="text" v-model="formCustom.fullName" size="large"/>
    </FormItem>
    <FormItem label="出生日期" prop="birthday">
      <DatePicker type="date" size="large" placement="bottom-end" v-model="formCustom.birthday" placeholder="" :clearable="true"
       style="width:100%;" @on-change="selectBirthday"></DatePicker>
    </FormItem>
    <FormItem label="政治面貌" prop="politicalBg">
      <Select v-model="formCustom.politicalBg" class="commom-input">
        <Option v-for="item in politicalList" :value="item.dictValue" :key="item.dictValue">{{ item.dictName }}</Option>
      </Select>
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
            relation:'',
            fullName: '',
            birthday:'',
            politicalBg:'',
            workUnit: '',
            workPost:''
          }
        }
      }
    },
    data () {
      const requireRule = { required: true, message: '必填项不能为空', trigger: 'blur' };
      return {
        ruleCustom: {
          relation: [
            requireRule
          ],
          fullName:[
            requireRule
          ],
          birthday: [
            requireRule
          ],
          politicalBg:[
            requireRule
          ],
          workUnit: [
            requireRule
          ],
          workPost: [
            requireRule
          ]
        },
        politicalList:[{
          dictValue:'',
          dictName:'请选择'
        }]
      }
    },
    computed:{
      formCustom(){
        return this.formData
      }
    },
    created(){
      this.getPoliticalSelect();
    },
    methods: {
      getPoliticalSelect(){
        this.$thttp({
          url:this.$urlConfig.dataList+'14',
          method:'get'
        }).then(data=>{
          if(Array.isArray(data) && data.length>0){
            data.unshift({
              dictValue: '',
              dictName: '请选择'
            });
            this.politicalList = data;
          }
        })
      },
      selectBirthday(date,type){
        this.formCustom.birthday = date;
      },
      handleSubmit () {
        this.$refs.formCustom.validate((valid) => {
          if (valid) {
            this.$emit('submitFamily',this.formCustom);
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
