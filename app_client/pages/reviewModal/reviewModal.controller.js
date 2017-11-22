(function(){
	angular.module('QuaLuuNiemApp').controller('reviewModalCtr',reviewModalCtr);
	function reviewModalCtr($uibModalInstance,dataCRUD,sanPhamData){
		var vm=this;
		vm.sanPhamData=sanPhamData;
		vm.modal={
			cancel:function(){
				$uibModalInstance.dismiss('cancel');
			},
			close:function(result){
				$uibModalInstance.close(result);
			}
		};
		vm.onSubmit=function(){
			vm.formError="";
			if(!vm.formData.rating||!vm.formData.reviewText){
				vm.formError="Bạn chưa đánh gia hoặc nhập bình luận ";
				return false;
			}else
			{
				vm.doAddReview(vm.sanPhamData.sanPhamId,vm.formData);
			}
		};
		vm.doAddReview=function(sanphamid,formData){
			dataCRUD.addReviewBySanPhamId(sanphamid,{
				rating:formData.rating,
				reviewText:formData.reviewText
			}).then(function(respone){
				vm.modal.close(respone.data);
			},function(err){
				vm.formError="Có lỗi xảy ra, bình luận chưa được lưu, thử lại sau!";
			});
			return false;
		};
	}
})();