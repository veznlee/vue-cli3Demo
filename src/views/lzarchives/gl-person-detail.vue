<template>
  <div class="fh-full-scroll">
    <div class="page-full-screen" style="top:84px;z-index:5;">
      <div class="fh-full-scroll jd-person-detail">
        <div class="detail-inner f-pr">
          <div class="left-nav-bar">
            <div class="nav-info"><router-link :to="{name:'gl-person'}">档案管理人员</router-link>><span>人员详情</span></div>
            <!-- <div class="nav-info"><span @click="closeThis">建档人员</span>><span>档案详情</span></div> -->
            <div class="nav-tab-container">
              <div class="tab-header">{{personInfoObj.fullName}}</div>
              <ul class="nav-tab" style="height:640px;overflow:auto;">
                <li v-for="item in tabs" :key="item.id" class="tab-item"
                  :class="{
                    active:item.id == activeTab,
                    disabled: personId == 0 && item.id != 'tab001'
                  }" @click="activeTabItem(item)">
                  <i class="jd-nav-icon" :class="item.icon"></i>{{item.name}}
                </li>
              </ul>
            </div>
          </div>
          <!--个人基本信息-->
          <gl-person-base-info
           v-show="activeTab == tabs[0].id"
           :entity-id="personId"
           :can-edit="isAddOrEdit"
            @changeEntity="changeEntity"></gl-person-base-info>
          <!--操作日志-->
          <gl-person-operate-log
           v-show="activeTab == tabs[1].id"
           :entity-id="personId"></gl-person-operate-log>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import glPersonBaseInfo from "@/components/gl-person-base-info.vue"
import glPersonOperateLog from "@/components/gl-person-operate-log.vue"
import '@/assets/jd-person-detail.scss'
export default {
  components:{
    glPersonBaseInfo,
    glPersonOperateLog
  },
  data(){
    return {
      isAddOrEdit:true,
      personId:0,
      personInfoObj:{
        fullName:'XXX'
      },
      activeTab:'tab001',
      tabs:[{
        id:'tab001',
        icon:'jd-icon-jbxx',
        name:'基本信息'
      },{
        id:'tab002',
        icon:'jd-icon-lplj',
        name:'操作日志'
      }]
    }
  },
  computed:{
    btnDisabled(){
      return this.personId*1 == 0;
    }
  },
  created(){
    this.personId = this.$route.params.id;
    this.isAddOrEdit = this.$route.params.view*1 == 0 ? true : false;
  },
  watch:{
    $route( to , from ){
      this.personId = this.$route.params.id;
      this.isAddOrEdit = this.$route.params.view*1 == 0 ? true : false;
    }
  },
  methods:{
    activeTabItem(item){
      if(this.btnDisabled) return;
      this.activeTab = item.id;
    },
    changeEntity(entity){
      this.personId = entity.id;
      this.personInfoObj = entity;
    }
  }
}
</script>
<style lang="scss">

</style>