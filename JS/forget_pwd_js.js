$("#commit_forget_pass").click(function () {
    let email=$("#forget_email").val();
    $.post('/confirm_email',{forget_email: email}, function (res) {
        if(res){
            alert("发送邮件成功,请注意查收！")

        } else {
            alert("您输入的邮箱不存在！");
        }
    })
});
