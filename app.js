
var projectlists = [];

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const findOrCreate = require("mongoose-findorcreate");

const app = express();
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");

var MicrosoftStrategy = require('passport-microsoft').Strategy;
const res = require("express/lib/response");


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
    // cookie:{secure:true}
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://Admin-Jay:" + process.env.PASSWORD + "@cluster0.4v9bd.mongodb.net/userDB?retryWrites=true&w=majority");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    MS_Id: String,
    Name: String,
    RollNumber: String,
    project_status: {type:Boolean, default:false},
    project: {type:String,default:"None"}
});



const responseSchema = new mongoose.Schema({
    Project: { type: String, required: true },
    Member1_Name: { type: String, required: true },
    Member1_Email: { type: String, required: true },
    Member2_Name: {type:String,default:""},
    Member2_Email: String,
})


const projectSchema = new mongoose.Schema({
    id: { type: String, required: true },
    topic: { type: String, required: true },
})

userSchema.plugin(findOrCreate);






console.log(process.env.API_KEY);
secret = process.env.SECRET;



const User = mongoose.model("User", userSchema);
const Response = mongoose.model("Response", responseSchema);
const Project = mongoose.model("Project", projectSchema);

// const Projects = mongoexport

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


passport.use(new MicrosoftStrategy({
    clientID: process.env.MS_CLIENT_ID,
    clientSecret: process.env.VALUE,
    callbackURL: "http://localhost:3000/auth/microsoft/secrets",
    scope: ['user.read']
},
    function (accessToken, refreshToken, profile, done) {
        console.log(parseInt(profile.name.familyName));
        const y = profile.emails.value;
        var x = parseInt(profile.name.familyName)

        if (x <= 200103071) {
            User.findOrCreate({ MS_Id: profile.id, email: profile._json.mail, Name: profile._json.displayName, RollNumber: profile._json.surname}, function (err, user) {
                return done(err, user);
            });
        }
        else {
            console.log("Not For Sec B");
        }
    }
        // console.log(parseInt(profile._json.surname));

));


app.get("/", function (req, res) {
    res.render("home");
});

app.get("/login", function (req, res) {
    res.render("login");
});

Project.find({id:"0"}, (err, users) => {
    projectlists=users;
})


app.get("/secrets", function (req, res) {
    if (req.isAuthenticated()) {
        Project.find({id:"0"}, (err, users) => {
            res.render("secrets", {
                userslist: users
            });
        })
    }
    else {
        res.redirect("/login");
    }
});


app.post("/secrets", function (req, res) {
    var choice = req.body.choice;
    console.log(choice);
    const member1_name = req.body.member1_name;
    const member1_email = req.body.member1_email;
    const member2_name = req.body.member2_name;
    const member2_email = req.body.member2_email;
    console.log(projectlists);
    User.find({ Name: member1_name},function (err, user) {
        if(user[0].project_status===true){
            res.send("Already A Project has been selected.")
        }
        else{
            User.updateMany({Name:member1_name},{project_status:true,project:projectlists[parseInt(choice)-1].topic},function(err){
                if(err){
                    res.send(err);
                }
                else{
                    console.log("Success");
                }
            });
            User.updateMany({Name:member2_name},{project_status:true,project:projectlists[parseInt(choice)-1].topic},function(err){
                if(err){
                    res.send(err);
                }
                else{
                    console.log("Success");
                }
            });

            Project.updateMany({topic:projectlists[parseInt(choice)-1].topic},{id:"1"},(err)=>{
                if(err){
                    res.send(err);
                }
                else{
                    console.log("Success");
                }
            })
            res.redirect("/secrets");
        }
        console.log(user);
    })
    

})




app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});


app.get('/auth/microsoft',
    passport.authenticate('microsoft'));

app.get('/auth/microsoft/secrets',
    passport.authenticate('microsoft', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/secrets');
    });

app.listen(3000, function () {
    console.log("3000 port running");
});