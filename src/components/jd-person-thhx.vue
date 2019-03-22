<template>
  <!--谈话函讯-->
  <div class="detail-tab-container">
    <div class="module-table-card">
      <div class="card-header clearfix">
        <div class="title">谈话函讯</div>
        <div class="btn-box">
          <!-- <Button type="success" size="large">打印</Button> -->
          <Button type="primary" size="large" @click="addInfo" v-if="canEdit">添加</Button>
        </div>
      </div>
      <div>
        <Table highlight-row stripe border :columns="tableColumns" :data="dataList"></Table>
      </div>
    </div>
    <attach-prove-file :entity-id="personId" :file-type="8" :btn-visible="canEdit"></attach-prove-file>
    <Modal
      v-model="addInfoModal"
      :width="1344"
      :closable="false"
      :mask-closable="false"
      >
      <person-info-add ref="addInfoComponent" 
        v-if="hackReset" 
        add-type="8" 
        title="添加谈话函讯情况" 
        :table-columns="addInfoTableColumns"
        empty-tip="请添加谈话函讯情况！" 
        @submit="submitInfo"></person-info-add>

      <div slot="footer" style="text-align:left;">
        <Button type="primary" size="large" @click="confirmInfo">确定</Button>
        <Button type="error" size="large" @click="cancelInfo">取消</Button>
      </div>
    </Modal>

    <Modal
      v-model="viewInfoModal"
      :width="1344"
      :closable="false"
      >
      <person-info-view ref="viewInfoComponent" 
        :table-columns="addInfoTableColumns"
        :detail-url="urls.jdperson.chatInfoDetail"
        :view-id="viewItemId"
        title="查看谈话函讯情况"></person-info-view>
      <div slot="footer" style="text-align:left;">
        <Button type="error" size="large" @click="closeViewModal">返回</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import lzArchivesMixin from '@/mixins/lzarchives.js'
  export default {
    mixins: [lzArchivesMixin],
    data(){
      return{
        addInfoTableColumns:[{
          type:'index',
          align:'center',
          width:60
        },{
          title: '谈话性质',
          key: 'chatNature',
          align: 'center'
        },{
          title: '组织部门',
          key: 'orgDept',
          align: 'center'
        },{
          title: '谈话及函讯部门',
          key:'chatDept',
          align: 'center'
        },{
          title: '谈话时间',
          key: 'chatTime',
          align: 'center',
          width: 116
        }, {
          title: '审批人',
          key: 'auditUser',
          align: 'center'
        },{
          title: '填表人',
          key: 'fillFormUser',
          align: 'center'
        },{
          title: '谈话及函讯内容',
          key: 'chatContent',
          align: 'center'
        },{
          title: '备注',
          key: 'remark',
          align: 'center'
        }],
        tableColumns:[{
          type:'index',
          align:'center',
          width:60
        },{
          title: '谈话性质',
          key: 'chatNature',
          align: 'center'
        },{
          title: '组织部门',
          key: 'orgDept',
          align: 'center'
        },{
          title: '谈话及函讯部门',
          key:'chatDept',
          align: 'center'
        },{
          title: '谈话时间',
          key: 'chatTime',
          align: 'center',
          width: 116
        }, {
          title: '审批人',
          key: 'auditUser',
          align: 'center'
        },{
          title: '填表人',
          key: 'fillFormUser',
          align: 'center'
        },{
          title: '谈话及函讯内容',
          key: 'chatContent',
          align: 'center'
        },{
          title: '备注',
          key: 'remark',
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
                  this.openViewModal(params.row)
                }
              }
            }, '查看详情')
          }
        }],
        dataList:[]
      }
    },
    methods:{
      addInfo(){
        this.addInfoModal = true;
      },
      submitInfo(obj){
        this.addInfoModal = false;
        obj.personalId = this.personId;
        obj.signatureType = 3;
        this.$thttp({
          url:this.urls.jdperson.saveChatInfo,
          method:'post',
          data:obj
        }).then(data=>{
          if(data.code*1 == 0){
            this.getInfoList();
          }else{
            this.$Message.warning(data.msg);
          }
        });
        this.resetModal();
      },
      getInfoList(){
        this.$thttp({
          method:'post',
          url:this.urls.jdperson.chatInfoList,
          data:{
            page:1,
            pageSize:30,
            personalId:this.personId
          }
        }).then(data=>{
          if(data.code*1 == 0){
            this.dataList = data.data;
          }
        })
      }
    }
  }
</script>