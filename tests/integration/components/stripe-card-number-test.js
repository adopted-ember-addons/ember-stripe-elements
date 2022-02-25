import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render, find, clearRender } from '@ember/test-helpers';
import StripeMock from '@adopted-ember-addons/ember-stripe-elements/test-support';

module('Integration | Component | stripe card number', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    window.Stripe = StripeMock;
    this.stripe = this.owner.lookup('service:stripev3');
    this.stripe.configure();
  });

  test('it renders', async function (assert) {
    await render(hbs`<StripeCardNumber/>`);

    assert.ok(find('.ember-stripe-element.ember-stripe-card-number'));
    assert.ok(find('[role="mount-point"]'));
    assert.strictEqual(this.stripe.getActiveElements().length, 1);

    await clearRender();

    assert.strictEqual(this.stripe.getActiveElements().length, 0);
  });
});
