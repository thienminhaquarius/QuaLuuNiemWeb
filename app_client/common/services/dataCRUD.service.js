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

		return {
			getSanPhamByDate:getSanPhamByDate,
			getSanPhamById:getSanPhamById,
			addReviewBySanPhamId:addReviewBySanPhamId
		};
	}
})();