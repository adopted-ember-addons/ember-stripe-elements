import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class StripeElements extends Component {
  @service('stripev3') stripe;

  get options() {
    return this.args.options || {};
  }

  constructor() {
    super(...arguments);
    this.elements = this.stripe.elements(this.options);
  }
}
