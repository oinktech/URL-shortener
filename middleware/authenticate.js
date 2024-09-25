const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key';

module.exports.authenticate = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('需要授權');
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send('授權失敗');
        }

        req.username = decoded.username;
        next();
    });
};
