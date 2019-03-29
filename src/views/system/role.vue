<template>
  <div class="fh-full-scroll">
    <div class="page-full-screen" style="top:84px;z-index:5;">
      <div class="fh-full-scroll module-tree-page">
        <div class="tree-page-inner f-pr">
          <div class="tree-container">
            <div class="tree-box">
              <Tree :data="treeData" @on-select-change="treeSelect"></Tree>
            </div>
          </div>
          <div class="tree-out detail-tab-container">
            <div class="table-page-wrap f-pr">
              <div class="search-line clearfix">
                <div class="search-inline-item">
                  <span class="item-label">关键字</span>
                  <Input v-model="searchform.searchKey" class="commom-input" placeholder="部门名称"/>
                </div>
                <Button type="primary" class="search-btn" @click="search">搜索</Button>
              </div>
              <div class="operate-line">
                <Button type="success" size="large" @click="add">新增</Button>
                <Button type="warning" size="large" :disabled="btnDisabled" @click="update">修改</Button>
                <Button type="info" size="large" :disabled="btnDisabled" @click="view">查看</Button>
                <Button type="error" size="large" :disabled="btnDisabled" @click="del">删除</Button>
                <Button type="primary" size="large" :disabled="btnDisabled" @click="openTreeForm"
                style="width:160px;padding-left:5px;padding-right:5px;">权限配置</Button>
              </div>
              <div class="table-container bold-table-header">
                <Table highlight-row stripe :columns="columns" :data="dataList" ref="tableWrap" @on-current-change="tableRowChange"></Table>
              </div>
              <div class="pagination-container" v-show="dataTotal > page.pageSize">
                <Page :total="dataTotal" show-total :current="page.page" :page-size="page.pageSize" @on-change="pageChange"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!---->
    <Modal
      v-model="editFormModal"
      title="角色">
      <role-form v-if="hackReset" ref="editForm" @submit="submitEdit" :is-view="isView" :form-data="formData"></role-form>
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
      title="配置角色权限">
      <tree-form ref="treeDialog" 
      :url="urls.permissionDetail"
      :action-id="activeId"
      :multiple="true"
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
import treeMixin from '@/mixins/tree-modul.js'                                                                                                                                                                                                                                                                                                                                     
import roleForm from './role-form.vue'
import treeDialogMixin from '@/mixins/tree-dialog.js'
import treeForm from './tree-form.vue'
import urls from "@/config/system.url.js"

export default {
  mixins:[treeMixin,treeDialogMixin],
  components:{
    roleForm,
    treeForm
  },
  data(){
    return {
      urls:urls.role,
      treeData:[{
        expand: true,
        id: -1,
        label: "组织机构",
        title: "组织机构",
        children:[]
      }],
      openTreeId: -1,
      openTree:{
        id:-1,
        title:'组织机构'
      },
      editFormModal:false,
      isView:false,
      formData:{
        id:'',
        role:'',
        department:-1,
        departmentText:'组织机构'
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
          title: '角色名称',
          key: 'role',
          align: 'center'
        },
        {
          title: '所属部门',
          key: 'departmentText',
          align: 'center'
        }
      ]
    }
  },
  methods:{
    getList(){
      var searchData = Object.assign({},this.searchform,this.page);
      searchData.department = this.openTreeId;
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
    getTree(){
      let _this = this;
      this.getTreeData((data)=>{
        _this.treeData[0].children = data;
      })
    },
    add(){
      this.isView = false;
      this.formData = {
        id:'',
        role:'',
        department:this.openTree.id || '-1',
        departmentText:this.openTree.title || '顶级部门'
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
    del(){
      let _this = this;
      this.confirmDel(_this.urls.delete+_this.currentRow.id,(context)=>{
        _this.getList();
        _this.getTree();
      })
    },
    submitEdit(obj){
      this.editFormModal = false;
      const dataObj = Object.assign({},obj);
      this.resetEditModal();
      delete dataObj.pidText;
      let method = dataObj.id ? 'put' : 'post'
      this.$thttp({
        url:this.urls.add,
        method,
        data:dataObj
      }).then(data=>{
        if(data.code*1 == 0){
          this.$Message.success('保存成功');
          this.getList();
          this.getTree();
        }else{
          this.$Message.warning('保存失败');
        }
      })
    },
    submitTreeForm(obj){
      // 保留isRole为true的节点，并返回id数组
      this.treeFormModal = false;
      let arr = obj.map(item=>item.id);
      this.$thttp({
        method:'post',
        url:this.urls.permissionSave,
        data:{
          roleId:this.activeId,
          permissions:arr.join(',')
        }
      }).then(data=>{
        if(data.code*1 == 0){
          this.$Message.success('保存成功');
        }else{
          this.$Message.warning('保存失败');
        }
      })
    }
  },
  created(){
    this.getTree();
    this.getList();
  },
}
</script>

<style lang="scss">
  
</style>