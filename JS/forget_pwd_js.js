$("#commit_forget_pass").click(function () {
    let email=$("#forget_email").val();
    $.post('/confirm_email',{forget_email: email}, function (res) {
        if(res){
            layer.alert('发送邮件成功,请注意查收！',{
                title: '提示',
                icon: 1
            });
        } else {
            layer.alert('您输入的邮箱不存在！',{
                title: '抱歉',
                icon: 0
            })
        }
    })
});
