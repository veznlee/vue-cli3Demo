<template>
  <div class="fh-full-scroll">
    <div class="table-page-wrap">
      <div class="search-line clearfix">
        <div class="search-inline-item">
          <span class="item-label">操作人</span>
          <Input v-model="searchform.username" class="commom-input" size="large" :maxlength="20" placeholder="姓名"/>
        </div>
        <div class="search-inline-item">
          <span class="item-label">操作类型</span>
          <Input v-model="searchform.operation" class="commom-input" size="large" placeholder="新增/修改等操作类型"/>
        </div>
        <div class="search-inline-item">
          <span class="item-label">开始时间</span>
          <DatePicker type="datetime" placement="bottom-end" size="large" v-model="searchform.beginTime" placeholder="选择日期" :clearable="true" class="commom-input"></DatePicker>
        </div>
        <div class="search-inline-item">
          <span class="item-label">结束时间</span>
          <DatePicker type="datetime" placement="bottom-end" size="large" v-model="searchform.endTime" placeholder="选择日期" :clearable="true" class="commom-input"></DatePicker>
        </div>
        <Button type="primary" class="search-btn" size="large" @click="search">搜索</Button>
      </div>
      <div class="table-container bold-table-header">
        <Table stripe :columns="tableColumns" :data="dataList" ref="table"></Table>
      </div>
      <div class="pagination-container" v-show="dataTotal > page.pageSize">
        <Page 
        show-total  
        show-elevator 
        show-sizer
        :total="dataTotal" 
        :current="page.page" 
        :page-size="page.pageSize" 
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"/>
      </div>
    </div>
  </div>
</template>

<script>
import {dateFormat} from '@/filter/common'
import curdMixin from '@/mixins/curd.js'
import urls from "@/config/lzarchives.url.js"
export default {
  mixins:[curdMixin],
  data(){
    return {
      urls:urls.operatelog,
      searchform:{
        username:'',
        operation:'',
        beginTime:'',
        endTime:''
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
          key: 'operation',
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
      ]
    }
  },
  methods:{
    getList(){
      let _this = this;
      var searchData = Object.assign({},this.searchform,this.page);
      if(searchData.beginTime && searchData.endTime && searchData.beginTime>searchData.endTime){
        this.$Message.warning('搜索开始时间不能大于结束时间');
        return;
      }
      if(searchData.beginTime != ''){
        searchData.beginTime = dateFormat(searchData.beginTime);
      }
      if(searchData.endTime != ''){
        searchData.endTime = dateFormat(searchData.endTime);
      }
      // console.log(searchData);
      this.$thttp({
        url:this.urls.list,
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