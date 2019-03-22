<template>
  <!--组织处理和党政纪处分情况-->
  <div class="detail-tab-container">
    <div class="module-table-card">
      <div class="card-header clearfix">
        <div class="title">组织处理和党政纪处分情况</div>
        <div class="btn-box">
          <!-- <Button type="success" size="large">打印</Button> -->
          <Button type="primary" size="large" @click="addInfo" v-if="canEdit">添加</Button>
        </div>
      </div>
      <div>
        <Table highlight-row stripe border :columns="tableColumns" :data="dataList"></Table>
      </div>
    </div>
    <attach-prove-file :entity-id="personId" :file-type="9" :btn-visible="canEdit"></attach-prove-file>
    <Modal
      v-model="addInfoModal"
      :width="1344"
      :closable="false"
      :mask-closable="false"
      >
      <person-info-add ref="addInfoComponent" 
        v-if="hackReset" 
        add-type="9" 
        :excelStartRow="4"
        title="添加组织处理和党政纪处分情况" 
        :table-columns="addInfoTableColumns"
        empty-tip="请添加组织处理和党政纪处分情况！" 
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
        :detail-url="urls.jdperson.partyPunishmentDetail"
        :view-id="viewItemId"
        title="查看组织处理和党政纪处分情况"></person-info-view>
      <div slot="footer" style="text-align:left;">
        <Button type="error" size="large" @click="closeViewModal">返回</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import lzArchivesMixin from '@/mixins/lzarchives.js'
  export default {
    mixins:[lzArchivesMixin],
    data(){
      return{
        addInfoTableColumns:[{
          type:'index',
          align:'center',
          width:60
        },{
          title: '单位',
          key: 'workUnit',
          align: 'center'
        },{
          title: '职务',
          key: 'workPost',
          align: 'center'
        },{
          title: '年龄',
          key: 'age',
          align: 'center'
        },{
          title: '主要错误事实',
          key: 'mainWrong',
          align: 'center'
        },{
          title: '处理依据',
          key: 'punishBasis',
          align: 'center'
        },{
          title:'查处单位',
          key: 'investigateUnit',
          align: 'center'
        },{
          title:'处理类别',
          key: 'punishType',
          align: 'center'
        },{
          title:'是否移交司法机关',
          key: 'transferJudicialAuthority',
          align: 'center'
        },{
          title: '通报情况',
          key: 'bulletinSituation',
          align: 'center'
        },{
          title: '处理时间',
          key: 'handlerDate',
          align: 'center',
          width: 116
        },{
          title: '处理方式',
          key: 'handlerType',
          align: 'center'
        },{
          title: '移交时间',
          key: 'transferDate',
          align: 'center',
          width: 116
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
          title: '单位',
          key: 'workUnit',
          align: 'center'
        },{
          title: '职务',
          key: 'workPost',
          align: 'center'
        },{
          title: '年龄',
          key: 'age',
          align: 'center'
        },{
          title: '主要错误事实',
          key: 'mainWrong',
          align: 'center'
        },{
          title: '处理依据',
          key: 'punishBasis',
          align: 'center'
        },{
          title: '处理情况',
          align: 'center',
          children:[
            {
              title:'查处单位',
              key: 'investigateUnit',
              align: 'center'
            },{
              title:'处理类别',
              key: 'punishType',
              align: 'center'
            },{
              title:'是否移交司法机关',
              key: 'transferJudicialAuthority',
              align: 'center'
            },{
              title: '通报情况',
              key: 'bulletinSituation',
              align: 'center'
            },{
              title: '处理时间',
              key: 'handlerDate',
              align: 'center',
              width: 116
            },{
              title: '处理方式',
              key: 'handlerType',
              align: 'center'
            },{
              title: '移交时间',
              key: 'transferDate',
              align: 'center',
              width: 116
            }
          ]
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
      submitInfo(obj){
        this.addInfoModal = false;
        obj.personalId = this.personId;
        obj.signatureType = 3;
        this.$thttp({
          url:this.urls.jdperson.savePartyPunishment,
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
          url:this.urls.jdperson.partyPunishmentList,
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