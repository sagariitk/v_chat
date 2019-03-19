var express = require('express');
var cors = require('cors');
var passport = require('passport');
var passportSetup = require('./passport-auth');
var cookieSession = require('cookie-session');
var socket = require('socket.io');
var path = require('path');
var mysql = require('mysql');
var cookieParser = require('cookie-parser')

var connection = mysql.createConnection({
    host: 'vijay-app-db.ckv6z1bs6r16.us-east-2.rds.amazonaws.com',
    user: 'root',
    password: '12345678',
    database: 'sampleDB'
});
    
connection.connect(function(error){
    if(!!error) {
        console.log('db connection error');
    }
    else {
        console.log('db connection succesful');
    }
});

var app = express();

var server = app.listen(9000, function(){
    console.log('server running at port 9000');
})

app.use('/public', express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(cors());
app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys: ['secretkey']
}))
app.use(passport.initialize());
app.use(passport.session());

app.get('/google-login', passport.authenticate('google', {
        scope: ['profile']
}));

var firstname = "null";
var lastname = "null";
app.get('/callback', passport.authenticate('google'), function(req,res){

    try{
        connection.query('select * from v_users where firstname=\'' + req.user._json.given_name +'\' and lastname=\'' + req.user._json.family_name +'\'' , function(err,rows, fields) {
            try{
                firstname = rows[0].firstname;
                lastname = rows[0].lastname;
                res.redirect('http://vijaysantoria.xyz:9000/uservalidation');
            }
            catch(err) {
                console.log('username is not registered');
                res.redirect('http://vijaysantoria.xyz:9000/uservalidation');
            }
        });
    }
    catch(err){
        res.redirect('http://vijaysantoria.xyz:9000/uservalidation');
    }
})

app.get('/uservalidation', function(req,res){
        if(req.user._json.given_name == firstname && req.user._json.family_name == lastname){
            console.log('user is already there in database');
            res.cookie('firstname', firstname);
            console.log(req.cookies['firstname']);
            res.redirect('http://vijaysantoria.xyz:9000/chat');
        }
        else {
            try{
                connection.query('insert into v_users(firstname, lastname) VALUES (\'' + req.user._json.given_name + '\', \'' + req.user._json.family_name + '\')' , function(error,rows, fields) {
                    try{
                        console.log('User added');
                        res.redirect('http://vijaysantoria.xyz:9000/chat');
                    }
                    catch(err) {
                        console.log('User can not be added');
                        res.redirect('http://vijaysantoria.xyz:9000/chat');
                    }
                });
            }
            catch(err){
                console.log('Error in Db Connection');
                res.redirect('http://vijaysantoria.xyz:9000/chat');
            }    
        }    
})

const authcheck = function(req, res, next){
    if(!req.user){
        res.redirect('/google-login');
    }
    else{
        next();
    }
}

app.get('/chat', authcheck, function(req,res){
    res.sendFile('index.html', {root: path.join(__dirname, './public')});
})

app.get('/logout', function(req,res){
    req.logout();
    res.redirect('http://vijaysantoria.xyz:3000');
})

app.use(function(req, res, next) {
    res.redirect('http://vijaysantoria.xyz:3000');
});


var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });
});
