(function(){
	angular.module('QuaLuuNiemApp').controller('homeCtr',homeCtr);

	function homeCtr(dataCRUD){

		var vm=this;

		vm.message='Đang load sản phẩm...';

		dataCRUD.getSanPhamByDate(20)
		.then(function(respone){
			//alert(JSON.stringify(respone));
			vm.message=respone.data.length>0 ? "" :"Không có sản phầm nào";
			vm.title='Sản phẩm mới';
			vm.data={sanphams:respone.data};
			vm.message='';
		},function(err){
			console.log(err);
		});
		
		
	}
})();