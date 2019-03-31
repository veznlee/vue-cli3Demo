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
                  <Input v-model="searchform.searchKey" class="commom-input" size="large" placeholder="部门名称"/>
                </div>
                <Button type="primary" class="search-btn" size="large" @click="search">搜索</Button>
              </div>
              <div class="operate-line">
                <Button type="success" size="large" @click="add">新增</Button>
                <Button type="warning" size="large" :disabled="btnDisabled" @click="update">修改</Button>
                <Button type="info" size="large" :disabled="btnDisabled" @click="view">查看</Button>
                <Button type="error" size="large" :disabled="btnDisabled" @click="del">删除</Button>
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
          </div>
        </div>
      </div>
    </div>

    <Modal
      v-model="editFormModal"
      :closable="false"
      :mask-closable="false"
      title="菜单">
      <menu-form v-if="hackReset" ref="editForm" @submit="submitEdit" :is-view="isView" :form-data="formData"></menu-form>
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
  </div>
</template>

<script>
import treeMixin from '@/mixins/tree-modul.js'                                                                                                                                                                                                                                                                                                                                     
import menuForm from './menu-form.vue'
import urls from "@/config/system.url.js"

export default {
  mixins:[treeMixin],
  components:{
    menuForm
  },
  data(){
    return {
      urls:urls.menu,
      treeData:[{
        expand: true,
        id: -1,
        label: "系统菜单",
        title: "系统菜单",
        children:[]
      }],
      openTreeId: -1,
      openTree:{
        id:-1,
        title:'系统菜单'
      },
      editFormModal:false,
      isView:false,
      formData:{},
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
          title: '菜单名称',
          key: 'title',
          align: 'center'
        },
        {
          title: '菜单路径名',
          key: 'name',
          align: 'center'
        },
        {
          title: '菜单url',
          key: 'path',
          align: 'center'
        },
        {
          title: '图标',
          key: 'icon',
          align: 'center'
        },
        {
          title: '功能权限',
          key: 'permission',
          align: 'center'
        }
      ]
    }
  },
  methods:{
    getList(){
      var searchData = Object.assign({},this.searchform,this.page);
      searchData.pid = this.openTreeId;
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
        title: '',
        name: '',
        path: '',
        icon: '',
        menuOrder:'',
        menuType: 2,
        pid:this.openTree.id || '-1',
        pidText:this.openTree.title || '系统菜单'
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
      // 后台临时字段
      dataObj.permission = '';
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