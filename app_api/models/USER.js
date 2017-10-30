var mongoose=require('mongoose'); // Ma hoa mat khau
var bcrypt  = require('bcrypt-nodejs'); //tao jsonwebtoken
var jwt=require('jsonwebtoken');
var ObjectId=Schema.ObjectId; // kieu du lieu id cua mongoose

var userSchema = new mongoose.Schema({
	ten:{type:String,required:true},

	email:{type:String,required:true},

	password:{type:String,required:true},

	dienThoai:{type:String,required:true}

	donHangDaMua:[ObjectId]
});

userSchema.methods.maHoaPassword=function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

userSchema.methods.soSanhPassword=function(password){
	return bcrypt.compareSync(password,this.password);
};

userSchema.methods.taoJwt=function(){
	var hetHang=new Date();
	hetHang.setDate(hetHang.getDate()+7);	// jwt co hang su dung trong vong 7 ngay
	return jwt.sign({
		_id:this.id,
		email:this.email,
		name:this.name,
		exp:parseInt(hetHang.getTime()/1000) // tinh ra tong so giay het han 
	}, 'maJsonWebToken');
}


module.exports=mongoose.model('User',userSchema);