class OK.Errors
  constructor: ->
    @errors = {}
    @length = 0

  # Add a single error for an attribute.
  add: (attr, rule) ->
    @errors[attr] or= []
    unless _.contains @errors[attr], rule 
      @length += 1 
      @errors[attr].push rule
    @errors

  isValid: (attr) ->
    not @errors[attr]?

  get: (attr) ->
    @errors[attr] or false

  invalid: (attr) ->
    return false unless @errors[attr]
    @errors[attr]

  each: (attr, callback) ->
    if _.isFunction(attr)
      _.each @errors, attr, @
    else
      _.each @errors[attr], callback, @

  toJSON: ->
    @errors