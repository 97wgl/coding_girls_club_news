/**
 * Created by wgl on 17-8-10.
 */
// $(document).ready(function () {
//     if ($.cookie("rmbUser") === "true") {
//         $("#ck_rmbUser").attr("checked", true);
//         $("#user_email").val($.cookie("user_email"));
//         $("#user_password").val($.cookie("user_password"));
//     }
// });
//
// $("#manager_login").onclick(function () {
//     if ($("#ck_rmbUser").attr("checked")) {
//         let user_email = $("#user_email").val();
//         let user_password = $("#user_password").val();
//         $.cookie("rmbUser", "true", { expires: 15 }); //存储一个带15天期限的cookie
//         $.cookie("user_email", user_email, { expires: 15 });
//         $.cookie("user_password", user_password, { expires: 15 });
//     }
//     else {
//         $.cookie("rmbUser", "false", { expire: -1 });
//         $.cookie("user_email", "", { expires: -1 });
//         $.cookie("user_password", "", { expires: -1 });
//     }
// });
// // //记住用户名密码
// function Save() {
//     if ($("#ck_rmbUser").attr("checked")) {
//         let user_email = $("#user_email").val();
//         let user_password = $("#user_password").val();
//         $.cookie("rmbUser", "true", { expires: 7 }); //存储一个带7天期限的cookie
//         $.cookie("user_email", user_email, { expires: 7 });
//         $.cookie("user_password", user_password, { expires: 7 });
//     }
//     else {
//         $.cookie("rmbUser", "false", { expire: -1 });
//         $.cookie("user_email", "", { expires: -1 });
//         $.cookie("user_password", "", { expires: -1 });
//     }
// }