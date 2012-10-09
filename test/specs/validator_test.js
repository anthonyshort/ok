
describe('OK.Validator', function() {
  beforeEach(function() {
    return this.validator = new OK.Validator;
  });
  it('should use a check method to call validation methods', function() {
    var valid;
    valid = this.validator.check('in', 1, [1, 2, 3]);
    expect(valid).to.be["true"];
    valid = this.validator.check('required', 'foo');
    expect(valid).to.be["true"];
    valid = this.validator.check('hex', '#fff');
    return expect(valid).to.be["true"];
  });
  it('should provide a class method for check', function() {
    var valid;
    valid = OK.Validator.check('email', 'foo@bar.com');
    return expect(valid).to.be["true"];
  });
  it('should validate an email', function() {
    var email, _i, _j, _len, _len1, _ref, _ref1, _results;
    _ref = ['foo@bar.com', 'foo@bar.co.uk'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      email = _ref[_i];
      expect(this.validator.email(email)).to.be["true"];
      expect(this.validator.email(email, false)).to.be["false"];
    }
    _ref1 = ['@bar.com', 'foo@bar', 'foo', null, false, void 0];
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      email = _ref1[_j];
      expect(this.validator.email(email)).to.be["false"];
      _results.push(expect(this.validator.email(email, false)).to.be["true"]);
    }
    return _results;
  });
  it('should validate a url', function() {
    var url, value, _i, _j, _len, _len1, _ref, _ref1, _results;
    _ref = ['http://google.com', 'google.com', 'google.co.uk', 'www.google.com', 'http://www.google.com'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      url = _ref[_i];
      expect(this.validator.url(url)).to.be["true"];
      expect(this.validator.url(url, false)).to.be["false"];
    }
    _ref1 = ['google', 'htp://google.com', null, false, 'foo@bar.co.uk', 'google .com'];
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      value = _ref1[_j];
      expect(this.validator.url(value)).to.be["false"];
      _results.push(expect(this.validator.url(value, false)).to.be["true"]);
    }
    return _results;
  });
  it('should validate alphanumeric', function() {
    var value, _i, _j, _len, _len1, _ref, _ref1, _results;
    _ref = ['abc123', 'abc', '123', 'ABC123'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      value = _ref[_i];
      expect(this.validator.alphanumeric(value)).to.be["true"];
      expect(this.validator.alphanumeric(value, false)).to.be["false"];
    }
    _ref1 = ["Anthony's bike", '-', '&!$@#*', 'a b c', false, null, void 0];
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      value = _ref1[_j];
      expect(this.validator.alphanumeric(value)).to.be["false"];
      _results.push(expect(this.validator.alphanumeric(value, false)).to.be["true"]);
    }
    return _results;
  });
  it('should validate hex', function() {
    var value, _i, _j, _len, _len1, _ref, _ref1, _results;
    _ref = ['#111', '#111111', '#fff', '#FFF'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      value = _ref[_i];
      expect(this.validator.hex(value)).to.be["true"];
      expect(this.validator.hex(value, false)).to.be["false"];
    }
    _ref1 = ['#GGG', 'abc', 'fff', '#0000000', false, null, void 0];
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      value = _ref1[_j];
      expect(this.validator.hex(value)).to.be["false"];
      _results.push(expect(this.validator.hex(value, false)).to.be["true"]);
    }
    return _results;
  });
  it('should validate strings', function() {
    var value, _i, _j, _len, _len1, _ref, _ref1, _results;
    _ref = ['string'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      value = _ref[_i];
      expect(this.validator.string(value)).to.be["true"];
      expect(this.validator.string(value, false)).to.be["false"];
    }
    _ref1 = [123, false, null, void 0];
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      value = _ref1[_j];
      expect(this.validator.string(value)).to.be["false"];
      _results.push(expect(this.validator.string(value, false)).to.be["true"]);
    }
    return _results;
  });
  it('should validate numbers', function() {
    var value, _i, _j, _len, _len1, _ref, _ref1, _results;
    _ref = [123, 1.23, -1, -1.23, '1', '-1'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      value = _ref[_i];
      expect(this.validator.number(value)).to.be["true"];
      expect(this.validator.number(value, false)).to.be["false"];
    }
    _ref1 = ['string', false, null, void 0];
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      value = _ref1[_j];
      expect(this.validator.number(value)).to.be["false"];
      _results.push(expect(this.validator.number(value, false)).to.be["true"]);
    }
    return _results;
  });
  it('should validate arrays', function() {
    var value, _i, _j, _len, _len1, _ref, _ref1, _results;
    _ref = [[]];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      value = _ref[_i];
      expect(this.validator.array(value)).to.be["true"];
      expect(this.validator.array(value, false)).to.be["false"];
    }
    _ref1 = ['string', false, 123, null, void 0];
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      value = _ref1[_j];
      expect(this.validator.array(value)).to.be["false"];
      _results.push(expect(this.validator.array(value, false)).to.be["true"]);
    }
    return _results;
  });
  it('should validate dates', function() {
    var value, _i, _j, _len, _len1, _ref, _ref1, _results;
    _ref = ['1 January 2012', '1/1/2012', new Date];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      value = _ref[_i];
      expect(this.validator.date(value)).to.be["true"];
      expect(this.validator.date(value, false)).to.be["false"];
    }
    _ref1 = ['string', false, null, void 0];
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      value = _ref1[_j];
      expect(this.validator.date(value)).to.be["false"];
      _results.push(expect(this.validator.date(value, false)).to.be["true"]);
    }
    return _results;
  });
  it('should validate booleans', function() {
    var value, _i, _j, _len, _len1, _ref, _ref1, _results;
    _ref = [true, false];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      value = _ref[_i];
      expect(this.validator.boolean(value)).to.be["true"];
      expect(this.validator.boolean(value, false)).to.be["false"];
    }
    _ref1 = ['string', 123, null, void 0];
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      value = _ref1[_j];
      expect(this.validator.boolean(value)).to.be["false"];
      _results.push(expect(this.validator.boolean(value, false)).to.be["true"]);
    }
    return _results;
  });
  it('should validate max', function() {
    var value, _i, _j, _len, _len1, _ref, _ref1, _results;
    _ref = [-1, 0, 1, 2, '-1', '0', '1', '2'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      value = _ref[_i];
      expect(this.validator.max(value, 2)).to.be["true"];
    }
    _ref1 = [2.01, 3, null, void 0];
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      value = _ref1[_j];
      _results.push(expect(this.validator.max(value, 2)).to.be["false"]);
    }
    return _results;
  });
  it('should validate min', function() {
    var value, _i, _j, _len, _len1, _ref, _ref1, _results;
    _ref = [2, 3, '2', '3'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      value = _ref[_i];
      expect(this.validator.min(value, 2)).to.be["true"];
    }
    _ref1 = [-1, '-1', null, void 0];
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      value = _ref1[_j];
      _results.push(expect(this.validator.min(value, 2)).to.be["false"]);
    }
    return _results;
  });
  it('should validate length', function() {
    var value, _i, _j, _len, _len1, _ref, _ref1, _results;
    _ref = ['foo', [1, 2, 3]];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      value = _ref[_i];
      expect(this.validator.length(value, 3)).to.be["true"];
    }
    _ref1 = ['foo', null, void 0];
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      value = _ref1[_j];
      _results.push(expect(this.validator.length(value, 2)).to.be["false"]);
    }
    return _results;
  });
  it('should validate min-length', function() {
    var value, _i, _j, _len, _len1, _ref, _ref1, _results;
    _ref = ['foo', 'bars', [1, 2, 3, 4, 5]];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      value = _ref[_i];
      expect(this.validator.minlength(value, 3)).to.be["true"];
    }
    _ref1 = ['f', [], false, null, void 0];
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      value = _ref1[_j];
      _results.push(expect(this.validator.minlength(value, 2)).to.be["false"]);
    }
    return _results;
  });
  it('should validate max-length', function() {
    var value, _i, _j, _len, _len1, _ref, _ref1, _results;
    _ref = ['foo', 'bars', [1, 2, 3, 4, 5]];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      value = _ref[_i];
      expect(this.validator.maxlength(value, 5)).to.be["true"];
    }
    _ref1 = ['foo', [1, 2]];
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      value = _ref1[_j];
      _results.push(expect(this.validator.maxlength(value, 1)).to.be["false"]);
    }
    return _results;
  });
  it('should validate equals', function() {
    var value, _i, _j, _len, _len1, _ref, _ref1, _results;
    _ref = ['foo', 'bars', [1]];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      value = _ref[_i];
      expect(this.validator.equal(value, value)).to.be["true"];
    }
    _ref1 = ['foo', [1, 2]];
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      value = _ref1[_j];
      _results.push(expect(this.validator.equal(value, 'bar')).to.be["false"]);
    }
    return _results;
  });
  it('should validate range', function() {
    var options, value, _i, _j, _len, _len1, _ref, _ref1, _results;
    options = {
      from: 1,
      to: 3
    };
    _ref = [1, 2, 3];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      value = _ref[_i];
      expect(this.validator.range(value, options)).to.be["true"];
    }
    _ref1 = [0, 4, 'foo', false, null, void 0];
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      value = _ref1[_j];
      _results.push(expect(this.validator.range(value, options)).to.be["false"]);
    }
    return _results;
  });
  it('should validate in', function() {
    var array, value, _i, _j, _len, _len1, _ref, _ref1, _results;
    array = [1, 2, 3];
    _ref = [1, 2, 3];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      value = _ref[_i];
      expect(this.validator["in"](value, array)).to.be["true"];
    }
    _ref1 = [0, 4, 'foo', false, null, void 0];
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      value = _ref1[_j];
      _results.push(expect(this.validator["in"](value, array)).to.be["false"]);
    }
    return _results;
  });
  it('should validate pattern', function() {
    var value, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
    _ref = ['foo'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      value = _ref[_i];
      expect(this.validator.pattern(value, /^foo$/)).to.be["true"];
    }
    _ref1 = [0, 'bar', false, null, void 0];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      value = _ref1[_j];
      expect(this.validator.pattern(value, /^foo$/)).to.be["false"];
    }
    _ref2 = ['foo'];
    _results = [];
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      value = _ref2[_k];
      _results.push(expect(this.validator["in"](value, 'foo')).to.be["false"]);
    }
    return _results;
  });
  return it('should validate required', function() {
    var value, _i, _j, _len, _len1, _ref, _ref1, _results;
    _ref = ['foo', 1, true, false, [], 0];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      value = _ref[_i];
      expect(this.validator.required(value)).to.be["true"];
    }
    _ref1 = [null, void 0];
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      value = _ref1[_j];
      _results.push(expect(this.validator.required(value)).to.be["false"]);
    }
    return _results;
  });
});
