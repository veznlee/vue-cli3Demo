<template>
  <!--奖惩情况-->
  <div class="detail-tab-container">
    <div class="module-table-card">
      <div class="card-header clearfix">
        <div class="title">主要获奖情况</div>
        <div class="btn-box">
          <!-- <Button type="success" size="large" @click="viewImg">打印</Button> -->
          <Button type="primary" size="large" @click="addReward" v-if="canEdit">添加</Button>
        </div>
      </div>
      <div>
        <Table highlight-row stripe border :columns="rewardColumns" :data="rewardList"></Table>
      </div>
    </div>
    <div class="module-table-card">
      <div class="card-header clearfix">
        <div class="title">主要惩处情况</div>
        <div class="btn-box">
          <!-- <Button type="success" size="large">打印</Button> -->
          <Button type="primary" size="large" @click="addPunish" v-if="canEdit">添加</Button>
        </div>
      </div>
      <div>
        <Table highlight-row stripe border :columns="punishColumns" :data="punishList"></Table>
      </div>
    </div>
    <attach-prove-file :entity-id="personId" :file-type="2" :btn-visible="canEdit"></attach-prove-file>

    <!--添加奖励情况-->
    <Modal
      v-model="rewardModal"
      :width="1344"
      :closable="false"
      :mask-closable="false"
      >
      <person-info-add ref="rewardForm"  
      v-if="hackReset"
      :add-type="1"
      :table-columns="addRewardTableColumns"
      title="添加奖励情况"
      empty-tip="请添加奖励情况" 
      @submit="submitReward"></person-info-add>
      <div slot="footer" style="text-align:left;">
        <Button type="primary" size="large" @click="confirmReward">确定</Button>
        <Button type="error" size="large" @click="cancelReward">取消</Button>
      </div>
    </Modal>

    <!--添加惩处情况-->
    <Modal
      v-model="punishModal"
      :width="1344"
      :closable="false"
      :mask-closable="false"
      >
      <person-info-add ref="punishForm" 
      v-if="hackReset" 
      :add-type="2" 
      :table-columns="addPunishTableColumns" 
      title="添加惩处情况" 
      empty-tip="请添加惩处情况" 
      @submit="submitPunish"></person-info-add>
      <div slot="footer" style="text-align:left;">
        <Button type="primary" size="large" @click="confirmPunish">确定</Button>
        <Button type="error" size="large" @click="cancelPunish">取消</Button>
      </div>
    </Modal>

    <!--查看奖励情况-->
    <Modal
      v-model="viewRewardInfoModal"
      :width="1344"
      :closable="false"
      >
      <person-info-view ref="viewRewardInfoComponent" 
        :table-columns="addRewardTableColumns"
        :detail-url="detailUrl"
        :view-id="viewRewardItemId"
        title="查看个人奖励情况"></person-info-view>
      <div slot="footer" style="text-align:left;">
        <Button type="error" size="large" @click="closeRewardViewModal">返回</Button>
      </div>
    </Modal>

    <!--查看惩处情况-->
    <Modal
      v-model="viewPunishInfoModal"
      :width="1344"
      :closable="false"
      >
      <person-info-view ref="viewPunishInfoComponent"
        :table-columns="addPunishTableColumns"
        :detail-url="detailUrl"
        :view-id="viewPunishItemId"
        title="查看个人惩处情况"></person-info-view>
      <div slot="footer" style="text-align:left;">
        <Button type="error" size="large" @click="closePunishViewModal">返回</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import personInfoView from './person-info-view.vue'
  import personInfoAdd from './person-info-add.vue'
  import attachProveFile from './attach-prove-file.vue'
  import urls from "@/config/lzarchives.url.js"
  export default {
    components:{
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
        personId:0,
        viewImgUrl:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2778971,1486507204&fm=26&gp=0.jpg',
        detailUrl:urls.jdperson.rewardPunishDetail,

        viewRewardInfoModal:false,
        viewRewardItemId:'',

        viewPunishInfoModal:false,
        viewPunishItemId:'',
        addRewardTableColumns:[{
          type: 'index',
          width: 60,
          align: 'center'
        },{
          title: '获奖时间',
          key: 'rpsDate',
          align: 'center',
          width: 116
        },{
          title: '获奖情况',
          key: 'rpsType',
          align: 'center'
        },{
          title: '获奖原因',
          key:'rpsReason',
          align: 'center'
        },{
          title: '奖励机关',
          key: 'rpsDept',
          align: 'center',
          width: 116
        }, {
          title: '文号',
          key: 'rfeNum',
          align: 'center'
        },{
          title: '备注',
          key: 'remark',
          align: 'center'
        }],
        addPunishTableColumns:[{
          type:'index',
          align: 'center',
          width: 60
        },{
          title: '惩处时间',
          key: 'rpsDate',
          align: 'center',
          width: 116
        },{
          title: '惩处情况',
          key: 'rpsType',
          align: 'center'
        },{
          title: '惩处原因',
          key:'rpsReason',
          align: 'center'
        },{
          title: '惩处机关',
          key: 'rpsDept',
          align: 'center',
          width: 116
        }, {
          title: '文号',
          key: 'rfeNum',
          align: 'center'
        },{
          title: '备注',
          key: 'remark',
          align: 'center'
        }],
        
        rewardModal:false,
        punishModal:false,
        hackReset:true,
        rewardColumns:[{
          type:'index',
          align: 'center',
          width: 60
        },{
          title: '获奖时间',
          key: 'rpsDate',
          align: 'center',
          width: 116
        },{
          title: '获奖情况',
          key: 'rpsType',
          align: 'center'
        },{
          title: '获奖原因',
          key:'rpsReason',
          align: 'center'
        },{
          title: '奖励机关',
          key: 'rpsDept',
          align: 'center',
          width: 116
        }, {
          title: '文号',
          key: 'rfeNum',
          align: 'center'
        },{
          title: '备注',
          key: 'remark',
          align: 'center'
        },{
          title: '创建时间',
          key: 'createTime',
          align: 'center'
        },{
          title: '操作',
          align: 'center',
          width: 90,
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'default',
                size: 'small'
              },
              on: {
                click: () => {
                  this.openRewardViewModal(params.row)
                }
              }
            }, '查看详情')
          }
        }],
        rewardList:[],

        punishColumns:[{
          type:'index',
          align: 'center',
          width: 60
        },{
          title: '惩处时间',
          key: 'rpsDate',
          align: 'center',
          width: 116
        },{
          title: '惩处情况',
          key: 'rpsType',
          align: 'center'
        },{
          title: '惩处原因',
          key:'rpsReason',
          align: 'center'
        },{
          title: '惩处机关',
          key: 'rpsDept',
          align: 'center',
          width: 116
        }, {
          title: '文号',
          key: 'rfeNum',
          align: 'center'
        },{
          title: '备注',
          key: 'remark',
          align: 'center'
        },{
          title: '创建时间',
          key: 'createTime',
          align: 'center'
        },{
          title: '操作',
          align: 'center',
          width: 90,
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'default',
                size: 'small'
              },
              on: {
                click: () => {
                  this.openPunishViewModal(params.row)
                }
              }
            }, '查看详情')
          }
        }],
        punishList:[],
      }
    },
    methods:{
      viewImg(){
        this.viewImgOpen = true;
      },
      addReward(){
        this.rewardModal = true;
      },
      submitReward(obj){
        this.rewardModal = false;
        obj.personalId = this.personId;
        obj.dataType = 1;
        obj.signatureType = 1;
        this.$thttp({
          url:urls.jdperson.saveRewardPunish,
          method:'post',
          data:obj
        }).then(data=>{
          if(data.code*1 == 0){
            this.getRewardList();
          }else{
            this.$Message.warning(data.msg);
          }
        });
        this.resetModal();
      },
      confirmReward(){
        this.$refs.rewardForm.handleSubmit();
      },
      cancelReward(){
        this.rewardModal = false;
        this.resetModal();
      },

      addPunish(){
        this.punishModal = true;
      },
      submitPunish(obj){
        this.punishModal = false;
        obj.personalId = this.personId;
        obj.dataType = 2;
        obj.signatureType = 2;
        this.$thttp({
          url:urls.jdperson.saveRewardPunish,
          method:'post',
          data:obj
        }).then(data=>{
          if(data.code*1 == 0){
            this.getPunishList();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
          }else{
            this.$Message.warning(data.msg);
          }
        });
        this.resetModal();
      },
      confirmPunish(){
        this.$refs.punishForm.handleSubmit();
      },
      cancelPunish(){
        this.punishModal = false;
        this.resetModal();
      },
      resetModal(){
        this.hackReset = false;
        this.$nextTick(() => {
          this.hackReset = true;
        })
      },
      getInfoList(dataParam,listName){
        this.$thttp({
          method:'post',
          url:urls.jdperson.rewardPunishList,
          data:dataParam
        }).then(data=>{
          if(data.code*1 == 0){
            this[listName] = data.data;
          }
        })
      },
      getRewardList(){
        this.getInfoList({
          page:1,
          pageSize:20,
          dataType:1,
          personalId: this.personId
        },'rewardList');
      },
      getPunishList(){
        this.getInfoList({
          page:1,
          pageSize:20,
          dataType:2,
          personalId: this.personId
        },'punishList');
      },

      // 查看详情
      openPunishViewModal(rowData){
        this.viewPunishItemId = rowData.signatureFile;
        this.viewPunishInfoModal = true;
        this.$nextTick(() => {
          this.$refs.viewPunishInfoComponent.getDetail();
        })
      },
      closePunishViewModal(){
        this.viewPunishInfoModal = false;
      },

      openRewardViewModal(rowData){
        this.viewRewardItemId = rowData.signatureFile;
        this.viewRewardInfoModal = true;
        this.$nextTick(() => {
          this.$refs.viewRewardInfoComponent.getDetail();
        })
      },
      closeRewardViewModal(){
        this.viewRewardInfoModal = false;
      }
    },
    watch:{
      entityId: {
        handler(newValue, oldValue) {
          this.personId = newValue;
          if(this.personId*1 != 0){
            this.getRewardList();
            this.getPunishList();
          }
        },
        immediate:true
      }
    }
  }
</script>