<template>
  <div class="detail-tab-container">
    <div class="module-table-card">
      <div class="card-header clearfix">
        <div class="title">个人基本信息
          <a class="inline-down-link" href="javascript:;" @click="downloadExcelModal">点击下载模板</a>
        </div>
        <div class="btn-box">
          <!-- <Button type="success" size="large">打印</Button> -->
          <div class="forge-upload-btn" style="margin-left:32px;" v-if="canEdit">
            <input id="import-baseinfo" type="file" name="file" accept=".xlsx,.xls" @change="importBaseInfo($event)">
            <Button type="primary" size="large" style="margin-left:0;">{{importText}}</Button>
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
              <td>{{personInfoObj.fullName}}</td>
              <td class="bg-gray">性别</td>
              <td>{{personInfoObj.sexText}}</td>
              <td class="bg-gray">出生年月</td>
              <td>{{personInfoObj.birthday}}</td>
              <td rowspan="3"></td>
            </tr>
            <tr>
              <td class="bg-gray">曾用名</td>
              <td>{{personInfoObj.usedName}}</td>
              <td class="bg-gray">民族</td>
              <td>{{personInfoObj.nationText}}</td>
              <td class="bg-gray">身份证号</td>
              <td>{{personInfoObj.idNum}}</td>
            </tr>
            <tr>
              <td class="bg-gray">籍贯</td>
              <td>{{personInfoObj.nativePlace}}</td>
              <td class="bg-gray">婚姻状况</td>
              <td>{{personInfoObj.maritalStatusText}}</td>
              <td class="bg-gray">文化程度</td>
              <td>{{personInfoObj.eduBgText}}</td>
            </tr>
            <tr>
              <td class="bg-gray">政治面貌</td>
              <td>{{personInfoObj.politicalAspectText}}</td>
              <td class="bg-gray">入党时间</td>
              <td>{{personInfoObj.joinPartyDate}}</td>
              <td class="bg-gray">参加工作时间</td>
              <td colspan="2">{{personInfoObj.workDate}}</td>
            </tr>
            <tr>
              <td class="bg-gray">毕业时间</td>
              <td>{{personInfoObj.graduationDate}}</td>
              <td class="bg-gray">毕业院校</td>
              <td>{{personInfoObj.graduationUniversity}}</td>
              <td class="bg-gray">专业</td>
              <td colspan="2">{{personInfoObj.major}}</td>
            </tr>
            <tr>
              <td class="bg-gray">工作单位</td>
              <td colspan="3">{{personInfoObj.workUnit}}</td>
              <td class="bg-gray">职务</td>
              <td colspan="2">{{personInfoObj.workPost}}</td>
            </tr>
            <tr>
              <td class="bg-gray">任现职时间</td>
              <td>{{personInfoObj.currJobDate}}</td>
              <td class="bg-gray">级别</td>
              <td>{{personInfoObj.workLevel}}</td>
              <td class="bg-gray">职称</td>
              <td colspan="2">{{personInfoObj.positionalTitle}}</td>
            </tr>
            <tr>
              <td class="bg-gray">分管工作</td>
              <td colspan="6">{{personInfoObj.manageWork}}</td>
            </tr>
            <tr>
              <td class="bg-gray">住址</td>
              <td colspan="3">{{personInfoObj.address}}</td>
              <td class="bg-gray">邮编</td>
              <td colspan="2">{{personInfoObj.zipCode}}</td>
            </tr>
             <tr>
              <td class="bg-gray">备注</td>
              <td colspan="6">{{personInfoObj.remark}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="module-table-card">
      <div class="card-header clearfix">
        <div class="title">主要任职情况</div>
        <div class="btn-box">
          <Button type="primary" size="large" @click="openWorkEdit" :disabled="btnDisabled" v-if="canEdit">添加</Button>
        </div>
      </div>
      <div>
        <Table highlight-row stripe border :columns="workColumns" :data="workList" no-data-text="待添加"></Table>
      </div>
    </div>
    <div class="module-table-card">
      <div class="card-header clearfix">
        <div class="title">家庭成员情况（包含父母、配偶、子女及配偶、兄弟姐妹）</div>
        <div class="btn-box">
          <Button type="primary" size="large" @click="openFamilyEdit" :disabled="btnDisabled" v-if="canEdit">添加</Button>
        </div>
      </div>
      <div>
        <Table highlight-row stripe border :columns="familyColumns" :data="familyList" no-data-text="待添加"></Table>
      </div>
    </div>
    <attach-prove-file :entity-id="personId" :file-type="1" :btn-disabled="btnDisabled" :btn-visible="canEdit"></attach-prove-file>
    <Modal
      v-model="workModal"
      title="添加任职情况">
      <person-work-form ref="personWorkForm" @submit="submitWorkEdit"></person-work-form>
      <div slot="footer" style="text-align:left;">
        <Button type="primary" size="large" @click="confirmWorkEdit">确定</Button>
        <Button type="error" size="large" @click="cancelWorkEdit">取消</Button>
      </div>
    </Modal>

    <Modal
      v-model="familyModal"
      title="添加家庭成员">
      <person-family-form ref="personFamilyForm" @submitFamily="submitFamilyEdit"></person-family-form>
      <div slot="footer" style="text-align:left;">
        <Button type="primary" size="large" @click="confirmFamilyEdit">确定</Button>
        <Button type="error" size="large" @click="cancelFamilyEdit">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import viewProveFile from './view-prove-file.vue'
  import personWorkForm from '@/components/person-work-form.vue'
  import personFamilyForm from '@/components/person-family-form.vue'
  import attachProveFile from '@/components/attach-prove-file.vue'
  import {dateFormat} from '@/filter/common'
  import urls from "@/config/lzarchives.url.js"
  import {urlConfig} from "@/config/index.js"
import { setPriority } from 'os';
import { setTimeout } from 'timers';
  const jdperson = urls.jdperson;
  export default {
    components:{
      personWorkForm,
      personFamilyForm,
      attachProveFile
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
        importFileUrls:urlConfig.serverUrl+urlConfig.fileUpload,
        downLoadExcelModalUrl:urlConfig.serverUrl+jdperson.downloadExcelModal,
        personId:0,
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
        workModal: false,
        workColumns:[
          {
            title: '起始时间',
            key: 'beginDate',
            align: 'center'
          },
          {
            title: '终止时间',
            key: 'endDate',
            align: 'center'
          },
          {
            title: '所在单位',
            key: 'workUnit',
            align: 'center'
          },
          {
            title: '担任职务',
            key: 'workPost',
            align: 'center'
          }
          // ,{
          //   title: '操作',
          //   align: 'center',
          //   width: 100,
          //   render: (h, params) => {
          //     if(params.row.id != 0){
          //       return h('Button', {
          //         props: {
          //           type: 'error',
          //           size: 'small'
          //         },
          //         style: {
          //           marginRight: '5px'
          //         },
          //         on: {
          //           click: () => {
          //             this.removeListItem(params.row.id,jdperson.workExperience)
          //           }
          //         }
          //       }, '删除')
          //     }
          //   }
          // }
        ],
        workList:[],

        familyModal: false,
        familyColumns:[
          {
            title: '与本人关系',
            key: 'relation',
            align: 'center'
          },
          {
            title: '姓名',
            key: 'fullName',
            align: 'center'
          },
          {
            title: '出生年月',
            key: 'birthday',
            align: 'center'
          },
          {
            title: '政治面貌',
            key: 'politicalBg',
            align: 'center'
          },
          {
            title: '工作单位',
            key: 'workUnit',
            align: 'center'
          },
          {
            title: '职务',
            key: 'workPost',
            align: 'center'
          }
          // ,{
          //   title: '操作',
          //   align: 'center',
          //   width: 100,
          //   render: (h, params) => {
          //     if(params.row.id != 0){
          //       return h('Button', {
          //         props: {
          //           type: 'error',
          //           size: 'small'
          //         },
          //         on: {
          //           click: () => {
          //             this.removeListItem(params.row.id,jdperson.familyMember,'workList',params.row.index)
          //           }
          //         }
          //       }, '删除')
          //     }
          //   }
          // }
        ],
        familyList:[],

        attachFileColumns:[
          {
            title: '编号',
            key: 'serialNumber',
            align: 'center'
          },
          {
            title: '创建日期',
            key: 'serialNumber',
            align: 'center'
          },
          {
            title: '文件名',
            key: 'serialNumber',
            align: 'center'
          },
          {
            title: '备注',
            key: 'serialNumber',
            align: 'center'
          },
          {
            title: '文件',
            key: 'serialNumber',
            align: 'center'
          }
        ],
        attachFileList:[]
      }
    },
    computed:{
      btnDisabled(){
        return this.personId*1 == 0;
      },
      importText(){
        return this.personId*1 == 0 ? '导入' : '重新导入';
      }
    },
    watch:{
      entityId: {
        handler(newValue, oldValue) {
          this.personId = newValue;
          if(this.personId*1 != 0){
            this.getDetail();
            this.getWorkList();
            this.getFamilyList();
          }
        },
        immediate:true
      },
    },
    methods:{
      downloadExcelModal(){
        this.$downFile(jdperson.downloadExcelModal);
      },
      importBaseInfo(el){
        let files = el.target.files;
        let urlparam = this.personId*1 == 0 ? '' : '/'+this.personId;
        if(files.length){
          let file = files[0];
          let param = new FormData();
          param.append('file',file,file.name);
          this.$thttp({
            method:'file',
            isUpdate: this.personId*1 == 0 ? false : true,
            url:jdperson.importBaseInfo+urlparam,
            data:param
          })
          .then(data=>{
            if(data.code*1 == 0){
              this.personInfoObj = data.data;
              this.personId = data.data.id;
              this.$emit('changeEntity',data.data);
            }else{
              this.$Message.warning(data.msg);
            };
          });
        }
        setTimeout(()=>{
          el.target.value="";
        },0)
      },
      getDetail(){
        this.$thttp({
          url:jdperson.detail+this.personId,
          method:'get'
        }).then(data=>{
          if(data.code*1 == 0){
            this.personInfoObj = data.data;
            // this.personId = data.data.id; // 信息本来就是根据id查出来的
            this.$emit('changeEntity',data.data);
          }
        })
      },
      getListCommon(url,param,listName){
        let dataObj = Object.assign({
          page:1,
          pageSize:20,
          personalId:this.personId
        },param);
        this.$thttp({
          url:url,
          method:'post',
          data:dataObj
        }).then(data=>{
          if(data.code*1 == 0){
            this[listName] = data.data;
          }
        })
      },
      getWorkList(){
        this.getListCommon(jdperson.workExperienceList,{},'workList');
      },
      getFamilyList(){
        this.getListCommon(jdperson.familyMemberList,{},'familyList');
      },
      getFileList(){
        this.getListCommon(jdperson.urls.proveFileList,{fileType:1},'attachFileList');
      },
      openWorkEdit(){
        this.$refs.personWorkForm.handleReset();
        this.workModal = true;
      },
      submitWorkEdit(obj){
        this.workModal = false;
        obj.personalId = this.personId;
        this.$thttp({
          url:jdperson.workExperience,
          method:'post',
          data:obj
        }).then(data=>{
          if(data.code*1 == 0){
            this.getWorkList();
          }else{
            this.$Message.warning(data.msg);
          }
        })
      },
      confirmWorkEdit(){
        this.$refs.personWorkForm.handleSubmit();
      },
      cancelWorkEdit(){
        this.workModal = false;
      },
      removeListItem (id,url,list,index) {
        this.$thttp({
          url:url+'/'+id,
          method:'delete'
        }).then(data=>{
          if(data.code*1 == 0){
            this.$Message.success('删除成功');
            this[list].splice(index,1);
          }else{
            this.$Message.warning(data.msg);
          }
        })
      },

      openFamilyEdit(){
        this.familyModal = true;
      },
      submitFamilyEdit(obj){
        this.familyModal = false;
        obj.personalId = this.personId;
        this.$thttp({
          url:jdperson.familyMember,
          method:'post',
          data:obj
        }).then(data=>{
          if(data.code*1 == 0){
            this.getFamilyList();
          }else{
            this.$Message.warning(data.msg);
          }
        })
      },
      confirmFamilyEdit(){
        this.$refs.personFamilyForm.handleSubmit();
      },
      cancelFamilyEdit(){
        this.familyModal = false;
      }
    }
  }
</script>