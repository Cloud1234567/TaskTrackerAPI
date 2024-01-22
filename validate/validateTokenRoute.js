const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../Models/UserModel')


const validateToken  = () => async(req,res,next) => {
    
    const token = req.header('Authorization')
    if(!token) {
        return res.status(400).json({valid: false, message: 'Token is missing.'})}
    try {
        const decoded =  await jwt.verify(token,"10")
        
        const userDetails =  await User.findById(decoded._id)
        if (!userDetails) {
            return res.status(401).json({ error: 'Invalid token. User not found.' });
        }

        req.userDetails = userDetails
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' })
    }
}
       




module.exports = validateToken 