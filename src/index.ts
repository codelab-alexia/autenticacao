import { bootstrapHTTPServer } from './http_server';
import { bootstrapBrokerClient } from './broker_client';

import { InMemoryUserDataservice } from './app/database/in_memory_user_data_service';
import { JWTService } from './app/token';

import { LoginUser } from './core/behavior/login_user';
import { CreateNewUser } from './core/behavior/create_new_user';

import { MetricsManager } from './app/metrics';

export interface Context {
  useCases: { [key: string]: any };
  dataservices: { [key: string]: any };
  metricsMngr: any;
}

const metricsMngr = new MetricsManager();

const userDataservice = new InMemoryUserDataservice();
const tokenService = new JWTService('foo');
const loginUser = new LoginUser(userDataservice, tokenService);
const createNewUser = new CreateNewUser(userDataservice);

const context = {
  useCases: { loginUser, createNewUser },
  dataservices: { userDataservice },
  metricsMngr,
};

const app = bootstrapHTTPServer(context);

bootstrapBrokerClient(context);

app.listen(Number(process.env.PORT || '3000'), () => console.log('- WebApp running!'));
