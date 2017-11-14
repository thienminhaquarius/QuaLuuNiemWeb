(function(){
	angular.module('QuaLuuNiemApp').service('authentication',authentication);

	function authentication($http,$window){
		var saveToken=function(token){
			$window.localStorage['QuaLuuNiemApp-token']=token;

		};
		var getToken=function(){
			return $window.localStorage['QuaLuuNiemApp-token'];
		};

		var isLoggedIn=function(){
			var token=getToken();
			//alert(JSON.stringify(token));
			if(token)
			{
				var payload=JSON.parse($window.atob(token.split('.')[1]));
				//alert(JSON.stringify(payload));
				return payload.exp>Date.now()/1000;
			}else
			{
				return false;
			}
		};
		var currentUser=function(){
			if(isLoggedIn()){
				var token=getToken();
				var payload=JSON.parse($window.atob(token.split('.')[1]));
				return {
					email:payload.email,
					name:payload.name
				};
			}
		};

		var register=function(user){
			return $http.post('/api/register',user);
		};
		var login=function(user){
			return $http.post('/api/login',user);
		};
		var logout =function(){
			$window.localStorage.removeItem('QuaLuuNiemApp-token');
		};	
		return {
			saveToken:saveToken,
			getToken:getToken,
			register:register,
			login:login,
			logout:logout,
			currentUser:currentUser,
			isLoggedIn:isLoggedIn
		};
	}

})();