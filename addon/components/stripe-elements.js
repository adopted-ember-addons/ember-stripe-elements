import { tracked } from "@glimmer/tracking";
import Component from "@glimmer/component";
import { inject as service } from '@ember/service';

export default class StripeElements extends Component {
  @service('stripev3') stripe;
  @tracked elements = null;

  constructor(owner, args) {
    super(owner, args);
    let options = this.options || {};
    this.elements = this.stripe.elements(options);
  }
}
