<template>
  <div class="detail-tab-container">
    <div class="module-table-card">
      <div class="card-header clearfix">
        <div class="title" style="width:420px;">
          <div class="f-flex-item" style>
            <div class="fix-item">个人基本信息</div>
            <div class="auto-item" style="padding-left:20px;" v-if="canEdit">
              <Select v-model="selectedUserId"
                @on-change="changeSelUser"
                filterable
                remote
                :remote-method="getUserList"
                :loading="searchLoading"
                placeholder="请选择相关用户">
                <Option v-for="(option, index) in userList" :value="option.username" :key="index">{{option.realName}}</Option>
              </Select>
            </div>
          </div>
        </div>
        <div class="btn-box">
          <div class="forge-upload-btn" style="margin-left:32px;" v-if="canEdit">
            <Button type="primary" size="large" style="margin-left:0;" @click="save">保存</Button>
          </div>
        </div>
      </div>
      <div>
        <table class="table-default" cellspacing="0" cellpadding="0" border="0">
          <colgroup>
            <col width="14.28%">
            <col width="14.28%">
            <col width="14.28%">
            <col width="14.28%">
            <col width="14.28%">
            <col width="19.56%">
            <col width="10%">
          </colgroup>
          <tbody>
            <tr>
              <td class="bg-gray">姓名</td>
              <td>
                <div v-if="isView">{{personInfoObj.fullName}}</div>
                <div v-if="!isView"><Input v-model="personInfoObj.fullName" placeholder="" :maxlength="5" readonly/></div>
              </td>
              <td class="bg-gray">性别</td>
              <td>
                <div v-if="isView">{{personInfoObj.sexText}}</div>
                <div v-if="!isView">
                  <Select v-model="personInfoObj.sex">
                    <Option v-for="item in sexList" :value="item.dictValue" :key="item.id">{{ item.dictName }}</Option>
                  </Select>
                </div>
              </td>
              <td class="bg-gray">出生年月</td>
              <td>
                <div v-if="isView">{{personInfoObj.birthday}}</div>
                <div v-if="!isView">
                  <DatePicker type="date" placement="bottom-end" v-model="personInfoObj.birthday"
                  placeholder="选择日期" 
                  :clearable="true"
                  :options="maxTodayOption"></DatePicker>
                </div>
              </td>
              <td rowspan="3"></td>
            </tr>
            <tr>
              <td class="bg-gray">曾用名</td>
              <td>
                <div v-if="isView">{{personInfoObj.usedName}}</div>
                <div v-if="!isView"><Input v-model="personInfoObj.usedName" placeholder="" :maxlength="5"/></div>
              </td>
              <td class="bg-gray">民族</td>
              <td>
                <div v-if="isView">{{personInfoObj.nationText}}</div>
                <div v-if="!isView">
                  <Select v-model="personInfoObj.nation">
                    <Option v-for="item in nationList" :value="item.dictValue" :key="item.id">{{ item.dictName }}</Option>
                  </Select>
                </div>
              </td>
              <td class="bg-gray">身份证号</td>
              <td>
                <div v-if="isView">{{personInfoObj.idNum}}</div>
                <div v-if="!isView"><Input v-model="personInfoObj.idNum" placeholder="" :maxlength="18"/></div>
              </td>
            </tr>
            <tr>
              <td class="bg-gray">籍贯</td>
              <td>
                <div v-if="isView">{{personInfoObj.nativePlace}}</div>
                <div v-if="!isView"><Input v-model="personInfoObj.nativePlace" placeholder="" :maxlength="20"/></div>
              </td>
              <td class="bg-gray">婚姻状况</td>
              <td>
                <div v-if="isView">{{personInfoObj.maritalStatusText}}</div>
                <div v-if="!isView">
                  <Select v-model="personInfoObj.maritalStatus">
                    <Option v-for="item in maritalStatusList" :value="item.dictValue" :key="item.id">{{ item.dictName }}</Option>
                  </Select>
                </div>
              </td>
              <td class="bg-gray">文化程度</td>
              <td>
                <div v-if="isView">{{personInfoObj.eduBgText}}</div>
                <div v-if="!isView">
                  <Select v-model="personInfoObj.eduBg">
                    <Option v-for="item in educationalBgList" :value="item.dictValue" :key="item.id">{{ item.dictName }}</Option>
                  </Select>
                </div>
              </td>
            </tr>
            <tr>
              <td class="bg-gray">政治面貌</td>
              <td>
                <div v-if="isView">{{personInfoObj.politicalAspectText}}</div>
                <div v-if="!isView">
                  <Select v-model="personInfoObj.politicalAspect">
                    <Option v-for="item in politicalAspectList" :value="item.dictValue" :key="item.id">{{ item.dictName }}</Option>
                  </Select>
                </div>
              </td>
              <td class="bg-gray">入党时间</td>
              <td>
                <div v-if="isView">{{personInfoObj.joinPartyDate}}</div>
                <div v-if="!isView">
                  <DatePicker type="date" placement="bottom-end" v-model="personInfoObj.joinPartyDate"
                  placeholder="选择日期" 
                  :clearable="true"
                  :options="maxTodayOption"></DatePicker>
                </div>
              </td>
              <td class="bg-gray">参加工作时间</td>
              <td colspan="2">
                <div v-if="isView">{{personInfoObj.workDate}}</div>
                <div v-if="!isView">
                  <DatePicker type="date" placement="bottom-end" v-model="personInfoObj.workDate" 
                  placeholder="选择日期" 
                  :clearable="true"
                  :options="maxTodayOption"></DatePicker>
                </div>
              </td>
            </tr>
            <tr>
              <td class="bg-gray">毕业时间</td>
              <td>
                <div v-if="isView">{{personInfoObj.graduationDate}}</div>
                <div v-if="!isView">
                  <DatePicker type="date" placement="bottom-end" v-model="personInfoObj.graduationDate" placeholder="选择日期" :clearable="true"></DatePicker>
                </div>
              </td>
              <td class="bg-gray">毕业院校</td>
              <td>
                <div v-if="isView">{{personInfoObj.graduationUniversity}}</div>
                <div v-if="!isView"><Input v-model="personInfoObj.graduationUniversity" placeholder="" :maxlength="30"/></div>
              </td>
              <td class="bg-gray">专业</td>
              <td colspan="2">
                <div v-if="isView">{{personInfoObj.major}}</div>
                <div v-if="!isView"><Input v-model="personInfoObj.major" placeholder="" :maxlength="30"/></div>
              </td>
            </tr>
            <tr>
              <td class="bg-gray">工作单位</td>
              <td colspan="3">
                <div v-if="isView">{{personInfoObj.workUnit}}</div>
                <div v-if="!isView"><Input v-model="personInfoObj.workUnit" placeholder="" :maxlength="30"/></div>
              </td>
              <td class="bg-gray">职务</td>
              <td colspan="2">
                <div v-if="isView">{{personInfoObj.workPost}}</div>
                <div v-if="!isView"><Input v-model="personInfoObj.workPost" placeholder="" :maxlength="30"/></div>
              </td>
            </tr>
            <tr>
              <td class="bg-gray">任现职时间</td>
              <td>
                <div v-if="isView">{{personInfoObj.currJobDate}}</div>
                <div v-if="!isView">
                  <DatePicker type="date" placement="bottom-end" v-model="personInfoObj.currJobDate" 
                  placeholder="选择日期" 
                  :clearable="true"
                  :options="maxTodayOption"></DatePicker>
                </div>
              </td>
              <td class="bg-gray">级别</td>
              <td>
                <div v-if="isView">{{personInfoObj.workLevel}}</div>
                <div v-if="!isView">
                  <Input v-model="personInfoObj.workLevel" placeholder="" :maxlength="30"/>
                </div>
              </td>
              <td class="bg-gray">职称</td>
              <td colspan="2">
                <div v-if="isView">{{personInfoObj.positionalTitle}}</div>
                <div v-if="!isView"><Input v-model="personInfoObj.positionalTitle" placeholder="" :maxlength="30"/></div>
              </td>
            </tr>
            <tr>
              <td class="bg-gray">分管工作</td>
              <td colspan="3">
                <div v-if="isView">{{personInfoObj.manageWork}}</div>
                <div v-if="!isView"><Input v-model="personInfoObj.manageWork" placeholder="" :maxlength="30"/></div>
              </td>
              <td class="bg-gray">联系电话</td>
              <td colspan="2">
                <div v-if="isView">{{personInfoObj.mobilePhone}}</div>
                <div v-if="!isView"><Input v-model="personInfoObj.mobilePhone" placeholder="" :maxlength="11"/></div>
              </td>
            </tr>
            <tr>
              <td class="bg-gray">住址</td>
              <td colspan="3">
                <div v-if="isView">{{personInfoObj.address}}</div>
                <div v-if="!isView"><Input v-model="personInfoObj.address" placeholder="" :maxlength="40"/></div>
              </td>
              <td class="bg-gray">邮编</td>
              <td colspan="2">
                <div v-if="isView">{{personInfoObj.zipCode}}</div>
                <div v-if="!isView"><Input v-model="personInfoObj.zipCode" placeholder="" :maxlength="6"/></div>
              </td>
            </tr>
            <tr>
              <td class="bg-gray" rowspan="3">备注</td>
              <td colspan="6" rowspan="3">
                <div v-if="isView" style="text-align:left;height:100px;overflow:auto;">{{personInfoObj.remark}}</div>
                <div v-if="!isView"><Input type="textarea" v-model="personInfoObj.remark" :rows="4" placeholder="" :maxlength="200"/></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import {dateFormat} from '@/filter/common'
  import urls from "@/config/lzarchives.url.js"
  import {urlConfig} from "@/config/index.js"
  export default {
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
        urls:urls.glperson,
        personId:0,
        selectedUserId:'',
        selectedUser:{},
        personInfoObj:{
          id: '',
          fullName: '',
          sex: '',
          sexText: '',
          birthday: '',

          usedName: '',
          nation: '',
          nationText: '',
          idNum: '',

          nativePlace: '',
          maritalStatus: '',
          maritalStatusText: '',
          eduBg: '',
          eduBgText: '',

          workUnit: '',
          workUnitText: '',
          workPost: '',
          workPostText: '',
          workLevel: '',
          positionalTitle: '',
          positionalTitleText: '',

          manageWork: '',
          currJobDate: '',
          address: '',
          zipCode: ''
        },
        searchLoading:false,
        maxTodayOption:{
          disabledDate (date) {
            return date && date.valueOf() >= (new Date()).getTime();
          }
        },
        userList:[],
        sexList: [{
          dictValue: '',
          dictName: '请选择'
        }],
        nationList: [{
          dictValue: '',
          dictName: '请选择'
        }],
        educationalBgList: [{
          dictValue: '',
          dictName: '请选择'
        }],
        politicalAspectList: [{
          dictValue: '',
          dictName: '请选择'
        }],
        maritalStatusList:[{
          dictValue: '',
          dictName: '请选择'
        }]
      }
    },
    computed:{
      btnDisabled(){
        return this.personId*1 == 0;
      },
      isView(){
        return !this.canEdit;
      }
    },
    watch:{
      entityId: {
        handler(newValue, oldValue) {
          this.personId = newValue;
          if(this.personId*1 != 0){
            this.getDetail();
          }
        },
        immediate:true
      },
      selectedUserId: {
        handler(newValue, oldValue) {
          let users = this.userList.filter(item=>item.username == newValue);
          let user = users[0] || {};
          this.selectedUser = user;
          this.$set(this.personInfoObj,'fullName',user.realName || '');
          this.$set(this.personInfoObj,'mobilePhone',user.phone || '');
          this.$set(this.personInfoObj,'address',user.address || '');
          this.$set(this.personInfoObj,'loginAccount',user.username || '');
          this.$emit('changeEntity',this.personInfoObj);
        }
      }
    },
    methods:{
      getUserList(query){
        this.searchLoading = true;
        this.$thttp({
          url:this.urls.userList,
          method:'post',
          data:{
            searchKey:query || ''
          }
        }).then(data=>{
          this.searchLoading = false;
          if(data.code*1 == 0){
            this.userList = data.data;
          }
        })
        // 防止请求出错时一直为true
        setTimeout(()=>{
          this.searchLoading = false;
        },3000);
      },
      getDictList(type,listName){
        this.$thttp({
          url:this.$urlConfig.dataList+type,
          method:'get'
        }).then(data=>{
          if(Array.isArray(data) && data.length>0){
            // data.unshift({
            //   dictValue: '',
            //   dictName: '请选择'
            // });
            this[listName] = data;
          }
        })
      },
      getDetail(){
        this.$thttp({
          url:this.urls.detail+this.personId,
          method:'get'
        }).then(data=>{
          if(data.code*1 == 0){
            this.personInfoObj = data.data;
            this.$emit('changeEntity',data.data);
          }
        })
      },
      changeSelUser(user){
        // console.log(user);
      },
      save(){
        let obj = Object.assign({},this.personInfoObj);
        if(!obj.loginAccount){
          this.$Message.warning('请先选择添加信息的用户');
          return;
        };
        if(obj.birthday){
          obj.birthday = dateFormat(obj.birthday);
        }
        if(obj.joinPartyDate){
          obj.joinPartyDate = dateFormat(obj.joinPartyDate);
        }
        if(obj.workDate){
          obj.workDate = dateFormat(obj.workDate);
        }
        if(obj.graduationDate){
          obj.graduationDate = dateFormat(obj.graduationDate);
        }
        if(obj.currJobDate){
          obj.currJobDate = dateFormat(obj.currJobDate);
        }
        let method = obj.id*1 == 0 ? 'put' : 'post';
        this.$thttp({
          url:this.urls.add,
          method:'post',
          data:obj
        }).then(data=>{
          if(data.code*1 == 0){
            this.$Message.success('保存成功');
            this.personInfoObj.id = data.data.id;
            this.$emit('changeEntity',data.data);
          }else{
            this.$Message.warning(data.msg);
          }
        })
      }
    },
    created(){
      if(this.canEdit){
        this.getUserList();
        let types = this.$urlConfig.dataListType;
        this.getDictList(types.sex,'sexList');
        this.getDictList(types.nation,'nationList');
        this.getDictList(types.educationalBg,'educationalBgList');
        this.getDictList(types.maritalStatus,'maritalStatusList');
        this.getDictList(types.politicalAspect,'politicalAspectList');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .table-default td{
    padding:10px 5px;
    .ivu-select{
      text-align: left;
    }
    .ivu-date-picker{
      width:100%;
    }
  }
</style>