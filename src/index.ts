import * as Express from 'express';
import * as proxy from 'express-http-proxy';
import { Counter, Registry } from 'prom-client';

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '0.0.0.0';

const app = Express();

const registry = new Registry();

const counter = new Counter({
  name: 'incomming_requests',
  help: 'Counts the total amount of incomming requests to the API Gateway',
  registers: [registry]
})

app.get(
  '/',
  (_, __, next) => {
    counter.inc();
    next();
  },
  proxy('https://themicroservicesinfo.netlify.app')
)

app.get('/metrics', async (_, res) => {
  res.type(registry.contentType)
  res.send(await registry.metrics());
})

app.listen(port, host, () => console.log('server running'));

