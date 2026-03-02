// Mini project core: URL shortener mapping.
// Advanced: add persistence + collision checks in production.
class UrlShortenerCore {
  constructor() {
    this.map = new Map();
  }

  shorten(longUrl) {
    const code = Buffer.from(`${Date.now()}-${longUrl}`).toString('base64url').slice(0, 8);
    this.map.set(code, longUrl);
    return code;
  }

  resolve(code) {
    return this.map.get(code) || null;
  }
}

module.exports = { UrlShortenerCore };
