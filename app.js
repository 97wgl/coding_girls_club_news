const sqlite3 = require('sqlite3');
const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const db = new sqlite3.Database(__dirname + '/Database/News.db');

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/'));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//读取login.html文件
app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/HTML/' + 'login.html');
});

//读取manage.html文件
app.get('/manage', function (req, res) {
    res.sendFile(__dirname + '/HTML/' + 'manage.html');
});

//数据录入，测试案例
app.post('/test', function (req, res) {

    const manegerInfo = {
        managerName: req.body.inputName,
        managerId: req.body.inputId,
        managerEmail: req.body.inputEmail,
        managerPwd: req.body.inputPwd
    };


    const sql_str = "insert into manager values('" + manegerInfo.managerId + "','" + manegerInfo.managerName + "','" + manegerInfo.managerEmail + "','" + manegerInfo.managerPwd + "')";
    //录入一条管理员信息
    db.run(sql_str, function (err) {
        if (err) {
            console.log("录入失败！" + err);
        } else {
            res.statusCode = 200;
            console.log("录入成功！");
        }
    });
});

//首页头条新闻
app.get("/news_list", function (req, res) {

    const sql_str = "select * from news where isHeadline='1' and strftime('%m-%d','now','localtime') = strftime('%m-%d',news_time)";
    //查询当日的头条新闻
    db.all(sql_str, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

//登录验证，判断邮箱和密码是否正确
app.post("/login", function (req, res) {

    //获取登录输入框的值
    const manageLoginInfo = {
        txt_email: req.body.user_email,
        txt_password: req.body.user_password
    };

    const sql_str = "select * from Manager where manager_email = '" + manageLoginInfo.txt_email + "' and manager_pwd = '" + manageLoginInfo.txt_password + "'";

    db.all(sql_str, function (err, result) {
        if (result.length !== 0) {　　//如果能从数据库读取数据，则说明验证成功，向前台发送"true"
            console.log(result);
            res.send(true);
        } else {   //验证失败，向前台发送"false"
            console.log(err);
            res.send(false);
        }
    });
});

//获取所有新闻信息
app.get("/all_news", function (req, res) {

    const sql_str = "select * from news order by news_time desc";
    //获取所有的新闻，按时间先后排序
    db.all(sql_str, function (err, result) {
        if (err) {
            console.log("读取数据失败！" + err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

//按键入关键字进行模糊搜索
app.get("/search", function (req, res) {

    //searchInfo为搜索框的内容
    const searchInfo = req.query.searchInfo;

    const sql_str = "select * from news where news_title like '%" + searchInfo + "%' or news_content like '%" + searchInfo + "%' order by news_time desc";
    //按关键字进行模糊搜索，可以在标题和内容中匹配
    db.all(sql_str, function (err, result) {
        if (err) {
            console.log("读取数据失败！" + err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

//获取新闻的总条数
app.get('/all_news_count', function (req, res) {

    const sql_str = "select * from news_count";

    db.all(sql_str, function (err, result) {

        if (err) {
            console.log("读取数据失败！");
        } else {
            console.log("新闻数量为:" + result[0].all_news_count);
            res.send(result);
        }
    });
});

//获取博客的总条数
app.get('/all_blogs_count', function (req, res) {

    const sql_str = "select * from blogs_count";

    db.all(sql_str, function (err, result) {
        if (err) {
            console.log("读取数据失败！");
        } else {
            console.log("博客数量为:" + result[0].all_blogs_count);
            res.send(result);
        }
    });

});

//更改密码
app.put('/modify_password', function (req, res) {

    const new_email = req.params.input_email;
    const sql_str = "update manager set manager where manager_eamil = '" + new_email + "'";

    db.run(sql_str, function (err) {
        if (!err) {
            console.log("修改成功！");
            res.send(true);
        }
    });
});



//运行在3000端口
app.listen(3000, () => {
    console.log('running on port 3000...');
});

















