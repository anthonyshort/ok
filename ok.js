;(function(){
/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(p, parent, orig){
  var path = require.resolve(p)
    , mod = require.modules[path];

  // lookup failed
  if (null == path) {
    orig = orig || p;
    parent = parent || 'root';
    throw new Error('failed to require "' + orig + '" from "' + parent + '"');
  }

  // perform real require()
  // by invoking the module's
  // registered function
  if (!mod.exports) {
    mod.exports = {};
    mod.client = mod.component = true;
    mod.call(this, mod, mod.exports, require.relative(path));
  }

  return mod.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path){
  var orig = path
    , reg = path + '.js'
    , regJSON = path + '.json'
    , index = path + '/index.js'
    , indexJSON = path + '/index.json';

  return require.modules[reg] && reg
    || require.modules[regJSON] && regJSON
    || require.modules[index] && index
    || require.modules[indexJSON] && indexJSON
    || require.modules[orig] && orig
    || require.aliases[index];
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `fn`.
 *
 * @param {String} path
 * @param {Function} fn
 * @api private
 */

require.register = function(path, fn){
  require.modules[path] = fn;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to){
  var fn = require.modules[from];
  if (!fn) throw new Error('failed to alias "' + from + '", it does not exist');
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj){
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function fn(path){
    var orig = path;
    path = fn.resolve(path);
    return require(path, parent, orig);
  }

  /**
   * Resolve relative to the parent.
   */

  fn.resolve = function(path){
    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    if ('.' != path.charAt(0)) {
      var segs = parent.split('/');
      var i = lastIndexOf(segs, 'deps') + 1;
      if (!i) i = 0;
      path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
      return path;
    }
    return require.normalize(p, path);
  };

  /**
   * Check if module is defined at `path`.
   */

  fn.exists = function(path){
    return !! require.modules[fn.resolve(path)];
  };

  return fn;
};require.register("component-type/index.js", function(module, exports, require){

/**
 * toString ref.
 */

var toString = Object.prototype.toString;

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

module.exports = function(val){
  switch (toString.call(val)) {
    case '[object Function]': return 'function';
    case '[object Date]': return 'date';
    case '[object RegExp]': return 'regexp';
    case '[object Arguments]': return 'arguments';
    case '[object Array]': return 'array';
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val === Object(val)) return 'object';

  return typeof val;
};

});
require.register("component-each/index.js", function(module, exports, require){

/**
 * Module dependencies.
 */

var type = require('type');

/**
 * HOP reference.
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Iterate the given `obj` and invoke `fn(val, i)`.
 *
 * @param {String|Array|Object} obj
 * @param {Function} fn
 * @api public
 */

module.exports = function(obj, fn){
  switch (type(obj)) {
    case 'array':
      return array(obj, fn);
    case 'object':
      if ('number' == typeof obj.length) return array(obj, fn);
      return object(obj, fn);
    case 'string':
      return string(obj, fn);
  }
};

/**
 * Iterate string chars.
 *
 * @param {String} obj
 * @param {Function} fn
 * @api private
 */

function string(obj, fn) {
  for (var i = 0; i < obj.length; ++i) {
    fn(obj.charAt(i), i);
  }
}

/**
 * Iterate object keys.
 *
 * @param {Object} obj
 * @param {Function} fn
 * @api private
 */

function object(obj, fn) {
  for (var key in obj) {
    if (has.call(obj, key)) {
      fn(key, obj[key]);
    }
  }
}

/**
 * Iterate array-ish.
 *
 * @param {Array|Object} obj
 * @param {Function} fn
 * @api private
 */

function array(obj, fn) {
  for (var i = 0; i < obj.length; ++i) {
    fn(obj[i], i);
  }
}
});
require.register("component-indexof/index.js", function(module, exports, require){

var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
});
require.register("anthonyshort-validates/index.js", function(module, exports, require){
var each = require('each');
var indexof = require('indexof');
var toString = Object.prototype.toString;
var is = {};

// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
// Borrowed from Underscore.js
each(['Function', 'String', 'Number', 'Date', 'Array'], function(name) {
  is[name.toLowerCase()] = function(obj) {
    return toString.call(obj) == '[object ' + name + ']';
  };
});

var patterns = {
  email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  alphanumeric: /^\w+$/,
  hex: /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
};

/**
 * Check if a string is an email address
 * @param  {String}   val 
 * @return {Boolean}
 */
exports.email = function(val) {
  return val != null && is.string(val) && patterns.email.test(val);
};

/**
 * Check if a string is a valid URL
 * @param  {String} val  
 * @return {Boolean}
 */
exports.url = function(val) {
  return val != null && patterns.url.test(val);
};

/**
 * Check if a string is alphanumeric
 * @param  {String} val 
 * @return {Boolean}
 */
exports.alphanumeric = function(val) {
  return val != null && is.string(val) && patterns.alphanumeric.test(val);
};

/**
 * Check if a string is hexidecimal
 * @param  {String} val  
 * @return {Boolean}
 */
exports.hex = function(val) {
  return val != null && patterns.hex.test(val);
};

/**
 * Check if the value is a string
 * @param  val 
 * @return {Boolean}
 */
exports.string = function(val) {
  return val != null && is.string(val);
};

/**
 * Check if a value is number. Converts value to a number
 * and checks to see if it is a valid number
 * @param  {String} val
 * @return {Boolean}
 */
exports.number = function(val) {
  return val != null && ( is.number(val) || !isNaN(parseFloat(val)) );
};

/**
 * Check if a value is an array
 * @param  {Any} val
 * @return {Boolean}
 */
exports.array = function(val) {
  return val != null && is.array(val);
};

/**
 * Check if passed in value is, or can be converted
 * to, a valid date
 * @param  {Any} val
 * @return {Boolean}
 */
exports.date = function(val) {
  return val != null && ( is.date(val) || !isNaN(Date.parse(val)) );
};

/**
 * Check if the value is a valid boolean
 * @param  {Any} val
 * @return {Boolean}
 */
exports.boolean = function(val) {
  return val === true || val === false;
};

/**
 * Check if a number is below a value
 * @param  {String|Number} val
 * @param  {Number} num Maximum value
 * @return {Boolean}
 */
exports.max = function(val, num) {
  return val != null && val <= num;
};

/**
 * Check if a number is a at least num
 * @param  {String|Number} val
 * @param  {Number} num
 * @return {Boolean}
 */
exports.min = function(val, num) {
  return (val != null) && val >= num;
};

/**
 * Check the length of the value
 * @param  {String|Array} val
 * @param  {Number} length
 * @return {Boolean}
 */
exports.length = function(val, length) {
  return val != null && val.length && val.length === length;
};

/**
 * Check the minimum length of a number or string
 * @param  {String|Array} val
 * @param  {Number} length
 * @return {Boolean}
 */
exports.minlength = function(val, length) {
  return val != null && val.length != null && val.length >= length;
};

/**
 * Check the minimum length
 * @param  {String|Array} val
 * @param  {Number} length
 * @return {Boolean}
 */
exports.maxlength = function(val, length) {
  return val != null && val.length != null && val.length <= length;
};

/**
 * Check if a value is within a range
 * @param  {String|Number} val
 * @param  {Object} options Requires a from and to
 * @return {Boolean}
 */
exports.range = function(val, options) {
  return val != null && (options.from <= val && val <= options.to);
};

/**
 * Check if a value exists within an array
 * @param  {Any} val
 * @param  {Array} values
 * @return {Boolean}
 */
exports.in = function(val, values) {
  return indexof(values, val) > -1;
};
});
require.register("ok/index.js", function(module, exports, require){
var Errors      = require('./lib/errors');
var validator   = require('validates');
var each        = require('each');

module.exports = function(attributes, schema) {
  errors = new Errors;

  each(schema, function(attribute){
    var value = attributes[attribute];

    // If the rule is required, this is a special case
    if(schema[attribute].required === true && value == null) {
      return errors.add(attribute, 'required');
    }

    each(schema[attribute], function(type){
      var ruleValue = schema[attribute][type];
      var validatorMethod = validator[type];
      var valid = false;

      // Use a custom validator method
      if (typeof ruleValue === 'function') {
        if (ruleValue.call(this, value, attributes) === false) {
          return errors.add(attribute, type);
        }
      }

      // The rule type isn't in the validation object
      // and a custom validation rule wasn't used
      if( !validatorMethod ) { 
        return;
      }

      // If the rule value is a boolean we'll check
      // that the validation test returns the same boolean
      // For example, a number rule may be set to false
      else if(ruleValue === true || ruleValue === false) {
        valid = validatorMethod(value) === ruleValue;
      }

      // Otherwise the rule value is being used as options
      // for the validation method
      else {
        valid = validatorMethod(value, ruleValue);
      }

      if (valid === false) {
        errors.add(attribute, type);
      }
    });

  });

  return errors;
};
});
require.register("ok/lib/errors.js", function(module, exports, require){
var each = require('each');

/**
 * Errors object for storing errors from validation.
 * This provides a nicer interface for working with 
 * the errors after validating an object
 */
function Errors() {
  this.errors = {};
  this.length = 0;
}

/**
 * Add a new error
 * @param {String} attr The attribute on which the error occured
 * @param {String} rule The rule that failed
 */
Errors.prototype.add = function(attr, rule) {
  this.errors[attr] = this.errors[attr] || [];

  // Check if this rule has already been added
  // as an error. If it has been added then we 
  // won't create a new error
  var found = false;
  each(this.errors[attr], function(existingRule){
    if(existingRule === rule) found = true;
  });

  if (found === false) {
    this.length += 1;
    this.errors[attr].push(rule);
  }

  return this.errors;
};

/**
 * Is an attribute valie
 * @param  {String}  attr The attribute you want to check
 * @return {Boolean}
 */
Errors.prototype.isValid = function(attr) {
  return !(this.errors[attr] != null);
};

/**
 * Get the errors for an attribute
 * @param  {String} attr
 * @return {Boolean}
 */
Errors.prototype.get = function(attr) {
  return this.errors[attr] || false;
};

/**
 * Is an attribute invalid?
 * @param  {String} attr 
 * @return {Boolean}
 */
Errors.prototype.invalid = function(attr) {
  if (!this.errors[attr]) {
    return false;
  }
  return this.errors[attr];
};

/**
 * Loop through each of the errors for an attribute
 * @param  {String}   attr     Attribute name
 * @param  {Function} callback Callback function
 * @return {void}
 */
Errors.prototype.each = function(attr, callback) {
  each(this.errors[attr], callback, this);
};

/**
 * Loop over the invalid attributes
 * @param  {Function} callback
 * @return {void}
 */
Errors.prototype.keys = function(callback) {
  each(this.errors, callback);
}

/**
 * Get a JSON format for the errors
 * @return {Object} JSON version of the errors
 */
Errors.prototype.toJSON = function() {
  return this.errors;
};

module.exports = Errors;
});
require.alias("component-each/index.js", "ok/deps/each/index.js");
require.alias("component-type/index.js", "component-each/deps/type/index.js");

require.alias("anthonyshort-validates/index.js", "ok/deps/validates/index.js");
require.alias("component-each/index.js", "anthonyshort-validates/deps/each/index.js");
require.alias("component-type/index.js", "component-each/deps/type/index.js");

require.alias("component-indexof/index.js", "anthonyshort-validates/deps/indexof/index.js");
  if ("undefined" == typeof module) {
    window.ok = require("ok");
  } else {
    module.exports = require("ok");
  }
})();