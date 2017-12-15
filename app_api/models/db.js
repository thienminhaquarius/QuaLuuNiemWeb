var mongoose=require('mongoose');
//var dbURL="mongodb://127.0.0.1:27017/QuaLuuNiem";
//mongodb://<dbuser>:<dbpassword>@ds141796.mlab.com:41796/qualuuniem
var dbURL="mongodb://thienminh:coganghoctap1911@ds141796.mlab.com:41796/qualuuniem";

mongoose.connect(dbURL,{useMongoClient:true});

var db=mongoose.connection;

db.on('connected',function(){
	console.log('Mongoose connected to '+dbURL);
});
db.on('error',console.error.bind(console,'MongoDB connection error:'));
db.on('disconnected',function(){
	console.log('Mongoose disconnected');
});