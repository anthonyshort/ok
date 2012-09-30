class OK.Errors
  constructor: (@data) ->
    @errors = {}
    @length = 0

  # Add a single error for an attribute.
  add: (attr, rule, message) ->
    @errors[attr] or= {}
    @errors[attr][rule] = message or "Invalid: '#{attr}' for '#{rule}' with the value '#{@data[attr]}'"
    @length += 1
    @errors

  isValid: ->
    @length is 0

  get: (attr, rule) ->
    if rule and @errors[attr]
      @errors[attr][rule]
    else
      @errors[attr] or false

  each: (callback, context = @) ->
    _.each @errors, callback, context

  toJSON: ->
    @errors