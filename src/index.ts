import { WebApp } from './web_app';

const webApp = new WebApp({
  port: process.env.PORT
});

webApp.start();
