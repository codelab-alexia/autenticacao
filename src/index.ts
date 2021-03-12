import { bootstrapHTTPServer } from './http_server';

const app = bootstrapHTTPServer();

app.listen(Number(process.env.PORT || '3000'), () => console.log('- WebApp running!'));
