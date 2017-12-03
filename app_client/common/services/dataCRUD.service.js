(function(){
	angular.module('QuaLuuNiemApp').service('dataCRUD',dataCRUD);
	function dataCRUD($http,authentication)
	{
		var getSanPhamByDate=function(soluong){
			return $http.get('/api/home?soluong='+soluong);
		};

		var getSanPhamById=function(idsanpham){
			return $http.get('/api/sanpham/'+idsanpham);
		};

		var addReviewBySanPhamId=function(sanphamid,data){
			return $http.post('/api/sanpham/'+sanphamid+'/review',data,{
				headers:{
					Authorization:'Bearer '+authentication.getToken()
				}
			});
		};
		var gioHangByUserEmail=function(userEmail){
			return $http.get('/api/user/'+userEmail+'/giohang');
		};
		var addGioHangByUserEmail=function(userEmail,data){
			return $http.post('/api/user/'+userEmail+'/giohang',data);
		};
		var addLike=function(sanphamid){
			return $http.post('/api/sanpham/'+sanphamid+'/like');
		};

		var xemThemSanPhamByThoiGian=function(currentSoLuong){
			return $http.get('/api/xemthem-thoigian?currentsoluong='+currentSoLuong);
		}
		var getSanPhamByLoai=function(tenloaisanpham,currentsoluong){
			return $http.get('/api/sanpham-theoloai?currentsoluong='+currentsoluong+'&tenloaisanpham='+tenloaisanpham);
		}
		return {
			getSanPhamByDate:getSanPhamByDate,
			getSanPhamById:getSanPhamById,
			addReviewBySanPhamId:addReviewBySanPhamId,
			gioHangByUserEmail:gioHangByUserEmail,
			addGioHangByUserEmail:addGioHangByUserEmail,
			addLike:addLike,
			xemThemSanPhamByThoiGian:xemThemSanPhamByThoiGian,
			getSanPhamByLoai:getSanPhamByLoai
		};
	}
})();