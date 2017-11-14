(function(){
	angular.module('QuaLuuNiemApp').controller('registerCtr',registerCtr);
	//alert('denday');
	function registerCtr($location,authentication){
		var vm=this;
		vm.credentials={
			name:"",
			dienthoai:'',
			email:'',
			password:''
		};
		vm.returnPage=$location.page||'/';
		vm.onSubmit=function(){
			vm.formError="";
			if(!vm.credentials.name||!vm.credentials.email||!vm.credentials.password){
				vm.formError='Bạn cần điền đầy đủ thông tin';
				return false;
			}else
			{
				vm.doRegister();
			}
		};
		vm.doRegister=function(){
			vm.formError='';
			authentication.register(vm.credentials).then(function(respone){
				authentication.saveToken(respone.data.token);
				$location.search('page',null);
				$location.path(vm.returnPage);
			},function(err){
				vm.formError=err.data.message;
			});
		};

	}
})();