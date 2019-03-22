export default {
    trim:function(str){
　　    return str.replace(/(^\s*)|(\s*$)/g, "");
　　},
    /*去除字符串左边空格*/
　　ltrim:function(str){
　　    return str.replace(/(^\s*)/g,"");
　　},
    /*去除字符串右边空格*/
　　rtrim:function(str){
　　    return str.replace(/(\s*$)/g,"");
　　},
    isPhone:function(str){
        return /^1[345789]\d{9}$/.test(str);
    },
    isTelPhone:function(str){
        return /^(0\d{3}\-?\d{7})|(0\d{2}\-?\d{8})|(1[345789]\d{9})$/.test(str);
    },
    isCnIdCard:function(str){
        return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/.test(str);
    },
    isCnName:function(str){
        //return /^([\u4e00-\u9fa5]+(·{0,1})){0,4}[\u4e00-\u9fa5]$/.test(str);
        return /^[\u4e00-\u9fa5]{2,4}$/.test(str);
    },
    isEmail:function(str){
        return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(str);
    },
    /*判断值是否为空*/
    isEmpty:function(val){
        if ((val==null || typeof val =="undefined")|| (typeof(val)=="string"&&val==""&&val!="undefined") || val === undefined ){
            return true;
        }else{
            return false;
        }
    },
    /*判断一个object对象是否为空*/
    isEmptyObj:function(obj){
        for(var key in obj){
            return false;
        };
        return true;
    },
    computedFileSize:function (number) {
        if(number < 1024) {
          return number + 'bytes';
        } else if(number >= 1024 && number < 1048576) {
          return (number/1024).toFixed(1) + 'KB';
        } else if(number >= 1048576) {
          return (number/1048576).toFixed(1) + 'MB';
        }
    },
    bytesToSize:function (bytes){
        if (bytes === 0) return '0 B';
        let k = 1024, // or 1000
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    },
    dateFormat:function(date,fmt){
        var date = new Date(date);
        var o = {
            "M+" : date.getMonth() + 1,
            // 月份
            "d+" : date.getDate(),
            // 日
            "h+" : date.getHours() % 12 == 0 ? 12 : date.getHours() % 12,
            // 小时
            "H+" : date.getHours(),
            // 小时
            "m+" : date.getMinutes(),
            // 分
            "s+" : date.getSeconds(),
            // 秒
            "q+" : Math.floor((date.getMonth() + 3) / 3),
            // 季度
            "S" : date.getMilliseconds()
            // 毫秒
        };
        var week = {
            "0" : "/u65e5",
            "1" : "/u4e00",
            "2" : "/u4e8c",
            "3" : "/u4e09",
            "4" : "/u56db",
            "5" : "/u4e94",
            "6" : "/u516d"
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(
                    RegExp.$1,
                    ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f"
                        : "/u5468")
                        : "")
                    + week[date.getDay() + ""]);
        }
        for ( var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
                    : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
}