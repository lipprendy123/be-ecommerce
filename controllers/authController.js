const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const authController = {
    
    async register(req, res) {
        const {name, email, password, role} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing details"
            })
        }

        try {
            const existingUser = await User.findOne({email});
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "User already exists"
                })
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({name, email, password: hashedPassword, role: role || "customer"});
            await user.save(); 

            const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '7d'});

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            return res.status(201).json({
                success: true,
                message: 'User registered successfully'
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
        
    },

    async login(req, res) {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email dan password harus diisi'
            })
        }

        try {
            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Email notfound'
                })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Password salah'
                })
            }

            const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '7d'});

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            return res.status(200).json({
                success: true,
                token,
                message: 'Login berhasil',
                user: {id: user._id, name: user.name, email: user.email, role: user.role}
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan server'
            })
        }
    },

    async logout(req, res) {
        try {
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
            })

            return res.status(200).json({
                success: true,
                message: 'Loged Out!!!'
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

}

module.exports = {authController}