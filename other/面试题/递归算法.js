
// 函数原理：自己调用自己，从后往前倒推
//例子： 公园里有一堆桃子，猴子每天吃掉一半，挑出一个坏的扔掉，第6天的时候发现还剩1个桃子，问原来有多少个桃子

var s1; //桃子总数
 // n为天数
function getNumber(n){
    
    if(n == 6){
        s1 = 1;
    }else{
        s1 = (getNumber(n+1)+1)*2;
    }
    return s1;
}

getNumber(0);//190

// 分析：
// getNumber(6) = 1;
// getNumber(5) = (1+1)*2 = 4
// getNumber(4) = (4+1)*2 = 10
// getNumber(3) = (10+1)*2 = 22
// getNumber(2) = (22+1)*2 = 46
// getNumber(1) = (46+1)*2 = 94
// getNumber(0) = (94+1)*2 = 190
