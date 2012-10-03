describe 'OK.Errors', ->

  beforeEach ->
    @errors = new OK.Errors
      foo: 'bar'

  it 'should add new errors', ->
    @errors.add 'foo', 'equalTo'
    expect(@errors.length).to.equal 1

  it 'should replace the error is an error for the same rule is applied more than once', ->
    @errors.add 'foo', 'equalTo', 'bar'
    @errors.add 'foo', 'equalTo', 'baz'
    expect(@errors.length).to.equal 1
    expect(@errors.get('foo').equalTo).to.equal 'baz'

  it 'should return the errors for an attribute', ->
    @errors.add 'foo', 'equalTo'
    errors = @errors.get('foo')
    expected = 'equalTo': "Invalid: 'foo' for 'equalTo'"
    expect(errors).to.deep.equal expected

  it 'should accept a custom error message', ->
    @errors.add 'foo', 'required', 'bar' 
    errors = @errors.get('foo')
    expected = 'required': 'bar'
    expect(errors).to.deep.equal expected

  it 'should return an array of invalid rules for an attribute', ->
    @errors.add 'foo', 'required', 'bar' 
    errors = @errors.invalid('foo')
    expected = ['required']
    expect(errors).to.deep.equal expected

  it 'should return false when trying to get the keys of an attribute that isnt an error', ->
    expect(@errors.invalid('foo')).to.be.false

  it 'should return a boolean for an attribute when checking its valid status', ->
    expect(@errors.isValid('foo')).to.be.true
    @errors.add 'foo', 'required', 'bar' 
    expect(@errors.isValid('foo')).to.be.false

  it 'should return the value for an attribute', ->
    expect(@errors.value('foo')).to.equal 'bar'

  it 'should loop over all errors for an attribute', ->
    @errors.add 'foo', 'required'
    @errors.add 'foo', 'equalTo'
    rules = []
    @errors.each 'foo', (message, rule) -> rules.push rule
    expect(rules).to.deep.equal ['required', 'equalTo']

  it 'should loop over all errors', ->
    @errors.add 'foo', 'required'
    @errors.add 'bar', 'equalTo'
    attrs = []
    @errors.each (errors, attr) -> attrs.push attr
    expect(attrs).to.deep.equal ['foo', 'bar']

  it 'should return a json object of the errors', ->
    @errors.add 'foo', 'required'
    @errors.add 'bar', 'equalTo'
    expected = 
      foo:
        required: "Invalid: 'foo' for 'required'"
      bar:
        equalTo: "Invalid: 'bar' for 'equalTo'"

    expect(@errors.toJSON()).to.deep.equal expected