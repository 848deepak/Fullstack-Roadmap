const crypto = require('crypto');

// Beginner: ETag identifies a response version.
// Advanced: conditional requests reduce bandwidth with 304 responses.
function computeEtag(payload) {
  const serialized = JSON.stringify(payload);
  return `W/\"${crypto.createHash('sha1').update(serialized).digest('hex')}\"`;
}

function handleConditionalGet(req, res, payload) {
  const etag = computeEtag(payload);
  res.setHeader('ETag', etag);

  if (req.headers['if-none-match'] === etag) {
    return res.status(304).send();
  }

  return res.status(200).json(payload);
}

module.exports = { computeEtag, handleConditionalGet };
