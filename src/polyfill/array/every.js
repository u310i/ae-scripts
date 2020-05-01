if (!Array.prototype.every) {
  Array.prototype.every = function(callbackfn, thisArg) {
    "use strict";
    var T, k;

    if (this == null) {
      throw new TypeError("this is null or not defined");
    }

    // 1. O は、this を引数として ToObject に渡し、実行した結果です。
    var O = Object(this);

    // 2. lenValue は、"length" を引数として O の Get 内部メソッドを実行した結果です。
    // 3. len を ToUint32(lenValue) とします。
    var len = O.length >>> 0;

    // 4. IsCallable(callbackfn) が false の場合、TypeError 例外がスローされます。
    if (typeof callbackfn !== "function") {
      throw new TypeError();
    }

    // 5. thisArg が与えられた場合、T は thisArg となり、さもなくば T は undefined となります。
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. k を 0 とします。
    k = 0;

    // 7. k < len が成り立つ間、繰り返します。
    while (k < len) {
      var kValue;

      // a. Pk を ToString(k) とします。
      //    これは in 演算子の左オペランドについて暗黙的です。
      // b. kPresent は、Pk を引数として O の HasProperty 内部メソッドを実行した結果です。
      //   このステップは c と組み合わせられます。
      // c. kPresent が true の場合、続きます。
      if (k in O) {
        // i. kValue は、Pk を引数として O の Get 内部メソッドを実行した結果です。
        kValue = O[k];

        // ii. testResult は、this 値としての T と、kValue、k、0 を含む引数リストを
        //     ともなって、callbackfn の Call 内部メソッドを実行した結果です。
        var testResult = callbackfn.call(T, kValue, k, O);

        // iii. ToBoolean(testResult) が false の場合、false を返します。
        if (!testResult) {
          return false;
        }
      }
      k++;
    }
    return true;
  };
}
