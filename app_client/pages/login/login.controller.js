(function(){
	angular.module('QuaLuuNiemApp').controller('loginCtr',loginCtr);
	function loginCtr($location,authentication,$rootScope,dataCRUD){
		var vm=this;

		vm.credentials={
			email:'',
			password:''
		};
		vm.returnPage=$location.search().page||'/';
		vm.onSubmit=function(){
			vm.formError="";
			if(!vm.credentials.email||!vm.credentials.password)
			{
				vm.formError="Email hoặc mật khẩu chưa được nhập";
				return false;
			}else
			{
				vm.doLogin();
			}
		};

		vm.doLogin=function(){
			vm.formError="";
			authentication.login(vm.credentials)
			.then(function(respone){
				//login thanh cong updata cac gia tri
				authentication.saveToken(respone.data.token);
				$location.search('page',null);
				$location.path(vm.returnPage);
				$rootScope.isLoggedIn=authentication.isLoggedIn();
				$rootScope.currentUser=authentication.currentUser();
				dataCRUD.gioHangByUserEmail($rootScope.currentUser.email)
				.then(function(respone){
					$rootScope.gioHang=respone.data.gioHang.length;
					//alert($rootScope.gioHang);
				});
			},function(err){
				vm.formError=err.data.message;
			});
		};
	}
})();