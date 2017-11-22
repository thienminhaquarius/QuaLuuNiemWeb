(function(){
angular.module('QuaLuuNiemApp',['ngRoute','ui.bootstrap']);

var config=function($routeProvider,$locationProvider)
{
	$routeProvider
	.when('/',{
		templateUrl:'/pages/home/home.view.html',
		controller:'homeCtr',
		controllerAs:'vm'
	})
	.when('/login',{
		templateUrl:'/pages/login/login.view.html',
		controller:'loginCtr',
		controllerAs:'vm'
	})
	.when('/register',{
		templateUrl:'/pages/register/register.view.html',
		controller:'registerCtr',
		controllerAs:'vm'
	})
	.when('/sanpham/:sanphamid',{
		templateUrl:'/pages/chitietsanpham/chitietsanpham.view.html',
		controller:'chitietsanphamCtr',
		controllerAs:'vm'
	});
	;

	$locationProvider.html5Mode({
		enabled:true,
		requireBase:false
	});
};

angular.module('QuaLuuNiemApp').config(['$routeProvider','$locationProvider',config]);
})();