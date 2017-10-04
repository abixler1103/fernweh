var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var CLIENT_ID = "1035648329780-d8khj8u006n1ghd724opv2suarb6bbrk.apps.googleusercontent.com";
var client = new auth.OAuth2(CLIENT_ID, '', '');

module.exports = function(app) {

    function authenticate (token, successCallback, failureCallback) {
        client.verifyIdToken(
            token,
            CLIENT_ID,
            function(e, login) {
              var payload = login.getPayload();
              var userid = payload['sub'];
              if (userid != null) {
                successCallback(userid);
              } else {
                  failureCallback();
              }
            });
    }
}