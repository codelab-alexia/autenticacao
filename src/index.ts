import * as Express from 'express';
import * as proxy from 'express-http-proxy';

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '0.0.0.0';

const app = Express();

app.get('/', proxy('https://themicroservicesinfo.netlify.app'))

app.listen(port, host, () => console.log('server running'));

