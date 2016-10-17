'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var config = require('../config');

var userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true, trim: true },
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isAdmin: { type: Boolean, default: false },
    facebook: {
        id: String,
        email: String
    }
});

userSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(config.SALT_FACTOR, function (err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }

        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);
