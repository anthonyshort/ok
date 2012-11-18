describe 'OK', ->

  beforeEach ->
    @schema =
      num:
        required: true
        number: true
        max: 1000
        min: 1

  it 'should only validate required and no other rules when the attribute isnt given', ->
    attributes = foo: 'bar'
    errors = ok(attributes, @schema)
    expect(errors.length).to.equal 1
    expect(errors.isValid('num')).to.be.false

  it 'should validate all the rules if a value is present', ->
    attributes = num: 'bar'
    errors = ok(attributes, @schema)
    expect(errors.length).to.equal 3

  describe 'Errors', ->

    beforeEach ->
      @errors = ok({}, {})

    it 'should add new errors', ->
      @errors.add 'foo', 'equalTo'
      expect(@errors.length).to.equal 1

    it 'should replace the error if an error for the same rule is applied more than once', ->
      @errors.add 'foo', 'equalTo'
      @errors.add 'foo', 'equalTo'
      expect(@errors.length).to.equal 1
      expect(@errors.get('foo').length).to.equal 1

    it 'should return the errors for an attribute', ->
      @errors.add 'foo', 'equalTo'
      errors = @errors.get('foo')
      expected = [ 'equalTo' ]
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

    it 'should loop over all errors for an attribute', ->
      @errors.add 'foo', 'required'
      @errors.add 'foo', 'equalTo'
      rules = []
      @errors.each 'foo', (rule) -> rules.push rule
      expect(rules).to.deep.equal ['required', 'equalTo']

    it 'should loop over all errors', ->
      @errors.add 'foo', 'required'
      @errors.add 'bar', 'equalTo'
      attrs = []
      @errors.keys (attr, errors) -> attrs.push attr
      expect(attrs).to.deep.equal ['foo', 'bar']

    it 'should return a json object of the errors', ->
      @errors.add 'foo', 'required'
      @errors.add 'foo', 'equalTo'
      @errors.add 'bar', 'equalTo'
      expected = 
        foo: [ 'required', 'equalTo' ]
        bar: [ 'equalTo' ]
      expect(@errors.toJSON()).to.deep.equal expected