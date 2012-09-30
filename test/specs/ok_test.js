
describe('OK', function() {
  return beforeEach(function() {
    return this.ok = new OK({
      due: {
        rules: {
          required: true,
          number: true,
          max: 1000,
          min: 1,
          moment: function(value, data) {
            return value instanceof moment;
          },
          equalTo: function(value, data) {
            return value === data.other_attr;
          }
        },
        messages: {
          required: 'User ID is required',
          moment: 'Due date must be a moment instance',
          number: 'User ID must be a number',
          max: 'User ID cannot be more than 10 numbers long',
          min: 'User ID must be at least 3 numbers long'
        }
      }
    });
  });
});
