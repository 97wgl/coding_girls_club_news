$("#reset_pw_btn").click(function () {
    let user_email=location.href.split("?")[1].split("=")[1];
    let user_pw = $('#user_pw').val();
    let user_cfm_pw = $('#user_cfm_pw').val();
    if(user_pw.length < 7){
        alert('Your password is too short, please change a safety one.');
        $('#user_pw').val('');
        $('#user_cfm_pw').val('');
    }
    else if(user_pw !== user_cfm_pw){
        alert(`The password did not match the re-typed password.`);
        $('#user_pw').val('');
        $('#user_cfm_pw').val('');
    }
    else {
        $.ajax({
            type: 'PUT',
            url: '/reset_pwd',
            data: {
                user_email: user_email,
                user_password: user_cfm_pw
            },
            success: function (responseText, textStatus) {
                if (textStatus) {
                    layer.alert('密码重置成功！', {
                        title: '恭喜你',
                        icon: 1
                    });
                }
            }
        });
    }
});