
import { jwT } from 'http-rpc/lib/jwtUtil'
const JWT = new jwT()

export class FakeDL {

secret = '123'

makeToken(userID, ip) {
    return JWT.newToken5(this.secret, userID, 'user', ip)
}

validateToken(token, ip) {
    return JWT.verify(token, this.secret, ip)
}

isValidPswd(userID, pswd) {
    if(userID == 'admin') return true
    return false
}

 getData() {

    let row1 = {
        fname: 'Vic', lname: 'Smith', email: 'vic@gmail.com', org: 'IBM'
    }
    let row2 = {
        fname: 'Al', lname: 'Smith', email: 'vic@gmail.com', org: 'IBM'
    }
    let row3 = {
        fname: 'Bill', lname: 'Smith', email: 'vic@gmail.com', org: 'IBM'
    }
    let row4 = {
        fname: 'Tom', lname: 'Smith', email: 'vic@gmail.com', org: 'IBM'
    }
    let row5 = {
        fname: 'Harry', lname: 'Smith',email: 'vic@gmail.com', org: 'IBM'
    }

    return [row1, row2, row3, row4, row5, row2, row3, row4, row5,]
}

}