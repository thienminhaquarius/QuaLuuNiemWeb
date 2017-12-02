(function(){
	angular.module('QuaLuuNiemApp').controller('muaNgay',muaNgay);
	function muaNgay($routeParams,dataCRUD,$location,authentication,$rootScope){
		$rootScope.currentPath=$location.path();
		var vm=this;
		//san pham
		vm.isLoggedIn=authentication.isLoggedIn();
		vm.sanphamid=$routeParams.sanphamid;
		vm.soLuong=1;
		vm.tamTinh=0;
		dataCRUD.getSanPhamById(vm.sanphamid)
		.then(function(respone){
			vm.sanpham=respone.data;
			vm.sanpham.message='';
			vm.tamTinh=vm.sanpham.gia*vm.soLuong;
			vm.tongCong=vm.tamTinh;
		},function(err){
			console.log(err);
		});

		vm.giamSanPham=function(){
			if(vm.soLuong>1){
				if(vm.sanpham.message){
					vm.sanpham.message='';
				}
				vm.soLuong=vm.soLuong-1;
				vm.tamTinh=vm.sanpham.gia*vm.soLuong;
				vm.tongCong=vm.tamTinh;
			}
		};
		var toiDa=5;
		vm.tangSanPham=function(){
			if(vm.soLuong==toiDa){
				return vm.sanpham.message='Bạn chỉ có thể đặt mua tối đa '+toiDa +' sản phẩm';
			}
			if(vm.soLuong<toiDa){
				vm.soLuong=vm.soLuong+1;
				vm.tamTinh=vm.sanpham.gia*vm.soLuong;
				vm.tongCong=vm.tamTinh;
			}
		};

		//thong tin giao hang
		vm.formData={
			name:'',
			email:'',
			dienThoai:'',
			diaChi:'',
			hinhThucThanhToan:'',
			message:''
		}
		if(vm.isLoggedIn){
			var user=authentication.currentUser();
			vm.formData.name=user.name;
			vm.formData.email=user.email;
		}

	}
})();