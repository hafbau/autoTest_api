const cors = require('kcors');

const whitelist = ['http://localhost:8080', 'http://192.168.1.64:8080', 'http://hafiz-sandbox.tillerdigital.ca']
const corsOptions = {
    origin: (ctx) => {
        const requestOrigin = ctx.accept.headers.origin;
        if (!whitelist.includes(requestOrigin)) {
            return ctx.throw(`🙈 ${requestOrigin} is not a valid origin`);
        }
        return requestOrigin;
    }
}

module.exports = () => cors(corsOptions);