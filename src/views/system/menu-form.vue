<template>
  <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
    <FormItem label="菜单名称" prop="title">
      <Input type="text" v-model="formCustom.title" size="large" :maxlength="30" :readonly="isView"/>
    </FormItem>
    <FormItem label="路径名" prop="name">
      <Input type="text" v-model="formCustom.name" size="large" :maxlength="30" :readonly="isView"/>
    </FormItem>
    <FormItem label="路径url" prop="path">
      <Input type="text" v-model="formCustom.path" size="large" :maxlength="30" :readonly="isView"/>
    </FormItem>
    <FormItem label="图标类" prop="icon">
      <Input type="text" v-model="formCustom.icon" size="large" :maxlength="30" :readonly="isView"/>
    </FormItem>
    <FormItem label="排序" prop="menuOrder">
      <Input type="text" v-model="formCustom.menuOrder" size="large" :maxlength="3" :readonly="isView"/>
    </FormItem>
    <FormItem label="菜单类型" prop="gender">
      <RadioGroup v-model="formCustom.menuType">
        <Radio :label="1" :disabled="isView">目录</Radio>
        <Radio :label="2" :disabled="isView">链接</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="上级部门" class="f-pr">
      <div class="f-pr"  v-clickoutside="closeDeptSel">
        <Input type="text" v-model="formCustom.pidText" size="large" :maxlength="30" readonly @on-focus="openDeptSel"/>
        <input type="hidden" v-model="formCustom.pid"/>
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
      const trim = (str) => {
        str = str+'';
        return str.replace(/(^\s*)|(\s*$)/g, "");
  　　};
      const iconValid = (rule, value, callback) => {
        value = trim(value);
        if (value != '' && !/^[a-zA-Z][a-zA-z1-9_\-]+$/.test(value)) {
          callback(new Error('该选项输入不合法'));
        } else {
          callback();
        }
      };
      const orderValid = (rule, value, callback) => {
        value = trim(value)+'';
        if (value != '' && !/^(0|([1-9]{1}[0-9]*))$/.test(value)) {
          callback(new Error('该选项输入不合法'));
        } else {
          callback();
        }
      };
      const pathValid = (rule, value, callback) => {
        value = trim(value);
        if (!/^\/?[a-zA-Z][a-zA-z1-9_\-]+((\/:[a-zA-z1-9_\-]+)|(\/[a-zA-z1-9_\-]+))*$/.test(value)) {
          callback(new Error('该选项输入不合法'));
        } else {
          callback();
        }
      };
      const nameValid = (rule, value, callback) => {
        value = trim(value);
        if (!/^[a-zA-Z]+[a-zA-z1-9_\-]*$/.test(value)) {
          callback(new Error('该选项输入不合法'));
        } else {
          callback();
        }
      };
      const requiredRule = { required: true, message: '必填项不能为空', trigger: 'blur' };
      return {
        deptsel:false,
        ruleCustom: {
          title:[requiredRule],
          name:[requiredRule,nameValid],
          path:[requiredRule,pathValid],
          icon:[iconValid],
          menuOrder:[orderValid],
          pid:[requiredRule]
        },
        treeData:[{
          label:'系统菜单',
          title:'系统菜单',
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
          this.getMenuTree();
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
      getMenuTree(){
        this.$thttp({
          url:urls.menu.tree,
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
        this.formCustom.pid = node.id;
        this.formCustom.pidText = node.title;
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
