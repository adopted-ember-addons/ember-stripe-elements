/* global Stripe */
import Application from '@ember/application';

import { initialize } from 'dummy/initializers/ember-stripe-elements';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import sinon from 'sinon';

module('Unit | Initializer | ember stripe elements', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    class TestApplication extends Application { }

    TestApplication.initializer({
      name: 'initializer under test',
      initialize
    });

    this.application = TestApplication.create({ autoboot: false });
  });

  hooks.afterEach(function () {
    run(this.application, 'destroy');
  });

  test('it sets stripe key', async function (assert) {
    assert.expect(1);

    const StripeStub = sinon.spy(() => {
      return sinon.createStubInstance(Stripe);
    });

    await this.application.boot();

    assert.ok(StripeStub.calledWithNew);
  });
});
