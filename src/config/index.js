export default {
    /**
     * @description 配置显示在浏览器标签的title
     */
    title: 'iView-admin',
    /**
     * @description token在Cookie中存储的天数，默认1天
     */
    cookieExpires: 1,
    /**
     * @description api请求基础路径
     */
    baseUrl: {
      dev: 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/',
      pro: 'https://produce.com'
    },
    /**
     * @description 默认打开的首页的路由name值，默认为home
     */
    homeName: 'home',

    testUrl:'http://prc33.858.im/dept/list',
    testToken:'',
    //网站根目录
    baseUrl:'http://spzl.xwnykzs.com/gk/',
    //网站首页
    webIndex:'http://spzl.xwnykzs.com/#/',
    //请求路径
    serverUrl:'http://zljg.jscssui.cn/api/',
    //图片根路径
    imgUrl:'http://zljg.jscssui.cn/api/problem',
    pageConfig:{
        page:1,
        pageSize:10,
        maxSize:5,
        total:0,
        //可选的每页数据数目
        pageSelect:[10,15,20]
    },
    //问题投诉
    complainSave:'problem/saveProblemInfo',
    //文件上传
    fileUpload:'problem/uploadProfiles'
  }
  