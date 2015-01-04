var assert = require('chai').assert;

var Demand  = require('../lib/demand');

suite('Demand.make');

var payload = { foo: 'bar' };
var subject = Demand.make('Source','Demand', payload);

test('is a curryied funciton', function() {
  var d1 = Demand.make('Source','Demand');
  var d2 = Demand.make('Source', 'Demand', null);
  var d3 = d1(payload);

  assert.isFunction(d1);
  assert.isObject(d2);
  assert.isObject(d3);
});

test('is a valid packet', function(){
  assert.include(subject._keys, 'cid');
  assert.include(subject._keys, 'uuid');
  assert.include(subject._keys, 'timestamp');
  assert.include(subject._keys, 'payload');
});

test('is immutable', function() {
  var change = function() { subject.demand = 'something'; };
  assert.throw(change, 'Cannot set on an immutable record.');
});

test('can record reactions',  function() {
  var summary = { some: 'data' };
  var resolved = subject.resolve('title', summary);

  assert.equal(subject.reactions.size, 0);
  assert.equal(resolved.reactions.size, 1);
});
