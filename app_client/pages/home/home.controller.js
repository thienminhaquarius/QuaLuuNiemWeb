(function(){
	angular.module('QuaLuuNiemApp').controller('homeCtr',homeCtr);

	function homeCtr(dataCRUD){
		var vm=this;

		vm.pageHeader={title:'Sản phẩm mới'};

		dataCRUD.getSanPhamByDate(20)
		.then(function(respone){
			//alert(JSON.stringify(respone));
			vm.data={sanphams:respone.data};
		},function(err){
			console.log(err);
		});
		
		
	}
})();