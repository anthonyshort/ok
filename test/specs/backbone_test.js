
describe('Using OK with Backbone', function() {
  beforeEach(function() {
    var model;
    model = Backbone.Model.extend({
      validates: {
        name: {
          required: true,
          string: true
        },
        duration: {
          number: true
        },
        project_id: {
          number: true
        },
        completed_at: {
          date: true
        },
        priority: {
          number: true,
          range: {
            from: 0,
            to: 3
          }
        }
      },
      validate: function(attrs, options) {
        var errors;
        errors = OK.validate(attrs, this.validates);
        if (errors.length > 0) {
          return errors;
        }
      }
    });
    return this.model = new model;
  });
  return it('should return the error object on error', function() {
    this.model.on('error', function(model, errors, options) {
      return expect(errors.length > 0).to.be["true"];
    });
    return this.model.set({
      name: 'Anthony Short'
    });
  });
});
