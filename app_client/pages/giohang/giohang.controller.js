(function(){
	angular.module('QuaLuuNiemApp').controller('gioHang',gioHang);
	function gioHang($routeParams,dataCRUD,$location,authentication,$rootScope){
		$rootScope.currentPath=$location.path();
		var vm=this;
		//san pham
		vm.isLoggedIn=authentication.isLoggedIn();
		
		if(!vm.isLoggedIn){	// Chưa đăng nhập, xử dụng fake user
			
			var data1=JSON.stringify($rootScope.fakeUser.gioHang);
			var data={arrayHang:data1};
			dataCRUD.xemGioHang(data)
			.then(function(respone){
				vm.sanphams=respone.data;
				//alert('den day1');
			},function(err){
				//alert('den day2');
				console.log(err);
			});
		}else{// đã đăng nhập
			var user=authentication.currentUser();
			dataCRUD.gioHangByUserEmail(user.email)
			.then(function(respone){
				var data1=JSON.stringify(respone.data.gioHang);
				var data={arrayHang:data1};
				dataCRUD.xemGioHang(data)
				.then(function(respone){
					vm.sanphams=respone.data;
					//alert('den day1');
				},function(err){
					//alert('den day2');
					console.log(err);
				});

			},function(err){
				console.log(err);
			});
		}
		

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