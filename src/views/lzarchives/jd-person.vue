<template>
  <div class="fh-full-scroll">
    <div class="table-page-wrap f-pr">
      <div class="search-line clearfix">
        <div class="search-inline-item">
          <span class="item-label">关键字</span>
          <Input v-model="searchform.searchKey" class="commom-input" placeholder="姓名/编号"/>
        </div>
        <div class="search-inline-item">
          <span class="item-label">职务</span>
          <Select v-model="searchform.workPost" class="commom-input">
            <Option v-for="item in jobList" :value="item.dictValue" :key="item.dictValue">{{ item.dictName }}</Option>
          </Select>
        </div>
        <div class="search-inline-item">
          <span class="item-label">参工时间</span>
          <DatePicker type="date" placement="bottom-end" v-model="searchform.workDate" placeholder="选择日期" :clearable="true" class="commom-input"></DatePicker>
        </div>
        <Button type="primary" class="search-btn" @click="search">搜索</Button>
      </div>
      <div class="operate-line">
        <Button type="success" size="large" @click="addNew">新增</Button>
        <Button type="error" size="large" :disabled="btnDisabled" @click="updateDetail">修改</Button>
        <Button type="warning" size="large" :disabled="btnDisabled" @click="transfer">变更</Button>
        <Button type="info" size="large" :disabled="btnDisabled" @click="viewDetail">查看</Button>
        <Button type="primary" size="large" :disabled="btnDisabled" style="width:160px;padding-left:5px;padding-right:5px;">廉洁证明材料</Button>
      </div>
      <div class="table-container bold-table-header">
        <Table highlight-row stripe :columns="columns" :data="dataList" ref="tableWrap" @on-current-change="tableRowChange"></Table>
      </div>
      <div class="pagination-container" v-show="dataTotal > page.pageSize">
        <Page :total="dataTotal" show-total :current="page.page" :page-size="page.pageSize" @on-change="pageChange"/>
      </div>
    </div>

    <Modal
      v-model="transferModal"
      title="变更个人状态"
      :closable="false"
      :mask-closable="false"
      >
      <div class=""></div>
      <div slot="footer" style="text-align:left;">
        <Button type="primary" size="large" @click="confirmTransfer">确定</Button>
        <Button type="error" size="large" @click="cancelTransfer">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import '@/assets/jd-person-detail.scss'
import {dateFormat} from '@/filter/common'
import curdMixin from '@/mixins/curd.js'
import urls from "@/config/lzarchives.url.js"

export default {
  mixins:[curdMixin],
  data(){
    return {
      openEdit:false,
      urls:urls.jdperson,
      searchform:{
        searchKey:'',
        workPost:'',
        workDate:''
      },
      jobList: [
        {
          dictValue: '',
          dictName: '请选择'
        }
      ],
      columns: [
        {
          type:'index',
          align: 'center',
          width: 80
        },
        {
          title: '姓名',
          key: 'fullName',
          align: 'center',
          width: 100
        },
        {
          title: '单位',
          key: 'workUnit',
          align: 'center',
          width: 113
        },
        {
          title: '职务',
          key: 'workPost',
          align: 'center',
          width: 126
        },
        {
          title: '任现职时间',
          key: 'currJobDate',
          align: 'center',
          width: 116
        },
        {
          title: '性别',
          key: 'sexText',
          align: 'center',
          width: 70
        },
        {
          title: '名族',
          key: 'nationText',
          align: 'center',
          width: 70
        },
        {
          title: '籍贯',
          key: 'nativePlace',
          align: 'center',
          width: 113
        },
        {
          title: '出生年月',
          key: 'birthday',
          align: 'center',
          width: 116
        },
        {
          title: '参工时间',
          key: 'workDate',
          align: 'center',
          width: 116
        },
        {
          title: '入党时间',
          key: 'joinPartyDate',
          align: 'center',
          width: 116
        },
        {
          title: '学历',
          key: 'eduBgText',
          width: 80
        },
        {
          title: '毕业时间/院校/专业',
          key: 'graduationUniversityText',
          align: 'center',
          width: 170,
          render: (h, params) => {
            return h('div', 
              { 
                class:['table-graduation-td']
              },
              [
                h('div', params.row.graduationDate),
                h('div', params.row.graduationUniversityText),
                h('div', params.row.majorText)
              ]
            );
          }
        },
        {
          title: '备注',
          align: 'center',
          key: 'remark',
          render: (h, params) => {
            return h('div', 
              { 
                class:['table-jdperson-remark']
              },
              params.row.remark?params.row.remark.slice(0,9):'无'
            )
          }
        }
      ],
      transferModal:false,
      transferStateList:[],
    }
  },
  created(){
    this.getJobSelect();
  },
  mounted(){
    // console.log(this.$refs.tableWrap);
  },
  methods:{
    getList(){
      let _this = this;
      var searchData = Object.assign({},this.searchform,this.page);
      if(searchData.workDate != ''){
        searchData.workDate = dateFormat(searchData.workDate);
      }
      this.$thttp({
        url:this.urls.list,
        data:searchData,
        method:'post'
      }).then(data=>{
        if(data.code*1 == 0){
          this.dataList = data.data;
          this.dataTotal = data.total;
          this.currentRow = {id:''};
        }else{
          this.$Message.warning(data.msg);
        }
      })
    },
    getJobSelect(){
      this.$thttp({
        url:this.$urlConfig.dataList+this.$urlConfig.dataListType.workPost,
        method:'get'
      }).then(data=>{
        if(Array.isArray(data) && data.length>0){
          data.unshift({
            dictValue: '',
            dictName: '请选择'
          });
          this.jobList = data;
        }
      })
    },
    addNew(){
      this.$router.push({
        name:'jd-person-detail',
        params:{id:0,view:0}
      })
    },
    viewDetail(){
      this.$router.push({
        name:'jd-person-detail',
        params:{id:this.currentRow.id,view:1}
      })
    },
    updateDetail(){
      this.$router.push({
        name:'jd-person-detail',
        params:{id:this.currentRow.id,view:0}
      })
    },
    transfer(){
      this.transferModal = true;
    },
    confirmTransfer(){

    },
    cancelTransfer(){
      this.transferModal = false;
    }
  }
}
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>