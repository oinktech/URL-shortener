const { authenticate } = require('../middleware/authenticate');
let id = 1;
const urlDatabase = require('./shorten').urlDatabase;

module.exports = (req, res) => {
    authenticate(req, res, () => {
        const { urls } = req.body;

        if (!urls || !Array.isArray(urls)) {
            return res.status(400).json({ error: '請提供網址列表' });
        }

        const result = urls.map(url => {
            const shortId = id++;
            const shortUrl = `https://your-vercel-domain.vercel.app/api/redirect/${shortId}`;
            urlDatabase[shortId] = { url, clicks: 0, owner: req.username };
            return { url, shortUrl };
        });

        res.json({ result });
    });
};
