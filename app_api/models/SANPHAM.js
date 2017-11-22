var mongoose=require('mongoose');

var binhluanSchema = new mongoose.Schema({
	nguoiBinhLuan:{type:String, require:true},

	noiDung:{type:String, required:true},

	thoiGian:{type:Date,default:Date.now},
	
	rating:{type:Number,default:3,min:0,max:5},

	likes:{ type:Number, default:0}

});

var sanphamSchema = new mongoose.Schema({

	tenSanPham:{ type:String, required:true, unique:true },

	tenFileAnh:{ type:String, required:true },

	soLuong:{ type:Number, required:true, min:0 },

	rating:{type:Number,default:0,min:0,max:5},

	gia:{ type:Number, required:true, min:0 },

	loaiSanPham:{ type:String, required:true },

	moTa:{ type:String },

	moTaChiTiet:{type:String},

	thoiGian:{type:Date,default:Date.now},

	likes:{ type:Number, default:0 },

	reviews:[binhluanSchema]

});

module.exports=mongoose.model('SanPham',sanphamSchema);