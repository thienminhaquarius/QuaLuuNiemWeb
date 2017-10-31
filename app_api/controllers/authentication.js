var passport=require('passport');
var mongoose=require('mongoose');
var User=require('../models/USER');

var sendJSONRespone=function(res,status,content){
	res.status(status);
	res.json(content);
};


exports.register=function(req,res){
	if(!req.body.name||!req.body.email||!req.body.password||!req.body.dienthoai)
	{
		sendJSONRespone(res,400,{"message":"All fields required"});
		return;
	}
	var user = new User();
	user.ten=req.body.name;
	user.email=req.body.email.toLowerCase();
	user.maHoaPassword(req.body.password);
	user.dienthoai=req.body.dienthoai;
	user.save(function(err){
		var token;
		if(err){
			sendJSONRespone(res,404,err);
		}else
		{
			token=user.taoJwt();
			sendJSONRespone(res,200,{"token":token});
		}
	});

};

exports.login=function(req,res){
	if(!req.body.email||!req.body.password)
	{
		sendJSONRespone(res,400,{"message":"All fields required"});
		return;
	}
	passport.authenticate('local-login',function(err,user,info){
		var token;
		if(err){

			sendJSONRespone(res,404,err);
			return;
		}
		if(user)
		{
			token=user.taoJwt();
			sendJSONRespone(res,200,{"token":token});
		}else
		{
			sendJSONRespone(res,404,info);
		}
	})(req,res);
};