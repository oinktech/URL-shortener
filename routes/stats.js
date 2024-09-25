const { authenticate } = require('../middleware/authenticate');
const urlDatabase = require('./shorten').urlDatabase;

module.exports.getStats = (req, res) => {
    authenticate(req, res, () => {
        const userUrls = Object.keys(urlDatabase)
            .filter(id => urlDatabase[id].owner === req.username)
            .map(id => ({
                shortId: id,
                url: urlDatabase[id].url,
                clicks: urlDatabase[id].clicks,
                stats: urlDatabase[id].stats
            }));

        res.json({ userUrls });
    });
};
