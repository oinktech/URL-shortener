const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = {}; // 簡單示例的用戶數據庫
const SECRET_KEY = 'your-secret-key';

// 註冊
module.exports.register = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: '請提供用戶名和密碼' });
    }

    if (users[username]) {
        return res.status(400).json({ error: '用戶已存在' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    users[username] = { password: hashedPassword };
    res.json({ message: '註冊成功' });
};

// 登錄
module.exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: '請提供用戶名和密碼' });
    }

    const user = users[username];
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: '用戶名或密碼不正確' });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
};
