class StripeMock {
  publishableKey;
  options;

  constructor(publishableKey, options) {
    this.publishableKey = publishableKey;
    this.options = options;
  }

  elements() {
    return {
      create() {
        return {
          mount() {},
          on() {},
          unmount() {},
        };
      },
    };
  }

  redirectToCheckout() {}
  confirmCardPayment() {}
  confirmAlipayPayment() {}
  confirmAuBecsDebitPayment() {}
  confirmBancontactPayment() {}
  confirmEpsPayment() {}
  confirmFpxPayment() {}
  confirmGiropayPayment() {}
  confirmGrabPayPayment() {}
  confirmIdealPayment() {}
  confirmOxxoPayment() {}
  confirmP24Payment() {}
  confirmSepaDebitPayment() {}
  confirmSofortPayment() {}
  handleCardAction() {}
  retrievePaymentIntent() {}
  confirmCardSetup() {}
  confirmAuBecsDebitSetup() {}
  confirmBacsDebitSetup() {}
  confirmBancontactSetup() {}
  confirmIdealSetup() {}
  confirmSepaDebitSetup() {}
  confirmSofortSetup() {}
  retrieveSetupIntent() {}
  createPaymentMethod() {}
  paymentRequest() {}
  createToken() {}
  createSource() {}
  retrieveSource() {}
  handleCardPayment() {}
  confirmPaymentIntent() {}
  handleCardSetup() {}
  confirmSetupIntent() {}
  handleFpxPayment() {}
}

const cardArgs = {
  elementType: 'card',
};

const baseArgs = {
  ...cardArgs,
  error: undefined,
  value: {
    postalCode: '',
  },
  empty: true,
  complete: false,
  brand: 'unknown',
};

const stripeError = {
  message: 'Your card number is invalid.',
  type: 'validation_error',
  code: 'invalid_number',
};

const argsError = {
  ...baseArgs,
  error: stripeError,
  brand: 'visa',
  value: {
    postalCode: '12345',
  },
};

const argsComplete = {
  ...baseArgs,
  complete: true,
};

export const stripeEventUtils = {
  triggerReady: function (stripeElement) {
    stripeElement._emitEvent('ready'), cardArgs;
  },
  triggerBlur: function (stripeElement) {
    stripeElement._emitEvent('blur', cardArgs);
  },
  triggerFocus: function (stripeElement) {
    stripeElement._emitEvent('focus', cardArgs);
  },
  triggerIncomplete: function (stripeElement) {
    stripeElement._emitEvent('change', baseArgs);
  },
  triggerError: function (stripeElement, userArgs = {}) {
    stripeElement._emitEvent('change', { ...argsError, ...userArgs });
  },
  triggerComplete: function (stripeElement) {
    stripeElement._emitEvent('change', argsComplete);
  },
  triggerChange: function (stripeElement, userArgs = {}) {
    stripeElement._emitEvent('change', { ...baseArgs, ...userArgs });
  },
};

export default StripeMock;
