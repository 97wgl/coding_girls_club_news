$("#forgetPass").click(function () {
    replaceForm();
});
// $("#reset_pw_btn").click(function () {
//     confirmPw();
// });

function replaceForm() {
    let forgetForm = document.getElementById("login-form");
    let newForgetForm =
        `<form action="" accept-charset="UTF-8" method="post">
            <div class="form-group">
                <input type="text" name="forget_email" id="forget_email" class="form-control" placeholder="Email"/>
                    <span class="input-icon"><i class=" fa fa-envelope"></i></span>
            </div>
            <br/>
            <div class="input-hover">
                <input type="submit" name="commit_forget_pass" value="Send mail to reset your password" class="btn btn-lg btn-block btn-skin"/>
            </div>
        </form>`;
    forgetForm.innerHTML = newForgetForm;
}

document.addEventListener("DOMContentLoaded",function () {
    document.getElementById('pw_form').addEventListener('submit',function (event) {
        event.preventDefault();
        confirmPw();
    });
});

function confirmPw() {
    let user_pw = document.getElementById('user_pw').value;
    let user_cfm_pw = document.getElementById('user_cfm_pw').value;
    if(user_pw !== user_cfm_pw){
        alert(`The password did not match the re-typed password.`);
        document.getElementById('user_pw').value = '';
        document.getElementById('user_cfm_pw').value = '';
    }
}