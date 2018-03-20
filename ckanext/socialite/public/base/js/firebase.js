/* Firebase Setup and Integration with CKAN */

var config = {
  apiKey: 'AIzaSyDbtDvkotuS_3l_dATyVF_cneDm3QoHm0k',
  authDomain: 'vulekamali.firebaseapp.com',
  databaseURL: 'https://vulekamali.firebaseio.com',
  projectId: 'vulekamali',
  storageBucket: 'vulekamali.appspot.com',
  messagingSenderId: '495372455907'
}

firebase.initializeApp(config)

// Github Authentication Functionality

var githubprovider = new firebase.auth.GithubAuthProvider()
// provider.addScope('user')

function login () {
  firebase.auth().signInWithPopup(githubprovider)
    .then(
      function (result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        var githubuser = firebase.auth().currentUser

        if (githubuser != null) {
          githubuser.providerData.forEach(function (profile) {
            var signedinusername = profile.email.split('@')[0].replace(/\./g, '')
            $.ajax({
              type: 'POST',
              url: '/user/login',
              data: {id_token: profile.uid, token: token},
              success: function(res, status, xhr) {
                window.location.replace('/dataset');
              },
              error: function(xhr, status, err) {
                alert('Login failure: ' + err);
              }
            });

          });
        }
      })

    .catch(
      function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorCode);
        console.log(errorMessage);

      }
    )
}
