<template>
  <div class="table-page-wrap">
    <div class="search-line clearfix">
      <div class="search-inline-item">
        <span class="item-label">关键字</span>
        <Input v-model="searchform.searchKey" class="commom-input" placeholder="姓名、编号"/>
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
    <div class="table-container bold-table-header">
      <Table stripe :columns="columns1" :data="dataList" ref="table"></Table>
    </div>
    <div class="pagination-container" v-show="dataTotal > page.pageSize">
      <Page :total="dataTotal" show-total :current="page.page" :page-size="page.pageSize" @on-change="pageChange"/>
    </div>
  </div>
</template>

<script>
import {dateFormat} from '@/filter/common'
import urls from "@/config/lzarchives.url.js"
const jdperson = urls.jdperson;

export default {
  name:'jd-person',
  data(){
    return {
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
      columns1: [
        {
          title: '编号',
          key: 'serialNumber',
          align: 'center',
          width: 113
        },
        {
          title: '姓名',
          key: 'fullName',
          align: 'center',
          width: 113
        },
        {
          title: '单位',
          key: 'workUnitText',
          align: 'center',
          width: 113
        },
        {
          title: '职务',
          key: 'workPostText',
          align: 'center',
          width: 113
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
          key: 'nativePlaceText',
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
      dataList: [
      ],
      dataTotal:0,
      page:{
        page:1,
        pageSize:10
      }
    }
  },
  created(){
    this.getList();
    this.getJobSelect();
  },
  methods:{
    getList(){
      let _this = this;
      var searchData = Object.assign({},this.searchform,this.page);
      if(searchData.workDate != ''){
        searchData.workDate = dateFormat(searchData.workDate);
      }
      this.$thttp({
        url:jdperson.list,
        data:searchData,
        method:'post'
      }).then(data=>{
        if(data.code*1 == 0){
          this.dataList = data.data;
          this.dataTotal = data.total;
        }else{
          this.$Message.warning(data.msg);
        }
      })
    },
    getJobSelect(){
      let _this = this;
      this.$thttp({
        url:this.$urlConfig.dataList+'9',
        method:'get'
      }).then(data=>{
        if(Array.isArray(data) && data.length>0){
          data.unshift({
            dictValue: '',
            dictName: '请选择'
          });
          _this.jobList = data;
        }
      })
    },
    search(){
      this.page.page = 1;
      this.getList();
    },
    pageChange(index){
      this.page.page = index;
      this.getList();
    }
  }
}
</script>

<style lang="scss">
  .table-graduation-td{
    padding:10px 0;
  }
  .table-graduation-td>div{
    line-height:16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }
</style>