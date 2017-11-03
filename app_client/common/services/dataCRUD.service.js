(function(){
	angular.module('QuaLuuNiemApp').service('dataCRUD',dataCRUD);
	function dataCRUD($http)
	{
		var getSanPhamByDate=function(soluong){
			return $http.get('/api/home?soluong='+soluong);
		};

		return {
			getSanPhamByDate:getSanPhamByDate
		};
	}
})();