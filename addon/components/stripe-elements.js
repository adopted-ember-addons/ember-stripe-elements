import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class StripeElements extends Component {
  @service stripe;

  get options() {
    return this.args.options || {};
  }

  constructor() {
    super(...arguments);
    this.elements = this.stripe.elements(this.options);
  }
}
