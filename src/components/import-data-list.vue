<template>
  <div>
    <div class="module-table-card">
      <div class="card-header clearfix">
        <div class="title">{{title}}</div>
        <div class="btn-box">
          <div class="forge-upload-btn" style="margin-left:32px;">
            <input id="import-baseinfo" type="file" name="file" accept=".xlsx" @change="importFile($event)">
            <Button type="primary" size="large" style="margin-left:0;">导入</Button>
          </div>
        </div>
      </div>
      <div>
        <Table highlight-row stripe border :columns="tableColumns" :data="dataList" :height="400"></Table>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:{
      emptyTip:{
        type:String,
        default:'请先添加数据！'
      },
      excelStartRow:{
        type:Number,
        default:3
      },
      tableColumns:{
        type:Array,
        required:true
      },
      title:{
        type:String,
        default:''
      },
      importUrl:{
        type:[String,Number],
        default:''
      }
    },
    data(){
      return {
        preViewSrc:'',
        dataList:[]
      }
    },
    methods:{
      importFile(el){
        let files = el.target.files;
        if(files.length){
          let file = files[0];
          let param = new FormData();
          param.append('file',file,file.name);
          param.append('startRow',this.excelStartRow);
          this.$thttp({
            method:'file',
            url:this.importUrl,
            data:param
          })
          .then(data=>{
            if(data.code*1 == 0){
              this.dataList = data.data;
            }else{
              this.$Message.warning(data.msg);
            };
          });
        }
      },
      handleSubmit(){
        let obj = {
          dataList:this.dataList
        };
        this.$emit('submit',obj);
      }
    }
  }
</script>