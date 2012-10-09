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
