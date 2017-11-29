var mongoose=require('mongoose');
var SanPham=require('../models/SANPHAM');

var sendJsonRespone=function(res,status,content){
	res.status(status);
	res.json(content);
};

exports.sanPhamByThoiGian=function(req,res){
	var soluong=parseInt(req.query.soluong);
	if(!soluong)
	{
		sendJsonRespone(res,404,{"message":"soluong not found"});
		return;
	}

	SanPham.find().sort('-thoiGian').limit(soluong).select('tenSanPham tenFileAnh gia loaiSanPham moTa rating reviews ')
	.exec(function(error,sanphams){
		if(error){
			return sendJsonRespone(res,400,error)
		}else if(!sanphams){
			return sendJsonRespone(res,404,{"message":"Khong tim duoc san pham nao"})
		}
		
		sendJsonRespone(res,200,sanphams);
	});
}

exports.taoSanPham=function(req,res){
	SanPham.create({
		tenSanPham:req.body.tenSanPham,
		tenFileAnh:req.body.tenFileAnh,
		soLuong:req.body.soLuong,
		gia:req.body.gia,
		loaiSanPham:req.body.loaiSanPham,
		moTa:req.body.moTa
	},function(err,sanpham){
		if (err){
			sendJsonRespone(res,400,err);
		}else
		{
			sendJsonRespone(res,201,sanpham);
		}
	});
}

exports.chiTietSanPham=function(req,res){

	if(req.params&&req.params.idSanPham)
	{
		SanPham.findById(req.params.idSanPham).exec(function(err,sanpham){
			if(err)
			{
				return sendJsonRespone(res,400,err);//unsuccessfull request
			}else if(!sanpham){
				return sendJsonRespone(res,404,{'message':'khong tim duoc san pham'})
			}
			sanpham.luotXem=sanpham.luotXem+1;
			sanpham.save(function(err,sanpham){
				if(err)
				{
					console.log(err);
					sendJsonRespone(res,400,err);
					return;
				}
				sendJsonRespone(res,200,sanpham);
			});
			
		});
	}else
	{
		sendJsonRespone(res,404,{'message':'No idSanPham in request'})
	}
};
exports.like=function(req,res){

	if(req.params&&req.params.idSanPham){
		SanPham.findById(req.params.idSanPham).exec(function(err,sanpham){
			if(err)
			{
				return sendJsonRespone(res,400,err);//unsuccessfull request
			}else if(!sanpham){
				return sendJsonRespone(res,404,{'message':'khong tim duoc san pham'})
			}
			sanpham.likes=sanpham.likes+1;
			sanpham.save(function(err,sanpham){
				if(err){
					console.log(err);
					sendJsonRespone(res,400,err);
					return;
				}
				sendJsonRespone(res,200,sanpham.likes);
			});
		});
	}else{
		sendJsonRespone(res,404,{'message':'No idSanPham in request'});
	}
};
