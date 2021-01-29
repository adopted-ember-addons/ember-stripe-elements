import config from '../config/environment';
import StripeMock from '@adopted-ember-addons/ember-stripe-elements/utils/stripe-mock';

export function initialize() {
  let stripeConfig = config.stripe || {};

  if (typeof FastBoot !== 'undefined' || stripeConfig.mock) {
    window.Stripe = StripeMock;
  }
}

export default {
  name: 'ember-stripe-elements',
  initialize
};
