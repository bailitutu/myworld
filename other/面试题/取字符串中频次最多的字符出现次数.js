// 找出字符串中出现频次最多的字符
/*解决方案：取出字符串的第一个字符（首字母），利用的字符串的 replace 方法将符合正则表达式（第一个字符）替代为空，

此字母出现的次数为原始的字符串长度减去替代后的字符串长度。循环迭代找出长度最长的字母。*/


var str = '12asdfas23asdfao09fasdflllcunelgoslkmwe';

var maxLength =0;
var result = '';

while( str != '' ){
    oldStr = str; //将原始的字符串变量赋值给新变量
    getStr = str.substr(0,1); //用字符串的substr的方法得到第一个字符（首字母）
    eval("str = str.replace(/"+getStr+"/g,'')"); //详细如补充
    if( oldStr.length-str.length > maxLength ) { //判断原始的字符串的长度减去替代后字符串长度是否大于之前出现的最大的字符串长度
        maxLength = oldStr.length-str.length; //两字符串长度相减得到最大的字符串长度
        result = getStr + "=" + maxLength //返回最大的字符串结果（字母、出现次数）
    }
}
alert(result);

















