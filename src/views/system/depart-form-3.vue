<template>
  <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
    <FormItem label="部门名称" prop="deptAllName">
      <Input type="text" v-model="formCustom.deptAllName" size="large" :maxlength="30" :readonly="isView"/>
    </FormItem>
    <FormItem label="部门简称" prop="deptName">
      <Input type="text" v-model="formCustom.deptName" size="large" :maxlength="30" :readonly="isView"/>
    </FormItem>
    <FormItem label="上级部门" class="f-pr">
      <treeselect v-model="formCustom.pid" 
      :multiple="false" 
      :options="options"
      placeholder="请选择" 
      :required="true"
      no-children-text="没有子节点"
      no-options-text="没有可选项">
        <!-- <label slot="option-label" slot-scope="{ node }">{{ node.title }}</label> -->
      </treeselect>
    </FormItem>
  </Form>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import urls from "@/config/system.url.js"
  export default {
    components: { Treeselect },
    props:{
      formData:{
        type:Object,
        default:function(){
          return {
            deptAllName: '',
            deptName: '',
            pidText: '',
            pid:-1
          }
        }
      },
      isView:{
        type:Boolean,
        default:false
      }
    },
    data () {
      const requiredRule = { required: true, message: '必填项不能为空', trigger: 'blur' };
      return {
        ruleCustom: {
          deptAllName:[requiredRule],
          pid:[requiredRule]
        },
        treeData:[],
        options: [{
          label:'顶级部门',
          title:'顶级部门',
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
      getDepartTree(){
        this.$thttp({
          url:urls.depart.tree,
          method:'get'
        }).then(data=>{
          if(data.code*1 == 0){
            //this.$set(this.options,'children',data.data);
            this.options[0].children = data.data;
          }else{
            this.$Message.warning(data.msg);
          }
        })
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
