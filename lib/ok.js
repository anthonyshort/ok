(function() {
  var OK,
    __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  OK = (function() {

    function OK(schema) {
      this.schema = schema;
    }

    OK.prototype.validate = function(attributes) {
      var attribute, errors, message, method, options, ruleValue, type, valid, validator, value, _i, _len, _ref;
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
            validator = new OK.Validator(value);
            method = validator[type];
            if (!method) {
              throw new Error("Invalid validation type " + type + " for " + attribute);
            }
            valid = method.call(this, ruleValue, attributes);
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

  OK.Validator = (function() {

    function Validator(val) {
      this.val = val;
    }

    Validator.prototype.patterns = {
      email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
      url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      alphanumeric: /\w/,
      hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/
    };

    Validator.prototype.email = function() {
      return this.patterns.email.test(this.val);
    };

    Validator.prototype.url = function() {
      return this.patterns.url.text(this.val);
    };

    Validator.prototype.alphaNumeric = function() {
      return this.patterns.alphanumeric.test(this.val);
    };

    Validator.prototype.hex = function() {
      return this.patterns.hex.test(this.val);
    };

    Validator.prototype.string = function() {
      return _.isString(this.val);
    };

    Validator.prototype.number = function() {
      return _.isNumber(this.val);
    };

    Validator.prototype.array = function() {
      return _.isArray(this.val);
    };

    Validator.prototype.date = function() {
      return _.isDate(this.val);
    };

    Validator.prototype.boolean = function() {
      return _.isBoolean(this.val);
    };

    Validator.prototype.max = function(num) {
      return this.val <= num;
    };

    Validator.prototype.min = function(num) {
      return this.val >= num;
    };

    Validator.prototype.length = function(length) {
      return this.val.length === length;
    };

    Validator.prototype.minLength = function(length) {
      return this.val.length >= length;
    };

    Validator.prototype.maxLength = function(length) {
      return this.val.length <= length;
    };

    Validator.prototype.equal = function(val) {
      return this.val === val;
    };

    Validator.prototype.range = function(options) {
      var _ref;
      return (options.from <= (_ref = this.val) && _ref <= options.to);
    };

    Validator.prototype.one = function(values) {
      var _ref;
      return _ref = this.val, __indexOf.call(values, _ref) >= 0;
    };

    Validator.prototype.pattern = function(pattern) {
      return this.val.test(pattern);
    };

    Validator.prototype.accepted = function() {
      return this.val === true;
    };

    Validator.prototype.required = function() {
      return this.val != null;
    };

    return Validator;

  })();

  OK.Errors = (function() {

    function Errors(attributes) {
      this.attributes = attributes;
      this.errors = {};
      this.length = 0;
    }

    Errors.prototype.add = function(attr, rule, message) {
      var _base;
      (_base = this.errors)[attr] || (_base[attr] = {});
      this.errors[attr][rule] = message || ("Invalid: '" + attr + "' for '" + rule + "'");
      this.length += 1;
      return this.errors;
    };

    Errors.prototype.isValid = function() {
      return this.length === 0;
    };

    Errors.prototype.get = function(attr) {
      return this.errors[attr] || false;
    };

    return Errors;

  })();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = _;
  } else {
    this.OK = OK;
  }

}).call(this);
