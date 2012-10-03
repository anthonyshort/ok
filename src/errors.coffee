class OK.Errors
  constructor: (@data) ->
    @errors = {}
    @length = 0

  # Add a single error for an attribute.
  add: (attr, rule, message) ->
    @errors[attr] or= {}
    @length += 1 unless @errors[attr][rule]
    @errors[attr][rule] = message or "Invalid: '#{attr}' for '#{rule}'"
    @errors

  isValid: (attr) ->
    not @errors[attr]?

  get: (attr) ->
    @errors[attr] or false

  invalid: (attr) ->
    return false unless @errors[attr]
    _.keys(@errors[attr])

  value: (attr) ->
    @data[attr]

  each: (attr, callback) ->
    if _.isFunction(attr)
      _.each @errors, attr, @
    else
      _.each @errors[attr], callback, @

  toJSON: ->
    @errors