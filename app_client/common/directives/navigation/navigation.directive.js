(function(){
	angular.module('QuaLuuNiemApp').directive('navigation',navigation);
	//alert('denday');
	function navigation(){
		return {
			restrict:'EA',
			templateUrl:'/common/directives/navigation/navigation.template.html',
			controller:'navigationCtr',
			controllerAs:'navvm'
			
		};
	}
})();