export default {
  data(){
    return {
      treeFormModal:false,
      isTreeView:false
    }
  },
  methods:{
    openTreeForm(){
      this.treeFormModal = true;
      this.$refs.treeDialog.getTree();
    },
    confirmTreeForm(){
      this.$refs.treeDialog.handleSubmit();
    },
    cancelTreeForm(){
      this.treeFormModal = false;
    },
    submitTreeForm(){

    }
  }
}