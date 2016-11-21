var app = angular.module('RemindMe', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
        })
		.when('/display/:address', {
			templateUrl: 'partials/display.html',
			controller: 'DisplayCtrl'
		})
		.when('/add-reminder/:address', {
			templateUrl: 'partials/add-reminder.html',
			controller: 'AddReminderCtrl'
		})
		.when('/email/:id', {
			templateUrl: 'partials/add-reminder.html',
			controller: 'EditCtrl'
		})
		.when('/delete/:id', {
			templateUrl: 'partials/delete-reminder.html',
			controller: 'DeleteCtrl'
		})
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('HomeCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
		
		$scope.enter = function(){
			$location.path('/display/' + $scope.email.address);
		};
	}
]);

app.controller('DisplayCtrl', ['$scope', '$resource', '$routeParams',
    function($scope, $resource, $routeParams){
		var Emails = $resource('/api/emails/:address');
		Emails.query({ address: $routeParams.address }, function(emails){
            $scope.emails = emails;
			$scope.address = $routeParams.address;
        });
    }
]);

app.controller('AddReminderCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
		$scope.save = function(){
			var Emails = $resource('/api/emails');
			$scope.email.address = $routeParams.address;
			Emails.save($scope.email, function(){
				$location.path('/display/' + $routeParams.address);
			});
		};
    }
]);

app.controller('EditCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
		var Emails = $resource('/api/emails/id/:id', { id: '@_id' }, {
			update: { method: 'PUT' }
		});
		
		Emails.get({ id: $routeParams.id }, function(email){
			$scope.email = email;
			$scope.email.date = new Date($scope.email.date);
			$scope.address = email.address;
		})
		
		$scope.save = function(){
			Emails.update($scope.email, function(){
				$location.path('/display/' + $scope.address);
			});
		};
    }
]);

app.controller('DeleteCtrl', ['$scope', '$resource', '$location', '$routeParams',
	function($scope, $resource, $location, $routeParams){
		var Emails = $resource('/api/emails/id/:id');

		Emails.get({ id: $routeParams.id }, function(email){
			$scope.email = email;
			$scope.address = email.address;
		})

		$scope.delete = function(){
			Emails.delete({ id: $routeParams.id }, function(email){
				$location.path('/display/' + $scope.address);
			});
		}
	}
]);