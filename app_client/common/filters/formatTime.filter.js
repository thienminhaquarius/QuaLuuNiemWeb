(function(){
	angular.module('QuaLuuNiemApp').filter('formatTime',formatTime);
	function formatTime(){
		return function(inputtime){
			//giay thoi gian cua can tinh
			var inputTime=parseInt(Date.parse(inputtime)/1000);
			//giay cua thoi gian hien tai
			var currentTime=parseInt(Date.now()/1000);
			var distance=currentTime - inputTime;

			if(distance<60){
				return 'vài giây trước';
			}
			if(distance<3600){
				var phut= parseInt(distance/60);
				return phut + ' phút trước';
			}
			if(distance<86400){
				var gio=parseInt(distance/3600);
				return gio +' giờ trước';
			}
			if(distance<604800){
				var ngay=parseInt(distance/86400);
				return ngay+' ngày trước';
			}

			if(true){
				var tuan=parseInt(distance/604800);
				return tuan+' tuần trước';
			}
		}
	}
})();