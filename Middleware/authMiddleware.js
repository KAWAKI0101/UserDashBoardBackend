const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (authHeader && authHeader.startsWith('Bearer')) {

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = decoded; // You can access req.user in routes now 

            next();
        } catch (err) {

            return res.status(401).json({ error: 'Invalid token ' });
        }

    } else {
        return res.status(401).json({ error: 'No token provided ' });
    }
}

module.exports = protect;
