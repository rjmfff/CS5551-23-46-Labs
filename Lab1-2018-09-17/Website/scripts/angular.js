var myApp = angular.module ("myApp" , []);
myApp.controller ('websiteController', function ($scope, $http) {
    
    $scope.initialize = function() {
        console.log( "Initialize angular" );
        $scope.getActivity();
        window.setInterval( $scope.getActivity, 10000 );
    }
    
    $scope.getRecipe = function() {
        $scope.searchFood( $scope.recipeName );
    }

    $scope.searchFood = function( text ) {
        // Build the URL string for the API call to Nutritionix
        var nURL = "https://api.nutritionix.com/v1_1/"
            + "search/" + text + "?results=0:1&fields=*"
            + "&appId=" + NUTRITIONIX_APPID
            + "&appKey=" + NUTRITIONIX_APPKEY;
        console.log( nURL );

        // Use AJAX to get the information
        $http( { method: "GET", url: nURL } ).then( function successCallback( response ) {
            console.log( response );
            // Copy the information into scope variables.
            $scope.calories = response["data"]["hits"][0]["fields"]["nf_calories"];
            $scope.food = response["data"]["hits"][0]["fields"]["item_name"];

            $( "#food-info" ).fadeIn( "fast" );
        } );
    };

    
    $scope.getActivity = function() {
        console.log( "Get activity" );
        // https://www.boredapi.com/api/activity/
        var url = "https://www.boredapi.com/api/activity";
        console.log( url );
        
        // Use AJAX to get the information
        $http( { method: "GET", url: url } ).then( function successCallback( response ) {
            console.log( response );

            $( "#activity-suggestion" ).html( response["data"]["activity"] );
            $( "#activity-suggestion" ).fadeIn( "fast" );
        } );
    };

} );
