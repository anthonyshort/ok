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