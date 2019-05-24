

$("#registerPanel").hide();
$('#loginspinner').hide();
$('#registerspinner').hide();

$('form#loginform').submit(function (e) {
    e.preventDefault();
    var memberdata = {
        email: $('#email').val(),
        password: $('#password').val(),
        type: 0,
    };
    $('#btn-login').hide();
    $('#loginspinner').show();
    $.ajax({
        type: 'POST',
        url: '/login',
        data: memberdata,
        success: function (data) {
            if(data[0]== null){
                M.toast({
                    html: 'Email veya Şifre Hatalı!'
                });
                setTimeout(function(){
                    location.reload();
                },1000)
            }else{
                location.reload();
            }
            //do something with the data via front-end framework
            
        }
    });
});
$('form#registerform').on('submit', function () {
    if ($('#registerPassword').val() == $('#registerPasswordRepeat').val()) {
        var memberdata = {
            email: $('#registerEmail').val(),
            password: $('#registerPassword').val(),
            type: 0,
        };
        
        $.ajax({
            type: 'POST',
            url: '/register',
            data: memberdata,
            success: function (data) {
                $('#btn-login').show();
                $('#loginspinner').hide();
                //do something with the data via front-end framework
                alert(data);
            }
        });
    } else {
        alert("Girdiğiniz şifrelerin birbiriyle uyuştuğuna emin olunuz");
    }
});


// $("form#registerform").submit(function (e) {
//     $('#btn-register').hide();
//     $('#registerspinner').show();
//     e.preventDefault();
//     setTimeout(
//         function () {
//             if (true) {
//                 //window.location = 'index';
//                 M.toast({
//                     html: 'Üyelik Başarılı !'
//                 });

//             } else {
//                 M.toast({
//                     html: 'Email veya Şifre Hatalı!'
//                 });
//                 window.location = "login";
//             }

//         }, 1000);
// });
var isLoginMenu = true;
$('#register').click(function(){
    if(isLoginMenu){
        $('#loginPanel').addClass("rotate-reverse");
        setTimeout(function() {
            $('#loginPanel').hide();
            $('#registerPanel').show();
            $(this).text("Giriş Yap");
        }, 700);
        isLoginMenu= false;
    }else{
        $('#loginPanel').addClass("rotate-reverse");
        setTimeout(function() {
            $('#loginPanel').show();
            $('#registerPanel').hide();
            $(this).text("Üye Ol");
        }, 700);
    }
});