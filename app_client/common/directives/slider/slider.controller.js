(function(){
	angular.module('QuaLuuNiemApp').controller('sliderCtr',sliderCtr);

	function sliderCtr($interval){
		var vm=this;
		vm.thanhtoan='/images/thanhtoan/thanhtoan.jpg';
		vm.slider='/images/slider/slide1.png';
		vm.slideToggle=true;
		$interval(function(){
			if(vm.slideToggle)
			{
				vm.slider='/images/slider/slide2.png';
				vm.slideToggle=true;
			}else
			{
				vm.slider='/images/slider/slide1.png';
				vm.slideToggle=true;
			}
		},3000);
	}
})();