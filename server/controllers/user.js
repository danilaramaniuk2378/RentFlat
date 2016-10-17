'use strict';

var User = require('../models/user');
var authHelper = require('../helpers/auth');
var errorMessage = require('../consts/errors');
var statusMessages = require('../consts/status');

exports.createUser = function (req, res, next) {
    var body = req.body;

    if (!body.email || !body.password || !body.username) {
        res.status(400).end(errorMessage.MUST_PROVIDE_EMAIL_OR_PASSWORD);
    }

    User.findOne(
        {
            email: body.email
        },
        function (err, user) {
            if (err) {
                return next(err);
            }

            if (user !== null && user.email === body.email) {
                return res.status(401)
                    .send(errorMessage.USER_WITH_EMAIL_EXISTS);
            }

            user = new User({
                username: body.username,
                email: body.email,
                password: body.password
            });

            user.save(function (err) {
                if (err) {
                    return next(err);
                }

                res.status(201).send({
                    token: authHelper.createToken(user)
                });
            });
        }
    );
};

exports.getUsers = function (req, res, next) {
    User.find().exec(function (err, users) {
        if (err) {
            return next(err);
        }

        res.send(users);
    });
};

exports.deleteUserById = function (req, res, next) {
    User.findOne({ _id: req.params.id }).remove().exec(function (err) {
        if (err) {
            return next(err);
        }

        return res.status(200).send({
            statusMessages: statusMessages.USER_DELETED
        });
    });
};

exports.updateUserById = function (req, res, next) {
    var body = req.body;

    if (!body.username) {
        return res.status(400).end(errorMessage.BAD_REQUEST);
    }

    User.findOne({ _id: req.params.id }, function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(404).send(errorMessage.NO_SUCH_USER);
        }

        user.username = req.body.username;
        user.isAdmin = req.body.isAdmin;

        user.save(function (err) {
            if (err) {
                return next(err);
            }

            res.status(200).send({
                user: user
            });
        });
    });
};

exports.getUserForRecovery  = function (req, res, next) {
    User.findOne(
        {
            resetPasswordToken: req.params.recoveryToken,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        },
        function(err, user) {
            if (err) {
                return next(err);
            }
            res.status(200).send(user);
        }
    );
};

exports.resetPassword = function(req, res, next) {
    if (!req.body.password) {
        return res.status(400).end(errorMessage.BAD_REQUEST);
    }

    User.findOne(
        {
            resetPasswordToken: req.params.recoveryToken,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        },
        function(err, user) {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.status(401)
                    .send(errorMessage.PASSWORD_TOKEN_INVALID);
            }

            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
                if (err) {
                    return next(err);
                }

                res.status(201).send({
                    token: authHelper.createToken(user)
                });
            });
        }
    );
};

exports.setResetPasswordToken = function (email, token, cb, next, res) {
    User.findOne({ email: email }, function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).send(errorMessage.NO_ACCOUNT_EXISTS);
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function (err) {
            cb(err, token, user);
        });
    });
};
