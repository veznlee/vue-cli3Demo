<template>
  <div class="tree-sel-container">
    <Tree ref="elTree" :data="treeData" show-checkbox></Tree>
  </div>
</template>

<script>
export default {
  props:{
    url:{
      type:String,
      required:true
    },
    actionId:{
      type:[String,Number],
      default:''
    },
    multiple:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      treeData:[]
    }
  },
  methods:{
    getTree(){
      this.$thttp({
        method:'get',
        url:this.url+this.actionId
      }).then(data=>{
        if(data.code*1 == 0){
          this.treeData = data.data;
        };
      })
    },
    handleSubmit(){
      this.$emit('submitTree',[...this.$refs.elTree.getCheckedNodes()]);
    },
    handleSubmitCAINodes(){
      this.$emit('submitTree',[...this.$refs.elTree.getCheckedAndIndeterminateNodes()]);
    }
  }
}
</script>

<style lang="scss" scoped>
  .tree-sel-container{
    height:300px;
    max-height: 500px;
    overflow: auto;
    .ivu-tree ul{
      font-size:14px;
    }
  }
</style>
