var mongoose=require('mongoose');
var User=require('../models/USER');
var SanPham=require('../models/SANPHAM');

var sendJsonRespone=function(res,status,content){
	res.status(status);
	res.json(content);
};

exports.gioHangByUserEmail=function(req,res){
	if(req.params&&req.params.userEmail){
		User.findOne({email:req.params.userEmail}).select('gioHang').exec(function(err,user){
			if(err){
				return sendJsonRespone(res,400,err)
			}else if(!user){
				return sendJsonRespone(res,404,{'message':'khong tim duoc user'})
			}
			sendJsonRespone(res,200,user);
		});

	}else{
		sendJsonRespone(res,404,{'message':'No userEmail found'})
	}
};
exports.addGioHangByUserEmail=function(req,res){
	if(!req.body.idSanPham){
		return sendJsonRespone(res,400,{'message':'khong tim duoc idSanPham'});
	}
	if(req.params&&req.params.userEmail){
		User.findOne({email:req.params.userEmail}).select('gioHang').exec(function(err,user){
			if(err){
				return sendJsonRespone(res,400,err)
			}else if(!user){
				return sendJsonRespone(res,404,{'message':'khong tim duoc user'})
			}
			if(user.gioHang.indexOf(req.body.idSanPham)!=-1){
				return sendJsonRespone(res,400,-1);
			}
			SanPham.findById(req.body.idSanPham).exec(function(err,sanpham){
				if(err){
					return sendJsonRespone(res,400,err);
				}else if(!sanpham){
					return sendJsonRespone(res,404,{'message':'khong tim duoc idSanPham trong database'})
				}
				user.gioHang.push(req.body.idSanPham);
				user.save(function(err,user){
					if(err){
						sendJsonRespone(res,400,err);
					}else{
						sendJsonRespone(res,201,user.gioHang);
					}
				});
			});
		});
	}else{
		sendJsonRespone(res,404,{'message':'No userEmail found'})
	}
}