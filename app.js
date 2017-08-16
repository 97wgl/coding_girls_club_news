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


/*----------------html文件读取-------------------*/
//读取index.html文件
app.get('/index', function (req, res) {
    res.sendFile(__dirname + '/HTML/' + 'index.html');
});

//读取login.html文件
app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/HTML/' + 'login.html');
});

//读取manage.html文件
app.get('/manage', function (req, res) {
    res.sendFile(__dirname + '/HTML/' + 'manage.html');
});

//读取list.html文件
app.get('/list.html', function (req, res) {
    res.sendFile(__dirname + '/HTML/' + 'list.html');
});

//读取article_detail.html文件
app.get('/article_detail.html', function (req, res) {
    res.sendFile(__dirname + '/HTML/' + 'article_detail.html');
});

//读取reset-password.html文件
app.get('/reset-password', function (req, res) {
    res.sendFile(__dirname + '/HTML/' + 'reset-password.html');
});




/*--------------------后台API-------------------*/
//后台管理员登录验证，判断邮箱和密码是否正确
app.post("/login", function (req, res) {

    //获取登录输入框的值
    const manageLoginInfo = {
        txt_email: req.body.user_email,
        txt_password: req.body.user_password
    };

    const sql_str = "select * from Manager where manager_email = '" + manageLoginInfo.txt_email + "' and manager_pwd = '" + manageLoginInfo.txt_password + "'";

    db.all(sql_str, function (err, result) {
        if(result.length !== 0) {
            console.log(result);
            res.send(true);
        } else {
            res.send(false);
        }
    });
});

//后台分页展示信息news
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

//后台分页展示信息blogs
app.get("/all_blog", function (req, res) {

    const req_page = req.query.page;
    const sql_str = "select * from blogs order by blog_time desc limit ('"+req_page+"'-1)*8,8";
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

//后台查询新闻
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

//后台查询博客
app.get("/search_blog", function (req, res) {

    //searchInfo为搜索框的内容
    const searchKeyWords = req.query.keywords;

    const sql_str = "select * from blogs where blog_title like '%" + searchKeyWords + "%' or blog_content like '%" + searchKeyWords + "%' order by blog_time desc";
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

//后台找回密码邮箱验证
app.post('/comfirm_email',function (req, res) {

    const input_email = req.body.forget_email;
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

//后台管理员更改密码
app.put('/modify_password', function (req, res) {

    const new_email = req.body.input_email;
    const sql_str = "update manager set manager where manager_eamil = '" + new_email + "'";

    db.run(sql_str, function (err) {
        if (!err) {
            console.log("修改成功！");
            res.send(true);
        }
    });
});

//后台添加新闻
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

//后台添加博客
app.post('/addblog', function (req,res) {

    let blogInfo = {
        time:req.body.time,
        title:req.body.title,
        content:req.body.content,
        headline:req.body.isHeadline
    };

    const sqlStr = "insert into blogs(blog_time,blog_title,blog_content,isHeadline) values('"+blogInfo.time+"','"+blogInfo.title+"','"+blogInfo.content+"','"+blogInfo.headline+"')";

    db.run(sqlStr, function (err) {
        if (err) {
            console.log("录入失败！" + err);
        } else {
            res.status(200).send('录入成功！');
            console.log("录入成功！");
        }
    });
});

//后台编辑新闻
app.put('/edit_news',function (req, res) {

    const editInfo = {
        time:req.body.time,
        title:req.body.title,
        content:req.body.content,
        headline:req.body.isHeadline,
        id:req.body.modify
    };
    const sqlStr = "update news set news_title ='"+editInfo.title+"',news_content ='"+editInfo.content+"' where id = '"+editInfo.id+"'";

    db.run(sqlStr,function (err) {
        if (err) {
            res.send("更新失败！" + err);
        } else {
            res.status(200).send('修改成功！');
            console.log("修改成功！");
        }
    });
});

//后台编辑博客
app.put('/edit_blog',function (req, res) {

    const editInfo = {
        time:req.body.time,
        title:req.body.title,
        content:req.body.content,
        headline:req.body.isHeadline,
        id:req.body.modify
    };
    const sqlStr = "update blogs set blog_time ='"+editInfo.time+"',blog_title ='"+editInfo.title+"',blog_content ='"+editInfo.content+"' where id = '"+editInfo.id+"'";

    db.run(sqlStr,function (err) {
        if (err) {
            res.send("更新失败！" + err);
        } else {
            res.status(200).send('修改成功！');
            console.log("修改成功！");
        }
    });
});

//后台删除新闻或博客
app.delete('/delete' ,function (req,res) {

    const deleteId = req.body.delId;
    const deleteType = req.body.delType;

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


/*--------------------前台API------------------*/
//前台页面加载时分页展示新闻信息
app.get("/all_news_pading", function (req, res) {

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
    const searchPage = req.query.searchPage;

    const sql_str = "select * from news where news_title like '%" + searchInfo + "%' or news_content like '%" + searchInfo + "%' order by news_time desc limit ('"+searchPage+"'-1)*4,4";
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

//前台根据时间筛选内容
app.get('/time_search',function (req,res) {

    const search_time = req.query.searchDate;
    const page = req.query.searchPage;
    const sqlStr = "select * from news where news_time like '"+search_time+"%' order by news_time desc limit ('"+page+"'-1)*4,4";

    db.all(sqlStr, function (err,result) {
        if(!err){
            res.send(result);
        } else{
            res.send(err);
        }
    });

});

//前台根据id获取详细新闻
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

//前台首页头条新闻
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


/*-----------------------前后台---------------------*/
//获取新闻的总条数（前后台共用）
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

//获取博客的总条数（前后台共用）
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


//运行在3000端口
app.listen(3000, () => {
    console.log('running on port 3000...');
});









