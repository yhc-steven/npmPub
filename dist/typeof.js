!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.typeOf=t():e.typeOf=t()}(this,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=t.types={},o=t.strings={},a=!0,u=!1,i=void 0;try{for(var f,l=["Null","Undefined","NaN","Arguments","Number","String","Array","Object","Date","Boolean","Symbol","Map","WeakMap","Set","WeakSet","Function","RegExp","Promise","Error","ArrayBuffer","DataView","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"][Symbol.iterator]();!(a=(f=l.next()).done);a=!0){var c=f.value;o["[object "+c+"]"]=c,n[c]=c}}catch(e){u=!0,i=e}finally{try{!a&&l.return&&l.return()}finally{if(u)throw i}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.default=function(e){if(void 0===e)return n.types.Undefined;if(null===e)return n.types.Null;var t=Object.prototype.toString.call(e),r=n.strings[t];return"Number"===r&&isNaN(e)?"NaN":r}}]).default});
//# sourceMappingURL=typeof.js.map