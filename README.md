# ok.js

[![Build Status](https://secure.travis-ci.org/anthonyshort/ok.png)](http://travis-ci.org/anthonyshort/ok)

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

[min]: https://raw.github.com/anthonyshort/ok/master/ok.min.js
[max]: https://raw.github.com/anthonyshort/ok/master/ok.js

## Usage

```javascript
var schema = new OK({
  first_name: {
    required: true,
    string: true
  },
  last_name: {
    required: true,
    string: true
  },
  birthday: {
    date: true
  }
});

var errors = schema.validate({
  first_name: "Naruto",
  birthday: '4 Jan 1988'
});

// Any errors?
if( errors.length === 0 ) {
  return "Hooray!";
}

// Loop through all of the errors easily
errors.each(function(list, attr){
  // list is an array of rules that didn't validate from the schema
  // attr is the attribute that failed
});
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

The built-in rules will example usage.

### required

Accepts a boolean value

```js
name: {
  required: true
}
```

### email

Basic email check. It's not a complex email regex but it will cover the majority of cases. Accepts ``true`` or ``false``.

```js
email: {
  email: true
}
```

### url

Basic URL check.  Accepts ``true`` or ``false``.

```js
blog: {
  url: true
}
```

### alphanumeric

Accepts a string with numbers or letters. A simple ``/^\w+$/`` check. Accepts ``true`` or ``false``.

```js
username: {
  alphanumeric: true
}
```

### hex

Accepts a hex value with or without the leading hash. Accepts ``true`` or ``false``.

```js
color: {
  hex: true
}
```

### string

Check if a value is a string using underscores ``_.isString`` method. Accepts ``true`` or ``false``.

```js
title: {
  string: true
}
```

### number

Check if a value is a number. Strings that return a number with ``parseFloat`` will pass. Accepts ``true`` or ``false``.

```js
user_id: {
  number: true
}
```

### array

Check if a value is a string using underscores ``_.isArray`` method. Accepts ``true`` or ``false``.

```js
entries: {
  array: true
}
```

### date

Simple date checking using ``Date.parse`` or ``_.isDate``. Accepts ``true`` or ``false``.

```js
due_at: {
  date: true
}
```

### boolean

Check if a value is a string using underscores ``_.isBoolean`` method. Accepts ``true`` or ``false``.

```js
terms: {
  boolean: true
}
```

### max

Limit a number to a max value.

```js
size: {
  max: 1000
}
```

### min

Limit a number to a min value.

```js
size: {
  min: 1
}
```

### length

Check the length property of an object.

```js
account_id: {
  length: 14
}
```

### minlength

Check the length property of an object.

```js
account_id: {
  minlength: 14
}
```

### maxlength

Check the length property of an object.

```js
account_id: {
  maxlength: 14
}
```

### equal

Check the value equals the other object using ``_.isEqual``.

```js
equal: {
  secret: 'nyan'
}
```

### range

Check that the number is within a range. Takes an object with a ``from`` and ``to`` value.

```js
level: {
  range: {
    from: 0,
    to: 3
  }
}
```

### in

Checks to see if the value is any value in an array.

```js
level: {
  in: [0, 1, 3]
}
```

### pattern

Tests the value against the regex object.

```js
name: {
  pattern: /^foo/
}
```

## Custom Rules

You can define a custom validator within your schema by passing a function as the value for a rule. For example:

```js
var schema = {
  password: function(value, data) {
    return value === data.password_confirm;
  }
};
```

The function is passed the value being checked and the whole object of data being checked so you can do comparisons on other attributes.

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

### OK.Error object

Whenever you validate you are returned an OK.Error object. This is a simple interface for working with the errors.

#### ``length``

The total number of errors for all attributes. This is the easiest way to check if there are any errors.

```js
var errors = OK.validate(attrs, schema);
if( errors.length > 0 ) {
  // Update view
}
```

#### ``isValid(attr)``

Check if an attribute that was passed in was valid.

#### ``get(attr)``

Returns the errors object for an attribute or false if there is no errors for that attribute

#### ``each(attr, callback)``

Loop through the errors for an attribute and call the callback. If the ``attr`` param is omitted and a function is passed in as the
only parameter it will loop through the errors object itself so you can check each of the attributes.

#### ``toJSON``

Similar the implementation in Backbone. Returns an object of errors that can be used as JSON.

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
