const express = require('express')
const app = express()

// middleware 
function authenticate(req, res, next){
    let authheader = req.headers.authorization

    if(!authheader){
        let err = new Error('You are not authenticated!!')
        res.setHeader('WWW-Authenticate', 'Basic')
        res.status = 401
        return next(err)
    }

    let auth = new Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':')

    let user = auth[0]
    let pass = auth[1]

    if(user == 'amin' && pass == '1234'){
        next()
    }else{
        let err = new Error('You are not authenticated!!')
        res.setHeader('WWW-Authenticate', 'Basic')
        res.status = 401
        return next(err)
    }

}



app.use(express.static(`${__dirname}/public`))
app.use(authenticate)

app.get('/', (req, res)=>{
    res.send('Hello gain')
})
app.listen(4000, function(){
    console.log('Server active on port 4000')
})