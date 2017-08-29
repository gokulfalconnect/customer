// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

	
	var handleOpenURL = function(url) {
	
		var evt = new CustomEvent('printerstatechanged', { detail: url });

		window.dispatchEvent(evt);
	};

angular.module('starter', ['ionic', 'starter.controllers', 'ngSanitize', 'MassAutoComplete', 'ngCordova'])


.service('UserService', function() {
  // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  var setUser = function(user_data) {
   
  };

  var getUser = function(){
   
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
})

.run(function($ionicPlatform, $cordovaSQLite,  $rootScope, $ionicModal, $state, $window,  $cordovaGeolocation, $ionicPopup, $ionicLoading,$http) {
	
	
	$ionicPlatform.on('resume', function(){
		
		
	});
	
	
  $ionicPlatform.ready(function() {
	  
	  $rootScope.geodata ={};
	  
	window.addEventListener('printerstatechanged', function (e) {
		
		alert("in");
		
			if(e.detail=='restro://'){
				window.location.href = '#/app/index';
			}
            
		  
	});
	  
	  
	  $ionicPlatform.registerBackButtonAction(function (event) {
			  if($state.current.name=="app.home" || $state.current.name=="app.index"){
					//alert("back");
			  }
			  else {
					navigator.app.backHistory();
			  }
			}, 100);
	  
	 
	
	
	
	
	var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
	window.localStorage.setItem('deviceType',deviceType);
	
		
	 if(deviceType=='Android')
	 {
		 
	/*One siganl start*/	
	
	 var notificationOpenedCallback = function(jsonData) {
  // alert('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };
  
  window.plugins.OneSignal
    .startInit("6d185c43-34ad-43b7-a615-792e3d24874e")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
	
	window.plugins.OneSignal.getIds(function(ids) {
		//alert("id="+ids.userId);
	
	});
	
	window.plugins.OneSignal.enableInAppAlertNotification(true);
	
	/*one signal end*/
		
		
		var pushNotification = window.plugins.pushNotification; 
	pushNotification. register(successHandler,errorHandler,{"senderID":"644543420118","ecb":"onNotificationGCM"}); 


	function successHandler(result) { 
	
	}
	function errorHandler(error) { 
	
	}
	 }
	else
	{
	/*	 var pushNotification = window.plugins.pushNotification;
                       pushNotification.register(tokenHandler, errorHandler, {
                                                 "badge": "true",
                                                 "sound": "true",
                                                 "alert": "true",
                                                 "ecb": "window.onNotificationAPN"
                                                 });
                       
                       
                       function tokenHandler(result)
                       {
                       // alert('device token: ='+ result);
                       window.localStorage.setItem('app_id',result);
                       
                       }
                       function errorHandler(error)
                       {
                       
                       }*/
	 	
	}
	
		/* window.onNotificationAPN = function(result) {
                       
                       if (result.alert) {
                       // navigator.notification.alert(result.alert);
                       navigator.notification.alert(result.alert,alertDismissed,'Notification','OK');
                       function alertDismissed()
                       {
                       
                       }
                       }
                       if (result.sound) {
                       var snd = new Media(result.sound);
                       snd.play();
                       }
                       if (result.badge) {
                       pushNotification.setApplicationIconBadgeNumber(successHandler, result.badge);
                       }
                       
                       }*/

	onNotificationGCM = function(result) {
		
       //  alert("gcm="+JSON.stringify(result));
		
		 switch( result.event )
       {
           case 'registered':
               if ( result.regid.length > 0 )
               {
                 window.localStorage.setItem('app_id',result.regid);
				// alert("app id="+result.regid);
               }
           break;

           case 'message':
		  
             // this is the actual push notification. its format depends on the data model from the push server
			//alert("res="+JSON.stringify(result))
			

			
			var myMedia = new Media('/android_asset/www/music/beep-2.mp3');
				//myMedia.play();
				
				//alert(result.message);
				var alertPopup = $ionicPopup.alert({
         title: 'Restro',
         template: result.message
      });
				
           
           break;
		   

           case 'error':
             alert('GCM error = '+result.msg);
			 
           break;

           default:
             alert('An unknown GCM event has occurred');
             break;
       }
			
     }
	 
	  
	  $rootScope.currState = $state;
   $rootScope.currentState = $state.current.name;
   
   //alert("q="+ $rootScope.currentState);
   
	
	var watchOptions = {
    timeout : 30000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
    },
    function(position) {
		//alert("watch options="+position.coords.latitude);
		//alert("long="+position.coords.longitude);
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;
  });

	  var options = {maximumAge:100000, timeout:50000, enableHighAccuracy:true};
 
 $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
  $rootScope.geodata.latitude = position.coords.latitude;
  
  $rootScope.geodata.longitude = position.coords.longitude;
  
  
  
  $ionicLoading.show();
		 
		 
		 
			
	$http({
								url: server+'name',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($rootScope.geodata),
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
										 title: 'Network Errro',
										 template: 'Please try after some time'
									  });
							
									
								});
  
 
 }, function(error){
    console.log("Could not get location="+JSON.stringify(error.message));
  });
		
	  
	  $rootScope.go_cart = function()
	  {
		  $state.go('app.cart_details');
	  }
	  
	  $rootScope.go_checkout = function()
	  {
		 $state.go('app.checkout');
	  }
	/* navigator.geolocation.getCurrentPosition(onSuccess, onError);
	  

	  
	function onSuccess(position) {
		 
	
		 
			 lt   =  position.coords.latitude;
			 lng   =  position.coords.longitude;
			
			 
			 
			 var geocoder = new google.maps.Geocoder();
		  var latlng = new google.maps.LatLng(lt, lng);
		  var request = {
			latLng: latlng
		  };
		   geocoder.geocode(request, function(data, status) {
			   
			if (status == google.maps.GeocoderStatus.OK) {
			  if (data[0] != null) {
				  
				//  alert("adress="+data[0].formatted_address);
				   } else {
				//alert("No address available");
			  }
			}
		  })
						
			 //var user_lat = window.localStorage.seow
			 tItem('lattitude',lt);
			 //var user_long = window.localStorage.setItem('longitude',lng);
						
			 
			
					
	 }
	
	  function onError(error) {
		  alert("error");
         alert('code: '    + error.code    + '\n' +
               'message: ' + error.message + '\n');
     }
	  */
	  
	      $rootScope.dev_width = $window.innerWidth;
			$rootScope.dev_height = $window.innerHeight;
			
			//alert("w="+$rootScope.dev_width+","+$rootScope.dev_height);

	 // var db;
	  
	 // db= $cordovaSQLite.openDB({name:"customer.db", location:'default'});
	  
	 // $cordovaSQLite.execute(db,'CREATE TABLE IF NOT EXISTS demo (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)');
	  
	  //$cordovaSQLite.execute(db,'INSERT INTO demo (id,message) VALUES (1,"hai")');
	  
	  // $cordovaSQLite.execute(db,'SELECT * FROM demo').then(function(result){alert("re="+result);},function(err){alert("errr");});
	  
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
	
	
	
		
    if (window.cordova && window.cordova.plugins.Keyboard) {
		
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
	
	if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	
	$ionicConfigProvider.backButton.previousTitleText(false).text('');
	$ionicConfigProvider.tabs.position('top');
	
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })
  
  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
		  controller: 'BrowseCtrl'
        }
      }
    })
	.state('app.forgot_password', {
	  cache: false,
      url: '/forgot_password',
      views: {
        'menuContent': {
          templateUrl: 'templates/forgot_password.html',
		  controller: 'ForgotPwdCtrl'
        }
      }
    })
		.state('app.book_table', {
	  cache: false,
      url: '/book_table',
      views: {
        'menuContent': {
          templateUrl: 'templates/book_table.html',
		  controller: 'BookTableCtrl'
        }
      }
    })
	.state('app.profile', {
	  cache: false,
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
		  controller: 'ProfileCtrl'
        }
      }
    })
    .state('app.index', {
		cache: false,
      url: '/index',
      views: {
        'menuContent': {
          templateUrl: 'templates/index.html',
          controller: 'IndexCtrl'
        }
      }
    })
	.state('app.notification', {
	  cache: false,
      url: '/notification',
      views: {
        'menuContent': {
          templateUrl: 'templates/notification.html',
          controller: 'NotificationCtrl'
        }
      }
    })
	.state('app.favourites', {
		cache: false,
      url: '/favourites',
      views: {
        'menuContent': {
          templateUrl: 'templates/favourites.html',
          controller: 'FavouritesCtrl'
        }
      }
    })
	.state('app.home', {
		cache: false,
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
	.state('app.branch', {
		cache: false,
      url: '/branch',
      views: {
        'menuContent': {
          templateUrl: 'templates/branch.html',
          controller: 'BranchCtrl'
        }
      }
    })
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })
 .state('app.edit_profile', {
	 cache: false,
    url: '/edit_profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/edit_profile.html',
        controller: 'EditProfileCtrl'
      }
    }
  })   
  .state('app.food_menu', {
	  cache: false,
    url: '/food_menu',
    views: {
      'menuContent': {
        templateUrl: 'templates/food_menu.html',
        controller: 'FoodMenuCtrl'
      }
    }
  })
  .state('app.product', {
	  cache: false,
    url: '/product:product_id',
    views: {
      'menuContent': {
        templateUrl: 'templates/product.html',
        controller: 'ProductCtrl'
      }
    }
  })
  .state('app.hot_offers', {
	  cache: false,
    url: '/hot_offers',
    views: {
      'menuContent': {
        templateUrl: 'templates/hot_offers.html',
        controller: 'HotOffersCtrl'
      }
    }
  })
   .state('app.facebook', {
    url: '/facebook',
    views: {
      'menuContent': {
        templateUrl: 'templates/login_fb.html',
        controller: 'FacebookCtrl'
      }
    }
  })
    .state('app.gmail', {
    url: '/gmail',
    views: {
      'menuContent': {
        templateUrl: 'templates/login_gmail.html',
        controller: 'GmailCtrl'
      }
    }
  })
    .state('app.about', {
		cache: false,
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/about.html',
        controller: 'AboutCtrl'
      }
    }
  })
   .state('app.fav_product', {
	   cache: false,
    url: '/fav_product',
    views: {
      'menuContent': {
        templateUrl: 'templates/fav_product.html',
        controller: 'FavProductCtrl'
      }
    }
  })
  .state('app.help', {
    url: '/help',
    views: {
      'menuContent': {
        templateUrl: 'templates/help.html',
        controller: 'HelpCtrl'
      }
    }
  })
   .state('app.contact', {
	   cache: false,
    url: '/contact',
    views: {
      'menuContent': {
        templateUrl: 'templates/contact.html',
        controller: 'ContactCtrl'
      }
    }
  })
    .state('app.cart_details', {
		cache: false,
    url: '/cart_details',
    views: {
      'menuContent': {
        templateUrl: 'templates/cart_details.html',
        controller: 'CartDetailsCtrl'
      }
    }
  })
   .state('app.address_book', {
	   cache: false,
    url: '/address_book',
    views: {
      'menuContent': {
        templateUrl: 'templates/address_book.html',
        controller: 'AddressBookCtrl'
      }
    }
  })
  .state('app.add_address', {
	  cache: false,
    url: '/add_address',
    views: {
      'menuContent': {
        templateUrl: 'templates/add_address.html',
        controller: 'AddAddressCtrl'
      }
    }
  })
   .state('app.edit_address', {
	   cache: false,
    url: '/edit_address:address_type:address_id',
    views: {
      'menuContent': {
        templateUrl: 'templates/edit_address.html',
        controller: 'EditAddressCtrl'
      }
    }
  })
   .state('app.billsummary', {
	   cache: false,
    url: '/billsummary',
    views: {
      'menuContent': {
        templateUrl: 'templates/billsummary.html',
        controller: 'BillSummaryCtrl'
      }
    }
  })
   .state('app.booking_history', {
	   cache: false,
    url: '/booking_history',
    views: {
      'menuContent': {
        templateUrl: 'templates/booking_history.html',
        controller: 'BookingHistoryCtrl'
      }
    }
  })
   .state('app.intro', {
    url: '/intro',
    views: {
      'menuContent': {
        templateUrl: 'templates/intro.html',
        controller: 'IntroCtrl'
      }
    }
  })
    .state('app.order_details', {
		cache: false,
    url: '/order_details:order_id',
    views: {
      'menuContent': {
        templateUrl: 'templates/order_details.html',
        controller: 'OrderDetailsCtrl'
      }
    }
  })
    .state('app.order_placed', {
		cache: false,
    url: '/order_placed',
    views: {
      'menuContent': {
        templateUrl: 'templates/order_placed.html',
        controller: 'OrderPlacedCtrl'
      }
    }
  })
    .state('app.checkout', {
		cache: false,
    url: '/checkout',
    views: {
      'menuContent': {
        templateUrl: 'templates/checkout.html',
        controller: 'CheckOutCtrl'
      }
    }
  })
    .state('app.track', {
		cache: false,
    url: '/track:order_id',
    views: {
      'menuContent': {
        templateUrl: 'templates/track.html',
        controller: 'TrackCtrl'
      }
    }
  })
  .state('app.wallet', {
		cache: false,
    url: '/mywallet',
    views: {
      'menuContent': {
        templateUrl: 'templates/mywallet.html',
        controller: 'WalletCtrl'
      }
    }
  })
   .state('app.profile_address_book', {
		cache: false,
    url: '/profile_address_book',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile_address_book.html',
        controller: 'ProfileAddressBookCtrl'
      }
    }
  })
    .state('app.enquiry', {
	    cache: false,
    url: '/enquiry',
    views: {
      'menuContent': {
        templateUrl: 'templates/enquiry.html',
		
        controller: 'EnquiryCtrl'
      }
    }
  })
  .state('app.view_offers', {
	    cache: false,
    url: '/view_offers:offer_id',
    views: {
      'menuContent': {
        templateUrl: 'templates/view_offers.html',
		
        controller: 'ViewOfferCtrl'
      }
    }
  })
   .state('app.language_selection', {
	    cache: false,
    url: '/language_selection',
    views: {
      'menuContent': {
        templateUrl: 'templates/language_selection.html',
		
        controller: 'LangSelectionCtrl'
      }
    }
  })
  .state('app.my_order', {
	  cache: false,
    url: '/my_order',
    views: {
      'menuContent': {
        templateUrl: 'templates/my_order.html',
        controller: 'MyOrderCtrl'
      }
    }
  });
  
  //alert(window.localStorage.getItem('user_id'));
  
  if(window.localStorage.getItem('user_id')== null || window.localStorage.getItem('user_id')=='')
  {
	  
	 $urlRouterProvider.otherwise('/app/intro');
  }
  else
  {
	  
	  $urlRouterProvider.otherwise('/app/home');
  }
  // if none of the above states are matched, use this as the fallback
  
});
