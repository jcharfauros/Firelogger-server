const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');

const validateSession = ( req, res, next ) => {
    const token = req.headers.authoization;
    // console.log('the token is here -->', token); //uncomment when we got to test - jdc
    if (!token) {
        return res.status(403).send({ auth: false, message: 'Oh no, no token provided' })
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
            // console.log('decodeToken right here -->', decodeToken); //uncomment to test
            if (!err && decodeToken) {
                User.findon({
                    where: {
                       id: decodeToken.id
                    }
                })
                    .then(user => {
                        // console.log('hello user -->', user); //uncomment to test
                        if (!user) throw err;
                        // console.log('req -->', req); //uncomment to test
                        req.user = user;
                        return next();
                    })
                    .catch(err => next(err));
            } else {
                req.errors = err;
                return res.status(500).send('Not Authorized');
            }
        });
    }
};

module.exports = validateSession;