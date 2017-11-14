(function(){
	angular.module('QuaLuuNiemApp').service('dataCRUD',dataCRUD);
	function dataCRUD($http)
	{
		var getSanPhamByDate=function(soluong){
			return $http.get('/api/home?soluong='+soluong);
		};

		var getSanPhamById=function(idsanpham){
			return $http.get('/api/sanpham/'+idsanpham);
		};

		return {
			getSanPhamByDate:getSanPhamByDate,
			getSanPhamById:getSanPhamById
		};
	}
})();