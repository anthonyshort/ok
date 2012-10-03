class OK

  # Validate class method to skip creating
  # a validator instance directly. Returns
  # the errors object
  @validate: (attributes, schema) ->
    validator = new @(schema)
    validator.validate(attributes)

  constructor: (@schema) ->

  validate: (attributes) ->
    errors = new OK.Errors(attributes)

    for own attribute, options of @schema
      value = attributes[attribute]

      if value?
        for type, ruleValue of options.rules
          # The rule value can be a function that accepts the value and the attributes
          # as parameters to allow for custom validation methods onthe fly
          if typeof ruleValue is 'function'
            message = ruleValue.call @, value, attributes
            # Inline validators need to return true or the message for the error.
            # If the return value is null or undefined we will assume that it is valid
            if message isnt true or message is null or message is undefined
              errors.add attribute, type, message
          # Otherwise we'll use the built-in validator class to
          # determine whether an attribute is valid
          else
            # Create a validation object for the value
            # Adding extra methods to this prototype will
            # enable new validation types
            validator = new OK.Validator
            valid = validator.check(type, value, ruleValue, attributes)
            unless valid then errors.add attribute, type, options.messages?[type]
      else
        if options.rules.required is true then errors.add attribute, 'required', options.messages?.required

    # Return the errors object
    errors

if typeof module isnt 'undefined' and module.exports
  module.exports = _
else
  @OK = OK