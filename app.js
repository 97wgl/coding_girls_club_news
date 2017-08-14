const sqlite3 = require('sqlite3');
const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');

const app = express();
const db = new sqlite3.Database(__dirname + '/Database/News.db');

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/'));
app.use(session({
    secret: 'NewsApp', //为了安全性的考虑设置secret属性
    cookie: {maxAge: 60 * 1000 * 30}, //设置过期时间
    resave: true, // 即使 session 没有被修改，也保存 session 值，默认为 true
    saveUninitialized: false, //
}));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


//读取index.html文件
app.get('/index', function (req, res) {
    res.sendFile(__dirname + '/HTML/' + 'index.html');
});

//读取login.html文件
app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/HTML/' + 'login.html');
});

//读取manage.html文件
app.get('/admin', function (req, res) {
    res.sendFile(__dirname + '/HTML/' + 'manage.html');
});

app.get('/list.html', function (req, res) {
    res.sendFile(__dirname + '/HTML/' + 'list.html');
});

app.get('/article_detail.html', function (req, res) {
    res.sendFile(__dirname + '/HTML/' + 'article_detail.html');
});

//读取reset-password.html文件
app.get('/reset-password', function (req, res) {
    res.sendFile(__dirname + '/HTML/' + 'reset-password.html');
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
            res.send(true);
            console.log("录入成功！");
        }
    });
});

//首页头条新闻
app.get("/news_list", function (req, res) {

    const sql_str = "select * from news where isHeadline='1' order by news_time desc limit 0,3";
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
        if(result) {
            res.send(true);
        }
    });
});

//后台分页展示信息
app.get("/all_news", function (req, res) {

    const req_page = req.query.page;
    const sql_str = "select * from news order by news_time desc limit ('"+req_page+"'-1)*8,8";
    //根据前台传过来的page,从数据库动态查询相应信息
    db.all(sql_str, function (err, result) {
        if (err) {
            console.log("读取数据失败！" + err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

//前台分页展示新闻信息
app.get("/all_news", function (req, res) {

    const req_page = req.query.page;
    const sql_str = "select * from news order by news_time desc limit ('"+req_page+"'-1)*4,4";
    //根据前台传过来的page,从数据库动态查询相应信息
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

//查询新闻
app.get("/search_news", function (req, res) {

    const searchKeyWords = req.query.keywords;
    const sql_str = "select * from news where news_title like '%" + searchKeyWords + "%' or news_content like '%" + searchKeyWords + "%' order by news_time desc";

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

//查询博客
app.get("/search_blog", function (req, res) {

    //searchInfo为搜索框的内容
    const searchKeyWords = req.query.keywords;

    const sql_str = "select * from blog where blogs_title like '%" + searchKeyWords + "%' or news_content like '%" + searchKeyWords + "%' order by news_time desc";
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
app.get('/all_blog_count', function (req, res) {

    const sql_str = "select * from blog_count";

    db.all(sql_str, function (err, result) {
        if (err) {
            console.log("读取数据失败！");
        } else {
            console.log("博客数量为:" + result[0].all_blog_count);
            res.send(result);
        }
    });

});

//邮箱验证
app.get('/comfirm_email',function (req, res) {

    const input_email = req.query.checkEmail;
    const sql_str = "select * from manager where manager_email = '"+input_email+"'";

    db.all(sql_str, function (err ,result) {
        if(result.length === 0){
            console.log(result);
            res.send(true);
        } else {
            console.log(err);
            res.send(false);
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

//根据id获取详细新闻
app.get('/detail',function (req,res) {

    const sqlStr = `select * from News where id = ${req.query.newsid}`;

    db.all(sqlStr, function (err, result) {
        if(err){
            console.log("读取数据失败！");
        } else {
            console.log("新闻为:"+result);
            res.send(result);
        }
    })
});

//后台
app.post('/addNews', function (req,res) {

    let newsInfo = {
        time:req.body.time,
        title:req.body.title,
        content:req.body.content,
        headline:req.body.isHeadline
    };

    const sqlStr = "insert into news(news_time,news_title,news_content,isHeadline) values('"+newsInfo.time+"','"+newsInfo.title+"','"+newsInfo.content+"','"+newsInfo.headline+"')";

    db.run(sqlStr, function (err) {
        if (err) {
            console.log("录入失败！" + err);
        } else {
            res.status(200).send('录入成功！');
            console.log("录入成功！");
        }
    });
});

app.put('/edit_news/:id',function (req, res) {

    const editInfo = {
        time:req.params.time,
        title:req.params.title,
        content:req.params.content,
        headline:req.params.isHeadline,
        id:req.params.id
    };
    const sqlStr = "update news set news_time ='"+editInfo.time+"',news_title ='"+editInfo.title+"',news_content ='"+editInfo.content+"' where id = '"+editInfo.id+"'";

    db.prepare(sqlStr,function (err) {
        if (err) {
            res.send("更新失败！" + err);
        } else {
            res.status(200).send('修改成功！');
            console.log("修改成功！");
        }
    });
});

//删除新闻或博客
app.delete('/delete' ,function (req,res) {

    const deleteId = req.params.delId;
    const deleteType = req.params.delType;

    if(deleteType === "news"){
        db.run("delete from  news where id = '"+deleteId+"'",function (err) {
           if(!err){
               res.send(true);
           } else {
               res.send(false);
           }
        });
    } else {
        db.run("delete from blogs where id = '"+deleteId+"'",function (err) {
            if(!err){
                res.send(true);
            } else {
                res.send(false);
            }
        })
    }
});






