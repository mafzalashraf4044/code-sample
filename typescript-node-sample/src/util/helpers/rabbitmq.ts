/** @format */

import _ from "lodash";
import RabbitMQ from "../../config/rabbitmq";

const Exchanges = {
  email: "email",
};

const RoutingKeys = {
  signup_verification_code_email: "signup-verification-code-email",
  forgot_password_email: "forgot-password-email	",
  verification_token_email: "verification-token-email	",
};

const Queues = {
  signup_verification_code_email: "q-signup-verification-code-email",
  forgot_password_email: "q-forgot-password-email",
  verification_token_email: "q-verification-token-email	",
};

class RabbitMQHelper {
  static Exchanges = Exchanges;
  static RoutingKeys = RoutingKeys;
  static Queues = Queues;

  static async init() {
    await RabbitMQ.createExchange(
      Exchanges.email,
      "direct",
      Queues.signup_verification_code_email,
      RoutingKeys.signup_verification_code_email,
    ); // for signup verification email sending

    await RabbitMQ.createExchange(
      Exchanges.email,
      "direct",
      Queues.forgot_password_email,
      RoutingKeys.forgot_password_email,
    ); // for forgot password email sending

    await RabbitMQ.createExchange(
      Exchanges.email,
      "direct",
      Queues.verification_token_email,
      RoutingKeys.verification_token_email,
    ); // for verification token email sending
  }

  static async send(
    exchange: string,
    routing_key: string,
    payload: object,
    options = {},
  ) {
    if (!_.includes(this.Exchanges, exchange)) {
      throw new Error(
        `Invalid exchange: "${exchange}" in {RabbitMQHelper.send}`,
      );
    }

    if (!_.includes(this.RoutingKeys, routing_key)) {
      throw new Error(
        `Invalid routing_key: "${routing_key}" in {RabbitMQHelper.send}`,
      );
    }

    await RabbitMQ.sendToExchange(exchange, routing_key, payload, options);
  }

  /**
   * Start listening to queue
   * @description Start listening to queue
   * @static
   * @param {String}  q - Queue Name
   * @param {Function}  listner - Queue Listner
   */
  static subscribe(q: string, listner: any) {
    RabbitMQ.consume(q, listner);
  }
}

export default RabbitMQHelper;
