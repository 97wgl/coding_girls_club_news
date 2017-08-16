$("#commit_forget_pass").click(function () {
    let email=$("#forget_email").val();
    $.post('/comfirm_email',{email: email}, function (res) {
        if(res){
            resetPwdEmail($("#forget_email").val());
        } else {
            alert("您输入的邮箱不存在！");
        }
    })
});

