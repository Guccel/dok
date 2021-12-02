const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
  const token = req.header('auth');
  if (!token) return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token, process.env.KEY);
    req.user = verified
    next();
  } catch(err){
    res.status(200).send('Invalid token');
  }
}

/*
To secure reqest:

const verify = require('verifyToken')

router.get('/', verify, (req, res) => {...} )
*/