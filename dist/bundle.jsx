(function () {
  'use strict';

  //trim.js
  /*
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
  */
  if (!String.prototype.trim) {
  	// Вырезаем BOM и неразрывный пробел
  	String.prototype.trim = function() {
  		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  	};
  }
  //every.js
  /*
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
  */
  if (!Array.prototype.every) {
    Array.prototype.every = function(callback, thisArg) {
      var T, k;

      if (this === void 0 || this === null) {
        throw new TypeError('Array.prototype.every called on null or undefined');
      }

      // 1. Let O be the result of calling ToObject passing the this 
      //    value as the argument.
      var O = Object(this);

      // 2. Let lenValue be the result of calling the Get internal method
      //    of O with the argument "length".
      // 3. Let len be ToUint32(lenValue).
      var len = O.length >>> 0;

      // 4. If IsCallable(callback) is false, throw a TypeError exception.
      if (callback.__class__ !== 'Function') {
        throw new TypeError(callback + ' is not a function');
      }

      // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
      T = (arguments.length > 1) ? thisArg : void 0;

      // 6. Let k be 0.
      k = 0;

      // 7. Repeat, while k < len
      while (k < len) {

        var kValue;

        // a. Let Pk be ToString(k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the HasProperty internal 
        //    method of O with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        if (k in O) {

          // i. Let kValue be the result of calling the Get internal method
          //    of O with argument Pk.
          kValue = O[k];

          // ii. Let testResult be the result of calling the Call internal method
          //     of callback with T as the this value and argument list 
          //     containing kValue, k, and O.
          var testResult = callback.call(T, kValue, k, O);

          // iii. If ToBoolean(testResult) is false, return false.
          if (!testResult) {
            return false;
          }
        }
        k++;
      }
      return true;
    };
  }
  //filter.js
  /*
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  */
  if (!Array.prototype.filter) {
    Array.prototype.filter = function(callback, thisArg) {

      if (this === void 0 || this === null) {
        throw new TypeError('Array.prototype.filter called on null or undefined');
      }

      var t = Object(this);
      var len = t.length >>> 0;

      if (callback.__class__ !== 'Function') {
        throw new TypeError(callback + ' is not a function');
      }

      var res = [];

      var T = (arguments.length > 1) ? thisArg : void 0;
      
      for (var i = 0; i < len; i++) {
        if (i in t) {
          var val = t[i];

          // NOTE: Technically this should Object.defineProperty at
          //       the next index, as push can be affected by
          //       properties on Object.prototype and Array.prototype.
          //       But that method's new, and collisions should be
          //       rare, so use the more-compatible alternative.
          if (callback.call(T, val, i, t)) {
            res.push(val);
          }
        }
      }

      return res;
    };
  }
  //forEach.js
  /*
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  */
  // Production steps of ECMA-262, Edition 5, 15.4.4.18
  // Reference: http://es5.github.io/#x15.4.4.18
  if (!Array.prototype.forEach) {
      Array.prototype.forEach = function(callback, thisArg) {


          if (this === void 0 || this === null) {
              throw new TypeError('Array.prototype.forEach called on null or undefined');
          }

          // 1. Let O be the result of calling toObject() passing the
          // |this| value as the argument.
          var O = Object(this);

          // 2. Let lenValue be the result of calling the Get() internal
          // method of O with the argument "length".
          // 3. Let len be toUint32(lenValue).
          var len = O.length >>> 0;

          // 4. If isCallable(callback) is false, throw a TypeError exception. 
          // See: http://es5.github.com/#x9.11
          if (callback.__class__ !== 'Function') {
              throw new TypeError(callback + ' is not a function');
          }

          // 5. If thisArg was supplied, let T be thisArg; else let
          // T be undefined.
          var T = (arguments.length > 1) ? thisArg : void 0;


          // 6. Let k be 0
          //k = 0;

          // 7. Repeat, while k < len
          for (var k = 0; k < len; k++) {
              var kValue;
              // a. Let Pk be ToString(k).
              //    This is implicit for LHS operands of the in operator
              // b. Let kPresent be the result of calling the HasProperty
              //    internal method of O with argument Pk.
              //    This step can be combined with c
              // c. If kPresent is true, then
              if (k in O) {
                  // i. Let kValue be the result of calling the Get internal
                  // method of O with argument Pk.
                  kValue = O[k];
                  // ii. Call the Call internal method of callback with T as
                  // the this value and argument list containing kValue, k, and O.
                  callback.call(T, kValue, k, O);
              }
          }
          // 8. return undefined
      };
  }
  //indexOf.js
  /*
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill
  */
  // Production steps of ECMA-262, Edition 5, 15.4.4.14
  // Reference: http://es5.github.io/#x15.4.4.14
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {


      // 1. Let o be the result of calling ToObject passing
      //    the this value as the argument.
      if (this === void 0 || this === null) {
        throw new TypeError('Array.prototype.indexOf called on null or undefined');
      }

      var k;
      var o = Object(this);

      // 2. Let lenValue be the result of calling the Get
      //    internal method of o with the argument "length".
      // 3. Let len be ToUint32(lenValue).
      var len = o.length >>> 0;

      // 4. If len is 0, return -1.
      if (len === 0) {
        return -1;
      }

      // 5. If argument fromIndex was passed let n be
      //    ToInteger(fromIndex); else let n be 0.
      var n = +fromIndex || 0;

      if (Math.abs(n) === Infinity) {
        n = 0;
      }

      // 6. If n >= len, return -1.
      if (n >= len) {
        return -1;
      }

      // 7. If n >= 0, then Let k be n.
      // 8. Else, n<0, Let k be len - abs(n).
      //    If k is less than 0, then let k be 0.
      k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      // 9. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ToString(k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the
        //    HasProperty internal method of o with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        //    i.  Let elementK be the result of calling the Get
        //        internal method of o with the argument ToString(k).
        //   ii.  Let same be the result of applying the
        //        Strict Equality Comparison Algorithm to
        //        searchElement and elementK.
        //  iii.  If same is true, return k.
        if (k in o && o[k] === searchElement) {
          return k;
        }
        k++;
      }
      return -1;
    };
  }
  //isArray.js
  /*
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
  */
  if (!Array.isArray) {
    Array.isArray = function(arg) {

      if (arg === void 0 || arg === null) {
        return false;
      }
    	return (arg.__class__ === 'Array');
    };
  }
  //lastIndexOf.js
  /*
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf
  */
  // Production steps of ECMA-262, Edition 5, 15.4.4.15
  // Reference: http://es5.github.io/#x15.4.4.15
  if (!Array.prototype.lastIndexOf) {
    Array.prototype.lastIndexOf = function(searchElement, fromIndex) {

      if (this === void 0 || this === null) {
        throw new TypeError('Array.prototype.lastIndexOf called on null or undefined');
      }

      var n, k,
        t = Object(this),
        len = t.length >>> 0;
      if (len === 0) {
        return -1;
      }

      n = len - 1;
      if (arguments.length > 1) {
        n = Number(arguments[1]);
        if (n != n) {
          n = 0;
        }
        else if (n != 0 && n != Infinity && n != -Infinity) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
      }

      for (k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n); k >= 0; k--) {
        if (k in t && t[k] === searchElement) {
          return k;
        }
      }
      return -1;
    };
  }
  //map.js
  /*
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  */
  // Production steps of ECMA-262, Edition 5, 15.4.4.19
  // Reference: http://es5.github.io/#x15.4.4.19
  if (!Array.prototype.map) {

    Array.prototype.map = function(callback, thisArg) {

      var T, A, k;

      if (this === void 0 || this === null) {
        throw new TypeError('Array.prototype.map called on null or undefined');
      }

      // 1. Let O be the result of calling ToObject passing the |this| 
      //    value as the argument.
      var O = Object(this);

      // 2. Let lenValue be the result of calling the Get internal 
      //    method of O with the argument "length".
      // 3. Let len be ToUint32(lenValue).
      var len = O.length >>> 0;

      // 4. If IsCallable(callback) is false, throw a TypeError exception.
      // See: http://es5.github.com/#x9.11
      if (callback.__class__ !== 'Function') {
        throw new TypeError(callback + ' is not a function');
      }

      // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
      T = (arguments.length > 1) ? thisArg : void 0;

      // 6. Let A be a new array created as if by the expression new Array(len) 
      //    where Array is the standard built-in constructor with that name and 
      //    len is the value of len.
      A = new Array(len);

      for (var k = 0; k < len; k++) {

        var kValue, mappedValue;

        // a. Let Pk be ToString(k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the HasProperty internal 
        //    method of O with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        if (k in O) {

          // i. Let kValue be the result of calling the Get internal 
          //    method of O with argument Pk.
          kValue = O[k];

          // ii. Let mappedValue be the result of calling the Call internal 
          //     method of callback with T as the this value and argument 
          //     list containing kValue, k, and O.
          mappedValue = callback.call(T, kValue, k, O);

          // iii. Call the DefineOwnProperty internal method of A with arguments
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
        }
      }
      // 9. return A
      return A;
    };
  }
  //reduce.js
  /*
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  */
  // Production steps of ECMA-262, Edition 5, 15.4.4.21
  // Reference: http://es5.github.io/#x15.4.4.21
  if (!Array.prototype.reduce) {
    Array.prototype.reduce = function(callback, initialValue) {

      if (this === void 0 || this === null) {
        throw new TypeError('Array.prototype.reduce called on null or undefined');
      }

      if (callback.__class__ !== 'Function') {
        throw new TypeError(callback + ' is not a function');
      }

      var t = Object(this), len = t.length >>> 0, k = 0, value;

      if (arguments.length > 1) 
        {
          value = initialValue;
        } 
      else 
        {
          while (k < len && !(k in t)) {
            k++; 
          }
          if (k >= len) {
            throw new TypeError('Reduce of empty array with no initial value');
          }
          value = t[k++];
        }

      for (; k < len; k++) {
        if (k in t) {
          value = callback(value, t[k], k, t);
        }
      }
      return value;
    };
  }
  //reduceRight.js
  /*
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight
  */
  // Production steps of ECMA-262, Edition 5, 15.4.4.22
  // Reference: http://es5.github.io/#x15.4.4.22
  if (!Array.prototype.reduceRight) {
    Array.prototype.reduceRight = function(callback, initialValue) {

      if (this === void 0 || this === null) {
        throw new TypeError('Array.prototype.reduceRight called on null or undefined');
      }

      if (callback.__class__ !== 'Function') {
        throw new TypeError(callback + ' is not a function');
      }

      var t = Object(this), len = t.length >>> 0, k = len - 1, value;
      if (arguments.length > 1) 
        {
          value = initialValue;
        } 
      else 
        {
          while (k >= 0 && !(k in t)) {
            k--;
          }
          if (k < 0) {
            throw new TypeError('Reduce of empty array with no initial value');
          }
          value = t[k--];
        }
        
      for (; k >= 0; k--) {
        if (k in t) {
          value = callback(value, t[k], k, t);
        }
      }
      return value;
    };
  }
  //some.js
  /*
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
  */
  // Production steps of ECMA-262, Edition 5, 15.4.4.17
  // Reference: http://es5.github.io/#x15.4.4.17
  if (!Array.prototype.some) {
    Array.prototype.some = function(callback, thisArg) {

      if (this === void 0 || this === null) {
        throw new TypeError('Array.prototype.some called on null or undefined');
      }

      if (callback.__class__ !== 'Function') {
        throw new TypeError(callback + ' is not a function');
      }

      var t = Object(this);
      var len = t.length >>> 0;

      var T = arguments.length > 1 ? thisArg : void 0;
      for (var i = 0; i < len; i++) {
        if (i in t && callback.call(T, t[i], i, t)) {
          return true;
        }
      }

      return false;
    };
  }
  //create.js
  if (!Object.create) {
    // Production steps of ECMA-262, Edition 5, 15.2.3.5
    // Reference: http://es5.github.io/#x15.2.3.5
    Object.create = (function() {
      // To save on memory, use a shared constructor
      function Temp() {}

      // make a safe reference to Object.prototype.hasOwnProperty
      var hasOwn = Object.prototype.hasOwnProperty;

      return function(O) {
        // 1. If Type(O) is not Object or Null throw a TypeError exception.
        if (Object(O) !== O && O !== null) {
          throw TypeError('Object prototype may only be an Object or null');
        }

        // 2. Let obj be the result of creating a new object as if by the
        //    expression new Object() where Object is the standard built-in
        //    constructor with that name
        // 3. Set the [[Prototype]] internal property of obj to O.
        Temp.prototype = O;
        var obj = new Temp();
        Temp.prototype = null; // Let's not keep a stray reference to O...

        // 4. If the argument Properties is present and not undefined, add
        //    own properties to obj as if by calling the standard built-in
        //    function Object.defineProperties with arguments obj and
        //    Properties.
        if (arguments.length > 1) {
          // Object.defineProperties does ToObject on its first argument.
          var Properties = Object(arguments[1]);
          for (var prop in Properties) {
            if (hasOwn.call(Properties, prop)) {
              var descriptor = Properties[prop];
              if (Object(descriptor) !== descriptor) {
                throw TypeError(prop + 'must be an object');
              }
              if ('get' in descriptor || 'set' in descriptor) {
                throw new TypeError('getters & setters can not be defined on this javascript engine');
              }
              if ('value' in descriptor) {
                obj[prop] = Properties[prop];
              }

            }
          }
        }

        // 5. Return obj
        return obj;
      };
    })();
  }
  //defineProperties.js
  /*
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties#Polyfill
  */
  if (!Object.defineProperties) {

    Object.defineProperties = function(object, props) {

      function hasProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }

      function convertToDescriptor(desc) {

        if (Object(desc) !== desc) {
          throw new TypeError('Descriptor can only be an Object.');
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
          throw new TypeError('getters & setters can not be defined on this javascript engine');
        }

        if (hasProperty(desc, "set")) {
          throw new TypeError('getters & setters can not be defined on this javascript engine');
        }

        return d;
      }

      if (Object(object) !== object) {
        throw new TypeError('Object.defineProperties can only be called on Objects.');
      }

      if (Object(props) !== props) {
        throw new TypeError('Properties can only be an Object.');
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
  //defineProperty.js
  if (!Object.defineProperty) {

      Object.defineProperty = function defineProperty(object, property, descriptor) {

          if (Object(object) !== object) {
              throw new TypeError('Object.defineProperty can only be called on Objects.');
          }

          if (Object(descriptor) !== descriptor) {
              throw new TypeError('Property description can only be an Object.');
          }

          if ('get' in descriptor || 'set' in descriptor) {
              throw new TypeError('getters & setters can not be defined on this javascript engine');
          }
          // If it's a data property.
          if ('value' in descriptor) {
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
  //freeze.js
  /*
  https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
  */
  // ES5 15.2.3.9
  // http://es5.github.com/#x15.2.3.9
  if (!Object.freeze) {
      Object.freeze = function freeze(object) {
          if (Object(object) !== object) {
              throw new TypeError('Object.freeze can only be called on Objects.');
          }
          // this is misleading and breaks feature-detection, but
          // allows "securable" code to "gracefully" degrade to working
          // but insecure code.
          return object;
      };
  }
  //getOwnPropertyNames.js
  if (!Object.getOwnPropertyNames) {
      Object.getOwnPropertyNames = function getOwnPropertyNames(object) {

          if (Object(object) !== object) {
              throw new TypeError('Object.getOwnPropertyNames can only be called on Objects.');
          }
          var names = [];
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
          for (var prop in object) {
              if (hasOwnProperty.call(object, prop)) {
                  names.push(prop);
              }
          }
          var properties = object.reflect.properties;
          var methods = object.reflect.methods;
          var all = methods.concat(properties);
          for (var i = 0; i < all.length; i++) {
              var prop = all[i].name;
              if (hasOwnProperty.call(object, prop) && !(propertyIsEnumerable.call(object, prop))) {
                  names.push(prop);
              }
          }
          return names;
      };
  }
  //getOwnPropertyDescriptor.js
  if (!Object.getOwnPropertyDescriptor) {

      Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
          if (Object(object) !== object) {
              throw new TypeError('Object.getOwnPropertyDescriptor can only be called on Objects.');
          }

          var descriptor;
          if (!Object.prototype.hasOwnProperty.call(object, property)) {
              return descriptor;
          }

          descriptor = {
              enumerable: Object.prototype.propertyIsEnumerable.call(object, property),
              configurable: true
          };

          descriptor.value = object[property];

          var psPropertyType = object.reflect.find(property).type;
          descriptor.writable = !(psPropertyType === "readonly");

          return descriptor;
      };
  }
  //getPrototypeOf.js
  if (!Object.getPrototypeOf) {
  	Object.getPrototypeOf = function(object) {
  		if (Object(object) !== object) {
  			throw new TypeError('Object.getPrototypeOf can only be called on Objects.');
  		}
  		return object.__proto__;
  	};
  }
  //isExtensible.js
  // ES5 15.2.3.13
  // http://es5.github.com/#x15.2.3.13
  if (!Object.isExtensible) {
      Object.isExtensible = function isExtensible(object) {
          if (Object(object) !== object) {
              throw new TypeError('Object.isExtensible can only be called on Objects.');
          }
          return true;
      };
  }
  //isFrozen.js
  /*
  https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
  */
  // ES5 15.2.3.12
  // http://es5.github.com/#x15.2.3.12
  if (!Object.isFrozen) {
      Object.isFrozen = function isFrozen(object) {
          if (Object(object) !== object) {
              throw new TypeError('Object.isFrozen can only be called on Objects.');
          }
          return false;
      };
  }
  //isSealed.js
  /*
  https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
  */
  // ES5 15.2.3.11
  // http://es5.github.com/#x15.2.3.11
  if (!Object.isSealed) {
      Object.isSealed = function isSealed(object) {
          if (Object(object) !== object) {
              throw new TypeError('Object.isSealed can only be called on Objects.');
          }
          return false;
      };
  }
  //keys.js
  if (!Object.keys) {
      Object.keys = function(object) {
          if (Object(object) !== object) {
              throw new TypeError('Object.keys can only be called on Objects.');
          }
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          var result = [];
          for (var prop in object) {
              if (hasOwnProperty.call(object, prop)) {
                  result.push(prop);
              }
          }
          return result;
      };
  }
  //preventExtensions.js
  /*
  https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
  */
  // ES5 15.2.3.10
  // http://es5.github.com/#x15.2.3.10
  if (!Object.preventExtensions) {
      Object.preventExtensions = function preventExtensions(object) {

          if (Object(object) !== object) {
              throw new TypeError('Object.preventExtensions can only be called on Objects.');
          }
          // this is misleading and breaks feature-detection, but
          // allows "securable" code to "gracefully" degrade to working
          // but insecure code.
          return object;
      };
  }
  //seal.js
  /*
  https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
  */
  // ES5 15.2.3.8
  // http://es5.github.com/#x15.2.3.8
  if (!Object.seal) {
      Object.seal = function seal(object) {
          if (Object(object) !== object) {
              throw new TypeError('Object.seal can only be called on Objects.');
          }
          // this is misleading and breaks feature-detection, but
          // allows "securable" code to "gracefully" degrade to working
          // but insecure code.
          return object;
      };
  }
  //bind.js
  /*
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill

  WARNING! Bound functions used as constructors NOT supported by this polyfill!
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Bound_functions_used_as_constructors
  */
  if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
      if (this.__class__ !== 'Function') {
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }

      var aArgs   = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP    = function() {},
          fBound  = function() {
            return fToBind.apply(this instanceof fNOP
                   ? this
                   : oThis,
                   aArgs.concat(Array.prototype.slice.call(arguments)));
          };

      if (this.prototype) {
        // Function.prototype doesn't have a prototype property
        fNOP.prototype = this.prototype; 
      }
      fBound.prototype = new fNOP();

      return fBound;
    };
  }
  //toISOString.js
  /*
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
  */
  if (!Date.prototype.toISOString) {
    (function() {

      function pad(number) {
        if (number < 10) {
          return '0' + number;
        }
        return number;
      }

      Date.prototype.toISOString = function() {
        return this.getUTCFullYear() +
          '-' + pad(this.getUTCMonth() + 1) +
          '-' + pad(this.getUTCDate()) +
          'T' + pad(this.getUTCHours()) +
          ':' + pad(this.getUTCMinutes()) +
          ':' + pad(this.getUTCSeconds()) +
          '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
          'Z';
      };

    }());
  }

  //from.js
  // Production steps of ECMA-262, Edition 6, 22.1.2.1
  if (!Array.from) {
    Array.from = (function () {
      var toStr = Object.prototype.toString;
      var isCallable = function (fn) {
        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
      };
      var toInteger = function (value) {
        var number = Number(value);
        if (isNaN(number)) { return 0; }
        if (number === 0 || !isFinite(number)) { return number; }
        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var toLength = function (value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
      };

      // The length property of the from method is 1.
      return function from(arrayLike/*, mapFn, thisArg */) {
        // 1. Let C be the this value.
        var C = this;

        // 2. Let items be ToObject(arrayLike).
        var items = Object(arrayLike);

        // 3. ReturnIfAbrupt(items).
        if (arrayLike == null) {
          throw new TypeError('Array.from requires an array-like object - not null or undefined');
        }

        // 4. If mapfn is undefined, then let mapping be false.
        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        var T;
        if (typeof mapFn !== 'undefined') {
          // 5. else
          // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
          if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function');
          }

          // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
          if (arguments.length > 2) {
            T = arguments[2];
          }
        }

        // 10. Let lenValue be Get(items, "length").
        // 11. Let len be ToLength(lenValue).
        var len = toLength(items.length);

        // 13. If IsConstructor(C) is true, then
        // 13. a. Let A be the result of calling the [[Construct]] internal method 
        // of C with an argument list containing the single item len.
        // 14. a. Else, Let A be ArrayCreate(len).
        var A = isCallable(C) ? Object(new C(len)) : new Array(len);

        // 16. Let k be 0.
        var k = 0;
        // 17. Repeat, while k < len… (also steps a - h)
        var kValue;
        while (k < len) {
          kValue = items[k];
          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
          k += 1;
        }
        // 18. Let putStatus be Put(A, "length", len, true).
        A.length = len;
        // 20. Return A.
        return A;
      };
    }());
  }

  //reduce.js
  /*
  Source of the polyfill: 
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Polyfill

  */

  if(!Array.prototype.reduce){
      
      Array.prototype.reduce = function(callback) {
          if (this == null) {
          throw new TypeError('Array.prototype.reduce called on null or undefined');
          }
          if (typeof callback !== 'function') {
          throw new TypeError(callback + ' is not a function');
          }
          var t = Object(this), len = t.length >>> 0, k = 0, value;
          if (arguments.length == 2) {
          value = arguments[1];
          } else {
          while (k < len && !(k in t)) {
              k++; 
          }
          if (k >= len) {
              throw new TypeError('Reduce of empty array with no initial value');
          }
          value = t[k++];
          }
          for (; k < len; k++) {
          if (k in t) {
              value = callback(value, t[k], k, t);
          }
          }
          return value;
      };
  }
  //assign.js
  /**
   * https://gist.github.com/WebReflection/10404826
   */
  /* eslint no-use-before-define: off */

  try {
    Object.assign({}, {foo: 'bar'});
  }catch(err) {
    // failed: so we're in IE8
    (function() {
      Object.assign = (function(has) {
        return assign;
        function assign(target, source) {
          for (var i = 1; i < arguments.length; i++) {
            copy(target, arguments[i]);
          }
          return target;
        }
        function copy(target, source) {
          for (var key in source) {
            if (has.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
      }({}.hasOwnProperty));
    }());
  }

  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, "find", {
      value: function(predicate) {
        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw TypeError('"this" is null or not defined');
        }

        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If IsCallable(predicate) is false, throw a TypeError exception.
        if (typeof predicate !== "function") {
          throw TypeError("predicate must be a function");
        }

        // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
        var thisArg = arguments[1];

        // 5. Let k be 0.
        var k = 0;

        // 6. Repeat, while k < len
        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kValue be ? Get(O, Pk).
          // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
          // d. If testResult is true, return kValue.
          var kValue = o[k];
          if (predicate.call(thisArg, kValue, k, o)) {
            return kValue;
          }
          // e. Increase k by 1.
          k++;
        }

        // 7. Return undefined.
        return undefined;
      },
      configurable: true,
      writable: true
    });
  }

  if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function(predicate) {
      if (this === null) {
        throw new TypeError(
          "Array.prototype.findIndex called on null or undefined"
        );
      }
      if (typeof predicate !== "function") {
        throw new TypeError("predicate must be a function");
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return i;
        }
      }
      return -1;
    };
  }

  var toStr = Object.prototype.toString;

  var isArguments = function isArguments(value) {
  	var str = toStr.call(value);
  	var isArgs = str === '[object Arguments]';
  	if (!isArgs) {
  		isArgs = str !== '[object Array]' &&
  			value !== null &&
  			typeof value === 'object' &&
  			typeof value.length === 'number' &&
  			value.length >= 0 &&
  			toStr.call(value.callee) === '[object Function]';
  	}
  	return isArgs;
  };

  var keysShim;
  if (!Object.keys) {
  	// modified from https://github.com/es-shims/es5-shim
  	var has = Object.prototype.hasOwnProperty;
  	var toStr$1 = Object.prototype.toString;
  	var isArgs = isArguments; // eslint-disable-line global-require
  	var isEnumerable = Object.prototype.propertyIsEnumerable;
  	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
  	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
  	var dontEnums = [
  		'toString',
  		'toLocaleString',
  		'valueOf',
  		'hasOwnProperty',
  		'isPrototypeOf',
  		'propertyIsEnumerable',
  		'constructor'
  	];
  	var equalsConstructorPrototype = function (o) {
  		var ctor = o.constructor;
  		return ctor && ctor.prototype === o;
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
  	var hasAutomationEqualityBug = (function () {
  		/* global window */
  		if (typeof window === 'undefined') { return false; }
  		for (var k in window) {
  			try {
  				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
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
  	}());
  	var equalsConstructorPrototypeIfNotBuggy = function (o) {
  		/* global window */
  		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
  			return equalsConstructorPrototype(o);
  		}
  		try {
  			return equalsConstructorPrototype(o);
  		} catch (e) {
  			return false;
  		}
  	};

  	keysShim = function keys(object) {
  		var isObject = object !== null && typeof object === 'object';
  		var isFunction = toStr$1.call(object) === '[object Function]';
  		var isArguments = isArgs(object);
  		var isString = isObject && toStr$1.call(object) === '[object String]';
  		var theKeys = [];

  		if (!isObject && !isFunction && !isArguments) {
  			throw new TypeError('Object.keys called on a non-object');
  		}

  		var skipProto = hasProtoEnumBug && isFunction;
  		if (isString && object.length > 0 && !has.call(object, 0)) {
  			for (var i = 0; i < object.length; ++i) {
  				theKeys.push(String(i));
  			}
  		}

  		if (isArguments && object.length > 0) {
  			for (var j = 0; j < object.length; ++j) {
  				theKeys.push(String(j));
  			}
  		} else {
  			for (var name in object) {
  				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
  					theKeys.push(String(name));
  				}
  			}
  		}

  		if (hasDontEnumBug) {
  			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

  			for (var k = 0; k < dontEnums.length; ++k) {
  				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
  					theKeys.push(dontEnums[k]);
  				}
  			}
  		}
  		return theKeys;
  	};
  }
  var implementation = keysShim;

  var slice = Array.prototype.slice;


  var origKeys = Object.keys;
  var keysShim$1 = origKeys ? function keys(o) { return origKeys(o); } : implementation;

  var originalKeys = Object.keys;

  keysShim$1.shim = function shimObjectKeys() {
  	if (Object.keys) {
  		var keysWorksWithArguments = (function () {
  			// Safari 5.0 bug
  			var args = Object.keys(arguments);
  			return args && args.length === arguments.length;
  		}(1, 2));
  		if (!keysWorksWithArguments) {
  			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
  				if (isArguments(object)) {
  					return originalKeys(slice.call(object));
  				}
  				return originalKeys(object);
  			};
  		}
  	} else {
  		Object.keys = keysShim$1;
  	}
  	return Object.keys || keysShim$1;
  };

  var D__Documents_Projects_myProjects_AE_Scripts_node_modules_objectKeys = keysShim$1;

  var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

  var toStr$2 = Object.prototype.toString;
  var concat = Array.prototype.concat;
  var origDefineProperty = Object.defineProperty;

  var isFunction = function (fn) {
  	return typeof fn === 'function' && toStr$2.call(fn) === '[object Function]';
  };

  var arePropertyDescriptorsSupported = function () {
  	var obj = {};
  	try {
  		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
  		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
  		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
  			return false;
  		}
  		return obj.x === obj;
  	} catch (e) { /* this is IE 8. */
  		return false;
  	}
  };
  var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

  var defineProperty = function (object, name, value, predicate) {
  	if (name in object && (!isFunction(predicate) || !predicate())) {
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

  var defineProperties = function (object, map) {
  	var predicates = arguments.length > 2 ? arguments[2] : {};
  	var props = D__Documents_Projects_myProjects_AE_Scripts_node_modules_objectKeys(map);
  	if (hasSymbols) {
  		props = concat.call(props, Object.getOwnPropertySymbols(map));
  	}
  	for (var i = 0; i < props.length; i += 1) {
  		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
  	}
  };

  defineProperties.supportsDescriptors = !!supportsDescriptors;

  var D__Documents_Projects_myProjects_AE_Scripts_node_modules_defineProperties = defineProperties;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  /* eslint complexity: [2, 18], max-statements: [2, 33] */
  var shams = function hasSymbols() {
  	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
  	if (typeof Symbol.iterator === 'symbol') { return true; }

  	var obj = {};
  	var sym = Symbol('test');
  	var symObj = Object(sym);
  	if (typeof sym === 'string') { return false; }

  	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
  	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

  	// temp disabled per https://github.com/ljharb/object.assign/issues/17
  	// if (sym instanceof Symbol) { return false; }
  	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
  	// if (!(symObj instanceof Symbol)) { return false; }

  	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
  	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

  	var symVal = 42;
  	obj[sym] = symVal;
  	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax
  	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

  	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

  	var syms = Object.getOwnPropertySymbols(obj);
  	if (syms.length !== 1 || syms[0] !== sym) { return false; }

  	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

  	if (typeof Object.getOwnPropertyDescriptor === 'function') {
  		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
  		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
  	}

  	return true;
  };

  var origSymbol = commonjsGlobal.Symbol;


  var D__Documents_Projects_myProjects_AE_Scripts_node_modules_hasSymbols = function hasNativeSymbols() {
  	if (typeof origSymbol !== 'function') { return false; }
  	if (typeof Symbol !== 'function') { return false; }
  	if (typeof origSymbol('foo') !== 'symbol') { return false; }
  	if (typeof Symbol('bar') !== 'symbol') { return false; }

  	return shams();
  };

  /* eslint no-invalid-this: 1 */

  var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
  var slice$1 = Array.prototype.slice;
  var toStr$3 = Object.prototype.toString;
  var funcType = '[object Function]';

  var implementation$1 = function bind(that) {
      var target = this;
      if (typeof target !== 'function' || toStr$3.call(target) !== funcType) {
          throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slice$1.call(arguments, 1);

      var bound;
      var binder = function () {
          if (this instanceof bound) {
              var result = target.apply(
                  this,
                  args.concat(slice$1.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return this;
          } else {
              return target.apply(
                  that,
                  args.concat(slice$1.call(arguments))
              );
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

  var D__Documents_Projects_myProjects_AE_Scripts_node_modules_functionBind = Function.prototype.bind || implementation$1;

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

  var throwTypeError = function () { throw new $TypeError(); };
  var ThrowTypeError = $gOPD
  	? (function () {
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
  	}())
  	: throwTypeError;

  var hasSymbols$1 = D__Documents_Projects_myProjects_AE_Scripts_node_modules_hasSymbols();

  var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto
  var generatorFunction =  undefined$1;
  var asyncFunction =  undefined$1;
  var asyncGenFunction =  undefined$1;

  var TypedArray = typeof Uint8Array === 'undefined' ? undefined$1 : getProto(Uint8Array);

  var INTRINSICS = {
  	'%Array%': Array,
  	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
  	'%ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer.prototype,
  	'%ArrayIteratorPrototype%': hasSymbols$1 ? getProto([][Symbol.iterator]()) : undefined$1,
  	'%ArrayPrototype%': Array.prototype,
  	'%ArrayProto_entries%': Array.prototype.entries,
  	'%ArrayProto_forEach%': Array.prototype.forEach,
  	'%ArrayProto_keys%': Array.prototype.keys,
  	'%ArrayProto_values%': Array.prototype.values,
  	'%AsyncFromSyncIteratorPrototype%': undefined$1,
  	'%AsyncFunction%': asyncFunction,
  	'%AsyncFunctionPrototype%':  undefined$1,
  	'%AsyncGenerator%':  undefined$1,
  	'%AsyncGeneratorFunction%': asyncGenFunction,
  	'%AsyncGeneratorPrototype%':  undefined$1,
  	'%AsyncIteratorPrototype%':  undefined$1,
  	'%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
  	'%Boolean%': Boolean,
  	'%BooleanPrototype%': Boolean.prototype,
  	'%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
  	'%DataViewPrototype%': typeof DataView === 'undefined' ? undefined$1 : DataView.prototype,
  	'%Date%': Date,
  	'%DatePrototype%': Date.prototype,
  	'%decodeURI%': decodeURI,
  	'%decodeURIComponent%': decodeURIComponent,
  	'%encodeURI%': encodeURI,
  	'%encodeURIComponent%': encodeURIComponent,
  	'%Error%': Error,
  	'%ErrorPrototype%': Error.prototype,
  	'%eval%': eval, // eslint-disable-line no-eval
  	'%EvalError%': EvalError,
  	'%EvalErrorPrototype%': EvalError.prototype,
  	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
  	'%Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array.prototype,
  	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
  	'%Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array.prototype,
  	'%Function%': Function,
  	'%FunctionPrototype%': Function.prototype,
  	'%Generator%':  undefined$1,
  	'%GeneratorFunction%': generatorFunction,
  	'%GeneratorPrototype%':  undefined$1,
  	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
  	'%Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array.prototype,
  	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
  	'%Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined$1 : Int8Array.prototype,
  	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
  	'%Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array.prototype,
  	'%isFinite%': isFinite,
  	'%isNaN%': isNaN,
  	'%IteratorPrototype%': hasSymbols$1 ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
  	'%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
  	'%JSONParse%': typeof JSON === 'object' ? JSON.parse : undefined$1,
  	'%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
  	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$1 ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
  	'%MapPrototype%': typeof Map === 'undefined' ? undefined$1 : Map.prototype,
  	'%Math%': Math,
  	'%Number%': Number,
  	'%NumberPrototype%': Number.prototype,
  	'%Object%': Object,
  	'%ObjectPrototype%': Object.prototype,
  	'%ObjProto_toString%': Object.prototype.toString,
  	'%ObjProto_valueOf%': Object.prototype.valueOf,
  	'%parseFloat%': parseFloat,
  	'%parseInt%': parseInt,
  	'%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
  	'%PromisePrototype%': typeof Promise === 'undefined' ? undefined$1 : Promise.prototype,
  	'%PromiseProto_then%': typeof Promise === 'undefined' ? undefined$1 : Promise.prototype.then,
  	'%Promise_all%': typeof Promise === 'undefined' ? undefined$1 : Promise.all,
  	'%Promise_reject%': typeof Promise === 'undefined' ? undefined$1 : Promise.reject,
  	'%Promise_resolve%': typeof Promise === 'undefined' ? undefined$1 : Promise.resolve,
  	'%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
  	'%RangeError%': RangeError,
  	'%RangeErrorPrototype%': RangeError.prototype,
  	'%ReferenceError%': ReferenceError,
  	'%ReferenceErrorPrototype%': ReferenceError.prototype,
  	'%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
  	'%RegExp%': RegExp,
  	'%RegExpPrototype%': RegExp.prototype,
  	'%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
  	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$1 ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
  	'%SetPrototype%': typeof Set === 'undefined' ? undefined$1 : Set.prototype,
  	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
  	'%SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer.prototype,
  	'%String%': String,
  	'%StringIteratorPrototype%': hasSymbols$1 ? getProto(''[Symbol.iterator]()) : undefined$1,
  	'%StringPrototype%': String.prototype,
  	'%Symbol%': hasSymbols$1 ? Symbol : undefined$1,
  	'%SymbolPrototype%': hasSymbols$1 ? Symbol.prototype : undefined$1,
  	'%SyntaxError%': SyntaxError,
  	'%SyntaxErrorPrototype%': SyntaxError.prototype,
  	'%ThrowTypeError%': ThrowTypeError,
  	'%TypedArray%': TypedArray,
  	'%TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined$1,
  	'%TypeError%': $TypeError,
  	'%TypeErrorPrototype%': $TypeError.prototype,
  	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
  	'%Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array.prototype,
  	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
  	'%Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray.prototype,
  	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
  	'%Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array.prototype,
  	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
  	'%Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array.prototype,
  	'%URIError%': URIError,
  	'%URIErrorPrototype%': URIError.prototype,
  	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
  	'%WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap.prototype,
  	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet,
  	'%WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet.prototype
  };


  var $replace = D__Documents_Projects_myProjects_AE_Scripts_node_modules_functionBind.call(Function.call, String.prototype.replace);

  /* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
  var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
  var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
  var stringToPath = function stringToPath(string) {
  	var result = [];
  	$replace(string, rePropName, function (match, number, quote, subString) {
  		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : (number || match);
  	});
  	return result;
  };
  /* end adaptation */

  var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
  	if (!(name in INTRINSICS)) {
  		throw new SyntaxError('intrinsic ' + name + ' does not exist!');
  	}

  	// istanbul ignore if // hopefully this is impossible to test :-)
  	if (typeof INTRINSICS[name] === 'undefined' && !allowMissing) {
  		throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
  	}

  	return INTRINSICS[name];
  };

  var GetIntrinsic = function GetIntrinsic(name, allowMissing) {
  	if (typeof name !== 'string' || name.length === 0) {
  		throw new TypeError('intrinsic name must be a non-empty string');
  	}
  	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
  		throw new TypeError('"allowMissing" argument must be a boolean');
  	}

  	var parts = stringToPath(name);

  	var value = getBaseIntrinsic('%' + (parts.length > 0 ? parts[0] : '') + '%', allowMissing);
  	for (var i = 1; i < parts.length; i += 1) {
  		if (value != null) {
  			if ($gOPD && (i + 1) >= parts.length) {
  				var desc = $gOPD(value, parts[i]);
  				if (!allowMissing && !(parts[i] in value)) {
  					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
  				}
  				value = desc ? (desc.get || desc.value) : value[parts[i]];
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
  	return D__Documents_Projects_myProjects_AE_Scripts_node_modules_functionBind.apply($call, arguments);
  };

  var apply = function applyBind() {
  	return D__Documents_Projects_myProjects_AE_Scripts_node_modules_functionBind.apply($apply, arguments);
  };
  callBind.apply = apply;

  var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

  var callBound = function callBoundIntrinsic(name, allowMissing) {
  	var intrinsic = GetIntrinsic(name, !!allowMissing);
  	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.')) {
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
  	if (!String.prototype.trimEnd && !String.prototype.trimRight) {
  		return implementation$2;
  	}
  	var zeroWidthSpace = '\u200b';
  	var trimmed = zeroWidthSpace.trimEnd ? zeroWidthSpace.trimEnd() : zeroWidthSpace.trimRight();
  	if (trimmed !== zeroWidthSpace) {
  		return implementation$2;
  	}
  	return String.prototype.trimEnd || String.prototype.trimRight;
  };

  var shim = function shimTrimEnd() {
  	var polyfill$1 = polyfill();
  	D__Documents_Projects_myProjects_AE_Scripts_node_modules_defineProperties(
  		String.prototype,
  		{ trimEnd: polyfill$1 },
  		{ trimEnd: function () { return String.prototype.trimEnd !== polyfill$1; } }
  	);
  	return polyfill$1;
  };

  shim();
  // for "path-parse"
  process = {};

  var pathParse = createCommonjsModule(function (module) {

  var isWindows = process.platform === 'win32';

  // Regex to split a windows path into three parts: [*, device, slash,
  // tail] windows-only
  var splitDeviceRe =
      /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;

  // Regex to split the tail part of the above into [*, dir, basename, ext]
  var splitTailRe =
      /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;

  var win32 = {};

  // Function to split a filename into [root, dir, basename, ext]
  function win32SplitPath(filename) {
    // Separate device+slash from tail
    var result = splitDeviceRe.exec(filename),
        device = (result[1] || '') + (result[2] || ''),
        tail = result[3] || '';
    // Split the tail into dir, basename and extension
    var result2 = splitTailRe.exec(tail),
        dir = result2[1],
        basename = result2[2],
        ext = result2[3];
    return [device, dir, basename, ext];
  }

  win32.parse = function(pathString) {
    if (typeof pathString !== 'string') {
      throw new TypeError(
          "Parameter 'pathString' must be a string, not " + typeof pathString
      );
    }
    var allParts = win32SplitPath(pathString);
    if (!allParts || allParts.length !== 4) {
      throw new TypeError("Invalid path '" + pathString + "'");
    }
    return {
      root: allParts[0],
      dir: allParts[0] + allParts[1].slice(0, -1),
      base: allParts[2],
      ext: allParts[3],
      name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
    };
  };



  // Split a filename into [root, dir, basename, ext], unix version
  // 'root' is just a slash, or nothing.
  var splitPathRe =
      /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  var posix = {};


  function posixSplitPath(filename) {
    return splitPathRe.exec(filename).slice(1);
  }


  posix.parse = function(pathString) {
    if (typeof pathString !== 'string') {
      throw new TypeError(
          "Parameter 'pathString' must be a string, not " + typeof pathString
      );
    }
    var allParts = posixSplitPath(pathString);
    if (!allParts || allParts.length !== 4) {
      throw new TypeError("Invalid path '" + pathString + "'");
    }
    allParts[1] = allParts[1] || '';
    allParts[2] = allParts[2] || '';
    allParts[3] = allParts[3] || '';

    return {
      root: allParts[0],
      dir: allParts[0] + allParts[1].slice(0, -1),
      base: allParts[2],
      ext: allParts[3],
      name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
    };
  };


  if (isWindows)
    module.exports = win32.parse;
  else /* posix */
    module.exports = posix.parse;

  module.exports.posix = posix.parse;
  module.exports.win32 = win32.parse;
  });
  var pathParse_1 = pathParse.posix;
  var pathParse_2 = pathParse.win32;

  var times = function (step, callback) {
      for (var i = 1; i <= step; i++) {
          if (callback(i))
              break;
      }
  };
  var isCompItem = function (item) {
      return item instanceof CompItem;
  };
  var isFolderItem = function (item) {
      return item instanceof FolderItem;
  };
  var isFootageItem = function (item) {
      return item instanceof FootageItem;
  };
  var isObject = function (data) {
      return Object.prototype.toString.call(data) === "[object Object]";
  };

  var matchSuffixNum = function (str) {
      return str.match(/[0-9]*$/);
  };
  var getMaxSuffixNumItemName = function (matchName, parent, typeChecker) {
      var maxNum;
      var maxNumItemName = matchName;
      times(parent.numItems, function (i) {
          var item = parent.item(i);
          if (!typeChecker(item))
              return;
          var regexp = new RegExp("^" + matchName + "\\s*[0-9]*$");
          if (!regexp.test(item.name))
              return;
          var matchArr = matchSuffixNum(item.name);
          if (!matchArr)
              return;
          var suffixStr = matchArr[0];
          if (suffixStr === "") {
              maxNum = 0;
              maxNumItemName = matchName;
              return;
          }
          var suffixNum = parseInt(suffixStr, 10);
          if (maxNum === undefined) {
              maxNum = suffixNum;
              maxNumItemName = item.name;
              return;
          }
          if (suffixNum > maxNum) {
              maxNum = suffixNum;
              maxNumItemName = item.name;
          }
      });
      return maxNumItemName;
  };
  var createFoldersWithSuffixNum = function (name, parent, number) {
      var match = matchSuffixNum(name);
      if (!match)
          return;
      var newFolders = [];
      times(number, function (i) {
          var newFolderName;
          if (match[0] === "") {
              newFolderName = name + i;
          }
          else {
              var baseName = name.slice(0, match.index);
              var suffixNumStr = match[0];
              var suffixNum = parseInt(suffixNumStr, 10);
              newFolderName = baseName + (suffixNum + i);
          }
          newFolders.push(parent.items.addFolder(newFolderName));
      });
      return newFolders;
  };
  var createFolderStruct = function (root) {
      var struct = {};
      times(root.numItems, function (i) {
          var item = root.item(i);
          if (isFolderItem(item)) {
              struct[item.name] = createFolderStruct(item);
          }
          else if (isCompItem(item)) {
              struct[item.name] = item;
          }
          else if (isFootageItem(item)) {
              struct[item.name] = item;
          }
      });
      return struct;
  };
  var createFolderFromStruct = function (parent, struct, callbacks) {
      if (callbacks === void 0) { callbacks = {}; }
      Object.keys(struct).forEach(function (key) {
          var item = struct[key];
          if (item instanceof CompItem || item instanceof FootageItem) {
              callbacks.av && callbacks.av(parent, item);
          }
          else if (isObject(item)) {
              var newFolder = parent.items.addFolder(key);
              createFolderFromStruct(newFolder, item, callbacks);
              callbacks.folder && callbacks.folder(newFolder);
          }
      });
  };
  var findItem = function (name, parent) {
      var item;
      times(parent.numItems, function (i) {
          var current = parent.item(i);
          if (current.name === name) {
              item = current;
              return true;
          }
      });
      return item;
  };
  var getItemFromPathArr = function (pathArr, parent) {
      var isTarget = pathArr.length === 1;
      var item = findItem(pathArr[0], parent);
      if (!item) {
          return;
      }
      if (isTarget) {
          return item;
      }
      else {
          if (isFolderItem(item)) {
              return getItemFromPathArr(pathArr.slice(1), item);
          }
          else {
              return;
          }
      }
  };
  var existInsideFolder = function (item, root, callback) {
      var parent = item.parentFolder;
      if (parent === root) {
          return true;
      }
      else if (parent === app.project.rootFolder) {
          return false;
      }
      else {
          callback && callback(parent);
          return existInsideFolder(parent, root);
      }
  };
  var replaceLayerIfInside = function (comp, sourceFolder, targetFolder, callbacks) {
      if (callbacks === void 0) { callbacks = {}; }
      // new comp's layer iterate
      times(comp.numLayers, function (i) {
          var layer = comp.layer(i);
          if (layer instanceof AVLayer &&
              (layer.source instanceof CompItem || layer.source instanceof FootageItem)) {
              if (callbacks.pre && callbacks.pre(layer))
                  return true;
              var pathArr_1 = [];
              // 置き換え前のcompLayerのソースがsourceFolderの中に存在するかどうかをチェック
              var willReplace = existInsideFolder(layer.source, 
              // sourceFolder is sourse folder
              sourceFolder, function (parent) {
                  pathArr_1.push(parent.name);
              });
              if (willReplace) {
                  pathArr_1.reverse().push(layer.source.name);
                  // ["parentFolder", "innerFolder", "comp"]
                  var targetItem = getItemFromPathArr(pathArr_1, targetFolder);
                  if (!targetItem) {
                      return;
                  }
                  // 作成したコンポジションのレイヤーがフォルダー内のものであれば置き換え
                  layer.replaceSource(targetItem, false);
                  callbacks.after && callbacks.after(layer.source, targetItem);
              }
          }
      });
  };

  var duplicateFolder = (function (sourceFolder, options) {
      if (options === void 0) { options = {}; }
      if (!isFolderItem(sourceFolder))
          return undefined;
      var copieNum = options.copieNum || 1;
      var parentFolder = options.parent || sourceFolder.parentFolder;
      var newFolders;
      var name = sourceFolder.name;
      var baseName;
      if (options.name) {
          baseName = options.name;
      }
      else {
          var match = matchSuffixNum(name);
          if (!match)
              return;
          baseName = name.slice(0, match.index).trimEnd();
      }
      var maxNumItemName = getMaxSuffixNumItemName(baseName, parentFolder, isFolderItem);
      //  || sourceFolder;
      newFolders = createFoldersWithSuffixNum(maxNumItemName, parentFolder, copieNum);
      if (!newFolders)
          return;
      var struct = createFolderStruct(sourceFolder);
      app.beginUndoGroup("Duplicate Folder");
      // new folderList iterate
      newFolders.forEach(function (newFolder) {
          var compList = [];
          createFolderFromStruct(newFolder, struct, {
              av: function (parent, item) {
                  if (isCompItem(item)) {
                      var newItem = item.duplicate();
                      newItem.parentFolder = parent;
                      newItem.name = item.name;
                      compList.push(newItem);
                  }
                  else if (isFootageItem(item)) {
                      var file = item.file;
                      if (!file)
                          return;
                      var importOptions = new ImportOptions(file);
                      importOptions.sequence = !item.mainSource.isStill;
                      var newItem = app.project.importFile(importOptions);
                      newItem.parentFolder = parent;
                      newItem.name = item.name;
                  }
              }
          });
          // Memoization
          var memoSourceList = [];
          var memoTargetList = [];
          compList.forEach(function (comp) {
              replaceLayerIfInside(comp, sourceFolder, newFolder, {
                  pre: function (sourceLayer) {
                      memoSourceList.forEach(function (item, index) {
                          if (sourceLayer.source === item) {
                              sourceLayer.replaceSource(memoTargetList[index], false);
                              return true;
                          }
                      });
                  },
                  after: function (sourceItem, targetItem) {
                      var length = memoSourceList.length;
                      memoSourceList[length] = sourceItem;
                      memoTargetList[length] = targetItem;
                  }
              });
          });
          app.endUndoGroup();
      });
      return newFolders;
  });

  var func = function () {
      duplicateFolder(app.project.item(2), {
          name: "test",
          copieNum: 1,
          parent: app.project.item(10)
      });
  };
  func();
  // alert(getSelectedItemIndex().toString());

}());
//# sourceMappingURL=bundle.jsx.map
