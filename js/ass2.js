/* Codes for linking to Laravel Backend API for database information */

var id_token = localStorage.getItem('id_token');

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
  lock.on("authenticated", function(authResult) {
    lock.getProfile(authResult.idToken, function(error, profile) {
      if (error) {
        alert('Error in getting user profile' + error);
        return;
      }

      localStorage.setItem('id_token', authResult.idToken);

      // Display user information
      $scope.profilepic = profile.picture;
      $('.nickname').text(profile.firstname);
      $('.avatar').attr('src', profile.picture);
    });
  });

  if (id_token) {
    $http({
      method: 'GET',
      url: 'http://localhost:8000',
      headers:{
        'Authorization':'Bearer '+ id_token
      }
    }).then(function successCallback(response) {
        if (response.data.user) $scope.user = response.data.user;
        $scope.mybooks = response.data.mybooks;
        $scope.books = response.data.books;
      }, function errorCallback(response) {
        alert ("Error in database backend." + response);
      });
  } else {
    $http.get("http://localhost:8000")
    .then(function(response) {
        if (response.data.user) $scope.user = response.data.user;
        $scope.books = response.data.books;
    });
  }

});

/* Codes for linking to Auth0 for authentication */

var lock = new Auth0Lock('RqjZYWY4zj68fE272VbcqASBTnbbHU2k', 'pamelalim.auth0.com', {
  auth: { 
    params: { 
      scope: 'openid name email picture' 
    }
  }
});



if (id_token) {
  lock.getProfile(id_token, function (err, profile) {
    if (err) {
      return alert('There was an error getting the profile: ' + err.message);
    }
    // Display user information
    $('.nickname').text(profile.name);
    $('.avatar').attr('src', profile.picture);
  });
}

function logout() {
  alert('Logout!');
  localStorage.removeItem('id_token');
  window.location.href = "/";
}