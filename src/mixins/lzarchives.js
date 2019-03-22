import viewProveFile from '@/components/view-prove-file.vue'
import personInfoAdd from '@/components/person-info-add.vue'
import personInfoView from '@/components/person-info-view.vue'
import attachProveFile from '@/components/attach-prove-file.vue'

import urls from "@/config/lzarchives.url.js"
import webConfig from "@/config/index.js"
export default {
  components:{
    viewProveFile,
    attachProveFile,
    personInfoAdd,
    personInfoView
  },
  props:{
    canEdit:{
      type:Boolean,
      default:true
    },
    entityId:{
      type:[String,Number],
      default:0
    }
  },
  data(){
    return {
      webConfig,
      urls,
      personId:0,
      hackReset:true,
      addInfoModal:false,
      viewImgOpen:false,
      viewImgUrl:'',
      //查看
      viewInfoModal:false,
      viewItemId:'',
      dataList:[]
    }
  },
  watch:{
    entityId: {
      handler(newValue, oldValue) {
        this.personId = newValue;
        if(this.personId*1 != 0){
          this.getInfoList();
        }
      },
      immediate:true
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
      this.viewItemId = rowData.signatureFile;
      this.viewInfoModal = true;
      this.$nextTick(() => {
        this.$refs.viewInfoComponent.getDetail();
      })
    },
    closeViewModal(){
      this.viewInfoModal = false;
    }
  }
}