(function(){
	angular.module('QuaLuuNiemApp').controller('navigationCtr',navigationCtr);

	function navigationCtr(authentication,$location,$rootScope,dataCRUD){
		var vm=this;
		$rootScope.gioHang=0;
		//tao fake user su dung khi nguoi dung chua dang nhap
		$rootScope.fakeUser={
			gioHang:[]
		};
		//check loggin
		$rootScope.isLoggedIn=authentication.isLoggedIn();
		$rootScope.currentUser=authentication.currentUser();

		//Khoi tao gio hang
		if(!$rootScope.isLoggedIn){ // chua dang nhap thi dung fakeUser
			$rootScope.gioHang=$rootScope.fakeUser.gioHang.length;

		}else{	// da dang nhap thi dung user that
			dataCRUD.gioHangByUserEmail($rootScope.currentUser.email)
			.then(function(respone){
				$rootScope.gioHang=respone.data.gioHang.length;
			});
		}
		$rootScope.currentPath=$location.path();
		vm.logout=function(){
			authentication.logout();
			$rootScope.isLoggedIn=authentication.isLoggedIn();
			$rootScope.gioHang=$rootScope.fakeUser.gioHang.length;
			$rootScope.currentUser=authentication.currentUser();
			$location.path('/');
		};
	}
})();