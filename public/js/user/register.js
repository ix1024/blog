 $('#register').on('click', function(ev) {
     var userName = $('#userName').val();
     var password = $('#password').val();
     var captcha = $('#captcha').val();
     var code = $('#code').val();
     $.post('/api/register/', {
         captcha: captcha,
         code: code,
         userName: userName,
         password: password
     }, function(res) {
         console.log(res);
     });
     ev.preventDefault();
 });