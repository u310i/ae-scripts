(function () {
  'use strict';

  if (!Object.defineProperty) {
    Object.defineProperty = function defineProperty(object, property, descriptor) {
      if (Object(object) !== object) {
        throw new TypeError("Object.defineProperty can only be called on Objects.");
      }

      if (Object(descriptor) !== descriptor) {
        throw new TypeError("Property description can only be an Object.");
      }

      if ("get" in descriptor || ("set" in descriptor)) {
        throw new TypeError("getters & setters can not be defined on this javascript engine");
      } // If it's a data property.


      if ("value" in descriptor) {
        // fail silently if 'writable', 'enumerable', or 'configurable'
        // are requested but not supported
        // can't implement these features; allow true but not false

        /* if (
                     ('writable' in descriptor && !descriptor.writable) ||
                     ('enumerable' in descriptor && !descriptor.enumerable) ||
                     ('configurable' in descriptor && !descriptor.configurable)
                 )
                     {
                         throw new RangeError('This implementation of Object.defineProperty does not support configurable, enumerable, or writable properties SET to FALSE.');
                     }*/
        object[property] = descriptor.value;
      }

      return object;
    };
  }

  /*
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties#Polyfill
  */
  if (!Object.defineProperties) {
    Object.defineProperties = function (object, props) {
      function hasProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }

      function convertToDescriptor(desc) {
        if (Object(desc) !== desc) {
          throw new TypeError("Descriptor can only be an Object.");
        }

        var d = {};

        if (hasProperty(desc, "enumerable")) {
          d.enumerable = !!desc.enumerable;
        }

        if (hasProperty(desc, "configurable")) {
          d.configurable = !!desc.configurable;
        }

        if (hasProperty(desc, "value")) {
          d.value = desc.value;
        }

        if (hasProperty(desc, "writable")) {
          d.writable = !!desc.writable;
        }

        if (hasProperty(desc, "get")) {
          throw new TypeError("getters & setters can not be defined on this javascript engine");
        }

        if (hasProperty(desc, "set")) {
          throw new TypeError("getters & setters can not be defined on this javascript engine");
        }

        return d;
      }

      if (Object(object) !== object) {
        throw new TypeError("Object.defineProperties can only be called on Objects.");
      }

      if (Object(props) !== props) {
        throw new TypeError("Properties can only be an Object.");
      }

      var properties = Object(props);

      for (propName in properties) {
        if (hasOwnProperty.call(properties, propName)) {
          var descr = convertToDescriptor(properties[propName]);
          object[propName] = descr.value;
        }
      }

      return object;
    };
  }

  Object.getOwnPropertyDescriptor = function (object, key) {
    var hasSupport = typeof object.__lookupGetter__ === "function" && (typeof object.__lookupSetter__ === "function"); // TODO: How does one determine this?!

    var isGetterSetter = !hasSupport ? (null) : (object.__lookupGetter__(key) || (object.__lookupSetter__(key)));
    return isGetterSetter != null ? ({
      configurable: true,
      enumerable: true,
      get: object.__lookupGetter__(key),
      set: object.__lookupSetter__(key)
    }) : ({
      configurable: true,
      writable: true,
      enumerable: true,
      value: object[key]
    });
  };

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
  if (!Object.keys) {
    Object.keys = function () {

      var hasOwnProperty = Object.prototype.hasOwnProperty,
          hasDontEnumBug = !{
        toString: null
      }.propertyIsEnumerable("toString"),
          dontEnums = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
          dontEnumsLength = dontEnums.length;
      return function (obj) {
        if (typeof obj !== "function" && (_typeof(obj) !== "object" || (obj === null))) {
          throw new TypeError("Object.keys called on non-object");
        }

        var result = [],
            prop,
            i;

        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }

        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }

        return result;
      };
    }();
  }

  //  Yes, it does work with `new funcA.bind(thisArg, args)`
  if (!Function.prototype.bind) (function () {
    var ArrayPrototypeSlice = Array.prototype.slice;

    Function.prototype.bind = function (otherThis) {
      if (typeof this !== "function") {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
      }

      var baseArgs = ArrayPrototypeSlice.call(arguments, 1),
          baseArgsLength = baseArgs.length,
          fToBind = this,
          fNOP = function fNOP() {},
          fBound = function fBound() {
        baseArgs.length = baseArgsLength; // reset to default base arguments

        baseArgs.push.apply(baseArgs, arguments);
        return fToBind.apply(fNOP.prototype.isPrototypeOf(this) ? (this) : (otherThis), baseArgs);
      };

      if (this.prototype) {
        // Function.prototype doesn't have a prototype property
        fNOP.prototype = this.prototype;
      }

      fBound.prototype = new fNOP();
      return fBound;
    };
  })();
  Function.prototype.call.bind = Function.prototype.bind;

  /*
   * forEach Polyfill
   *
   * 2015-12-27
   *
   * By Feifei Hang, http://feifeihang.info
   * Public Domain.
   * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
   */

  (function () {
    if (!Array.prototype.forEach) {
      Array.prototype.forEach = function forEach(callback, thisArg) {
        if (typeof callback !== "function") {
          throw new TypeError(callback + " is not a function");
        }

        var array = this;
        thisArg = thisArg || (this);

        for (var i = 0, l = array.length; i !== l; ++i) {
          callback.call(thisArg, array[i], i, array);
        }
      };
    }
  })();

  // Production steps of ECMA-262, Edition 5, 15.4.4.19
  // Reference: http://es5.github.io/#x15.4.4.19
  if (!Array.prototype.map) {
    Array.prototype.map = function (callback
    /*, thisArg*/
    ) {
      var T, A, k;

      if (this == null) {
        throw new TypeError("this is null or not defined");
      } // 1. Let O be the result of calling ToObject passing the |this|
      //    value as the argument.


      var O = Object(this); // 2. Let lenValue be the result of calling the Get internal
      //    method of O with the argument "length".
      // 3. Let len be ToUint32(lenValue).

      var len = O.length >>> 0; // 4. If IsCallable(callback) is false, throw a TypeError exception.
      // See: http://es5.github.com/#x9.11

      if (typeof callback !== "function") {
        throw new TypeError(callback + " is not a function");
      } // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.


      if (arguments.length > 1) {
        T = arguments[1];
      } // 6. Let A be a new array created as if by the expression new Array(len)
      //    where Array is the standard built-in constructor with that name and
      //    len is the value of len.


      A = new Array(len); // 7. Let k be 0

      k = 0; // 8. Repeat, while k < len

      while (k < len) {
        var kValue, mappedValue; // a. Let Pk be ToString(k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the HasProperty internal
        //    method of O with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then

        if (k in O) {
          // i. Let kValue be the result of calling the Get internal
          //    method of O with argument Pk.
          kValue = O[k]; // ii. Let mappedValue be the result of calling the Call internal
          //     method of callback with T as the this value and argument
          //     list containing kValue, k, and O.

          mappedValue = callback.call(T, kValue, k, O); // iii. Call the DefineOwnProperty internal method of A with arguments
          // Pk, Property Descriptor
          // { Value: mappedValue,
          //   Writable: true,
          //   Enumerable: true,
          //   Configurable: true },
          // and false.
          // In browsers that support Object.defineProperty, use the following:
          // Object.defineProperty(A, k, {
          //   value: mappedValue,
          //   writable: true,
          //   enumerable: true,
          //   configurable: true
          // });
          // For best browser support, use the following:

          A[k] = mappedValue;
        } // d. Increase k by 1.


        k++;
      } // 9. return A


      return A;
    };
  }

  // Production steps of ECMA-262, Edition 5, 15.4.4.17
  // Reference: http://es5.github.io/#x15.4.4.17
  if (!Array.prototype.some) {
    Array.prototype.some = function (fun, thisArg) {

      if (this == null) {
        throw new TypeError("Array.prototype.some called on null or undefined");
      }

      if (typeof fun !== "function") {
        throw new TypeError();
      }

      var t = Object(this);
      var len = t.length >>> 0;
      var thisArg = arguments.length >= 2 ? (arguments[1]) : (void 0);

      for (var i = 0; i < len; i++) {
        if (i in t && (fun.call(thisArg, t[i], i, t))) {
          return true;
        }
      }

      return false;
    };
  }

  if (!Array.prototype.filter) {
    Array.prototype.filter = function (func, thisArg) {

      if (!((typeof func === "Function" || (typeof func === "function")) && (this))) throw new TypeError();
      var len = this.length >>> 0,
          res = new Array(len),
          // preallocate array
      t = this,
          c = 0,
          i = -1;
      var kValue;

      if (thisArg === undefined) {
        while (++i !== len) {
          // checks to see if the key was set
          if (i in this) {
            kValue = t[i]; // in case t is changed in callback

            if (func(t[i], i, t)) {
              res[c++] = kValue;
            }
          }
        }
      } else {
        while (++i !== len) {
          // checks to see if the key was set
          if (i in this) {
            kValue = t[i];

            if (func.call(thisArg, t[i], i, t)) {
              res[c++] = kValue;
            }
          }
        }
      }

      res.length = c; // shrink down array to proper size

      return res;
    };
  }

  // This version tries to optimize by only checking for "in" when looking for undefined and
  // skipping the definitely fruitless NaN search. Other parts are merely cosmetic conciseness.
  // Whether it is actually faster remains to be seen.
  if (!Array.prototype.indexOf) Array.prototype.indexOf = function (Object, max, min) {

    return function indexOf(member, fromIndex) {
      if (this === null || (this === undefined)) throw TypeError("Array.prototype.indexOf called on null or undefined");
      var that = Object(this),
          Len = that.length >>> 0,
          i = min(fromIndex | 0, Len);
      if (i < 0) i = max(0, Len + i);else if (i >= Len) return -1;

      if (member === void 0) {
        // undefined
        for (; i !== Len; ++i) {
          if (that[i] === void 0 && (i in that)) return i;
        }
      } else if (member !== member) {
        // NaN
        return -1; // Since NaN !== NaN, it will never be found. Fast-path it.
      } // all else
      else for (; i !== Len; ++i) {
          if (that[i] === member) return i;
        }

      return -1; // if the value was not found, then return -1
    };
  }(Object, Math.max, Math.min);

  if (!Array.isArray) {
    Array.isArray = function (arg) {
      return Object.prototype.toString.call(arg) === "[object Array]";
    };
  }

  if (!Array.prototype.every) {
    Array.prototype.every = function (callbackfn, thisArg) {

      var T, k;

      if (this == null) {
        throw new TypeError("this is null or not defined");
      } // 1. O は、this を引数として ToObject に渡し、実行した結果です。


      var O = Object(this); // 2. lenValue は、"length" を引数として O の Get 内部メソッドを実行した結果です。
      // 3. len を ToUint32(lenValue) とします。

      var len = O.length >>> 0; // 4. IsCallable(callbackfn) が false の場合、TypeError 例外がスローされます。

      if (typeof callbackfn !== "function") {
        throw new TypeError();
      } // 5. thisArg が与えられた場合、T は thisArg となり、さもなくば T は undefined となります。


      if (arguments.length > 1) {
        T = thisArg;
      } // 6. k を 0 とします。


      k = 0; // 7. k < len が成り立つ間、繰り返します。

      while (k < len) {
        var kValue; // a. Pk を ToString(k) とします。
        //    これは in 演算子の左オペランドについて暗黙的です。
        // b. kPresent は、Pk を引数として O の HasProperty 内部メソッドを実行した結果です。
        //   このステップは c と組み合わせられます。
        // c. kPresent が true の場合、続きます。

        if (k in O) {
          // i. kValue は、Pk を引数として O の Get 内部メソッドを実行した結果です。
          kValue = O[k]; // ii. testResult は、this 値としての T と、kValue、k、0 を含む引数リストを
          //     ともなって、callbackfn の Call 内部メソッドを実行した結果です。

          var testResult = callbackfn.call(T, kValue, k, O); // iii. ToBoolean(testResult) が false の場合、false を返します。

          if (!testResult) {
            return false;
          }
        }

        k++;
      }

      return true;
    };
  }

  Array.prototype.find = Array.prototype.find || (function (callback) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    } else if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }

    var list = Object(this); // Makes sures is always has an positive integer as length.

    var length = list.length >>> 0;
    var thisArg = arguments[1];

    for (var i = 0; i < length; i++) {
      var element = list[i];

      if (callback.call(thisArg, element, i, list)) {
        return element;
      }
    }
  });

  if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (search, this_len) {
      if (this_len === undefined || (this_len > this.length)) {
        this_len = this.length;
      }

      return this.substring(this_len - search.length, this_len) === search;
    };
  }

  /*! http://mths.be/startswith v0.2.0 by @mathias */
  if (!String.prototype.startsWith) {
    (function () {

      var defineProperty = function () {
        // IE 8 only supports `Object.defineProperty` on DOM elements
        try {
          var object = {};
          var $defineProperty = Object.defineProperty;
          var result = $defineProperty(object, object, object) && ($defineProperty);
        } catch (error) {}

        return result;
      }();

      var toString = {}.toString;

      var startsWith = function startsWith(search) {
        if (this == null) {
          throw TypeError();
        }

        var string = String(this);

        if (search && (toString.call(search) == '[object RegExp]')) {
          throw TypeError();
        }

        var stringLength = string.length;
        var searchString = String(search);
        var searchLength = searchString.length;
        var position = arguments.length > 1 ? (arguments[1]) : (undefined); // `ToInteger`

        var pos = position ? (Number(position)) : (0);

        if (pos != pos) {
          // better `isNaN`
          pos = 0;
        }

        var start = Math.min(Math.max(pos, 0), stringLength); // Avoid the `indexOf` call if no match is possible

        if (searchLength + start > stringLength) {
          return false;
        }

        var index = -1;

        while (++index < searchLength) {
          if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
            return false;
          }
        }

        return true;
      };

      if (defineProperty) {
        defineProperty(String.prototype, 'startsWith', {
          'value': startsWith,
          'configurable': true,
          'writable': true
        });
      } else {
        String.prototype.startsWith = startsWith;
      }
    })();
  }

  /* eslint no-invalid-this: 1 */

  var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
  var slice = Array.prototype.slice;
  var toStr = Object.prototype.toString;
  var funcType = '[object Function]';

  var implementation = function bind(that) {
    var target = this;

    if (typeof target !== 'function' || (toStr.call(target) !== funcType)) {
      throw new TypeError(ERROR_MESSAGE + target);
    }

    var args = slice.call(arguments, 1);
    var bound;

    var binder = function binder() {
      if (this instanceof bound) {
        var result = target.apply(this, args.concat(slice.call(arguments)));

        if (Object(result) === result) {
          return result;
        }

        return this;
      } else {
        return target.apply(that, args.concat(slice.call(arguments)));
      }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];

    for (var i = 0; i < boundLength; i++) {
      boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
      var Empty = function Empty() {};

      Empty.prototype = target.prototype;
      bound.prototype = new Empty();
      Empty.prototype = null;
    }

    return bound;
  };

  var functionBind = Function.prototype.bind || (implementation);

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var shams = function hasSymbols() {
    if (typeof Symbol !== 'function' || (typeof Object.getOwnPropertySymbols !== 'function')) {
      return false;
    }

    if (_typeof(Symbol.iterator) === 'symbol') {
      return true;
    }

    var obj = {};
    var sym = Symbol('test');
    var symObj = Object(sym);

    if (typeof sym === 'string') {
      return false;
    }

    if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
      return false;
    }

    if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
      return false;
    } // temp disabled per https://github.com/ljharb/object.assign/issues/17
    // if (sym instanceof Symbol) { return false; }
    // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
    // if (!(symObj instanceof Symbol)) { return false; }
    // if (typeof Symbol.prototype.toString !== 'function') { return false; }
    // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }


    var symVal = 42;
    obj[sym] = symVal;

    for (sym in obj) {
      return false;
    } // eslint-disable-line no-restricted-syntax


    if (typeof Object.keys === 'function' && (Object.keys(obj).length !== 0)) {
      return false;
    }

    if (typeof Object.getOwnPropertyNames === 'function' && (Object.getOwnPropertyNames(obj).length !== 0)) {
      return false;
    }

    var syms = Object.getOwnPropertySymbols(obj);

    if (syms.length !== 1 || (syms[0] !== sym)) {
      return false;
    }

    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
      return false;
    }

    if (typeof Object.getOwnPropertyDescriptor === 'function') {
      var descriptor = Object.getOwnPropertyDescriptor(obj, sym);

      if (descriptor.value !== symVal || (descriptor.enumerable !== true)) {
        return false;
      }
    }

    return true;
  };

  var origSymbol = commonjsGlobal.Symbol;

  var hasSymbols = function hasNativeSymbols() {
    if (typeof origSymbol !== 'function') {
      return false;
    }

    if (typeof Symbol !== 'function') {
      return false;
    }

    if (_typeof(origSymbol('foo')) !== 'symbol') {
      return false;
    }

    if (_typeof(Symbol('bar')) !== 'symbol') {
      return false;
    }

    return shams();
  };

  /* globals
  	Atomics,
  	SharedArrayBuffer,
  */


  var undefined$1;
  var $TypeError = TypeError;
  var $gOPD = Object.getOwnPropertyDescriptor;

  if ($gOPD) {
    try {
      $gOPD({}, '');
    } catch (e) {
      $gOPD = null; // this is IE 8, which has a broken gOPD
    }
  }

  var throwTypeError = function throwTypeError() {
    throw new $TypeError();
  };

  var ThrowTypeError = $gOPD ? (function () {
    try {
      // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
      arguments.callee; // IE 8 does not throw here

      return throwTypeError;
    } catch (calleeThrows) {
      try {
        // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
        return $gOPD(arguments, 'callee').get;
      } catch (gOPDthrows) {
        return throwTypeError;
      }
    }
  }()) : (throwTypeError);
  var hasSymbols$1 = hasSymbols();
  var getProto = Object.getPrototypeOf || (function (x) {
    return x.__proto__;
  }); // eslint-disable-line no-proto

  var generatorFunction =  (undefined$1);

  var asyncFunction =  (undefined$1);

  var asyncGenFunction =  (undefined$1);
  var TypedArray = typeof Uint8Array === 'undefined' ? (undefined$1) : (getProto(Uint8Array));
  var INTRINSICS = {
    '%Array%': Array,
    '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? (undefined$1) : (ArrayBuffer),
    '%ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? (undefined$1) : (ArrayBuffer.prototype),
    '%ArrayIteratorPrototype%': hasSymbols$1 ? (getProto([][Symbol.iterator]())) : (undefined$1),
    '%ArrayPrototype%': Array.prototype,
    '%ArrayProto_entries%': Array.prototype.entries,
    '%ArrayProto_forEach%': Array.prototype.forEach,
    '%ArrayProto_keys%': Array.prototype.keys,
    '%ArrayProto_values%': Array.prototype.values,
    '%AsyncFromSyncIteratorPrototype%': undefined$1,
    '%AsyncFunction%': asyncFunction,
    '%AsyncFunctionPrototype%':  (undefined$1),
    '%AsyncGenerator%':  (undefined$1),
    '%AsyncGeneratorFunction%': asyncGenFunction,
    '%AsyncGeneratorPrototype%':  (undefined$1),
    '%AsyncIteratorPrototype%':  (undefined$1),
    '%Atomics%': typeof Atomics === 'undefined' ? (undefined$1) : (Atomics),
    '%Boolean%': Boolean,
    '%BooleanPrototype%': Boolean.prototype,
    '%DataView%': typeof DataView === 'undefined' ? (undefined$1) : (DataView),
    '%DataViewPrototype%': typeof DataView === 'undefined' ? (undefined$1) : (DataView.prototype),
    '%Date%': Date,
    '%DatePrototype%': Date.prototype,
    '%decodeURI%': decodeURI,
    '%decodeURIComponent%': decodeURIComponent,
    '%encodeURI%': encodeURI,
    '%encodeURIComponent%': encodeURIComponent,
    '%Error%': Error,
    '%ErrorPrototype%': Error.prototype,
    '%eval%': eval,
    // eslint-disable-line no-eval
    '%EvalError%': EvalError,
    '%EvalErrorPrototype%': EvalError.prototype,
    '%Float32Array%': typeof Float32Array === 'undefined' ? (undefined$1) : (Float32Array),
    '%Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? (undefined$1) : (Float32Array.prototype),
    '%Float64Array%': typeof Float64Array === 'undefined' ? (undefined$1) : (Float64Array),
    '%Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? (undefined$1) : (Float64Array.prototype),
    '%Function%': Function,
    '%FunctionPrototype%': Function.prototype,
    '%Generator%':  (undefined$1),
    '%GeneratorFunction%': generatorFunction,
    '%GeneratorPrototype%':  (undefined$1),
    '%Int8Array%': typeof Int8Array === 'undefined' ? (undefined$1) : (Int8Array),
    '%Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? (undefined$1) : (Int8Array.prototype),
    '%Int16Array%': typeof Int16Array === 'undefined' ? (undefined$1) : (Int16Array),
    '%Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? (undefined$1) : (Int8Array.prototype),
    '%Int32Array%': typeof Int32Array === 'undefined' ? (undefined$1) : (Int32Array),
    '%Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? (undefined$1) : (Int32Array.prototype),
    '%isFinite%': isFinite,
    '%isNaN%': isNaN,
    '%IteratorPrototype%': hasSymbols$1 ? (getProto(getProto([][Symbol.iterator]()))) : (undefined$1),
    '%JSON%': (typeof JSON === "undefined" ? ("undefined") : (_typeof(JSON))) === 'object' ? (JSON) : (undefined$1),
    '%JSONParse%': (typeof JSON === "undefined" ? ("undefined") : (_typeof(JSON))) === 'object' ? (JSON.parse) : (undefined$1),
    '%Map%': typeof Map === 'undefined' ? (undefined$1) : (Map),
    '%MapIteratorPrototype%': typeof Map === 'undefined' || (!hasSymbols$1) ? (undefined$1) : (getProto(new Map()[Symbol.iterator]())),
    '%MapPrototype%': typeof Map === 'undefined' ? (undefined$1) : (Map.prototype),
    '%Math%': Math,
    '%Number%': Number,
    '%NumberPrototype%': Number.prototype,
    '%Object%': Object,
    '%ObjectPrototype%': Object.prototype,
    '%ObjProto_toString%': Object.prototype.toString,
    '%ObjProto_valueOf%': Object.prototype.valueOf,
    '%parseFloat%': parseFloat,
    '%parseInt%': parseInt,
    '%Promise%': typeof Promise === 'undefined' ? (undefined$1) : (Promise),
    '%PromisePrototype%': typeof Promise === 'undefined' ? (undefined$1) : (Promise.prototype),
    '%PromiseProto_then%': typeof Promise === 'undefined' ? (undefined$1) : (Promise.prototype.then),
    '%Promise_all%': typeof Promise === 'undefined' ? (undefined$1) : (Promise.all),
    '%Promise_reject%': typeof Promise === 'undefined' ? (undefined$1) : (Promise.reject),
    '%Promise_resolve%': typeof Promise === 'undefined' ? (undefined$1) : (Promise.resolve),
    '%Proxy%': typeof Proxy === 'undefined' ? (undefined$1) : (Proxy),
    '%RangeError%': RangeError,
    '%RangeErrorPrototype%': RangeError.prototype,
    '%ReferenceError%': ReferenceError,
    '%ReferenceErrorPrototype%': ReferenceError.prototype,
    '%Reflect%': typeof Reflect === 'undefined' ? (undefined$1) : (Reflect),
    '%RegExp%': RegExp,
    '%RegExpPrototype%': RegExp.prototype,
    '%Set%': typeof Set === 'undefined' ? (undefined$1) : (Set),
    '%SetIteratorPrototype%': typeof Set === 'undefined' || (!hasSymbols$1) ? (undefined$1) : (getProto(new Set()[Symbol.iterator]())),
    '%SetPrototype%': typeof Set === 'undefined' ? (undefined$1) : (Set.prototype),
    '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? (undefined$1) : (SharedArrayBuffer),
    '%SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? (undefined$1) : (SharedArrayBuffer.prototype),
    '%String%': String,
    '%StringIteratorPrototype%': hasSymbols$1 ? (getProto(''[Symbol.iterator]())) : (undefined$1),
    '%StringPrototype%': String.prototype,
    '%Symbol%': hasSymbols$1 ? (Symbol) : (undefined$1),
    '%SymbolPrototype%': hasSymbols$1 ? (Symbol.prototype) : (undefined$1),
    '%SyntaxError%': SyntaxError,
    '%SyntaxErrorPrototype%': SyntaxError.prototype,
    '%ThrowTypeError%': ThrowTypeError,
    '%TypedArray%': TypedArray,
    '%TypedArrayPrototype%': TypedArray ? (TypedArray.prototype) : (undefined$1),
    '%TypeError%': $TypeError,
    '%TypeErrorPrototype%': $TypeError.prototype,
    '%Uint8Array%': typeof Uint8Array === 'undefined' ? (undefined$1) : (Uint8Array),
    '%Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? (undefined$1) : (Uint8Array.prototype),
    '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? (undefined$1) : (Uint8ClampedArray),
    '%Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? (undefined$1) : (Uint8ClampedArray.prototype),
    '%Uint16Array%': typeof Uint16Array === 'undefined' ? (undefined$1) : (Uint16Array),
    '%Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? (undefined$1) : (Uint16Array.prototype),
    '%Uint32Array%': typeof Uint32Array === 'undefined' ? (undefined$1) : (Uint32Array),
    '%Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? (undefined$1) : (Uint32Array.prototype),
    '%URIError%': URIError,
    '%URIErrorPrototype%': URIError.prototype,
    '%WeakMap%': typeof WeakMap === 'undefined' ? (undefined$1) : (WeakMap),
    '%WeakMapPrototype%': typeof WeakMap === 'undefined' ? (undefined$1) : (WeakMap.prototype),
    '%WeakSet%': typeof WeakSet === 'undefined' ? (undefined$1) : (WeakSet),
    '%WeakSetPrototype%': typeof WeakSet === 'undefined' ? (undefined$1) : (WeakSet.prototype)
  };
  var $replace = functionBind.call(Function.call, String.prototype.replace);
  /* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */

  var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
  var reEscapeChar = /\\(\\)?/g;
  /** Used to match backslashes in property paths. */

  var stringToPath = function stringToPath(string) {
    var result = [];
    $replace(string, rePropName, function (match, number, quote, subString) {
      result[result.length] = quote ? ($replace(subString, reEscapeChar, '$1')) : (number || (match));
    });
    return result;
  };
  /* end adaptation */


  var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
    if (!(name in INTRINSICS)) {
      throw new SyntaxError('intrinsic ' + name + ' does not exist!');
    } // istanbul ignore if // hopefully this is impossible to test :-)


    if (typeof INTRINSICS[name] === 'undefined' && (!allowMissing)) {
      throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
    }

    return INTRINSICS[name];
  };

  var GetIntrinsic = function GetIntrinsic(name, allowMissing) {
    if (typeof name !== 'string' || (name.length === 0)) {
      throw new TypeError('intrinsic name must be a non-empty string');
    }

    if (arguments.length > 1 && (typeof allowMissing !== 'boolean')) {
      throw new TypeError('"allowMissing" argument must be a boolean');
    }

    var parts = stringToPath(name);
    var value = getBaseIntrinsic('%' + (parts.length > 0 ? (parts[0]) : ('')) + '%', allowMissing);

    for (var i = 1; i < parts.length; i += 1) {
      if (value != null) {
        if ($gOPD && (i + 1 >= parts.length)) {
          var desc = $gOPD(value, parts[i]);

          if (!allowMissing && (!(parts[i] in value))) {
            throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
          }

          value = desc ? (desc.get || (desc.value)) : (value[parts[i]]);
        } else {
          value = value[parts[i]];
        }
      }
    }

    return value;
  };

  var $Function = GetIntrinsic('%Function%');
  var $apply = $Function.apply;
  var $call = $Function.call;

  var callBind = function callBind() {
    return functionBind.apply($call, arguments);
  };

  var apply = function applyBind() {
    return functionBind.apply($apply, arguments);
  };
  callBind.apply = apply;

  var toStr$1 = Object.prototype.toString;

  var isArguments = function isArguments(value) {
    var str = toStr$1.call(value);
    var isArgs = str === '[object Arguments]';

    if (!isArgs) {
      isArgs = str !== '[object Array]' && (value !== null) && (_typeof(value) === 'object') && (typeof value.length === 'number') && (value.length >= 0) && (toStr$1.call(value.callee) === '[object Function]');
    }

    return isArgs;
  };

  var keysShim;

  if (!Object.keys) {
    // modified from https://github.com/es-shims/es5-shim
    var has = Object.prototype.hasOwnProperty;
    var toStr$2 = Object.prototype.toString;
    var isArgs = isArguments; // eslint-disable-line global-require

    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var hasDontEnumBug = !isEnumerable.call({
      toString: null
    }, 'toString');
    var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
    var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];

    var equalsConstructorPrototype = function equalsConstructorPrototype(o) {
      var ctor = o.constructor;
      return ctor && (ctor.prototype === o);
    };

    var excludedKeys = {
      $applicationCache: true,
      $console: true,
      $external: true,
      $frame: true,
      $frameElement: true,
      $frames: true,
      $innerHeight: true,
      $innerWidth: true,
      $onmozfullscreenchange: true,
      $onmozfullscreenerror: true,
      $outerHeight: true,
      $outerWidth: true,
      $pageXOffset: true,
      $pageYOffset: true,
      $parent: true,
      $scrollLeft: true,
      $scrollTop: true,
      $scrollX: true,
      $scrollY: true,
      $self: true,
      $webkitIndexedDB: true,
      $webkitStorageInfo: true,
      $window: true
    };

    var hasAutomationEqualityBug = function () {
      /* global window */
      if (typeof window === 'undefined') {
        return false;
      }

      for (var k in window) {
        try {
          if (!excludedKeys['$' + k] && (has.call(window, k)) && (window[k] !== null) && (_typeof(window[k]) === 'object')) {
            try {
              equalsConstructorPrototype(window[k]);
            } catch (e) {
              return true;
            }
          }
        } catch (e) {
          return true;
        }
      }

      return false;
    }();

    var equalsConstructorPrototypeIfNotBuggy = function equalsConstructorPrototypeIfNotBuggy(o) {
      /* global window */
      if (typeof window === 'undefined' || (!hasAutomationEqualityBug)) {
        return equalsConstructorPrototype(o);
      }

      try {
        return equalsConstructorPrototype(o);
      } catch (e) {
        return false;
      }
    };

    keysShim = function keys(object) {
      var isObject = object !== null && (_typeof(object) === 'object');
      var isFunction = toStr$2.call(object) === '[object Function]';
      var isArguments = isArgs(object);
      var isString = isObject && (toStr$2.call(object) === '[object String]');
      var theKeys = [];

      if (!isObject && (!isFunction) && (!isArguments)) {
        throw new TypeError('Object.keys called on a non-object');
      }

      var skipProto = hasProtoEnumBug && (isFunction);

      if (isString && (object.length > 0) && (!has.call(object, 0))) {
        for (var i = 0; i < object.length; ++i) {
          theKeys.push(String(i));
        }
      }

      if (isArguments && (object.length > 0)) {
        for (var j = 0; j < object.length; ++j) {
          theKeys.push(String(j));
        }
      } else {
        for (var name in object) {
          if (!(skipProto && (name === 'prototype')) && (has.call(object, name))) {
            theKeys.push(String(name));
          }
        }
      }

      if (hasDontEnumBug) {
        var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

        for (var k = 0; k < dontEnums.length; ++k) {
          if (!(skipConstructor && (dontEnums[k] === 'constructor')) && (has.call(object, dontEnums[k]))) {
            theKeys.push(dontEnums[k]);
          }
        }
      }

      return theKeys;
    };
  }

  var implementation$1 = keysShim;

  var slice$1 = Array.prototype.slice;
  var origKeys = Object.keys;
  var keysShim$1 = origKeys ? (function keys(o) {
    return origKeys(o);
  }) : (implementation$1);
  var originalKeys = Object.keys;

  keysShim$1.shim = function shimObjectKeys() {
    if (Object.keys) {
      var keysWorksWithArguments = function () {
        // Safari 5.0 bug
        var args = Object.keys(arguments);
        return args && (args.length === arguments.length);
      }(1, 2);

      if (!keysWorksWithArguments) {
        Object.keys = function keys(object) {
          // eslint-disable-line func-name-matching
          if (isArguments(object)) {
            return originalKeys(slice$1.call(object));
          }

          return originalKeys(object);
        };
      }
    } else {
      Object.keys = keysShim$1;
    }

    return Object.keys || (keysShim$1);
  };

  var objectKeys = keysShim$1;

  var hasSymbols$2 = typeof Symbol === 'function' && (_typeof(Symbol('foo')) === 'symbol');
  var toStr$3 = Object.prototype.toString;
  var concat = Array.prototype.concat;
  var origDefineProperty = Object.defineProperty;

  var isFunction = function isFunction(fn) {
    return typeof fn === 'function' && (toStr$3.call(fn) === '[object Function]');
  };

  var arePropertyDescriptorsSupported = function arePropertyDescriptorsSupported() {
    var obj = {};

    try {
      origDefineProperty(obj, 'x', {
        enumerable: false,
        value: obj
      }); // eslint-disable-next-line no-unused-vars, no-restricted-syntax

      for (var _ in obj) {
        // jscs:ignore disallowUnusedVariables
        return false;
      }

      return obj.x === obj;
    } catch (e) {
      /* this is IE 8. */
      return false;
    }
  };

  var supportsDescriptors = origDefineProperty && (arePropertyDescriptorsSupported());

  var defineProperty = function defineProperty(object, name, value, predicate) {
    if (name in object && (!isFunction(predicate) || (!predicate()))) {
      return;
    }

    if (supportsDescriptors) {
      origDefineProperty(object, name, {
        configurable: true,
        enumerable: false,
        value: value,
        writable: true
      });
    } else {
      object[name] = value;
    }
  };

  var defineProperties = function defineProperties(object, map) {
    var predicates = arguments.length > 2 ? (arguments[2]) : ({});
    var props = objectKeys(map);

    if (hasSymbols$2) {
      props = concat.call(props, Object.getOwnPropertySymbols(map));
    }

    for (var i = 0; i < props.length; i += 1) {
      defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
    }
  };

  defineProperties.supportsDescriptors = !!supportsDescriptors;
  var defineProperties_1 = defineProperties;

  var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

  var callBound = function callBoundIntrinsic(name, allowMissing) {
    var intrinsic = GetIntrinsic(name, !!allowMissing);

    if (typeof intrinsic === 'function' && ($indexOf(name, '.prototype.'))) {
      return callBind(intrinsic);
    }

    return intrinsic;
  };

  var $replace$1 = callBound('String.prototype.replace');
  /* eslint-disable no-control-regex */

  var endWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]*$/;
  /* eslint-enable no-control-regex */

  var implementation$2 = function trimEnd() {
    return $replace$1(this, endWhitespace, '');
  };

  var polyfill = function getPolyfill() {
    if (!String.prototype.trimEnd && (!String.prototype.trimRight)) {
      return implementation$2;
    }

    var zeroWidthSpace = "\u200B";
    var trimmed = zeroWidthSpace.trimEnd ? (zeroWidthSpace.trimEnd()) : (zeroWidthSpace.trimRight());

    if (trimmed !== zeroWidthSpace) {
      return implementation$2;
    }

    return String.prototype.trimEnd || (String.prototype.trimRight);
  };

  var shim = function shimTrimEnd() {
    var polyfill$1 = polyfill();
    defineProperties_1(String.prototype, {
      trimEnd: polyfill$1
    }, {
      trimEnd: function trimEnd() {
        return String.prototype.trimEnd !== polyfill$1;
      }
    });
    return polyfill$1;
  };

  var bound = callBind(polyfill());
  defineProperties_1(bound, {
    getPolyfill: polyfill,
    implementation: implementation$2,
    shim: shim
  });
  var string_prototype_trimend = bound;

  string_prototype_trimend.shim();

  //  json2.js
  //  2017-06-12
  //  Public Domain.
  //  NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
  //  USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
  //  NOT CONTROL.
  //  This file creates a global JSON object containing two methods: stringify
  //  and parse. This file provides the ES5 JSON capability to ES3 systems.
  //  If a project might run on IE8 or earlier, then this file should be included.
  //  This file does nothing on ES5 systems.
  //      JSON.stringify(value, replacer, space)
  //          value       any JavaScript value, usually an object or array.
  //          replacer    an optional parameter that determines how object
  //                      values are stringified for objects. It can be a
  //                      function or an array of strings.
  //          space       an optional parameter that specifies the indentation
  //                      of nested structures. If it is omitted, the text will
  //                      be packed without extra whitespace. If it is a number,
  //                      it will specify the number of spaces to indent at each
  //                      level. If it is a string (such as "\t" or "&nbsp;"),
  //                      it contains the characters used to indent at each level.
  //          This method produces a JSON text from a JavaScript value.
  //          When an object value is found, if the object contains a toJSON
  //          method, its toJSON method will be called and the result will be
  //          stringified. A toJSON method does not serialize: it returns the
  //          value represented by the name/value pair that should be serialized,
  //          or undefined if nothing should be serialized. The toJSON method
  //          will be passed the key associated with the value, and this will be
  //          bound to the value.
  //          For example, this would serialize Dates as ISO strings.
  //              Date.prototype.toJSON = function (key) {
  //                  function f(n) {
  //                      // Format integers to have at least two digits.
  //                      return (n < 10)
  //                          ? "0" + n
  //                          : n;
  //                  }
  //                  return this.getUTCFullYear()   + "-" +
  //                       f(this.getUTCMonth() + 1) + "-" +
  //                       f(this.getUTCDate())      + "T" +
  //                       f(this.getUTCHours())     + ":" +
  //                       f(this.getUTCMinutes())   + ":" +
  //                       f(this.getUTCSeconds())   + "Z";
  //              };
  //          You can provide an optional replacer method. It will be passed the
  //          key and value of each member, with this bound to the containing
  //          object. The value that is returned from your method will be
  //          serialized. If your method returns undefined, then the member will
  //          be excluded from the serialization.
  //          If the replacer parameter is an array of strings, then it will be
  //          used to select the members to be serialized. It filters the results
  //          such that only members with keys listed in the replacer array are
  //          stringified.
  //          Values that do not have JSON representations, such as undefined or
  //          functions, will not be serialized. Such values in objects will be
  //          dropped; in arrays they will be replaced with null. You can use
  //          a replacer function to replace those with JSON values.
  //          JSON.stringify(undefined) returns undefined.
  //          The optional space parameter produces a stringification of the
  //          value that is filled with line breaks and indentation to make it
  //          easier to read.
  //          If the space parameter is a non-empty string, then that string will
  //          be used for indentation. If the space parameter is a number, then
  //          the indentation will be that many spaces.
  //          Example:
  //          text = JSON.stringify(["e", {pluribus: "unum"}]);
  //          // text is '["e",{"pluribus":"unum"}]'
  //          text = JSON.stringify(["e", {pluribus: "unum"}], null, "\t");
  //          // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'
  //          text = JSON.stringify([new Date()], function (key, value) {
  //              return this[key] instanceof Date
  //                  ? "Date(" + this[key] + ")"
  //                  : value;
  //          });
  //          // text is '["Date(---current time---)"]'
  //      JSON.parse(text, reviver)
  //          This method parses a JSON text to produce an object or array.
  //          It can throw a SyntaxError exception.
  //          The optional reviver parameter is a function that can filter and
  //          transform the results. It receives each of the keys and values,
  //          and its return value is used instead of the original value.
  //          If it returns what it received, then the structure is not modified.
  //          If it returns undefined then the member is deleted.
  //          Example:
  //          // Parse the text. Values that look like ISO date strings will
  //          // be converted to Date objects.
  //          myData = JSON.parse(text, function (key, value) {
  //              var a;
  //              if (typeof value === "string") {
  //                  a =
  //   /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
  //                  if (a) {
  //                      return new Date(Date.UTC(
  //                         +a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]
  //                      ));
  //                  }
  //                  return value;
  //              }
  //          });
  //          myData = JSON.parse(
  //              "[\"Date(09/09/2001)\"]",
  //              function (key, value) {
  //                  var d;
  //                  if (
  //                      typeof value === "string"
  //                      && value.slice(0, 5) === "Date("
  //                      && value.slice(-1) === ")"
  //                  ) {
  //                      d = new Date(value.slice(5, -1));
  //                      if (d) {
  //                          return d;
  //                      }
  //                  }
  //                  return value;
  //              }
  //          );
  //  This is a reference implementation. You are free to copy, modify, or
  //  redistribute.

  /*jslint
      eval, for, this
  */

  /*property
      JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
      getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
      lastIndex, length, parse, prototype, push, replace, slice, stringify,
      test, toJSON, toString, valueOf
  */
  // Create a JSON object only if one does not already exist. We create the
  // methods in a closure to avoid creating global variables.
  if ((typeof JSON === "undefined" ? ("undefined") : (_typeof(JSON))) !== "object") {
    JSON = {};
  }

  (function () {

    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n) {
      // Format integers to have at least two digits.
      return n < 10 ? ("0" + n) : (n);
    }

    function this_value() {
      return this.valueOf();
    }

    if (typeof Date.prototype.toJSON !== "function") {
      Date.prototype.toJSON = function () {
        return isFinite(this.valueOf()) ? (this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z") : (null);
      };

      Boolean.prototype.toJSON = this_value;
      Number.prototype.toJSON = this_value;
      String.prototype.toJSON = this_value;
    }

    var gap;
    var indent;
    var meta;
    var rep;

    function quote(string) {
      // If the string contains no control characters, no quote characters, and no
      // backslash characters, then we can safely slap some quotes around it.
      // Otherwise we must also replace the offending characters with safe escape
      // sequences.
      rx_escapable.lastIndex = 0;
      return rx_escapable.test(string) ? ('"' + string.replace(rx_escapable, function (a) {
        var c = meta[a];
        return typeof c === "string" ? (c) : ("\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4));
      }) + '"') : ('"' + string + '"');
    }

    function str(key, holder) {
      // Produce a string from holder[key].
      var i; // The loop counter.

      var k; // The member key.

      var v; // The member value.

      var length;
      var mind = gap;
      var partial;
      var value = holder[key]; // If the value has a toJSON method, call it to obtain a replacement value.

      if (value && (_typeof(value) === "object") && (typeof value.toJSON === "function")) {
        value = value.toJSON(key);
      } // If we were called with a replacer function, then call the replacer to
      // obtain a replacement value.


      if (typeof rep === "function") {
        value = rep.call(holder, key, value);
      } // What happens next depends on the value's type.


      switch (_typeof(value)) {
        case "string":
          return quote(value);

        case "number":
          // JSON numbers must be finite. Encode non-finite numbers as null.
          return isFinite(value) ? (String(value)) : ("null");

        case "boolean":
        case "null":
          // If the value is a boolean or null, convert it to a string. Note:
          // typeof null does not produce "null". The case is included here in
          // the remote chance that this gets fixed someday.
          return String(value);
        // If the type is "object", we might be dealing with an object or an array or
        // null.

        case "object":
          // Due to a specification blunder in ECMAScript, typeof null is "object",
          // so watch out for that case.
          if (!value) {
            return "null";
          } // Make an array to hold the partial results of stringifying this object value.


          gap += indent;
          partial = []; // Is the value an array?

          if (Object.prototype.toString.apply(value) === "[object Array]") {
            // The value is an array. Stringify every element. Use null as a placeholder
            // for non-JSON values.
            length = value.length;

            for (i = 0; i < length; i += 1) {
              partial[i] = str(i, value) || ("null");
            } // Join all of the elements together, separated with commas, and wrap them in
            // brackets.


            v = partial.length === 0 ? ("[]") : (gap ? ("[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]") : ("[" + partial.join(",") + "]"));
            gap = mind;
            return v;
          } // If the replacer is an array, use it to select the members to be stringified.


          if (rep && (_typeof(rep) === "object")) {
            length = rep.length;

            for (i = 0; i < length; i += 1) {
              if (typeof rep[i] === "string") {
                k = rep[i];
                v = str(k, value);

                if (v) {
                  partial.push(quote(k) + (gap ? (": ") : (":")) + v);
                }
              }
            }
          } else {
            // Otherwise, iterate through all of the keys in the object.
            for (k in value) {
              if (Object.prototype.hasOwnProperty.call(value, k)) {
                v = str(k, value);

                if (v) {
                  partial.push(quote(k) + (gap ? (": ") : (":")) + v);
                }
              }
            }
          } // Join all of the member texts together, separated with commas,
          // and wrap them in braces.


          v = partial.length === 0 ? ("{}") : (gap ? ("{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}") : ("{" + partial.join(",") + "}"));
          gap = mind;
          return v;
      }
    } // If the JSON object does not yet have a stringify method, give it one.


    if (typeof JSON.stringify !== "function") {
      meta = {
        // table of character substitutions
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
      };

      JSON.stringify = function (value, replacer, space) {
        // The stringify method takes a value and an optional replacer, and an optional
        // space parameter, and returns a JSON text. The replacer can be a function
        // that can replace values, or an array of strings that will select the keys.
        // A default replacer method can be provided. Use of the space parameter can
        // produce text that is more easily readable.
        var i;
        gap = "";
        indent = ""; // If the space parameter is a number, make an indent string containing that
        // many spaces.

        if (typeof space === "number") {
          for (i = 0; i < space; i += 1) {
            indent += " ";
          } // If the space parameter is a string, it will be used as the indent string.

        } else if (typeof space === "string") {
          indent = space;
        } // If there is a replacer, it must be a function or an array.
        // Otherwise, throw an error.


        rep = replacer;

        if (replacer && (typeof replacer !== "function") && (_typeof(replacer) !== "object" || (typeof replacer.length !== "number"))) {
          throw new Error("JSON.stringify");
        } // Make a fake root object containing our value under the key of "".
        // Return the result of stringifying the value.


        return str("", {
          "": value
        });
      };
    } // If the JSON object does not yet have a parse method, give it one.


    if (typeof JSON.parse !== "function") {
      JSON.parse = function (text, reviver) {
        // The parse method takes a text and an optional reviver function, and returns
        // a JavaScript value if the text is a valid JSON text.
        var j;

        function walk(holder, key) {
          // The walk method is used to recursively walk the resulting structure so
          // that modifications can be made.
          var k;
          var v;
          var value = holder[key];

          if (value && (_typeof(value) === "object")) {
            for (k in value) {
              if (Object.prototype.hasOwnProperty.call(value, k)) {
                v = walk(value, k);

                if (v !== undefined) {
                  value[k] = v;
                } else {
                  delete value[k];
                }
              }
            }
          }

          return reviver.call(holder, key, value);
        } // Parsing happens in four stages. In the first stage, we replace certain
        // Unicode characters with escape sequences. JavaScript handles many characters
        // incorrectly, either silently deleting them, or treating them as line endings.


        text = String(text);
        rx_dangerous.lastIndex = 0;

        if (rx_dangerous.test(text)) {
          text = text.replace(rx_dangerous, function (a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
          });
        } // In the second stage, we run the text against regular expressions that look
        // for non-JSON patterns. We are especially concerned with "()" and "new"
        // because they can cause invocation, and "=" because it can cause mutation.
        // But just to be safe, we want to reject all unexpected forms.
        // We split the second stage into 4 regexp operations in order to work around
        // crippling inefficiencies in IE's and Safari's regexp engines. First we
        // replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
        // replace all simple value tokens with "]" characters. Third, we delete all
        // open brackets that follow a colon or comma or that begin the text. Finally,
        // we look to see that the remaining characters are only whitespace or "]" or
        // "," or ":" or "{" or "}". If that is so, then the text is safe for eval.


        if (rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) {
          // In the third stage we use the eval function to compile the text into a
          // JavaScript structure. The "{" operator is subject to a syntactic ambiguity
          // in JavaScript: it can begin a block or an object literal. We wrap the text
          // in parens to eliminate the ambiguity.
          j = eval("(" + text + ")"); // In the optional fourth stage, we recursively walk the new structure, passing
          // each name/value pair to a reviver function for possible transformation.

          return typeof reviver === "function" ? (walk({
            "": j
          }, "")) : (j);
        } // If the text is not JSON parseable, then a SyntaxError is thrown.


        throw new SyntaxError("JSON.parse");
      };
    }
  })();

  // Allow Scripts to Write Files and Access Network
  var isSecurityPrefSet = function isSecurityPrefSet() {
    var securitySetting = app.preferences.getPrefAsLong("Main Pref Section", "Pref_SCRIPTING_FILE_NETWORK_SECURITY");
    return securitySetting === 1;
  };

  var pref = {
    isSecurityPrefSet: isSecurityPrefSet
  };

  var getFSPath = function getFSPath(name) {
    return new File($.fileName).path + "/" + encodeURI(name);
  };
  var getFSFile = function getFSFile(fileName) {
    return new File(getFSPath(fileName));
  };
  var writeTextFile = function writeTextFile(textFileName, content) {
    var options = arguments.length > 2 && ((arguments[2] !== undefined)) ? ((arguments[2])) : (({}));
    var mode = options.mode || ("w");
    var ln = options.ln || (true);
    if (!pref.isSecurityPrefSet()) return null;
    var file = new File(getFSPath(textFileName));
    if (!file) return null;
    var parentFolder = file.parent;
    if (!parentFolder.exists) return null;
    file.encoding = "utf-8";
    file.lineFeed = "Unix";
    file.open(mode);
    var result = ln ? (file.writeln(content)) : (file.write(content));
    file.close();
    return result;
  };
  var deleteFSFile = function deleteFSFile(name) {
    if (!pref.isSecurityPrefSet()) return null;
    var file = new File(getFSPath(name));
    return file.remove();
  };

  /**
   * Given a number, return a zero-filled string.
   * From http://stackoverflow.com/questions/1267283/
   * @param  {number} width
   * @param  {number} number
   * @return {string}
   */
  var zeroFill = function zeroFill(width, number, pad) {
    if (number === undefined) {
      return function (number, pad) {
        return zeroFill(width, number, pad);
      };
    }

    if (pad === undefined) pad = '0';
    width -= number.toString().length;
    if (width > 0) return new Array(width + (/\./.test(number) ? (2) : (1))).join(pad) + number;
    return number + '';
  };

  var getNowDateWithOffset = function getNowDateWithOffset() {
    var offset = arguments.length > 0 && ((arguments[0] !== undefined)) ? ((arguments[0])) : ((0));
    var name = arguments.length > 1 && ((arguments[1] !== undefined)) ? ((arguments[1])) : (("GMT"));
    var roundOffset = Math.round(offset * 10) / 10;
    var fakeUTC = new Date(Date.now() - (roundOffset * 60 - new Date().getTimezoneOffset()) * 60000);
    var year = fakeUTC.getFullYear();
    var month = fakeUTC.getMonth();
    var date = fakeUTC.getDate();
    var time = fakeUTC.toString().split(" ")[4];
    return "".concat(year, "-").concat(zeroFill(2, month), "-").concat(zeroFill(2, date), " ").concat(time, " ").concat(name, " (GMT").concat(roundOffset >= 0 ? ("-") : ("+")).concat(zeroFill(2, Math.abs(roundOffset)), "h)");
  };
  var getNowJSTDate = function getNowJSTDate() {
    return getNowDateWithOffset(-9, "JST");
  };

  var JsonReplacer = function JsonReplacer(key, value) {
    return typeof value === "undefined" ? ("undefined") : (value);
  };

  var writeLog = function writeLog(name, contents) {
    var options = arguments.length > 2 && ((arguments[2] !== undefined)) ? ((arguments[2])) : (({}));

    var level = contents.level,
        contentsForJSON = _objectWithoutProperties(contents, ["level"]);

    var header = "".concat(level, "  ").concat(getNowJSTDate(), "\n");
    var str = header + JSON.stringify(contentsForJSON, JsonReplacer, "  ") + "\n";
    return writeTextFile(name, str, options);
  };

  var writeInit = function writeInit() {
    var name = arguments.length > 0 && ((arguments[0] !== undefined)) ? ((arguments[0])) : (("init_log.txt"));
    var initLogFormat = {
      level: "INIT",
      appBuild: app.buildName,
      appBuildNum: app.buildNumber,
      appVersion: app.version,
      $: {
        fileName: $.fileName,
        build: $.build,
        buildDate: $.buildDate.toString(),
        locale: $.locale,
        version: $.version
      }
    };
    return writeLog(name, initLogFormat, {
      mode: "w",
      ln: true
    });
  };

  var writeError = function writeError(line, description) {
    var options = arguments.length > 2 && ((arguments[2] !== undefined)) ? ((arguments[2])) : (({}));
    var name = arguments.length > 3 && ((arguments[3] !== undefined)) ? ((arguments[3])) : (("log.txt"));
    var errorLogFomat = {
      level: "ERROR",
      line: line,
      description: description
    };
    if (options.variables) errorLogFomat.variables = options.variables;
    return writeLog(name, errorLogFomat, {
      mode: "a",
      ln: true
    });
  };

  var log = {
    writeLog: writeLog,
    writeInit: writeInit,
    writeError: writeError
  };

  // import "date-polyfill";
  /**
   * http://docs.aenhancers.com/general/application/#app-saveprojectoncrash
   */
  // app.saveProjectOnCrash = false

  /**
   * http://docs.aenhancers.com/general/application/#app-saveprojectoncrash
   */
  // app.beginSuppressDialogs()

  app.project.bitsPerChannel = 16;
  app.project.expressionEngine = "javascript-1.0";
  $L = {
    error: log.writeError
  };
  $I = {
    undo: false
  };
  deleteFSFile("init_log.txt");
  deleteFSFile("log.txt");
  log.writeInit();

  var times = function times(step, callback) {
    for (var i = 1; i <= step; i++) {
      if (callback(i)) {
        break;
      } else {
        continue;
      }
    }
  };

  var isFolderItem = function isFolderItem(item) {
    return item instanceof FolderItem;
  };
  var isCompItem = function isCompItem(item) {
    return item instanceof CompItem;
  };
  var isFootageItem = function isFootageItem(item) {
    return item instanceof FootageItem;
  };
  var isAnyItem = function isAnyItem(item) {
    return isCompItem(item) || (isFolderItem(item)) || (isFootageItem(item));
  };

  var getItems = function getItems(folder, callback) {
    var items = [];
    times(folder.numItems, function (index) {
      var item = folder.item(index);
      if (callback && (!callback(item))) return;
      items.push(item);
    });
    return items;
  };
  var findItemWithName = function findItemWithName(name) {
    var parent = arguments.length > 1 && ((arguments[1] !== undefined)) ? ((arguments[1])) : ((app.project.rootFolder));
    var item = null;
    getItems(parent).forEach(function (current) {
      if (current.name === name) {
        if (isAnyItem(current)) item = current;
        return true;
      }
    });
    return item;
  };
  var findCompItemWithName = function findCompItemWithName(name) {
    var parent = arguments.length > 1 && ((arguments[1] !== undefined)) ? ((arguments[1])) : ((app.project.rootFolder));
    var item = findItemWithName(name, parent);

    if (!isCompItem(item)) {
      $L.error($.line, "findCompItemWithName / not found CompItem / name: ".concat(name, " / parent: ").concat(parent.name, " / item: ").concat(item ? (item.name) : ("null")));
      return null;
    }

    return item;
  };

  var getRQItemStatus = function getRQItemStatus(item) {
    var status = "";

    switch (item.status) {
      case RQItemStatus.WILL_CONTINUE:
        status = "WILL_CONTINUE";
        break;

      case RQItemStatus.NEEDS_OUTPUT:
        status = "NEEDS_OUTPUT";
        break;

      case RQItemStatus.UNQUEUED:
        status = "UNQUEUED";
        break;

      case RQItemStatus.QUEUED:
        status = "QUEUED";
        break;

      case RQItemStatus.RENDERING:
        status = "RENDERING";
        break;

      case RQItemStatus.USER_STOPPED:
        status = "USER_STOPPED";
        break;

      case RQItemStatus.ERR_STOPPED:
        status = "ERR_STOPPED";
        break;

      case RQItemStatus.DONE:
        status = "DONE";
        break;
    }

    return status;
  };
  var addRenderQueue = function addRenderQueue(compItem) {
    var relPath = arguments.length > 1 && ((arguments[1] !== undefined)) ? ((arguments[1])) : (("./render/output.avi"));
    var options = arguments.length > 2 && ((arguments[2] !== undefined)) ? ((arguments[2])) : (({}));
    var renderQueue = app.project.renderQueue;
    renderQueue.items.add(compItem);
    var RQItem = renderQueue.item(renderQueue.numItems);
    RQItem.applyTemplate(options.renderTemplate || ("Best Settings"));
    var moduleItem = RQItem.outputModule(RQItem.numOutputModules);
    moduleItem.applyTemplate(options.moduleTemplate || ("Lossless"));
    var file = getFSFile(relPath);
    if (file.exists) file.remove();
    moduleItem.file = file;
    moduleItem.includeSourceXMP = false;
    var statusChanged = options.statusChanged;

    if (statusChanged) {
      RQItem.onStatusChanged = function () {
        statusChanged(RQItem, getRQItemStatus(RQItem));
      };
    }

    var logType = options.logType;
    if (logType) RQItem.logType = LogType[logType];
    return RQItem;
  };

  // & 'C:\Program Files\Adobe\Adobe After Effects 2020\Support Files\aerender' -project 'D:\Documents\Projects\myProjects\AE_Scripts\dist\testInitFolderStruct.aep'

  var fn = function fn() {
    // initGenStruct(struct);
    var renderComp = findCompItemWithName("$root");
    if (!renderComp) return;
    addRenderQueue(renderComp);
  };

  fn(); // const file = new File("aaaaa");
  // alertType(file);
  // const partLayer = getSomethingWithPath("$root/$part_1") as $T.ADBE.AnyLayer;
  // genFade(partLayer, "in", 1);
  // genFade(partLayer, "out", 2);
  // const members = (app.project.activeItem as CompItem).selectedProperties;
  // alertType(members[0]);
  // const root = app.project.rootFolder;
  // const item = root.item(100);
  // alert(item.name);
  // const sourceFolder = getSomethingWithPath("main/short") as FolderItem;
  // duplicateFolder(sourceFolder, {
  //   name: "end",
  //   suffix: false
  // });
  // const thing = getSomethingWithPath(
  //   "1_templates/simple/short/parent/text/Text/Source Text"
  // );
  // alertType(thing);

}());
//# sourceMappingURL=bundle.jsx.map
