const http = require('node:http');

// Beginner: checks health endpoint status quickly.
// Advanced: timeout budget prevents dependency failures from cascading.
function probe(url, timeoutMs = 2000) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      resolve({ ok: res.statusCode >= 200 && res.statusCode < 500, status: res.statusCode });
      req.destroy();
    });

    req.setTimeout(timeoutMs, () => {
      resolve({ ok: false, status: 0 });
      req.destroy();
    });

    req.on('error', () => resolve({ ok: false, status: 0 }));
  });
}

module.exports = { probe };
