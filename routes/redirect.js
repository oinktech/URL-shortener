const urlDatabase = require('./shorten').urlDatabase;

module.exports = (req, res) => {
    const shortId = req.params.id;
    const entry = urlDatabase[shortId];

    if (!entry) {
        return res.status(404).send('網址不存在');
    }

    if (entry.expirationDate && new Date() > entry.expirationDate) {
        return res.status(410).send('短網址已過期');
    }

    // 記錄點擊次數和統計數據
    entry.clicks += 1;
    const referer = req.headers['referer'] || '未知來源';
    const userAgent = req.headers['user-agent'];
    const country = req.headers['cf-ipcountry'] || '未知國家';

    if (!entry.stats) {
        entry.stats = [];
    }
    entry.stats.push({ referer, userAgent, country });

    res.redirect(entry.url);
};
