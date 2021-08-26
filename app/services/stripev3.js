import Service from "@adopted-ember-addons/ember-stripe-elements/services/stripev3";
import ENV from "../config/environment";

const config = ENV["stripe"] || {};

export default class StripeV3 extends Service {
  config = config;
}
