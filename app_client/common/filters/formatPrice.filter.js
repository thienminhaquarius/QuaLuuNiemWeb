(function(){
	angular.module('QuaLuuNiemApp').filter('formatPrice',formatPrice);

	var _isNumberic=function(n)
	{
		return !isNaN(parseInt(n))&&isFinite(n);
	}
	function formatPrice($filter){
		return function(price){
			var priceChange,unit;
			if(_isNumberic(price)){
				priceChange=price;
				unit=' đ'
				if(priceChange<10000)
				{
					return priceChange+unit;
				}
				else
				{
					priceChange=$filter('currency')(priceChange,'',0);
					return priceChange+unit;
				}

			}else
			{
				return '?';
			}
		}
	}


})();