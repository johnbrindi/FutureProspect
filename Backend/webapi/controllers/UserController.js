import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'; 

// Display Controller (placeholder)
export const Display = async (req, res) => {
    res.status(200).json({ message: 'Display endpoint is working!' });
};

// Register Controller
export const register = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const { firstName, lastName, email, password, phoneNumber, department, year } = req.body;

        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(password, 10);
        const N_user = await User.create({ firstName, lastName, email, password: hashedPassword, phoneNumber, department, year });

        // Generate a JWT token for the new user
        const token = jwt.sign({ user_id: N_user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with the new user and the token
        res.status(201).json({ N_user, token});
        console.log("User created successfully:", req.body);
    } catch (error) {
        console.error('Error in register controller:', error);
        res.status(400).json({ error: error.message });
    }
};

// Login Controller
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const N_user = await User.findByEmail(email);

        // Check if user credentials are valid
        if (N_user && await bcrypt.compare(password, N_user.password)) {
            const token = jwt.sign({ user_id: N_user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ N_user, token, message: "User login successfully!" });
            console.log("User login successfully:", req.body);
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error in login controller:', error);
        res.status(400).json({ error: error.message });
    }
};

// Logout Controller
export const logout = async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        // Assuming you have an InvalidToken model to store invalid tokens
        await InvalidToken.add(token); 
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error in logout controller:', error);
        res.status(400).json({ error: error.message });
    }
};
