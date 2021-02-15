import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render, find, clearRender } from '@ember/test-helpers';
import StripeMock from '@adopted-ember-addons/ember-stripe-elements/utils/stripe-mock';

module('Integration | Component | stripe-card-cvc', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    window.Stripe = StripeMock;
    this.stripe = this.owner.lookup('service:stripev3');
    this.stripe.configure();
  });

  test('it renders', async function (assert) {
    await render(hbs`<StripeCardCvc/>`);

    assert.ok(find('.ember-stripe-element.ember-stripe-card-cvc'), 'should render ember stripe cvc');
    assert.ok(find('[role="mount-point"]'), 'should render stripe mount point');
    assert.equal(this.stripe.getActiveElements().length, 1);

    await clearRender();

    assert.equal(this.stripe.getActiveElements().length, 0);
  });
});
