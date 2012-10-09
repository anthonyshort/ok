describe 'Using OK with Backbone', ->

  beforeEach ->
    model = Backbone.Model.extend
      validates:
        name:
          required: true
          string: true
        duration:
          number: true
        project_id:
          number: true
        completed_at: 
          date: true
        priority:
          number: true
          range: 
            from: 0
            to: 3
      validate: (attrs, options) ->
        errors = OK.validate attrs, @validates
        return errors if errors.length > 0

    @model = new model

  it 'should return the error object on error', ->
    @model.on 'error', (model, errors, options) ->
      expect(errors.length > 0).to.be.true
    @model.set 
      name: 'Anthony Short'