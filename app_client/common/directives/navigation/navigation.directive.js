(function(){
	angular.module('QuaLuuNiemApp').directive('navigation',navigation);
	function navigation(){
		return {
			restrict:'EA',
			templateUrl:'/common/directives/navigation/navigation.template.html'
		}
	}
})();