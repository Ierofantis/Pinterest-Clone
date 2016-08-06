module.exports = function(app, passport) {

     var express = require('express');
     var mongoose = require('mongoose');        
     var Reg = require("./models/register");
     var User = require("./models/user");
     var Name = require("./models/name");
     var Public = require("./models/public");

    //profile page
     app.get('/', function(req, res) {

       var public = req.params.public;
       var names = req.params.names;
                   
         
       console.log(names);

       Public.find({  

      }, function(err, data) {

         if (err) { return next(err); }
          
         res.render("index2", { data: data});

          }); 

       });
       //submit from profile to public    
     app.post("/sub",isLoggedIn, function(req, res, next) {
        
        var public= req.body.public;
        var write = req.body.write;

        var p= new Public({public:public,write:write}); 
     
        p.save(function(err,names) {

         console.log(names);

         res.redirect('/'); 

      });        
    });

//delete
     //submit to my profile
    app.post("/photos",isLoggedIn, function(req, res, next) {
        
        var photos = req.body.photos;
        var skase = req.user.google.name;

        var n= new Name({photos:photos, skase:skase }); 
     
        n.save(function(err,names) {

         console.log(names);

         res.redirect('/profile/names'); 

      });        
    });


   app.get("/profile/names",isLoggedIn, function(req, res) {

         var photos = req.params.photos;
         var names = req.params.names;
         var skase = req.params.skase;              
         
       console.log(names);

       Name.find({ skase:req.user.google.name, names:names
      }, function(err, data) {
         if (err) { return next(err); }
          
           res.render("titles1", { data: data});
          });
        });        



   //Authentication
   app.get('/signup', function(req, res) {
        res.render('index.ejs'); 
    });
    
    app.get('/profile', isLoggedIn, function(req, res) {
        console.log(req.user);
        res.render('profile.ejs', {
            user : req.user 
        });
    });
    // route for logging out
    app.get('/logout', function(req, res) {

        req.logout();
        res.redirect('/');
    });

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/fail'

            }));
     };   
  
// route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
     }
 

