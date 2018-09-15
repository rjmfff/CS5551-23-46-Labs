var myApp = angular.module ("myApp" , []);
myApp.controller ('websiteController', function ($scope, $http) {
    
    $scope.initialize = function() {
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

} );


$( document ).ready( function() {

    // Not logged in
    /*
    if ( hello.getAuthResponse('google') == null && !path.includes( "index.html" ) )
    {
        window.location.replace( "index.html" );
    }
    * */
            
    hello.init({
        google: "545640970176-mqql7jmfsridgm319n3fatpfct7ieijs.apps.googleusercontent.com"
    });

    hello.on('auth.login', function (auth) {
        hello(auth.network).api('/me').then(function (resp) {
            console.log( "Logged in" );
            var path = window.location.pathname;
            var host = window.location.hostname;
            console.log( path, host );

            if ( path.includes( "index.html" ) || path == "/CS5551/" )
            {
                window.location.replace( "home.html" );
            }
            else
            {
                $( "#login-info" ).html( resp.name + "<img src='" + resp.thumbnail + "'>" );
            }
        });
    });

    hello.on('auth.logout', function () {
        window.location.replace( "index.html" );
    });

} );
