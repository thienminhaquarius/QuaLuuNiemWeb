var express=require('express');
var router=express.Router();
var jwt=require('express-jwt');
var auth=jwt({
	secret:'maJsonWebToken'
});

//var user=require('../controller/user');
var sanPham=require('../controllers/sanpham');
var authCtr=require('../controllers/authentication');
var reviews=require('../controllers/reviews');
var user=require('../controllers/user');
// User
router.get('/user/:userEmail/giohang',user.gioHangByUserEmail);
router.post('/user/:userEmail/giohang',user.addGioHangByUserEmail);

//san pham
router.get('/home',sanPham.sanPhamByThoiGian);
router.get('/sanpham/:idSanPham',sanPham.chiTietSanPham);


router.post('/sanpham/:idSanPham/like',sanPham.like);
router.post('/taosanpham',sanPham.taoSanPham);
router.post('/sanpham/:idSanPham/review',auth,reviews.reviewCreateOne);

router.post('/register',authCtr.register);
router.post('/login',authCtr.login);


module.exports=router;