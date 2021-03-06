import * as Express from 'express';
import * as proxy from 'express-http-proxy';

export interface WebAppConfig {
  port?: string;
  host?: string;
}

const defaultConfig: WebAppConfig = {
  port: '3000',
  host: '0.0.0.0',
};

export class WebApp {
  private config: WebAppConfig;
  private _app: any;

  constructor(config: WebAppConfig) {
    this.config = { ...defaultConfig, ...config };
    this._app = Express();
  }

  start() {
    this._app.get('/test', (_, res, nest) => res.send('Hello, world!'));

    this._app.listen(
      Number(this.config.port),
      this.config.host,
      () => console.log('WebApp running!')
    )
  }
}
