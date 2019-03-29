<template>
  <div class="fh-full-scroll">
    <div class="table-page-wrap f-pr">
      <div class="search-line clearfix">
        <div class="search-inline-item">
          <span class="item-label">关键字</span>
          <Input v-model="searchform.searchKey" class="commom-input" placeholder="账号/姓名"/>
        </div>
        <Button type="primary" class="search-btn" @click="search">搜索</Button>
      </div>
      <div class="operate-line">
        <Button type="success" size="large" @click="add">新增</Button>
        <Button type="warning" size="large" :disabled="btnDisabled" @click="update">修改</Button>
        <Button type="info" size="large" :disabled="btnDisabled" @click="view">查看</Button>
        <Button type="error" size="large" :disabled="btnDisabled" @click="del">删除</Button>
        <Button type="primary" size="large" :disabled="btnDisabled" @click="openTreeForm"
        style="width:160px;padding-left:5px;padding-right:5px;">角色配置</Button>
      </div>
      <div class="table-container bold-table-header">
        <Table highlight-row stripe :columns="columns" :data="dataList" ref="tableWrap" @on-current-change="tableRowChange"></Table>
      </div>
      <div class="pagination-container" v-show="dataTotal > page.pageSize">
        <Page :total="dataTotal" show-total :current="page.page" :page-size="page.pageSize" @on-change="pageChange"/>
      </div>
    </div>

    <Modal
      v-model="editFormModal"
      :closable="false"
      :mask-closable="false"
      title="用户">
      <user-form v-if="hackReset" ref="editForm" @submit="submitEdit" :is-view="isView" :form-data="formData"></user-form>
      <div slot="footer" style="text-align:left;">
        <div v-show="!isView">
          <Button type="primary" size="large" @click="confirmEdit">确定</Button>
          <Button type="error" size="large" @click="cancelEdit">取消</Button>
        </div>
        <div v-show="isView">
          <Button type="error" size="large" @click="cancelEdit">返回</Button>
        </div>
      </div>
    </Modal>

    <Modal
      v-model="treeFormModal"
      :closable="false"
      :mask-closable="false"
      title="配置用户角色">
      <tree-form ref="treeDialog" 
      :url="urls.roleDetail"
      :action-id="activeId"
      :multiple="false"
      @submitTree="submitTreeForm"
      ></tree-form>
      <div slot="footer" style="text-align:left;">
        <div v-show="!isTreeView">
          <Button type="primary" size="large" @click="confirmTreeForm">确定</Button>
          <Button type="error" size="large" @click="cancelTreeForm">取消</Button>
        </div>
        <div v-show="isTreeView">
          <Button type="error" size="large" @click="cancelTreeForm">返回</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import curdMixin from '@/mixins/curd.js'
import userForm from './user-form.vue'
import treeDialogMixin from '@/mixins/tree-dialog.js'
import treeForm from './tree-form.vue'
import urls from "@/config/system.url.js"

export default {
  mixins:[curdMixin,treeDialogMixin],
  components:{
    userForm,
    treeForm
  },
  data(){
    return {
      urls:urls.user,
      formData:{
        username: '',
        realName: '',
        phone: '',
        email: '',
        department: '',
        mgDepartment:''
      },
      searchform:{
        searchKey:''
      },
      columns: [
        {
          type:'index',
          align: 'center',
          width: 80
        },
        {
          title: '用户名',
          key: 'username',
          align: 'center'
        },
        {
          title: '真实姓名',
          key: 'realName',
          align: 'center'
        },
        {
          title: '电话',
          key: 'phone',
          align: 'center'
        },
        {
          title: '地址',
          key: 'address',
          align: 'center'
        },
        {
          title: '邮箱',
          key: 'email',
          align: 'center'
        },
        {
          title: '所属部门',
          key: 'departmentText',
          align: 'center'
        },
        {
          title: '管理部门',
          key: 'mgDepartment',
          align: 'center'
        }
      ]
    }
  },
  methods:{
    getList(){
      let _this = this;
      var searchData = Object.assign({},this.searchform,this.page);
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
    add(){
      this.isView = false;
      this.formData = {
        username: '',
        realName: '',
        phone: '',
        email: '',
        department: -1,
        departmentText:'组织机构'
      };
      this.editFormModal = true;
    },
    update(){
      this.isView = false;
      this.formData = Object.assign({},this.currentRow);
      this.editFormModal = true;
    },
    view(){
      this.isView = true;
      this.formData = Object.assign({},this.currentRow);
      this.editFormModal = true;
    },
    submitEdit(obj){
      this.editFormModal = false;
      const dataObj = Object.assign({},obj);
      this.resetEditModal();
      delete dataObj.departmentText;
      let method = dataObj.id ? 'put' : 'post'
      this.$thttp({
        url:this.urls.add,
        method,
        data:dataObj
      }).then(data=>{
        if(data.code*1 == 0){
          this.$Message.success('保存成功');
          this.getList();
        }else{
          this.$Message.warning('保存失败');
        }
      });
    },
    submitTreeForm(obj){
      // 保留isRole为true的节点，并返回id数组
      this.treeFormModal = false;
      let arr = obj.filter(item=>item.isRole).map(item=>item.id);
      this.$thttp({
        method:'post',
        url:this.urls.roleSave,
        data:{
          userId:this.activeId,
          roleIds:arr.join(',')
        }
      }).then(data=>{
        if(data.code*1 == 0){
          this.$Message.success('保存成功');
        }else{
          this.$Message.warning('保存失败');
        }
      })
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