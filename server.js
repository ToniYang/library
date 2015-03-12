/**
 * Created by xie on 2015/2/17.
 */
    var application_root = __dirname,
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose');
    var session = require('express-session');
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var fs = require("fs");
    var util = require("util");
var app = express();

app.configure(function(){
    app.use(express.bodyParser());
    app.use(session({
        secret : 'keyboard cat',
        resave : false,
        saveUninitialized : true
    }));
    app.use(express.static( path.join(application_root,'site')));
    app.use(function (req,res,next) {
        console.log(req.url);
        if(req.url==='/login'){
            next();
        }else{
            if(!req.session.user){
                res.writeHead(200, {'content-type': 'text/html'});
                var rs = fs.createReadStream('/login.html');
                util.pump(rs, res);
            }else {
                next();
            }
        }
    });
    app.use(passport.initialize());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.errorHandler({dumpExceptions:true,showStack:true}));
});

mongoose.connect('mongodb://127.0.0.1/library');

var Keywords = new mongoose.Schema({
    keyword : String
});

var Book = new mongoose.Schema({
    title : String,
    author : String,
    releaseDate : Date,
    keywords : [ Keywords ]
});

var user = new mongoose.Schema({
    userName : String,
    realName : String,
    password : String,
    role : String,
    sex : String,
    telphone : String,
    phone : String,
    email : String,
    group : String,
    note : String
});


passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("login in");
        user.findOne({ userName: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

var mission = new mongoose.Schema({
    missionName : String,
    startDate : String,
    endDate : String,
    peopleInCharge : String,
    missionInstruction : String
});


var BookModel = mongoose.model('Book',Book);

var UserModel = mongoose.model('User',user);

var MissionModel = mongoose.model('Mission',mission);

var port = 8090;

/*UserModel.findOne().remove();*/

/*var userAdmin = new UserModel({
    userName : "admin",
    realName : "管理员",
    password : "admin",
    role : "admin",
    sex : "",
    telphone : "",
    phone : "",
    email : "",
    group : "",
    note : ""
});
userAdmin.save()*/

app.listen(port,function(){
    console.log('Express server listening on prot %d in %s mode',port,app.settings.env);
});

app.post('/login' , function (req,res,next) {
        var userName = req.body.userName;
        var password = req.body.password;
        console.log(userName);
        console.log(password);
        UserModel.findOne({
            userName : userName
        }, function (err,user) {
            if(user){
                if(user.password === password){
                    console.log("login success!!");
                    req.session.user = user;
                   res.redirect('/searchMission.html');
                }else{
                    res.redirect('/login.html');
                }
            }else {
                res.redirect('/login.html');
            }
        })
    }
);



app.get('/api',function(request,response,next){
    console.log(request.session.user);
    console.log("/api test");
    response.send('Library API is running');
});

app.get('/api/books',function(request,response,next){
    return BookModel.find(function(err,books){
       if(!err){
           return response.send(books);
       } else {
           return console.log(err);
       }
    });
});

app.post('/api/books',function(request,response,next){
    console.log("add book title is" + request.body.title);
    var book = new BookModel({
        title : request.body.title,
        author : request.body.author,
        releaseDate : request.body.releaseDate,
        keywords : request.body.keywords
    });
    book.save(function(err){
        if(!err) {
            return console.log("created");
        } else {
            return console.log(err);
        }
    });
    return response.send(book);
});

app.get('/api/books/:id',function(request,response,next){
    return BookModel.findById(request.params.id,function(err,book){
        if(!err){
            return response.send(book);
        } else {
            return console.log(err);
        }
    });
});

app.put('/api/books/:id',function(resquest,response,next){
    console.log('Updating book ' + request.body.title);
    return BookModel.findById(request.params.id,function(err,book){
        book.title = request.body.title;
        book.author = request.body.author;
        book.releaseDate = request.body.releaseDate;
        book.keywords = request.body.keywords;
        return book.save(function(err){
            if(!err){
                console.log("book update");
            } else{
                console.log(err);
            }
            response.send(book);
        });
    });
});

app.delete('/api/books/:id',function(request,response,next){
    console.log("Delete Book id is " + request.params.id);
    return BookMode.findById(request.body.id,function(err,book){
        return book.remove(function(err){
            if(!err){
                console.log('Book removed');
                return response.send(book);
            } else {
                 console.log(err);
            }
        });
    });
});

//用户操作：增、删、改、查
app.post('/api/users',function(request,response,next){
    console.log("Add new user %s",request.body.userName);

    var user = new UserModel;
    user.userName = request.body.userName;
    user.realName = request.body.realName;
    user.password = request.body.password;
    user.role = request.body.role;
    user.sex = request.body.sex;
    user.telphone = request.body.telphone;
    user.phone = request.body.phone;
    user.email = request.body.email;
    user.group = request.body.group;
    user.note = request.body.note;

    user.save(function(err){
        if(!err){
            console.log("create success");
        } else {
            console.log(err);
        }
        response.send(user);
    });
});

app.delete('/api/users/:id',function(request,response,next){
    console.log("Delete user id is %s",request.params.id);

    return UserModel.findById(request.params.id,function(err,user){
        return user.remove(function (err) {
            if(!err) {
                console.log("User removed ");
                response.send(user);
            } else {
                console.log(err);
            }
        });
    });
});

app.put("/api/users/:id",function(request,response,next){
    console.log("update user id is %s",request.params.id);

    return UserModel.findById(request.params.id,function (err,user) {
        user.role = request.body.role;
        user.sex = request.body.sex;
        user.realName = request.body.realName;
        user.telphone = request.body.telphone;
        user.phone = request.body.phone;
        user.email = request.body.email;
        user.group = request.body.group;
        user.note = request.body.note;
        user.save(function (err) {
            if(!err){
                console.log("user update success")
            } else {
                console.log(err);
            }
            response.send(user);
        })
    });
});

app.get('/api/users', function (request,response,next) {
    return UserModel.find(function(err,users){
        if(!err){
            response.send(users);
        } else {
            console.log(err);
        }
    });
});

app.get('/api/users:id', function (resquest,response,next) {
    return UserModel.findById(resquest.body.id, function (err,user) {
        if(!err) {
            response.send(user);
        } else {
            console.log(err);
        }
    });
});
//任务的增、删、改、查
app.post('/api/missions',function(request,response,next){
    console.log("Add new mission %s",request.body.userName);

    var mission = new MissionModel;
    mission.missionName = request.body.missionName;
    mission.startDate  = request.body.startDate;
    mission.endDate  = request.body.endDate;
    mission.peopleInCharge  = request.body.peopleInCharge;
    mission.missionInstruction  = request.body.missionInstruction;

    mission.save(function(err){
        if(!err){
            console.log("create success");
        } else {
            console.log(err);
        }
        response.send(mission);
    });
});

app.delete('/api/missions/:id',function(request,response,next){
    console.log("Delete mission id is %s",request.params.id);

    return MissionModel.findById(request.params.id,function(err,mission){
        return mission.remove(function (err) {
            if(!err) {
                console.log("User removed ");
                response.send(mission);
            } else {
                console.log(err);
            }
        });
    });
});

app.put("/api/missions/:id",function(request,response,next){
    console.log("update mission id is %s",request.params.id);

    return MissionModel.findById(request.params.id,function (err,mission) {
        mission.startDate  = request.body.startDate;
        mission.endDate  = request.body.endDate;
        mission.peopleInCharge  = request.body.peopleInCharge;
        mission.missionInstruction  = request.body.missionInstruction;
        mission.save(function (err) {
            if(!err){
                console.log("mission update success")
            } else {
                console.log(err);
            }
            response.send(mission);
        })
    });
});

app.get('/api/missions', function (request,response,next) {
    console.log("get all missions");
    return MissionModel.find(function(err,missions){
        if(!err){
            console.log(missions);
            return  response.send(missions);
        } else {
           return console.log(err);
        }
    });
});

app.get('/api/missions:id', function (resquest,response,next) {
    return MissionModel.findById(resquest.body.id, function (err,mission) {
        if(!err) {
            return response.send(mission);
        } else {
            console.log(err);
        }
    });
});

app.get('/apis/currentUser',function(req,res,next){
   return res.send(req.session.user);
});

app.get("/api/loginOut",function(req,res,next){
    req.session.user = undefined;
    res.redirect('/login.html');
});