describe 'OK', ->

  beforeEach ->
    @ok = new OK
      due:
        rules:
          required: true
          number: true
          max: 1000
          min: 1
          moment: (value, data) -> value instanceof moment
          equalTo: (value, data) -> value is data.other_attr
        messages:
          required: 'User ID is required'
          moment: 'Due date must be a moment instance'
          number: 'User ID must be a number'
          max: 'User ID cannot be more than 10 numbers long'
          min: 'User ID must be at least 3 numbers long'

