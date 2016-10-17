'use strict';

var jwt = require('jsonwebtoken');
var config = require('../config');

exports.createToken = function (user) {
    return jwt.sign(
        {
            user: user
        },
        config.JWT_SECRET
    );
};

exports.isAdmin = function (req, res, next) {
    if (req.headers.authorization) {
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, config.JWT_SECRET, function (err, decoded) {
            if (err) {
                return next(err);
            }
            if (!decoded.user.isAdmin) {
                return res.sendStatus(401);
            }

            req.user = decoded.user;

            return next();
        });
    } else {
        return res.sendStatus(401);
    }
};

exports.isAuthenticate = function (req, res, next) {
    if (req.headers.authorization) {
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, config.JWT_SECRET, function (err, decoded) {
            if (err) {
                return next(err);
            }

            req.user = decoded.user;

            return next();
        });
    } else {
        return res.sendStatus(401);
    }
};
