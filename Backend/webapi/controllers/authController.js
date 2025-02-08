import pkg from 'jsonwebtoken';
const {jwt} = pkg;
// import {jwt} from 'jsonwebtoken';
import InvalidToken from '../models/invalideTokens.js';

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const invalidToken = await InvalidToken.find(token);
        if (invalidToken) {
            return res.status(401).json({ message: 'Token is invalidated' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default authenticate;
