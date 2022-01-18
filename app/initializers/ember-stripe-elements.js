import config from '../config/environment';

export function initialize() {
  let stripeConfig = config.stripe || {};

  if (typeof FastBoot === 'undefined' && stripeConfig.mock) {
    import('@adopted-ember-addons/ember-stripe-elements/test-support').then((StripeMock) => window.Stripe = StripeMock);
  }
}

export default {
  name: 'ember-stripe-elements',
  initialize
};
