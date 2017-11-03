var express=require('express');
var router=express.Router();


//var user=require('../controller/user');
var sanPham=require('../controllers/sanpham');
var auth=require('../controllers/authentication');
// User
//router.get('/user');

router.get('/home',sanPham.sanPhamByThoiGian);

router.post('/taosanpham',sanPham.taoSanPham);




router.post('/register',auth.register);
router.post('/login',auth.login);


module.exports=router;