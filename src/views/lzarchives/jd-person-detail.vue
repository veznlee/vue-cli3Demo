<template>
  <div class="fh-full-scroll">
    <div class="page-full-screen" style="top:84px;z-index:5;">
      <div class="fh-full-scroll jd-person-detail">
        <div class="detail-inner f-pr">
          <div class="left-nav-bar">
            <div class="nav-info"><router-link :to="{name:'jd-person'}">建档人员</router-link>><span>档案详情</span></div>
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
          <jd-person-base-info
           v-show="activeTab == tabs[0].id"
           :entity-id="personId"
           :can-edit="isAddOrEdit"
            @changeEntity="changeEntity"></jd-person-base-info>
          <!--礼品礼金情况-->
          <jd-person-lplj
           v-if="activeTab == tabs[1].id" 
           :can-edit="isAddOrEdit" 
           :entity-id="personId"></jd-person-lplj>

          <!--奖惩情况-->
          <jd-person-jcqk
           v-if="activeTab == tabs[2].id" 
           :can-edit="isAddOrEdit"
           :entity-id="personId"></jd-person-jcqk>

          <!--营利兼职持股-->
          <jd-person-yljz
           v-if="activeTab == tabs[3].id" 
           :can-edit="isAddOrEdit"
           :entity-id="personId"></jd-person-yljz>

          <!--婚丧喜庆-->
          <jd-person-hsxq
           v-if="activeTab == tabs[4].id" 
           :can-edit="isAddOrEdit"
           :entity-id="personId"></jd-person-hsxq>

          <!--谈话函讯-->
          <jd-person-thhx
           v-if="activeTab == tabs[5].id" 
           :can-edit="isAddOrEdit" 
           :entity-id="personId"></jd-person-thhx>

          <!--处理处分-->
          <jd-person-clcf
           v-if="activeTab == tabs[6].id" 
           :can-edit="isAddOrEdit" 
           :entity-id="personId"></jd-person-clcf>

          <!--重大事项-->
          <jd-person-zdsx
           v-if="activeTab == tabs[7].id" 
           :can-edit="isAddOrEdit" 
           :entity-id="personId"></jd-person-zdsx>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jdPersonBaseInfo from '@/components/jd-person-base-info.vue'
import jdPersonLplj from '@/components/jd-person-lplj.vue'
import jdPersonJcqk from '@/components/jd-person-jcqk.vue'
import jdPersonYljz from '@/components/jd-person-yljz.vue'
import jdPersonHsxq from '@/components/jd-person-hsxq.vue'
import jdPersonThhx from '@/components/jd-person-thhx.vue'
import jdPersonClcf from '@/components/jd-person-clcf.vue'
import jdPersonZdsx from '@/components/jd-person-zdsx.vue'

import '@/assets/jd-person-detail.scss'
export default {
  components:{
    jdPersonBaseInfo,
    jdPersonLplj,
    jdPersonJcqk,
    jdPersonYljz,
    jdPersonHsxq,
    jdPersonThhx,
    jdPersonClcf,
    jdPersonZdsx,
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
      }, {
        id:'tab002',
        icon:'jd-icon-lplj',
        name:'礼品礼金情况'
      }, {
        id:'tab003',
        icon:'jd-icon-jcqk',
        name:'奖惩情况'
      }, {
        id:'tab004',
        icon:'jd-icon-yljz',
        name:'营利兼职持股'
      }, {
        id:'tab005',
        icon:'jd-icon-hsxq',
        name:'操办婚丧喜庆事宜'
      }, {
        id:'tab006',
        icon:'jd-icon-thhx',
        name:'谈话函讯'
      }, {
        id:'tab007',
        icon:'jd-icon-clcf',
        name:'处理处分情况'
      }, {
        id:'tab008',
        icon:'jd-icon-zdsx',
        name:'重大事项报告'
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