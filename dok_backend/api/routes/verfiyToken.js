const jwt = require('jsonwebtoken');

function auth(req, res, next){
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token, process.env.KEY);
    req.user = verified
  } catch(err){
    res.status(200).send('Invalid token');
  }
}

module.exports = auth;

/*
To secure reqest:

const verify = require('verifyToken')

router.get('/', verify, (req, res) => {...} )
*/