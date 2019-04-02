<template>
  <div class="detail-tab-container">
    <div class="table-page-wrap" style="width:100%;padding:0;">
      <div class="search-line clearfix" style="padding-top:0;">
        <div class="search-inline-item">
          <span class="item-label">操作类型</span>
          <Input v-model="searchform.operation" class="commom-input" placeholder="新增/修改等操作类型"/>
        </div>
        <div class="search-inline-item">
          <span class="item-label">开始时间</span>
          <DatePicker type="datetime" placement="bottom-end" v-model="searchform.beginTime" 
          placeholder="选择日期" 
          :options="maxTodayOption"
          :clearable="true" 
          class="commom-input"></DatePicker>
        </div>
        <div class="search-inline-item">
          <span class="item-label">结束时间</span>
          <DatePicker type="datetime" placement="bottom-end" v-model="searchform.endTime" 
          placeholder="选择日期" 
          :options="maxTodayOption"
          :clearable="true" 
          class="commom-input"></DatePicker>
        </div>
        <Button type="primary" class="search-btn" @click="search">搜索</Button>
      </div>
      <div class="table-container bold-table-header">
        <Table stripe :columns="tableColumns" :data="dataList" ref="table"></Table>
      </div>
      <div class="pagination-container" v-show="dataTotal > page.pageSize">
        <Page :total="dataTotal" show-total :current="page.page" :page-size="page.pageSize" @on-change="pageChange"/>
      </div>
    </div>
  </div>
</template>
<script>
import urls from '@/config/lzarchives.url.js'
export default {
  props:{
    entityId:{
      type:[String,Number],
      required:true
    }
  },
  data(){
    return {
      urls:urls.glperson,
      currentId:'',
      currentUserName:'',
      searchform:{
        username:'',
        operation:'',
        beginTime:'',
        endTime:''
      },
      maxTodayOption:{
        disabledDate (date) {
          return date && date.valueOf() >= (new Date()).getTime();
        }
      },
      tableColumns: [
        {
          title: '编号',
          type:'index',
          align: 'center',
          width: 80
        },
        {
          title: '操作人',
          key: 'username',
          align: 'center'
        },
        {
          title: '操作类型',
          key: 'operationText',
          align: 'center'
        },
        {
          title: '模块名称',
          key: 'moduelText',
          align: 'center'
        },
        {
          title: '操作时间',
          key: 'createTime',
          align: 'center'
        },
        {
          title: '电脑ip',
          key: 'ip',
          align: 'center'
        }
      ],
      dataList:[],
      dataTotal:0,
      page:{
        page:1,
        pageSize:10
      }
    }
  },
  watch:{
    entityId:{
      handler(newValue,oldValue){
        if(newValue && newValue*1 !=0){
          this.currentId = newValue;
          this.getDetail(()=>this.getList());
        }
      },
      immediate:true
    }
  },
  methods:{
    getDetail(callBack){
      this.$thttp({
        url:this.urls.detail+this.currentId,
        method:'get'
      }).then(data=>{
        if(data.code*1 == 0){
          this.currentUserName = data.data.loginAccount;
          callBack && callBack();
        }else{
          this.$Message.warning(data.msg);
        }
      })
    },
    getList(){
      let _this = this;
      var searchData = Object.assign({},this.searchform,this.page);
      searchData.username = this.accountName;
      if(searchData.beginTime && searchData.endTime && searchData.beginTime>searchData.endTime){
        this.$Message.warning('搜索开始时间不能大于结束时间');
        return;
      }
      if(searchData.beginTime != ''){
        searchData.beginTime = dateFormat(searchData.beginTime,'yyyy-MM-dd hh:mm:ss');
      }
      if(searchData.endTime != ''){
        searchData.endTime = dateFormat(searchData.endTime,'yyyy-MM-dd hh:mm:ss');
      }
      this.$thttp({
        url:urls.operatelog.list,
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
