import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render, find, clearRender } from '@ember/test-helpers';
import StripeMock from '@adopted-ember-addons/ember-stripe-elements/test-support';

module('Integration | Component | stripe-card-expiry', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    window.Stripe = StripeMock;

    this.stripe = this.owner.lookup('service:stripev3');
    this.stripe.configure();
  });

  test('it renders', async function(assert) {
    await render(hbs`<StripeCardExpiry/>`);

    assert.ok(find('.ember-stripe-element.ember-stripe-card-expiry'));
    assert.ok(find('[role="mount-point"]'));
    assert.equal(this.stripe.getActiveElements().length, 1);

    await clearRender();

    assert.equal(this.stripe.getActiveElements().length, 0);
  });
});
