/** @format */

import _ from "lodash";
import amqp from "amqplib";

import Types from "../types";

// Using as static variable
let connection: any = null;
let channel: any = null;

class RabbitMQ {
  /**
   * Initialize RabbitMQ
   * @description Initialize RabbitMQ
   * @static
   * @param {Object} config - RabbitMQ config object
   * @param {String} config.username - RabbitMQ user name
   * @param {String} config.password - RabbitMQ user password
   * @param {String} config.host - RabbitMQ server ip
   * @param {Number} config.port - RabbitMQ port number
   * @returns {RabbitMQChannel}
   */
  static async init(config: Types.RabbitMQConfig) {
    connection = await amqp.connect(
      `amqp://${config.username}:${config.password}@${config.host}:${config.port}`,
    );
    channel = await connection.createChannel();
    return channel;
  }

  /**
   * Send Message to Queue
   * @description Send Message to Queue
   * @static
   * @param {String} q - Queue Name
   * @param {Object} payload - Payload for Queue (Should be object)
   * @returns {void}
   */
  static async send(q: string, payload: object) {
    channel.assertQueue(q, { durable: true });
    channel.sendToQueue(q, payload, {
      persistent: true,
      contentType: "application/json",
    });
  }

  /**
   * Consume Message from Queue
   * @description Consume Message from Queue
   * @static
   * @param {String} q - Queue Name
   * @returns {String}
   */
  static consume(q: string, cb: any) {
    channel.assertQueue(q, { durable: true });
    channel.prefetch(1);

    channel.consume(
      q,
      (payload: { content: string }) => {
        channel.ack(payload);
        cb(channel, payload, JSON.parse(payload.content.toString()));
      },
      { noAck: false },
    );
  }

  /**
   * Close RabbitMQ Connection
   * @description Close RabbitMQ Connection
   * @static
   * @returns {Void}
   */
  static close() {
    connection.close();
  }

  /**
   * Create Exchange
   * @description Create Exchange
   * @static
   * @param {String} exchange - Exchange Name
   * @param {String} type - Exchange type (fanout, direct, headers, topic)
   * @param {String} queue - Queue Name
   * @param {String} routing_key - Routing Key
   * @param {Object} [options={}] - Extra options
   */
  static async createExchange(
    exchange: string,
    type: string,
    queue: string,
    routing_key: string,
    options = {},
  ) {
    if (!_.includes(["direct", "fanout", "headers", "topic"], type))
      throw new Error(`invalid exchange type: ${type}`);

    // create exchange
    await channel.assertExchange(exchange, type, { durable: true });

    // create queue
    await channel.assertQueue(queue, options);

    // bind queue to exchange
    await channel.bindQueue(queue, exchange, routing_key);
  }

  /**
   * Publish Message on Exchange
   * @description Publish Message on Exchange
   * @static
   * @param {String} exchange - Exchange Key
   * @param {String} routing_key - Routing Key
   * @param {Object} payload - Payload
   * @param {Object} [options] - Extra Options
   * @param {Object} [options.expiration] - message ttl if sending to DLX queue
   */
  static async sendToExchange(
    exchange: string,
    routing_key: string,
    payload: object,
    options: { expiration?: any },
  ) {
    await channel.publish(
      exchange,
      routing_key,
      new Buffer(JSON.stringify(payload)),
      {
        expiration: options.expiration,
        persistent: true,
        contentType: "application/json",
      },
    );
  }
}

export default RabbitMQ;
