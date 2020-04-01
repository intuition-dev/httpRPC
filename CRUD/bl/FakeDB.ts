

export function isValid(userID, pswd) {

    if(userID == 'admin') return true
    return false
}

export function getData() {

    let row1 = {
        fname: 'Vic', lname: 'Smith', email: 'vic@gmail.com', pass: 'a123'
    }
    let row2 = {
        fname: 'Al', lname: 'Smith', email: 'vic@gmail.com', pass: 'a123'
    }
    let row3 = {
        fname: 'Bill', lname: 'Smith', email: 'vic@gmail.com', pass: 'a123'
    }
    let row4 = {
        fname: 'Tom', lname: 'Smith', email: 'vic@gmail.com', pass: 'a123'
    }
    let row5 = {
        fname: 'Harry', lname: 'Smith',email: 'vic@gmail.com', pass: 'a123'
    }

    return [row1, row2, row3, row4, row5, row2, row3, row4, row5,]
}


