export default {
  fileUpload:'bs/uploadFile'// 文件上传
  ,attachProveFile:'bs/attachmentProveFile'// 保存附件
  ,downProveFile:'bs/downloadFile'// 下载附件
  ,proveFileList:'bs/attachmentProveFiles'// 附件列表
  ,importExcel:'bs/returnExcelFileData'
  ,jdperson:{
    list:'bs/personalInfos'
    ,add:'bs/personalMgrInfo'
    ,detail:'bs/personalInfo/'
    ,changeJobState:'bs/personalInfo/'
    ,importBaseInfo:'bs/personalInfo/importBasicInfo'
    ,workExperience:'bs/postExperience'
    ,deleteWorkExperience:'bs/postExperiences/'
    ,workExperienceList:'bs/postExperiences'
    ,familyMember:'bs/familyMember'
    ,deleteFamilyMember:'bs/familyMembers/'
    ,familyMemberList:'bs/familyMembers'
    ,attachProveFile:'bs/attachmentProveFile'
    //奖惩情况
    ,saveRewardPunish:'bs/rewardPunishment/multi'
    ,rewardPunishList:'bs/rewardPunishments'
    ,rewardPunishDetail:'bs/rewardPunishment/'
    //礼品礼金
    ,saveRefusedMoney:'bs/refusedMoney/multi'
    ,refusedMoneyList:'bs/refusedMoneys'
    ,refusedMoneyDetail:'bs/refusedMoney/'
    //操办婚丧喜庆事宜
    ,saveFeastInfo:'bs/feastInfo/multi'
    ,feastInfoList:'bs/feastInfos'
    ,feastInfoDetail:'bs/feastInfo/'
    //投资入股
    ,saveInvestmentInfo:'bs/investmentInfo/multi'
    ,investmentInfoList:'bs/investmentInfos'
    ,investmentInfoDetail:'bs/investmentInfo/'
    //兼职
    ,saveParttimeJob:'bs/parttimeJob/multi'
    ,parttimeJobList:'bs/parttimeJobs'
    ,parttimeJobDetail:'bs/parttimeJob/'
    //经办公司
    ,saveOperateCompany:'bs/operateCompany/multi'
    ,operateCompanyList:'bs/operateCompanys'
    ,operateCompanyDetail:'bs/operateCompany/'
    //谈话询函
    ,saveChatInfo:'bs/chatInfo/multi'
    ,chatInfoList:'bs/chatInfos'
    ,chatInfoDetail:'bs/chatInfo/'
    //党纪处分
    ,savePartyPunishment:'bs/partyPunishment/multi'
    ,partyPunishmentList:'bs/partyPunishments'
    ,partyPunishmentDetail:'bs/partyPunishment/'
    //重大事项
    ,saveMajorIssue:'bs/majorIssue/multi'
    ,majorIssueList:'bs/majorIssues'
    ,majorIssueDetail:'bs/majorIssue/'
  },
  importTy:{
    reward:1,
    punish:2,
    lplj:3
  },
  glperson:{
    list:'bs/personalMgrInfos'
    ,import:'bs/personalMgrInfo/importBasicInfo'
    ,add:'bs/personalMgrInfo'
    ,delete:'bs/personalMgrInfos/'
    ,detail:'bs/personalMgrInfo/'
    ,changeJobState:'bs/personalMgrInfo/'
    ,userList:'sys/users/select'
  },
  operatelog:{
    list:'sys/operationLogs'
  }
}