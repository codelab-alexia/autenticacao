import { bootstrapHTTPServer } from './http_server';

export interface Context {
  useCases: { [key: string]: any };
  dataservices: { [key: string]: any };
  metricsMngr: any;
}

const app = bootstrapHTTPServer();

app.listen(Number(process.env.PORT || '3000'), () => console.log('- WebApp running!'));
