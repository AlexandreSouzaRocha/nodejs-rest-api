const { v4: uuidV4 } = require('uuid');
const cls = require('cls-hooked');

class ContextMiddleware {
    #namespace;

    #namespaceId;

    uuid;

    constructor() {
        this.#namespaceId = uuidV4();
        this.#namespace = cls.createNamespace(this.#namespaceId);
    }

    requestMiddleware() {
        const { #namespace: ns, #namespaceId: nsId } = this;
        return async function(req, res, next) {
            ns.bindEmitter(req);
            ns.bindEmitter(res);

            const requestId = req.headers['x-request-id'] || nsId;

            ns.run(() => {
                ns.set('requestId', requestId);
                next();
            });
        }
    }

    get requestId() {
        return this.ns.get('requestId')
    }
}