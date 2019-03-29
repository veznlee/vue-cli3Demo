<template>
  <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
    <FormItem label="用户名" prop="username">
      <Input type="text" v-model="formCustom.username" size="large" :maxlength="10" :readonly="isView"/>
    </FormItem>
    <FormItem label="真实姓名" prop="realName">
      <Input type="text" v-model="formCustom.realName" size="large" :maxlength="5" :readonly="isView"/>
    </FormItem>
    <FormItem label="电话" prop="phone">
      <Input type="text" v-model="formCustom.phone" size="large" :maxlength="11" :readonly="isView"/>
    </FormItem>
    <FormItem label="地址">
      <Input type="text" v-model="formCustom.address" size="large" :maxlength="30" :readonly="isView"/>
    </FormItem>
    <FormItem label="email" prop="email">
      <Input type="text" v-model="formCustom.email" size="large" :maxlength="20" :readonly="isView"/>
    </FormItem>
    <FormItem label="所属部门" class="f-pr" prop="departmentText">
      <div class="f-pr"  v-clickoutside="closeDeptSel">
        <Input type="text" v-model="formCustom.departmentText" size="large" :maxlength="30" readonly @on-focus="openDeptSel"/>
        <transition name="transition-drop">
          <div v-show="deptsel" class="diy-tree-sel-wrap" >
            <Tree :data="treeData" @on-select-change="departSelect"></Tree>
          </div>
        </transition>
      </div>
    </FormItem>
  </Form>
</template>

<script>
  import urls from "@/config/system.url.js"
  import util from "@/libs/util.js"
  export default {
    props:{
      formData:{
        type:Object,
        required:true
      },
      isView:{
        type:Boolean,
        default:false
      }
    },
    data () {
      const userNameValid = (rule, value, callback) => {
        if (!/^[a-zA-Z][a-zA-Z0-9_\-]{2,}$/.test(value)) {
          callback(new Error('该选项输入不合法'));
        } else {
          callback();
        }
      };
      const realNameValid = (rule, value, callback) => {
        if (!/^[\u4E00-\u9FA5\u9FA6-\u9FBB]{2,6}$/.test(value)) {
          callback(new Error('该选项输入不合法'));
        } else {
          callback();
        }
      };
      const phoneValid = (rule, value, callback) => {
        if ((value+"" != '') && !/^1[345789]\d{9}$/.test(value+"")) {
          callback(new Error('该选项输入不合法'));
        } else {
          callback();
        }
      };
      const requiredRule = { required: true, message: '必填项不能为空', trigger: 'blur' };
      return {
        deptsel:false,
        ruleCustom: {
          username:[requiredRule,{validator:userNameValid,trigger:'blur'}],
          realName:[requiredRule,{validator:realNameValid,trigger:'blur'}],
          email:[
            { type: 'email', message: '该选项输入不合法', trigger: 'blur' }
          ],
          phone:[{validator:phoneValid,trigger:'blur'}],
          departmentText:[requiredRule]
        },
        treeData:[{
          label:'组织机构',
          title:'组织机构',
          id:-1,
          children:[]
        }]
      }
    },
    computed:{
      formCustom(){
        return this.formData
      }
    },
    watch:{
      formData:{
        handler(newValue, oldValue){
          this.getDepartTree();
        },
        immediate:true
      }
    },
    methods: {
      setCheckedFlag(arr,id){
        function filterArr(arr,id){
          for(let i = 0;i<arr.length;i++){
            if(arr[i].id == id){
              arr[i].selected = true;
              break;
            }else{
              if(arr[i].children && arr[i].children.length){
                filterArr(arr[i].children,id);
              }
            }
          }
        }
        filterArr(arr,id);
        return arr;
      },
      getDepartTree(){
        this.$thttp({
          url:urls.depart.tree,
          method:'get'
        }).then(data=>{
          if(data.code*1 == 0){
            this.treeData[0].children = data.data;
            this.treeData = this.setCheckedFlag(this.treeData,this.formCustom.pid);
          }else{
            this.$Message.warning(data.msg);
          }
        })
      },
      openDeptSel(){
        if(this.isView) return false;
        this.deptsel = true;
      },
      closeDeptSel(){
        this.deptsel = false;
      },
      departSelect(array,node){
        this.deptsel = false;
        this.formCustom.department = node.id;
        this.formCustom.departmentText = node.title;
      },
      format (labels, selectedData) {
        const index = labels.length - 1;
        const data = selectedData[index] || false;
        if (data && data.code) {
          return labels[index] + ' - ' + data.code;
        }
        return labels[index];
      },
      handleSubmit () {
        console.log(this.formCustom);
        this.$refs.formCustom.validate((valid) => {
          if (valid) {
            console.log(this.formCustom);
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

<style lang="scss">
  .ivu-form-item-error .vue-treeselect__control{
    border: 1px solid #ed4014;
  }
  .diy-tree-sel-wrap{
    position: absolute;
    top: 100%;
    z-index: 2;
    margin-top: 2px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    background: #fff;
    width: 100%;
    max-height: 180px;
    padding-left:5px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    transform-origin: center top 0px;
    overflow-y: auto;
    .ivu-tree ul li{
      margin:0;
    }
  }
</style>
