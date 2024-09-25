const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key';

function authenticate(req, res, next) {
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
}

let id = 1;
const urlDatabase = {};

module.exports = (req, res) => {
    authenticate(req, res, () => {
        const { url, customAlias, expirationDate } = req.body;

        if (!url) {
            return res.status(400).json({ error: '請輸入有效的網址' });
        }

        const shortId = customAlias || id++;
        const shortUrl = `https://your-vercel-domain.vercel.app/api/redirect/${shortId}`;

        urlDatabase[shortId] = {
            url,
            clicks: 0,
            expirationDate: expirationDate ? new Date(expirationDate) : null,
            owner: req.username
        };

        res.json({ shortUrl });
    });
};
