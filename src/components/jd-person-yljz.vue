<template>
  <div class="detail-tab-container">
    <div class="tab-switch">
      <ul class="tab-item-list clearfix">
        <li v-for="(item,index) in tabs" :key="index" 
         class="tab-item" 
         :class="{active:item.id == activeTabId}" 
         @click="changeTab(item)">{{item.name}}</li>
      </ul>
    </div>
    <div class="tab-switch-container">
      <keep-alive>
        <component :is="currentView" :entity-id="personId" :can-edit="editable"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import jdPersonCompany from '@/components/jd-person-company.vue'
  import jdPersonPartjob from '@/components/jd-person-partjob.vue'
  import jdPersonInvest from '@/components/jd-person-invest.vue'
  import urls from "@/config/lzarchives.url.js"
  export default {
    components:{
      jdPersonCompany,
      jdPersonPartjob,
      jdPersonInvest
    },
    props:{
      canEdit:{
        type:Boolean,
        default:true
      },
      entityId:{
        type:[String,Number],
        default:0
      }
    },
    data(){
      return {
        personId:0,
        editable:true,
        tabs:[{
          id:0,
          name:'个人经商办企业',
          component:'jdPersonCompany',
          params:{

          }
        },{
          id:1,
          name:'兼职情况',
          component:'jdPersonPartjob'
        },{
          id:2,
          name:'投资或入股',
          component:'jdPersonInvest'
        }],
        activeTabId:0,
        currentView:'jdPersonCompany'
      }
    },
    methods:{
      changeTab(item){
        this.activeTabId = item.id;
        this.currentView = item.component;
      }
    },
    watch:{
      entityId: {
        handler(newValue, oldValue) {
          this.personId = newValue;
        },
        immediate:true
      },
      canEdit: {
        handler(newValue, oldValue) {
          this.editable = newValue;
        },
        immediate:true
      }
    }
  }
</script>


<style lang="scss">
  .tab-switch{
    height:32px;
    margin-bottom:68px;
    .tab-item-list{
      width:756px;
      margin:0 auto;
    }
    .tab-item{
      float:left;
      width:210px;
      height:63px;
      padding:4px 0 3px;
      margin:0 21px;
      line-height: 56px;
      font-size:22px;
      text-align: center;
      color:#333;
      background:url(../assets/img/yljz_tab_bg.png) no-repeat;
      transition: all 1s ease;
      cursor:pointer;
      &:hover{
        transform: scale(1.05);
      }
      &.active{
        color:#fff;
        background:url(../assets/img/yljz_tab_bg_active.png) no-repeat;
      }
    }

  }
</style>