

var myApp = angular.module ("myApp" , []);
myApp.controller ('loginController', function ($scope) {
    // Adding objects of elements
    $scope.initialize = function() {
        $scope.username = "bob";
        $scope.email = "bob@gmail.com";
    }
    
    
    // Calling OAuth Client ID & Key
    $scope.googleLogin = function()
    {
        var params = {
            clientid: "361462037679-bsq2v8l4flr5b0iklqtp3ijkf1cabep4.apps.googleusercontent.com",
            
            cookiepolicy: "single_host_origin",
            
            callback: function(result)
            {
                if (result = ['status']['signed_in'])
                {
                    var request = gapi.client.plus.people.get(
                        {
                            'userId': 'me'
                        }
                    );
                    request.execute(function (response){
                       $scope.$apply(function(){
                           $scope.gmail.username = response.displayName;
                           $scope.gmail.email = response.emails[0].value;
                       });
                    });
                }

            },
            approvalprompt: "force",
            scope: "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read"

    };
    // Calling params variable using google API
    gapi.auth.signIn(params);
    }

} );
