(function(){
	angular.module('QuaLuuNiemApp').controller('gioHang',gioHang);
	function gioHang($routeParams,dataCRUD,$location,authentication,$rootScope){
		$rootScope.currentPath=$location.path();
		var vm=this;
		//san pham
		vm.isLoggedIn=authentication.isLoggedIn();
		var data1=JSON.stringify(["5a33a913ceb70510d49c9673","5a33a8cbceb70510d49c9672" ,"5a33a894ceb70510d49c9671"]);
		var data={arrayHang:data1};
		dataCRUD.xemGioHang(data)
		.then(function(respone){
			vm.sanphams=respone.data;
			//alert('den day1');
		},function(err){
			//alert('den day2');
			console.log(err);
		});

	
		

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