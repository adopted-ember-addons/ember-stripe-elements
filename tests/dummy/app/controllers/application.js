import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from "@glimmer/tracking";
import { assert } from '@ember/debug';

let style = {
  style: {
    base: {
      color: '#333',
      fontFamily: '"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: '14px',
      '::placeholder': {
        color: '#666'
      },
      lineHeight: '24px'
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

export default class Application extends Controller {
  @service('stripev3') stripe;

  @tracked token = null;
  @tracked cardOptions = null;
  @tracked options = null;

  constructor() {
    super(...arguments);
    this.cardOptions = { hidePostalCode: true, ...style }
    this.options = { ...style };
  }

  @action
  submit(stripeElement) {
    assert('Must have a Stripe Element', Boolean(stripeElement));
    this.token = null;

    this.stripe.createToken(stripeElement).then(({token}) => {
      this.token = token
    });
  }
}
