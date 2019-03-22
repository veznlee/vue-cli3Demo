<template>
  <div class="module-table-card">
    <div class="card-header clearfix">
      <div class="title">{{title}}</div>
      <div class="btn-box">
        <Button type="primary" size="large" :disabled="btnDisabled" @click="openFileEdit" v-if="btnVisible">添加</Button>
      </div>
    </div>
    <Table highlight-row stripe border :columns="attachFileColumns" :data="attachFileList" no-data-text="暂无附件"></Table>
    <Modal
      v-model="fileModal"
      title="添加证明附件">
      <Form ref="formCustom" :model="formCustom" :label-width="50" v-if="hackReset">
        <div class="ivu-form-item">
          <label class="ivu-form-item-label" style="width: 50px;">文件</label>
          <div class="ivu-form-item-content" style="margin-left: 50px;">
            <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type">
              <div class="ivu-upload">
                <div class="clearfix form-inline-upload">
                  <div class="forge-upload-btn">
                    <input type="file" multiple="multiple" @change="changeFile($event)">
                    <button type="button" class="ivu-btn ivu-btn-default">
                      <i class="ivu-icon ivu-icon-ios-cloud-upload-outline"></i>
                      <span>选择文件</span>
                    </button>
                  </div>
                  <div class="upload-result" v-show="uploadSuccess">
                    <span class="text-success">上传成功</span>
                  </div>
                  <div class="upload-result" v-show="uploadFail">
                    <span class="text-danger">上传失败</span>
                    <span style="cursor:pointer;" @click="uploadFile">重试</span>
                  </div>
                </div>
                <ul class="ivu-upload-list">
                  <li v-for="(item, index) in selectFile" :key="index" class="ivu-upload-list-file ivu-upload-list-file-finish">
                    <span>{{item.name}}</span>
                    <i class="ivu-icon ivu-icon-ios-close ivu-upload-list-remove" @click="deleteFormFile(item,index)"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <FormItem label="备注">
          <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="formCustom.remark" size="large"/>
        </FormItem>
      </Form>
      <div slot="footer" style="text-align:left;">
        <Button type="primary" size="large" @click="submitFileEdit">确定</Button>
        <Button type="error" size="large" @click="cancelFileEdit">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import proveFileUrl from "@/config/lzarchives.url.js"
export default {
  props:{
    entityId:{
      type:[Number,String],
      default:0,
    },
    fileType:{
      type:[Number,String],
      default:1,
    },
    title:{
      type:String,
      default:'附件证明材料'
    },
    btnDisabled:{
      type:Boolean,
      default:false
    },
    btnVisible:{
      type:Boolean,
      default:true
    },
    urls:{
      type:Object,
      default:function(){
        return {
          upload:proveFileUrl.fileUpload,
          download:proveFileUrl.downProveFile,
          save:proveFileUrl.attachProveFile,
          list:proveFileUrl.proveFileList,
          delete:''
        }
      }
    }
  },
  data(){
    return{
      personId:0,
      fileModal:false,
      hackReset:true,
      formCustom:{
        remark:''
      },
      attachFileColumns:[
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '创建日期',
          key: 'createTime',
          align: 'center'
        },
        {
          title: '文件名',
          key: 'fileName',
          align: 'center'
        },
        {
          title: '备注',
          key: 'remark',
          align: 'center'
        },
        {
          title: '文件',
          key: 'filePath',
          align: 'center',
          width: 100,
          render: (h, params) => {
            if(params.row.id != 0){
              return h('Button', {
                props: {
                  type: 'default',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.downLoad(params.row)
                  }
                }
              }, '下载 预览')
            }
          }
        }
      ],
      attachFileList:[],
      uploadSuccess:false,
      uploadFail:false,
      selectFile:[],
      formFile:[]
    }
  },
  methods:{
    changeFile(el){
      let files = el.target.files;
      if(files.length){
        this.uploadSuccess = false;
        this.uploadFail = false;
        this.selectFile[0] = files[0];
        this.uploadFile();
      }
    },
    uploadFile(){
      let file = this.selectFile[0];
      let param = new FormData();
      param.append('file',file,file.name);
      this.$thttp({
        method:'file',
        url:this.urls.upload,
        data:param
      })
      .then(data=>{
        if(data.code*1 == 0){
          this.formFile[0] = data.data;
          this.uploadSuccess = true;
          this.uploadFail = false;
        }else{
          this.uploadSuccess = false;
          this.uploadFail = true;
        };
      },err=>{
        this.uploadSuccess = false;
        this.uploadFail = true;
      });
    },
    deleteFormFile(file,index){
      this.uploadSuccess = false;
      this.uploadFail = false;
      this.selectFile = [];
      this.formFile = [];
    },
    removeListItem (row) {
      this.$thttp({
        url:this.urls.delete+'/'+row.id,
        method:'delete'
      }).then(data=>{
        if(data.code*1 == 0){
          this.$Message.success('删除成功');
          this.attachFileList.splice(index,1);
        }else{
          this.$Message.warning(data.msg);
        }
      })
    },
    downLoad(rowData){
      this.$downFile(rowData.filePath);
    },
    openFileEdit(){
      this.fileModal = true;
    },
    submitFileEdit(){
      if(!this.formFile.length){
        this.$Message.warning('请先上传文件');
        return;
      }
      this.fileModal = false;
      this.resetModal();
      let obj = this.formCustom;
      obj.personalId = this.personId;
      obj.fileName = this.formFile[0].fileName;
      obj.filePath = this.formFile[0].filePath;
      obj.fileType = this.fileType;
      this.$thttp({
        url:this.urls.save,
        method:'post',
        data:obj
      }).then(data=>{
        if(data.code*1 == 0){
          this.getFileList();
        }else{
          this.$Message.warning(data.msg);
        }
      });
    },
    cancelFileEdit(){
      this.fileModal = false;
      this.resetModal();
    },
    resetModal(){
      this.hackReset = false;
      this.uploadSuccess = false;
      this.uploadFail = false;
      this.selectFile = [];
      this.formFile = [];
      this.formCustom = {
        remark:''
      };
      this.$nextTick(() => {
        this.hackReset = true;
      })
    },
    getFileList(){
      this.$thttp({
        method:'post',
        url:this.urls.list,
        data:{
          page:1,
          pageSize:30,
          personalId:this.personId,
          fileType:this.fileType
        }
      }).then(data=>{
        if(data.code*1 == 0){
          this.attachFileList = data.data;
        }
      })
    }
  },
  watch:{
    entityId: {
      handler(newValue, oldValue) {
        this.personId = newValue;
        if(this.personId*1 != 0){
          this.getFileList();
        }
      },
      immediate:true
    }
  }
}
</script>