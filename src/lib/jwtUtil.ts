
const bcrypt = require('bcryptjs') // to hash passwords
const jwt = require('jsonwebtoken')
// https://github.com/auth0/node-jsonwebtoken

export class jwT {

newToken5(secret, userID, role, ip, finger?, expiresIn?) {
    if(!expiresIn) expiresIn = '5 days'
    const options = {
        expiresIn: expiresIn 
    }

    let dt = new Date()
    const payload = {
          userID: userID // email
        , role: role
        , expDate: dt.setDate(dt.getDate() + 5)// 5 days
        , ip: ip
        , finger: finger
    }
    return jwt.sign(payload, secret, options)
}

getPayload(token, secret) { // throws an error, or returns payload
    return jwt.verify(token, secret)
}


verify(token, secret, nip, nfinger?) { // throws an error if bad

    let decoded = jwt.verify(token, secret)
    const ip = decoded['ip']
    if(ip != nip) throw new Error('IP does not match')

    if(nfinger) {
        const finger = decoded['finger']
        if(finger != nfinger) throw new Error('finger does not match')
    }//fi

    return decoded
}//()


hashPass(password, salt) {
    return bcrypt.hashSync(password, salt) 
}
genSalt() {
    return bcrypt.genSaltSync(10)
}

}