export default {
  data(){
    return {
      urls:{},
      openTree:{
        id:'',
        pid:''
      },
      currentRow:{
        id:'',
        pid:''
      },
      openTreeId:'',
      treeData:[],
      editFormModal:false,
      hackReset:true,
      activeId:'',
      dataList: [],
      dataTotal:0,
      page:{
        page:1,
        pageSize:10
      }
    }
  },
  computed:{
    btnDisabled(){
      return !(this.currentRow.id && this.currentRow.id*1 != 0);
    }
  },
  methods:{
    getList(){
      
    },
    getTreeData(successFn,callBack){
      this.$thttp({
        url:this.urls.tree,
        method:'get'
      }).then(data=>{
        if(data.code*1 == 0){
          successFn(data.data);
          callBack && callBack();
        }else{
          this.$Message.warning(data.msg);
        }
      })
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
    // 切换表格选中行
    tableRowChange(currentRow, oldCurrentRow){
      this.currentRow = currentRow;
      this.activeId = currentRow.id;
    },
    confirmDel(url,callBack){
      let _this = this;
      this.$Modal.confirm({
        width:300,
        title:'删除提示',
        content:'确定删除选中记录吗？',
        onOk:function(){
          _this.$thttp({
            url:url,
            method:'delete'
          }).then(data=>{
            if(data.code*1 == 0){
              _this.$Message.success('删除成功');
              callBack && callBack(_this);
            }else{
              _this.$Message.warning('删除失败');
            }
          })
        }
      });
    },
    add(){
      
    },
    update(){
      
    },
    view(){
      
    },
    del(){

    },
    treeSelect(array,current){
      this.openTree = current;
      this.openTreeId = current.id;
      this.page.page = 1;
      this.getList();
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
    },
    treeRender (h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block'
        }
      }, [
        h('span', {
          class:['ivu-tree-title']
        },[
          h('Icon', {
            props: {
              type: data.children && data.children.length ? 'ios-folder-outline' : 'ios-paper-outline'
            },
            style: {
              marginRight: '8px'
            }
          }),
          h('span', data.title)
        ])
      ]
    )}
  }
}