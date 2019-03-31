export default {
  data(){
    return {
      urls:{
        list:'',
        add:'',
        delete:''
      },
      currentRow:{
        id:''
      },
      editFormModal:false,
      hackReset:true,
      isView:false,
      activeId:'',
      dataList: [],
      dataTotal:0,
      page:{
        page:1,
        pageSize:10
      }
    }
  },
  created(){
    this.getList();
  },
  computed:{
    btnDisabled(){
      return !(this.currentRow.id && this.currentRow.id*1 != 0);
    }
  },
  methods:{
    getList(){
      
    },
    search(){
      this.page.page = 1;
      this.getList();
    },
    // 切换分页
    pageChange(index){
      this.page.page = index;
      this.getList();
    },
    pageSizeChange(size){
      this.page.pageSize = size;
      this.getList();
    },
    // 切换表格选中行
    tableRowChange(currentRow, oldCurrentRow){
      this.currentRow = currentRow;
      this.activeId = currentRow.id;
    },
    add(){
      
    },
    update(){
      
    },
    view(){
      
    },
    del(){
      let _this = this;
      this.$Modal.confirm({
        width:300,
        title:'删除提示',
        content:'确定删除选中记录吗？',
        onOk:function(){
          _this.$thttp({
            url:_this.urls.delete+_this.activeId,
            method:'delete'
          }).then(data=>{
            if(data.code*1 == 0){
              _this.$Message.success('删除成功');
              _this.getList();
            }else{
              _this.$Message.warning('删除失败');
            }
          })
        }
      });
    },
    confirmEdit(){
      this.$refs.editForm.handleSubmit();
    },
    cancelEdit(){
      this.editFormModal = false;
      this.resetEditModal();
    },
    resetEditModal(){
      this.hackReset = false;
      this.$refs.editForm.handleReset();
      this.$nextTick(()=>{
        this.hackReset = true;
      })
    }
  }
}