import * as Express from 'express';
import * as proxy from 'express-http-proxy';

import { MetricsManager } from '../metrics';

import { UserDataservice, LoginUser } from '../core';

import { InMemoryUserDataservice } from '../database/in_memory_user_data_service';

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
    this._app.use(Express.json());
    this._metricsMngr = new MetricsManager();
  }

  start() {
    this._app.get('/test', (_, res, next) => {
      this._metricsMngr.increaseRequestCounter();
      res.send('Hello, world!');
    });

    this._app.post('/login', async (req, res, next) => {
      this._metricsMngr.increaseRequestCounter();

      const { email, password }: any = req.body;

      const userDS = new InMemoryUserDataservice();
      const login = new LoginUser(userDS as UserDataservice);

      const logged = await login.run(email, password);

      if (logged) {
        res.send({ token: `token-${email}` });
      } else {
        res.send({ error: 'authentication failed' });
      }
    });

    this._app.get('/metrics', async (_, res) => {
      res.type(this._metricsMngr.contentType);
      res.send(await this._metricsMngr.getMetrics());
    });

    this._app.listen(Number(this.config.port), this.config.host, () => console.log('WebApp running!'));
  }
}
