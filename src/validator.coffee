class OK.Validator

  patterns:
    email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    alphanumeric: /^\w+$/
    hex: /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/

  @check: ->
    validator = new @
    validator.check.apply validator, arguments

  check: (type, args...) ->
    method = @[type]

    # A validation type has been specified that isn't part
    # of the built-in validator
    throw new Error "Invalid validation type #{type}" unless method

    # Call the method on the validator that will always return a boolean
    method.apply @, args

  email: (val) ->
    @patterns.email.test(val)

  url: (val) ->
    @patterns.url.test(val)

  alphanumeric: (val) ->
    val isnt false and @patterns.alphanumeric.test(val)

  hex: (val) ->
    not val? or @patterns.hex.test(val)

  string: (val) ->
    not val? or _.isString(val)

  number: (val) ->
    not val? or not isNaN(parseFloat(val))

  array: (val) ->
    not val? or _.isArray(val)

  date: (val) ->
    not val? or _.isDate(val) or not isNaN(Date.parse(val)) 

  boolean: (val) ->
    not val? or _.isBoolean(val)

  max: (val, num) ->
    not val? or val <= num

  min: (val, num) ->
    not val? or val >= num

  length: (val, length) ->
    if val? and val.length then val.length is length else false

  minlength: (val, length) ->
    if val? and val.length then val.length >= length else false

  maxlength: (val, length) ->
    if val? and val.length then val.length <= length else false

  equal: (val, other) ->
    _.isEqual(val, other)

  range: (val, options) ->
    options.from <= val <= options.to

  in: (val, values) ->
    val in values

  pattern: (val, pattern) ->
    return false unless _.isRegExp(pattern)
    return true unless val? # Allow optional
    pattern.test(val)

  required: (val) ->
    val?