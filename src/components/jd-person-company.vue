<template>
  <!--个人经商办企业情况-->
  <div class="detail-tab-container">
    <div class="module-table-card">
      <div class="card-header clearfix">
        <div class="title">个人经商办企业情况</div>
        <div class="btn-box">
          <!-- <Button type="success" size="large">打印</Button> -->
          <Button type="primary" size="large" @click="addInfo" v-if="canEdit">添加</Button>
        </div>
      </div>
      <div>
        <Table highlight-row stripe border :columns="tableColumns" :data="dataList"></Table>
      </div>
    </div>
    <attach-prove-file :entity-id="personId" :file-type="4" :btn-visible="canEdit"></attach-prove-file>
    <Modal
      v-model="addInfoModal"
      :width="1344"
      :closable="false"
      :mask-closable="false"
      >
      <person-info-add ref="addInfoComponent" 
        v-if="hackReset" 
        add-type="4" 
        title="添加个人经商办企业情况" 
        :table-columns="addInfoTableColumns"
        empty-tip="请添加个人经商办企业情况！" 
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
        :detail-url="urls.jdperson.operateCompanyDetail"
        :view-id="viewItemId"
        title="查看个人经商办企业情况"></person-info-view>
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
        personId:0,
        hackReset:true,
        addInfoModal:false,
        addInfoTableColumns:[{
          type:'index',
          align:'center',
          width:60
        },{
          title: '企业名称',
          key: 'companyName',
          align: 'center'
        },{
          title: '经营范围',
          key: 'operateRange',
          align: 'center'
        },{
          title: '注册资金（元）',
          key: 'registeredCapital',
          align: 'center'
        },{
          title: '本人出资比例',
          key: 'workUnitText',
          align: 'center'
        },{
          title: '年利润（元）',
          key: 'fullName',
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
          title: '企业名称',
          key: 'companyName',
          align: 'center'
        },{
          title: '经营范围',
          key: 'operateRange',
          align: 'center'
        },{
          title: '注册资金（元）',
          key: 'registeredCapital',
          align: 'center'
        },{
          title: '本人出资比例',
          key: 'workUnitText',
          align: 'center'
        }, {
          title: '年利润（元）',
          key: 'fullName',
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
      submitInfo(obj){
        this.addInfoModal = false;
        obj.personalId = this.personId;
        obj.signatureType = 3;
        this.$thttp({
          url:this.urls.jdperson.saveOperateCompany,
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
          url:this.urls.jdperson.operateCompanyList,
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