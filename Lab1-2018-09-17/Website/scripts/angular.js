var myApp = angular.module ("myApp" , []);
myApp.controller ('websiteController', function ($scope, $http) {
    
    $scope.initialize = function() {
        console.log( "Initialize angular" );
        $scope.pokemonCounter = 1;
        
        $scope.getActivity();
        window.setInterval( $scope.getActivity, 10000 );
        
        $scope.getPokemon();
        window.setInterval( $scope.getPokemon, 10000 );
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

            $( "#activity-suggestion" ).css( "display", "none" );
            
            $( "#activity-suggestion" ).html( response["data"]["activity"] );
            $( "#activity-suggestion" ).fadeIn( "fast" );
        } );
    };

    $scope.getPokemon = function() {
        var url = "https://www.pokeapi.co/api/v2/pokemon-form/" + $scope.pokemonCounter + "/";
        console.log( url );
        
        // Use AJAX to get the information
        $http( { method: "GET", url: url } ).then( function successCallback( response ) {
            console.log( response );

            $( "#pokemon-info" ).css( "display", "none" );

            $( "#pokemon-number" ).html( $scope.pokemonCounter );
            $( "#pokemon-name" ).html( response["data"]["pokemon"]["name"] );
            $( "#pokemon-image" ).attr( "src", response["data"]["sprites"]["front_default"] );
            $( "#pokemon-info" ).fadeIn( "fast" );

            $scope.pokemonCounter++;
        } );
    };

} );
