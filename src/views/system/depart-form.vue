<template>
  <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
    <FormItem label="部门名称" prop="deptName">
      <Input type="text" v-model="formCustom.deptName" size="large" :maxlength="30" :readonly="isView"/>
    </FormItem>
    <FormItem label="部门全称" prop="deptAllName">
      <Input type="text" v-model="formCustom.deptAllName" size="large" :maxlength="30" :readonly="isView"/>
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
      const requiredRule = { required: true, message: '必填项不能为空', trigger: 'blur' };
      return {
        deptsel:false,
        ruleCustom: {
          deptName:[requiredRule],
          pid:[requiredRule]
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
