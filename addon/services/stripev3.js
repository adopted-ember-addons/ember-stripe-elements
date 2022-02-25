/* global Stripe */
import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { resolve } from 'rsvp';
import loadScript from '@adopted-ember-addons/ember-stripe-elements/utils/load-script';
import EmberError from '@ember/error';
import { A } from '@ember/array';
import { assert } from '@ember/debug';

export default class StripeService extends Service {
  _config = null;
  _didLoad = false;
  _stripe = null;
  _elements = A();

  constructor() {
    super(...arguments);
    const config =
      getOwner(this).resolveRegistration('config:environment') || {};
    this._config = config.stripe || {};

    if (!this.lazyLoad) {
      this.configure();
    }
  }

  get lazyLoad() {
    return Boolean(this._config.lazyLoad);
  }

  get mock() {
    return Boolean(this._config.mock);
  }

  get stripeOptions() {
    return this._config.stripeOptions || {};
  }

  set stripeOptions(value) {
    this._config.stripeOptions = value;
  }

  get publishableKey() {
    return this._config.publishableKey;
  }

  set publishableKey(key) {
    this._config.publishableKey = key;
  }

  get instance() {
    assert('Stripe must be loaded.', Boolean(this._stripe));
    return this._stripe;
  }

  load(publishableKey = null, stripeOptions = null) {
    if (publishableKey) {
      this.publishableKey = publishableKey;
    }

    if (stripeOptions) {
      this.stripeOptions = stripeOptions;
    }

    let { lazyLoad, mock } = this;
    let shouldLoad = lazyLoad && !mock;
    let doLoad = shouldLoad
      ? loadScript('https://js.stripe.com/v3/')
      : resolve();

    return doLoad.then(() => {
      this.configure();
      this._didLoad = true;
    });
  }

  configure() {
    if (!this._stripe) {
      let { publishableKey, stripeOptions } = this;

      if (!publishableKey) {
        throw new EmberError(
          'stripev3: Missing Stripe key, please set `ENV.stripe.publishableKey` in config/environment.js'
        );
      }

      this._stripe = new Stripe(publishableKey, stripeOptions);
    }
  }

  addStripeElement(element) {
    this._elements.pushObject(element);
  }

  removeStripeElement(element) {
    this._elements.removeObject(element);
  }

  getActiveElements() {
    return [...this._elements];
  }

  /**
   * @see https://stripe.com/docs/js/elements_object/create
   */
  elements() {
    return this.instance.elements(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/checkout/redirect_to_checkout
   */
  redirectToCheckout() {
    return this.instance.redirectToCheckout(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/payment_intents/confirm_card_payment
   */
  confirmCardPayment() {
    return this.instance.confirmCardPayment(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/payment_intents/confirm_alipay_payment
   */
  confirmAlipayPayment() {
    return this.instance.confirmAlipayPayment(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/payment_intents/confirm_au_becs_debit_payment
   */
  confirmAuBecsDebitPayment() {
    return this.instance.confirmAuBecsDebitPayment(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/payment_intents/confirm_bancontact_payment
   */
  confirmBancontactPayment() {
    return this.instance.confirmBancontactPayment(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/payment_intents/confirm_eps_payment
   */
  confirmEpsPayment() {
    return this.instance.confirmEpsPayment(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/payment_intents/confirm_fpx_payment
   */
  confirmFpxPayment() {
    return this.instance.confirmFpxPayment(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/payment_intents/confirm_giropay_payment
   */
  confirmGiropayPayment() {
    return this.instance.confirmGiropayPayment(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/payment_intents/confirm_grabpay_payment
   */
  confirmGrabPayPayment() {
    return this.instance.confirmGrabPayPayment(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/payment_intents/confirm_ideal_payment
   */
  confirmIdealPayment() {
    return this.instance.confirmIdealPayment(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/payment_intents/confirm_oxxo_payment
   */
  confirmOxxoPayment() {
    return this.instance.confirmOxxoPayment(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/payment_intents/confirm_p24_payment
   */
  confirmP24Payment() {
    return this.instance.confirmP24Payment(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/payment_intents/confirm_sepa_debit_payment
   */
  confirmSepaDebitPayment() {
    return this.instance.confirmSepaDebitPayment(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/payment_intents/confirm_sofort_payment
   */
  confirmSofortPayment() {
    return this.instance.confirmSofortPayment(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/payment_intents/handle_card_action
   */
  handleCardAction() {
    return this.instance.handleCardAction(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/payment_intents/retrieve_payment_intent
   */
  retrievePaymentIntent() {
    return this.instance.retrievePaymentIntent(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/setup_intents/confirm_card_setup
   */
  confirmCardSetup() {
    return this.instance.confirmCardSetup(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/setup_intents/confirm_au_becs_debit_setup
   */
  confirmAuBecsDebitSetup() {
    return this.instance.confirmAuBecsDebitSetup(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/setup_intents/confirm_bacs_debit_setup
   */
  confirmBacsDebitSetup() {
    return this.instance.confirmBacsDebitSetup(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/setup_intents/confirm_bancontact_setup
   */
  confirmBancontactSetup() {
    return this.instance.confirmBancontactSetup(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/setup_intents/confirm_ideal_setup
   */
  confirmIdealSetup() {
    return this.instance.confirmIdealSetup(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/setup_intents/confirm_sepa_debit_setup
   */
  confirmSepaDebitSetup() {
    return this.instance.confirmSepaDebitSetup(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/setup_intents/confirm_sofort_setup
   */
  confirmSofortSetup() {
    return this.instance.confirmSofortSetup(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/setup_intents/retrieve_setup_intent
   */
  retrieveSetupIntent() {
    return this.instance.retrieveSetupIntent(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/payment_methods/create_payment_method
   */
  createPaymentMethod() {
    return this.instance.createPaymentMethod(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/payment_request/create
   */
  paymentRequest() {
    return this.instance.paymentRequest(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/tokens_sources/create_token
   */
  createToken() {
    return this.instance.createToken(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/tokens_sources/create_source
   */
  createSource() {
    return this.instance.createSource(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/tokens_sources/retrieve_source
   */
  retrieveSource() {
    return this.instance.retrieveSource(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/deprecated/handle_card_payment_element
   * @deprecated
   */
  handleCardPayment() {
    return this.instance.handleCardPayment(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/deprecated/confirm_payment_intent_element
   * @deprecated
   */
  confirmPaymentIntent() {
    return this.instance.confirmPaymentIntent(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/deprecated/handle_card_setup_element
   * @deprecated
   */
  handleCardSetup() {
    return this.instance.handleCardSetup(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/deprecated/confirm_setup_intent_element
   * @deprecated
   */
  confirmSetupIntent() {
    return this.instance.confirmSetupIntent(...arguments);
  }

  /**
   * @see https://stripe.com/docs/js/deprecated/handle_fpx_payment
   * @deprecated
   */
  handleFpxPayment() {
    return this.instance.handleFpxPayment(...arguments);
  }
}
