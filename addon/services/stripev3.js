/* eslint-disable ember/no-get */
/* global Stripe */
import Service from '@ember/service';
import { getProperties, setProperties } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { resolve } from 'rsvp';
import loadScript from '@adopted-ember-addons/ember-stripe-elements/utils/load-script';
import EmberError from '@ember/error';
import { A } from '@ember/array';

// As listed at https://stripe.com/docs/stripe-js/reference#the-stripe-object
const STRIPE_FUNCTIONS = [
  'elements',
  'confirmCardPayment',
  'createToken',
  'createSource',
  'createPaymentMethod',
  'retrieveSource',
  'paymentRequest',
  'redirectToCheckout',
  'retrievePaymentIntent',
  'handleCardPayment',
  'handleCardAction',
  'confirmPaymentIntent',
  'handleCardSetup',
  'confirmCardSetup',
  'retrieveSetupIntent',
  'confirmSetupIntent'
];

// eslint-disable-next-line ember/no-classic-classes
export default Service.extend({
  config: null,
  didConfigure: false,
  didLoad: false,

  lazyLoad: readOnly('config.lazyLoad'),
  mock: readOnly('config.mock'),
  publishableKey: null,
  stripeOptions: null,
  
  init() {
    this._super(...arguments);
    this.set('publishableKey', this.get('config.publishableKey'));
    this.set('stripeOptions', this.get('config.stripeOptions'));

    let lazyLoad = this.get('lazyLoad');
    this.set('_stripeElements', A());

    if (!lazyLoad) {
      this.configure();
    }
  },

  load(publishableKey = null, stripeOptions = null) {
    if (publishableKey) {
      this.set('publishableKey', publishableKey);
    }

    if (stripeOptions) {
      this.set('stripeOptions', stripeOptions);
    }

    let lazyLoad = this.get('lazyLoad');
    let mock = this.get('mock');
    let shouldLoad = lazyLoad && !mock

    let doLoad = shouldLoad ? loadScript("https://js.stripe.com/v3/") : resolve();

    return doLoad.then(() => {
      this.configure();
      this.set('didLoad', true);
    });
  },

  configure() {
    let didConfigure = this.get('didConfigure');

    if (!didConfigure) {
      let publishableKey = this.get('publishableKey');
      let stripeOptions = this.get('stripeOptions');

      if (!publishableKey) {
        throw new EmberError("stripev3: Missing Stripe key, please set `ENV.stripe.publishableKey` in config.environment.js");
      }

      let stripe = new Stripe(publishableKey, stripeOptions);
      let functions = getProperties(stripe, STRIPE_FUNCTIONS);
      setProperties(this, functions);

      this.set('didConfigure', true);
    }
  },
  addStripeElement(stripeElement){
    this._stripeElements.pushObject(stripeElement);
  },
  removeStripeElement(stripeElement){
    this._stripeElements.removeObject(stripeElement);
  },
  getActiveElements(){
    return [...this._stripeElements];
  }
});