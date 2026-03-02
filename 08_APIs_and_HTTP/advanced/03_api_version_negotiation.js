// Beginner: version routes explicitly to avoid breaking old clients.
// Advanced: content negotiation via headers helps gradual migrations.
function resolveApiVersion(req) {
  const versionFromHeader = req.headers['x-api-version'];
  const accepted = ['v1', 'v2'];

  if (versionFromHeader && accepted.includes(versionFromHeader)) {
    return versionFromHeader;
  }

  const pathVersion = req.path.startsWith('/api/v2') ? 'v2' : 'v1';
  return pathVersion;
}

module.exports = { resolveApiVersion };
