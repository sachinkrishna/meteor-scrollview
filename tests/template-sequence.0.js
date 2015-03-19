/*jshint ignore:start,-W101*/ // allow long lines

Tinytest.add('dispatch:template-sequence - test', function(test) {
  test.isTrue(typeof TemplateSequence === 'function', 'TemplateSequence not declared?');
});


Tinytest.addAsync('dispatch:template-sequence - Test sequence', function(test, complete) {

  var container = document.createElement('div');
  document.body.appendChild(container);

  var created = 0;
  var rendered = 0;
  var destroyed = 0;

  Template.item.created = function() {
    created++;
  };

  Template.item.rendered = function() {
    rendered++;
  };

  Template.item.destroyed = function() {
    destroyed++;
  };

  var foo = new TemplateSequence({
    template: Template.item,
    index: 0,
    offset: 0,
    container: container,
    size: 5
  });

  var c = 0;
  foo.forEach(function(item, index, i) {
    test.equal(c, i, 'counter off');
    test.equal(c - 0, index, 'counter off');
    c++;
  });

  test.equal(c, 5, 'Iteration failed?');

  test.equal(foo.items.length, 5, 'Wrong length');
  test.equal(created, 5);
  test.equal(destroyed, 0);
  test.equal(container.innerHTML, '01234', 'Rendered index did not match');

  foo.resize(7);

  test.equal(foo.items.length, 7, 'Wrong length after resize');
  test.equal(created, 7, 'Created counter dont match');
  test.equal(destroyed, 0);
  test.equal(container.innerHTML, '0123456', 'Rendered index did not match');

  foo.resize(3);

  test.equal(foo.items.length, 3, 'Wrong length after resize');
  test.equal(created, 7, 'Created counter dont match');
  test.equal(destroyed, 4);
  test.equal(container.innerHTML, '012', 'Rendered index did not match');

  foo.resize(10);

  test.equal(foo.items.length, 10, 'Wrong length after resize');
  test.equal(created, 14, 'Created counter dont match');
  test.equal(destroyed, 4);
  test.equal(container.innerHTML, '0123456789', 'Rendered index did not match');

  foo.setIndex(0);

  test.equal(foo.items.length, 10, 'Wrong length after index 0');
  test.equal(created, 14, 'Created counter dont match');
  test.equal(destroyed, 4);
  test.equal(container.innerHTML, '0123456789', 'Rendered index did not match');

  test.equal(rendered, 0, 'Templates should rendered off');

  foo.setIndex(10);
  Tracker.flush();

  // Wait a sec before checking dom etc
  Meteor.setTimeout(function() {

    test.equal(rendered, 10, 'Templates should rendered off');
    test.equal(foo.items.length, 10, 'Wrong length after index 10');
    test.equal(created, 14, 'Created counter dont match');
    test.equal(destroyed, 4);
    test.equal(container.innerHTML, '10111213141516171819', 'Rendered index 10 did not match');

    foo.setIndex(-10);
    Tracker.flush();

    Meteor.setTimeout(function() {

      test.equal(rendered, 10, 'Templates should rendered off');
      test.equal(foo.items.length, 10, 'Wrong length after index 10');
      test.equal(created, 14, 'Created counter dont match');
      test.equal(destroyed, 4);
      test.equal(container.innerHTML, '-10-9-8-7-6-5-4-3-2-1', 'Rendered index 10 did not match');

      foo.destroy();

      test.equal(container.innerHTML, '', 'Rendered index did not match');
      test.equal(destroyed, created, 'TemplateSequence did not clean up');

      // Clean up
      document.body.removeChild(container);

      complete();
    }, 300);



  }, 300);


});


//Test API:
//test.isFalse(v, msg)
//test.isTrue(v, msg)
//test.equalactual, expected, message, not
//test.length(obj, len)
//test.include(s, v)
//test.isNaN(v, msg)
//test.isUndefined(v, msg)
//test.isNotNull
//test.isNull
//test.throws(func)
//test.instanceOf(obj, klass)
//test.notEqual(actual, expected, message)
//test.runId()
//test.exception(exception)
//test.expect_fail()
//test.ok(doc)
//test.fail(doc)
//test.equal(a, b, msg)

/*jshint ignore:end,-W101*/
