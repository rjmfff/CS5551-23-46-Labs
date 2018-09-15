var myApp = angular.module ("myApp" , []);
myApp.controller ('loginController', function ($scope) {
    
    $scope.initialize = function() {
    }

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
