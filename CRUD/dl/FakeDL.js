"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwtUtil_1 = require("http-rpc/lib/jwtUtil");
const JWT = new jwtUtil_1.jwT();
class FakeDL {
    constructor() {
        this.secret = '123';
    }
    makeOldToken() {
        return JWT.makeExpiredToken(this.secret);
    }
    makeToken(userID, ip) {
        return JWT.newToken5(this.secret, userID, 'user', ip);
    }
    validateToken(token, ip) {
        return JWT.verify(token, this.secret, ip);
    }
    isValidPswd(userID, pswd) {
        if (userID == 'admin')
            return true;
        return false;
    }
    getData() {
        let row1 = {
            fname: 'Vic', lname: 'Smith', email: 'vic@gmail.com', pass: 'a123'
        };
        let row2 = {
            fname: 'Al', lname: 'Smith', email: 'vic@gmail.com', pass: 'a123'
        };
        let row3 = {
            fname: 'Bill', lname: 'Smith', email: 'vic@gmail.com', pass: 'a123'
        };
        let row4 = {
            fname: 'Tom', lname: 'Smith', email: 'vic@gmail.com', pass: 'a123'
        };
        let row5 = {
            fname: 'Harry', lname: 'Smith', email: 'vic@gmail.com', pass: 'a123'
        };
        return [row1, row2, row3, row4, row5, row2, row3, row4, row5,];
    }
}
exports.FakeDL = FakeDL;
