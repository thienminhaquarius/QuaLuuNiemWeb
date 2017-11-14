(function(){
	angular.module('QuaLuuNiemApp').controller('navigationCtr',navigationCtr);

	function navigationCtr(authentication,$location,$rootScope){
		var vm=this;
		$rootScope.isLoggedIn=authentication.isLoggedIn();
		$rootScope.currentUser=authentication.currentUser();

		$rootScope.currentPath=$location.path();
		vm.logout=function(){
			authentication.logout();
			$rootScope.isLoggedIn=authentication.isLoggedIn();
			$rootScope.currentUser=authentication.currentUser();
			$location.path('/');
		};
	}
})();