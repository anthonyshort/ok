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
