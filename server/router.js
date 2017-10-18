var express=require('express');
var router=express.Router();

//controllers
var home=require('./controllers/home');

module.exports=function(app){
	//routes
	router.get('/',home.show);



	app.use(router);
};