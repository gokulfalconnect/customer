

		server   = 'http://www.falconnect.in/restaurantdemo/public/api/';

	//	server = 'http://localhost/falconnect/falconnectwebsite/restaurantdemo/public/api/';
	
	//	server_local = 'http://localhost/falconnect/falconnectwebsite/restaurantdemo/public/api/';
	   
	  server_upload = '52.221.57.201/dev/public/doApitestDocument'
	
		  
		
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope,$state, $ionicSideMenuDelegate,  $ionicModal, 
 $ionicHistory, $ionicLoading, $http, $ionicPopup,$ionicPlatform,$ionicHistory) {
//$rootScope.is_cart = '0';
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
 
  
  
  if(window.localStorage.getItem('user_id') == null || window.localStorage.getItem('user_id') == undefined || window.localStorage.getItem('user_id') == " " || window.localStorage.getItem('user_id') == '' || window.localStorage.getItem('user_id') == ' ' || window.localStorage.getItem('user_id') == "")
  {
	 
	  
	  $rootScope.user_status = 0;
  }
  else
  {
	  
	  
	 // alert("user id="+window.localStorage.getItem('user_id'));
	 
	  $rootScope.user_status = 1;
  }
  
  
  
    $scope.userdata = {};
  
  $scope.menu_click = function()
  {
	  
  $scope.userdata.app_version = window.localStorage.getItem('app_version');
 
  $scope.userdata.name = window.localStorage.getItem('user_name');
  $scope.userdata.phone = window.localStorage.getItem('user_phone');
  $scope.userdata.image = window.localStorage.getItem('user_image');
  
  $scope.userdata.branch_name = window.localStorage.getItem('branch_name');
  
  if(window.localStorage.getItem('balance_amount')!=undefined)
  {
	  
	   var confirmPopup = $ionicPopup.confirm({
       title: 'Coupon',
       template: 'If you leave from this page the applied coupon will not be available'
     });
     confirmPopup.then(function(res) {
       if(res) {
		   
        window.localStorage.removeItem('balance_amount');
		
		window.localStorage.removeItem('coupon_amt');
		
		document.getElementById('offer').style.display="none";
		
		document.getElementById('apply').style.display="block";
		
		$scope.total_amount = window.localStorage.getItem('original_amount');
		
		$ionicSideMenuDelegate.toggleLeft();
		$state.go($state.current, {}, {reload: true});
		
       } else {
         $ionicSideMenuDelegate.toggleLeft();
       }
     });
  }
  
  }
  
 // alert("name="+window.localStorage.getItem('user_name'));
  

  
 

  
   $scope.filterTypeData = {'foodList':'','pricelist':'','ratinglist':''};
  
      $scope.foodList = [
    { text: "Veg", value: "veg" },
    { text: "Non-Veg", value: "nonveg" },
    { text: "Both", value: "both" }
   
  ];
  
    $scope.pricelist = [
    { text: "Low To High", value: "lth" },
    { text: "High To Low", value: "htl" }
    
   
  ];
  
   $scope.ratinglist = [
    { text: "sort by rating", value: "sr" },
    { text: "4*", value: "4" }
    
   
  ];
  
  
  
  
  
  
	
	$scope.filterdata = {};
  
  $scope.filter_modal = function()
  {
	 // $scope.filterTypeData.foodList = [];
		//  $scope.filterTypeData.pricelist = [];
		//   $scope.filterTypeData.ratinglist = [];
		
		if(window.localStorage.getItem('user_id') == null || window.localStorage.getItem('user_id') == undefined || window.localStorage.getItem('user_id') == '')
		{
			var alertPopup = $ionicPopup.alert({
         title: 'Login',
         template: 'Please login to proceed'
      });
			$state.go('app.index');
		}
		else
		{
			 $ionicModal.fromTemplateUrl('templates/filter.html', {
						scope: $scope
					  }).then(function(modal) {
						  
							
							$scope.modal = modal;
							$scope.modal.show();
														
					  });
		}
		   
	 
  }
  
  $scope.goBack = function()
  {
	  $ionicHistory.goBack();
  }
  
  	$scope.closeModal =  function()
	 {
		  $scope.modal.remove();
	 }
	 
	
  $scope.filter_Type = [];
  
	 
	 $scope.filter_submit = function()
	 
	 
	 {
		 //alert(JSON.stringify($scope.filterTypeData));
		 
		$scope.filterTypeData.customer_id = window.localStorage.getItem('user_id');
		 
		if($scope.filterTypeData.foodList=="" && $scope.filterTypeData.pricelist=="" && $scope.filterTypeData.ratinglist=="")
		
		{
			
			
		//	alert("Select any option and proceed");
		
		var alertPopup = $ionicPopup.alert({
         title: '',
         template: 'Select any option and proceed'
      });
			
		}
		else 
		{
			window.localStorage['foodList'] = angular.toJson($scope.filterTypeData.foodList)
			window.localStorage['pricelist'] = angular.toJson($scope.filterTypeData.pricelist)
			window.localStorage['ratinglist'] = angular.toJson($scope.filterTypeData.ratinglist)
			
			
			//$scope.filter_Type = $scope.filterTypeData.foodList+","+$scope.filterTypeData.pricelist+","+$scope.filterTypeData.ratinglist; 
			
			//alert("Filter Applied");
			
			if(window.localStorage.getItem('restaurant_id') == null || window.localStorage.getItem('restaurant_id') == undefined)
			{
				
				$scope.filterTypeData.restaurant_id = 1;
				
			}
			else
			{
				$scope.filterTypeData.restaurant_id = window.localStorage.getItem('restaurant_id');
			}
			
			//alert(JSON.stringify($scope.filterTypeData));
			
			$ionicLoading.show();
			
	$http({
								url: server+'doFilteritems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
								
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.filterTypeData),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
									
								//alert("res="+JSON.stringify(response));
								
								//$scope.menu_items = response.Filtermenus;
								
								$rootScope.filter_value = 1;
								
								window.localStorage['filterdata'] = angular.toJson(response);
								
								$state.go($state.current, {}, {reload: true});	
								
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
							
									
								});
				
			  
			
			

			$scope.modal.remove();
			
			//window.localStorage.setItem('filter_value','aaaa');
			
		//	$state.go('app.food_menu');
		//	$state.go($state.current, {}, {reload: true});
			
		}
		
		
		
		
	 }
	 
	 
	 $scope.filter_clear = function()
	 {
		 $rootScope.filter_value = 0;
		 $scope.filterTypeData.foodList = [];
		  $scope.filterTypeData.pricelist = [];
		   $scope.filterTypeData.ratinglist = [];
		   //$scope.modal.remove();
		  // $state.go($state.current, {}, {reload: true});	
		   
	 }
  
  $scope.click = function()
  {
	  
	  alert("login");
  }
  
  $scope.close_filter = function()
  {
	  $scope.modal.remove();
	  $state.go($state.current, {}, {reload: true});	
  }
  
  $scope.logout = function()
  {
	  
	
	  
	  $ionicLoading.show({
								  template: 'Logging out...'
								});
	  
	/*  $ionicLoading.show({
								  template: 'Logging out...'
								});
	  
	  
	  facebookConnectPlugin.logout(function(){
		  
		 // alert("facebook logout");
							
						 $ionicLoading.hide();
						 
						 window.localStorage.setItem('user_id','');
						  						  
		 $ionicHistory.clearCache(); 
		
		$ionicHistory.clearHistory();
		
		
		$state.go('app.index');
		

	},
	function(fail){
		
						  			 $ionicLoading.hide();		  
						 window.localStorage.setItem('user_id','');
						  
						   $ionicHistory.clearCache(); 
						   
		          $ionicHistory.clearHistory();
				 
		         $state.go('app.index');
						});
						
						
		window.plugins.googleplus.logout(
		
    function (msg) {
		
   //  alert("gmail logout");
	 $ionicLoading.hide();		  
						 window.localStorage.setItem('user_id','');
						  
						   $ionicHistory.clearCache(); 
						   
		          $ionicHistory.clearHistory();
				 
		         $state.go('app.index');
    }
);
						
	  
	  */
	  
	  $rootScope.user_status = 0;
	  
	  //$rootScope.cart_qty = 0;
	  
	  window.localStorage.setItem('user_id','');
	  
	  $ionicHistory.clearCache(); 
		
		$ionicHistory.clearHistory();
		
		$ionicLoading.hide();
		
		$ionicSideMenuDelegate.toggleLeft();
	  
	  $state.go('app.index');
	  
	  
  }

  $scope.go_profile = function()
  {
	  
	  $state.go('app.profile', {}, { reload: true });
	   $ionicSideMenuDelegate.toggleLeft();
  }
  
  $scope.go_login = function()
  {
	  $state.go('app.index');
	  $ionicSideMenuDelegate.toggleLeft();
  }

  
})

.controller('IndexCtrl', function($scope, $stateParams, $ionicPlatform, $ionicSideMenuDelegate,$state, $ionicModal,$rootScope, $ionicLoading,$http,$ionicHistory,$location,$ionicPopup) {
	
	 /*$ionicPlatform.registerBackButtonAction(function (event) {
			event.preventDefault();
			}, 100);*/
			
			$ionicPlatform.registerBackButtonAction(function (event) {
			
						
  if($state.current.name=="app.index"){
    navigator.app.exitApp(); 
  }
  else {
    navigator.app.backHistory();
  }
}, 100);
	
	$rootScope.is_cart = '0';
	$rootScope.home_page = '0';
	
	$rootScope.back_show ='0';
	
	$rootScope.display_cart = '0';
	
	$ionicSideMenuDelegate.canDragContent(false);
	
	
	$scope.fb_login = function()
	{
		
	}
	
	$scope.logindata = {};
	  
	  $scope.registerdata = {};
	  
	  $scope.frgtpwd = {};
	  
	  $scope.user_login = function()
	  {
		
		  
		  if($scope.logindata.email == undefined || $scope.logindata.password == undefined)
		  {
			 // alert("All the fields are required");
			 
					 var alertPopup = $ionicPopup.alert({
				 title: 'Required Fields',
				 template: 'All the fields are required'
			  });
		  }
		  
		  else
		  {
			  $scope.logindata.app_id = window.localStorage.getItem('app_id');
			 
			    $scope.logindata.device_type = window.localStorage.getItem('deviceType');
			  
			  
		  
	$scope.logindata.app_id  = 'KmP9qeRMCp8Fuhsuns4XEH509Fytg8iHDOgvC2BAUKkrbhJhyFBk4unAdFGuPo8HMl9Evl5VYeATFcK5aNBuSX869AzY85uRmJwSg78a3O22w9zfTlLofTWzVmoNFqUl4a';
			
	$scope.logindata.device_type = 'Android';
				
				//alert(JSON.stringify($scope.logindata) );
				
		  $ionicLoading.show();
			
	$http({
								url: server+'customerlogin',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
								
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.logindata),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
									
								//alert(JSON.stringify(response));
								
								$scope.user_data = response;
								if($scope.user_data.Result == '1')
								{
										
								window.localStorage.setItem('user_id',response.customerid);
								window.localStorage.setItem('user_name',response.customername);
								window.localStorage.setItem('user_email',response.email);
								window.localStorage.setItem('user_phone',response.phone);
								window.localStorage.setItem('user_image',response.profile_image);
									$rootScope.user_status = '1';
									
									
								$scope.lastView = $ionicHistory.backView();
								
								
								
								if($scope.lastView != null)
								{
									$scope.lasturl= $scope.lastView.url;
									
									if($scope.lasturl == '/app/intro')
								{
									$state.go('app.home');

								}
								
								else
								{
									$location.path($scope.lasturl);
								}
									
								}
								
								else
								{
									$state.go('app.home');
								}
								
								
								
								
								
								
																
								
								
							
								
								//$state.go('app.home');
								}
								
								else
								{
									//alert(JSON.stringify($scope.user_data.message));
											var alertPopup = $ionicPopup.alert({
											 title: 'Login',
											 template: JSON.stringify($scope.user_data.message)
										  });
		
									
									//$scope.logindata = '';
									document.getElementById('tab-1').checked = true;
								}
								
								//alert("data="+JSON.stringify($scope.user_data.customerid));
							
								//alert("Registration Completed Sucessfully");
								
							//	document.getElementById('tab-1').checked = true;
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
				
			  
		  }
		  	    
		
		  
	/*	 if($scope.logindata.name == '12@gg.com' && $scope.logindata.password == '123')
		  {
			  
			 $ionicLoading.hide();
			  
			  $state.go('app.home');
			  window.localStorage.setItem('user_id','1');
			  
			  $rootScope.user_status = 1;
		  }
		  
		  else
		  {
			  
			  $ionicLoading.hide();
			  
			  alert("Invalid Username Or Password");
		  }  
		 */
		  
		  
	  }
	  
	    $scope.user_register = function()
	  {
		 // alert(JSON.stringify($scope.registerdata));
		  if($scope.registerdata.firstname == undefined  || $scope.registerdata.phoneno == undefined ||
		  $scope.registerdata.email == undefined || $scope.registerdata.password == undefined)
		  {
			 // alert("Plese Enter All The Fields And Proceed");
			 
						 var alertPopup = $ionicPopup.alert({
					 title: 'Required Fields',
					 template: 'Please enter all the fields and proceed'
				  });
		  }
		 
		 else
		 {
			 $scope.registerdata.app_id = window.localStorage.getItem('app_id');
			 
			 $scope.registerdata.device_type = window.localStorage.getItem('deviceType');
			 
			 
	$scope.registerdata.app_id  = 'KmP9qeRMCp8Fuhsuns4XEH509Fytg8iHDOgvC2BAUKkrbhJhyFBk4unAdFGuPo8HMl9Evl5VYeATFcK5aNBuSX869AzY85uRmJwSg78a3O22w9zfTlLofTWzVmoNFqUl4a';
			
		$scope.registerdata.device_type = 'Android';
			 
			 $ionicLoading.show();
			
	$http({
								url: server+'storeCustomer',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.registerdata),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response));
							
								$scope.reg_data = response;
								
								if($scope.reg_data.Result == '1')
								{
									
								//alert(JSON.stringify(response));
								
								//alert("Registration Completed Sucessfully");
								var alertPopup = $ionicPopup.alert({
								 title: 'Registration',
								 template: 'Registration Completed Sucessfully'
							  });
														$scope.registerdata = {};
								document.getElementById('tab-1').checked = true;
								}
								else
								{
									//alert(JSON.stringify($scope.reg_data.message));
									
									var alertPopup = $ionicPopup.alert({
									 title: '',
									 template: JSON.stringify($scope.reg_data.message)
								  });
								}
									
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
								
								var alertPopup = $ionicPopup.alert({
								 title: 'Network Error',
								 template: 'Please try after some time'
							  });
							
									
								});
		 }
		
	
			 
			 
		 }
		 
		  
		  
	
	  
	 
	  
	  $scope.open_forget_pwd = function()
	  {
		  $scope.openmodal();
	  }
	  
	 $scope.openmodal = function()
	{
		$scope.frgtpwd = {};
		$ionicModal.fromTemplateUrl('templates/forgot_password.html', {
						scope: $scope
					  }).then(function(modal) {
						  
							
							$scope.modal = modal;
							$scope.modal.show();
														
					  });
	}
	
	$scope.closeModal =  function()
	 {
		  $scope.modal.remove();
	 }
	 
	 
	 $scope.forgot_pwd = function()
	{
		//$scope.frgtpwd.customer_id = window.localStorage.getItem('user_id');
		
		if($scope.frgtpwd.email == undefined)
		{
			//alert("Please enter a valid email id and proceed");
			var alertPopup = $ionicPopup.alert({
         title: '',
         template: 'Please enter a valid email id and proceed'
      });
		}
		
		else
		{
			$ionicLoading.show();
			
	$http({
								url: server+'doApiforgetpassword',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.frgtpwd),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response.message));
							
								var alertPopup = $ionicPopup.alert({
										 title: '',
										 template: JSON.stringify(response.message)
									  });
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
		}
	}
	 
	 
	 $scope.gmail_login = function()
	 {
		 
		 		 
		window.plugins.googleplus.login(
	{
		
	//	'scopes': 'profile,email ',
      //'webClientId': '1033869034958-0ssllel62d64np64plldc7coo4375gh5.apps.googleusercontent.com', 
      //'offline': true,
		
	},
	
	function (user_data)
	{
		alert("user data");
		
		alert("u="+JSON.stringify(user_data));
	},
        function (msg) {
          
          console.log(msg);
        }
	   
    );
		 
	 }
	 
	 $scope.click_in = function()
	 {
		 $scope.logindata = {};
	 }
	 
	 $scope.click_up = function()
	 {
		 $scope.registerdata = {};
	 }
	
})
.controller('LoginCtrl', function($scope, $stateParams, $state, $rootScope,$ionicPopup) {
	
	$rootScope.is_cart = '0';
	
	$rootScope.home_page = '0';
	$rootScope.back_show ='0';
	
	$rootScope.display_cart = '0';
	
	$scope.logindata = [];
	
	$scope.login_data = function()
	{
		

		if($scope.logindata.password == '123456789' && $scope.logindata.email == 'sample@gmail.com')
		{
			$state.go('app.browse');
			
		}
		else
		{
			alert("WEWEW="+$scope.logindata.password);
			alert("else");
		}
	
	}
	
}).controller('BrowseCtrl', function($scope, $stateParams, $ionicModal, $ionicSideMenuDelegate,$rootScope,$ionicPopup) {
	
	$rootScope.is_cart = '0';
	
	$rootScope.home_page = '0';
	
	$rootScope.back_show ='0';
	
	$scope.forget_pwd = function()
	{
		$scope.openmodal();
	}
	
	$scope.openmodal = function()
	{
		$ionicModal.fromTemplateUrl('templates/forgot_password.html', {
						scope: $scope
					  }).then(function(modal) {
						  
							
							$scope.modal = modal;
							$scope.modal.show();
														
					  });
	}
	
	$scope.closeModal =  function()
	 {
		  $scope.modal.remove();
	 }
	 
	 
	 
	
}).controller('ProfileCtrl', function($scope,$ionicModal,$rootScope,$ionicLoading,$http,$ionicPopup){
	
	$rootScope.is_cart = '0';
	$rootScope.home_page = '0';
	
	$rootScope.back_show ='1';
	
	$rootScope.display_cart = '1';
	
	$scope.profile_details = {};
	
	$scope.langdata = {};
	
		
	$scope.profile_details.customer_id = window.localStorage.getItem('user_id');
	
	$scope.langdata.lang = window.localStorage.getItem('lang');
	
	//alert($scope.langdata.lang);
		
	$scope.change_lang = function()
	{
		window.localStorage.setItem('lang',$scope.langdata.lang);
	}
	
	
	
	 
	 
	 $ionicLoading.show();
			
	$http({
								url: server+'doViewprofile',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.profile_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								$scope.profile_details = response.Customerprofile;	
								
								//alert("re="+response.Customerprofile[0].profile_image);
								
								window.localStorage.setItem('user_image', response.Customerprofile[0].profile_image);
								
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									
									var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
							
									
								});
								
								 $scope.language_list = [
    { text: "SQ", value: "Albanian" },
    { text: "AR", value: "Arabic" },
    { text: "HY", value: "Armenian" },
	 { text: "EU", value: "Basque" },
    { text: "BN", value: "Bengali" },
    { text: "BG", value: "Bulgarian" },
	{ text: "CA", value: "Catalan" },
    { text: "KM", value: "Cambodian" },
    { text: "ZH", value: "Chinese (Mandarin)" },
	 { text: "HR", value: "Croation" },
    { text: "CS", value: "Czech" },
    { text: "DA", value: "Danish" },
	 { text: "NL", value: "Dutch" },
    { text: "EN", value: "English" },
    { text: "ET", value: "Estonian" },
	 { text: "FJ", value: "Fiji" },
    { text: "FI", value: "Finnish" },
    { text: "FR", value: "French" },
	 { text: "KA", value: "Georgian" },
	 { text: "DE", value: "German" },
	 { text: "EL", value: "Greek" },
	 { text: "GU", value: "Gujarati" },
	 { text: "HE", value: "Hebrew" },
	 { text: "HI", value: "Hindi" },
	 { text: "HU", value: "Hungarian" },
	 { text: "IS", value: "Icelandic" },
	  { text: "ID", value: "Indonesian" },
	 { text: "GA", value: "Irish" },
	 { text: "IT", value: "Italian" },
	 { text: "JA", value: "Japanese" },
	 { text: "JW", value: "Javanese" },
	 { text: "KO", value: "Korean" },
	 { text: "LA", value: "Latin" },
	 { text: "LV", value: "Latvian" },
	  { text: "Lt", value: "Lithuanian" },
	 { text: "MK", value: "Macedonian" },
	 { text: "MS", value: "Malay" },
	 { text: "ML", value: "Malayalam" },
	 { text: "MT", value: "Maltese" },
	 { text: "MI", value: "Maori" },
	 { text: "MR", value: "Marathi" },
	 { text: "MN", value: "Mongolian" },
	 { text: "NE", value: "Nepali" },
	 { text: "No", value: "Norwegian" },
	 { text: "FA", value: "Persian" },
	 { text: "PL", value: "Polish" },
	 { text: "PT", value: "Portuguese" },
	 { text: "PA", value: "Punjabi" },
	 { text: "QU", value: "Quechua" },
	 { text: "RO", value: "Romanian" },
	 { text: "RU", value: "Russian" },
	 { text: "SM", value: "Samoan" },
	 { text: "SR", value: "Serbian" },
	 { text: "SK", value: "Slovak" },
	 { text: "SL", value: "Slovenian" },
	 { text: "ES", value: "Spanish" },
	 { text: "SW", value: "Swahili" },
	 { text: "SV", value: "Swedish" },
	 { text: "TA", value: "Tamil" },
	 { text: "TT", value: "Tatar" },
	 { text: "TE", value: "Telugu" },
	 { text: "TH", value: "Thai" },
	 { text: "BO", value: "Tibetan" },
	 { text: "TO", value: "Tonga" },
	 { text: "TR", value: "Turkish" },
	 { text: "UK", value: "Ukranian" },
	 { text: "UR", value: "Urdu" },
	 { text: "UZ", value: "Uzbek" },
	 { text: "VI", value: "Vietnamese" },
	 { text: "CY", value: "Welsh" },
	 { text: "XH", value: "Xhosa" },
   
  ];
	 
	
}).controller('ForgotPwdCtrl', function($scope,$rootScope,$ionicPopup){
	
	$rootScope.is_cart = '0';
	$rootScope.home_page = '0';
	
	$rootScope.display_cart = '0';
	
	
	
	$scope.frgtpwd = [];
	
	
	
	$scope.demo = function()
	{
		alert("demo");
	}
	
}).controller('BookTableCtrl', function($scope, $state, $rootScope,$ionicPopup,$ionicModal,$ionicLoading,$http,$ionicPopup){
	
	$rootScope.is_cart = '0';
	$rootScope.home_page = '0';
	
	$rootScope.back_show = '1';
	
	$rootScope.display_cart = '1';
	
	$scope.bookdata = {};
	
	$scope.timedata = {};
	
	$scope.resto_details = {};
	
	$scope.book_details = {};
	
	$scope.ratedata = {};
	
	$scope.ratedata.qstn3 ='me';
	
	$scope.bookdata.nameofcustomer = window.localStorage.getItem('user_name');
		$scope.bookdata.mobilenum = window.localStorage.getItem('user_phone');
	 
	 $scope.example = {
       // value: new Date(2017, 7, 4),
         currentDate: new Date()
       };
	   
	    $scope.noofseats = [
		
    { text: "1", value: "1" },
	{ text: "2", value: "2" },
	{ text: "3", value: "3" },
	{ text: "4", value: "4" },
	{ text: "5", value: "5" },
	{ text: "6", value: "6" },
	{ text: "7", value: "7" },
	{ text: "8", value: "8" },
	{ text: "9", value: "9" },
	{ text: "10", value: "10" },
	{ text: "11", value: "11" },
	{ text: "12", value: "12" },
	{ text: "13", value: "13" },
	{ text: "14", value: "14" },
	{ text: "15", value: "15" },
	{ text: "16", value: "16" },
	{ text: "17", value: "17" },
	{ text: "18", value: "18" },
	{ text: "19", value: "19" },
	{ text: "20", value: "20" },
	
	
		];
		
		var today = new Date();
				
				
				
				var dd = today.getDate();
				var mm = today.getMonth()+1;
				var yy = today.getFullYear();
				
				var hh = today.getHours();
				var ms = today.getMinutes();
				var ss = today.getSeconds();
				
				$scope.bookdata.booking_date = yy+'-'+mm+'-'+dd+' '+hh+':'+ms+':'+ss;
		
		//$scope.bookdata.booking_date = dd+'-'+mm+'-'+yy;
	 
	  //     var restaurant = window.localStorage['restaurant_details'];
		
	//	$scope.resto_details = angular.fromJson(restaurant);
			
		
		$ionicLoading.show();
			
	$http({
								url: server+'Restaurants',
								method: "GET",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.category),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
						//	alert(JSON.stringify(response));
						
						$scope.restaurant_details = response.restaurant;
						
																					
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
								//	alert("error11="+data);
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
								
							
									
								});
		
		
		$scope.select_branch = function(id,name)
		{
			
			
			$scope.bookdata.branch = name;
			
			window.localStorage.setItem('br_id',id);
			
			$scope.closeModal();
			
			$scope.timedata.restaurant_id = id;
			
			$scope.timedata.customer_id = window.localStorage.getItem('user_id');
			
			$ionicLoading.show();
			
	$http({
								url: server+'doShowRestauranttime',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.timedata),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
						//	alert(JSON.stringify(response));
						
						$scope.timesdata = response.Timeslot;
																					
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
								//	alert("error11="+data);
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
								
							
									
								});
			
			
			
		}
		
			$scope.select_timeslot= function(id,slot)
		{
			$scope.bookdata.booking_time = slot;
			
			window.localStorage.setItem('timeslot_id',id);
			
			$scope.closeModal();
			
						
		}
	
	$scope.book_table = function()
	{
		//alert(JSON.stringify($scope.bookdata));
		
		if($scope.bookdata.branch == undefined || $scope.bookdata.booking_date == undefined || 
		$scope.bookdata.booking_time == undefined || $scope.bookdata.no_fo_seats == undefined
		|| $scope.bookdata.nameofcustomer == undefined || $scope.bookdata.mobilenum == undefined)
		{
			var alertPopup = $ionicPopup.alert({
				title: 'Required',
				template: 'All the fields are required'
				});
		}
		else
		{
			$scope.bookdata.customer_id = window.localStorage.getItem('user_id');
			
			$scope.bookdata.restaurant_id = window.localStorage.getItem('br_id');
			
			$scope.bookdata.booking_time = window.localStorage.getItem('timeslot_id');			
			
			$ionicLoading.show();
			
	$http({
								url: server+'doAddTableBooking',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.bookdata),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
						//	alert(JSON.stringify(response));
						
						var alertPopup = $ionicPopup.alert({
								title: '',
								template: 'Table booking request received'
								});
								
								$state.go('app.booking_history');
																					
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
								//	alert("error11="+data);
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
								
							
									
								});
		}
		
		//$scope.bookdata = null;
	}
	
	
	$scope.open_branch = function()
	{
		$ionicModal.fromTemplateUrl('templates/select_branch.html', {
						scope: $scope
					  }).then(function(modal) {
						  
							
							$scope.modal = modal;
							$scope.modal.show();
														
					  });
		
	}
	
	$scope.open_time = function()
	{
		$ionicModal.fromTemplateUrl('templates/select_time.html', {
						scope: $scope
					  }).then(function(modal) {
						  
							
							$scope.modal = modal;
							$scope.modal.show();
														
					  });
		
	}
	
	
	$scope.closeModal =  function()
	 {
		  $scope.modal.remove();
	 }
	 
	 $scope.me_book = function()
	 {
		$scope.bookdata.nameofcustomer = window.localStorage.getItem('user_name');
		$scope.bookdata.mobilenum = window.localStorage.getItem('user_phone');
	 }
	$scope.some_book = function()
	{
		$scope.bookdata.nameofcustomer = '';
		$scope.bookdata.mobilenum = '';
		
	}
	
}).controller('NotificationCtrl',function($scope, $rootScope,$ionicPopup, $state,$ionicLoading,$http,$ionicPlatform,$ionicHistory){
	
	$rootScope.is_cart = '0';
	$rootScope.home_page = '0';
	$rootScope.back_show = '1';
	
	$rootScope.display_cart = '1';
	
	$scope.notification_items = [];
	
	$ionicPlatform.registerBackButtonAction(function (event) {
	
	
	
	$scope.lastView = $ionicHistory.backView();
	
	
	
	if($scope.lastView == null)
	{
		$state.go('app.home');
	}
	else
	{
		$scope.lasturl= $scope.lastView.url;

	

	if($scope.lasturl == '/app/home' || $scope.lasturl == '/app/index')
								{
									$state.go('app.home');

								}
								
	else if ($scope.lasturl == '/app/food_menu')
			{
					$state.go('app.food_menu');				
			}
	
	else
	{
		navigator.app.backHistory();
	}
	}

	
}, 100);
	
		if(window.localStorage.getItem('user_id')==undefined || window.localStorage.getItem('user_id')==null || window.localStorage.getItem('user_id')=='')
		{
			//alert("Please login to proceed");
			var alertPopup = $ionicPopup.alert({
         title: 'Login',
         template: 'Please login to proceed'
      });
			$state.go('app.index');
		}
	else
	{
		if(window.localStorage.getItem('balance_amount')!=undefined)
		{
			 var confirmPopup = $ionicPopup.confirm({
       title: 'Coupon',
       template: 'If you leave from this page the applied coupon will not be available'
     });
     confirmPopup.then(function(res) {
       if(res) {
		   
		   $scope.notification_items = [];
		   
        window.localStorage.removeItem('balance_amount');
		
		window.localStorage.removeItem('coupon_amt');
						
			$scope.notification_details = {};
		
		$scope.notification_details.customer_id = window.localStorage.getItem('user_id');
		
		$ionicLoading.show();
			
	$http({
								url: server+'doOrdernotification',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.notification_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response));
							
							//$scope.notification_items = response.notification;
							
							
							angular.forEach(response.notification, function(item) {
									
									if(item.message != '')
									{
										$scope.notification_items.push(item);
									}								
												
								console.log($scope.notification_items);
								});
							
																					
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error11="+data);
									var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
							
									
								});
				//$state.go($state.current, {}, {reload: true});
		
       } else {
         $state.go('app.billsummary');
       }
     });
			
		}
		
		else
		{
			 $scope.notification_items = [];
			$scope.notification_details = {};
		
		$scope.notification_details.customer_id = window.localStorage.getItem('user_id');
		
		$ionicLoading.show();
			
	$http({
								url: server+'doOrdernotification',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.notification_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response));
							
							//$scope.notification_items = response.notification;
							
							angular.forEach(response.notification, function(item) {
									
									if(item.message != '')
									{
										$scope.notification_items.push(item);
									}								
										
								console.log($scope.notification_items);
								});
							
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error11="+data);
									var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
							
									
								});
		}
		
		
		
		
		
	}
	
}).controller('FavouritesCtrl', function($scope, $rootScope,$ionicLoading,$http,$state,$ionicPopup,$ionicPlatform,$ionicHistory){
	
	$rootScope.is_cart = '0';
	
		$rootScope.home_page = '0';
		
		$rootScope.back_show = '1';
		
		$rootScope.display_cart = '1';
		
		$scope.favourite_details = {};
		
		$ionicPlatform.registerBackButtonAction(function (event) {
	
	
	
	$scope.lastView = $ionicHistory.backView();
	
	
	
	if($scope.lastView == null)
	{
		$state.go('app.home');
	}
	else
	{
		$scope.lasturl= $scope.lastView.url;

	

	if($scope.lasturl == '/app/home'  || $scope.lasturl == '/app/index')
								{
									$state.go('app.home');

								}
	else if($scope.lasturl == '/app/food_menu')
	{
		$state.go('app.food_menu');
	}
		
	else
	{
		navigator.app.backHistory();
	}
	}

	
}, 100);
		
		
			if(window.localStorage.getItem('user_id')==undefined || window.localStorage.getItem('user_id')==null || window.localStorage.getItem('user_id')=='')
		{
			//alert("Please login to proceed");
			var alertPopup = $ionicPopup.alert({
         title: 'Login',
         template: 'Please login to proceed'
      });
			$state.go('app.index');
		}
		
		else
			
			{
				
				
				if(window.localStorage.getItem('balance_amount')!=undefined)
  {
	  
	   var confirmPopup = $ionicPopup.confirm({
       title: 'Coupon',
       template: 'If you leave from this page the applied coupon will not be available'
     });
     confirmPopup.then(function(res) {
       if(res) {
		   
        window.localStorage.removeItem('balance_amount');
		
		window.localStorage.removeItem('coupon_amt');
		
				
		$scope.favourite_details.customer_id = window.localStorage.getItem('user_id');
		
		
		
		 $ionicLoading.show();
			
	$http({
								url: server+'doFavouritehistory',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.favourite_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response));
							
							$scope.favourite_details = response.Favouritesitems;
							
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error11="+data);
									var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
							
									
								});
		
		
       } else {
		   
          $state.go('app.billsummary');
       }
     });
  }
  
  else
	  
	  {
		  $scope.favourite_details.customer_id = window.localStorage.getItem('user_id');
		
		
		
		 $ionicLoading.show();
			
	$http({
								url: server+'doFavouritehistory',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.favourite_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response));
							
							$scope.favourite_details = response.Favouritesitems;
							
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error11="+data);
									var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
							
									
								});
	  }
				
				
		
		
		
				
			}
		
		
		
					
		
		
	
}).controller('HomeCtrl', function($scope, $rootScope, $cordovaGeolocation,$ionicLoading,$http,$state, $ionicSlideBoxDelegate, $ionicPlatform,$ionicPopup){

	
	 $scope.width=window.screen.width;
	 
	 $scope.getStars = function(rating) {
    // Get the value
    var val = parseFloat(rating);
    // Turn value into number/100
    var size = val/5*100;
    return size + '%';
  }
	//alert("home");
	
	 /*$ionicPlatform.registerBackButtonAction(function (event) {
			event.preventDefault();
			}, 100);*/
	 	// alert("id="+window.localStorage.getItem('user_id'));
		
		$ionicPlatform.registerBackButtonAction(function (event) {
			
						
  if($state.current.name=="app.home"){
    navigator.app.exitApp(); 
  }
  else {
    navigator.app.backHistory();
  }
}, 100);


	if(window.localStorage.getItem('lang') == null)
	{
		
		window.localStorage.setItem('lang','Albanian');
	}
	

   $rootScope.home_page = '1';
	
	$rootScope.is_cart = '0';
	
	  $rootScope.back_show = '0';
	  
	  $rootScope.display_cart = '1';
	  
	  $scope.category = {};
	  
	  $scope.bookdata = {};
	  
	  $scope.branch = {};
	  
	  $scope.restaurant_details = {};
	
	$scope.tabIndex = 0;
	$scope.selectedIndex=0;
	
	$ionicLoading.show();
			
	$http({
								url: server+'Restaurants',
								method: "GET",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.category),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							
						
						$scope.restaurant_details = response.restaurant;
						
						if(window.localStorage.getItem('restaurant_id') == undefined)
						{
							
							$scope.bookdata.branch =  JSON.stringify(response.restaurant[0].id)+','+response.restaurant[0].restaurant_name;
							
							//$scope.bookdata.branch =  JSON.stringify(response.restaurant[0].id);
							
							//alert($scope.bookdata.branch);
							
							window.localStorage.setItem('branch_name',JSON.stringify(response.restaurant[0].restaurant_name));
							
							window.localStorage.setItem('branch_details',$scope.bookdata.branch);
							
							window.localStorage.setItem('restaurant_id',JSON.stringify(response.restaurant[0].id));
							
						}
						else
						{
							
							//$scope.bookdata.branch = window.localStorage.getItem('restaurant_id');
							
							$scope.bookdata.branch = window.localStorage.getItem('branch_details');
							
							
						}
						
						
												
						window.localStorage['restaurant_details'] = angular.toJson(response.restaurant)
													
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
								//	alert("error11="+data);
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
								
							
									
								});
	
	
	if(window.localStorage.getItem('restaurant_id') == null || window.localStorage.getItem('restaurant_id') == undefined)
	{
		
		$ionicLoading.show();
			
	$http({
								url: server+'restaurantshome',
								method: "GET",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.category),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response));
							
							$scope.menu_categories = response.restauranthomecategory;
							
								//$scope.menu_categories = response.restauranthomecategory;
								
								$scope.menu_categories0 = response.restauranthomecategory[0];
								
								$scope.menu_categories1 = response.restauranthomecategory[1];
								
								$scope.menu_categories2 = response.restauranthomecategory[2];
								
								$scope.menu_categories3 = response.restauranthomecategory[3];
								
								$scope.menu_items = response.restauranthomemenuitems;
								
								$scope.home_banners = response.restauranthomebanners;
								
								$ionicSlideBoxDelegate.update();
								
								//alert("ba="+JSON.stringify($scope.home_banners));
								
								//alert("m="+JSON.stringify($scope.home_banners));
								
								//alert("i="+JSON.stringify($scope.menu_items));
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error11="+data);
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
	}
	else
	{
		
		$scope.category.restaurant_id = window.localStorage.getItem('restaurant_id');
		
		
		
		$ionicLoading.show();
			
	$http({
								url: server+'browserestaurants',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.category),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
															
							//alert(JSON.stringify(response));
							
							$scope.menu_categories = response.restauranthomecategory;
							
								//$scope.menu_categories = response.restauranthomecategory;
								
								$scope.menu_categories0 = response.restauranthomecategory[0];
								
								$scope.menu_categories1 = response.restauranthomecategory[1];
								
								$scope.menu_categories2 = response.restauranthomecategory[2];
								
								$scope.menu_categories3 = response.restauranthomecategory[3];
								
								$scope.menu_items = response.restauranthomemenuitems;
								
								$scope.home_banners = response.restauranthomebanners;
								
								$ionicSlideBoxDelegate.update();
										
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								
								
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
											 title: 'Network Error',
											 template: 'Please try after some time'
										  });
									
								});
	}
		 
	
	$scope.tab_click = function(id,index)
	
	{
		
		$scope.selectedIndex=index;
		
		//alert("tabIndex="+tabIndex);
		//$scope.menu_items = {};	
		
		//alert("in="+id);
		
		$scope.category.category_id=id;
		
		
		 $ionicLoading.show();
			
	$http({
								url: server+'CategoriesMenuItems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.category),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response));
							
								$scope.menu_items = response.restaurantmenuitems;
								
								$scope.home_banners = response.restauranthomebanners;
								
								$ionicSlideBoxDelegate.update();
								
								//alert("m="+JSON.stringify($scope.home_banners));
								
								//alert("i="+JSON.stringify($scope.menu_items));
													
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
									
								});
								
								
	}
	
	$scope.click_branch = function(branch)
	{
		//alert("br="+branch);
		$scope.branch_details = branch.split(',');
		
		
		//alert($scope.datas[0]);
		//alert($scope.datas[1]);
		//$scope.branch.restaurant_id = branch;
		$scope.branch.restaurant_id = branch;
		
		$scope.branch.customer_id = window.localStorage.getItem('user_id');
		
		//window.localStorage.setItem('restaurant_id',branch);
		window.localStorage.setItem('restaurant_id',$scope.branch_details[0]);
		
		window.localStorage.setItem('branch_details',branch);
		
		window.localStorage.setItem('branch_name',$scope.branch_details[1]);
		
		$state.go($state.current, {}, {reload: true});	
		
		
		
	/*	if(branch == "adyar")
		{
			$scope.branch.restaurant_id = 1;
			
			window.localStorage.setItem('restaurant_id',$scope.branch.restaurant_id);
			alert(window.localStorage.getItem('restaurant_id'));
			$state.go($state.current, {}, {reload: true});	
			
			
		}
		else if(branch == 'vel')
		{
			$scope.branch.restaurant_id = 7;
			window.localStorage.setItem('restaurant_id',$scope.branch.restaurant_id);
			$state.go($state.current, {}, {reload: true});	
		}
		else if(branch == 'por')
		{
			$scope.branch.restaurant_id = 8;
			window.localStorage.setItem('restaurant_id',$scope.branch.restaurant_id);
			$state.go($state.current, {}, {reload: true});	
		}
		else
		{
			
		}*/
		
		
		
		
	}
	
	$scope.slideHasChanged = function(index)
	{
		
	}
	
	
	
	
}).controller('BranchCtrl', function($scope, $rootScope,$ionicPopup){
	
	$rootScope.is_cart = '0';
	$rootScope.home_page = '0';
	$rootScope.home_page = '0';
	
	$rootScope.display_cart = '1';
	
}).controller('MyOrderCtrl', function($scope, $rootScope,$ionicLoading,$http,$state,$ionicPopup,$ionicPlatform,$ionicHistory,$ionicModal,$cordovaGeolocation){
	
	$scope.width=window.screen.width;
	
	$rootScope.is_cart = '0';
	
	$rootScope.home_page = '0';
	
	$rootScope.back_show = '0';
	
	$rootScope.display_cart = '1';
	
	$scope.past_order_details = {};
	
	$scope.present_order_details = {};
	
	$scope.order_details = {};
	
	$scope.order_items = {};
	
	$scope.driver_item = {};
	
	$scope.reorder_items = {};
	
	$scope.removecart = {};
	
	
	$ionicPlatform.registerBackButtonAction(function (event) {
	
	
	
	$scope.lastView = $ionicHistory.backView();
	
	
	
	if($scope.lastView == null)
	{
		$state.go('app.home');
	}
	else
	{
		$scope.lasturl= $scope.lastView.url;

	

	if($scope.lasturl == '/app/home')
								{
									$state.go('app.home');

								}
								
	else if($scope.lasturl == '/app/index')
	{
		$state.go('app.home');
			
	}
	else
	{
		navigator.app.backHistory();
	}
	}

	
}, 100);
	
		if(window.localStorage.getItem('user_id')==undefined || window.localStorage.getItem('user_id')==null || window.localStorage.getItem('user_id')=='')
		{
			//alert("Please login to proceed");
			var alertPopup = $ionicPopup.alert({
         title: 'Login',
         template: 'Please login to proceed'
      });
			$state.go('app.index');
		}
		
		else
		{
			$scope.past_order_details.customer_id = window.localStorage.getItem('user_id');
	
	$scope.present_order_details.customer_id = window.localStorage.getItem('user_id');
			
			
			
		 $ionicLoading.show();
			
	$http({
								url: server+'orderItemsHistory',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.past_order_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								$scope.past_order_details = response.Customerorders;
							
						//	alert(JSON.stringify(response));
							
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
								
								
								 $ionicLoading.show();
			
	$http({
								url: server+'doGetpresentorders',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.present_order_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								$scope.present_order_details = response.Customerorders;
							
							//alert(JSON.stringify(response));
									
														
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
			
		}
	
	
	
			$scope.ordertab_click = function()
			{

				$state.go($state.current, {}, {reload: true});	
			}		

		$scope.closeModal = function()
			{
				$scope.modal.remove();
			}
	
	$scope.view_items = function(id)
	
	{
		
			
		$ionicModal.fromTemplateUrl('templates/viewitem_modal.html', {
						scope: $scope
					  }).then(function(modal) {
						  
							
							$scope.modal = modal;
							$scope.modal.show();
														
					  });
		
		$scope.order_details.orderid =  id;
	
	
	$scope.order_details.customer_id = window.localStorage.getItem('user_id');
	
	
	 
	 $ionicLoading.show();
	 
	$http({
								url: server+'orderItemsdetails',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.order_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
										//alert("res="+JSON.stringify(response));	

											$ionicLoading.hide();
								
								//alert(JSON.stringify(response));
								
								$scope.order_items = response.CustomerordersItems;
								
								$scope.order_items.total_amount = response.Ordersamount;	
								
								$scope.noSpaces = $scope.order_items[0].order_status_desc;

								$scope.order_items.order_status = $scope.noSpaces.replace(/ /g, '');				
									
									//alert("a="+$scope.order_items.order_status);
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
								
	}
	
			
  
	$scope.reorder_cart = function(id)
	{
		$scope.reorder_items.customer_id = window.localStorage.getItem('user_id');
	  
	  	  
	  $scope.reorder_items.order_id = id;
		
		$ionicLoading.show();
			
	$http({
								url: server+'doreorderitems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.reorder_items),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								//alert(JSON.stringify(response));
								
							//	$scope.profileInfo = response.Customerprofile[0];		
								$state.go('app.cart_details');
								
								
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
												 title: 'Network Error',
												 template: 'Please try after some time'
											  });
																	
									
								});
	}
  
  $scope.reorder = function(id,restro_id,restro_name)
  {
	  
	 
	  
	  window.localStorage.setItem('branch_name',restro_name);
							
	  window.localStorage.setItem('restaurant_id',restro_id);
	  
	  $scope.branch_details =  restro_id+','+restro_name;

		window.localStorage.setItem('branch_details',$scope.branch_details);
	  
	  $scope.reorder_items.customer_id = window.localStorage.getItem('user_id');
	  
	  	  
	  $scope.reorder_items.order_id = id;
	  
	  $ionicLoading.show();
			
	$http({
								url: server+'getCartItemsdetails',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.reorder_items),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								//alert(JSON.stringify(response));
								
									$scope.item_details = response.Cartitems;
									
									if($scope.item_details == 0)
									{
										$scope.reorder_cart(id);
									}
								else
								{
								
									angular.forEach(response.Cartitems, function(value) {
									
									$scope.cart_id = value.cart_id;	
																			
									
									$scope.removecart.customer_id = window.localStorage.getItem('user_id');
		
		$scope.removecart.cart_id = $scope.cart_id;
		
		 $ionicLoading.show();
			
	$http({
								url: server+'doremoveCart',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.removecart),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response.message));
							
																					
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
									
								});
											
								
								});
								
								$scope.reorder_cart(id);
								
								}
								
								
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
												 title: 'Network Error',
												 template: 'Please try after some time'
											  });
																	
									
								});
	  
	  
	  
	/*  */
	
	  
  }
  
  
	
}).controller('EditProfileCtrl', function($scope,$ionicModal,  $state, $rootScope, $ionicActionSheet,$ionicLoading,$http, $cordovaCamera,$ionicPopup){
	
	$rootScope.home_page = '0';
	
	$rootScope.is_cart = '0';
	
	$rootScope.back_show = '1';
	
	$rootScope.display_cart = '1';
	
	$scope.pwd_details = {};
	
	$scope.profileInfo = {};
	
	$scope.image_data = {};
	
	$scope.langdata = {};
	
	$scope.profileInfo.customer_id = window.localStorage.getItem('user_id');
	
	$scope.langdata.lang = window.localStorage.getItem('lang');
	//alert($scope.langdata.lang);
	$ionicLoading.show();
			
	$http({
								url: server+'doViewprofile',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.profileInfo),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								//alert(JSON.stringify(response));
								
								$scope.profileInfo = response.Customerprofile[0];		
								
								
								
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
												 title: 'Network Error',
												 template: 'Please try after some time'
											  });
																	
									
								});
	
	
	$scope.modal_change_password = function()
	{
	
		$ionicModal.fromTemplateUrl('templates/change_password.html', {
						scope: $scope
					  }).then(function(modal) {
						  
							
							$scope.modal = modal;
							$scope.modal.show();
														
					  });
	}
	
	$scope.removeModal =  function()
	 {
		  $scope.modal.remove();
	 }
	 
	 function close_popup()
	 {
		 $scope.modal.remove();
	 }
	 
	 $scope.pwd_change = function()
	 {
		 
		 $scope.pwd_details.customer_id = window.localStorage.getItem('user_id');
		 
		
		 
		 if($scope.pwd_details.oldpassword == undefined || $scope.pwd_details.newpassword == undefined || $scope.pwd_details.confirmpassword == undefined)
		 {
			 //alert("All the fields are required");
			 var alertPopup = $ionicPopup.alert({
         title: 'Required Fields',
         template: 'All the fields are required'
      });
		 }
		 
		 else if($scope.pwd_details.newpassword != $scope.pwd_details.confirmpassword)
		 {
			// alert("Password and Confirm Password not matching");
			var alertPopup = $ionicPopup.alert({
         title: '',
         template: 'Password and Confirm password not matching'
      });
		 }
		 
		 else
		 {
			
			
			 $ionicLoading.show();
			
	$http({
								url: server+'doChangePassword',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.pwd_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
							 
							//alert(JSON.stringify(response.message));
							
							var alertPopup = $ionicPopup.alert({
									 title: '',
									 template: JSON.stringify(response.message)
								  });		
								 
								//
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							 
									//$scope.modal.remove();
								});
			
			
			
		 }
	 }
	 
	 $scope.update_profile = function()
	 {
		 $scope.profileInfo.customer_id = window.localStorage.getItem('user_id');
		 
		 
		 
		 if($scope.profileInfo.firstname == undefined  || $scope.profileInfo.phone == undefined ||
		 $scope.profileInfo.email == undefined)
		 {
			// alert("Please Enter All The Fields And Proceed");
			
			var alertPopup = $ionicPopup.alert({
         title: 'Required',
         template: 'Please enter all the fields and proceed'
      });
		 }
		 else
		 {
			
			
			 $ionicLoading.show();
			
	$http({
								url: server+'doupdateprofile',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.profileInfo),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								//$scope.order_details = response.Customerorders;
							
							window.localStorage.setItem('user_name',$scope.profileInfo.firstname);
							
							window.localStorage.setItem('user_phone',$scope.profileInfo.phone);
							
							//alert(JSON.stringify(response.message));
							$state.go('app.profile', {}, { reload: true }); 
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//alert("Network error. Please try after some time");
								var alertPopup = $ionicPopup.alert({
								 title: 'Network Error',
								 template: 'Please try after some time'
							  });
															
								});
								
	
			
			
		 
		 }
		 
		 
	 }
	 
	 
	 $scope.image_modal = function()
	 {
		 
		 $ionicModal.fromTemplateUrl('templates/image_upload.html', {
						scope: $scope
					  }).then(function(modal) {
						  
							
							$scope.modal = modal;
							$scope.modal.show();
														
					  });
	
	 }
	 
	 $scope.closeModal =  function()
	 {
		  $scope.modal.remove();
	 }
	 
	 $scope.show_actionsheet = function()
	 {
		 $ionicActionSheet.show({
      titleText: 'Update Image',
      buttons: [
	  { text: 'Gallery' },
      { text: 'Camera' },
        
      ],
	  
	 
     
      cancelText: 'Cancel',
      cancel: function() {
		  
        console.log('CANCELLED');
      },
	  
      buttonClicked: function(index) {
		  
       switch (index){
			case 0 :
				 $scope.image_gallery();
				
				return true;
			case 1 :
				$scope.image_take();
				return true;
		}
        return true;
      },
     
	  
    });
	 }
	 
	 
	 
	 $scope.image_gallery = function(){
		 
		 
						 navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
						destinationType: Camera.DestinationType.DATA_URL,
						//destinationType: Camera.DestinationType.FILE_URI,
						sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
						mediaType:Camera.MediaType.IMAGE
						});

						function onSuccess(imageURI) {
							
							browseuploadFile(imageURI);
							
						}

						function onFail(message) {
							//alert(' Image gallery Failed :' );
							var alertPopup = $ionicPopup.alert({
							 title: '',
							 template: 'Image gallery failed'
						  });
							
						}
						 
	}
	
	$scope.image_take = function(){
		
		
		
		var options = { limit:1, destinationType: Camera.DestinationType.DATA_URL, sourceType:Camera.PictureSourceType.CAMERA };
	
		//navigator.device.camera.getPicture(captureSuccess, captureError, options);
		
					 $cordovaCamera.getPicture(options).then(function(imageData) {
					
						browseuploadFile(imageData);
					
				 // image.src = "data:image/jpeg;base64," + imageData;
				}, function(err) {
				// alert("errr="+err);
				var alertPopup = $ionicPopup.alert({
         title: '',
         template: 'Image Capture Error'
      });
				});

			  
	}
	
	 var captureSuccess = function(mediaFiles) {
							 alert("capture sucess="+JSON.stringify(mediaFiles));
							// var imgUrl = "data:image/jpeg;base64," + mediaFiles;
							
									var i, path, len;
									for (i = 0, len = mediaFiles.length; i < len; i += 1) {
										path = mediaFiles[i].fullPath;
										
										alert("path="+path);
									}
									 browseuploadFile(path);
									
                                               }
											   
		 var captureError = function(error) {
				//alert("Capture Cancelled");
				var alertPopup = $ionicPopup.alert({
         title: '',
         template: 'Capture Cancelled'
      });
												
						}
											   
											   
		  function browseuploadFile(mediaFiles)
					{
						$ionicLoading.show();
						//alert("browse");
						//alert("browse="+mediaFiles);
						
						$scope.image_data.customer_id = window.localStorage.getItem('user_id');
						
						$scope.image_data.profile_image = mediaFiles;
						
						$scope.customer_id = window.localStorage.getItem('user_id');
						
						$ionicLoading.show();
							
							
			
	$http({
								url: server+'doupdateprofileimage',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.image_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response));
							
							$state.go('app.profile');
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error11="+data);
									var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
							
									
								});
	
						
						
						
					}
	
	   $scope.language_list = [
    { text: "SQ", value: "Albanian" },
    { text: "AR", value: "Arabic" },
    { text: "HY", value: "Armenian" },
	 { text: "EU", value: "Basque" },
    { text: "BN", value: "Bengali" },
    { text: "BG", value: "Bulgarian" },
	{ text: "CA", value: "Catalan" },
    { text: "KM", value: "Cambodian" },
    { text: "ZH", value: "Chinese (Mandarin)" },
	 { text: "HR", value: "Croation" },
    { text: "CS", value: "Czech" },
    { text: "DA", value: "Danish" },
	 { text: "NL", value: "Dutch" },
    { text: "EN", value: "English" },
    { text: "ET", value: "Estonian" },
	 { text: "FJ", value: "Fiji" },
    { text: "FI", value: "Finnish" },
    { text: "FR", value: "French" },
	 { text: "KA", value: "Georgian" },
	 { text: "DE", value: "German" },
	 { text: "EL", value: "Greek" },
	 { text: "GU", value: "Gujarati" },
	 { text: "HE", value: "Hebrew" },
	 { text: "HI", value: "Hindi" },
	 { text: "HU", value: "Hungarian" },
	 { text: "IS", value: "Icelandic" },
	  { text: "ID", value: "Indonesian" },
	 { text: "GA", value: "Irish" },
	 { text: "IT", value: "Italian" },
	 { text: "JA", value: "Japanese" },
	 { text: "JW", value: "Javanese" },
	 { text: "KO", value: "Korean" },
	 { text: "LA", value: "Latin" },
	 { text: "LV", value: "Latvian" },
	  { text: "Lt", value: "Lithuanian" },
	 { text: "MK", value: "Macedonian" },
	 { text: "MS", value: "Malay" },
	 { text: "ML", value: "Malayalam" },
	 { text: "MT", value: "Maltese" },
	 { text: "MI", value: "Maori" },
	 { text: "MR", value: "Marathi" },
	 { text: "MN", value: "Mongolian" },
	 { text: "NE", value: "Nepali" },
	 { text: "No", value: "Norwegian" },
	 { text: "FA", value: "Persian" },
	 { text: "PL", value: "Polish" },
	 { text: "PT", value: "Portuguese" },
	 { text: "PA", value: "Punjabi" },
	 { text: "QU", value: "Quechua" },
	 { text: "RO", value: "Romanian" },
	 { text: "RU", value: "Russian" },
	 { text: "SM", value: "Samoan" },
	 { text: "SR", value: "Serbian" },
	 { text: "SK", value: "Slovak" },
	 { text: "SL", value: "Slovenian" },
	 { text: "ES", value: "Spanish" },
	 { text: "SW", value: "Swahili" },
	 { text: "SV", value: "Swedish" },
	 { text: "TA", value: "Tamil" },
	 { text: "TT", value: "Tatar" },
	 { text: "TE", value: "Telugu" },
	 { text: "TH", value: "Thai" },
	 { text: "BO", value: "Tibetan" },
	 { text: "TO", value: "Tonga" },
	 { text: "TR", value: "Turkish" },
	 { text: "UK", value: "Ukranian" },
	 { text: "UR", value: "Urdu" },
	 { text: "UZ", value: "Uzbek" },
	 { text: "VI", value: "Vietnamese" },
	 { text: "CY", value: "Welsh" },
	 { text: "XH", value: "Xhosa" },
   
  ];
	 
	$scope.change_lang = function()
	{
		
			$ionicModal.fromTemplateUrl('templates/language_change_modal.html', {
						scope: $scope
					  }).then(function(modal) {
						  
							
							$scope.modal = modal;
							$scope.modal.show();
														
					  });
	}
	
	$scope.select_lang = function(lang)
	{
		
		window.localStorage.setItem('lang',lang);
		$scope.langdata.lang = lang;
		$scope.closeModal();
	}
	
	
}).filter('checkcart', function () {
    return function (data, itemId) { 
    	var flag = false; 
    	angular.forEach(data,function(value,key){
    		//console.log(value+" - "+itemId);
    		if(flag!=true)
    		{
	    		if(value==itemId)
	    		{
	    			flag = true;
	    			//console.log(1)

	    		}
	    		else{
	    			flag = false;
	    			//console.log(2);
	    		}
    		}
    	})   
       	//console.log(itemId+' - '+flag);
        return flag;
    }
}).controller('FoodMenuCtrl', function($scope, $rootScope, $ionicPopup,$state,$http,$ionicLoading,$ionicSlideBoxDelegate,$ionicPlatform,$ionicHistory){
	
	$scope.width=window.screen.width;
	$scope.new_width =  parseInt($scope.width)-50;
	
	$scope.title = window.localStorage.getItem('branch_name');
	
		 $ionicPlatform.registerBackButtonAction(function (event) {
	
	
	
	$scope.lastView = $ionicHistory.backView();
	
	
	
	if($scope.lastView == null)
	{
		$state.go('app.home');
	}
	else
	{
		$scope.lasturl= $scope.lastView.url;

	

	if($scope.lasturl == '/app/home' || $scope.lasturl == '/app/index')
								{
									$state.go('app.home');

								}
	else if($scope.lasturl == '/app/food_menu')
	{
		$state.go('app.food_menu');
	}							
								
	else
	{
		navigator.app.backHistory();
	}
	}

	
}, 100);
		 
		
	
	$rootScope.home_page = '0';
	
		$rootScope.is_cart = '0';
		
		$rootScope.back_show ='0';
		
		$rootScope.display_cart = '1';
		
		$rootScope.total_count = '5';
		
		$rootScope.total_amount = '1250';
		
	
	//alert("value ="+window.localStorage.getItem('filter_value'));
	
	$scope.tabIndex =0;
	
	$scope.food_count = 0;
	
	$scope.total_count = 0;
	
	$rootScope.is_cart ='1';
	
	$rootScope.cart_show ='1';
	
	$scope.count =0;
	
		$scope.list_id = [];
	  $scope.cart_items = {};	
	  
	  $scope.category = {};
	  
	  $scope.branch = {};
	  
	  $scope.cart_details = {};
	  
	  $scope.cart_data = {};
	  
	  $scope.removecart = {};
	  
	  $scope.show = {};
	  
	  $scope.removecart = {};
	  
	  $scope.get_cart = {};
	  
	 get_cart_details();
	 
	 function get_cart_details()
	 {
		 $scope.list_id = [];
		 
		  $scope.cart_details.customer_id = window.localStorage.getItem('user_id');
		 
		 $ionicLoading.show();
			
	$http({
								url: server+'getCartItemsdetails',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
													
							$scope.cart_items = response.Cartitems;
							
							if($scope.cart_items.length == 0)
							{
								$scope.branch_id = 0;
								
								$scope.branch_name = 0;
								
								$rootScope.cart_qty = 0;
							}
							else
							{
								$scope.branch_id = response.Cartitems[0].restaurant_id;
								
								$scope.branch_name = response.Cartitems[0].restaurant_name;
								
								
							}
							
														
							$rootScope.cart_count =$scope.cart_items.length;
							
							
							
							angular.forEach(response.Cartitems, function(value) {
									
								$scope.list_id.push(value.item_id);
								//alert($scope.list_id);
								
												
								
								});
							//console.log($scope.list_id);
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									
									var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
							
									
								});
	
	 }
	  
	  $scope.cart_details.customer_id = window.localStorage.getItem('user_id');
	  
	   $scope.branch.customer_id = window.localStorage.getItem('user_id');
	  
	  $scope.branch.restaurant_id = window.localStorage.getItem('restaurant_id');
	  
	  $scope.selectedIndex=0;
	  
	  
	
		 $ionicLoading.show();
			
	$http({
								//url: server+'restaurantshome',
								url:server+'browserestaurants',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.branch),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response));
							
							$scope.menu_categories = response.restauranthomecategory;
							
								$scope.menu_categories0 = response.restauranthomecategory[0];
								
								$scope.menu_categories1 = response.restauranthomecategory[1];
								
								$scope.menu_categories2 = response.restauranthomecategory[2];
								
								$scope.menu_categories3 = response.restauranthomecategory[3];
								
								
							
								if($rootScope.filter_value == 1)
								{
									var accessData = window.localStorage['filterdata'];
		
									$scope.menu = angular.fromJson(accessData); 
									
									$scope.menu_items = $scope.menu.Filtermenus;
									
								
								}
								else
								{
									$scope.menu_items = response.restauranthomemenuitems;
								}
								
								
								
								
								
								
								
								
								
								
								//alert("m="+JSON.stringify($scope.home_banners));
								
								//alert("i="+JSON.stringify($scope.menu_items));
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error11="+data);
							
									
								});
	
	$scope.tab_click = function(id,index)
	
	{
		$scope.selectedIndex=index;
		
		$scope.category.customer_id = window.localStorage.getItem('user_id');
		
		$scope.category.category_id=id;
		
	$scope.menu_items = {};
		
		
		
		if($rootScope.filter_value ==1)
		{
			
			$scope.category.restaurant_id = window.localStorage.getItem('restaurant_id');
			
				var food = window.localStorage['foodList'];
		
					$scope.category.foodList = angular.fromJson(food);
				
				var price = window.localStorage['pricelist'];
		
					$scope.category.pricelist   = angular.fromJson(price);	

				var rating = window.localStorage['ratinglist'];
		
					$scope.category.ratinglist = angular.fromJson(rating);
			
			
			if(window.localStorage.getItem('restaurant_id') == null || window.localStorage.getItem('restaurant_id') == undefined)
			{
				$scope.category.restaurant_id = 1;
			}
			else
			{
				$scope.category.restaurant_id = window.localStorage.getItem('restaurant_id');
			}
			
			//alert("h="+JSON.stringify($scope.category));
			
			$ionicLoading.show();
			
	$http({
								url: server+'doFiltercategoryitems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.category),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response));
							
								$scope.menu_items = response.Filtercategoryitems;
								
								//alert("m="+JSON.stringify($scope.home_banners));
								
								//alert("i="+JSON.stringify($scope.menu_items));
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
			
		}
		
		else
		{
			$ionicLoading.show();
			
	$http({
								url: server+'CategoriesMenuItems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.category),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response));
							
								$scope.menu_items = response.restaurantmenuitems;
								
								$scope.home_banners = response.restauranthomebanners;
								
								$ionicSlideBoxDelegate.update();
								
								//alert("m="+JSON.stringify($scope.home_banners));
								
								//alert("i="+JSON.stringify($scope.menu_items));
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
		}
		
		
		
		
		 
	}
	
	
	
	$scope.cart_incr = function(id,price)
	{ 
		
		
		
		$scope.qty = document.getElementById(id).value;
		
		$scope.total_qty = parseInt($scope.qty)+1;
		
		document.getElementById(id).value = $scope.total_qty;
		
		$scope.cart_data.customer_id = window.localStorage.getItem('user_id');
		
		$scope.cart_data.restaurant_id = window.localStorage.getItem('restaurant_id');
		
		$scope.cart_data.item_id = id;
				
				$scope.cart_data.noofquantity = $scope.total_qty;
				
				$scope.cart_data.amount = $scope.total_qty * price;
			   
			    $rootScope.cart_qty =1;
				
				//alert("D="+JSON.stringify($scope.cart_details));
			 $ionicLoading.show();
			
	$http({
								url: server+'AddCartItems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								
							
							//alert(JSON.stringify(response.message));
							
							//$scope.product_details = response.restauranthome;
							
								//alert("ss="+JSON.stringify($scope.product_details));
								
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
														
									
								});
		
		
	}
	
	$scope.cart_decr = function(id,price)
	{
		
				
		$scope.qty = document.getElementById(id).value;
		
		$scope.total_qty = parseInt($scope.qty)-1;
		
		$scope.cart_data.customer_id = window.localStorage.getItem('user_id');
		
		$scope.cart_data.restaurant_id = window.localStorage.getItem('restaurant_id');
		
		$scope.cart_data.item_id = id;
				
				$scope.cart_data.noofquantity = $scope.total_qty;
				
				$scope.cart_data.amount = $scope.total_qty * price;
		
		if($scope.total_qty<1)
		{
			document.getElementById(id).value = 0;
		
		
		$scope.cart_details.customer_id = window.localStorage.getItem('user_id');
		
	
		
		$ionicLoading.show();
			
	$http({
								url: server+'getCartItemsdetails',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								//alert("re="+JSON.stringify(response));
								angular.forEach(response.Cartitems, function(value) {
									
								if(value.item_id == id)
								{
									$scope.cart_id = value.cart_id;
									
									
									$scope.removecart.customer_id = window.localStorage.getItem('user_id');
		
		$scope.removecart.cart_id = $scope.cart_id;
		
		 $ionicLoading.show();
			
	$http({
								url: server+'doremoveCart',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.removecart),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response.message));
							
							//$state.go($state.current, {}, {reload: true});	
														
						get_cart_details();
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
									
								});
									
									
								}
								
								
								
								});
								
															
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
											 title: 'Network Error',
											 template: 'Please try after some time'
										  });
									
								});
			
		}
		else
		{
			document.getElementById(id).value = $scope.total_qty;
			
			$ionicLoading.show();
			
	$http({
								url: server+'AddCartItems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response.message));
							
							//$scope.product_details = response.restauranthome;
							
								//alert("ss="+JSON.stringify($scope.product_details));
								
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
														
									
								});
		}
		
		
		
		
	}
	
	$scope.click_add = function(id,price)
	{
		
		if(window.localStorage.getItem('user_id')==undefined || window.localStorage.getItem('user_id')==null || window.localStorage.getItem('user_id')=='')
		{
			//alert("Please login to proceed");
			var alertPopup = $ionicPopup.alert({
         title: 'Login',
         template: 'Please login to proceed'
      });
			$state.go('app.index');
		}
		
		else
			
			{
			//	document.getElementById('add'+id).style.display = "none";
		
		//document.getElementById('cart'+id).style.display = "inline-block";
		
		$scope.current_branch_id = window.localStorage.getItem('restaurant_id');
		
		$scope.current_branch_name = window.localStorage.getItem('branch_name');
		
		//alert("from branch="+$scope.current_branch_id);
		
		//alert("from cart="+$scope.branch_id);
		
		if($scope.current_branch_id != $scope.branch_id && $scope.branch_id !=0)
		{
			 var confirmPopup = $ionicPopup.confirm({
				title: 'Replace cart item?',
				template: 'Your cart contains dishes from '+$scope.branch_name+'. Do you want to discard the selection and add dishes from '+$scope.current_branch_name+'.'
				});
			confirmPopup.then(function(res) {
				if(res) 
				{
				//remove previous cart and add new
				
				$scope.get_cart.customer_id = window.localStorage.getItem('user_id');
				
				//alert(JSON.stringify($scope.get_cart));
				
					 $ionicLoading.show();
			
	$http({
								url: server+'getCartItemsdetails',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.get_cart),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								//alert(JSON.stringify(response));
								
								
									$scope.item_details = response.Cartitems;
									//alert(JSON.stringify($scope.item_details));
								
									angular.forEach(response.Cartitems, function(value) {
									
									$scope.list_id.push(value.item_id);
									$scope.cart_id = value.cart_id;	
																			
									
									$scope.removecart.customer_id = window.localStorage.getItem('user_id');
		
		$scope.removecart.cart_id = $scope.cart_id;
		
		 $ionicLoading.show();
			
	$http({
								url: server+'doremoveCart',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.removecart),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
														
																					
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
									
								});
											
								
								});
								
								
								$scope.add_items(id,price);
								
								
								
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
												 title: 'Network Error',
												 template: 'Please try after some time'
											  });
																	
									
								});
		
		
				} 
				else 
				{
					 window.localStorage.setItem('branch_name',$scope.branch_name);
					 
					 window.localStorage.setItem('restaurant_id',$scope.branch_id);
					 
					 $scope.branch_details =  $scope.branch_id+','+$scope.branch_name;

					window.localStorage.setItem('branch_details',$scope.branch_details);
					
					$state.go($state.current, {}, {reload: true});	
				}
			});
	   
		}
		else
		{
			$scope.cart_data.customer_id = window.localStorage.getItem('user_id');
		
		$scope.cart_data.restaurant_id = window.localStorage.getItem('restaurant_id');
		
		$scope.total_qty = 1;
		
		$scope.cart_data.item_id = id;
				
				$scope.cart_data.noofquantity = $scope.total_qty;
				
				$scope.cart_data.amount = $scope.total_qty * price;
			   
			    $rootScope.cart_qty =1;
				
				//alert("D="+JSON.stringify($scope.cart_details));
			 $ionicLoading.show();
			
	$http({
								url: server+'AddCartItems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								$rootScope.cart_count = parseInt($rootScope.cart_count)+1;
							
							//alert(JSON.stringify(response.message));
							
							//$scope.product_details = response.restauranthome;
							
								//alert("ss="+JSON.stringify($scope.product_details));
								get_cart_details();
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
														
									
								});
		}
		
		
			}
		
		
	}
	
	$scope.add_items = function(id,price)
	{
		
		$scope.cart_data.customer_id = window.localStorage.getItem('user_id');
		
		$scope.cart_data.restaurant_id = window.localStorage.getItem('restaurant_id');
		
		$scope.total_qty = 1;
		
		$scope.cart_data.item_id = id;
				
				$scope.cart_data.noofquantity = $scope.total_qty;
				
				$scope.cart_data.amount = $scope.total_qty * price;
			   
			    $rootScope.cart_qty =1;
				
				//alert("D="+JSON.stringify($scope.cart_details));
			 $ionicLoading.show();
			
	$http({
								url: server+'AddCartItems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								$rootScope.cart_count = 1;
							
										get_cart_details();					
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
														
									
								});
	}
		
	$scope.get_cart_details = function()
	{
		
		
		$scope.cart_details.customer_id = window.localStorage.getItem('user_id');
		
		$ionicLoading.show();
			
	$http({
								url: server+'getCartItemsdetails',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								//alert("re="+JSON.stringify(response));
								
															
							$scope.cart_items = response.Cartitems;
							
							$rootScope.cart_count = $scope.cart_items.length;
																		
							$scope.cart_items.cart_amount = response.Cartamount;
							
							if(response.Cartitems.length == 0)
							{
								
								$rootScope.cart_qty = 0;
							}
							
								//$scope.get_cart_details();
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
											 title: 'Network Error',
											 template: 'Please try after some time'
										  });
									
								});
	}
	
}).controller('ProductCtrl',function($scope, $rootScope,$ionicPopup,$state,$stateParams,$ionicLoading,$http,$ionicPlatform,$ionicHistory){
	
	$scope.show = {};
	
	$ionicPlatform.registerBackButtonAction(function (event) {
	
	
	
	$scope.lastView = $ionicHistory.backView();
	
	
	
	if($scope.lastView == null)
	{
		$state.go('app.home');
	}
	else
	{
		$scope.lasturl= $scope.lastView.url;

	

	if($scope.lasturl == '/app/home'  || $scope.lasturl == '/app/index')
								{
									$state.go('app.home');

								}
		else if($scope.lasturl == '/app/food_menu')
	{
		$state.go('app.food_menu');
	}						
	
	else
	{
		navigator.app.backHistory();
	}
	}

	
}, 100);
	
	$rootScope.home_page = '0';
	
	$rootScope.is_cart = '0';
	
	$rootScope.back_show = '1';
	
	$rootScope.display_cart = '1';
	
	$rootScope.cart_show ='1';
	
	$scope.product_details = {};
	
	$scope.cart_details = {};
	
	$scope.cart_data = {};
	
	$scope.fav_details = {};
	
	$scope.removecart = {};
	
	$scope.list_id = [];
	
	$scope.get_cart = {};
	
	$scope.cart_details.customer_id = window.localStorage.getItem('user_id');
	
	//$scope.cart_details.menu_id = $stateParams.product_id;
	
	$scope.product_details.customer_id = window.localStorage.getItem('user_id');
	
	$scope.product_details.menu_id = $stateParams.product_id;
	
	
	  $ionicLoading.show();
			
	$http({
								url: server+'getCartItemsdetails',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
																					
							$scope.cart_items = response.Cartitems;
							if($scope.cart_items.length == 0)
							{
								$scope.branch_id = 0;
								
								$scope.branch_name = 0;
							}
							else
							{
								$scope.branch_id = response.Cartitems[0].restaurant_id;
								
								$scope.branch_name = response.Cartitems[0].restaurant_name;
								
								
							}
							
							$rootScope.cart_count = $scope.cart_items.length;
							
							angular.forEach(response.Cartitems, function(value) {
									
								$scope.list_id.push(value.item_id);
								
								});
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									
									var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
							
									
								});
	
	
	 $ionicLoading.show();
			
	$http({
								url: server+'viewmenuitems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.product_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response));
							
							$scope.product_details = response.restauranthome;
							
							//	alert("ss="+JSON.stringify($scope.product_details));
								$scope.cart_details.price = response.restauranthome[0].item_price;
								
													
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
	
	
	
	$scope.add_fav = function(id)
	{
		
		if(window.localStorage.getItem('user_id')==undefined || window.localStorage.getItem('user_id')==null || window.localStorage.getItem('user_id')=='')
		{
			//alert("Please login to proceed111");
				var alertPopup = $ionicPopup.alert({
         title: 'Login',
         template: 'Please login to proceed'
      });
			$state.go('app.index');
		}
		
		else
		{
			$scope.fav_details.customer_id = window.localStorage.getItem('user_id');
		
		$scope.fav_details.menuitem_id = id;
		
		$scope.fav_details.favourite_item = 1;
		
		document.getElementById('bf').style.display = "none";
		document.getElementById('af').style.display = "block";
		
		 $ionicLoading.show();
			
	$http({
								url: server+'doAddRemovefavourite',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
								
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.fav_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
									
								
								//alert(JSON.stringify(response));
								
										
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
								//	alert("error="+data);
								//alert("Network error. Please try after some time");
								var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
									
								});
			
		}
		
		
		
		
		
		
	}
	
	$scope.cancel_fav = function(id)
	{
		
		if(window.localStorage.getItem('user_id')==undefined || window.localStorage.getItem('user_id')==null || window.localStorage.getItem('user_id')=='')
		{
			//alert("Please login to proceed");
			var alertPopup = $ionicPopup.alert({
         title: 'Login',
         template: 'Please login to proceed'
      });
			$state.go('app.index');
		}
		
		else
		{
		
		$scope.fav_details.customer_id = window.localStorage.getItem('user_id');
		
		$scope.fav_details.menuitem_id = id;
		
		$scope.fav_details.favourite_item = '0';
		
		document.getElementById('bf').style.display = "block";
		document.getElementById('af').style.display = "none";
		
		
		
		$ionicLoading.show();
			
	$http({
								url: server+'doAddRemovefavourite',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
								
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.fav_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
									
								
								//alert(JSON.stringify(response));
								
										
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
									
								});
		}
	}
	
	
	
	$scope.click_add = function(id,price)
	{
		
		if(window.localStorage.getItem('user_id')==undefined || window.localStorage.getItem('user_id')==null || window.localStorage.getItem('user_id')=='')
		{
			//alert("Please login to proceed");
			var alertPopup = $ionicPopup.alert({
         title: 'Login',
         template: 'Please login to proceed'
      });
			$state.go('app.index');
		}
		
		else
			
			{
			//	document.getElementById('add'+id).style.display = "none";
		
		//document.getElementById('cart'+id).style.display = "inline-block";
		
		$scope.current_branch_id = window.localStorage.getItem('restaurant_id');
		
		$scope.current_branch_name = window.localStorage.getItem('branch_name');
		
		//alert("c="+$scope.current_branch_id);
		
		//alert("br="+$scope.branch_id);
		
		if($scope.current_branch_id != $scope.branch_id && $scope.branch_id !=0)
		{
			 var confirmPopup = $ionicPopup.confirm({
				title: 'Replace cart item?',
				template: 'Your cart contains dishes from '+$scope.branch_name+'. Do you want to discard the selection and add dishes from '+$scope.current_branch_name+'.'
				});
			confirmPopup.then(function(res) {
				if(res) 
				{
				//remove previous cart and add new
				
				$scope.get_cart.customer_id = window.localStorage.getItem('user_id');
				
				//alert(JSON.stringify($scope.get_cart));
				
					 $ionicLoading.show();
			
	$http({
								url: server+'getCartItemsdetails',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.get_cart),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								//alert(JSON.stringify(response));
								
								
									$scope.item_details = response.Cartitems;
									//alert(JSON.stringify($scope.item_details));
								
									angular.forEach(response.Cartitems, function(value) {
									
									
									$scope.cart_id = value.cart_id;	
																			
									
									$scope.removecart.customer_id = window.localStorage.getItem('user_id');
		
		$scope.removecart.cart_id = $scope.cart_id;
		
		 $ionicLoading.show();
			
	$http({
								url: server+'doremoveCart',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.removecart),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
														
																					
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
									
								});
											
								
								});
								
								
								$scope.add_items(id,price);
								
								
								
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
												 title: 'Network Error',
												 template: 'Please try after some time'
											  });
																	
									
								});
		
		
				} 
				else 
				{
					 window.localStorage.setItem('branch_name',$scope.branch_name);
					 
					 window.localStorage.setItem('restaurant_id',$scope.branch_id);
					 
					 $scope.branch_details =  $scope.branch_id+','+$scope.branch_name;

					window.localStorage.setItem('branch_details',$scope.branch_details);
					$state.go('app.food_menu');
					//$state.go($state.current, {}, {reload: true});	
				}
			});
	   
		}
		else
		{
			$scope.cart_data.customer_id = window.localStorage.getItem('user_id');
		
		$scope.cart_data.restaurant_id = window.localStorage.getItem('restaurant_id');
		
		$scope.total_qty = 1;
		
		$scope.cart_data.item_id = id;
				
				$scope.cart_data.noofquantity = $scope.total_qty;
				
				$scope.cart_data.amount = $scope.total_qty * price;
			   
			    $rootScope.cart_qty =1;
				
				//alert("D="+JSON.stringify($scope.cart_details));
			 $ionicLoading.show();
			
	$http({
								url: server+'AddCartItems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								$rootScope.cart_count = parseInt($rootScope.cart_count)+1;
							
							//alert(JSON.stringify(response.message));
							
							//$scope.product_details = response.restauranthome;
							
								//alert("ss="+JSON.stringify($scope.product_details));
								
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
														
									
								});
		}
		
		
			}
		
		
	}
	
	$scope.add_items = function(id,price)
	{
		
		$scope.cart_data.customer_id = window.localStorage.getItem('user_id');
		
		$scope.cart_data.restaurant_id = window.localStorage.getItem('restaurant_id');
		
		$scope.total_qty = 1;
		
		$scope.cart_data.item_id = id;
				
				$scope.cart_data.noofquantity = $scope.total_qty;
				
				$scope.cart_data.amount = $scope.total_qty * price;
			   
			    $rootScope.cart_qty =1;
				
				//alert("D="+JSON.stringify($scope.cart_details));
			 $ionicLoading.show();
			
	$http({
								url: server+'AddCartItems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								$rootScope.cart_count = 1;
							
															
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
														
									
								});
	}
	
		$scope.cart_decr = function(id,price)
	{
		
				
		$scope.qty = document.getElementById(id).value;
		
		$scope.total_qty = parseInt($scope.qty)-1;
		
		$scope.cart_data.customer_id = window.localStorage.getItem('user_id');
		
		$scope.cart_data.restaurant_id = window.localStorage.getItem('restaurant_id');
		
		$scope.cart_data.item_id = id;
				
				$scope.cart_data.noofquantity = $scope.total_qty;
				
				$scope.cart_data.amount = $scope.total_qty * price;
		
		if($scope.total_qty<1)
		{
			
			
		document.getElementById(id).value = 0;
		
		
		$scope.cart_details.customer_id = window.localStorage.getItem('user_id');
		
	
		
		$ionicLoading.show();
			
	$http({
								url: server+'getCartItemsdetails',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								//alert("re="+JSON.stringify(response));
								angular.forEach(response.Cartitems, function(value) {
									
								if(value.item_id == id)
								{
									$scope.cart_id = value.cart_id;
									
									
									$scope.removecart.customer_id = window.localStorage.getItem('user_id');
		
		$scope.removecart.cart_id = $scope.cart_id;
		
		 $ionicLoading.show();
			
	$http({
								url: server+'doremoveCart',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.removecart),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response.message));
							$scope.show.cartBtn = false;
							
							//$state.go($state.current, {}, {reload: true});	
						
							
							
							$scope.get_cart_details();
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
									
								});
									
									
								}
								
								
								
								});
								
															
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
											 title: 'Network Error',
											 template: 'Please try after some time'
										  });
									
								});
		
						
		}
		else
		{
			document.getElementById(id).value = $scope.total_qty;
			
			$ionicLoading.show();
			
	$http({
								url: server+'AddCartItems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response.message));
							
							//$scope.product_details = response.restauranthome;
							
								//alert("ss="+JSON.stringify($scope.product_details));
								
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
														
									
								});
		}
		
		
		
		
	}
	
		$scope.cart_incr = function(id,price)
	{ 
		
		
		
		$scope.qty = document.getElementById(id).value;
		
		$scope.total_qty = parseInt($scope.qty)+1;
		
		document.getElementById(id).value = $scope.total_qty;
		
		$scope.cart_data.customer_id = window.localStorage.getItem('user_id');
		
		$scope.cart_data.restaurant_id = window.localStorage.getItem('restaurant_id');
		
		$scope.cart_data.item_id = id;
				
				$scope.cart_data.noofquantity = $scope.total_qty;
				
				$scope.cart_data.amount = $scope.total_qty * price;
			   
			    $rootScope.cart_qty =1;
				
				//alert("D="+JSON.stringify($scope.cart_details));
			 $ionicLoading.show();
			
	$http({
								url: server+'AddCartItems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response.message));
							
							//$scope.product_details = response.restauranthome;
							
								//alert("ss="+JSON.stringify($scope.product_details));
								
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
														
									
								});
		
		
	}
	
		$scope.get_cart_details = function()
	{
		
		
		$scope.cart_details.customer_id = window.localStorage.getItem('user_id');
		
		$ionicLoading.show();
			
	$http({
								url: server+'getCartItemsdetails',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								//alert("re="+JSON.stringify(response));
								
														
							$scope.cart_items = response.Cartitems;
							
							$rootScope.cart_count = $scope.cart_items.length;
																		
							$scope.cart_items.cart_amount = response.Cartamount;
							
							if(response.Cartitems.length == 0)
							{
								
								$rootScope.cart_qty = 0;
							}
							
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
											 title: 'Network Error',
											 template: 'Please try after some time'
										  });
									
								});
	}
	
	
}).controller('HotOffersCtrl', function($scope, $rootScope,$ionicPopup,$ionicLoading,$http){
	
	$rootScope.home_page = '0';
	
	$rootScope.is_cart = '0';
	
	$rootScope.back_show = '1';
	
	$rootScope.display_cart = '1';
	
	$scope.offer_data = {};
	
	$scope.width=window.screen.width;
	$scope.new_width = parseInt($scope.width)/2;
	$scope.final_width = parseInt($scope.new_width)-10;
	
		$scope.offer_data.restaurant_id = window.localStorage.getItem('restaurant_id'); 
	
	$ionicLoading.show();
			
	$http({
								url: server+'doOffersview',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
								
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.offer_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
									
								
								//alert(JSON.stringify(response));
								
								$scope.offer_data = response.message;
								
										
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
									  
									  });
									  
									  
		
		
		
	
	
}).controller('FacebookCtrl',function($scope, UserService, $q, $state,$rootScope, $ionicLoading,$http,$ionicPopup){
	
	
	$rootScope.home_page = '0';
	
	$rootScope.is_cart = '0';
	
	$rootScope.display_cart = '1';
	
	$rootScope.display_cart = '1';
	
	$scope.fbdata = {};
	
	
	var fbLoginSuccess = function(response) {
	//	alert("suces2");
		if (!response.authResponse){
		  fbLoginError("Cannot find the authResponse"); 
		  return;
		}
		var authResponse = response.authResponse;

		getFacebookProfileInfo(authResponse)
		.then(function(profileInfo) {
			
			alert(JSON.stringify(profileInfo));
		
		  $scope.fbdata.fb_id = profileInfo.id;
		  
			$scope.fbdata.email = profileInfo.email;
			
			//$scope.fbdata.email = 'gokul@gg.com';
			
			$scope.fbdata.firstname = profileInfo.name;
			
			$scope.fbdata.phoneno = 1234567890;
			
			$scope.fbdata.password  = 123;
			
			//$scope.fbdata.last_name = profileInfo.last_name;
			
			
			if($scope.fbdata.email==undefined||$scope.fbdata.email==''||$scope.fbdata.email==null)
			{
				$ionicLoading.hide();
				alert("Sorry Unable to login with facebook,You dont have valid email");
				
				facebookConnectPlugin.logout(function(){
									 
									},
									function(fail){
									  
									});
									
									$state.go('app.index');
				
			}
			else
			{
				
				
			
			alert("res="+JSON.stringify($scope.fbdata));
			
			
			
			
			 $ionicLoading.show();
			
	$http({
								url: server+'storeCustomer',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
								
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.fbdata),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
									
								
								//alert(JSON.stringify(response));
								var alertPopup = $ionicPopup.alert({
									 title: '',
									 template: JSON.stringify(response)
								  });
								$scope.user_data = response;
										
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
								//	alert("error="+data);
								//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
									
								});
			
				
				
			}
			
				
				
			
			
			
			
			
			//window.localStorage.setItem('user_id','1');
			//$state.go('app.home');
			
		/*if($scope.fbdata.email==undefined||$scope.fbdata.email==''||$scope.fbdata.email==null){
									alert('Unable to login with facebook');
									
									 // Facebook logout
									facebookConnectPlugin.logout(function(){
									  window.localStorage.removeItem('starter_facebook_user');
									},
									function(fail){
									  window.localStorage.removeItem('starter_facebook_user');
									});
									
							return false;
							}*/
							
													
		
		 
		}, function(fail){
		  // Fail get profile info
		  alert("function fail");
		  $ionicLoading.hide();
		  console.log('profile info fail', fail);
		 
		});
	  };
	  
	   var fbLoginError = function(error){
		   
		 //  alert("fb error="+JSON.stringify(error));
		   
		   $ionicLoading.hide();
		   
		   $state.go('app.index');
		   
		//console.log('fbLoginError', error);
		
		
	  };
	  
	  var getFacebookProfileInfo = function (authResponse) {
		var info = $q.defer();

		facebookConnectPlugin.api('/me?fields=email,name,first_name,last_name,gender&access_token=' + authResponse.accessToken, null,
		  function (response) {
					console.log(response);
			info.resolve(response);
			
		  },
		  function (response) {
					console.log(response);
			info.reject(response);
		  }
		);
		return info.promise;
	  };
	  
	  
	  facebookConnectPlugin.getLoginStatus(function(success){
		  
		//  alert("sucess1");
		  
		  //alert(success.status);
			
		  if(success.status === 'connected'){
			
			
			// The user is logged in and has authenticated your app, and response.authResponse supplies
			// the user's ID, a valid access token, a signed request, and the time the access token
			// and signed request each expire
			//console.log('getLoginStatus', success.status);
				
				
				// Check if we have our user saved
				//var user = UserService.getUser('facebook');
					
				//if(user.userID){
					
						getFacebookProfileInfo(success.authResponse)
						.then(function(profileInfo) {
										alert("res1="+JSON.stringify(profileInfo));
										
										
							  
									$scope.fbdata.fb_id = profileInfo.id;
								  
									$scope.fbdata.email = profileInfo.email;
									
									//$scope.fbdata.email = 'gokul@gg.com';
									
									$scope.fbdata.firstname = profileInfo.name;
									
									$scope.fbdata.phoneno = 1234567890;
									
									$scope.fbdata.password  = 123;
								
								
								
						if($scope.fbdata.email==undefined||$scope.fbdata.email==''||$scope.fbdata.email==null)
			{
				$ionicLoading.hide();
				alert("Sorry Unable to login with facebook,You dont have valid email");
				
				facebookConnectPlugin.logout(function(){
									 
									},
									function(fail){
									  
									});
									
									$state.go('app.index');
				
			}
			else
			{
				
				
			
			alert("res="+JSON.stringify($scope.fbdata));
			
			
			
			
			 $ionicLoading.show();
			
	$http({
								url: server+'storeCustomer',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
								
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.fbdata),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
									
								
								//alert(JSON.stringify(response));
								var alertPopup = $ionicPopup.alert({
										 title: '',
										 template: JSON.stringify(response)
									  });
								$scope.user_data = response;
										
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
											 title: 'Network Error',
											 template: 'Please try after some time'
										  });
																		
								});
			
				
				
			}
							
							
									
						}, function(fail){
							
							// Fail get profile info
							console.log('profile info fail', fail);
						});
					/*}
					else{
						
						alert("else 111");
						$state.go('app.home');
					}*/
		  } else {
			
			// If (success.status === 'not_authorized') the user is logged in to Facebook,
					// but has not authenticated your app
			// Else the person is not logged into Facebook,
					// so we're not sure if they are logged into this app or not.

				//	console.log('getLoginStatus', success.status);
					
					$ionicLoading.show({
			  template: 'Logging in...'
			});
				

					// Ask the permissions you need. You can learn more about
					// FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
			facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
		  }
		});
	
	
	
	
	
}).controller('GmailCtrl', function($scope,$window,$rootScope,$state,$ionicLoading,$http,$ionicPopup){
	
	$rootScope.home_page = '0';
	
	$rootScope.is_cart = '0';
	
	$rootScope.display_cart = '1';
	
	$scope.gmaildata = {};
	
   	window.plugins.googleplus.login(
	{
		
	//	'scopes': 'profile,email ',
      //'webClientId': '1033869034958-0ssllel62d64np64plldc7coo4375gh5.apps.googleusercontent.com', 
      //'offline': true,
	  
		
	},
	
	function (user_data)
	{
		
		
		//alert("u="+JSON.stringify(user_data));
		
		$scope.gmaildata.firstname = user_data.displayName;
		
		$scope.gmaildata.email = user_data.email;
		
		$scope.gmaildata.image_url = user_data.imageUrl;
		
		$scope.gmaildata.phoneno = 1234567890;
		
		$scope.gmaildata.password = 123;
		
		alert(JSON.stringify($scope.gmaildata));
		
		$ionicLoading.show();
			
	$http({
								url: server+'storeCustomer',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
								
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.gmaildata),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
									
								
								//alert(JSON.stringify(response));
								
								var alertPopup = $ionicPopup.alert({
									 title: '',
									 template: JSON.stringify(response)
								  });
								
										
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
																	
								});
		
		
		
		
		//$state.go('app.home', {}, { reload: true });
		
	},
        function (msg) {
          
          console.log(msg);
        }
	   
    );
	

	
	
}).controller('AboutCtrl', function($scope,$rootScope,$ionicLoading,$http,$state,$ionicPopup){
	
	$rootScope.home_page = '0';
	
	$rootScope.is_cart = '0';
	
	$rootScope.home_page = '0';
	
	$rootScope.display_cart = '1';
	
	$scope.about_details = {};
	
	$scope.about_details.restaurantid = window.localStorage.getItem('restaurant_id');
	
	$ionicLoading.show();
			
	$http({
								url: server+'viewAboutRestaurant',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.about_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								//alert(JSON.stringify(response.restaurantaboutus));
								$scope.about_details = response.restaurantaboutus[0];
							
								//alert(JSON.stringify($scope.about_details));
																						
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
								//	alert("error="+data);
								//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
											 title: 'Network Error',
											 template: 'Please try after some time'
										  });
									
								});
	
	
	
	
	
}).controller('FavProductCtrl', function($scope,$rootScope,$stateParams,$ionicPopup){
	
	$rootScope.home_page = '0';
	
	$rootScope.is_cart = '0';
	
	$rootScope.display_cart = '1';
	
	
	
	
	$scope.click_fav = function()
	{
		
		document.getElementById('bf').style.display = "none";
		document.getElementById('af').style.display = "block";
	}
	
	$scope.cancel_fav = function()
	{
		
		document.getElementById('bf').style.display = "block";
		document.getElementById('af').style.display = "none";
	}
	
}).controller('HelpCtrl', function($scope,$rootScope,$ionicPopup){
	
	$rootScope.home_page = '0';
	
	$rootScope.is_cart = '0';
	
	$rootScope.home_page = '0';
	
	$rootScope.display_cart = '1';
	
}).controller('ContactCtrl', function($scope,$rootScope,$ionicPopup,$ionicModal){
	
	$rootScope.home_page = '0';
	
	$rootScope.is_cart = '0';
	
	$rootScope.home_page = '0';
	
	$rootScope.display_cart = '1';
	
	
	
	
	
	
}).controller('CartDetailsCtrl', function($rootScope,$ionicPopup,$scope,$ionicLoading,$http,$state,$window){
	
//	$window.location.reload();

	$scope.width=window.screen.width;
	
	$scope.new_width = $scope.width/4;
	
	$scope.half_width = $scope.width/2;
	
	$scope.latest_width =  parseInt($scope.half_width)-50;
	
	

	
	$rootScope.home_page = '0';
	
	$rootScope.is_cart = '0';
	
	$rootScope.back_show = '1';
	
	$rootScope.display_cart = '0';
	
	$scope.cart_details = {};
	
	$scope.cart_items = {};
	
	$scope.edit_cart = {};
	
	$scope.removecart = {};
	
	$scope.show = {};
	
	$scope.cart_details.customer_id = window.localStorage.getItem('user_id');
	
	
	
	get_cart_details();
	
	function get_cart_details()
	{
		//alert("11");
		
		$scope.cart_details.customer_id = window.localStorage.getItem('user_id');
		
		$ionicLoading.show();
			
	$http({
								url: server+'getCartItemsdetails',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								//alert("re="+JSON.stringify(response));
								
								
							
							$scope.cart_items = response.Cartitems;
							
							$rootScope.cart_count = $scope.cart_items.length;
							
							$scope.cart_items.cart_amount = response.Cartamount;
							
							if(response.Cartitems.length == 0)
							{
								
								$rootScope.cart_qty = 0;
							}
							else
							{
								$rootScope.cart_qty = 1;
							}
								//alert("nn="+$scope.cart_items.cart_amount);
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
											 title: 'Network Error',
											 template: 'Please try after some time'
										  });
									
								});
	}
	
	 
	
		
	$scope.cart_update  = function(item_id,cart_id,price,qty,cust_id,offer_id)
	{
		
		
			$scope.data = {};
			$scope.data.count = parseInt(qty);
		
		 var myPopup = $ionicPopup.show({
     template: '<input type="tel" ng-model="data.count" maxlength="2" onKeyUp="if(this.value>15){this.value=15;}else if(this.value<0){this.value=1;}">',
     title: 'Enter Quantity',
     subTitle: '',
     scope: $scope,
     buttons: [
       { text: 'Cancel' },
       {
         text: '<b>Update</b>',
         type: 'button-positive',
         onTap: function(e) {
			
           if ($scope.data.count == undefined) {
			   $scope.data.count = 1;
            // alert("Please Enter Quantiy");
			var alertPopup = $ionicPopup.alert({
			 title: '',
			 template: 'Please enter quantity'
		  });
             e.preventDefault();
           } else {
			   
			    if($scope.data.count < 1)
			   {
				   $scope.data.count = 1;
				  	 var alertPopup = $ionicPopup.alert({
					 title: '',
					 template: 'Please enter a valid quantity'
				  });
				   e.preventDefault();
			   }
			   
			   else
			   {
				   $scope.edit_cart.customer_id = cust_id;
			   
			   $scope.edit_cart.noofquantity = $scope.data.count;
			   
			   $scope.edit_cart.cart_id = cart_id;
			   
			   $scope.edit_cart.item_id = item_id;
			   
			   $scope.edit_cart.amount = price*$scope.data.count;
			   
			//   alert("D="+JSON.stringify($scope.edit_cart));
			   
			   $rootScope.cart_qty =1;
			   
			   $ionicLoading.show();
			
	$http({
								url: server+'doupdateCart',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.edit_cart),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response.message));
								get_cart_details();
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
							
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });	
								});
			   
			   }
			   
			 
            
           }
         }
       },
     ]
   });
		
		
		
		
	}
	
	$scope.update_cart_incr = function(item_id,cart_id,price,qty,cust_id,offer_id)
	{ 
		if(offer_id!=null)
		{
			 $scope.edit_cart.offer_id = offer_id;
		}
		else
		{
			
		}
		
		
		$scope.qty = document.getElementById(item_id).value;
		
		$scope.total_qty = parseInt($scope.qty)+1;
		
		document.getElementById(item_id).value = $scope.total_qty;
		
		
		 $scope.edit_cart.customer_id = window.localStorage.getItem('user_id');
		
			   
			   $scope.edit_cart.noofquantity = $scope.total_qty;
			   
			   $scope.edit_cart.cart_id = cart_id;
			   
			   $scope.edit_cart.item_id = item_id;
			   
			   $scope.edit_cart.amount = price*$scope.total_qty;
		
		
					    $rootScope.cart_qty =1;
				
				//alert("D="+JSON.stringify($scope.cart_details));
			 $ionicLoading.show();
			
	$http({
								url: server+'doupdateCart',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.edit_cart),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								get_cart_details();
								
							//alert(JSON.stringify(response.message));
							
							//$scope.product_details = response.restauranthome;
							
								//alert("ss="+JSON.stringify($scope.product_details));
								
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
														
									
								});
		
		
	}
	
	$scope.update_cart_decr = function(item_id,cart_id,price,qty,cust_id,offer_id)
	{
		if(offer_id!=null)
		{
			 $scope.edit_cart.offer_id = offer_id;
		}
		else
		{
			
		}
				
		$scope.qty = document.getElementById(item_id).value;
		
		$scope.total_qty = parseInt($scope.qty)-1;
		
		$scope.edit_cart.customer_id = window.localStorage.getItem('user_id');
		
			   
			   $scope.edit_cart.noofquantity = $scope.total_qty;
			   
			   $scope.edit_cart.cart_id = cart_id;
			   
			   $scope.edit_cart.item_id = item_id;
			   
			   $scope.edit_cart.amount = price*$scope.total_qty;
		
		
		if($scope.total_qty<1)
		{
			document.getElementById(item_id).value = 0;
		
		
		$scope.cart_details.customer_id = window.localStorage.getItem('user_id');
		
	
		
		$ionicLoading.show();
			
	$http({
								url: server+'getCartItemsdetails',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								//alert("re="+JSON.stringify(response));
								angular.forEach(response.Cartitems, function(value) {
									
								if(value.item_id == item_id)
								{
									$scope.cart_id = value.cart_id;
									
									
									$scope.removecart.customer_id = window.localStorage.getItem('user_id');
		
		$scope.removecart.cart_id = $scope.cart_id;
		
		 $ionicLoading.show();
			
	$http({
								url: server+'doremoveCart',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.removecart),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response.message));
							
						//	$state.go($state.current, {}, {reload: true});	
							
														
							get_cart_details();
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
									
								});
									
									
								}
								
								
								
								});
								
															
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
											 title: 'Network Error',
											 template: 'Please try after some time'
										  });
									
								});
			
		}
		else
		{
			document.getElementById(item_id).value = $scope.total_qty;
			
			$ionicLoading.show();
			
	$http({
								url: server+'doupdateCart',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.edit_cart),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								get_cart_details();
							
							//alert(JSON.stringify(response.message));
							
							//$scope.product_details = response.restauranthome;
							
								//alert("ss="+JSON.stringify($scope.product_details));
								
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
														
									
								});
		}
		
		
		
		
	}
	
	$scope.cart_delete = function(cust_id,cart_id)
	
	{
		
		 var confirmPopup = $ionicPopup.confirm({
       title: 'Delete Cart',
       template: 'Are you sure you want to remove this item?'
     });
     confirmPopup.then(function(res) {
       if(res) {
        
		$scope.cart_details.customer_id = cust_id;
		
		$scope.cart_details.cart_id = cart_id;
		
		 $ionicLoading.show();
			
	$http({
								url: server+'doremoveCart',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response.message));
							
						//	$state.go($state.current, {}, {reload: true});	
							
							get_cart_details();
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
									
								});
		
		
       } else {
         
       }
     });
   }
		
		
	
	
	
	
	
}).controller('AddressBookCtrl',function($scope,$state,$rootScope,$ionicLoading,$http,$ionicPopup,$stateParams){
	
	//alert("add");
	
	$rootScope.home_page = '0';
	
	$rootScope.is_cart = '0';
	
	$rootScope.back_show = '0';
	
	$rootScope.display_cart = '1';
	
	$rootScope.is_cart = '0';
	
	$scope.address_radio = {};
	
	$scope.customer_details = {};
	
	$scope.address_details = {};
	
	$scope.remove_address = {};
	
	$scope.checkout_address = {};
	
	$scope.address_type_ids = [];
	
	$scope.address_radio.value = [];
	$scope.address_radio.value2 = [];
	$scope.address_radio.value3 = [];
	$scope.address_radio.value4 = [];
	
	$scope.customer_details.customer_id = window.localStorage.getItem('user_id');
	
	$scope.remove_address.customer_id = window.localStorage.getItem('user_id');
	
	
	
	$scope.select_addr = function(type_id)
	
	{
		
		
		$scope.checkout_address.customer_id = window.localStorage.getItem('user_id');
		
		$scope.checkout_address.address_type = type_id;
		
		
		$http({
								url: server+'setpickupaddress',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.checkout_address),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response));
							
							$state.go('app.checkout', {}, { reload: 'app.checkout' });
							
								//$scope.address_details = response.Customeraddress;
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
									
								});
			
		
		
	}
	
		get_address();
		
		function get_address()
		{
			
			$ionicLoading.show();
		 
		  window.localStorage.removeItem('address_type_ids');
		 
		 $scope.address_type_ids = [];
		 
			
	$http({
								url: server+'getcustomeraddress',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.customer_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response));
							
								$scope.address_details = response.Customeraddress;
								
								$scope.address_length = $scope.address_details.length;								
								angular.forEach(response.Customeraddress, function(value) {
									
								$scope.address_type_ids.push(value.address_type_id);
								
								
								});
								
								
								window.localStorage.setItem('address_type_ids',JSON.stringify($scope.address_type_ids));
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
									
								});
			
		}
	
		 
	
	
	
	$scope.delete_address = function(type_id)
	
	{
		
		$scope.remove_address.address_type_id = type_id;
		
		
		
		 var confirmPopup = $ionicPopup.confirm({
       title: 'Delete Address',
       template: 'Are you sure you want to delete this address?'
     });
     confirmPopup.then(function(res) {
       if(res) {
        
		
		
		$ionicLoading.show();
			
	$http({
								url: server+'removeaddress',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.remove_address),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
								//alert(JSON.stringify(response.message));	
							//	alert("address deleted sucessfully");
								get_address();
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
									
								});
		
       } else {
         
       }
     });
   }
		
		$scope.address_full = function()
		{
				 var alertPopup = $ionicPopup.alert({
         title: '',
         template: 'Sorry you cant add a new address,because you already added all the 3 addresses '
      });
		}
	
	
}).controller('AddAddressCtrl', function($scope,$state,$rootScope,$ionicLoading,$http,$sce, $ionicHistory,$ionicPopup,$cordovaGeolocation){
	
	$scope.width=window.screen.width;
	
	$rootScope.home_page = '0';
	
	$rootScope.is_cart = '0';
	
	$rootScope.back_home = '1';
	$rootScope.back_show = '1';
	
	$rootScope.display_cart = '1';
	
	$rootScope.is_cart = '0';
	
	$scope.addressdata = {};
	
	
	
	 $scope.addresstypes= [
    {id:'1', name:'Home'},
    {id:'2', name:'Work'},
    {id:'4', name:'Others'}
	 ];
	 
	 $scope.address_type_ids = JSON.parse(window.localStorage.getItem('address_type_ids'));
	 
	 
	
	var map;
	var marker;
	
	$ionicLoading.show();
	
		 var options = {maximumAge:100000, timeout:50000, enableHighAccuracy: true};
 
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
		
		//alert("la="+position.coords.latitude);
		
		//alert("la="+position.coords.longitude);
 
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		
		get_address(latLng);
 
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControl: false,
			overviewMapControl: false,
			zoomControl: true,
			draggable: true
        };
 
        $scope.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
 
		//$scope.map.setDebuggable(true);
 
        google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
            var marker = new google.maps.Marker({
                 map: $scope.map,
                 animation: google.maps.Animation.DROP,
                 position: latLng,
				 draggable: true,
                 icon:'http://i.imgur.com/fDUI8bZ.png'
            });
			
			addYourLocationButton($scope.map, marker)
				//marker.bindTo('position', map, 'center');
				
            var infoWindow = new google.maps.InfoWindow({
                content: "Here You Are.!"
            });
			
				google.maps.event.addListener(marker, 'dragend', function (event) {
					
					get_address(event.latLng);
			
		});

		google.maps.event.addListener($scope.map, 'dragend', function () {
			
			
			var latLng = new google.maps.LatLng(this.getCenter().lat(), this.getCenter().lng());
			 marker.setPosition(latLng);
			get_address(latLng);
			
			
		});
				
				

  google.maps.event.addListener(map, 'click', function(event) {

  //alert("click");
				
   // marker.setPosition(event.latLng);
  });
 
          google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open($scope.map, marker);
            });
       });
    }, function(error){
         console.log("Could not get location="+JSON.stringify(error));
  });
  
  
  

	
	var options = {maximumAge:100000, timeout:50000, enableHighAccuracy: true};
	
	/*$cordovaGeolocation.getCurrentPosition(options).then(function(position){
		
		google.maps.event.addDomListener(window, 'load');
		
		 var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		 
		 get_address(latLng);
	
        var mapOptions = {
          zoom: 14,
          center: latLng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById('map_canvas'),
            mapOptions);
        $('<div/>').addClass('centerMarker').appendTo(map.getDiv())
             //do something onclick
            .click(function(){
               var that=$(this);
               if(!that.data('win')){
                that.data('win',new google.maps.InfoWindow({content:'this is the center'}));
                that.data('win').bindTo('position',map,'center');
               }
               that.data('win').open(map);
            });
			
			google.maps.event.addListener(map,'center_changed', function() {
				
				var lat = map.getCenter().lat();
				
				var long = map.getCenter().lng();
				
				var latLng = new google.maps.LatLng(lat, long);
				
				get_address(latLng);
				google.maps.event.addDomListener(window, 'load');
				// map.getCenter().lat();
				//map.getCenter().lng();
				});
			
					
			}, function(error){
         console.log("Could not get location="+JSON.stringify(error));
  });*/
			
       function addYourLocationButton(map, marker) 
{
	
	var controlDiv = document.createElement('div');
	
	var firstChild = document.createElement('button');
	firstChild.style.backgroundColor = '#fff';
	firstChild.style.border = 'none';
	firstChild.style.outline = 'none';
	firstChild.style.width = '28px';
	firstChild.style.height = '28px';
	firstChild.style.borderRadius = '2px';
	firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
	firstChild.style.cursor = 'pointer';
	firstChild.style.marginRight = '10px';
	firstChild.style.padding = '0px';
	firstChild.title = 'Your Location';
	controlDiv.appendChild(firstChild);
	
	/*var secondChild = document.createElement('div');
	
	secondChild.style.margin = '5px';
	secondChild.style.width = '18px';
	secondChild.style.height = '18px';
	secondChild.style.backgroundImage = 'url(img/mylocation.png)';
	secondChild.style.backgroundSize = '180px 18px';
	secondChild.style.backgroundPosition = '0px 0px';
	secondChild.style.backgroundRepeat = 'no-repeat';
	secondChild.id = 'you_location_img';
	firstChild.appendChild(secondChild);*/
	
	var secondChild = document.createElement("IMG");
	secondChild.setAttribute("src", "img/geo.png");
	secondChild.setAttribute("width", "18px");
	secondChild.setAttribute("height", "18px");
	secondChild.setAttribute("backgroundSize", '180px 18px');
	secondChild.setAttribute("backgroundPosition", '0px 0px');
	secondChild.setAttribute("backgroundRepeat", "no-repeat");
	secondChild.id = 'you_location_img';
	firstChild.appendChild(secondChild);
	
	google.maps.event.addListener(map, 'center_changed', function () {
        secondChild.style['background-position'] = '0 0';
    });
	
	 firstChild.addEventListener('click', function () {
		 
        var imgX = 0,
            animationInterval = setInterval(function () {
                imgX = -imgX - 18 ;
                secondChild.setAttribute['background-position'] = imgX+'px 0';
            }, 500);

        if(navigator.geolocation) {
			
            navigator.geolocation.getCurrentPosition(function(position) {
				
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
               // map.setCenter(latlng);
			   marker.setPosition(latlng);
				map.panTo(latlng);
				get_address(latlng);
				 //marker.setPosition(latLng);
                clearInterval(animationInterval);
				
                secondChild.setAttribute['background-position'] = '-144px 0';
            });
        } else {
            clearInterval(animationInterval);
            secondChild.style['background-position'] = '0 0';
        }
		
		 
		
    });

    controlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
		
}

	
	function get_address(latlng)
	{
		$ionicLoading.hide();
		
		var geocoder = new google.maps.Geocoder();
		  var latlng = latlng;
		  var request = {
			latLng: latlng
		  };
		  
		  geocoder.geocode(request, function(data, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				
			  if (data[0] != null) {
			  
				//$scope.location_info.address = data[0].formatted_address;
				
				//alert("Address="+data[0].formatted_address);
				document.getElementById('address_value').value = data[0].formatted_address;
				
				//$scope.addressdata.address = data[0].formatted_address;
				
			  } else {
				alert("No address available");
			  }
			}
		  })
	}
	
	

	
	
	$ionicLoading.show();
			
	$http({
								url: server+'getstate',
								method: "GET",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.addressdata),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
										//alert("res="+JSON.stringify(response));	

											$ionicLoading.hide();
								$scope.state_list = response.Master_State;
								//alert(JSON.stringify(response.Master_State));
								//state_search();
								
							
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
							var alertPopup = $ionicPopup.alert({
								 title: 'Network Error. Please try after some time',
								 template: 'Network error. Ple'
							  });
									
								});
	
	
	
	$scope.$watch('addressdata.state_id', function() {
		
		if($scope.addressdata.state_id!= undefined)
		{
			//alert("a="+$scope.addressdata.state_id);
			
			$ionicLoading.show();
			
	$http({
								url: server+'getcity',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.addressdata),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
										//alert("res="+JSON.stringify(response));	

											$ionicLoading.hide();
								$scope.city_list = response.Master_City;
								//alert(JSON.stringify($scope.city_list));
								//city_search();
								
							
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
								var alertPopup = $ionicPopup.alert({
								 title: 'Network Error',
								 template: 'Network error. Please try after some time'
							  });
									
								});
		}
		
		 
	
	
	});
	
	
	
	$scope.add_address = function()
	{
		//alert(document.getElementById('address_value').value);
		//alert(JSON.stringify($scope.addressdata));
		
		$scope.addressdata.customer_id = window.localStorage.getItem('user_id');
		
		//alert($scope.addressdata.building_name);
		//alert($scope.addressdata.address);
		
		$scope.addressdata.address = document.getElementById('address_value').value;
		
		if($scope.addressdata.building_name == undefined|| $scope.addressdata.address == undefined ) 
		
		{
		//	alert("Please Fill All The Details And Proceed");
		var alertPopup = $ionicPopup.alert({
         title: 'Required Fields',
         template: 'Please fill all the details and proceed'
      });
		}
		
		else
			
			{
				
				if($scope.addressdata.address_type == undefined)
				{
					$scope.addressdata.address_type = 1;
				}
				
					$scope.addressdata.check_address = 1;
					
					$ionicLoading.show();
			
	$http({
								url: server+'customeraddaddress',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.addressdata),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
										//alert("res="+JSON.stringify(response));	

											$ionicLoading.hide();
								
								//alert(JSON.stringify(response));
								
								$scope.lastView = $ionicHistory.backView();


								$scope.lasturl= $scope.lastView.url;
								
								
								
									if($scope.lasturl == '/app/profile_address_book')
								{
									
								//	$state.go('app.address_book');
								$state.go('app.profile_address_book');
								}
								
								else
								{
									
									$state.go('app.checkout', {}, { reload: true });
								}
								
								//$state.go('app.checkout', {}, { reload: true });
							
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
							var alertPopup = $ionicPopup.alert({
								 title: 'Network Error',
								 template: 'Network error. Please try after some time'
							  });
															
								});
				
				
			}
	}
	
}).controller('EditAddressCtrl',function($scope,$state,$rootScope, $ionicLoading, $http,$ionicPopup,$stateParams,$sce,$cordovaGeolocation,$ionicHistory){
	
	$scope.width=window.screen.width;
	
	$rootScope.home_page = '0';
	
	$rootScope.is_cart = '0';
	
	$rootScope.back_show = '1';
	
	$rootScope.display_cart = '1';
	
	$rootScope.is_cart = '0';
	
	$scope.addressdata = {};
	
	$scope.new_address_type_ids = [];
	
	//$scope.address_data = [];
	
	
	
	 $scope.addresstypes= [
    {id:'1', name:'Home'},
    {id:'2', name:'Work'},
   	{id:'4', name:'Others'}
	 ];
	 
	 $scope.addressdata.address_type_id = $stateParams.address_type;
	 
	 	 
	$scope.address_type_ids = JSON.parse(window.localStorage.getItem('address_type_ids'));
	
		
	$scope.index = $scope.address_type_ids.indexOf( $scope.addressdata.address_type_id);
	
				
	$scope.new_address_type_ids = $scope.address_type_ids.splice($scope.index,1);
	
		 
	 $scope.addressdata.customer_id = window.localStorage.getItem('user_id');
	 
	 
	 
	 $ionicLoading.show();
	 
	$http({
								url: server+'doCustomerparticularAddress',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.addressdata),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
										//alert("res="+JSON.stringify(response));	

											//$ionicLoading.hide();
								
								//alert(JSON.stringify(response.Customeraddress[0].address));
								
								//alert("sp="+(response.Customeraddress[0].address).split(","));
								
								$scope.addressdata.address_type = response.Customeraddress[0].address_type_id;
								
								//$scope.adddata = response.Customeraddress[0].address.split(",");
								
							//	angular.forEach($scope.adddata, function(value) {
									
							//	$scope.address_data.push(value);
												
								
							//	});
								
							//$scope.addressdata.name = $scope.address_data[0];
							//$scope.addressdata.building_name = $scope.address_data[1];
							//$scope.addressdata.street_name = $scope.address_data[2];
							//$scope.addressdata.area_name = $scope.address_data[3];
							//$scope.addressdata.city_name = $scope.address_data[4];
							//$scope.addressdata.state = $scope.address_data[5].split("-");
							//$scope.addressdata.state_name = $scope.addressdata.state[0];
							//$scope.addressdata.pin_code = $scope.addressdata.state[1];
							
							$scope.addressdata.building_name = response.Customeraddress[0].building_name;
														
							$scope.addressdata.langitude = response.Customeraddress[0].latitude;
							
							$scope.addressdata.longitude = response.Customeraddress[0].longitude;
							
							
							
							
							 var map = null;
	var marker;
	
		 var options = {maximumAge:100000, timeout:50000, enableHighAccuracy: true};
		 
		/* $cordovaGeolocation.getCurrentPosition(options).then(function(position){
		
		//google.maps.event.addDomListener(window, 'load');
		
		if($scope.addressdata.langitude == null || $scope.addressdata.longitude == null)
		{
			
			
			var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		}
		
		else
		{
			
			var latLng = new google.maps.LatLng($scope.addressdata.langitude, $scope.addressdata.longitude);
		}
		
				 
		 get_address(latLng);
	
        var mapOptions = {
          zoom: 14,
          center: latLng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('mapcanvas'),
            mapOptions);
			
        $('<div/>').addClass('centerMarker').appendTo(map.getDiv())
	  // $('<div/><img src="/img/mappin.png">').appendTo(map.getDiv())
             //do something onclick
            .click(function(){
               var that=$(this);
               if(!that.data('win')){
                that.data('win',new google.maps.InfoWindow({content:'this is the center'}));
                that.data('win').bindTo('position',map,'center');
               }
               that.data('win').open(map);
            });
			
			google.maps.event.addListener(map,'center_changed', function() {
				
				var lat = map.getCenter().lat();
				
				var long = map.getCenter().lng();
				
				var latLng = new google.maps.LatLng(lat, long);
				
				get_address(latLng);
				//google.maps.event.addDomListener(window, 'load');
				// map.getCenter().lat();
				//map.getCenter().lng();
				});
			
					
			}, function(error){
         console.log("Could not get location="+JSON.stringify(error));
  });*/
 
   $cordovaGeolocation.getCurrentPosition(options).then(function(position){
		
		
		
		//alert("la="+position.coords.latitude);
		
		//alert("la="+position.coords.longitude);
		
		if($scope.addressdata.langitude == null || $scope.addressdata.longitude == null)
		{
			
			var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.latitude);
		}
		
		else
		{
			
			var latLng = new google.maps.LatLng($scope.addressdata.langitude, $scope.addressdata.longitude);
		}
 
        
		
		get_address(latLng);
 
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        $scope.map = new google.maps.Map(document.getElementById("mapcanvas"), mapOptions);
		
		
 
        google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
            var marker = new google.maps.Marker({
                 map: $scope.map,
                 animation: google.maps.Animation.DROP,
                 position: latLng,
				
                 icon:'http://i.imgur.com/fDUI8bZ.png'
            });
			
			addYourLocationButton($scope.map, marker);
			
            var infoWindow = new google.maps.InfoWindow({
                content: "Here You Are.!"
            });
			
			//google.maps.event.addListener(marker, 'dragend', function(event) {
				
				//get_address(event.latLng);
				
				// marker.setPosition(event.latLng);
				 
				//});

				google.maps.event.addListener(marker, 'dragend', function (event) {
					//alert("drag1");
					get_address(event.latLng);
			//$scope.map.setCenter(this.getPosition()); // Set map center to marker position
			//updatePosition(this.getPosition().lat(), this.getPosition().lng()); // update position display
		});

		google.maps.event.addListener($scope.map, 'dragend', function () {
			//alert("drag2");
			//marker.setPosition(this.getCenter()); // set marker position to map center
			//marker.setMap(null);
			
			var latLng = new google.maps.LatLng(this.getCenter().lat(), this.getCenter().lng());
			 marker.setPosition(latLng);
			get_address(latLng);
			
			/* var marker = new google.maps.Marker({
                 map: $scope.map,
                 animation: google.maps.Animation.DROP,
                 position: latLng,
				 draggable: true,
                 icon:'http://i.imgur.com/fDUI8bZ.png'
            });*/
			
			//updatePosition(this.getCenter().lat(), this.getCenter().lng()); // update position display
		});
 
            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open($scope.map, marker);
            });
       });
    }, function(error){
         console.log("Could not get location="+JSON.stringify(error));
  });
  
  function addYourLocationButton(map, marker) 
{
	
	var controlDiv = document.createElement('div');
	
	var firstChild = document.createElement('button');
	firstChild.style.backgroundColor = '#fff';
	firstChild.style.border = 'none';
	firstChild.style.outline = 'none';
	firstChild.style.width = '28px';
	firstChild.style.height = '28px';
	firstChild.style.borderRadius = '2px';
	firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
	firstChild.style.cursor = 'pointer';
	firstChild.style.marginRight = '10px';
	firstChild.style.padding = '0px';
	firstChild.title = 'Your Location';
	controlDiv.appendChild(firstChild);
	
	/*var secondChild = document.createElement('div');
	
	secondChild.style.margin = '5px';
	secondChild.style.width = '18px';
	secondChild.style.height = '18px';
	secondChild.style.backgroundImage = 'url(img/mylocation.png)';
	secondChild.style.backgroundSize = '180px 18px';
	secondChild.style.backgroundPosition = '0px 0px';
	secondChild.style.backgroundRepeat = 'no-repeat';
	secondChild.id = 'you_location_img';
	firstChild.appendChild(secondChild);*/
	
	var secondChild = document.createElement("IMG");
	secondChild.setAttribute("src", "img/geo.png");
	secondChild.setAttribute("width", "18px");
	secondChild.setAttribute("height", "18px");
	secondChild.setAttribute("backgroundSize", '180px 18px');
	secondChild.setAttribute("backgroundPosition", '0px 0px');
	secondChild.setAttribute("backgroundRepeat", "no-repeat");
	secondChild.id = 'you_location_img';
	firstChild.appendChild(secondChild);
	
	google.maps.event.addListener(map, 'center_changed', function () {
        secondChild.style['background-position'] = '0 0';
    });
	
	 firstChild.addEventListener('click', function () {
		 
        var imgX = 0,
            animationInterval = setInterval(function () {
                imgX = -imgX - 18 ;
                secondChild.setAttribute['background-position'] = imgX+'px 0';
            }, 500);

        if(navigator.geolocation) {
			
            navigator.geolocation.getCurrentPosition(function(position) {
				
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                //map.setCenter(latlng);
				get_address(latlng);
				//marker.setPosition(latLng);
				marker.setPosition(latlng);
				map.panTo(latlng);
                clearInterval(animationInterval);
				
                secondChild.setAttribute['background-position'] = '-144px 0';
            });
        } else {
            clearInterval(animationInterval);
            secondChild.style['background-position'] = '0 0';
        }
		
		/* $cordovaGeolocation.getCurrentPosition(options).then(function(position){
		
		
		
		
			
			var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.latitude);
			
			alert(latLng);
		
		get_address(latLng);
 
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        $scope.map = new google.maps.Map(document.getElementById("mapcanvas"), mapOptions);
		
		
 
        google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
            var marker = new google.maps.Marker({
                 map: $scope.map,
                 animation: google.maps.Animation.DROP,
                 position: latLng,
				 draggable: true,
                 icon:'http://i.imgur.com/fDUI8bZ.png'
            });
			
			addYourLocationButton($scope.map, marker);
			
					clearInterval(animationInterval);
				                secondChild.setAttribute['background-position'] = '-144px 0';
				
            var infoWindow = new google.maps.InfoWindow({
                content: "Here You Are.!"
            });
			
				google.maps.event.addListener(marker, 'dragend', function (event) {
					//alert("drag1");
					get_address(event.latLng);
			//$scope.map.setCenter(this.getPosition()); // Set map center to marker position
			//updatePosition(this.getPosition().lat(), this.getPosition().lng()); // update position display
		});

		google.maps.event.addListener($scope.map, 'dragend', function () {
			//alert("drag2");
			//marker.setPosition(this.getCenter()); // set marker position to map center
			//marker.setMap(null);
			
			var latLng = new google.maps.LatLng(this.getCenter().lat(), this.getCenter().lng());
			 marker.setPosition(latLng);
			get_address(latLng);
			
			 var marker = new google.maps.Marker({
                 map: $scope.map,
                 animation: google.maps.Animation.DROP,
                 position: latLng,
				 draggable: true,
                 icon:'http://i.imgur.com/fDUI8bZ.png'
            });
			
			//updatePosition(this.getCenter().lat(), this.getCenter().lng()); // update position display
		});
			
       });
    }, function(error){
         console.log("Could not get location="+JSON.stringify(error));
  });*/
		
    });

    controlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
		
}
	
	function get_address(latlng)
	{
		var geocoder = new google.maps.Geocoder();
		  var latlng = latlng;
		  var request = {
			latLng: latlng
		  };
		  
		  geocoder.geocode(request, function(data, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				
			  if (data[0] != null) {
			  
				//$scope.location_info.address = data[0].formatted_address;
				
				//alert("Address="+data[0].formatted_address);
				document.getElementById('address_value').value = data[0].formatted_address;
				
				//$scope.addressdata.address = data[0].formatted_address;
				
			  } else {
				alert("No address available");
			  }
			}
		  })
	}
								
								
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
															
									
								});
	 
	 
	
	$scope.edit_address = function()
	{
		
		
		$scope.addressdata.customer_id = window.localStorage.getItem('user_id');
		
		$scope.addressdata.address = document.getElementById('address_value').value;
		
						
		if($scope.addressdata.building_name == undefined|| $scope.addressdata.address == undefined ) 
		{
			alert("All The Fields To Be Filled");
		}
		
		else
		{
			if($scope.addressdata.address_type == undefined)
				{
					$scope.addressdata.address_type = 1;
				}
				
					$scope.addressdata.check_address = 1;
					
					$scope.addressdata.address_id = $stateParams.address_id;
					
					
			
			$ionicLoading.show();
	 
	$http({
								url: server+'customerupdateaddress',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.addressdata),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								$scope.lastView = $ionicHistory.backView();
								
								$scope.lasturl= $scope.lastView.url;

									if($scope.lasturl == '/app/profile_address_book')
									{
										$state.go('app.profile_address_book');
									}
									else
									{
										$state.go('app.address_book');
									}
							
									
								
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
															
									
								});
			
			
		}
	}
	
}).controller('BillSummaryCtrl', function($rootScope,$scope,$http,$ionicLoading,$ionicPopup,$state,$ionicModal,$rootScope,$ionicSideMenuDelegate){
	
	
	
	$ionicSideMenuDelegate.canDragContent(false);
	
	$rootScope.is_cart = '0';
	
	$rootScope.home_page = '1';
	
	$rootScope.display_cart = '0';
	
	$rootScope.is_cart = '0';
	
	$rootScope.back_show = '1';
	
	$scope.cart_details = {};
	
	$scope.offerdata = {};
	
	$scope.coupon_data = {};
	
	$scope.Coupondata = {};
	
	$scope.error_text = "This is a invalid/outdated code";
	
	$scope.cart_details.customer_id = window.localStorage.getItem('user_id');

	
	
$rootScope.$ionicGoBack = function() {
    if(window.localStorage.getItem('balance_amount')!=undefined)
  {
	 
	   var confirmPopup = $ionicPopup.confirm({
       title: 'Coupon',
       template: 'If you leave from this page the applied coupon will not be available'
     });
     confirmPopup.then(function(res) {
       if(res) {
		   
        window.localStorage.removeItem('balance_amount');
		
		window.localStorage.removeItem('coupon_amt');
		
		document.getElementById('offer').style.display="none";
		
		document.getElementById('apply').style.display="block";
		
		$scope.total_amount = window.localStorage.getItem('original_amount');
		
		
		
       } else {
		   
	   }
         
     });
  }
	
	};
	
	$ionicLoading.show();
			
	$http({
								url: server+'getCartItemsdetails',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								window.localStorage.setItem('actual_amount',response.Cartamount);
								
								if(window.localStorage.getItem('balance_amount')!=undefined)
								{
									
									$scope.total_amount = window.localStorage.getItem('balance_amount');
									
									$scope.amount = window.localStorage.getItem('coupon_amt');
									
									window.localStorage.setItem('total_amount' , $scope.total_amount);
									
									document.getElementById('apply').style.display="none";
									
									document.getElementById('offer').style.display="block";
								} 
								
								else
								{
									
								$scope.total_amount = response.Cartamount;
								
								window.localStorage.setItem('total_amount' , $scope.total_amount);
								
								document.getElementById('apply').style.display="block";

								}
								
								
								
																						
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									
									var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
							
									
								});
	
	$ionicLoading.show();
			
	$http({
								url: server+'doGetTodayCoupons',
								method: "GET",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.offerdata),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								$scope.coupon_data = response.Coupons;
																														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									
									var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
							
									
								});
	
	
	
	$scope.select_pay1 = function(type)
	
	{
		
		 var confirmPopup = $ionicPopup.confirm({
       title: 'Payment Method',
       template: 'Sorry only cash on delivery is available now'
     });
     confirmPopup.then(function(res) {
       if(res) {
        
		
		
       } else {
         
       }
     });
   }
			

					$scope.select_pay = function(type)
	
	{
		
		 var confirmPopup = $ionicPopup.confirm({
       title: 'Payment Method',
       template: 'Are you sure you want to select this payment method'
     });
     confirmPopup.then(function(res) {
       if(res) {
        
		$state.go('app.checkout', {}, { reload: true })
		
       } else {
         
       }
     });
   }
								
		$scope.offer_modal = function()
	{
		
		
		$ionicModal.fromTemplateUrl('templates/offer_modal.html', {
						scope: $scope
					  }).then(function(modal) {
						  
							
							$scope.modal = modal;
							$scope.modal.show();
														
					  });
		
	}
	
	$scope.closeModal =  function()
	 {
		  $scope.modal.remove();
		  $state.go($state.current, {}, {reload: true});
	 }							
	
	$scope.apply_coupon = function()
	{
		$scope.error_text = "This is a invalid/outdated code";
		
		//$scope.offerdata.customer_id = window.localStorage.getItem('user_id');
		
		$scope.offerdata.customer_id =37;
		
		$scope.offerdata.order_amount = window.localStorage.getItem('total_amount');
		
		//$scope.offerdata.coupon_code = window.localStorage.getItem('coupon');
		
		$scope.offerdata.coupon_code = document.getElementById('coupon_val').value;
		
		
		
		$ionicLoading.show();
			
	$http({
								url: server+'doCouponvalidate',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.offerdata),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								
								
								if(response.result == 0)
								{
									document.getElementById('invalid_entry').style.display="block";
								}
								else 
								{
									if(response.hasOwnProperty('coupon_code'))
									{
										window.localStorage.setItem('balance_amount',response.balance_amount);
										window.localStorage.setItem('coupon_amt',response.coupon_amt);
										
										window.localStorage.setItem('coupon_code',$scope.offerdata.coupon_code);
										
										//alert("bl="+window.localStorage.getItem('balance_amount'));
										$scope.closeModal();
										
										$state.go($state.current, {}, {reload: true});
									}
									else
									{
										$scope.error_text = response.message;
										document.getElementById('invalid_entry').style.display="block";
										
									}

								}
																
								$scope.total_amount = response.Cartamount;
								
																						
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									
									var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
							
									
								});
	}
	
	$scope.offer_input = function(code)
	{
		
		//document.getElementById('invalid_entry').style.display="none";
		
		if(code!=undefined)
		{
			
		if(code.length>2)
		{
			
			document.getElementById('clearbtn').style.display = "block";
			document.getElementById('footerbtn').style.display = "block";
		}
		else
		{
			
			document.getElementById('clearbtn').style.display = "none";
			document.getElementById('invalid_entry').style.display="none";
			$scope.Coupondata.coupon_code = [];
			document.getElementById('footerbtn').style.display = "none";
		}
		}
	}
	
	$scope.select_coupon = function()
	{
		document.getElementById('btns').style.display = "block";
	}
	
	$scope.cancel_coupon = function()
	{
		document.getElementById('clearbtn').style.display = "none";
		
		$scope.offerdata.coupon_code = '';
		document.getElementById('footerbtn').style.display = "none";
		
		document.getElementById('invalid_entry').style.display = "none";
		
		//$scope.Coupondata.coupon_code = [];
		
		//document.getElementById('btns').style.display = "none";
		
		//document.getElementById('invalid_entry').style.display = "none";
		
	}
	
	$scope.submit_coupon = function()
	{
		//alert("sub="+$scope.Coupondata.coupon_code);
		
		$scope.error_text = "This is a invalid/outdated code";
		
		$scope.Coupondata.customer_id = window.localStorage.getItem('user_id');
		
		$scope.Coupondata.order_amount = window.localStorage.getItem('total_amount');
		
		$ionicLoading.show();
			
	$http({
								url: server+'doCouponvalidate',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.Coupondata),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								$scope.Coupondata.coupon_code = [];
								document.getElementById('btns').style.display = "none";
								
								if(response.result == 0)
								{
									document.getElementById('invalid_entry').style.display="block";
								}
								else 
								{
									if(response.hasOwnProperty('coupon_code'))
									{
										window.localStorage.setItem('balance_amount',response.balance_amount);
										window.localStorage.setItem('coupon_amt',response.coupon_amt);
										
										window.localStorage.setItem('coupon_code',$scope.offerdata.coupon_code);
										
										//alert("bl="+window.localStorage.getItem('balance_amount'));
										$scope.closeModal();
										
										$state.go($state.current, {}, {reload: true});
									}
									else
									{
										$scope.error_text = response.message;
										document.getElementById('invalid_entry').style.display="block";
										
									}

								}
																
								$scope.total_amount = response.Cartamount;
								
																						
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									
									var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
							
									
								});
		
	}
	
	$scope.click_coupon = function(code)
	{
		
		$scope.offerdata.coupon_code = code;
		window.localStorage.setItem('coupon',code);
		document.getElementById('clearbtn').style.display = "block";
		document.getElementById('footerbtn').style.display = "block";
	}
	
	$scope.clear_coupon = function()
	{
		document.getElementById('clearbtn').style.display = "none";
		
		$scope.offerdata.coupon_code = '';
		document.getElementById('footerbtn').style.display = "none";
		document.getElementById('invalid_entry').style.display = "none";
	}
	
}).controller('BookingHistoryCtrl',function($scope,$rootScope,$ionicPopup,$state, $ionicLoading,$http,$ionicPlatform,$ionicHistory){
	
	$rootScope.back_show = '0';
	
	$rootScope.display_cart = '1';
	
	$rootScope.is_cart = '0';
	
	$scope.reservation_data = {};
	
	$scope.width=window.screen.width;
	$scope.new_width =  parseInt($scope.width)-50;
	
	//$scope.reservation_presentdata = {};
	
	$scope.reservation_data.customer_id = window.localStorage.getItem('user_id');
	
	//$scope.reservation_data.customer_id = 1;
	
	
	$ionicPlatform.registerBackButtonAction(function (event) {
	
	
	
	$scope.lastView = $ionicHistory.backView();
	
	
	
	if($scope.lastView == null)
	{
		$state.go('app.home');
	}
	else
	{
		$scope.lasturl= $scope.lastView.url;

	

	if($scope.lasturl == '/app/home')
								{
									$state.go('app.home');

								}
								
	else if($scope.lasturl == '/app/index')
	{
		$state.go('app.home');
			
	}
	else
	{
		navigator.app.backHistory();
	}
	}

	
}, 100);
	
	
	if(window.localStorage.getItem('user_id')==undefined || window.localStorage.getItem('user_id')==null || window.localStorage.getItem('user_id')=='')
	{
									var alertPopup = $ionicPopup.alert({
										 title: 'Login',
										 template: 'Please login to proceed'
									  });
									  
									  $state.go('app.index');
	}
	
	
		$ionicLoading.show();
			
	$http({
								url: server+'doReservationPresentHistory',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.reservation_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
																							
							$scope.reservation_presentdata = response.Reservationhistory;	

									//alert(JSON.stringify($scope.reservation_presentdata));
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
								
								$ionicLoading.show();
			
	$http({
								url: server+'doReservationPastHistory',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.reservation_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
																							
								$scope.reservation_pastdata = response.Reservationhistory;								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
	
	
	
	$scope.cancel_book = function(id)
	{
		var confirmPopup = $ionicPopup.confirm({
       title: 'Cancel Booking',
       template: 'Are you sure you want to cancel this booking?'
     });
     confirmPopup.then(function(res) {
       if(res) {
		   
		   $scope.reservation_data.customer_id = window.localStorage.getItem('user_id');
		  
		 // $scope.reservation_data.customer_id = 1;
		   
			$scope.reservation_data.booking_id = id;
		   
        $ionicLoading.show();
			
	$http({
								url: server+'doCancelReservation',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.reservation_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
																							
									var alertPopup = $ionicPopup.alert({
										 title: '',
										 template: 'Reservation is cancelled'
									  });
									  
								$state.go($state.current, {}, {reload: true});	
																		
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
				
       } else {
         
       }
     });
	}
	

}).controller('IntroCtrl',function($scope, $rootScope, $ionicSideMenuDelegate, $ionicSlideBoxDelegate, $state, $ionicLoading,$http,$ionicPopup,$ionicModal,$ionicPlatform){
	
	
	
	/* var confirmPopup = $ionicPopup.confirm({
       title: 'Language Selection',
       template: 'Do you want to select any particular language?'
     });
     confirmPopup.then(function(res) {
       if(res) {
        
		$ionicModal.fromTemplateUrl('templates/language_modal.html', {
						scope: $scope
					  }).then(function(modal) {
						  
							
							$scope.modal = modal;
							$scope.modal.show();
														
					  });
		
       } else {
         
       }
     });*/
	 
	 	$ionicPlatform.registerBackButtonAction(function (event) {
			
						
  if($state.current.name=="app.intro"){
    navigator.app.exitApp(); 
  }
  else {
    navigator.app.backHistory();
  }
}, 100);


	 $scope.langdata = {};
	 
	 $scope.indexval = 1;
	 
	 $scope.langdata.lang = 'Afrikanns';
	 
	 
	 
	 $scope.select_lang = function()
	 {
		 
		window.localStorage.setItem('lang',$scope.langdata.lang);
		$scope.closeModal();
	 }
	 
	 
	 $ionicModal.fromTemplateUrl('templates/language_modal.html', {
						scope: $scope
					  }).then(function(modal) {
						  
							
							$scope.modal = modal;
							$scope.modal.show();
														
					  });
	 
		
	$scope.closeModal =  function()
	 {
		  $scope.modal.remove();
		 
	 }
	
	
	$rootScope.back_show = '0';
	
	$rootScope.display_cart = '0';
	
	$scope.intro = {};
	
	$ionicSideMenuDelegate.canDragContent(false);
	
	$scope.slideChanged = function(index) {
		
	//	console.log(index);
    $scope.slideIndex = index;
	
	 $scope.indexval = parseInt($scope.slideIndex)+1;	
	
	};
	
	 $scope.startApp = function() {
		 
		if(window.localStorage.getItem('user_id')==1)
			  {
				 $state.go('app.home');
			  }
  else
  {
	 $state.go('app.index');
  }
	};
	
  $scope.next = function() {
	  
		$ionicSlideBoxDelegate.next();
	};
	
  $scope.previous = function() {
	  
    $ionicSlideBoxDelegate.previous();
	
	};
	
	
	 $ionicLoading.show();
			
	$http({
								url: server+'Introscreen',
								method: "GET",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.intro),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
																							
									//alert(JSON.stringify(response));
									
									$scope.intro_images = response.introbannerimages;
							
									$scope.length = response.introbannerimages.length;
									
									//$scope.lesslength = parseInt($scope.qty)-1;			
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
	
	
}).controller('OrderDetailsCtrl', function($scope,$rootScope,$stateParams, $ionicLoading,$http,$ionicPopup,$ionicModal,$cordovaGeolocation,$stateParams){
	
	
	
	$rootScope.display_cart = '1';
	
	$rootScope.is_cart = '0';
	
		
	$rootScope.back_show = 1;
	
	$scope.order_details = {};
	
	$scope.order_items = {};
	
	$scope.ratedata = {};
	
	$scope.feedbackdata = {};
	
	$scope.driver_item = {};
	
	// $scope.ratedata = {'qst1':'','qstn2':'','comment':'','qstn4':'','qstn5':''};
	 
	 //console.log($scope.ratedata.qst1);
	 
	 $scope.order_id = $stateParams.order_id;
	
	$scope.order_details.orderid = $stateParams.order_id;
	
	$scope.restro_latitude = $stateParams.lat;
	
	$scope.restro_longitude = $stateParams.long;
	
	
	
	$scope.order_details.customer_id = window.localStorage.getItem('user_id');
	
	
	 
	 $ionicLoading.show();
	 
	$http({
								url: server+'orderItemsdetails',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.order_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
										//alert("res="+JSON.stringify(response));	

											$ionicLoading.hide();
								
								//alert(JSON.stringify(response));
								
								$scope.order_items = response.CustomerordersItems;
								
								$scope.order_items.total_amount = response.Ordersamount;	
								
								$scope.noSpaces = $scope.order_items[0].order_status_desc;
								
								$scope.cust_latitude = $scope.order_items[0].latitude;
								
								$scope.cust_longitude = $scope.order_items[0].longitude;

								$scope.order_items.order_status = $scope.noSpaces.replace(/ /g, '');	

										var options = {maximumAge:100000, timeout:50000, enableHighAccuracy:false};
							
						$cordovaGeolocation.getCurrentPosition(options).then(function(position){
	  
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	
	//alert("cus lon="+$scope.cust_longitude);
	
	//alert("cus lat="+$scope.cust_latitude);
	
	//alert($scope.restro_latitude);
	
	//alert($scope.restro_longitude);
	
	var markers = [
								{	//"lat":window.localStorage.getItem('cur_lat'),
									//"lng":window.localStorage.getItem('cur_long'),
									
									//"lat":$scope.restro_latitude,
									//"lng": $scope.restro_longitude,
									
									"lat":13.0012,
									"lng": 80.2565,
									

								},
								
								{
									//"lat":window.localStorage.getItem('cust_lat'),
									//"lng":window.localStorage.getItem('cust_long'),
									
									"lat":$scope.cust_latitude,
									"lng":$scope.cust_longitude,
									
									
								}
								
							];
	
    
     var mapOptions = {
       center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
      zoom:15,
    
    };
	
	
	 
	var map = new google.maps.Map(document.getElementById("map_canvas1"), mapOptions);
	
	 
	
	
	 var infoWindow = new google.maps.InfoWindow();
        var lat_lng = new Array();
        var latlngbounds = new google.maps.LatLngBounds();
		
		
			var data = markers[0]
            var myLatlng = new google.maps.LatLng(data.lat, data.lng);
			
			
            lat_lng.push(myLatlng);
            var marker = new google.maps.Marker({
                position: myLatlng, 
                map: map,
               
				icon : 'https://maps.google.com/mapfiles/kml/pal2/icon32.png'
            });
            latlngbounds.extend(marker.position);
            ;
		  data = markers[1]
             myLatlng = new google.maps.LatLng(data.lat, data.lng);
			 
			
            lat_lng.push(myLatlng);
             marker1 = new google.maps.Marker({
                position: myLatlng,
                map: map,
               
				icon : 'https://maps.google.com/mapfiles/kml/pal2/icon10.png'
            });
            latlngbounds.extend(marker1.position);

			//addYourLocationButton($scope.map, marker)
			
			addYourLocationButton(map, markers);
 
    //***********ROUTING****************//
	
	
		 var path = new google.maps.MVCArray();
 
        //Initialize the Direction Service
        var service = new google.maps.DirectionsService();
 
        //Set the Path Stroke Color
        //var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7',strokeOpacity: 1.0, strokeWeight: 2 });
		var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });
	
		service.route({
                    origin: lat_lng[0],
                    destination: lat_lng[1],
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                }, function (result, status) {
					
					
					
                    if (status == google.maps.DirectionsStatus.OK) {
						
						 
                        for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                            path.push(result.routes[0].overview_path[i]);
                        }
                    }
                });
				
				 //Loop and Draw Path Route between the Points on MAP
				
				 for (var i = 0; i < lat_lng.length; i++) {
					 
            if ((i + 1) < lat_lng.length) {
                var src = lat_lng[i];
                var des = lat_lng[i + 1];
                path.push(src);
				
                poly.setPath(path);
               
            }
        }
 
  }, function(error){
	  //alert("error loc");
    console.log("Could not get location="+JSON.stringify(error));
  });
									
									//alert("a="+$scope.order_items.order_status);
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
								
				$scope.select_qstn = function(type)
				{
					
					
					$scope.question_type = JSON.parse(type);
					
					
					localStorage.setItem('form_id',$scope.question_type.formid);
					
					//alert(JSON.stringify($scope.question_type));
				}
	
	$scope.open_rate = function()
	{
		
		
		$ionicModal.fromTemplateUrl('templates/open_rate.html', {
						scope: $scope
					  }).then(function(modal) {
						  
							
							$scope.modal = modal;
							$scope.modal.show();
							
							$scope.question_type = {};
							
							 $ionicLoading.show();
	 
	$http({
								url: server+'doGetfeedbackquestions',
								method: "GET",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.order_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
										//alert("res="+JSON.stringify(response));	
								$scope.feedback_data = response.customer;
								
																						
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
							
														
					  });
		
	}
	
	$scope.closeModal =  function()
	 {
		  $scope.modal.remove();
	 }
	 
	 $scope.rate_delivery = function()
	 {
		// console.log($scope.ratedata);
		//alert(JSON.stringify($scope.ratedata));
		
		//alert(JSON.stringify($scope.ratedata));
		
		$scope.answers = Object.values($scope.ratedata);
		
		$scope.questions = Object.keys($scope.ratedata);
		
		$scope.feedbackdata.feedbackanswers = $scope.answers;
		
		$scope.feedbackdata.feedbackquestions = $scope.questions;
		
	//	$scope.ratedata.feedback_text = '';
		
		//alert($scope.ratedata.questions);
		
		
		
		//alert($scope.ratedata.answers);
		
		//alert($scope.ratedata.2);
		$scope.feedbackdata.feedback_text = document.getElementById('comment_text').value;
		//alert(document.getElementById('comment_text').value);
		 
		 $scope.feedbackdata.customer_id = window.localStorage.getItem('user_id');
		 
		 $scope.feedbackdata.order_id = $stateParams.order_id;
		 
		//  $scope.ratedata.form_id = window.localStorage.getItem('form_id');
		 
			//$scope.ratedata.feedback_text = ''; 
			
		/*	angular.forEach(response.Cartitems, function(value) {
									
								$scope.item_list.push(value.item_id);
								
								$scope.item_quantity.push(value.quanitity);
								
								$scope.item_amount.push(value.item_price);
								
								
								});*/
			
			/*if( $scope.ratedata.hasOwnProperty('feedback_score')){
				
				$scope.ratedata.feedback_text = ''; 
				
				}
				else
				{
					$scope.ratedata.feedback_score = ''; 
				}*/
				
		 
		 $scope.closeModal();
		 
		 //alert(JSON.stringify($scope.ratedata));
		 
		  $ionicLoading.show();
	 
	$http({
								url: server+'doFeedbacksubmit',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.feedbackdata),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
															
								 $scope.ratedata = {};			

								var alertPopup = $ionicPopup.alert({
									title: '',
									template: 'Sucessfully rated the delivery boy'
									  });
							
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
		 
	 }
	 
	 
	 
	   
  
  			  function addYourLocationButton(map, marker) 
{
	
	var controlDiv = document.createElement('div');
	
	var firstChild = document.createElement('button');
	firstChild.style.backgroundColor = '#fff';
	firstChild.style.border = 'none';
	firstChild.style.outline = 'none';
	firstChild.style.width = '28px';
	firstChild.style.height = '28px';
	firstChild.style.borderRadius = '2px';
	firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
	firstChild.style.cursor = 'pointer';
	firstChild.style.marginRight = '10px';
	firstChild.style.padding = '0px';
	firstChild.title = 'Your Location';
	controlDiv.appendChild(firstChild);
	
	/*var secondChild = document.createElement('div');
	
	secondChild.style.margin = '5px';
	secondChild.style.width = '18px';
	secondChild.style.height = '18px';
	secondChild.style.backgroundImage = 'url(img/mylocation.png)';
	secondChild.style.backgroundSize = '180px 18px';
	secondChild.style.backgroundPosition = '0px 0px';
	secondChild.style.backgroundRepeat = 'no-repeat';
	secondChild.id = 'you_location_img';
	firstChild.appendChild(secondChild);*/
	
	var secondChild = document.createElement("IMG");
	secondChild.setAttribute("src", "img/geo.png");
	secondChild.setAttribute("width", "18px");
	secondChild.setAttribute("height", "18px");
	secondChild.setAttribute("backgroundSize", '180px 18px');
	secondChild.setAttribute("backgroundPosition", '0px 0px');
	secondChild.setAttribute("backgroundRepeat", "no-repeat");
	secondChild.id = 'you_location_img';
	firstChild.appendChild(secondChild);
	
	google.maps.event.addListener(map, 'center_changed', function () {
        secondChild.style['background-position'] = '0 0';
    });
	
	 firstChild.addEventListener('click', function () {
		 
        var imgX = 0,
            animationInterval = setInterval(function () {
                imgX = -imgX - 18 ;
                secondChild.setAttribute['background-position'] = imgX+'px 0';
            }, 500);

        if(navigator.geolocation) {
			
            navigator.geolocation.getCurrentPosition(function(position) {
				
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                
				map.setCenter(latlng);
				//marker.setPosition(latLng);
				//marker.setPosition(latlng);
				//map.panTo(latlng);
                clearInterval(animationInterval);
				
                secondChild.setAttribute['background-position'] = '-144px 0';
            });
        } else {
            clearInterval(animationInterval);
            secondChild.style['background-position'] = '0 0';
        }
		
	
		
    });

    controlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
		
}
		$scope.toggleGroup = function(group) {
									
				if ($scope.isGroupShown(group)) {
					
					$scope.shownGroup = '0';
					} else {
						
			$scope.shownGroup = group;
			
			$scope.driver_item.customer_id = window.localStorage.getItem('user_id');
			
			$scope.driver_item.order_id = group;
			
				$ionicLoading.show();
			
	$http({
								url: server+'getdeliveryboyapi',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.driver_item),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								//alert(JSON.stringify(response));
								
								$scope.driver_details = response.Deliveryboydetails;		
								
								
								
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
												 title: 'Network Error',
												 template: 'Please try after some time'
											  });
																	
									
								});
			
			}
			};
			
			$scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
  
  $scope.itemtoggleGroup = function(group) {
									
				if ($scope.isitemGroupShown(group)) {
					
					$scope.itemshownGroup = '0';
					} else {
						
			$scope.itemshownGroup = group;
			
						
			}
			};
			
			$scope.isitemGroupShown = function(group) {
    return $scope.itemshownGroup === group;
  };
	
}).controller('OrderPlacedCtrl', function($scope,$rootScope,$ionicPlatform,$ionicPopup){
	
	/*$ionicPlatform.registerBackButtonAction(function (event) {
		event.preventDefault();
		}, 100);*/
	
	$rootScope.display_cart = '0';
	
	$rootScope.cart_qty = '0';
	
	$rootScope.is_cart = '0';
	
	$scope.order_id = window.localStorage.getItem('order_id');
	
	
	
}).controller('CheckOutCtrl', function($scope,$ionicLoading,$http,$rootScope,$state,$ionicPopup){
	
	 $scope.width=window.screen.width;
	
	$scope.new_width = $scope.width/4;
		
	$rootScope.display_cart = '0';
	
	$rootScope.is_cart = '0';
	
	$rootScope.back_show = '1';
	
	$scope.cart_details = {};
	
	$scope.total_amount = {};
	
	$scope.checkout_details = {};
	
	$scope.item_list = [];
	
	$scope.item_quantity = [];
	
	$scope.item_amount = [];
	
	$scope.offer_id = [];
	
	$scope.cart_details.customer_id = window.localStorage.getItem('user_id');
	
	$scope.checkout_details.customer_id = window.localStorage.getItem('user_id');
	
	
	$ionicLoading.show();
			
	$http({
								url: server+'getCartItemsdetails',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								if(window.localStorage.getItem('balance_amount')!=undefined)
								{
									$scope.total_amount = window.localStorage.getItem('balance_amount');
									
								} 
								
								else
								{
									$scope.total_amount = response.Cartamount;
									
									window.localStorage.setItem('original_amount',$scope.total_amount);
								
								}
								
								
								
								//$scope.cart_items.total_amount = response.Cartamount;
							
							$scope.cart_items = response.Cartitems;
							
							$scope.cart_branch_id = response.Cartitems[0].restaurant_id;
							
							$scope.cart_branch_name = response.Cartitems[0].restaurant_name;
							
														
							if(window.localStorage.getItem('restaurant_id')!=$scope.cart_branch_id)
							{
								window.localStorage.setItem('restaurant_id',$scope.cart_branch_id);
								
								window.localStorage.setItem('branch_name',$scope.cart_branch_name);
		
								$scope.branch_details =  $scope.cart_branch_id+','+$scope.cart_branch_name;

								window.localStorage.setItem('branch_details',$scope.branch_details);
							}
							
							
							angular.forEach(response.Cartitems, function(value) {
									
								$scope.item_list.push(value.item_id);
								
								$scope.item_quantity.push(value.quanitity);
								
								$scope.item_amount.push(value.item_price);
								
								if(value.offer_id!=null)
								{
									$scope.offer_id.push(value.offer_id);
								}
								
								
								});
														
								
						//alert("l="+JSON.stringify($scope.item_list));
							$scope.cart_items.cart_amount = response.Cartamount;
								checkout_address();		
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									
									var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
							
									
								});
								
								
				

					function checkout_address()
					{
						
						$scope.checkout_details.customer_id = window.localStorage.getItem('user_id');
						
						
						$ionicLoading.show();
			
	$http({
								url: server+'checkoutaddress',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.checkout_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert("res="+JSON.stringify(response));
							
							$scope.checkout_details = response.Customeraddress;
							
							$scope.table_id = response.Customeraddress.id;
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
								 title: 'Network Error',
								 template: 'Please try after some time'
							  });
							
									
								});			
					}
					
					
		$scope.order_placed = function()
			{
				if($scope.table_id == undefined)
				{
					//alert("Please select the delivery address ");
					var alertPopup = $ionicPopup.alert({
					 title: '',
					 template: 'Please select the delivery address'
				  });
				}
				
				else
				{
					$scope.orderplaced_details = {};
				
				var today = new Date();
				
				
				
				var dd = today.getDate();
				var mm = today.getMonth()+1;
				var yy = today.getFullYear();
				
				var hh = today.getHours();
				var ms = today.getMinutes();
				var ss = today.getSeconds();
				
				$scope.orderplaced_details.order_date = yy+'-'+mm+'-'+dd+' '+hh+':'+ms+':'+ss;
				
				
						
				$scope.orderplaced_details.customer_id = window.localStorage.getItem('user_id');
				
				$scope.orderplaced_details.ordertype_name = 'COD'; 
				
				$scope.orderplaced_details.ordertype_desc = 'Cash On Delivery';
				if(window.localStorage.getItem('restaurant_id') == null || window.localStorage.getItem('restaurant_id') == undefined)
				{
					$scope.orderplaced_details.restaurant_id = '1';
				}
				else
				{
					$scope.orderplaced_details.restaurant_id = window.localStorage.getItem('restaurant_id');
				}
				
				//$scope.orderplaced_details.restaurant_id = '1';
				
				$scope.orderplaced_details.offer_id = $scope.offer_id;
				
								
				$scope.orderplaced_details.item_id = $scope.item_list;
				
				$scope.orderplaced_details.item_quantity =  $scope.item_quantity;
				
				$scope.orderplaced_details.amount = $scope.item_amount;
				
				$scope.orderplaced_details.totalamount = $scope.total_amount;
				
				$scope.orderplaced_details.address_type_id = $scope.table_id;
				
				$scope.orderplaced_details.coupon_code = window.localStorage.getItem('coupon_code');
						
						//alert("a="+JSON.stringify($scope.orderplaced_details));
						
						
							$ionicLoading.show();
			
	$http({
								url: server+'doaddorderitems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.orderplaced_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert("res="+JSON.stringify(response));
							window.localStorage.setItem('order_id', response.orderid);
							
							$rootScope.cart_cart_qty = 0;
							
							 window.localStorage.removeItem('balance_amount');
		
							window.localStorage.removeItem('coupon_amt');
							
							window.localStorage.removeItem('original_amount');
						
							
							$state.go('app.order_placed');
							
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});	
				}
				
					
						
						
			}
					
	
								
	
}).controller('TrackCtrl', function($scope,$rootScope, $cordovaGeolocation, $ionicLoading, $http, $stateParams, $ionicPopup){
	
	$scope.width=window.screen.width;
	
	
	
	$rootScope.back_show = '1';
	
	$rootScope.display_cart = '1';
	
	angular.element(document).ready(function () {
	  
	  
	  get_track();
	  
	  setInterval(get_track, 10000);
	  
	  function get_track()
	  {
		  
		  $scope.track = {};
	
	$scope.track.customer_id = window.localStorage.getItem('user_id');
	
	$scope.track.order_id = $stateParams.order_id;
	
	//$scope.track.customer_id = 27;
	
	//$scope.track.order_id = 19;
	
	//$ionicLoading.show();
			
	$http({
								url: server+'doCustomertracksapi',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.track),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert("res="+JSON.stringify(response));
								
									$scope.track = response.trackinfo[0];
									
									window.localStorage.setItem('dr_lat',$scope.track.latitude);
									window.localStorage.setItem('dr_long',$scope.track.longitude);
									
									
									var watchOptions = {
    timeout : 30000,
    enableHighAccuracy: false // may cause errors if true
  };
	  
	  
	   var options = {maximumAge:100000, timeout:50000, enableHighAccuracy:true};
  
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
	  
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	
	//alert(position.coords.latitude);

	//alert(position.coords.longitude);
	
	//alert("cl="+position.coords.latitude);
	
	//alert("clon="+position.coords.longitude);
	
	//alert("derl="+window.localStorage.getItem('dr_lat'));
	
	//alert("derl="+window.localStorage.getItem('dr_long'));
	
	var markers = [
								{
									"lat":position.coords.latitude,
									"lng": position.coords.longitude,
									
									//"lat":13.0012,
									//"lng": 80.2565,

								},
								
								{
									"lat":window.localStorage.getItem('dr_lat'),
									"lng":window.localStorage.getItem('dr_long'),
									
									//"lat":12.9760,
									//"lng":80.2212,

								}
								
							];
	
    
     var mapOptions = {
       center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
	
	 
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	 var infoWindow = new google.maps.InfoWindow();
        var lat_lng = new Array();
        var latlngbounds = new google.maps.LatLngBounds();
		
		
			var data = markers[0]
            var myLatlng = new google.maps.LatLng(data.lat, data.lng);
            lat_lng.push(myLatlng);
            var marker = new google.maps.Marker({
                position: myLatlng, 
                map: map,
                title: data.victim_address,
				icon : 'https://maps.google.com/mapfiles/kml/shapes/man.png'
            });
            latlngbounds.extend(marker.position);
            ;
		 data = markers[1]
             myLatlng = new google.maps.LatLng(data.lat, data.lng);
            lat_lng.push(myLatlng);
             marker1 = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: data.victim_address,
				icon : 'https://maps.google.com/mapfiles/kml/shapes/motorcycling.png'
            });
            latlngbounds.extend(marker1.position);
			
			addYourLocationButton(map, markers);
 
    //***********ROUTING****************//
	
	
		 var path = new google.maps.MVCArray();
 
        //Initialize the Direction Service
        var service = new google.maps.DirectionsService();
 
        //Set the Path Stroke Color
        var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });
 
		service.route({
                    origin: lat_lng[0],
                    destination: lat_lng[1],
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                }, function (result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                            path.push(result.routes[0].overview_path[i]);
                        }
                    }
                });
				
				 for (var i = 0; i < lat_lng.length; i++) {
					 
            if ((i + 1) < lat_lng.length) {
                var src = lat_lng[i];
                var des = lat_lng[i + 1];
                path.push(src);
				
                poly.setPath(path);
                
            }
        }
 
  }, function(error){
    console.log("Could not get location="+error);
  });
	  
	  
	/*  google.maps.event.addListenerOnce($scope.map, 'idle', function(){
		  
		  alert("aa");
 
				  var marker = new google.maps.Marker({
					  map: $scope.map,
					  animation: google.maps.Animation.DROP,
					  position: latLng
				  });      
				 
				});*/
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});	
	
	
		  
	  }

	  
	  
	  		
				  function addYourLocationButton(map, marker) 
{
	
	
	var controlDiv = document.createElement('div');
	
	var firstChild = document.createElement('button');
	firstChild.style.backgroundColor = '#fff';
	firstChild.style.border = 'none';
	firstChild.style.outline = 'none';
	firstChild.style.width = '28px';
	firstChild.style.height = '28px';
	firstChild.style.borderRadius = '2px';
	firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
	firstChild.style.cursor = 'pointer';
	firstChild.style.marginRight = '10px';
	firstChild.style.padding = '0px';
	firstChild.title = 'Your Location';
	controlDiv.appendChild(firstChild);
	
	/*var secondChild = document.createElement('div');
	
	secondChild.style.margin = '5px';
	secondChild.style.width = '18px';
	secondChild.style.height = '18px';
	secondChild.style.backgroundImage = 'url(img/mylocation.png)';
	secondChild.style.backgroundSize = '180px 18px';
	secondChild.style.backgroundPosition = '0px 0px';
	secondChild.style.backgroundRepeat = 'no-repeat';
	secondChild.id = 'you_location_img';
	firstChild.appendChild(secondChild);*/
	
	var secondChild = document.createElement("IMG");
	secondChild.setAttribute("src", "img/geo.png");
	secondChild.setAttribute("width", "18px");
	secondChild.setAttribute("height", "18px");
	secondChild.setAttribute("backgroundSize", '180px 18px');
	secondChild.setAttribute("backgroundPosition", '0px 0px');
	secondChild.setAttribute("backgroundRepeat", "no-repeat");
	secondChild.id = 'you_location_img';
	firstChild.appendChild(secondChild);
	
	google.maps.event.addListener(map, 'center_changed', function () {
        secondChild.style['background-position'] = '0 0';
    });
	
	 firstChild.addEventListener('click', function () {
		 
        var imgX = 0,
            animationInterval = setInterval(function () {
                imgX = -imgX - 18 ;
                secondChild.setAttribute['background-position'] = imgX+'px 0';
            }, 500);

        if(navigator.geolocation) {
			
            navigator.geolocation.getCurrentPosition(function(position) {
				
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                
				map.setCenter(latlng);
				//marker.setPosition(latLng);
				//marker.setPosition(latlng);
				//map.panTo(latlng);
                clearInterval(animationInterval);
				
                secondChild.setAttribute['background-position'] = '-144px 0';
            });
        } else {
            clearInterval(animationInterval);
            secondChild.style['background-position'] = '0 0';
        }
		
	
		
    });

    controlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
		
}

	  
	
});
   
	
	
}).controller('WalletCtrl', function($scope,$rootScope,$ionicPopup){
	
	$rootScope.back_show = 1;
	
	$scope.width=window.screen.width;
	
	$scope.half_width = $scope.width/2;
	
	$scope.new_width =  parseInt($scope.half_width)-50;
	
	
	
}).controller('ProfileAddressBookCtrl', function($scope, $rootScope, $ionicLoading, $http, $ionicPopup){
	
	
	
	$scope.width=window.screen.width;
	$rootScope.home_page = '0';
	
	$rootScope.is_cart = '0';
	
	$rootScope.back_show = '1';
	
	$rootScope.display_cart = '1';
	
	$rootScope.is_cart = '0';
	
	$scope.address_details = {};
	
	$scope.customer_details = {};
	
	$scope.remove_address = {};
	
	$scope.checkout_address = {};
	
	$scope.address_type_ids = [];
	
	$scope.customer_details.customer_id = window.localStorage.getItem('user_id');
	
				 
		 get_address();
		 
	
		function get_address()
		{
			
			$ionicLoading.show();
		 
		 window.localStorage.removeItem('address_type_ids');
		 
		 $scope.address_type_ids = [];
		 
		 
			
	$http({
								url: server+'getcustomeraddress',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.customer_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response));
							
								$scope.address_details = response.Customeraddress;
								
								$scope.address_length = $scope.address_details.length;
								
								angular.forEach(response.Customeraddress, function(value) {
									
								$scope.address_type_ids.push(value.address_type_id);
								//alert($scope.list_id);
								
										
								
								});
								
								//alert($scope.address_type_ids);
								
								window.localStorage.setItem('address_type_ids',JSON.stringify($scope.address_type_ids));
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Errro',
										 template: 'Please try after some time'
									  });
							
									
								});
			
		}
		
		$scope.delete_address = function(type_id)
	
	{
		
		$scope.remove_address.customer_id = window.localStorage.getItem('user_id');
		
		$scope.remove_address.address_type_id = type_id;
		
		
		
		 var confirmPopup = $ionicPopup.confirm({
       title: 'Delete Address',
       template: 'Are you sure you want to delete this address?'
     });
     confirmPopup.then(function(res) {
       if(res) {
        
		
		
		$ionicLoading.show();
			
	$http({
								url: server+'removeaddress',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.remove_address),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
								//alert(JSON.stringify(response.message));	
							//	alert("address deleted sucessfully");
							
								get_address();
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
		
       } else {
         
       }
     });
   }
								
		$scope.address_full = function()
		{
				 var alertPopup = $ionicPopup.alert({
         title: '',
         template: 'Sorry you cant add a new address,because you already added all the 3 addresses. '
      });
		}

			
	
}).controller('EnquiryCtrl', function($scope ,$ionicPopup,$ionicLoading,$http,$state,$ionicModal){
	
	$scope.enqdata = {};
	
	
	$scope.open_calltime = function()
	{
		
		
		$ionicModal.fromTemplateUrl('templates/call_times.html', {
						scope: $scope
					  }).then(function(modal) {
						  
							
							$scope.modal = modal;
							$scope.modal.show();
														
					  });
		
	}
	
	$scope.closeModal =  function()
	 {
		  $scope.modal.remove();
	 }
	 
	 $scope.select_calltime = function(slot)
	 {
		 
		 $scope.enqdata.callback_at = slot;
		  $scope.modal.remove();
	 }
	
	$scope.enquiry_submit = function()
	{
		
		$scope.enqdata.customer_id = window.localStorage.getItem('user_id');
				
		if($scope.enqdata.name == undefined || $scope.enqdata.phone_number == undefined || $scope.enqdata.enquiry_type == undefined|| 
		$scope.enqdata.callback_at == undefined || $scope.enqdata.enquiry_details == undefined)
		{
			 var alertPopup = $ionicPopup.alert({
         title: 'Required Fields',
         template: 'All the fields are required'
      });
		}
		
		else
		{
			
			$ionicLoading.show();
			
	$http({
								url: server+'doAddenquiries',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.enqdata),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							var alertPopup = $ionicPopup.alert({
										 title: 'Enquiry Received',
										 template: 'We will contact you shortly'
										 
									  });
									$state.go('app.home');					
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
		}
		
	}
}).controller('ViewOfferCtrl',function($scope,$ionicLoading,$state,$stateParams,$http,$ionicPopup,$rootScope,$ionicPlatform,$ionicHistory){
	
	
	$scope.offer_details = {};
	
	$scope.cart_details = {};
	
	$scope.cart_data = {};
	
	$scope.cart_items = {};
	
	$scope.cart_item = {};
	
	$scope.get_cart = {};
	
	$scope.removecart = {};
	
	$ionicPlatform.registerBackButtonAction(function (event) {
	
	
	
	$scope.lastView = $ionicHistory.backView();
	
	
	
	if($scope.lastView == null)
	{
		$state.go('app.home');
	}
	else
	{
		$scope.lasturl= $scope.lastView.url;

	

	if($scope.lasturl == '/app/home'  || $scope.lasturl == '/app/index')
								{
									$state.go('app.home');

								}
	else if($scope.lasturl == '/app/hot_offers')
	{
		$state.go('app.hot_offers');
	}
		
	
	else
	{
		navigator.app.backHistory();
	}
	}

	
}, 100);


	
	
	
	if(window.localStorage.getItem('user_id')==undefined || window.localStorage.getItem('user_id')==null || window.localStorage.getItem('user_id')=='')
		{
			//alert("Please login to proceed");
			var alertPopup = $ionicPopup.alert({
         title: 'Login',
         template: 'Please login to proceed'
      });
			$state.go('app.index');
		}
		
	else
	{
		
		
		get_cart_details();
	 
	 function get_cart_details()
	 {
		 $scope.list_id = [];
		 
		  $scope.cart_item.customer_id = window.localStorage.getItem('user_id');
		 
		 $ionicLoading.show();
			
	$http({
								url: server+'getCartItemsdetails',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_item),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
													
							$scope.cart_items = response.Cartitems;
							
							if($scope.cart_items.length == 0)
							{
								$scope.branch_id = 0;
								
								$scope.branch_name = 0;
								
								$rootScope.cart_qty = 0;
							}
							else
							{
								$scope.branch_id = response.Cartitems[0].restaurant_id;
								
								$scope.branch_name = response.Cartitems[0].restaurant_name;
								
								$rootScope.cart_count =response.Cartitems.length;
								//alert("cc="+$rootScope.cart_count);
								$rootScope.cart_qty =1;
								
							}
							
										angular.forEach(response.Cartitems, function(value) {
									
								$scope.list_id.push(value.item_id);
								//alert($scope.list_id);
								
												
								
								});				
							
							;
							
									//console.log($scope.list_id);
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									
									var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
							
									
								});
	
	 }
		
		
		$scope.offer_details.customer_id = window.localStorage.getItem('user_id');
		
		$scope.offer_details.offer_id = $stateParams.offer_id;
		
		$ionicLoading.show();
			
	$http({
								url: server+'doOffersviewdetails',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.offer_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								$scope.offerdetails = response.offerdetails;
											
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
	}
	
		
	
	$scope.click_add = function(id,price,offer_amt,offer_type)
	{
	
		if(window.localStorage.getItem('user_id')==undefined || window.localStorage.getItem('user_id')==null || window.localStorage.getItem('user_id')=='')
		{
			//alert("Please login to proceed");
			var alertPopup = $ionicPopup.alert({
         title: 'Login',
         template: 'Please login to proceed'
      });
			$state.go('app.index');
		}
		
		else
			
			{
				
				//alert("cart branch="+$scope.branch_id);
				
				//alert("cart_b_name="+$scope.branch_name);
				
				
				
				$scope.current_branch_id = window.localStorage.getItem('restaurant_id');
		
				$scope.current_branch_name = window.localStorage.getItem('branch_name');
				
				//alert("br sel="+$scope.current_branch_id);
				
				//alert("br name_sel="+$scope.current_branch_name);
				
			if($scope.current_branch_id != $scope.branch_id && $scope.branch_id !=0)
				{
					var confirmPopup = $ionicPopup.confirm({
				title: 'Replace cart item?',
				template: 'Your cart contains dishes from '+$scope.branch_name+'. Do you want to discard the selection and add dishes from '+$scope.current_branch_name+'.'
				});
			confirmPopup.then(function(res) {
				if(res) 
				{
				//remove previous cart and add new
				
				$scope.get_cart.customer_id = window.localStorage.getItem('user_id');
				
				//alert(JSON.stringify($scope.get_cart));
				
					 $ionicLoading.show();
			
	$http({
								url: server+'getCartItemsdetails',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.get_cart),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								//alert(JSON.stringify(response));
								
								
									$scope.item_details = response.Cartitems;
									//alert(JSON.stringify($scope.item_details));
								
									angular.forEach(response.Cartitems, function(value) {
									
									
									$scope.cart_id = value.cart_id;	
																			
									
									$scope.removecart.customer_id = window.localStorage.getItem('user_id');
		
		$scope.removecart.cart_id = $scope.cart_id;
		
		 $ionicLoading.show();
			
	$http({
								url: server+'doremoveCart',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.removecart),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
										//alert(JSON.stringify(response));				
																					
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
									
								});
											
								
								});
								
								
								$scope.add_items(id,price,offer_amt,offer_type);
								
								
								
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
												 title: 'Network Error',
												 template: 'Please try after some time'
											  });
																	
									
								});
		
		
				} 
				else 
				{
					 window.localStorage.setItem('branch_name',$scope.branch_name);
					 
					 window.localStorage.setItem('restaurant_id',$scope.branch_id);
					 
					 $scope.branch_details =  $scope.branch_id+','+$scope.branch_name;

					window.localStorage.setItem('branch_details',$scope.branch_details);
					
					$state.go('app.hot_offers');
				}
			});
				}
				
				else
				{
					//alert("same branch");
					$scope.cart_data.customer_id = window.localStorage.getItem('user_id');
		
		$scope.cart_data.restaurant_id = window.localStorage.getItem('restaurant_id');
		
		$scope.cart_data.offer_id = $stateParams.offer_id;
		
		$scope.total_qty = 1;
		
		$scope.cart_data.item_id = id;
				
				$scope.cart_data.noofquantity = $scope.total_qty;
				
				$scope.cart_data.actual_amount = $scope.total_qty * price;
				
				if(offer_type == 'percent')
				{
					$scope.perecnt = parseInt($scope.cart_data.actual_amount)/parseInt(offer_amt);
					$scope.cart_data.amount = parseInt($scope.cart_data.actual_amount)-parseInt($scope.perecnt);
				}
				else if(offer_type == 'amount')
				{
					$scope.cart_data.amount = parseInt($scope.cart_data.actual_amount)-parseInt(offer_amt);
								
				}
				
				
			   
			    //$rootScope.cart_qty =1;
				
				//alert("D="+JSON.stringify($scope.cart_data));
			 $ionicLoading.show();
			
	$http({
								url: server+'AddCartItems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
								$rootScope.cart_count = 1;
							
								get_cart_details();	
								
								
								if(response.result == 0)
								{
									$rootScope.cart_qty =0;
									
									var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: response.message
								  });
								}
								else
								{
									
								}
							
							//alert(JSON.stringify(response.message));
							
							//$scope.product_details = response.restauranthome;
							
								//alert("ss="+JSON.stringify($scope.product_details));
								
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
														
									
								});
				}
				
			//	document.getElementById('add'+id).style.display = "none";
		
		//document.getElementById('cart'+id).style.display = "inline-block";
		
		
			}
		
		
	}
	
		$scope.add_items = function(id,price,offer_amt,offer_type)
	{
		
		$scope.cart_data.customer_id = window.localStorage.getItem('user_id');
		
		$scope.cart_data.restaurant_id = window.localStorage.getItem('restaurant_id');
		
		$scope.cart_data.offer_id = $stateParams.offer_id;
		
		$scope.total_qty = 1;
		
		$scope.cart_data.item_id = id;
				
				$scope.cart_data.noofquantity = $scope.total_qty;
				
				$scope.cart_data.actual_amount = $scope.total_qty * price;
				
				if(offer_type == 'percent')
				{
					$scope.perecnt = parseInt($scope.cart_data.actual_amount)/parseInt(offer_amt);
					$scope.cart_data.amount = parseInt($scope.cart_data.actual_amount)-parseInt($scope.perecnt);
				}
				else if(offer_type == 'amount')
				{
					$scope.cart_data.amount = parseInt($scope.cart_data.actual_amount)-parseInt(offer_amt);
								
				}
				
				
			   
			    $rootScope.cart_qty =1;
				
				//alert("D="+JSON.stringify($scope.cart_data));
			 $ionicLoading.show();
			
	$http({
								url: server+'AddCartItems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								$rootScope.cart_count = 1;
							
										get_cart_details();	
								
								
								if(response.result == 0)
								{
									$rootScope.cart_qty =0;
									
									var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: response.message
								  });
								}
								else
								{
									
								}
							
							//alert(JSON.stringify(response.message));
							
							//$scope.product_details = response.restauranthome;
							
								//alert("ss="+JSON.stringify($scope.product_details));
								
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
														
									
								});
	}
	
	$scope.cart_incr = function(id,price,offer_amt,offer_type)
	{ 
		
		
		
		$scope.qty = document.getElementById(id).value;
		
		$scope.total_qty = parseInt($scope.qty)+1;
		
		document.getElementById(id).value = $scope.total_qty;
		
		$scope.cart_data.customer_id = window.localStorage.getItem('user_id');
		
		$scope.cart_data.restaurant_id = window.localStorage.getItem('restaurant_id');
		
		$scope.cart_data.offer_id = $stateParams.offer_id;
		
		$scope.cart_data.item_id = id;
				
				$scope.cart_data.noofquantity = $scope.total_qty;
				
				$scope.cart_data.actual_amount = $scope.total_qty * price;
			   
			    $rootScope.cart_qty =1;
					
				if(offer_type == 'percent')
				{
					
					$scope.perecnt = parseInt($scope.cart_data.actual_amount)/parseInt(offer_amt);
					
					$scope.cart_data.amount = parseInt($scope.cart_data.actual_amount)-parseInt($scope.perecnt);
					
				}
				else if(offer_type == 'amount')
				{
					
					$scope.cart_data.amount = parseInt($scope.cart_data.actual_amount)-parseInt(offer_amt);
								
				}
				
				
				//alert("D="+JSON.stringify($scope.cart_details));
			 $ionicLoading.show();
			
	$http({
								url: server+'AddCartItems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								//get_cart_details();
								
									if(response.result == 0)
								{
									$rootScope.cart_qty =0;
									
									var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: response.message
								  });
								}
								else
								{
									
								}
							
							//alert(JSON.stringify(response.message));
							
							//$scope.product_details = response.restauranthome;
							
								//alert("ss="+JSON.stringify($scope.product_details));
								
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
														
									
								});
		
		
	}
	
	$scope.cart_decr = function(id,price,offer_amt,offer_type)
	{
		
				
		$scope.qty = document.getElementById(id).value;
		
		$scope.total_qty = parseInt($scope.qty)-1;
		
		if($scope.total_qty<1)
		{
			document.getElementById(id).value = 0;
			
			$scope.cart_data.customer_id = window.localStorage.getItem('user_id');
		
			$scope.cart_data.restaurant_id = window.localStorage.getItem('restaurant_id');
			
			$ionicLoading.show();
			
	$http({
								url: server+'getCartItemsdetails',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								//alert("re="+JSON.stringify(response));
								angular.forEach(response.Cartitems, function(value) {
									
								if(value.item_id == id)
								{
									$scope.cart_id = value.cart_id;
									
									
									$scope.removecart.customer_id = window.localStorage.getItem('user_id');
		
		$scope.removecart.cart_id = $scope.cart_id;
		
		 $ionicLoading.show();
			
	$http({
								url: server+'doremoveCart',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.removecart),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response.message));
							
						//	$state.go($state.current, {}, {reload: true});	
						
							//$scope.cartBtn = false;
							
						
							
						//	$scope.get_cart_details();
						get_cart_details();
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
									
								});
									
									
								}
								
								
								
								});
								
															
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
											 title: 'Network Error',
											 template: 'Please try after some time'
										  });
									
								});
			
		}
		else
		{
			
			
			$scope.cart_data.customer_id = window.localStorage.getItem('user_id');
		
		$scope.cart_data.restaurant_id = window.localStorage.getItem('restaurant_id');
		
		$scope.cart_data.offer_id = $stateParams.offer_id;
		
		$scope.cart_data.item_id = id;
				
				$scope.cart_data.noofquantity = $scope.total_qty;
				
				$scope.cart_data.actual_amount = $scope.total_qty * price;
		
			if(offer_type == 'percent')
				{
					$scope.perecnt = parseInt($scope.cart_data.actual_amount)/parseInt(offer_amt);
					$scope.cart_data.amount = parseInt($scope.cart_data.actual_amount)-parseInt($scope.perecnt);
				}
				else if(offer_type == 'amount')
				{
					$scope.cart_data.amount = parseInt($scope.cart_data.actual_amount)-parseInt(offer_amt);
								
				}
		
			document.getElementById(id).value = $scope.total_qty;
			
			$ionicLoading.show();
			
	$http({
								url: server+'AddCartItems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
									if(response.result == 0)
								{
									$rootScope.cart_qty =0;
									
									var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: response.message
								  });
								}
								else
								{
									
								}
							//get_cart_details();
							//alert(JSON.stringify(response.message));
							
							//$scope.product_details = response.restauranthome;
							
								//alert("ss="+JSON.stringify($scope.product_details));
								
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
														
									
								});
		}
		
		
		
		
		
	}
	
	
	
}).controller('LangSelectionCtrl', function($scope){
	
	
	 $scope.devList =[
    {name: "Value1", id:"1"},
    {name: "Value2", id:"2"},
    {name: "Value3", id:"3"},
    {name: "Value4", id:"4"},
];
	
}).controller('PaymentOptionCtrl', function($scope){
	
	$scope.width=window.screen.width;
	
	$scope.half_width = $scope.width/2;
	
	$scope.new_width =  parseInt($scope.half_width)-50;
	
	
}).filter('checksearchcart', function () {
    return function (data, item_Id) { 
    	//console.log(data+' - '+item_Id)
    	var flag = false; 
    	angular.forEach(data,function(value,key){
    		//console.log(value+" - "+item_Id);
    		if(flag!=true)
    		{
	    		if(value==item_Id)
	    		{
	    			flag = true;
	    			console.log(1)

	    		}
	    		else{
	    			flag = false;
	    			//console.log(2);
	    		}
    		}
    	})   
       	//console.log(itemId+' - '+flag);
        return flag;
    }
}).controller('SearchCtrl', function($scope,$ionicLoading,$http,$ionicPopup,$state,$ionicHistory,$ionicPlatform,$rootScope){
	
	$rootScope.display_cart = '1';
	
	$scope.cart_data = {};
	
	$scope.recent_list = [];
	
	$scope.cart_details = {};
	
	$scope.removecart = {};
	
	$scope.get_cart = {};
	
	$scope.title = window.localStorage.getItem('branch_name');
	//$scope.show = {};
	
	 $ionicPlatform.registerBackButtonAction(function (event) {
	
	
	
	$scope.lastView = $ionicHistory.backView();
	
	
	
	if($scope.lastView == null)
	{
		$state.go('app.home');
	}
	else
	{
		
		$scope.lasturl= $scope.lastView.url;

	

	if($scope.lasturl == '/app/home' || $scope.lasturl == '/app/index')
								{
									$state.go('app.home');

								}
	else if($scope.lasturl == '/app/search')
	{
		$state.go('app.search');
	}							
								
	else
	{
		navigator.app.backHistory();
	}
	}

	
}, 100);
	
	$scope.width=window.screen.width;
	$scope.new_width =  parseInt($scope.width)-50;
	$scope.searchdata = {};
	
	//$scope.restaurant_details = {};
	
	//$scope.dish_details = {};
	
	$scope.tabIndex = 0;
	
	$scope.selectedIndex=0;
	
	get_cart_details();
	
	if(window.localStorage.getItem('recent_search')==null || window.localStorage.getItem('recent_search')=='' || window.localStorage.getItem('recent_search')==' ')
			{
				
			}
			else
			{
				$scope.search_list = JSON.parse(window.localStorage.getItem('recent_search'));
			}
	
	//console.log($scope.search_list);
	
	$scope.search_input = function(search)
	{
		
		if(search!=undefined)
		{
			
			if(window.localStorage.getItem('recent_search')==null || window.localStorage.getItem('recent_search')=='' || window.localStorage.getItem('recent_search')==' ')
			{
				
			}
			else
			{
				//console.log(JSON.parse(window.localStorage.getItem('recent_search')));
				$scope.search_list = JSON.parse(window.localStorage.getItem('recent_search'));
			}
			
			
		if(search.length>2)
		{
			document.getElementById('recent').style.display="none";
			document.getElementById('tab_sel').style.display="block";
			document.getElementById('tab_content').style.display="block";
			
			
			
			$scope.searchdata.searchitems = search;
			
			 
			$ionicLoading.show();
			
	$http({
								url: server+'searchrestaurantsitems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.searchdata),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								if(response.result ==0)
								{
									$scope.restro_details = '0';
									$scope.restaurant_details = {};
									$scope.dish_details = {};
									
								}
								else
								{
									$scope.restaurant_details = response.restaurantnames;
									$scope.dish_details = response.restaurantitems;
									$scope.restro_details = '1';
								}
								
							
							
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
														
									
								});
			
			
		}
		else
		{
			document.getElementById('recent').style.display="block";
			document.getElementById('tab_sel').style.display="none";
			document.getElementById('tab_content').style.display="none";
		}
		}
	}
	
	
	$scope.restro_click = function(index)
	{
		$scope.selectedIndex = index;
		$scope.tabIndex=0; 
		
	}
	
	$scope.dish_click = function(index)
	{
		$scope.selectedIndex = index;
		$scope.tabIndex=1; 
		
	}
	
		$scope.click_add = function(id,price,restro_id,restro_name)
	{
		
		if(window.localStorage.getItem('user_id')==undefined || window.localStorage.getItem('user_id')==null || window.localStorage.getItem('user_id')=='')
		{
			//alert("Please login to proceed");
			var alertPopup = $ionicPopup.alert({
         title: 'Login',
         template: 'Please login to proceed'
      });
			$state.go('app.index');
		}
		
		else
			
			{
			//	document.getElementById('add'+id).style.display = "none";
		
		//document.getElementById('cart'+id).style.display = "inline-block";
		
		
		
		$scope.current_branch_id = restro_id;
		
		$scope.current_branch_name = restro_name;
		
		//alert("new branch="+$scope.current_branch_id);
		
		//alert("cart brnch ="+$scope.branch_id);
		
		//alert("br="+$scope.branch_id);
		
		$scope.set_branch = window.localStorage.getItem('restaurant_id');
		
		$scope.set_name = window.localStorage.getItem('branch_name');
		
		//alert("set="+$scope.set_branch);
		//if($scope.current_branch_id != ($scope.branch_id && $scope.branch_id !=0) || $scope.current_branch_id != $scope.set_branch)
		if($scope.current_branch_id != $scope.branch_id && $scope.branch_id !=0)
		{
			 var confirmPopup = $ionicPopup.confirm({
				title: 'Replace cart item?',
				template: 'Your cart contains dishes from '+$scope.set_name+'. Do you want to discard the selection and add dishes from '+$scope.current_branch_name+'.'
				});
			confirmPopup.then(function(res) {
				if(res) 
				{
				//remove previous cart and add new
				
				window.localStorage.setItem('branch_name',restro_name);
		
				$scope.branch_details =  restro_id+','+restro_name;

				window.localStorage.setItem('branch_details',$scope.branch_details);
		
				window.localStorage.setItem('restaurant_id',restro_id);
				
				$scope.get_cart.customer_id = window.localStorage.getItem('user_id');
				
				//alert(JSON.stringify($scope.get_cart));
				
					 $ionicLoading.show();
			
	$http({
								url: server+'getCartItemsdetails',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.get_cart),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								//alert(JSON.stringify(response));
								
								
									$scope.item_details = response.Cartitems;
									//alert(JSON.stringify($scope.item_details));
								
									angular.forEach(response.Cartitems, function(value) {
									
									
									$scope.cart_id = value.cart_id;	
																			
									
									$scope.removecart.customer_id = window.localStorage.getItem('user_id');
		
		$scope.removecart.cart_id = $scope.cart_id;
		
		 $ionicLoading.show();
			
	$http({
								url: server+'doremoveCart',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.removecart),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
														
																					
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
									
								});
											
								
								});
								
								
								$scope.add_items(id,price);
								
								
								
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
												 title: 'Network Error',
												 template: 'Please try after some time'
											  });
																	
									
								});
		
		
				} 
				else 
				{
					 //window.localStorage.setItem('branch_name',$scope.branch_name);
					 
					 window.localStorage.setItem('restaurant_id',$scope.set_branch);
					 
					// $scope.branch_details =  $scope.branch_id+','+$scope.branch_name;

					//window.localStorage.setItem('branch_details',$scope.branch_details);
					//$state.go($state.current, {}, {reload: true});	
					$state.go('app.home');
				}
			});
	   
		}
		else
		{
			$scope.cart_data.customer_id = window.localStorage.getItem('user_id');
		
		$scope.cart_data.restaurant_id = window.localStorage.getItem('restaurant_id');
		
		$scope.total_qty = 1;
		
		$scope.cart_data.item_id = id;
				
				$scope.cart_data.noofquantity = $scope.total_qty;
				
				$scope.cart_data.amount = $scope.total_qty * price;
			   
			    $rootScope.cart_qty =1;
				
				//alert("D="+JSON.stringify($scope.cart_details));
			 $ionicLoading.show();
			
	$http({
								url: server+'AddCartItems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								$rootScope.cart_count = parseInt($rootScope.cart_count)+1;

							get_cart_details();
							//alert(JSON.stringify(response.message));
							
							//$scope.product_details = response.restauranthome;
							
								//alert("ss="+JSON.stringify($scope.product_details));
								
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
														
									
								});
		}
		
		
			}
		
		
	}
	
	$scope.add_items = function(id,price)
	{
		
		$scope.cart_data.customer_id = window.localStorage.getItem('user_id');
		
		$scope.cart_data.restaurant_id = window.localStorage.getItem('restaurant_id');
		
		$scope.total_qty = 1;
		
		$scope.cart_data.item_id = id;
				
				$scope.cart_data.noofquantity = $scope.total_qty;
				
				$scope.cart_data.amount = $scope.total_qty * price;
			   
			    $rootScope.cart_qty =1;
				
				//alert("D="+JSON.stringify($scope.cart_details));
			 $ionicLoading.show();
			
	$http({
								url: server+'AddCartItems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								$rootScope.cart_count = 1;
							
									get_cart_details();						
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									
									
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
														
									
								});
	}
	
	$scope.cart_decr = function(id,price,restro_id)
	{
		
				
		$scope.qty = document.getElementById(id).value;
		
		$scope.total_qty = parseInt($scope.qty)-1;
		
		$scope.cart_data.customer_id = window.localStorage.getItem('user_id');
		
		
		
		$scope.cart_data.item_id = id;
				
				$scope.cart_data.noofquantity = $scope.total_qty;
				
				$scope.cart_data.amount = $scope.total_qty * price;
		
		if($scope.total_qty<1)
		{
			
			document.getElementById(id).value = 0;
		
		
		$scope.cart_details.customer_id = window.localStorage.getItem('user_id');
		
	$scope.cart_details.restaurant_id = window.localStorage.getItem('restaurant_id');
		
		$ionicLoading.show();
			
	$http({
								url: server+'getCartItemsdetails',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								//alert("re="+JSON.stringify(response));
								angular.forEach(response.Cartitems, function(value) {
									
								if(value.item_id == id)
								{
									$scope.cart_id = value.cart_id;
									
									
									$scope.removecart.customer_id = window.localStorage.getItem('user_id');
		
		$scope.removecart.cart_id = $scope.cart_id;
		
		 $ionicLoading.show();
			
	$http({
								url: server+'doremoveCart',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.removecart),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response.message));
							
						//	$state.go($state.current, {}, {reload: true});	
						
							//$scope.cartBtn = false;
							
						
							
						//	$scope.get_cart_details();
						get_cart_details();
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
									
								});
									
									
								}
								
								
								
								});
								
															
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
											 title: 'Network Error',
											 template: 'Please try after some time'
										  });
									
								});
		}
		else
		{
			document.getElementById(id).value = $scope.total_qty;
			
			$ionicLoading.show();
			
	$http({
								url: server+'AddCartItems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response.message));
							
							//$scope.product_details = response.restauranthome;
							
								//alert("ss="+JSON.stringify($scope.product_details));
								
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
														
									
								});
		}
		
		
		
		
	}
	
		$scope.cart_incr = function(id,price,restro_id)
	{ 
		
		
		
		$scope.qty = document.getElementById(id).value;
		
		$scope.total_qty = parseInt($scope.qty)+1;
		
		document.getElementById(id).value = $scope.total_qty;
		
		$scope.cart_data.customer_id = window.localStorage.getItem('user_id');
		
		$scope.cart_data.restaurant_id = window.localStorage.getItem('restaurant_id');
		
		$scope.cart_data.item_id = id;
				
				$scope.cart_data.noofquantity = $scope.total_qty;
				
				$scope.cart_data.amount = $scope.total_qty * price;
			   
			    $rootScope.cart_qty =1;
				
				//alert("D="+JSON.stringify($scope.cart_details));
			 $ionicLoading.show();
			
	$http({
								url: server+'AddCartItems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
							//alert(JSON.stringify(response.message));
							
							//$scope.product_details = response.restauranthome;
							
								//alert("ss="+JSON.stringify($scope.product_details));
								
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
														
									
								});
		
		
	}
	
	$scope.select_branch = function(id,name)
	{
		
		$scope.restro_id = id;
		window.localStorage.setItem('restaurant_id',id);
		window.localStorage.setItem('branch_name',name);
		
		$scope.branch_details =  id+','+name;

			window.localStorage.setItem('branch_details',$scope.branch_details);
		
		$state.go('app.food_menu');
	}
	
	$scope.recent_push = function(item)
	{
		
		
			if(item == ' ' || item == '' || item == undefined)
		{
			
		}
		else
		{ 
				if(window.localStorage.getItem('recent_search')==null || window.localStorage.getItem('recent_search')=='' || window.localStorage.getItem('recent_search')==' ')
					{
						$scope.recent_list.push(item);
						window.localStorage.setItem('recent_search',JSON.stringify($scope.recent_list));
					}
				
				else
					{
						$scope.recent_list = JSON.parse(window.localStorage.getItem('recent_search'));
						
						if($scope.recent_list.indexOf(item) == -1)
						{
							$scope.recent_list.push(item);
							window.localStorage.setItem('recent_search',JSON.stringify($scope.recent_list));
						}
										
											
					}
			
			
		}
		
	}
	
	
	
	
	$scope.click_recent = function(item)
	{
		
		document.getElementById('recent').style.display="none";
			document.getElementById('tab_sel').style.display="block";
			document.getElementById('tab_content').style.display="block";
			
			$scope.searchdata.searchitems = item;
			 
			$ionicLoading.show();
			
	$http({
								url: server+'searchrestaurantsitems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.searchdata),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								if(response.result ==0)
								{
									$scope.restro_details = '0';
									
								}
								else
								{
									$scope.restaurant_details = response.restaurantnames;
									$scope.dish_details = response.restaurantitems;
									$scope.restro_details = '1';
								}
								
							
							
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									
								
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
														
									
								});
	}
	
	$scope.recent_clear = function()
	{
		
		
		$scope.searchlist = [];
		
		$scope.search_list = JSON.stringify(window.localStorage.setItem('recent_search',$scope.searchlist));
		
		
	}
	
	$scope.clear_search = function()
	{
		
		$scope.search.search_data = null;
		
		$scope.restaurant_details = {};
		$scope.dish_details = {};
		
		document.getElementById('recent').style.display="block";
		document.getElementById('tab_sel').style.display="none";
		document.getElementById('tab_content').style.display="none";
	}
	
	//$scope.get_cart_details = function()
	function get_cart_details()
	{
		
			$scope.cart_id = [];				
		
		$scope.cart_details.customer_id = window.localStorage.getItem('user_id');
		
		$ionicLoading.show();
			
	$http({
								url: server+'getCartItemsdetails',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.cart_details),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								//alert("re="+JSON.stringify(response));
								
															
							$scope.cart_items = response.Cartitems;
							
							$rootScope.cart_count = $scope.cart_items.length;
																		
							$scope.cart_items.cart_amount = response.Cartamount;
							
							if(response.Cartitems.length == 0)
							{
								
								$rootScope.cart_qty = 0;
								
								$scope.branch_id = 0;
								
								$scope.branch_name = 0;
							}
							else
							{
								$scope.branch_id = response.Cartitems[0].restaurant_id;
								
								$scope.branch_name = response.Cartitems[0].restaurant_name;
							}
							
								angular.forEach(response.Cartitems, function(value) {
									
								$scope.cart_id.push(value.item_id);
								//alert($scope.list_id);
								
												
								
								});
									
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
										var alertPopup = $ionicPopup.alert({
											 title: 'Network Error',
											 template: 'Please try after some time'
										  });
									
								});
	}
	
	
		
}).controller('PaymentHistoryCtrl', function($scope){
	
});


