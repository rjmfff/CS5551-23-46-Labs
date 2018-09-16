var myApp = angular.module ("labApp" , []);

myApp.controller ('loginController', function ($scope, $http) {
    $scope.initialize = function() {
        console.log( "Initialize LOGIN controller" );

        // Initialize Hello.js
        hello.init({
            google: "545640970176-mqql7jmfsridgm319n3fatpfct7ieijs.apps.googleusercontent.com"
        });

        // Hello.js logout        
        hello.on('auth.logout', function () {
            window.location.replace( "index.html" );
        });

        if ( window.localStorage.getItem( "email" ) == null )
        {
            // Not logged in
            $scope.logout();
        }
        else
        {
            $scope.setUserHeader();
        }
    }

    $scope.registerAccount = function() {
        console.log( "Register Account function" );
        window.localStorage.setItem( "email", $( "#register-email" ).val() );
        window.localStorage.setItem( "name", $( "#register-name" ).val() );
        window.localStorage.setItem( "password", $( "#register-password" ).val() );
        
        $scope.gotoHome();
    };

    $scope.login = function() {
        if ( $( "#login-email" ).val() == window.localStorage.getItem( "email" )
            && $( "#login-password" ).val() == window.localStorage.getItem( "password" ) )
        {
            $scope.gotoHome();
        }
        else
        {
            $( ".failed-login" ).fadeIn( "fast" );
        }
    };

    $scope.loginGoogle = function() {
        // Check for authentication
        hello.on('auth.login', function (auth) {
            hello(auth.network).api('/me').then(function (resp) {

                // Save the information
                window.localStorage.setItem( "email", resp.email );
                window.localStorage.setItem( "name", resp.name );
                window.localStorage.setItem( "thumbnail", resp.thumbnail );

                $scope.gotoHome();
            });
        });
    };

    $scope.logout = function() {
        hello('google').logout();
        window.location.href = "index.html";
    };

    $scope.gotoHome = function() {
        window.location.href = "home.html";
    };

    $scope.setUserHeader = function() {
        var image = window.localStorage.getItem( "thumbnail" );
        var name = window.localStorage.getItem( "name" );
        var email = window.localStorage.getItem( "email" );
        if ( image == null )
        {
            image = "content/unknown-image.png";
        }
        
        $( "#login-info" ).html( name + " <span class='email-small'>(" + email + ")</span> <img src='" + image + "'>" );
    };
} );

myApp.controller ('apiController', function ($scope, $http) {
    
    $scope.initialize = function() {
        console.log( "Initialize API controller" );
        $scope.pokemonCounter = 1;
        
        $scope.getActivity();
        window.setInterval( $scope.getActivity, 10000 );
        
        $scope.getPokemon();
        window.setInterval( $scope.getPokemon, 10000 );
    }

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
