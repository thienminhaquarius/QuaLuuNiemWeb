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
		}
		var addGioHangByUserEmail=function(userEmail,data){
			return $http.post('/api/user/'+userEmail+'/giohang',data);
		}

		return {
			getSanPhamByDate:getSanPhamByDate,
			getSanPhamById:getSanPhamById,
			addReviewBySanPhamId:addReviewBySanPhamId,
			gioHangByUserEmail:gioHangByUserEmail,
			addGioHangByUserEmail:addGioHangByUserEmail
		};
	}
})();