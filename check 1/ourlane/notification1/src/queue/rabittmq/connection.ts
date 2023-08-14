import * as rabbit from 'amqplib';
import logger from '../../utils/logger';
import emitter from '../../utils/emitter';
import { vars } from '../../config/vars';
import { topics } from '../../config/constants';

const { rabbitClient } = vars;
const connectionString = rabbitClient;
const fileName = '[queueConnection.js]';


class QueueConnection {
  public rabbitConnection;

  constructor() {
    this.rabbitConnection = null;
    this.connectionManager();
  }

  async handleError() {
    try {
      await this.connectionManager();
    }
    catch (err) {
      logger.error(fileName, '[AMQP handleError]', `${err}`);
    }
  }

  async connectionManager() {
    try {
      const conn = await rabbit.connect(connectionString);
      const channel = await conn.createChannel();
      channel.prefetch(1);
      this.rabbitConnection = channel;
      conn.on('error', (err) => {
        if (err.message !== 'Connection closing') {
          logger.error(`${fileName}, '[RABBIT-MQ : conn error]', ${err.message}`);
        }
      });

      conn.on('close', () => {
        setTimeout(() => {
          logger.info(`${fileName}, '[RABBIT-MQ : RECONNECTING]'`);
          this.handleError();
        }, 10000);
      });
      this.assertQueues();
    }
    catch (err) {
      logger.error(`${fileName} ${err}`);
      setTimeout(() => {
        logger.info(fileName, '[RABBIT-MQ : RECONNECTING]');
        this.handleError();
      }, 10000);
    }
  }

  async assertQueues() {
    await this.rabbitConnection.assertQueue(topics.LOGGING, { durable: true });
    emitter.emit('rabbit-connection', this.rabbitConnection);
  }
}

const connection = new QueueConnection();
export default connection;
