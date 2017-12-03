(function(){
	angular.module('QuaLuuNiemApp').controller('sanphamtheoloaiCtr',sanphamtheoloaiCtr);
	function sanphamtheoloaiCtr($routeParams,dataCRUD,$location,$rootScope,authentication){
		$rootScope.currentPath=$location.path();
		var vm=this;
		vm.message='Đang load sản phẩm...';
		vm.xemThemMessage='';
		vm.loaiSanPham=$routeParams.tenloaisanpham;
		vm.buttonStatus=true;

		dataCRUD.getSanPhamByLoai(vm.loaiSanPham,0)
		.then(function(respone){
			//alert(JSON.stringify(respone.data.sanphams));
			vm.data={
				sanphams:respone.data.sanphams
			}
			
			vm.buttonStatus=respone.data.buttonStatus;
			vm.message='';
		});
		vm.xemThemHang=function(){
			var currentSoLuong=vm.data.sanphams.length;
			vm.xemThemMessage='Đang load sản phẩm...';
			dataCRUD.getSanPhamByLoai(vm.loaiSanPham,currentSoLuong)
			.then(function(respone){
				for(var i=0;i<respone.data.sanphams.length;i++){
					vm.data.sanphams.push(respone.data.sanphams[i]);
				}
				//alert(JSON.stringify(vm.data.sanphams));
				vm.buttonStatus=respone.data.buttonStatus;
				vm.xemThemMessage='';
			});
		}

	}
})();