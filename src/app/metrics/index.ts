import { Counter, Registry } from 'prom-client';

export class MetricsManager {
  private registry: Registry;
  private requestsCounter: Counter<any>;

  constructor() {
    this.registry = new Registry();
    this.requestsCounter = new Counter({
      name: 'incomming_requests_total',
      help: 'Counts the total amount of incomming requests to the API Gateway',
      registers: [this.registry],
    });
  }

  increaseRequestCounter(): void {
    this.requestsCounter.inc();
  }

  get contentType(): string {
    return this.registry.contentType;
  }

  async getMetrics(): Promise<string> {
    return await this.registry.metrics();
  }
}
