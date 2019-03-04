// .插入排序:
//
//     解析：
//
// （1） 从第一个元素开始，该元素可以认为已经被排序
//
//  （2） 取出下一个元素，在已经排序的元素序列中从后向前扫描
//
//  （3） 如果该元素（已排序）大于新元素，将该元素移到下一位置
//
//  （4） 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置
//
//  （5）将新元素插入到下一位置中
//
//  （6） 重复步骤2

function sort(elements){
    //假设第一个数是有序排列，之后的为无序排列
    
    for( var i=1;i<elements.length;i++){
        if( elements[i] < elements[i-1]){
            var guard = elements[i];
            var j=i-1;
            elements[i] = elements[j];
            while (j>=0 && guard <elements[j]){
                elements[j+1] =elements[j];
                j--
            }
            elements[j+1] = guard;
        }
    }
}


var elements = [5,9,3,6,7,4 ];
console.log( elements);
sort(elements);
console.log( elements);


