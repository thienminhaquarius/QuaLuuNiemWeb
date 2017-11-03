(function(){
	angular.module('QuaLuuNiemApp').directive('slider',slider);
	function slider(){
		return {
			restrict:'EA',
			templateUrl:'/common/directives/slider/slider.template.html',
			controller:'sliderCtr',
			controllerAs:'slide'
		};
	}
})();