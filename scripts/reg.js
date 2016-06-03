// $(document).ready(function(){
function click() {
  $('#sign-in-button').on('click', function(){
    $('#register-form').hide();
    $('#home-page').show();
    if ($('#sign-in-button').text() === 'Sign In') {
      $('#signIn-nav').toggle('#reveal');
      var email = $('#email-signin').val();
      var password = $('#password-signin').val();
      if(email !== 'yourEmail') {
        artquestUser.signIn($('#email-signin').val(), $('#password-signin').val());
      };
    } else if ($('#sign-in-button').text() === 'Sign Out') {
      artquestUser.signOut();
    }
  });
};
