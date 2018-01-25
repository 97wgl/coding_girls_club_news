let encry_password = new Encryption();
let user_email = $.session.get('admin_email'),
    user_encry_pwd = $.session.get('admin_encry_pwd');
if(!user_email || !user_encry_pwd){
    loginTips();
}
else{
    let user_password = encry_password.decode(user_encry_pwd);
    $.post('/login',{user_email: user_email, user_password: user_password},
        function (res) {
            if(!res) {
                loginTips();
            }
            else{
                /*登录后提示信息*/
                displayTips("news", "news");
                displayTips("blog", "blogs");

                /*展示登录提示信息，并绑定事件*/
                function displayTips(name, names) {    //api原因，参数有可能有s
                    $.get(`/all_${name}_count`, function (count) {
                        $("#admin-name").html(res[0].manager_name);
                        $(`#${name}-count`).html(count[0][`all_${names}_count`]).click(function () {
                            $("#modify-"+name).trigger("click");
                        });
                    });
                }

            }
        }
    );
}


/*提示登陆弹窗*/
function loginTips() {
    layer.alert('请先登陆！', {
        icon: 0,
        title: '抱歉！',
        btn: '现在去登陆！',
        btn1:function () {
            window.location.href="/login";
        },
        cancel: function () {
            return false;
        }
    });
}