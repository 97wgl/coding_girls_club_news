/**
 * Created by wgl on 17-8-11.
 */
$('#commit_forget_pass').click( ()=> {
   let modify_email = document.getElementById('forget_email').value;

    resetPwdEmail(modify_email);

});