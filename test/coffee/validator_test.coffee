describe 'OK.Validator', ->

  beforeEach ->
    @validator = new OK.Validator

  it 'should use a check method to call validation methods', ->
    valid = @validator.check('in', 1, [1, 2, 3])
    expect(valid).to.be.true

    valid = @validator.check('required', 'foo')
    expect(valid).to.be.true

    valid = @validator.check('hex', '#fff')
    expect(valid).to.be.true

  it 'should provide a class method for check', ->
    valid = OK.Validator.check('email', 'foo@bar.com')
    expect(valid).to.be.true

  it 'should validate an email', ->
    for email in ['foo@bar.com', 'foo@bar.co.uk']
      expect(@validator.email(email)).to.be.true 
      expect(@validator.email(email, false)).to.be.false 
    
    for email in ['@bar.com', 'foo@bar', 'foo', null, false, undefined] 
      expect(@validator.email(email)).to.be.false 
      expect(@validator.email(email, false)).to.be.true 

  it 'should validate a url', ->
    for url in ['http://google.com', 'google.com', 'google.co.uk', 'www.google.com', 'http://www.google.com']
      expect(@validator.url(url)).to.be.true
      expect(@validator.url(url, false)).to.be.false

    for value in ['google', 'htp://google.com', null, false, 'foo@bar.co.uk', 'google .com'] 
      expect(@validator.url(value)).to.be.false 
      expect(@validator.url(value, false)).to.be.true 

  it 'should validate alphanumeric', ->
    for value in ['abc123', 'abc', '123', 'ABC123']
      expect(@validator.alphanumeric(value)).to.be.true
      expect(@validator.alphanumeric(value, false)).to.be.false

    for value in [ "Anthony's bike", '-', '&!$@#*', 'a b c', false, null, undefined] 
      expect(@validator.alphanumeric(value)).to.be.false
      expect(@validator.alphanumeric(value, false)).to.be.true

  it 'should validate hex', ->
    for value in ['#111', '#111111', '#fff', '#FFF']
      expect(@validator.hex(value)).to.be.true
      expect(@validator.hex(value, false)).to.be.false

    for value in ['#GGG', 'abc', 'fff', '#0000000', false, null, undefined] 
      expect(@validator.hex(value)).to.be.false
      expect(@validator.hex(value, false)).to.be.true

  it 'should validate strings', ->
    for value in ['string']
      expect(@validator.string(value)).to.be.true
      expect(@validator.string(value, false)).to.be.false

    for value in [123, false, null, undefined] 
      expect(@validator.string(value)).to.be.false
      expect(@validator.string(value, false)).to.be.true

  it 'should validate numbers', ->
    for value in [123, 1.23, -1, -1.23, '1', '-1']
      expect(@validator.number(value)).to.be.true
      expect(@validator.number(value, false)).to.be.false

    for value in ['string', false, null, undefined] 
      expect(@validator.number(value)).to.be.false
      expect(@validator.number(value, false)).to.be.true

  it 'should validate arrays', ->
    for value in [[]] 
      expect(@validator.array(value)).to.be.true
      expect(@validator.array(value, false)).to.be.false

    for value in ['string', false, 123, null, undefined] 
      expect(@validator.array(value)).to.be.false
      expect(@validator.array(value, false)).to.be.true

  it 'should validate dates', ->
    for value in ['1 January 2012', '1/1/2012', new Date ] 
      expect(@validator.date(value)).to.be.true
      expect(@validator.date(value, false)).to.be.false

    for value in ['string', false, null, undefined] 
      expect(@validator.date(value)).to.be.false
      expect(@validator.date(value, false)).to.be.true

  it 'should validate booleans', ->
    for value in [ true, false ] 
      expect(@validator.boolean(value)).to.be.true
      expect(@validator.boolean(value, false)).to.be.false

    for value in ['string', 123, null, undefined] 
      expect(@validator.boolean(value)).to.be.false
      expect(@validator.boolean(value, false)).to.be.true

  it 'should validate max', ->
    for value in [-1, 0, 1, 2, '-1', '0', '1', '2'] 
      expect(@validator.max(value, 2)).to.be.true

    for value in [2.01, 3, null, undefined] 
      expect(@validator.max(value, 2)).to.be.false

  it 'should validate min', ->
    for value in [2, 3, '2', '3'] 
      expect(@validator.min(value, 2)).to.be.true

    for value in [-1, '-1', null, undefined] 
      expect(@validator.min(value, 2)).to.be.false

  it 'should validate length', ->
    for value in ['foo', [1, 2, 3]] 
      expect(@validator.length(value, 3)).to.be.true

    for value in ['foo', null, undefined] 
      expect(@validator.length(value, 2)).to.be.false

  it 'should validate min-length', ->
    for value in ['foo', 'bars', [1, 2, 3, 4, 5]] 
      expect(@validator.minlength(value, 3)).to.be.true

    for value in ['f', [], false, null, undefined] 
      expect(@validator.minlength(value, 2)).to.be.false

  it 'should validate max-length', ->
    for value in ['foo', 'bars', [1, 2, 3, 4, 5]] 
      expect(@validator.maxlength(value, 5)).to.be.true

    for value in ['foo', [1, 2]] 
      expect(@validator.maxlength(value, 1)).to.be.false

  it 'should validate equals', ->
    for value in ['foo', 'bars', [1]] 
      expect(@validator.equal(value, value)).to.be.true

    for value in ['foo', [1, 2]] 
      expect(@validator.equal(value, 'bar')).to.be.false

  it 'should validate range', ->
    options = from: 1, to: 3
    for value in [1, 2, 3] 
      expect(@validator.range(value, options)).to.be.true

    for value in [0, 4, 'foo', false, null, undefined] 
      expect(@validator.range(value, options)).to.be.false

  it 'should validate in', ->
    array = [1, 2, 3]
    for value in [1, 2, 3] 
      expect(@validator.in(value, array)).to.be.true

    for value in [0, 4, 'foo', false, null, undefined] 
      expect(@validator.in(value, array)).to.be.false  

  it 'should validate pattern', ->
    for value in ['foo'] 
      expect(@validator.pattern(value, /^foo$/)).to.be.true

    for value in [0, 'bar', false, null, undefined] 
      expect(@validator.pattern(value, /^foo$/)).to.be.false  

    for value in ['foo'] 
      expect(@validator.in(value, 'foo')).to.be.false  

  it 'should validate required', ->
    for value in ['foo', 1, true, false, [], 0] 
      expect(@validator.required(value)).to.be.true

    for value in [null, undefined] 
      expect(@validator.required(value)).to.be.false  