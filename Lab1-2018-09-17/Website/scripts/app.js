// Google Login API Call

function onLoadFunction()
{
    gapi.client.setApiKey('AIzaSyBnyIF34fmFsUhUXaZbDhY2Gqopq7lIGbk');
    gapi.client.load('plus', 'v1', function (){});
}