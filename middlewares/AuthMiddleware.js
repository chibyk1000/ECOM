const express = require('express')
const jwt = require('jsonwebtoken')
const authorize = async(req, res, next) => {
    try {
        if (!req.cookies.token) {
            return res.status(401).json({message: "please login"})
        }
          const email = jwt.verify(
            req.cookies.token,
            process.env.USER_TOKEN_PASS
        ).email;
        if (!email) {
            return res.status(500).json({message:"invalid token"})
        }
        req.email = email
        next()
    } catch (error) {
        
    }
}

module.exports = authorize