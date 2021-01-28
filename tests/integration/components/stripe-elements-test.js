import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import StripeMock from '@adopted-ember-addons/ember-stripe-elements/utils/stripe-mock';
import StripeService from 'dummy/services/stripev3';
import env from 'dummy/config/environment';

module('Integration | Component | stripe-elements', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    window.Stripe = StripeMock;
    const config = {
      mock: true,
      publishableKey: env.stripe.publishableKey,
      stripeOptions: env.stripe.stripeOptions,
    };

    this.owner.register(
      'service:stripev3',
      StripeService.create({ config }),
      { instantiate: false }
    );
  });

  test('it renders single-line element', async function (assert) {
    await render(hbs`
      <StripeElements as |elements|>
        {{elements.card}}
      </StripeElements>
    `);

    assert.ok(find('.ember-stripe-card > [role="mount-point"]'));
  });

  test('it renders individual elements', async function (assert) {
    await render(hbs`
      <StripeElements as |elements|>
        {{elements.cardNumber}}
        {{elements.cardExpiry}}
        {{elements.cardCvc}}
        {{elements.postalCode}}
      </StripeElements>
    `);

    let tests = [
      'card-number',
      'card-expiry',
      'card-cvc',
      'postal-code'
    ];

    do {
      let el = tests.shift();
      assert.ok(find(`.ember-stripe-${el} > [role="mount-point"]`), el);
    } while(tests.length);
  });
});
