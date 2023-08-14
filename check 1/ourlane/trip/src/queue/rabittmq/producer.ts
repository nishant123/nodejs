import logger from '../../utils/logger';
import emitter from '../../utils/emitter';

const fileName = '[producer.js]';


class Producer {
  rabbitConn = null;

  constructor() {
    this.rabbitConn = null;
  }

  createConnection(channel) {
    this.rabbitConn = channel;
  }

  async sendToQueue(topic, queueObj) {
    const data = JSON.stringify(queueObj);
    if (this.rabbitConn) {
      try {
        const send = this.rabbitConn.sendToQueue(topic, Buffer.from(data), { persistent: true });
        if (!send) {
          // one more try
          setTimeout(() => {
            try {
              const againSend = this.rabbitConn.sendToQueue(topic, Buffer.from(data),
                { persistent: true });
              if (againSend) {
                logger.info(`${fileName} "[SUCCESSFULLY SENT TO QUEUE IN AGAIN]" ${topic} ${data}`);
                return true;
              }
              return false;
            }
            catch (err) {
              return Producer.queueErrorHandler(err);
            }
          }, 5000);
        }
        else {
          return true;
        }
      }
      catch (err) {
        return Producer.queueErrorHandler(err);
      }
    }
    return Producer.queueErrorHandler(null);
  }

  static queueErrorHandler(err: any) {
    logger.error(`${fileName} failed to produce message ${err}`);
    return false;
  }
}

const connection = new Producer();
export default connection;


emitter.on('rabbit-connection', (channel) => {
  logger.info(`${fileName}, 'rabbit-connection', 'message received for connnection'`);
  connection.createConnection(channel);
});
