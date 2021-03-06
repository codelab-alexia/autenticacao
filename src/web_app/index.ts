import * as Express from 'express';
import * as proxy from 'express-http-proxy';

import { MetricsManager } from '../metrics';

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
  private _metricsMngr: MetricsManager;

  constructor(config: WebAppConfig) {
    this.config = { ...defaultConfig, ...config };
    this._app = Express();
    this._metricsMngr = new MetricsManager();
  }

  start() {
    this._app.get('/test', (_, res, next) => {
      this._metricsMngr.increaseRequestCounter();
      res.send('Hello, world!')
    });

    this._app.get('/metrics', async (_, res) => {
      res.type(this._metricsMngr.contentType);
      res.send(await this._metricsMngr.getMetrics());
    })

    this._app.listen(
      Number(this.config.port),
      this.config.host,
      () => console.log('WebApp running!')
    )
  }
}
