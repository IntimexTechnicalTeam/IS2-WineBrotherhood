/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
function fbLogin () {
  FB.login(function (response) {
    checkLoginState();
  }, { scope: 'email' });
}
appid = '1158481254532659';
function checkLoginState () {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}
function statusChangeCallback (response) {
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    doLOGINAPI();
  } else {
    // The person is not logged into your app or we are unable to tell.
    document.getElementById('status').innerHTML = 'Please log ' +
          'into this app.';
  }
}
window.fbAsyncInit = function () {
  // init the FB JS SDK
  FB.init({
    appId: appid,
    cookie: true,
    xfbml: true,
    version: 'v7.0' // Look for social plugins on the page
  });
  FB.AppEvents.logPageView();
  // FB.getLoginStatus(function(response) {
  //  statusChangeCallback(response);
  // });
};

// Load the SDK asynchronously
// addEventListener('faceBookLoad', function () {
//   (function (d, s, id) {
//     var js; var fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) return;
//     js = d.createElement(s);
//     // js.id = id;
//     js.src = 'https://connect.facebook.net/en_US/sdk.js';
//     fjs.parentNode.insertBefore(js, fjs);
//   }(document, 'script', 'facebook-jssdk'));
// });
// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function doLOGINAPI () {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me?fields=id,name,email,permissions,first_name,last_name', function (response) {
    console.log('Successful login for: ' + response.name);
    // document.getElementById('status').innerHTML ='Thanks for logging in, ' + response.name + '[' + response.email + ']' + '!';
    MemberApi.fbLogin(response.id, 'fb').then(function (res) {
      let data = res.data;
      if (data.Succeeded) {
        // wsApi.controller.member.getId();
        fblogout();
        // storage.set('isLogin', '1');
        localStorage.setItem('isLogin', '1');
        window.location.href = '/account/memberInfo';
      } else {
        var member = {};
        member.Email = response.email;
        member.FirstName = response.first_name;
        member.LastName = response.last_name;
        member.ThirdPartyUserId = response.id;
        member.ThirdPartyType = 'fb';
        MemberApi.register(member).then(function (lr) {
          if (lr.Succeeded) {
            MemberApi.fbLogin(response.id, 'fb').then(function (res) {
              let data = res.data;
              if (data.Succeeded) {
                // wsApi.controller.member.getId();
                fblogout();
                localStorage.setItem('isLogin', '1');
                window.location.href = '/account/memberInfo';
              }
            });
          }
        });
        // $.cookie('name', response.name);
        // storage.set('name', response.name ? response.name : '');
        // storage.set('email', response.email ? response.email : '');
        // storage.set('id', '"' + response.id + '"');
        // storage.set('type', 'fb');
        // storage.set('loginAction', 'register');
        // window.location.href = '/account/register';
      }
    });
  });
}
function fblogout () {
  FB.getLoginStatus(function (response) {
    if (response.status === 'connected') {
      FB.logout();
    }
  });
}
// $(document).ready(function () {
//   var t = {
//     delay: 125,
//     overlay: $('.fb-overlay'),
//     widget: $('.fb-widget'),
//     button: $('.fb-button')
//   };
//   $('.ctrlq').on('click', function (e) {
//     e.preventDefault(),
//     t.overlay.is(':visible') ? (t.overlay.fadeOut(t.delay), t.widget.stop().animate({
//       bottom: 0,
//       opacity: 0
//     },
//     2 * t.delay,
//     function () {
//       $(this).hide('slow'), t.button.show();
//     }))
//       : t.button.fadeOut('medium', function () {
//         t.widget.stop().show().animate({
//           bottom: '30px',
//           opacity: 1
//         }, 2 * t.delay), t.overlay.fadeIn(t.delay);
//       });
//   });
// });
function confirm () {
  // eslint-disable-next-line no-new-object
  var obj = new Object();
  obj.FormId = $('#RpForm_Id').val();
  obj.TotalAmount = Number($('#total').html());
  obj.Signature = $('#img-signature').attr('src');
  obj.RnpSubmitDatas = getAnswers();
  regAndPay.saveSubmit(obj).then(function (result) {
    if (result.data.Succeeded) {
      router.push({
        path: '/regnpay/result/' + result.data.ReturnValue
      });
    } else {
      alert(result.data.Message);
    }
  });
}
