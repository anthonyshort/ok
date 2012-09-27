describe 'OK.Validator', ->

  it 'should validate an email', ->
    v = new OK.Validator('foo@bar.com')
    result = v.email()
    expect(result).to.be.true 

    v = new OK.Validator('foo@bar.co.uk')
    result = v.email()
    expect(result).to.be.true 

    v = new OK.Validator('@bar.com')
    result = v.email()
    expect(result).to.be.false 

    v = new OK.Validator('foo@bar')
    result = v.email()
    expect(result).to.be.false

  it 'should validate '
 