const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// 中間件
app.use(bodyParser.json());

// 路由
const shorten = require('./routes/shorten');
const redirect = require('./routes/redirect');
const user = require('./routes/user');
const stats = require('./routes/stats');
const batchShorten = require('./routes/batchShorten');

app.post('/api/shorten', shorten);
app.get('/api/redirect/:id', redirect);
app.post('/api/register', user.register);
app.post('/api/login', user.login);
app.get('/api/stats', stats.getStats);
app.post('/api/batchShorten', batchShorten);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
