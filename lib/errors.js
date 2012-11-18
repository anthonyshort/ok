var each = require('each');

/**
 * Errors object for storing errors from validation.
 * This provides a nicer interface for working with 
 * the errors after validating an object
 */
function Errors() {
  this.errors = {};
  this.length = 0;
}

/**
 * Add a new error
 * @param {String} attr The attribute on which the error occured
 * @param {String} rule The rule that failed
 */
Errors.prototype.add = function(attr, rule) {
  this.errors[attr] = this.errors[attr] || [];

  // Check if this rule has already been added
  // as an error. If it has been added then we 
  // won't create a new error
  var found = false;
  each(this.errors[attr], function(existingRule){
    if(existingRule === rule) found = true;
  });

  if (found === false) {
    this.length += 1;
    this.errors[attr].push(rule);
  }

  return this.errors;
};

/**
 * Is an attribute valie
 * @param  {String}  attr The attribute you want to check
 * @return {Boolean}
 */
Errors.prototype.isValid = function(attr) {
  return !(this.errors[attr] != null);
};

/**
 * Get the errors for an attribute
 * @param  {String} attr
 * @return {Boolean}
 */
Errors.prototype.get = function(attr) {
  return this.errors[attr] || false;
};

/**
 * Is an attribute invalid?
 * @param  {String} attr 
 * @return {Boolean}
 */
Errors.prototype.invalid = function(attr) {
  if (!this.errors[attr]) {
    return false;
  }
  return this.errors[attr];
};

/**
 * Loop through each of the errors for an attribute
 * @param  {String}   attr     Attribute name
 * @param  {Function} callback Callback function
 * @return {void}
 */
Errors.prototype.each = function(attr, callback) {
  each(this.errors[attr], callback, this);
};

/**
 * Loop over the invalid attributes
 * @param  {Function} callback
 * @return {void}
 */
Errors.prototype.keys = function(callback) {
  each(this.errors, callback);
}

/**
 * Get a JSON format for the errors
 * @return {Object} JSON version of the errors
 */
Errors.prototype.toJSON = function() {
  return this.errors;
};

module.exports = Errors;