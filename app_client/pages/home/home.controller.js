(function(){
	angular.module('QuaLuuNiemApp').controller('homeCtr',homeCtr);

	function homeCtr(dataCRUD){

		var vm=this;
		vm.buttonStatus=true;
		vm.message='Đang load sản phẩm...';
		vm.xemThemMessage='';

		dataCRUD.getSanPhamByDate(12)
		.then(function(respone){
			//alert(JSON.stringify(respone));
			vm.message=respone.data.length>0 ? "" :"Không có sản phầm nào";
			vm.title='Sản phẩm mới';
			vm.data={
				sanphams:respone.data.sanphams,
				sanphamcomments:respone.data.sanphamcomments,
				sanphamratings:respone.data.sanphamratings
			};
			vm.message='';
		},function(err){
			console.log(err);
		});
		
		vm.xemThem=function(){

			vm.xemThemMessage='Đang load sản phẩm...';
			var currentSoLuong=vm.data.sanphams.length;
			dataCRUD.xemThemSanPhamByThoiGian(currentSoLuong)
			.then(function(respone){
				for(var i=0;i<respone.data.sanphams.length;i++){
					vm.data.sanphams.push(respone.data.sanphams[i]);
				}
				//alert(JSON.stringify(vm.data.sanphams));
				vm.buttonStatus=respone.data.buttonStatus;
				vm.xemThemMessage='';
			});

		}


	}
})();