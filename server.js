let path = require('path')
const express = require('express'),
    bodyParser = require( "body-parser")
    app = express()

const auth = require('./router/auth_endpoint');
const users = require('./router/users_endpoint');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/auth/', auth);
app.use('/api/users/', users);


app.listen(3000,() =>
    console.log(`Server start`)
)