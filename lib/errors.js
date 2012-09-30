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
      this.errors[attr][rule] = message || ("Invalid: '" + attr + "' for '" + rule + "' with the value '" + this.data[attr] + "'");
      this.length += 1;
      return this.errors;
    };

    Errors.prototype.isValid = function() {
      return this.length === 0;
    };

    Errors.prototype.get = function(attr, rule) {
      if (rule && this.errors[attr]) {
        return this.errors[attr][rule];
      } else {
        return this.errors[attr] || false;
      }
    };

    Errors.prototype.each = function(callback, context) {
      if (context == null) {
        context = this;
      }
      return _.each(this.errors, callback, context);
    };

    Errors.prototype.toJSON = function() {
      return this.errors;
    };

    return Errors;

  })();

}).call(this);
