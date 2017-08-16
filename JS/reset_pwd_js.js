$("#reset_pw_btn").click(function () {
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
    else{
        $.post()
    }
});