var mongoose=require('mongoose');
var ObjectId=Schema.ObjectId;

var donhangSchema = new mongoose.Schema({
	maSanPham:{type:ObjectId},

	maUser:{type:ObjectId},

	soLuong:{type:Number,default:1},

	diaChiGiaoHang:{type:String},

	phuongThucThanhtoan:{type:String},
	
	thoiGian:{type:Date,default:Date.now}
});

module.exports=mongoose.model('DonHang',donhangSchema);
