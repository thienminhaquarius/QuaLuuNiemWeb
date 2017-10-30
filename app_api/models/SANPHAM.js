var mongoose=require('mongoose');

var binhluanSchema = new mongoose.Schema({
	nguoiBinhLuan:{type:String, default:'Anonymous'},

	noiDung:{type:String, required:true},

	thoiGian:{type:Date,default:Date.now},

	likes:{ type:Number, default:0}

});

var sanphamSchema = new mongoose.Schema({

	tenSanPham:{ type:String, required:true },

	tenFileAnh:{ type:String, required:true },

	soLuong:{ type:Number, required:true, min:0 },

	gia:{ type:Number, required:true, min:0 },

	loaiSanPham:{ type:Number, required:true },

	moTa:{ type:String },

	likes:{ type:Number, default:0 },

	binhLuan:[binhluanSchema]


});

module.exports=mongoose.model('SanPham',sanphamSchema);