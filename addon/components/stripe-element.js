import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class StripeElement extends Component {

  @tracked stripeElement = null;
  @tracked type = null; // Set in components that extend from `stripe-element`
  @tracked _stripeError = null;

  @service stripev3;

  get autofocus() {
    return this.args.autofocus;
  }

  get options() {
    return this.args.options || {};
  }

  get elements() {
    return this.stripev3.elements();
  }

  set elements(value) {
    this.stripev3.elements = value;
  }

  get stripeError() {
    return this.args.stripeError || this._stripeError;
  }

  set stripeError(error) {
    this._stripeError = error;
  }

  @action
  registerListeners(element) {
    this.mountElement(element)
    this.setEventListeners();
    this.focusElement(element);
  }

  mountElement(element) {
    // Fetch user options
    let options = this.args.options

    // `stripeElement` instead of `element` to distinguish from `element`
    let stripeElement = this.elements.create(this.type, options);

    // Mount the Stripe Element onto the mount point
    stripeElement.mount(element);

    // Make the element available to the component
    this.stripeElement = stripeElement;
  }

  focusElement(element) {
    // Fetch autofocus, set by user
    let iframe = element.querySelector('iframe');
    if (this.autofocus && iframe) {
      iframe.onload = () => {
        this.stripeElement.focus();
      };
    }
  }

  setEventListeners() {
    let { stripeElement } = this;

    stripeElement.on('ready', (event) => {
      this._invokeAction('onReady', stripeElement, event)
    });

    stripeElement.on('blur', (event) => {
      this._invokeAction('onBlur', stripeElement, event)
    });

    stripeElement.on('focus', (event) => {
      this._invokeAction('onFocus', stripeElement, event)
    });

    stripeElement.on('change', (...args) => {
      if (this.isDestroying || this.isDestroyed) {
        return;
      }

      let [{ complete, error: stripeError }] = args;
      this.onChange(stripeElement, ...args);

      if (complete) {
        this._invokeAction('onComplete', stripeElement)
      } else if (stripeError) {
        this._invokeAction('onError', stripeError)
      }

      this.stripeError = stripeError;
    });
  }

  _invokeAction(method, ...args) {
    if (this.isDestroying || this.isDestroyed) {
      return;
    }

    if (typeof this[method] === 'function') {
      this[method](...args)
    }
  }

  onReady() { }
  onBlur() { }
  onFocus() { }
  onChange() { }
  onComplete() { }
  onError() { }

  @action
  onOptionsChange() {
    let options = this.options;
    this.stripeElement.update(options);
  }

  willDestroy() {
    this.stripeElement.unmount();
    super.willDestroy(...arguments);
  }
}