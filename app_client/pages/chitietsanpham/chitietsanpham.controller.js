(function(){
	angular.module('QuaLuuNiemApp').controller('chitietsanphamCtr',chitietsanphamCtr);
	function chitietsanphamCtr($routeParams,$uibModal,dataCRUD,$location,$rootScope,authentication){
		//update curerent path
		$rootScope.currentPath=$location.path();
		var vm=this;
		vm.message='Đang load sản phẩm...';
		vm.sanphamid=$routeParams.sanphamid;
		vm.isLoggedIn=authentication.isLoggedIn();

		dataCRUD.getSanPhamById(vm.sanphamid)
		.then(function(respone){
			vm.sanpham=respone.data;
			vm.title=vm.sanpham.tenSanPham;
		},function(err){
			console.log(err);
		});
		vm.popupReviewForm=function(){
			var modalInstance=$uibModal.open({
				templateUrl:'/pages/reviewModal/reviewModal.view.html',
				controller:'reviewModalCtr',
				controllerAs:'vm',
				resolve:{
					sanPhamData: function(){
						return {
							sanPhamId:vm.sanphamid,
							sanPhamName:vm.sanpham.tenSanPham
						};
					}
				}
			});
			// comment tra ve tu reviewModalCtr
			modalInstance.result.then(function(data){
				vm.sanpham.reviews.push(data);
			});
		}
	}
})();