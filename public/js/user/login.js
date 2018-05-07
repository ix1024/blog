 $('#login').on('click', function(ev) {
     var userName = $('#userName').val();
     var password = $('#password').val();
     var captcha = $('#captcha').val();
     $.post('/api/login', {
         captcha: captcha,
         userName: userName,
         password: password
     }, function(res) {
         console.log(res);
     });
     ev.preventDefault();
 });