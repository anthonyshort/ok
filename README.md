# ok.js

Simple validation library for Javascript models. It doesn't touch the DOM, it doesn't return messages. It just takes an object and validates it against a set of rules returning an object for working with errors.

I wasn't happy with the validation libraries available for Backbone models. Most are large and try and do too much. Ok was designed to take your models attributes and return a nice error object that your views can use to update your UI. It doesn't attempt to cover every validation use-case but it provides a simple interface for extending the validation rules available.

* Provide an easy interface for extending the validation rules
* Common and basic validation rules included by default
* Doesn't show errors or make DOM changes like jQuery.validate
* Doesn't handle messages of any kind
* Doesn't provide complex validation rules

## Requirements

* Underscore.js

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/anthonyshort/ok.js/master/dist/ok.min.js
[max]: https://raw.github.com/anthonyshort/ok.js/master/dist/ok.js

## Usage

```javascript
var schema = new OK({
  level: {
    required: true,
    number: true,
    min: 1000,
    max: 9000
  },
  due_at: {
    required: true
  }
});

var errors = schema.validate({
  level: false
});

errors.length; // 2
errors.get('level'); // [ 'number' ]
errors.toJSON(); 

/*
  {
    "level": [ 'number' ],
    "due_at": [ 'required' ]
  }
*/
```

### With Backbone

```js
var Person = Backbone.Model.extend({
  validates: {
    first_name: {
      required: true,
      string: true
    },
    last_name: {
      required: true,
      string: true
    }
  },
  validate: function(attrs, options) {
    this.errors = OK.validate(attrs, this.validates);
    return this.errors.length > 0 ? this.errors : null;
  }
});
```

## Available Rules

* required
* email
* url
* alphanumeric
* hex
* string
* number
* array
* date
* boolean
* max
* min
* length
* minLength
* maxLength
* equal
* range
* in
* pattern

## Documentation

### Schema

The schema is just a simple object with keys that map to attributes. The values are a hash of rules. The key is the validation type and the value will be passed to the validation method in OK.Validator. For example

```js
var schema = {
  name: {
    string: true
  }
};
```

This object can be passed to ``OK.validate(attributes, schema)`` to be used once or you can contruct a new OK instance ``new OK(schema)``
and reuse the same schema validation across your application.

### Adding new validation rules

Adding new validation rules is just a matter of adding a new method to the prototype of OK.Validator

```js
OK.Validator.prototype.creditcard = function(value, options, data){
  return CreditCard.check(value, options);
};
```

The function will be passed the value, the options for that rule (which is whatever you've defined in your schema) and the object of all the data that is being validated so you can check the value in relation to other values. Here's an example schema using the validation method we just defined:

```js
var schema = {
  card: {
    creditcard: {
      type: 'mastercard'
    }
  }
};

var data = {
  card: 'foo'
};

OK.validate(data, schema);
```

In the validtion method, ``value`` will be ``'foo'``, options will be ``{ type: mastercard }`` and ``data`` will be the object that is passed in to validate.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "lib" subdirectory!_

## Release History
0.1.0 - First release

## License
Copyright (c) 2012 Anthony Short  
Licensed under the MIT license.
