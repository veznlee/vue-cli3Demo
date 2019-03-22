<template>
  <!--礼品礼金情况-->
  <div class="detail-tab-container">
    <div class="module-table-card">
      <div class="card-header clearfix">
        <div class="title">拒收或上交礼品、礼金情况</div>
        <div class="btn-box">
          <!-- <Button type="success" size="large">打印</Button> -->
          <Button type="primary" size="large" @click="addInfo" v-if="canEdit">添加</Button>
        </div>
      </div>
      <div>
        <Table highlight-row stripe border :columns="tableColumns" :data="dataList"></Table>
      </div>
    </div>
    <attach-prove-file :entity-id="personId" :file-type="3" :btn-visible="canEdit"></attach-prove-file>
    <Modal
      v-model="addInfoModal"
      :width="1344"
      :closable="false"
      :mask-closable="false"
      >
      <person-info-add ref="addInfoComponent" 
        v-if="hackReset" 
        add-type="3" 
        :excelStartRow="4"
        :table-columns="addInfoTableColumns"
        title="添加拒收礼品礼金情况"
        empty-tip="请添加拒收礼品礼金情况！" 
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
        :detail-url="urls.jdperson.refusedMoneyDetail"
        :view-id="viewItemId"
        title="查看拒收礼品礼金情况"></person-info-view>
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
          type: 'index',
          align: 'center',
          width: 60
        },{
          title: '拒收或上交礼金额',
          key: 'refusedMoneySum',
          align: 'center'
        },{
          title:'名称',
          key: 'giftName',
          align: 'center'
        },{
          title:'数量',
          key: 'giftNum',
          align: 'center'
        },{
          title:'折合价值(元)',
          key: 'giftValue',
          align: 'center'
        },{
          title: '拒收或上交时间',
          key: 'refusedDate',
          align: 'center'
        }, {
          title: '上交部门',
          key: 'receiveDept',
          align: 'center'
        },{
          title: '备注',
          key: 'remark',
          align: 'center'
        }],
        tableColumns:[{
          type: 'index',
          align: 'center',
          width: 60
        },{
          title: '创建日期',
          key: 'createTime',
          align: 'center',
          width: 116
        },{
          title: '拒收或上交礼金额',
          key: 'refusedMoneySum',
          align: 'center'
        },{
          title: '拒收或上交礼金、礼品情况  奖励机关',
          align: 'center',
          children:[
            {
              title:'名称',
              key: 'giftName',
              align: 'center'
            },{
              title:'数量',
              key: 'giftNum',
              align: 'center'
            },{
              title:'折合价值(元)',
              key: 'giftValue',
              align: 'center'
            }
          ]
        },{
          title: '拒收或上交时间',
          key: 'refusedDate',
          align: 'center',
          width: 116
        }, {
          title: '上交部门',
          key: 'receiveDept',
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
          url:this.urls.jdperson.saveRefusedMoney,
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
          url:this.urls.jdperson.refusedMoneyList,
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
