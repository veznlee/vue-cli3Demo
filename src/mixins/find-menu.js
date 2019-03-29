import {findRouterByName} from "@/libs/appUtil"
export default {
  data(){
    return {
      pathName:'',
      currentRoute:{
        name:'',
        path:'',
        mata:{},
        children:[]
      }
    }
  },
  methods:{
    findChildren(){
      let menus = this.$storage.getLocalObj('_app_permission');
      let route = findRouterByName(menus, this.pathName);
      if(route){
        this.currentRoute = route;
      }
    }
  },
  created(){
    this.findChildren();
  }
}