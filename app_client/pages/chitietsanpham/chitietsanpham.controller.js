(function(){
	angular.module('QuaLuuNiemApp').controller('chitietsanphamCtr',chitietsanphamCtr);
	function chitietsanphamCtr($routeParams,dataCRUD,$location,$rootScope){
		//update curerent path
		$rootScope.currentPath=$location.path();
		var vm=this;
		vm.message='Đang load sản phẩm...';
		vm.sanphamid=$routeParams.sanphamid;

		dataCRUD.getSanPhamById(vm.sanphamid)
		.then(function(respone){
			vm.sanpham=respone.data;
			vm.title=vm.sanpham.tenSanPham;
		},function(err){
			console.log(err);
		});
	}
})();