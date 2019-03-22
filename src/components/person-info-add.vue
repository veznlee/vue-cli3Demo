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
        <Table highlight-row stripe border :columns="tableColumns" :data="dataList" :height="240"></Table>
      </div>
    </div>
    <div class="sign-card add-file-card">
      <div class="file-card-title">
        <div class="title-inner">
          <input type="file" @change="addSignFile($event)" accept="image/*">
          <div class="file-icon"></div>
          <div>添加签字确认书扫描件</div>
        </div>
      </div>
      <div class="file-card-body">
        <ul class="ivu-upload-list">
          <li v-for="(item, index) in signFileList" :key="index" class="ivu-upload-list-file ivu-upload-list-file-finish">
            <span>{{item.fileName}}</span>
            <i class="ivu-icon ivu-icon-ios-close ivu-upload-list-remove" @click="deleteSignFile(item,index)"></i>
          </li>
        </ul>
      </div>
    </div>
    <div class="other-card add-file-card">
      <div class="file-card-title">
        <div class="title-inner">
          <input type="file" @change="addOtherFile($event)" multiple="multiple">
          <div class="file-icon"></div>
          <div>添加其他说明文件</div>
        </div>
      </div>
      <div class="file-card-body">
        <ul class="ivu-upload-list">
          <li v-for="(item, index) in otherFileList" :key="index" class="ivu-upload-list-file ivu-upload-list-file-finish">
            <span>{{item.fileName}}</span>
            <i class="ivu-icon ivu-icon-ios-close ivu-upload-list-remove" @click="deleteOtherFile(item,index)"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import urls from '@/config/lzarchives.url.js'
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
      addType:{
        type:[String,Number],
        default:''
      }
    },
    data(){
      return {
        preViewSrc:'',
        dataList:[],
        signFileList:[],
        otherFileList:[]
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
          param.append('ty',this.addType);
          this.$thttp({
            method:'file',
            url:urls.importExcel,
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
      uploadFile(file,model){
        if(file.size == 0){
          this.$Message.warning(`${file.name}为空文件，不能上传`);
          return;
        }
        if(file.size > 1024*1024*20){
          this.$Message.warning(`${file.name}文件超过20M，不能上传`);
          return;
        }
        let param = new FormData();
        param.append('file',file,file.name);
        this.$thttp({
          method:'file',
          url:urls.fileUpload,
          data:param
        })
        .then(data=>{
          if(data.code*1 == 0){
            if(model == 0){
              this.signFileList = [data.data];
            }else{
              this.otherFileList.push(data.data);
            }
          }else{
            this.$Message.warning(data.msg);
          };
        });
      },
      addSignFile(el){
        let files = el.target.files;
        if(files.length){
          this.uploadFile(files[0],0);
        }
      },
      addOtherFile(el){
        let files = el.target.files;
        if(files.length){
          for(let i = 0;i<files.length;i++){
            this.uploadFile(files[i],1);
          }
        }
      },
      deleteSignFile(){
        this.signFileList = [];
      },
      deleteOtherFile(item,index){
        this.otherFileList.splice(index,1);
      },
      handleSubmit(){
        if(!this.dataList.length){
          this.$Message.warning('请添加奖励情况！');
          return;
        }
        if(!this.signFileList.length){
          this.$Message.warning('请上传签字文件！');
          return;
        }
        let arr = [];
        for(let i = 0;i<this.otherFileList.length;i++){
          arr.push(this.otherFileList[i].filePath);
        }
        let obj = {
          dataList:this.dataList,
          signatureFilePath:this.signFileList[0].filePath,
          otherDescFileList:arr
        };
        this.$emit('submit',obj);
      }
    }
  }
</script>

<style scoped lang="scss">
  .add-file-card{
    margin-top:20px;
    padding:5px;
    border:1px solid rgba(204,204,204,1);
    display: flex;
    .file-card-title{
      width:230px;
      padding: 20px;
      flex:0;
      .title-inner{
        width:190px;
        position:relative;
        font-size:18px;
        text-align: center;
        color:#333;
        cursor:pointer;
        input{
          position:absolute;
          left:0;
          top:0;
          bottom:0;
          right:0;
          width:100%;
          height:100%;
          opacity: 0;
          background: transparent;
          border:none;
          outline: none;
        }
      }
      .file-icon{
        margin:0 auto 15px;
        width:68px;
        height:66px;
      }
    }
    .file-card-body{
      flex:1;
      max-height:136px;
      overflow-y: auto;
    }
  }
  .sign-card .file-icon{
    background: url(../assets/img/upload_img.png) no-repeat;
    background-size:100%;
  }
  .other-card .file-icon{
    background: url(../assets/img/upload_file.png) no-repeat;
    background-size:100%;
  }
</style>