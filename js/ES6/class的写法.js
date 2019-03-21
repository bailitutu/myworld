// js语言中，生成实例对象的传统方法就是通过构造函数：

function Point (x, y){
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function(){
    return `( ${this.x} , ${this.y} )`
}
var p = new Point(1,2);
p.toString();
//"(1,2)"
/*
这种面向对象和（Java、c++）差别很大，让人感到困惑;ES6提供了class（类）这个概念，作为对象的模板。通过class关键字，可以定义类；
基本上，ES6的class可以看做知识一个语法糖，它的绝大部分功能，ES5都可以看到，新的class写法只是让对象原型的写法更加清晰，更像面向对象编程语法而已；上面的代码用class改写：*/

//定义类

class Point {
    constructor (x, y) {
        this.x =x;
        this.y =y;
    }

    toString () {
        return `( ${this.x}, ${this.y} )`;
    }
    toValue () {
        return this.x+this.y;
    }
}
var p = new Point(1,2);
p.toString();
//"(1,2)"
p.toValue();
//3
// 定义了一个Point类，他里面有个constructor方法，这就是构造方法；而this关键字则代表实例对象，也就是说，ES5的构造函数Point，对应ES6的Point类的构造方法； Point类除了构造方法，还定义了一个toString方法，定义类的方法的时候，前面不需要加function这个关键字,直接将函数定义放进去就行了 ，另外，方法之间不需要逗号分隔；
// 构造函数的prototype属性，在ES6的类上继续存在，实际上，类的所有方法都定义在类的prototype属性上面；

/*

严格模式
在类和模块的内部默认就是严格模式，所以不需要use strict指定运行模式,只要代码写在类或者模块之中，就只有严格模式可用；
*/

/*
constructor方法
constructor方法是类的默认方法，通过new 命令生成对象实例时，自动调用该方法，一个类必须有constructor方法，如果没有显示定义，一个空的constructor方法会被默认添加；
*/


constructor方法默认返回实例对象（即this）,完全可以指定返回另外一个对象；

class Person {
    constructor  () {
        return Object.create(null);
    }
}

new Person() instanceof Person
//false
//实例      instanceof 构造函数  用来判断实例是否是构造函数的实例

/*
类的实例对象
生成的实例对象的写法，与ES一样都是使用new命令，实例的属性除非显示定义在其本身（即定义在this对象上）,否则都是定义在原型上(即定义在class上)；

//定义类
class Point {
    constructor (x, y) {
        this.x =x;
        this.y =y;
    }
    toString () {
        return `(${this.x},${this.y})`;
    }
}

var point = new Point(1,2);

point.toString();//(1,2)

point.hasOwnProperty("x"); //true
point.hasOwnProperty("y"); //true
point.hasOwnProperty("toString");//fasle
point.__proto__.hasOwnProperty("toString");//true
x和y都是实例对象point自身的属性（因为定义在this变量上）,所以hasOwnProperty方法返回true，而toString是原型对象的属性（因为定义在Point类上）,所以hasOwnProperty()方法返回false,这些都是ES5的行为保持一致；
*/

/*
class表达式
与函数一样，类也可以使用表达式的形式定义

const MyClass = class Me{
        getClassName () {
               return Me.name ;
            }
};
上面代码使用表达式定义了一个类，需要注意的是，这个类的名字MyClass而不是Me,Me只在Class的内部代码可用，这代当前类；

let inst  = new MyClass();
inst .getClassName();
//"Me"
Me.name
//ReferenceError :Me is not defined
Me只有在Class内部有定义；
如果类的内部没有用到的话，可以省略Me，可以改写成：

const MyClass = class {
    getClassName () {
               return  ;
            }
}
采用Class表达式，可以写出立即执行Class

let person = new class {
      constructor (name) {
          this.name = name ;
          }

       sayName() {
                  console.log(this.name);
          }
}("张三");

person.sayName();
//"张三"
*/



/*
* Class 的静态方法
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
Foo类的classMethod方法前有static关键字，表明该方法是一个静态方法，可以直接在Foo类上调用（Foo.classMethod()），而不是在Foo类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。
注意，如果静态方法包含this关键字，这个this指的是类，而不是实例。

class Foo {
  static bar () {
    this.baz();
  }
  static baz () {
    console.log('hello');
  }
  baz () {
    console.log('world');
  }
}

Foo.bar() // hello
静态方法bar调用了this.baz，这里的this指的是Foo类，而不是Foo的实例，等同于调用Foo.baz。另外，从这个例子还可以看出，静态方法可以与非静态方法重名。
父类的静态方法，可以被子类继承。

class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod() // 'hello
静态方法也是可以从super对象上调用的。




Class 的静态属性和实例属性
静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。

class Foo {
}

Foo.prop = 1;
Foo.prop // 1
//Foo类定义了一个静态属性prop,只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。
（1）类的实例属性
类的实例属性可以用等式，写入类的定义之中

class MyClass {
  myProp = 42;

  constructor() {
    console.log(this.myProp); // 42
  }
}
//myProp就是MyClass的实例属性。在MyClass的实例上，可以读取这个属性。


*/
