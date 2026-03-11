import User from '../models/user.model.js';
import { clearCookie, setCookie } from '../utils/response.js';
import { generateToken } from '../utils/token.js';


export const register = async (req, res) => {
    try {
        const { email,name, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        console.log('Registering user:', email);
        // Create new user
        const user = await User.create({ email, name, password });

        // Generate token
        const token = generateToken(user._id);

        setCookie(res, token, 'User registered successfully', 201);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// login user and get token
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await user.comparePassword(password.toString());

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = generateToken(user._id);

        setCookie(res, token, 'User logged in successfully', 200);

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
};



// login user and get token
export const logout = async (req, res) => {
    try {

        clearCookie(res, 'User logged out successfully', 200);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};