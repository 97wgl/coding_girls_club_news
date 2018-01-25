/**
 * Created by wgl on 17-8-9.
 */
const nodemailer = require('nodemailer');
const encryptionModule = require('./encryption');

function resetPwdEmail(sendEmail) {
    let encrypty = new encryptionModule.Encryption();
    let transporter = nodemailer.createTransport({
        service: 'qq',
        secureConnection: true,
        auth: {
            user: '1060756423@qq.com',
            pass: encrypty.decode('b2ZlbGRpcnFtZ2J2YmViZQ==')
            //将邮箱授权码加密（授权码可进入邮箱用户中心获取）
        }
    });
    let mailOptions = {
        from: '1060756423@qq.com', // 发送者
        to: sendEmail, // 接受者,可以同时发送多个,以逗号隔开,'yyyy@qq.com,xxxx@qq.com',
        subject: 'coding girls club重置密码', // 标题
        html: `<h2>Comfirm reset password:</h2><h3>
 <p>亲爱的${sendEmail}用户，您在${(new Date()).toString().substring(3,25)}提交了密码重置请求，请点击下面的链接重置密码;若此请求非您本人操作，请忽略此消息.</p>
    <a href="http://www.codingirls.club/login">
    http://www.codingirls.club/login</a></h3>`
    };


    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('Message %s sent: %s', info.messageId, info.response);
        }


    });
}

//测试
// resetPwdEmail('1475693887@qq.com');