import { KafkaClient, Consumer, Message as KMessage } from 'kafka-node';
import { Context } from '.';
import { UserListener } from './app/listeners/user';
import { Message as DMessage } from './app/dtos/message';

import { Producer } from 'kafka-node';

export function bootstrapBrokerClient(context: Context): void {
  const client = new KafkaClient({
    kafkaHost: process.env.KAKFA_HOST || 'kafka:9092',
  });

  const consumer = new Consumer(client, [{ topic: 'new.user', partition: 0 }], {});

  const userListener = new UserListener(context);

  consumer.on('message', (msg: KMessage) => {
    const message = new DMessage(msg.value as string, 'new.user');
    userListener.createUser(message);
  });

  consumer.on('error', (err) => console.log(err));

  // FOR DEBUGGING PURPOSES ONLY

  const producer = new Producer(client);

  producer.on('ready', () => {
    setTimeout(() => {
      producer.send(
        [
          {
            topic: 'new.user',
            messages: JSON.stringify({ id: 1, name: 'João', email: 'joao@mail.com', passwordDigest: '123456' }),
          },
        ],
        (err, data) => {
          if (err) console.log(err);
          else console.log(data);
        },
      );
    }, 1000);
  });

  // FOR DEBUGGING PURPOSES ONLY

  console.log('- ReactiveApp running!');
}
