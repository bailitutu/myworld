// 获取url参数

function getQueryStr(str) {
    var LocString = String(window.document.location.href);
    var rs = new RegExp("(^|)" + str + "=([^&]*)(&|$)", "gi").exec(LocString), tmp;
    if (tmp = rs) {
        return tmp[2];
    }
    return "";
}
// 获取url参数
function getValue(obj) {
    var str = decodeURI(window.location.href);
    var str1 = str.split("?")[1];
    if (str1) {
        str2 = str1.split("&");
        var jsons = {};
        for (var i = 0; i < str2.length; i++) {
            var keys = str2[i].split("=")[0];
            var value = str2[i].split("=")[1];
            jsons[keys] = value;
        }
        if (jsons[obj]) {
            return jsons[obj];
        } else {
            return "";
        }
    } else {
        return "";
    }
}


/**防止sql注入**/
function filterSqlStr(value) {
    var str = "and,delete,or,exec,insert,select,union,update,count,*,',join,>,<";
    var sqlStr = str.split(',');
    var flag = true;
    
    for (var i = 0; i < sqlStr.length; i++) {
        if (value.toLowerCase().indexOf(sqlStr[i]) != -1) {
            flag = false;
            break;
        }
    }
    return flag;
}

/**判断字符是否为空的方法**/
function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "" || obj == 'null') {
        return true;
    }
    return false;
}

/*检测是否为手机号*/
function isPhone(phone){
    if(!(/^1[34578]\d{9}$/.test(phone))){
        return false;
    }
    return true;
}

// 获取信息公共方法
function getData(url, params, success, error) {
    var token = getLocalStorage('dripToken') || '';
    if (!token) {
        $.alert({
            message: '登录超时，请重新登录！', callback: function () {
                window.location.href = 'login.html'
            }
        });
    }
    $.ajax({
        type: "get",
        url: baseUrl + url,
        headers: {'token': token},
        data: params || {},
        dataType: "json",
        success: function (data) {
            if ("0000000" == data.head.respCode) {
                success(data.body)
            } else {
                $.alert(data.head.respContent);
            }
        },
        error: function (err) {
            $.alert("系统维护中...");
            error ? error(err) : null;
        }
    });
    
    
}

//post 方法
function postData(url, params, success, error) {
    var token = getLocalStorage('dripToken') || '';
    if (!token) {
        $.alert({
            message: '登录超时，请重新登录！',
            callback: function () {
                window.location.href = 'login.html'
            }
        });
    }
    $.ajax({
        type: "post",
        url: baseUrl + url,
        headers: {'token': token},
        data: params || {},
        dataType: "json",
        success: function (data) {
            if ("0000000" == data.head.respCode) {
                success(data.body)
            } else {
                $.alert(data.head.respContent);
            }
        },
        error: function (err) {
            $.alert("系统维护中...");
            error ? error(err) : null;
        }
    });
    
    
}

//设置localStorage
function setLocalStorage(key, value, seconds) {
    if (!value) localStorage.removeItem(key);
    else {
        var seconds = (seconds || 30 * 60) * 1000; // 资源有效期，默认保留30分钟
        var exp = new Date();
        localStorage[key] = JSON.stringify({value: value, expires: exp.getTime() + seconds});
    }
};


// 获取LocalStorage
function getLocalStorage(key) {
    if (localStorage.length > 0 && localStorage[key]) {
        var o = JSON.parse(localStorage[key]);
        localStorage.removeItem(key)
        if (!o || o.expires < Date.now()) return null;
        if (o && o.expires >= Date.now()) setLocalStorage(key, o.value);
        return o.value
    } else return null;
};

// 判断是否为金额
function isMoney(){


}
// 判断是否为邮箱
function isEmail(email){
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    return reg.test(email);
}

// 判断是否为身份证
function isSelfCard(){

}
// 隐藏手机号中间四位
function hidePhone(phone){
    return phone.substr(0,3)+ '****'+ phone.substr(7);
}


// 获取cookies
function getCookies(key){
    var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}


// 设置cookies
function setCookies(key,value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + 30 * 60 * 1000);
    document.cookie = key + "=" + escape(value) + ";expires=" + exp.toGMTString();
}


// 清空cookies
function clearCookies(key) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(key);
    if (cval != null) document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString();
}
