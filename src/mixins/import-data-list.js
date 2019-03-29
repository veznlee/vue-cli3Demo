import importDataList from '@/components/import-data-list.vue'

import urls from "@/config/lzarchives.url.js"
import {urlConfig} from "@/config/index.js"

export default {
  components:{
    importDataList
  },
  data(){
    return {
      urlConfig,
      urls,
      currentRow:{},
      activeId:'',
      hackReset:true,
      addInfoModal:false,
      //查看
      viewInfoModal:false,
      dataList:[]
    }
  },
  
  methods:{
    addInfo(){
      this.addInfoModal = true;
    },
    confirmInfo(){
      this.$refs.addInfoComponent.handleSubmit();
    },
    cancelInfo(){
      this.addInfoModal = false;
      this.resetModal();
    },
    resetModal(){
      this.hackReset = false;
      this.$nextTick(() => {
        this.hackReset = true;
      })
    },
    //查看详情
    openViewModal(rowData){
      // this.viewItemId = rowData.signatureFile;
      // this.viewInfoModal = true;
      // this.$nextTick(() => {
      //   this.$refs.viewInfoComponent.getDetail();
      // })
    },
    closeViewModal(){
      this.viewInfoModal = false;
    },
    del(){
      let _this = this;
      this.$Modal.confirm({
        width:300,
        title:'删除提示',
        content:'确定删除选中记录吗？',
        onOk:function(){
          _this.$thttp({
            url:_this.urls.delete+_this.activeId,
            method:'delete'
          }).then(data=>{
            if(data.code*1 == 0){
              _this.$Message.success('删除成功');
              _this.getList();
            }else{
              _this.$Message.warning('删除失败');
            }
          })
        }
      });
    }
  }
}