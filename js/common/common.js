// 获取url参数






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

