<template>
  <div class="fh-full-scroll">
    <div class="table-page-wrap f-pr">
      <div class="search-line clearfix">
        <div class="search-inline-item">
          <span class="item-label">关键字</span>
          <Input v-model="searchform.searchKey" class="commom-input" size="large" :maxlength="20" placeholder="姓名/编号"/>
        </div>
        <div class="search-inline-item">
          <span class="item-label">职务</span>
          <Input v-model="searchform.workPost" class="commom-input" size="large" :maxlength="20" placeholder="职务名称"/>
          <!-- <Select v-model="searchform.workPost" class="commom-input">
            <Option v-for="item in jobList" :value="item.dictValue" :key="item.dictValue">{{ item.dictName }}</Option>
          </Select> -->
        </div>
        <div class="search-inline-item">
          <span class="item-label">单位</span>
          <Input v-model="searchform.workUnit" size="large" class="commom-input" :maxlength="20" placeholder="单位名称"/>
          <!-- <Select v-model="searchform.workUnit" class="commom-input" size="large">
            <Option v-for="item in unitList" :value="item.dictValue" :key="item.dictValue">{{ item.dictName }}</Option>
          </Select> -->
        </div>
        <div class="search-inline-item">
          <span class="item-label">状态</span>
          <Select v-model="searchform.cstatus" class="commom-input" size="large">
            <option value="">请选择</option>
            <Option v-for="item in jobStateList" :value="item.dictValue" :key="item.dictValue">{{ item.dictName }}</Option>
          </Select>
        </div>
        <div class="search-inline-item">
          <span class="item-label">参工时间</span>
          <DatePicker type="date" size="large" 
          placement="bottom-end" 
          v-model="searchform.workDate" 
          placeholder="选择日期"
          :clearable="true" 
          class="commom-input"
          style="width:180px;"></DatePicker>
        </div>
        <Button type="primary" size="large" class="search-btn" @click="search">搜索</Button>
      </div>
      <div class="operate-line">
        <Button type="success" size="large" @click="addNew">新增</Button>
        <Button type="error" size="large" :disabled="btnDisabled" @click="updateDetail">修改</Button>
        <Button type="warning" size="large" :disabled="btnDisabled" @click="transfer">变更</Button>
        <Button type="info" size="large" :disabled="btnDisabled" @click="viewDetail">查看</Button>
        <!-- <Button type="primary" size="large" :disabled="btnDisabled" style="width:160px;padding-left:5px;padding-right:5px;">廉洁证明材料</Button> -->
      </div>
      <div class="table-container bold-table-header">
        <Table highlight-row stripe :columns="columns" :data="dataList" ref="tableWrap" @on-current-change="tableRowChange"></Table>
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

    <Modal
      v-model="transferModal"
      :width="400"
      title="变更档案人员状态"
      :closable="false"
      :mask-closable="false"
      >
      <div class="">
        <ul class="select-liest-wrap" v-if="jobStateList.length">
          <li class="select-list-item" 
          v-for="item in jobStateList" 
          :key="item.dictValue" 
          :class="{active:currentJobState == item.dictValue}" 
          @click="changeJobState(item)">{{item.dictName}}</li>
        </ul>
        <ul class="select-liest-wrap" v-if="!jobStateList.length">
          <li class="select-list-item">在职状态列表获取失败，无法变更</li>
        </ul>
      </div>
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
      maxTodayOption:{
        disabledDate (date) {
          return date && date.valueOf() >= (new Date()).getTime();
        }
      },
      openEdit:false,
      urls:urls.jdperson,
      searchform:{
        searchKey:'',
        workPost:'',
        workUnit:'',
        workDate:'',
        cstatus:''
      },
      jobList: [{
        dictValue: '',
        dictName: '请选择'
      }],
      unitList: [{
        dictValue: '',
        dictName: '请选择'
      }],
      columns: [
        {
          title:'档案编号',
          key:'serialNumber',
          align: 'center',
          width: 118
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
      //弹窗状态变更列表
      transferModal:false,
      currentJobState:'',
      jobStateList:[]
    }
  },
  created(){
    // this.getDictList(this.$urlConfig.dataListType.workPost,'jobList');
    // this.getDictList(this.$urlConfig.dataListType.workUnit,'unitList');
    this.getDictList(this.$urlConfig.dataListType.personJobState,'jobStateList',true);
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
    getDictList(type,listName,addFirst){
      this.$thttp({
        url:this.$urlConfig.dataList+type,
        method:'get'
      }).then(data=>{
        if(Array.isArray(data) && data.length>0){
          if(!addFirst){
            data.unshift({
              dictValue: '',
              dictName: '请选择'
            });
          };
          this[listName] = data;
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

    // 改变状态
    changeJobState(item){
      this.currentJobState = item.dictValue;
    },
    transfer(){
      this.currentJobState = this.currentRow.cstatus;
      this.transferModal = true;
    },
    confirmTransfer(){
      this.transferModal = false;
      // 如果跟之前的一样，不请求
      if(this.currentJobState == this.currentRow.cstatus){
        return false;
      } 
      this.$thttp({
        url:this.urls.changeJobState+this.currentRow.id,
        method:'put',
        data:{
          cstatus:this.currentJobState
        }
      }).then(data=>{
        if(data.code*1 == 0){
          this.$Message.success('保存成功');
          this.getList();
        }else{
          this.$Message.warning(data.msg);
        }
      })
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