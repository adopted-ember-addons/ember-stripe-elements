import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';
import StripeMock from '@adopted-ember-addons/ember-stripe-elements/utils/stripe-mock';

module('Unit | Service | stripev3', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    window.Stripe = StripeMock;
    this.subject = this.owner.lookup('service:stripev3');
  });

  test('it proxies stripe.elements', function (assert) {
    this.subject.configure();

    let expected = {};
    let stub = sinon.stub(this.subject.instance, 'elements');
    stub.returns(expected);

    let actual = this.subject.elements();

    assert.ok(stub.calledOnce);
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.redirectToCheckout', function (assert) {
    this.subject.configure();

    let expected = {};
    let options = { foo: 'bar' };

    let stub = sinon.stub(this.subject.instance, 'redirectToCheckout');
    stub.returns(expected);

    let actual = this.subject.redirectToCheckout(options);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(options));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.confirmCardPayment', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let data = { foo: 'bar' };
    let options = { baz: 'bat' };

    let stub = sinon.stub(this.subject.instance, 'confirmCardPayment');
    stub.returns(expected);

    let actual = this.subject.confirmCardPayment(clientSecret, data, options);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, data, options));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.confirmAlipayPayment', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let data = { foo: 'bar' };
    let options = { baz: 'bat' };

    let stub = sinon.stub(this.subject.instance, 'confirmAlipayPayment');
    stub.returns(expected);

    let actual = this.subject.confirmAlipayPayment(clientSecret, data, options);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, data, options));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.confirmAuBecsDebitPayment', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let data = { foo: 'bar' };

    let stub = sinon.stub(this.subject.instance, 'confirmAuBecsDebitPayment');
    stub.returns(expected);

    let actual = this.subject.confirmAuBecsDebitPayment(clientSecret, data);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, data));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.confirmBancontactPayment', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let data = { foo: 'bar' };

    let stub = sinon.stub(this.subject.instance, 'confirmBancontactPayment');
    stub.returns(expected);

    let actual = this.subject.confirmBancontactPayment(clientSecret, data);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, data));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.confirmEpsPayment', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let data = { foo: 'bar' };

    let stub = sinon.stub(this.subject.instance, 'confirmEpsPayment');
    stub.returns(expected);

    let actual = this.subject.confirmEpsPayment(clientSecret, data);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, data));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.confirmFpxPayment', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let data = { foo: 'bar' };
    let options = { baz: 'bat' };

    let stub = sinon.stub(this.subject.instance, 'confirmFpxPayment');
    stub.returns(expected);

    let actual = this.subject.confirmFpxPayment(clientSecret, data, options);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, data, options));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.confirmGiropayPayment', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let data = { foo: 'bar' };
    let options = { baz: 'bat' };

    let stub = sinon.stub(this.subject.instance, 'confirmGiropayPayment');
    stub.returns(expected);

    let actual = this.subject.confirmGiropayPayment(clientSecret, data, options);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, data, options));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.confirmGrabPayPayment', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let data = { foo: 'bar' };
    let options = { baz: 'bat' };

    let stub = sinon.stub(this.subject.instance, 'confirmGrabPayPayment');
    stub.returns(expected);

    let actual = this.subject.confirmGrabPayPayment(clientSecret, data, options);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, data, options));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.confirmIdealPayment', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let data = { foo: 'bar' };
    let options = { baz: 'bat' };

    let stub = sinon.stub(this.subject.instance, 'confirmIdealPayment');
    stub.returns(expected);

    let actual = this.subject.confirmIdealPayment(clientSecret, data, options);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, data, options));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.confirmOxxoPayment', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let data = { foo: 'bar' };
    let options = { baz: 'bat' };

    let stub = sinon.stub(this.subject.instance, 'confirmOxxoPayment');
    stub.returns(expected);

    let actual = this.subject.confirmOxxoPayment(clientSecret, data, options);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, data, options));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.confirmP24Payment', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let data = { foo: 'bar' };

    let stub = sinon.stub(this.subject.instance, 'confirmP24Payment');
    stub.returns(expected);

    let actual = this.subject.confirmP24Payment(clientSecret, data);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, data));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.confirmSepaDebitPayment', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let data = { foo: 'bar' };

    let stub = sinon.stub(this.subject.instance, 'confirmSepaDebitPayment');
    stub.returns(expected);

    let actual = this.subject.confirmSepaDebitPayment(clientSecret, data);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, data));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.confirmSofortPayment', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let data = { foo: 'bar' };

    let stub = sinon.stub(this.subject.instance, 'confirmSofortPayment');
    stub.returns(expected);

    let actual = this.subject.confirmSofortPayment(clientSecret, data);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, data));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.handleCardAction', function (assert) {
    this.subject.configure();

    let clientSecret = 'client-secret';
    let expected = {};

    let stub = sinon.stub(this.subject.instance, 'handleCardAction');
    stub.returns(expected);

    let actual = this.subject.handleCardAction(clientSecret);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.retrievePaymentIntent', function (assert) {
    this.subject.configure();

    let clientSecret = 'client-secret';
    let expected = {};

    let stub = sinon.stub(this.subject.instance, 'retrievePaymentIntent');
    stub.returns(expected);

    let actual = this.subject.retrievePaymentIntent(clientSecret);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.confirmCardSetup', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let data = { foo: 'bar' };
    let options = { baz: 'bat' };

    let stub = sinon.stub(this.subject.instance, 'confirmCardSetup');
    stub.returns(expected);

    let actual = this.subject.confirmCardSetup(clientSecret, data, options);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, data, options));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.confirmAuBecsDebitSetup', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let data = { foo: 'bar' };

    let stub = sinon.stub(this.subject.instance, 'confirmAuBecsDebitSetup');
    stub.returns(expected);

    let actual = this.subject.confirmAuBecsDebitSetup(clientSecret, data);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, data));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.confirmBacsDebitSetup', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let data = { foo: 'bar' };

    let stub = sinon.stub(this.subject.instance, 'confirmBacsDebitSetup');
    stub.returns(expected);

    let actual = this.subject.confirmBacsDebitSetup(clientSecret, data);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, data));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.confirmBancontactSetup', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let data = { foo: 'bar' };

    let stub = sinon.stub(this.subject.instance, 'confirmBancontactSetup');
    stub.returns(expected);

    let actual = this.subject.confirmBancontactSetup(clientSecret, data);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, data));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.confirmIdealSetup', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let data = { foo: 'bar' };

    let stub = sinon.stub(this.subject.instance, 'confirmIdealSetup');
    stub.returns(expected);

    let actual = this.subject.confirmIdealSetup(clientSecret, data);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, data));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.confirmSepaDebitSetup', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let data = { foo: 'bar' };

    let stub = sinon.stub(this.subject.instance, 'confirmSepaDebitSetup');
    stub.returns(expected);

    let actual = this.subject.confirmSepaDebitSetup(clientSecret, data);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, data));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.confirmSofortSetup', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let data = { foo: 'bar' };

    let stub = sinon.stub(this.subject.instance, 'confirmSofortSetup');
    stub.returns(expected);

    let actual = this.subject.confirmSofortSetup(clientSecret, data);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, data));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.retrieveSetupIntent', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';

    let stub = sinon.stub(this.subject.instance, 'retrieveSetupIntent');
    stub.returns(expected);

    let actual = this.subject.retrieveSetupIntent(clientSecret);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.createPaymentMethod', function (assert) {
    this.subject.configure();

    let expected = {};
    let paymentMethodData = { foo: 'bar' };

    let stub = sinon.stub(this.subject.instance, 'createPaymentMethod');
    stub.returns(expected);

    let actual = this.subject.createPaymentMethod(paymentMethodData);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(paymentMethodData));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.paymentRequest', function (assert) {
    this.subject.configure();

    let expected = {};
    let options = { foo: 'bar' };

    let stub = sinon.stub(this.subject.instance, 'paymentRequest');
    stub.returns(expected);

    let actual = this.subject.paymentRequest(options);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(options));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.createToken', function (assert) {
    this.subject.configure();

    let expected = {};
    let cardElement = { foo: 'bar' };
    let data = { baz: 'bat' };

    let stub = sinon.stub(this.subject.instance, 'createToken');
    stub.returns(expected);

    let actual = this.subject.createToken(cardElement, data);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(cardElement, data));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.createSource', function (assert) {
    this.subject.configure();

    let expected = {};
    let element = { foo: 'bar' };
    let sourceData = { baz: 'bat' };

    let stub = sinon.stub(this.subject.instance, 'createSource');
    stub.returns(expected);

    let actual = this.subject.createSource(element, sourceData);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(element, sourceData));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.retrieveSource', function (assert) {
    this.subject.configure();

    let expected = {};
    let source = { foo: 'bar' };

    let stub = sinon.stub(this.subject.instance, 'retrieveSource');
    stub.returns(expected);

    let actual = this.subject.retrieveSource(source);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(source));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.handleCardPayment', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let element = { foo: 'bar' };
    let data = { baz: 'bat' };

    let stub = sinon.stub(this.subject.instance, 'handleCardPayment');
    stub.returns(expected);

    let actual = this.subject.handleCardPayment(clientSecret, element, data);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, element, data));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.confirmPaymentIntent', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let element = { foo: 'bar' };
    let data = { baz: 'bat' };

    let stub = sinon.stub(this.subject.instance, 'confirmPaymentIntent');
    stub.returns(expected);

    let actual = this.subject.confirmPaymentIntent(clientSecret, element, data);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, element, data));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.handleCardSetup', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let element = { foo: 'bar' };
    let data = { baz: 'bat' };

    let stub = sinon.stub(this.subject.instance, 'handleCardSetup');
    stub.returns(expected);

    let actual = this.subject.handleCardSetup(clientSecret, element, data);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, element, data));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.confirmSetupIntent', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let element = { foo: 'bar' };
    let data = { baz: 'bat' };

    let stub = sinon.stub(this.subject.instance, 'confirmSetupIntent');
    stub.returns(expected);

    let actual = this.subject.confirmSetupIntent(clientSecret, element, data);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, element, data));
    assert.strictEqual(actual, expected);
  });

  test('it proxies stripe.handleFpxPayment', function (assert) {
    this.subject.configure();

    let expected = {};
    let clientSecret = 'client-secret';
    let element = { foo: 'bar' };
    let data = { baz: 'bat' };

    let stub = sinon.stub(this.subject.instance, 'handleFpxPayment');
    stub.returns(expected);

    let actual = this.subject.handleFpxPayment(clientSecret, element, data);

    assert.ok(stub.calledOnce);
    assert.ok(stub.calledWith(clientSecret, element, data));
    assert.strictEqual(actual, expected);
  });

  test('it throws an error if config.stripe.publishableKey is not set', function (assert) {
    assert.expectAssertion(() => {
      this.subject._config = {
        mock: true,
        publishableKey: null,
        stripeOptions: null,
      };

      this.subject.configure();
    }, /Missing Stripe key/);
  });

  test('it does not throw when publishableKey is provided by load method', async function (assert) {
    this.subject._config = {
      mock: true,
      publishableKey: null,
      stripeOptions: null,
    };

    await this.subject.load('some-key');

    assert.ok(this.subject.instance);
  });
});
