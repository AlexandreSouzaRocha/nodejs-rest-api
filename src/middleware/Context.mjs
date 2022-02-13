import crypto from 'crypto';
import cls from 'cls-hooked';
import { DateTime as Luxon } from 'luxon';

export default class ContextMiddleware {
  #ns;

  #nsId;

  requestId;

  requestTime;

  constructor() {
    this.#nsId = crypto.randomUUID();
    this.#ns = cls.createNamespace(this.#nsId);
  }

  async create(req, res, next) {
    this.#ns.bindEmitter(req);
    this.#ns.bindEmitter(res);

    const requestId = req.headers['x-request-id'] || crypto.randomUUID();
    const requestTime = Luxon.now().toMillis();

    this.#ns.run(() => {
      this.#ns.set('requestId', requestId);
      this.#ns.set('requestTime', requestTime);
      next();
    });
  }

  static getRequestId() {
    return this.#ns.get('requestId');
  }

  static getRequestTime() {
    return this.#ns.get('requestTime');
  }
}
