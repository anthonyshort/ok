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
      var attribute, errors, message, options, ruleValue, type, valid, validator, value, _ref, _ref1, _ref2, _ref3;
      errors = new OK.Errors(attributes);
      _ref = this.schema;
      for (attribute in _ref) {
        if (!__hasProp.call(_ref, attribute)) continue;
        options = _ref[attribute];
        value = attributes[attribute];
        if (value != null) {
          _ref1 = options.rules;
          for (type in _ref1) {
            ruleValue = _ref1[type];
            if (typeof ruleValue === 'function') {
              message = ruleValue.call(this, value, attributes);
              if (message !== true || message === null || message === void 0) {
                errors.add(attribute, type, message);
              }
            } else {
              validator = new OK.Validator;
              valid = validator.check(type, value, ruleValue, attributes);
              if (!valid) {
                errors.add(attribute, type, (_ref2 = options.messages) != null ? _ref2[type] : void 0);
              }
            }
          }
        } else {
          if (options.rules.required === true) {
            errors.add(attribute, 'required', (_ref3 = options.messages) != null ? _ref3.required : void 0);
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
