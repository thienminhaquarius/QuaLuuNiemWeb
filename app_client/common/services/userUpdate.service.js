(function(){
	angular.module('QuaLuuNiemApp').service('userUpdate',userUpdate);
	function userUpdate(authentication){

		this.user=authentication.currentUser();

		this.update=function(){
				
		}


	}
})();