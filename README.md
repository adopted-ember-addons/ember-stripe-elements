<p align="center">
  <img src="https://github.com/adopted-ember-addons/ember-stripe-elements/raw/master/docs/img/ember-stripe-elements.png" />
  <br />
  <img src="https://github.com/adopted-ember-addons/ember-stripe-elements/raw/master/docs/img/demo.gif" />
</p>

---

[![Build Status](https://travis-ci.org/adopted-ember-addons/ember-stripe-elements.svg?branch=master)](https://travis-ci.org/adopted-ember-addons/ember-stripe-elements)
[![Latest NPM release](https://img.shields.io/npm/v/@adopted-ember-addons/ember-stripe-elements.svg)](https://www.npmjs.com/package/@adopted-ember-addons/ember-stripe-elements)
[![Ember Observer Score](https://emberobserver.com/badges/@adopted-ember-addons/ember-stripe-elements.svg)](https://emberobserver.com/addons/@adopted-ember-addons/ember-stripe-elements)

<h1>ember-stripe-elements</h1>

A simple Ember wrapper for [Stripe Elements](https://stripe.com/docs/elements).

## maintainers wanted
If you can spare some time in helping maintain this addon, please let us know in the [discord](https://discord.gg/emberjs) `adopted-ember-addons` channel or open an issue.

## Features

- Inject `<script src="https://js.stripe.com/v3/"></script>` into your application's `<body>`
- Initialize `Stripe` with your publishable key
- Inject a `stripev3` service into your controllers so you can use the functions usually available on the `stripe` object (see https://stripe.com/docs/stripe-js/reference#the-stripe-object):
  - `stripe.elements()`
  - `stripe.confirmCardPayment()`
  - `stripe.createToken()`
  - `stripe.createSource()`
  - `stripe.createPaymentMethod()`
  - `stripe.retrieveSource()`
  - `stripe.paymentRequest()`
  - `stripe.redirectToCheckout()`
  - `stripe.retrievePaymentIntent()`
  - `stripe.handleCardPayment()`
  - `stripe.handleCardAction()`
  - `stripe.confirmPaymentIntent()`
  - `stripe.handleCardSetup()`
  - `stripe.confirmCardSetup()`
  - `stripe.retrieveSetupIntent()`
  - `stripe.confirmSetupIntent()`
- Simple, configurable Ember components like `<StripeCard/>` (demoed in the gif above)

## Installation

```sh
$ ember install @adopted-ember-addons/ember-stripe-elements
```

## Compatibility

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above

## Configuration

### Stripe Publishable Key

You must set your [publishable key](https://support.stripe.com/questions/where-do-i-find-my-api-keys) in `config/environment.js`.
Also, [stripe options](https://stripe.com/docs/js/initializing#init_stripe_js-options) contains optional values that you could configure if you want to.

```js
ENV.stripe = {
  publishableKey: 'pk_thisIsATestKey',
  stripeOptions: {
    stripeAccount: 'acct_test_account',
    locale: 'en'
  }
};
```

### Mocking the Stripe API

You can configure the Stripe API to be mocked instead of loaded from `https://js.stripe.com/v3/`. This is useful for testing.

```js
ENV.stripe = {
  mock: true
};
```

When enabled, a [mock Stripe object](https://github.com/adopted-ember-addons/ember-stripe-elements/blob/master/addon/utils/stripe-mock.js) will be assigned to `window.Stripe` when your app is initialized.

When using the Stripe mock in tests you will likely need to override the mock's methods according to the needs of your test like so:

```js
this.owner.lookup('service:stripev3').createToken = () => ({ token: { id: 'token' } });
```

### Lazy loading

You can configure Stripe.js to lazy load when you need it.

```js
ENV.stripe = {
  lazyLoad: true
};
```

When enabled, Stripe.js will not be loaded until you call the `load()` function on the service. It's best to call this function in a route's `beforeModel` hook.

```js
// subscription page route

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  stripe: service('stripev3'),

  beforeModel() {
    return this.get('stripe').load();
  }
});
```

Note that the `load` function returns a `Promise`. By returning this promise you ensure that Stripe is fully loaded before the route procedes to the next `model` hook.

You can also pass `publishableKey` and optional `stripeOptions` to the `load` function.

```js
this.get('stripe').load('pk_thisIsATestKey', {
  locale: 'en',
  stripeAccount: 'acct_24BFMpJ1svR5A89k'
});
```

## Components

### Basics

Every component will:

- Accept the same array of [`options`](https://stripe.com/docs/elements/reference#element-options) accepted by Stripe Elements
- Call `update` on the Stripe `element` if the `options` are updated
- Bubble the proper JavaScript events into actions
- Mount Stripe's own `StripeElement` in a `<div role="mount-point">` on `didInsertElement`
- Unmount on `willDestroyElement`
- Provide access to the `stripev3` service
- Have the base CSS class name `.ember-stripe-element`
- Have a CSS class for the specific element that matches the component's name, e.g. `<EmberStripeCard/>` has the class `.ember-stripe-card`
- Yield to a block
- Accept `autofocus=true` passed directly in the component, e.g. `<StripeCard @autofocus={{true}}/>`

> Every component extends from a `StripeElement` base component which is not exposed to your application.

### Actions

The components bubble up all of [the JavaScript events that can be handled by the Stripe Element in `element.on()`](https://stripe.com/docs/elements/reference#element-on) from the Ember component using the following actions (upcoming breaking change 1.0.0-rc.2: all actions are now prefixed with 'on' https://github.com/adopted-ember-addons/ember-stripe-elements/issues/7)

- `onReady`
- `onBlur`
- `onChange` (also sets/unsets the `stripeError` property on the component, which can be yielded with the block)
- `onFocus`
- `onComplete`
- `onError`

You could handle these actions yourself, for example:

```hbs
<StripeCard @onBlur={{this.onBlur}}/>
```

### Component types

This addon gives you components that match the different [Element types](https://stripe.com/docs/elements/reference#element-types):

Stripe recommends using the their `card` element - a flexible single-line input that collects all necessary card details.
The `<StripeCard/>` component provides this input.

Additionally Stripe provides the following elements, which you can use to build your own form to collect card details:

- `cardNumber`: the card number.
- `cardExpiry`: the card's expiration date.
- `cardCvc`: the card's CVC number.
- `postalCode`: the ZIP/postal code.

These are provided via our `<StripeElements/>` contextual component, which yields sub-components for each element type:

```hbs
<StripeElements as |elements|>
  {{elements.cardNumber}}
  {{elements.cardExpiry}}
  {{elements.cardCvc}}
  {{elements.postalCode}}
</StripeElements>
```

> The `<StripeElements/>` component is a tagless component, so does not have any classes etc on it.

### Elements Options

The `<StripeElements/>` contextual component ensures all the individual elements are created from
the same [Stripe Elements object](https://stripe.com/docs/stripe-js/reference#the-elements-object).

If you want to pass options to the Stripe Elements object, pass them to the `<StripeElements/>`
contextual component. For example, when using the single-line `card` element:

```hbs
<StripeElements @options={{this.elementOptions}} as |elements|>
  {{elements.card options=cardOptions}}
<StripeElements/>
```

Or when creating your own form:

```hbs
<StripeElements @options={{this.elementsOptions}} as |elements|>
  {{elements.cardNumber options=cardNumberOptions}}
  {{elements.cardExpiry}}
  {{elements.cardCvc}}
<StripeElements/>
```

### Block usage with element `options`

In addition to the simple usage above, like `<StripeCard/>`, you can also yield to a block, which will yield both an `stripeError` object and [the `stripeElement` itself](https://stripe.com/docs/elements/reference#the-element).

For example, you can choose to render out the `stripeError`, as below (runnable in our dummy app).

```hbs
<StripeCard @options={{this.options}} as |stripeElement stripeError|}}
  {{#if stripeError}}
    <p class="error">{{stripeError.message}}</p>
  {{/if}}
  <button {{on "click" (fn this.submit stripeElement)}}>Submit</button>
  {{#if this.token}}
    <p>Your token: <code>{{this.token.id}}</code></p>
  {{/if}}
</StripeCard>
```

Also notice the `submit` action which passes the `stripeElement`; you could define this in your controller like so:

```js
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from "@glimmer/tracking";
import { action } from '@ember/object';

export default StripeController extends Controller {
  @service stripev3

  options = {
    hidePostalCode: true,
    style: {
      base: {
        color: '#333'
      }
    }
  },

  @tracked token: null,

  @action
  submit(stripeElement) {
    this.stripe.createToken(stripeElement).then(({token}) => {
      this.token = token;
    });
  }
};
```

Note the naming convention `stripeElement` instead of `element`, as this could conflict with usage of `element` in an Ember component.

### Styling

Note that you can use CSS to style some aspects of the components, but keep in mind that [the `styles` object of the `options` takes precedence](https://stripe.com/docs/elements/reference#element-options).

## Contributing

Fork this repo, make a new branch, and send a pull request. Please add tests in order to have your change merged.

### Installation

```sh
git clone git@github.com:adopted-ember-addons/ember-stripe-elements.git
cd ember-stripe-elements
npm install
```

### Running

```sh
ember serve
```

Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

```sh
ember test
```

#### Testing autofill in browsers

There are self-signed certs in `/ssl` that will allow you to test autofill inside of the dummy app (or serve as a blueprint for doing this yourself in your own app).

To run using the self-signed certificate, you must:

- Add `127.0.0.1 localhost.ssl` to your `hosts` file
- Run the app with `ember serve --ssl`
- Add the certificate to your keychain and trust it for SSL
- Visit the app at [https://localhost.ssl:4200](https://localhost.ssl:4200).

### Building

```sh
ember build
```

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## Contributors

Thanks to @begedin, @snewcomer, @filipecrosk, and @Kilowhisky for your early help on this!
