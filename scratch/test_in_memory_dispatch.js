const { Readable } = require('stream');
const app = require('../server.js');

function dispatchExpressRequest(app, options, bodyData) {
  return new Promise((resolve) => {
    const jsonStr = bodyData ? (typeof bodyData === 'string' ? bodyData : JSON.stringify(bodyData)) : '';
    const buf = Buffer.from(jsonStr);

    const req = new Readable({
      read() {
        this.push(buf);
        this.push(null);
      }
    });

    req.method = options.method || 'GET';
    req.url = options.path;
    req.headers = Object.assign({
      'content-type': 'application/json',
      'content-length': buf.length
    }, options.headers || {});

    let statusCode = 200;
    let headers = {};
    let responseBody = '';

    const res = {
      statusCode: 200,
      status(code) {
        this.statusCode = code;
        statusCode = code;
        return this;
      },
      setHeader(name, value) {
        headers[name.toLowerCase()] = value;
      },
      getHeader(name) {
        return headers[name.toLowerCase()];
      },
      write(chunk) {
        responseBody += chunk;
      },
      end(chunk) {
        if (chunk) responseBody += chunk;
        try {
          const parsed = JSON.parse(responseBody);
          resolve({ status: statusCode, body: parsed, raw: responseBody });
        } catch (e) {
          resolve({ status: statusCode, body: null, raw: responseBody });
        }
      },
      json(obj) {
        this.setHeader('content-type', 'application/json');
        this.end(JSON.stringify(obj));
      },
      send(data) {
        this.end(data);
      }
    };

    app.handle(req, res);
  });
}

async function test() {
  const r1 = await dispatchExpressRequest(app, { path: '/api/health', method: 'GET' });
  console.log('GET /api/health result:', r1.status, r1.body);

  const r2 = await dispatchExpressRequest(app, { path: '/api/auth/demo', method: 'POST' });
  console.log('POST /api/auth/demo result:', r2.status, r2.body);

  process.exit(0);
}

test();

