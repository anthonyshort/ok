(function() {

  OK.Errors = (function() {

    function Errors(data) {
      this.data = data;
      this.errors = {};
      this.length = 0;
    }

    Errors.prototype.add = function(attr, rule, message) {
      var _base;
      (_base = this.errors)[attr] || (_base[attr] = {});
      if (!this.errors[attr][rule]) {
        this.length += 1;
      }
      this.errors[attr][rule] = message || ("Invalid: '" + attr + "' for '" + rule + "'");
      return this.errors;
    };

    Errors.prototype.isValid = function(attr) {
      return !(this.errors[attr] != null);
    };

    Errors.prototype.get = function(attr) {
      return this.errors[attr] || false;
    };

    Errors.prototype.invalid = function(attr) {
      if (!this.errors[attr]) {
        return false;
      }
      return _.keys(this.errors[attr]);
    };

    Errors.prototype.value = function(attr) {
      return this.data[attr];
    };

    Errors.prototype.each = function(attr, callback) {
      if (_.isFunction(attr)) {
        return _.each(this.errors, attr, this);
      } else {
        return _.each(this.errors[attr], callback, this);
      }
    };

    Errors.prototype.toJSON = function() {
      return this.errors;
    };

    return Errors;

  })();

}).call(this);
