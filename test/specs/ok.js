
describe('OK', function() {
  beforeEach(function() {
    return this.schema = {
      num: {
        required: true,
        number: true,
        max: 1000,
        min: 1
      }
    };
  });
  it('should only validate required and no other rules when the attribute isnt given', function() {
    var attributes, errors;
    attributes = {
      foo: 'bar'
    };
    errors = ok(attributes, this.schema);
    expect(errors.length).to.equal(1);
    return expect(errors.isValid('num')).to.be["false"];
  });
  it('should validate all the rules if a value is present', function() {
    var attributes, errors;
    attributes = {
      num: 'bar'
    };
    errors = ok(attributes, this.schema);
    return expect(errors.length).to.equal(3);
  });
  return describe('Errors', function() {
    beforeEach(function() {
      return this.errors = ok({}, {});
    });
    it('should add new errors', function() {
      this.errors.add('foo', 'equalTo');
      return expect(this.errors.length).to.equal(1);
    });
    it('should replace the error if an error for the same rule is applied more than once', function() {
      this.errors.add('foo', 'equalTo');
      this.errors.add('foo', 'equalTo');
      expect(this.errors.length).to.equal(1);
      return expect(this.errors.get('foo').length).to.equal(1);
    });
    it('should return the errors for an attribute', function() {
      var errors, expected;
      this.errors.add('foo', 'equalTo');
      errors = this.errors.get('foo');
      expected = ['equalTo'];
      return expect(errors).to.deep.equal(expected);
    });
    it('should return an array of invalid rules for an attribute', function() {
      var errors, expected;
      this.errors.add('foo', 'required', 'bar');
      errors = this.errors.invalid('foo');
      expected = ['required'];
      return expect(errors).to.deep.equal(expected);
    });
    it('should return false when trying to get the keys of an attribute that isnt an error', function() {
      return expect(this.errors.invalid('foo')).to.be["false"];
    });
    it('should return a boolean for an attribute when checking its valid status', function() {
      expect(this.errors.isValid('foo')).to.be["true"];
      this.errors.add('foo', 'required', 'bar');
      return expect(this.errors.isValid('foo')).to.be["false"];
    });
    it('should loop over all errors for an attribute', function() {
      var rules;
      this.errors.add('foo', 'required');
      this.errors.add('foo', 'equalTo');
      rules = [];
      this.errors.each('foo', function(rule) {
        return rules.push(rule);
      });
      return expect(rules).to.deep.equal(['required', 'equalTo']);
    });
    it('should loop over all errors', function() {
      var attrs;
      this.errors.add('foo', 'required');
      this.errors.add('bar', 'equalTo');
      attrs = [];
      this.errors.keys(function(attr, errors) {
        return attrs.push(attr);
      });
      return expect(attrs).to.deep.equal(['foo', 'bar']);
    });
    return it('should return a json object of the errors', function() {
      var expected;
      this.errors.add('foo', 'required');
      this.errors.add('foo', 'equalTo');
      this.errors.add('bar', 'equalTo');
      expected = {
        foo: ['required', 'equalTo'],
        bar: ['equalTo']
      };
      return expect(this.errors.toJSON()).to.deep.equal(expected);
    });
  });
});
