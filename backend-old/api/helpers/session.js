const Session = require('../models/session');
async function verify(session_id) {
  const session_data = await Session.findById(session_id).select('email type');
  const isValid = session_data ? true : false;
  return { isValid, session_data };
}

module.exports = {
  verify,
};
