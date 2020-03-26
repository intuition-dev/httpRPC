"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcryptjs'); // to hash passwords
const jwt = require('jsonwebtoken');
// https://github.com/auth0/node-jsonwebtoken
class JWT {
    makeExpiredToken(secret) {
        const options = {
            // expired
            expiresIn: Math.floor(Date.now() / 1000) - 3000
        };
        const payload = {
            expired: true
        };
        return jwt.sign(payload, secret, options);
    }
    newToken(secret, userID, role, ip, finger, expiresIn, counter) {
        if (!expiresIn)
            expiresIn = '2h';
        const options = {
            expiresIn: expiresIn
        };
        if (!counter)
            counter = 0;
        else
            counter++;
        const payload = {
            userID: userID // email
            ,
            role: role,
            counter: counter,
            ip: ip,
            finger: finger
        };
        return jwt.sign(payload, secret, options);
    }
    getPayload(token, secret) {
        return jwt.verify(token, secret);
    }
    verifyExtend(token, secret, nip, nfinger, expiresIn) {
        if (!expiresIn)
            expiresIn = '2h';
        let decoded = jwt.verify(token, secret);
        const ip = decoded['ip'];
        if (ip != nip)
            throw new Error('IP does not match');
        if (nfinger) {
            const finger = decoded['finger'];
            if (finger != nfinger)
                throw new Error('finger does not match');
        } //fi
        const userID = decoded['userID'];
        const role = decoded['role'];
        const counter = decoded['counter'];
        return this.newToken(secret, userID, role, ip, nfinger, expiresIn, counter);
    } //()
    hashPass(password, salt) {
        return bcrypt.hashSync(password, salt);
    }
    genSalt() {
        return bcrypt.genSaltSync(10);
    }
}
exports.JWT = JWT;
