class OK

  # Validate class method to skip creating
  # a validator instance directly. Returns
  # the errors object
  @validate: (schema, attributes) ->
    validator = new @(schema)
    validator.validate(attributes)

  constructor: (@schema) ->

  validate: (attributes) ->
    errors = new OK.Errors(attributes)

    for own attribute, value of attributes when @schema[attribute]
      options = @schema[attribute]

      for type, ruleValue in options.rules

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
          validator = new OK.Validator(value)
          method = validator[type]

          # A validation type has been specified that isn't part
          # of the built-in validator
          throw new Error "Invalid validation type #{type} for #{attribute}" unless method

          # Call the method on the validator that will always return a boolean
          valid = method.call @, ruleValue, attributes
          unless valid then errors.add attribute, type, options.messages[type]

    # Return the errors object
    errors

class OK.Validator
  constructor: (@val) ->

  patterns:
    email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    alphanumeric: /\w/
    hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/

  email: ->
    @patterns.email.test @val

  url: ->
    @patterns.url.text @val

  alphaNumeric: ->
    @patterns.alphanumeric.test @val

  hex: ->
    @patterns.hex.test @val

  string: ->
    _.isString @val

  number: ->
    _.isNumber @val

  array: ->
    _.isArray @val

  date: ->
    _.isDate @val

  boolean: ->
    _.isBoolean @val

  max: (num) ->
    @val <= num

  min: (num) ->
    @val >= num

  length: (length) ->
    @val.length is length

  minLength: (length) ->
    @val.length >= length

  maxLength: (length) ->
    @val.length <= length

  equal: (val) ->
    @val is val

  range: (options) ->
    options.from <= @val <= options.to

  one: (values) ->
    @val in values

  pattern: (pattern) ->
    @val.test(pattern)

  accepted: ->
    @val is true

  required: ->
    @val?

class OK.Errors
  constructor: (@data) ->
    @errors = {}
    @length = 0

  # Add a single error for an attribute.
  add: (attr, rule, message) ->
    @errors[attr] or= {}
    @errors[attr][rule] = message or "Invalid: '#{attr}' for '#{rule}'"
    @length += 1
    @errors

  isValid: ->
    @length is 0

  get: (attr) ->
    @errors[attr] or false

  toJSON: ->
    @errors

if typeof module isnt 'undefined' and module.exports
  module.exports = _
else
  @OK = OK