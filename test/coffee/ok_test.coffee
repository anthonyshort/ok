describe 'OK', ->

  beforeEach ->
    @ok = new OK
      num:
        rules:
          required: true
          number: true
          max: 1000
          min: 1
        messages:
          required: 'User ID is required'
          moment: 'Due date must be a moment instance'
          number: 'User ID must be a number'
          max: 'User ID cannot be more than 10 numbers long'
          min: 'User ID must be at least 3 numbers long'

  it 'should return an error object', ->
    errors = @ok.validate foo: 'bar'
    expect(errors).to.be.an.instanceof(OK.Errors)

  it 'should only validate required and no other rules when the attribute isnt given', ->
    errors = @ok.validate foo: 'bar'
    expect(errors.length).to.equal 1
    expect(errors.isValid('num')).to.be.false

  it 'should validate all the rules if a value is present', ->
    errors = @ok.validate num: 'bar'
    expect(errors.length).to.equal 3
