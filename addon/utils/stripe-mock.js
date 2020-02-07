let StripeMock = function(publishableKey) {
  this.publishableKey = publishableKey;
}

StripeMock.prototype.elements = function() {
  return {
    create: function() {
      return {
        mount: function() {},
        on: function() {},
        unmount: function() {}
      }
    }
  };
}

StripeMock.prototype.confirmCardPayment = function() {};
StripeMock.prototype.createToken = function() {};
StripeMock.prototype.createSource = function() {};
StripeMock.prototype.createPaymentMethod = function() {};
StripeMock.prototype.retrieveSource = function() {};
StripeMock.prototype.paymentRequest = function() {};
StripeMock.prototype.redirectToCheckout = function() {};
StripeMock.prototype.retrievePaymentIntent = function() {};
StripeMock.prototype.handleCardPayment = function() {};
StripeMock.prototype.handleCardAction = function() {};
StripeMock.prototype.confirmPaymentIntent = function() {};
StripeMock.prototype.handleCardSetup = function() {};
StripeMock.prototype.confirmCardSetup = function() {};
StripeMock.prototype.retrieveSetupIntent = function() {};
StripeMock.prototype.confirmSetupIntent = function() {};

const cardArgs = {
  elementType: "card"
}

const baseArgs = {
  ...cardArgs,
  "error": undefined,
  "value": {
    "postalCode": ""
  },
  "empty": true,
  "complete": false,
  "brand": "unknown"
}

const stripeError = {
  message: "Your card number is invalid.",
  type: "validation_error",
  code: "invalid_number"
}

const argsError = {
   ...baseArgs,
   error: stripeError,
   "brand": "visa",
   "value": {
    "postalCode": "12345"
  }
}

const argsComplete = {
   ...baseArgs,
   "complete":true,
}

export const stripeEventUtils = {
  triggerReady     : function(stripeElement) { stripeElement._emitEvent('ready'), cardArgs},
  triggerBlur      : function(stripeElement) { stripeElement._emitEvent('blur', cardArgs)},
  triggerFocus     : function(stripeElement) { stripeElement._emitEvent('focus', cardArgs)},
  triggerIncomplete: function(stripeElement) { stripeElement._emitEvent('change', baseArgs)},
  triggerError     : function(stripeElement, userArgs = {}) { stripeElement._emitEvent('change', {...argsError, ...userArgs})},
  triggerComplete  : function(stripeElement) { stripeElement._emitEvent('change', argsComplete)},
  triggerChange    : function(stripeElement, userArgs = {}) { stripeElement._emitEvent('change', {...baseArgs, ...userArgs})}
}

export default StripeMock;
