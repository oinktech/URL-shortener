const { authenticate } = require('../middleware/authenticate');
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
