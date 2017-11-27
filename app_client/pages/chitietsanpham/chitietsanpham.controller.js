(function(){
	angular.module('QuaLuuNiemApp').controller('chitietsanphamCtr',chitietsanphamCtr);
	function chitietsanphamCtr($routeParams,$uibModal,dataCRUD,$location,$rootScope,authentication){
		//update curerent path
		$rootScope.currentPath=$location.path();
		var vm=this;
		vm.message='Đang load sản phẩm...';
		vm.sanphamid=$routeParams.sanphamid;
		vm.disable=false;
		vm.isLoggedIn=authentication.isLoggedIn();

		dataCRUD.getSanPhamById(vm.sanphamid)
		.then(function(respone){
			vm.sanpham=respone.data;
			vm.title=vm.sanpham.tenSanPham;
		},function(err){
			console.log(err);
		});

		vm.like=function(){
			vm.disable=true;
			dataCRUD.addLike(vm.sanphamid)
			.then(function(respone){
				vm.sanpham.likes=respone.data;

			});
		}
		//them san pham vao gio hang
		vm.themVaoGioHang=function(){
			if(!vm.isLoggedIn){	//chua dang nhap su dung fakeUser
				//check san pham da co trong gio hang chua
				if($rootScope.fakeUser.gioHang.indexOf(vm.sanphamid)!=-1)
				{
					alert('Sản phẩm này đã có trong giỏ hàng rồi!');
					return;
				}
				//update gio hang cua fakeuser
				$rootScope.fakeUser.gioHang.push(vm.sanphamid);
				//update gioHang
				$rootScope.gioHang=$rootScope.fakeUser.gioHang.length;

			}else{	// dang dang nhap su dung user that
				dataCRUD.addGioHangByUserEmail(authentication.currentUser().email,{
					idSanPham:vm.sanphamid
				}).then(function(respone){
					$rootScope.gioHang=respone.data.length;
				},function(err){
					if(err.data===-1){
						alert('Sản phẩm này đã có trong giỏ hàng rồi!');
						return false;
					}
				});
			}
		}


		//popup comment
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