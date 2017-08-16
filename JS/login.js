let encry_password = new Encryption();

$(document).ready(function () {
    if ($.cookie("rmbUser") === "true") {
        $("#ck_rmbUser").attr("checked", true);
        $("#user_email").val($.cookie("user_email"));
        $("#user_password").val(encry_password.decode($.cookie("user_password")));
        //将保存在cookie中的密码解密
    }

    $("#btn_login").click(function () {
        let user_email = $("#user_email").val();
        let user_password = $("#user_password").val();

        $.post('/login',{user_email: user_email, user_password: user_password},
            function (res) {
                if(res) {
                    if ($("#ck_rmbUser").attr("checked")) {
                        $.cookie("rmbUser", "true", {expires: 7}); //存储一个带7天期限的cookie
                        $.cookie("user_email", user_email, {expires: 7});
                        $.cookie("user_password", encry_password.encode(user_password), {expires: 7});
                    }
                    else {
                        $.cookie("rmbUser", "false", {expire: -1});
                        $.cookie("user_email", "", {expires: -1});
                        $.cookie("user_password", "", {expires: -1});
                    }
                    location.href='admin';
                } else {
                    alert("邮箱名或密码错误！");
                    location.reload();
                }
        });
    });
  
    $("#forgetPass").click(function () {
        replaceForm();
        history.pushState(null,null,'forget_pwd');
    });
  
    $("#commit_forget_pass").click(function () {
        $.post('/comfirm_email', function (res) {
            // if(res){
                resetPwdEmail($("#forget_email").val());
            // } else {
            //     alert("您输入的邮箱不存在！");
            // }
        })
    })
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
                <input type="submit" id="commit_forget_pass" name="commit_forget_pass" value="Send mail to reset your password" class="btn btn-lg btn-block btn-skin"/>
            </div>
        </form>`;
    forgetForm.innerHTML = newForgetForm;
}


//修改密码和密码确认
// document.addEventListener("DOMContentLoaded",function () {
//     document.getElementById('pw_form').addEventListener('submit',function (event) {
//         event.preventDefault();
//         confirmPw();
//     });
// });

function confirmPw() {
    let user_pw = document.getElementById('user_pw').value;
    let user_cfm_pw = document.getElementById('user_cfm_pw').value;
    if(user_pw.length < 7){
        alert('Your password is too short, please change a safety one.');
        $('#user_pw').val('');
        $('#user_cfm_pw').val('');
    }else if(user_pw !== user_cfm_pw){
        alert(`The password did not match the re-typed password.`);
        $('#user_pw').val('');
        $('#user_cfm_pw').val('');
    }
}
