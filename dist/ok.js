/*! ok.js - v0.1.0 - 2012-10-01
* https://github.com/anthonyshort/ok.js
* Copyright (c) 2012 Anthony Short; Licensed MIT */

(function() {
  var OK,
    __hasProp = {}.hasOwnProperty;

  OK = (function() {

    OK.validate = function(attributes, schema) {
      var validator;
      validator = new this(schema);
      return validator.validate(attributes);
    };

    function OK(schema) {
      this.schema = schema;
    }

    OK.prototype.validate = function(attributes) {
      var attribute, errors, message, options, ruleValue, type, valid, validator, value, _i, _len, _ref;
      errors = new OK.Errors(attributes);
      for (attribute in attributes) {
        if (!__hasProp.call(attributes, attribute)) continue;
        value = attributes[attribute];
        if (!this.schema[attribute]) {
          continue;
        }
        options = this.schema[attribute];
        _ref = options.rules;
        for (ruleValue = _i = 0, _len = _ref.length; _i < _len; ruleValue = ++_i) {
          type = _ref[ruleValue];
          if (typeof ruleValue === 'function') {
            message = ruleValue.call(this, value, attributes);
            if (message !== true || message === null || message === void 0) {
              errors.add(attribute, type, message);
            }
          } else {
            validator = new OK.Validator;
            valid = validator.check(type, value, ruleValue, attributes);
            if (!valid) {
              errors.add(attribute, type, options.messages[type]);
            }
          }
        }
      }
      return errors;
    };

    return OK;

  })();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = _;
  } else {
    this.OK = OK;
  }

}).call(this);

(function() {
  var __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  OK.Validator = (function() {

    function Validator() {}

    Validator.prototype.patterns = {
      email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
      url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      alphanumeric: /^\w+$/,
      hex: /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
    };

    Validator.check = function() {
      var validator;
      validator = new this;
      return validator.check.apply(validator, arguments);
    };

    Validator.prototype.check = function() {
      var args, method, type;
      type = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      method = this[type];
      if (!method) {
        throw new Error("Invalid validation type " + type);
      }
      return method.apply(this, args);
    };

    Validator.prototype.email = function(val) {
      return this.patterns.email.test(val);
    };

    Validator.prototype.url = function(val) {
      return this.patterns.url.test(val);
    };

    Validator.prototype.alphanumeric = function(val) {
      return val !== false && this.patterns.alphanumeric.test(val);
    };

    Validator.prototype.hex = function(val) {
      return !(val != null) || this.patterns.hex.test(val);
    };

    Validator.prototype.string = function(val) {
      return !(val != null) || _.isString(val);
    };

    Validator.prototype.number = function(val) {
      return !(val != null) || !isNaN(parseFloat(val));
    };

    Validator.prototype.array = function(val) {
      return !(val != null) || _.isArray(val);
    };

    Validator.prototype.date = function(val) {
      return !(val != null) || _.isDate(val) || !isNaN(Date.parse(val));
    };

    Validator.prototype.boolean = function(val) {
      return !(val != null) || _.isBoolean(val);
    };

    Validator.prototype.max = function(val, num) {
      return val <= num;
    };

    Validator.prototype.min = function(val, num) {
      return val >= num;
    };

    Validator.prototype.length = function(val, length) {
      if ((val != null) && val.length) {
        return val.length === length;
      } else {
        return false;
      }
    };

    Validator.prototype.minlength = function(val, length) {
      if ((val != null) && val.length) {
        return val.length >= length;
      } else {
        return false;
      }
    };

    Validator.prototype.maxlength = function(val, length) {
      if ((val != null) && val.length) {
        return val.length <= length;
      } else {
        return false;
      }
    };

    Validator.prototype.equal = function(val, other) {
      return _.isEqual(val, other);
    };

    Validator.prototype.range = function(val, options) {
      return (options.from <= val && val <= options.to);
    };

    Validator.prototype["in"] = function(val, values) {
      return __indexOf.call(values, val) >= 0;
    };

    Validator.prototype.pattern = function(val, pattern) {
      if (!_.isRegExp(pattern)) {
        return false;
      }
      if (val == null) {
        return true;
      }
      return pattern.test(val);
    };

    Validator.prototype.required = function(val) {
      return val != null;
    };

    return Validator;

  })();

}).call(this);

(function() {

  OK.Errors = (function() {

    function Errors(data) {
      this.data = data;
      this.errors = {};
      this.length = 0;
    }

    Errors.prototype.add = function(attr, rule, message) {
      var _base;
      (_base = this.errors)[attr] || (_base[attr] = {});
      this.errors[attr][rule] = message || ("Invalid: '" + attr + "' for '" + rule + "' with the value '" + this.data[attr] + "'");
      this.length += 1;
      return this.errors;
    };

    Errors.prototype.isValid = function() {
      return this.length === 0;
    };

    Errors.prototype.get = function(attr, rule) {
      if (rule && this.errors[attr]) {
        return this.errors[attr][rule];
      } else {
        return this.errors[attr] || false;
      }
    };

    Errors.prototype.each = function(callback, context) {
      if (context == null) {
        context = this;
      }
      return _.each(this.errors, callback, context);
    };

    Errors.prototype.toJSON = function() {
      return this.errors;
    };

    return Errors;

  })();

}).call(this);
