var mongoose=require('mongoose');
var SanPham=require('../models/SANPHAM');
var User=require('../models/USER');

var senJsonRespond=function(res,status,content){
	res.status(status);
	res.json(content);
};
// check user tu database, dam bao tranh gia mao JWT
var getInfoForCreateReview=function(req,res,callback){
	if(req.user&&req.user.email)
	{
		User.findOne({email:req.user.email}).exec(function(err,user){
			if(!user)
			{
				senJsonRespond(res,404,{"message":"User not found"});
				return;
			}else if (err){
				console.log(err);
				senJsonRespond(res,404,err);
				return;
			}
			callback(req,res,user.ten);
		});
	}
}
exports.reviewCreateOne=function(req,res){
	//console.log('denday');
	getInfoForCreateReview(req,res,function(req,res,userName){
		var idSanPham=req.params.idSanPham;
		if (idSanPham){
			SanPham.findById(idSanPham).select('reviews').exec(function(err,sanpham){
				if(err)
				{
					senJsonRespond(res,400,err);
				}else
				{
					doAddReview(req,res,sanpham,userName);
				}
			});
		}else
		{
			senJsonRespond(res,404,{"message":"Not found idSanPham"});
		}
	});
};
function doAddReview(req,res,sanpham,userName){
	if(!sanpham){
		senJsonRespond(res,404,{"message":"Not found sanpham"});
	}else{
		//console.log('den day');
		//console.log(JSON.stringify(sanpham));
		sanpham.reviews.push({
			nguoiBinhLuan:userName,
			rating:req.body.rating,
			noiDung:req.body.reviewText
		});
		sanpham.save(function(err,sanpham){
			if(err){
				senJsonRespond(res,400,err);
			}else{
				updateAverageRating(sanpham._id);
				thisReview=sanpham.reviews[sanpham.reviews.length-1];
				senJsonRespond(res,201,thisReview);
			}
		});
	}
}
function updateAverageRating(sanphamid){
	SanPham.findById(sanphamid).select('rating reviews').exec(function(err,sanpham){
		if(!err){
			doSetAverageRating(sanpham);
		}
	});
}
function doSetAverageRating(sanpham){
	var i, reviewCount,ratingAverage,ratingTotal;
	if(sanpham.reviews && sanpham.reviews.length >0){
		reviewCount=sanpham.reviews.length;
		ratingTotal=0;
		for(i=0;i<reviewCount;i++){
			ratingTotal=ratingTotal+sanpham.reviews[i].rating;
		}
		ratingAverage=parseInt(ratingTotal/reviewCount,10);
		sanpham.rating=ratingAverage;
		sanpham.save(function(err){
			if(err){
				console.log(err);
			}else{
				console.log("Average rating updated: ",ratingAverage);
			}
		});
	}
}