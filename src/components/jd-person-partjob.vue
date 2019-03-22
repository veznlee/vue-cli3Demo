<template>
  <!--兼职-->
  <div class="detail-tab-container">
    <div class="module-table-card">
      <div class="card-header clearfix">
        <div class="title">在企事业单位、社会团体或其他营利性组织中兼职情况</div>
        <div class="btn-box">
          <!-- <Button type="success" size="large">打印</Button> -->
          <Button type="primary" size="large" @click="addInfo" v-if="canEdit">添加</Button>
        </div>
      </div>
      <div>
        <Table highlight-row stripe border :columns="tableColumns" :data="dataList"></Table>
      </div>
    </div>
    <attach-prove-file :entity-id="personId" :file-type="5" :btn-visible="canEdit"></attach-prove-file>
    <Modal
      v-model="addInfoModal"
      :width="1344"
      :closable="false"
      :mask-closable="false"
      >
      <person-info-add ref="addInfoComponent" 
        v-if="hackReset" 
        add-type="5" 
        title="添加兼职情况" 
        :table-columns="addInfoTableColumns"
        empty-tip="请添加兼职情况！" 
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
        :detail-url="urls.jdperson.parttimeJobDetail"
        :view-id="viewItemId"
        title="查看兼职情况"></person-info-view>
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
          title: '兼职单位名称',
          key: 'ptCompany',
          align: 'center'
        },{
          title: '兼职单位性质',
          key: 'ptCompanyNature',
          align: 'center'
        },{
          title:'兼任职务',
          key: 'ptTask',
          align: 'center'
        },{
          title:'组织批复文号',
          key: 'orgReplayNum',
          align: 'center'
        },{
          title:'年取酬（元）',
          key: 'yearSalary',
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
          title: '兼职单位名称',
          key: 'ptCompany',
          align: 'center'
        },{
          title: '兼职单位性质',
          key: 'ptCompanyNature',
          align: 'center'
        },{
          title:'兼任职务',
          key: 'ptTask',
          align: 'center'
        },{
          title:'组织批复文号',
          key: 'orgReplayNum',
          align: 'center'
        },{
          title:'年取酬（元）',
          key: 'yearSalary',
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
          url:this.urls.jdperson.saveParttimeJob,
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
          url:this.urls.jdperson.parttimeJobList,
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
