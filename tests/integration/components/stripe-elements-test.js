import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, clearRender } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import StripeMock from '@adopted-ember-addons/ember-stripe-elements/test-support';

module('Integration | Component | stripe-elements', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    window.Stripe = StripeMock;
    this.stripe = this.owner.lookup('service:stripev3');
    this.stripe.configure();
  });

  test('it renders single-line element', async function (assert) {
    await render(hbs`
      <StripeElements as |Elements|>
        <Elements.card />
      </StripeElements>
    `);

    assert.ok(find('.ember-stripe-card > [role="mount-point"]'));
  });

  test('it renders individual elements', async function (assert) {
    assert.expect(6);

    await render(hbs`
      <StripeElements as |Elements|>
        <Elements.cardNumber />
        <Elements.cardExpiry />
        <Elements.cardCvc />
        <Elements.postalCode />
      </StripeElements>
    `);

    let tests = ['card-number', 'card-expiry', 'card-cvc', 'postal-code'];

    assert.strictEqual(this.stripe.getActiveElements().length, 4);

    do {
      let el = tests.shift();
      assert.ok(find(`.ember-stripe-${el} > [role="mount-point"]`), el);
    } while (tests.length);

    await clearRender();

    assert.strictEqual(this.stripe.getActiveElements().length, 0);
  });
});
