const Session = require('../models/session');
async function verify(session) {
  const session_data = await Session.findById(session);

  const isValid = session_data ? true : false;
  return { isValid };
}

module.exports = {
  verify,
};
