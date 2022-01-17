import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class CustomFormComponent extends Component {
  stripeElement = null;

  @action
  handleReady(stripeElement) {
    this.stripeElement = stripeElement;
  }

  @action
  handleSubmit(evt) {
    evt.preventDefault();
    this.args.onSubmit?.(this.stripeElement);
  }
}
