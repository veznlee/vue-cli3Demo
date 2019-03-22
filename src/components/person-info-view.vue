<template>
  <div>
    <div class="module-table-card">
      <div class="card-header clearfix">
        <div class="title">{{title}}</div>
      </div>
      <div>
        <Table highlight-row stripe border :columns="tableColumns" :data="dataList" :height="240"></Table>
      </div>
    </div>
    <div>
      <div class="sign-card add-file-card">
        <div class="file-card-title">
          <div class="img-box"><img :src="signFileSrc" alt="签字文件" v-if="signFile.filePath" @click="viewImg"></div>
        </div>
      </div>
      <div class="other-card add-file-card" v-show="otherFileList.length">
        <div class="file-card-body">
          <ul class="ivu-upload-list">
            <li v-for="(item, index) in otherFileList" :key="index" class="ivu-upload-list-file ivu-upload-list-file-finish">
              <a :href="imgBaseUrl+item.filePath+token"><span>{{item.filePath | filterFileName}}</span></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <view-prove-file :open="viewImgOpen" @closeImgView="viewImgOpen = false" :img-src="signFileSrc"></view-prove-file>
  </div>
</template>
<script>
  import viewProveFile from './view-prove-file.vue'
  export default {
    components:{
      viewProveFile
    },
    props:{
      tableColumns:{
        type:Array,
        required:true
      },
      title:{
        type:String,
        default:''
      },
      detailUrl:{
        type:[String,Number],
        required:true
      },
      viewId:{
        type:[String,Number],
        required:true
      }
    },
    filters:{
      filterFileName(value){
        return value.split("\\").pop();
      }
    },
    data(){
      return {
        detailId:'',
        viewImgOpen:false,
        signFileSrc:'',
        token:'',
        imgBaseUrl:'',
        dataList:[],
        signFile:{},
        otherFileList:[]
      }
    },
    created(){
      this.getDetail();
    },
    created(){
      this.token = '?token='+this.$storage.getLocal('accessToken');
      this.imgBaseUrl = this.$urlConfig.imgUrl
    },
    methods:{
      getDetail(){
        this.$thttp({
          method:'get',
          url:this.detailUrl+this.viewId
        }).then(data=>{
          if(data.code*1 == 0){
            this.dataList = data.data.dataList;
            this.otherFileList = data.data.otherDescFileList;
            this.signFile = data.data.signatureFile;
            this.signFileSrc = this.imgBaseUrl + this.signFile.filePath + this.token;
          }
        })
      },
      viewImg(){
        this.viewImgOpen = true;
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
      flex:0;
      .img-box{
        background:url(../assets/img/img_default_bg.jpg) no-repeat;
        background-size:100%;
      }
      img{
        display:block;
        width:100px;
        height:100px;
        cursor:pointer;
      }
    }
    .file-card-body{
      flex:1;
      max-height:136px;
      overflow-y: auto;
    }
  }
</style>