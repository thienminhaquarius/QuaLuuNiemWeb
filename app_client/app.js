(function(){
angular.module('QuaLuuNiemApp',['ngRoute']);

var config=function($routeProvider,$locationProvider)
{
	$routeProvider
	.when('/',{
		templateUrl:'/pages/home/home.view.html',
		controller:'homeCtr',
		controllerAs:'vm'
	});

	$locationProvider.html5Mode({
		enabled:true,
		requireBase:false
	});
};


angular.module('QuaLuuNiemApp').config(['$routeProvider','$locationProvider',config]);
})();