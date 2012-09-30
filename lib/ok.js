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
