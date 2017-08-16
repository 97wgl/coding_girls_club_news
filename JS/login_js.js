let encry_password = new Encryption();
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
                $.session.set('isLogin', true);
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
