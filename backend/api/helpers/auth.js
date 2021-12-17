const fs = require('fs');
const jwt = require('jsonwebtoken');

function genToken(payload, salt) {
  return jwt.sign(payload, salt, { expiresIn: 1800 });
}

async function verifyToken(token, salt) {
  try {
    var payload = jwt.verify(token, salt);
    return {
      success: true,
      payload,
    };
  } catch {
    return {
      success: false,
    };
  }
}

module.exports = {
  genToken,
  verifyToken,
};
