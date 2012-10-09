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
    val? and @patterns.email.test(val)

  url: (val) ->
    val? and @patterns.url.test(val)

  alphanumeric: (val) ->
    val? and _.isString(val) and @patterns.alphanumeric.test(val)

  hex: (val) ->
    val? and @patterns.hex.test(val)

  string: (val) ->
    val? and _.isString(val)

  number: (val) ->
    val? and not isNaN(parseFloat(val))

  array: (val) ->
    val? and _.isArray(val)

  date: (val) ->
    val? and ( _.isDate(val) or not isNaN(Date.parse(val)) )

  boolean: (val) ->
    val? and _.isBoolean(val)

  max: (val, num) ->
    val? and val <= num

  min: (val, num) ->
    val? and val >= num

  length: (val, length) ->
    val? and val.length? and val.length is length

  minlength: (val, length) ->
    val? and val.length? and val.length >= length

  maxlength: (val, length) ->
    val? and val.length and val.length <= length

  equal: (val, other) ->
    _.isEqual(val, other)

  range: (val, options) ->
    val? and options.from <= val <= options.to

  in: (val, values) ->
    val in values

  pattern: (val, pattern) ->
    _.isRegExp(pattern) and val? and pattern.test(val)

  required: (val) ->
    val?