describe 'OK', ->

  beforeEach ->
    @ok = new OK
      num:
        required: true
        number: true
        max: 1000
        min: 1

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
