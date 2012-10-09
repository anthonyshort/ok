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
