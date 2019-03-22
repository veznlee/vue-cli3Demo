export default function(obj){
  //obj =  {url:'',type:'',data:''}
  //默认参数
  obj = obj || {};
  obj.type = (obj.type || 'GET').toUpperCase();
  obj.dataType = obj.dataType || 'json';
  //辅助函数，格式化参数
  function formatParams(data) {
    var arr = [];
    for (var name in data) {
      arr.push(name + "=" + data[name]);
    }
    //设置随机数，防止缓存
    // arr.push("t=" + Math.random());
    return arr.join("&");
  }

  function trigger(mouseType,domId){
    //IE
    if(document.all) {
      document.getElementById("domId").click();
    }
    // 其它浏览器
    else {
      var e = document.createEvent("MouseEvents");
      e.initEvent(mouseType, true, true);　　　　　　　　　　　　　//这里的click可以换成你想触发的行为
      document.getElementById(domId).dispatchEvent(e);　　　//这里的clickME可以换成你想触发行为的DOM结点
    }   
  }

  var params = formatParams(obj.data); //参数格式化
  //创建发送请求
  var xhr = window.XMLHttpRequest ?  new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'); //兼容ie
  xhr.responseType = "blob";    // 返回类型blob
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        //返回状态判断
        // 返回200
        var blob = this.response;
        var reader = new FileReader();
        reader.readAsDataURL(blob);    // 转换为base64，可以直接放入a表情href
        reader.onload = function (e) {
          // 转换完成，创建一个a标签用于下载
          var a = document.createElement('a');
          a.download = 'data.xlsx';
          a.href = e.target.result;
          document.body.appendChild(a);
          // $("body").append(a);    // 修复firefox中无法触发click
          a.click();
          // $(a).remove();
          a.parentNode.removeChild(a);
        }
      }else{
        //obj.callback('error:' + xhr.status + xhr.statusText);
      }
    }
  }
  console.log(obj.type);
  //step2 step3:连接 和 发送
  if (obj.type == 'GET') {
    xhr.open('GET', obj.url + '?' + params, true);
    //xhr.setRequestHeader('appId', $APPID);
    xhr.send(null);
  } else if (obj.type == 'POST') {
    xhr.open('POST', obj.url, true);
    //设置请求头，以表单形式提交数据
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //xhr.setRequestHeader('appId', $APPID);
    xhr.send(obj.data);
  }
};


function exportFile(token, filePath) {
  // var form = $("<form>");
  // form.attr("style", "display:none");
  // form.attr("target", "");
  // form.attr("method", "post");//提交方式为post
  // form.attr("action", "http://192.168.0.106:8081/bs/downloadFile");//定义action
  
  // var inputFilePath = $("<input>");
  //     inputFilePath.attr("type","hidden");
  //     inputFilePath.attr("name","filePath");
  //     inputFilePath.attr("value",filePath);
      
  // var inputToken = $("<input>");
  //     inputToken.attr("type","hidden");
  //     inputToken.attr("name","token");
  //     inputToken.attr("value",token);
      
  // $("body").append(form);
  // form.append(inputFilePath);   //将参数控件提交到表单上
  // form.append(inputToken);   //将参数控件提交到表单上
  
  // form.submit();
}
