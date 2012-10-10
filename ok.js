/*! ok.js - v0.1.2 - 2012-10-10
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
      var attribute, errors, ruleValue, rules, type, valid, validator, value, _ref;
      errors = new OK.Errors;
      _ref = this.schema;
      for (attribute in _ref) {
        if (!__hasProp.call(_ref, attribute)) continue;
        rules = _ref[attribute];
        value = attributes[attribute];
        if (value != null) {
          for (type in rules) {
            ruleValue = rules[type];
            if (typeof ruleValue === 'function') {
              valid = ruleValue.call(this, value, attributes);
              if (!valid) {
                errors.add(attribute, type);
              }
            } else {
              validator = new OK.Validator;
              valid = validator.check(type, value, ruleValue, attributes);
              if (!valid) {
                errors.add(attribute, type);
              }
            }
          }
        } else {
          if (rules.required === true) {
            errors.add(attribute, 'required');
          }
        }
      }
      if (typeof Object.freeze === "function") {
        Object.freeze(errors);
      }
      return errors;
    };

    return OK;

  })();

  if (typeof exports !== "undefined" && exports !== null) {
    exports.OK = OK;
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

    Validator.prototype.email = function(val, bool) {
      if (bool == null) {
        bool = true;
      }
      return (_.isString(val) && this.patterns.email.test(val)) === bool;
    };

    Validator.prototype.url = function(val, bool) {
      if (bool == null) {
        bool = true;
      }
      return ((val != null) && this.patterns.url.test(val)) === bool;
    };

    Validator.prototype.alphanumeric = function(val, bool) {
      if (bool == null) {
        bool = true;
      }
      return ((val != null) && _.isString(val) && this.patterns.alphanumeric.test(val)) === bool;
    };

    Validator.prototype.hex = function(val, bool) {
      if (bool == null) {
        bool = true;
      }
      return ((val != null) && this.patterns.hex.test(val)) === bool;
    };

    Validator.prototype.string = function(val, bool) {
      if (bool == null) {
        bool = true;
      }
      return ((val != null) && _.isString(val)) === bool;
    };

    Validator.prototype.number = function(val, bool) {
      if (bool == null) {
        bool = true;
      }
      return ((val != null) && !isNaN(parseFloat(val))) === bool;
    };

    Validator.prototype.array = function(val, bool) {
      if (bool == null) {
        bool = true;
      }
      return ((val != null) && _.isArray(val)) === bool;
    };

    Validator.prototype.date = function(val, bool) {
      if (bool == null) {
        bool = true;
      }
      return ((val != null) && (_.isDate(val) || !isNaN(Date.parse(val)))) === bool;
    };

    Validator.prototype.boolean = function(val, bool) {
      if (bool == null) {
        bool = true;
      }
      return ((val != null) && _.isBoolean(val)) === bool;
    };

    Validator.prototype.max = function(val, num) {
      return (val != null) && val <= num;
    };

    Validator.prototype.min = function(val, num) {
      return (val != null) && val >= num;
    };

    Validator.prototype.length = function(val, length) {
      return (val != null) && (val.length != null) && val.length === length;
    };

    Validator.prototype.minlength = function(val, length) {
      return (val != null) && (val.length != null) && val.length >= length;
    };

    Validator.prototype.maxlength = function(val, length) {
      return (val != null) && val.length && val.length <= length;
    };

    Validator.prototype.equal = function(val, other) {
      return _.isEqual(val, other);
    };

    Validator.prototype.range = function(val, options) {
      return (val != null) && (options.from <= val && val <= options.to);
    };

    Validator.prototype["in"] = function(val, values) {
      return __indexOf.call(values, val) >= 0;
    };

    Validator.prototype.pattern = function(val, pattern) {
      return _.isRegExp(pattern) && (val != null) && pattern.test(val);
    };

    Validator.prototype.required = function(val, bool) {
      if (bool == null) {
        bool = true;
      }
      return (val != null) === bool;
    };

    return Validator;

  })();

}).call(this);

(function() {

  OK.Errors = (function() {

    function Errors() {
      this.errors = {};
      this.length = 0;
    }

    Errors.prototype.add = function(attr, rule) {
      var _base;
      (_base = this.errors)[attr] || (_base[attr] = []);
      if (!_.contains(this.errors[attr], rule)) {
        this.length += 1;
        this.errors[attr].push(rule);
      }
      return this.errors;
    };

    Errors.prototype.isValid = function(attr) {
      return !(this.errors[attr] != null);
    };

    Errors.prototype.get = function(attr) {
      return this.errors[attr] || false;
    };

    Errors.prototype.invalid = function(attr) {
      if (!this.errors[attr]) {
        return false;
      }
      return this.errors[attr];
    };

    Errors.prototype.each = function(attr, callback) {
      if (_.isFunction(attr)) {
        return _.each(this.errors, attr, this);
      } else {
        return _.each(this.errors[attr], callback, this);
      }
    };

    Errors.prototype.toJSON = function() {
      return this.errors;
    };

    return Errors;

  })();

}).call(this);
