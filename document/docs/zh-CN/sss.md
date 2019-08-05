   **JS小技巧**
   - 类型强制转换
   可以用*1来转化为数字(实际上是调用.valueOf方法) 然后使用Number.isNaN来判断是否为NaN，或者使用 a !== a 来判断是否为NaN，因为 NaN !== NaN
   ```
   '32' * 1            // 32
'ds' * 1            // NaN
null * 1            // 0
undefined * 1    // NaN
1  * { valueOf: ()=>'3' }        // 3
   ```
   -  使用Boolean过滤数组中的所有假值
   我们知道JS中有一些假值：false，null，0，""，undefined，NaN，怎样把数组中的假值快速过滤呢，可以使用Boolean构造函数来进行一次转换
   ```
   const compact = arr => arr.filter(Boolean)
   compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34])             // [ 1, 2, 3, 'a', 's', 34 ]
   ```
   - 双位运算符 ~~
   可以使用双位操作符来替代正数的 Math.floor( )，替代负数的Math.ceil( )。双否定位操作符的优势在于它执行相同的操作运行速度更快。
   ```
   Math.floor(4.9) === 4      //true
// 简写为：
~~4.9 === 4      //true
   ```
   不过要注意，对正数来说 ~~ 运算结果与 Math.floor( ) 运算结果相同，而对于负数来说与Math.ceil( )的运算结果相同：
   ```
   ~~4.5                // 4
Math.floor(4.5)      // 4
Math.ceil(4.5)       // 5
~~-4.5        		// -4
Math.floor(-4.5)     // -5
Math.ceil(-4.5)      // -4
   ```
   - 取整 | 0
   ```
   1.3 | 0         // 1
	-1.9 | 0        // -1
   ```
   - 判断奇偶数
   ```
   const num=3;
!!(num & 1)                    // true
!!(num % 2)                    // true
   ```
   - 使用解构删除不必要属性
   ```
   let {_internal, tooBig, ...cleanObject} = {el1: '1', _internal:"secret", tooBig:{}, el2: '2', el3: '3'};
  console.log(cleanObject);      // {el1: '1', el2: '2', el3: '3'}
   ```

