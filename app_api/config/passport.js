var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var mongoose=require('mongoose');
var User=require('../models/USER');

passport.use('local-login',new LocalStrategy(
	{ usernameField:'email' },
	function(username,password,done){
		User.findOne({email:username},function(err,user){
			console.log(JSON.stringify(user));
			if(err)
			{
				return done(err);
			}
			if(!user)
			{
				return done(null,false,{"message":'Email hoac Mat khau khong dung'});
			}

			if(!user.soSanhPassword(password))
			{
				return done(null,false,{"message":'Email hoac Mat khau khong dung'});
			}
			return done(null,user);
		});
}));