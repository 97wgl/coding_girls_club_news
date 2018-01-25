/*侧边菜单折叠动画*/
$("#new").click(function () {
    $("#new-list").slideToggle(function () {
        if($(this).is(':hidden')){
            $("#new").find(".switch").html("<i class='fa fa-angle-left' aria-hidden='true'></i>")
        }
        else{
            $("#new").find(".switch").html("<i class='fa fa-angle-down' aria-hidden='true'></i>")
        }
    });
});
$("#modify").click(function () {
    $("#modify-list").slideToggle(function () {
        if($(this).is(':hidden')){
            $("#modify").find(".switch").html("<i class='fa fa-angle-left' aria-hidden='true'></i>")
        }
        else{
            $("#modify").find(".switch").html("<i class='fa fa-angle-down' aria-hidden='true'></i>")
        }
    });
});


/*点击logo刷新*/
$("#logo").click(function () {
    location.reload();
});


/*修改密码按钮*/
$(".modify-password").click(function () {
    let user_email = $.session.get('admin_email');
    window.location.href="/reset-password?email="+user_email;
});

/*注销功能*/
$("#logout").click(function () {
    $.session.remove('admin_email');
    $.session.remove('admin_encry_pwd');
    window.location.href="http://www.codingirls.club/";
});


/*新建文章功能*/
let mEditor;
let E = window.wangEditor;
let editor = new E('#editor');

let buttonHtmlM="<button id='switch-editor' type='button'>切换为Markdown编辑器</button>";
let buttonHtml="<button id='switch-editor' type='button'>切换为富文本编辑器</button>";
let radio="<div id='settingHeadline'><i class='fa fa-fire' aria-hidden='true'></i> &nbsp;设置为头条：<input type='radio' name='isHeadline' value='true'>是 &nbsp;<input type='radio' name='isHeadline' value='false' checked>否</div>";
let button=" <button type='button' class='submit'><i class='fa fa-check' aria-hidden='true'></i>&nbsp;提交</button> <button type='button' class='cancel'><i class='fa fa-times' aria-hidden='true'></i>&nbsp;撤销</button>";
let editorHtml="<div class='editor'> <input type='text' class='input-title' placeholder='在此输入你的标题...'><div id='editor'></div></div>"+radio+button;
let editorHtmlM="<div class='editor'> <input type='text' class='input-title' placeholder='在此输入你的标题...'><div id='editor-md'></div></div>"+radio+button;

$("#new-news").click(function () {
    editorArea("新闻");
});
$("#new-blog").click(function () {
    editorArea("博客");
});


/*将type（新闻/博客）转换为name(news/blog)*/
function translateTypeToName(type) {
    if(type==="新闻"){
        return "news";
    }
    else if(type==="博客"){
        return "blog";
    }
}


/*创建编辑区域*/
function editorArea(type, data){    //type：新闻、博客,data为需要预填的数据,格式为对象
    let name=translateTypeToName(type);
    if($.cookie("defaultEditor")==="mEditor"){
        $("article").html("<div class='tip'> <span><i class='fa fa-code' aria-hidden='true'></i>&nbsp;请添加"+type+"内容</span> "+buttonHtml+"</div>"+editorHtmlM);
        if(data){
            $(".input-title").val(data[name+"_title"]);
            /*Markdown编辑器*/
            createMarkdown(data[name+"_content"]);
        }
        else{
            createMarkdown();
        }
    }
    else{
        $("article").html("<div class='tip'> <span><i class='fa fa-code' aria-hidden='true'></i>&nbsp;请添加"+type+"内容</span> "+buttonHtmlM+"</div>"+editorHtml);
        if(data){
            $(".input-title").val(data[name+"_title"]);
            /*富文本编辑器*/
            createEditor(data[name+"_content"]);
        }
        else{
            createEditor();
        }
    }
    switchEditor();
    addBtnEvent(type);
}


/*点击切换编辑器功能*/
function switchEditor() {
    $("#switch-editor").click(function () {
        let content=getEditorValue();
        if(whichEditor()){
            switchToMarkdown(content);
        }
        else{
            switchToEditor(content);
        }
    });
}


/*编辑器切换*/
function switchToMarkdown(content) {
    $("#switch-editor").html("切换为富文本编辑器");
    $("#editor").html("").attr("id", "editor-md");
    /*markdown编辑器*/
    createMarkdown(content);
}

function switchToEditor(content) {
    $("#switch-editor").html("切换为Markdown编辑器");
    $("#editor-md").html("").attr("id", "editor");
    /*富文本编辑器*/
    createEditor(content);
}


/*创建富文本编辑器*/
function createEditor(content) {
    editor.create();
    editor.txt.html(content);
}


/*创建Markdown编辑器*/
function createMarkdown(content) {
    let text="";
    if(content){
        text=toMarkdown(content);
    }
    mEditor = editormd("editor-md", {
        width: "100%",
        height: "360px",
        syncScrolling: "single",
        path: "../library/editor.md-master/lib/",
        saveHTMLToTextarea : true,
        markdown: text,
        // htmlDecode : "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
        toolbarIcons : function() {
            return ["undo", "redo", "|", "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|", "h1", "h2", "h3", "h4", "h5", "h6", "|", "list-ul", "list-ol", "|", "link", "reference-link", "image", "code", "table", "datetime", "watch", "fullscreen", "preview", "clear"];
        }
    });
    $(".editormd-markdown-textarea").attr("placeholder", "请开始你的创作!");
}


/*判断是哪种编辑器,如果whichEditor值为true，则为富文本编辑器，反之，则为Markdown编辑器*/
function whichEditor() {
    return $(".editor").find("#editor").length>0;
}


/*获取编辑器的值*/
function getEditorValue() {
    if(whichEditor()){
        return editor.txt.html();
    }
    else{
        return mEditor.getHTML();
    }
}


/*编辑器的提交和撤销按钮事件绑定*/
function addBtnEvent(type){     //type：新闻、博客
    let name=translateTypeToName(type);

    $("article").find(".submit").click(function () {
        if( isEmpty(editor, mEditor, whichEditor()) ){                //如果编辑器内容和标题都为空
                layer.alert('请键入完整内容后再提交', {
                    title: '提示',
                    icon: 0,
                });
        }
        else{
            let myDate=new Date(), time ,content;
            let month=myDate.getMonth()+1, date=myDate.getDate(), hours=myDate.getHours(), minutes=myDate.getMinutes();
            time=myDate.getFullYear().toString()+"-"+addZero(month)+"-"+addZero(date)+" "+addZero(hours)+":"+addZero(minutes);
            let title= $(".input-title").val();
            let isHeadline=$("input[name='isHeadline']:checked").val();

            //将编辑器中内容发送给服务器
            sendContent(title, getEditorValue(), time, isHeadline, type);
        }
    });

    $("article").find(".cancel").click(function () {
        layer.confirm('撤销编辑后已有工作不可恢复，是否确定撤销？', {
            icon: 0,
            title: '提示',
            btn: ['确定','取消'] //按钮
        }, function(index){
            layer.close(index);
            $("#modify-"+name).trigger("click");
        });
    });
}


/*向服务器发送新建文本*/
function sendContent(title, content, time, isHeadline, type) {
    let name=translateTypeToName(type);

    $.ajax({
        type: "POST",
        url: "/add"+name,
        data: {
            "title": title,
            "content": content,
            "time": time,
            "isHeadline": isHeadline
        },
        success:
            function(responseText, textStatus) {
                if (textStatus) {
                    layer.alert('提交成功！', {
                        icon: 1,
                        title: '提交结果'
                    }, function (index) {
                        layer.close(index);
                        $("#modify-"+name).trigger("click");
                    });
                }
            }
    });
}


function addZero(num) {             //将一位数字变成两位字符串
    if(num<10){
        return "0"+num.toString();
    }
    else{
        return num.toString();
    }
}


/*判断内容和标题是否为空,如果有一项空，则返回true*/
function isEmpty(editor, mEditor, boolean) {     //boolean为编辑器类别，true为富文本，false为Markdown
    let title=$(".input-title").val();           //标题内容
    if(boolean){
        return editor.txt.html()==="<p><br></p>" || title==="";
    }
    else{
        return mEditor.getHTML()==="" || title==="";
    }
}


/*选择默认编辑器功能*/
$("#defaultEditor").click(function () {
    if($.cookie("defaultEditor")==="mEditor") {
        layer.open({
            type: 1,
            title: '默认编辑器选择',
            skin: 'layui-layer-rim', //加上边框
            area: ['420px', '200px'], //宽高
            btn: ['确认','取消'],
            yes: function(index) {
                modifyCookie();
                layer.close(index);
            },
            content: `<div id="chooseEditor">
        <h4>请选择默认编辑器：</h4>
        <input type="radio" name="faultEditor" value="editor">富文本编辑器
        &nbsp;&nbsp;
        <input type="radio" name="faultEditor" value="mEditor" checked>Markdown编辑器
        </div>`
        });
    }
    else {
        layer.open({
            type: 1,
            title: '默认编辑器选择',
            skin: 'layui-layer-rim', //加上边框
            area: ['420px', '200px'], //宽高
            btn: ['确认','取消'],
            yes: function(index) {
                modifyCookie();
                layer.close(index);
            },
            content: `<div id="chooseEditor">
        <h4>请选择默认编辑器：</h4>
        <input type="radio" name="faultEditor" value="editor" checked>富文本编辑器
        &nbsp;&nbsp;
        <input type="radio" name="faultEditor" value="mEditor">Markdown编辑器
         </div>`
        });
    }
});


/*修改cookie*/
function modifyCookie() {
    $.cookie('defaultEditor', $("input[name='faultEditor']:checked").val(), { expires: 30 });
}


/*头条文章设置*/
$("#set-headline").click(function () {
    layer.alert('额外功能，正在开发中！', {
        title: '抱歉',
        icon: 5,
    })
});


/*管理员账户设置*/
$("#admin-account").click(function () {
    layer.alert('对不起，你没有操作权限！', {
        title: '警告',
        icon: 5,
    })
});


/*Ajax动态加载新闻和博客列表*/
$("#modify-news").click(function () {
    /*获取新闻总条数*/
    $.get('/all_news_count', function (count) {
        createListPage("新闻", "news", count[0].all_news_count, 1);
    });
});
$("#modify-blog").click(function () {
    /*获取博客总条数*/
    $.get('/all_blog_count', function (count) {
        createListPage("博客", "blog", count[0].all_blogs_count, 1);
    });
});


/*创建列表页并为两个小按钮绑定事件*/
function createListPage(type, name, total, current) {    //类型：新闻/博客，name:news/blog, 总条数，当前页
    /*创建头部的信息*/
    $("article").html(`<div id="manage-title">
    <i class="fa fa-info-circle" aria-hidden="true">&nbsp;</i>
    共有<span id="total"></span>条<span id="category"></span>，当前是第<span id="current-page"></span>页
</div>`);
    $("#total").html(total);
    $("#category").html(type);
    $("#current-page").html(current);

    /*创建每一个列表的信息*/
    $.get(`/all_${name}?page=${current}`, function (data) {
        $("article").append("<ul id='content'></ul>");
        for(let i=0;i<data.length;i++){
            let item=data[i];
            let div=$("<div></div>");
            div.load("list.html",function () {
                $("#content").append(div);
                let preview=$(".preview").eq(i);
                let listDate=preview.find(".date");
                listDate.find(".year").html(item[name+"_time"].slice(0, 4));
                listDate.find("i").html(item[name+"_time"].slice(5, 7));
                let article=preview.find(".article");
                article.find(".detail-time").html(item[name+"_time"]);
                article.find(".article-title").html(item[name+"_title"]);
                article.find(".article-words").html(item[name+"_content"]);
                article.click(function () {
                    createDetailPage(item, name, type);
                });

                /*为修改删除按钮绑定点击事件*/
                article.find(".delete-btn").click(function (event) {
                    event.stopPropagation();
                    deleteBtnEvent(item, name);
                });
                article.find(".modify-btn").click(function (event) {
                    event.stopPropagation();
                    modifyBtnEvent(item, type, name);
                });

                let img=item[name+"_content"].match(/<img[^>]+>/);    //找到正文部分第一个图片，并展示在列表页
                if(img){
                    preview.find(".img").html(img);
                }
                else{
                    preview.find(".img").html("<img src='../Images/占位符.jpg'>");
                }
            });
        }

        /*创建底部分页按钮*/
        createPagingBtn(type, name, total, current);
    });
}


/*加载详情页,并为按钮绑定事件*/
function createDetailPage(articleData, name, type) {
    let div=$("<div></div>");
    div.load("article_detail.html", function () {
        $("article").html(div);
        $("#detail-title").html(articleData[name+"_title"]);
        $("#detail-time").find("span").html(articleData[name+"_time"]);
        $("#detail-article").html(articleData[name+"_content"]);
        $("#detail-delete-btn").click(function () {   //删除按钮绑定事件
           deleteBtnEvent(articleData, name);
        });

        $("#detail-modify-btn").click(function () {   //修改按钮绑定事件
            modifyBtnEvent(articleData, type, name);
        });
    });
}


/*列表页与详情页的删除按钮事件*/
function deleteBtnEvent(data, name) {
    layer.confirm('删除后内容不可恢复，是否确定删除？', {
        icon: 0,
        title: '提示',
        btn: ['确定','取消'] //按钮
    }, function(index){
        layer.close(index);
        $.ajax({
            url: '/delete',
            type: 'DELETE',
            data: {"delId": data.id, "delType": name},
            success: function () {
                $("#modify-"+name).trigger("click");
            }
        });
    });
}

/*列表页与详情页的修改按钮事件*/
function modifyBtnEvent(data, type, name) {
    editorArea(type, data);
    let modifyId=data.id;
    let submitBtn=$("article").find(".submit");
    submitBtn.unbind();
    submitBtn.click(function () {
        if (isEmpty(editor, mEditor, whichEditor())) {                //如果编辑器内容和标题都为空
            layer.alert('请键入完整内容后再提交', {
                title: '提示',
                icon: 0,
            });
        }
        else {
            let myDate = new Date(), time;
            let month = myDate.getMonth() + 1, date = myDate.getDate(), hours = myDate.getHours(),
                minutes = myDate.getMinutes();
            time = myDate.getFullYear().toString() + "-" + addZero(month) + "-" + addZero(date) + " " + addZero(hours) + ":" + addZero(minutes);
            let title = $(".input-title").val();
            let isHeadline = $("input[name='isHeadline']:checked").val();

            /*提交修改后的数据*/
            sendModifiedContent(title, getEditorValue(), time, isHeadline, type, modifyId);
        }
    });
}


/*向服务器发送修改文本*/
function sendModifiedContent(title, content, time, isHeadline, type, modifyId) {     //modifyId为要修改文章的id
    let name;
    if(type==="新闻"){
        name="news";
    }
    else if(type==="博客"){
        name="blog";
    }
    $.ajax({
        type: "PUT",
        url: "/edit_"+name,
        data: {
            "title": title,
            "content": content,
            "time": time,
            "isHeadline": isHeadline,
            "modifyId": modifyId
        },
        success:
            function(responseText, textStatus) {
                if (textStatus) {
                    layer.alert('提交成功！', {
                        icon: 1,
                        title: '提交结果'
                    }, function (index) {
                        layer.close(index);
                        $("#modify-"+name).trigger("click");
                    });
                }
            }
    });
}


/*创建底部的分页按钮*/
function createPagingBtn(type, name, total, current) {   //类型：新闻/博客，name:news/blog, 总条数，当前页
    let pageNum=Math.ceil(total/8);      //pageNum为总页数
    $("article").append(`<ul id="pages">
    <li class="page">首页</li>
    <li class="page"><</li>
    <li class="page">></li>
    <li class="page">尾页</li>
    &nbsp;第<input type="number" min="1" max="${pageNum}">页&nbsp;
    <button type="button" id="go">Go!</button></ul>`
    );

    $("#go").click(function () {       //为跳转按钮添加事件         !诡异问题：直接跳转到的页面这一页的按钮无法变灰（不能点击）
       let num=$("input[type=number]").val();
        if(num>=1 && num<=pageNum){
           createListPage(type, name, total, num);
       }
       else{
           layer.alert('输入的页数不存在！',{
               title: '警告',
               icon: 0
           });
       }
    });

    let pages=$("#pages");
    if(current>1){
        pages.children("li:first-child").click(function () {   //为“首页”按钮绑定点击事件
            createListPage(type, name, total, 1);
        });
        pages.children("li").eq(1).click(function () {         //“上一页”按钮点击事件
            createListPage(type, name, total, current-1);
        });
    }
   else{                                                       //已在第一页则禁用点击事件
        pages.children("li:first-child").css({"cursor": "not-allowed", "color": "#999", "background-color": "#fff"});
        pages.children("li").eq(1).css({"cursor": "not-allowed", "color": "#999", "background-color": "#fff"});
    }

    for(let j=0;j<pageNum;j++){                          //循环遍历为每个数字按钮绑定事件
        if(j+1===current){                      //如果为当前页，则绑定点击事件
            pages.children("li").eq(j+1).after(`<li class="page">${j+1}</li>`);

            /*用CSS禁用当前页的鼠标点击事件和出现禁用样式*/
            pages.children().eq(current+1).css({"cursor": "not-allowed", "color": "#999", "background-color": "#fff"});
        }
        else{
            pages.children("li").eq(j+1).after(`<li class="page">${j+1}</li>`);
            pages.children("li").eq(j+2).click(function () {
                /*为分页按钮绑定点击事件，每次点击都向服务器发送请求来获取一页的数据*/
                createListPage(type, name, total, j+1);
            });
        }
    }

    if(current===pageNum){                                      //如果在最后一页
        pages.children("li").eq(pageNum+3).css({"cursor": "not-allowed", "color": "#999", "background-color": "#fff"});     //“尾页”按钮禁用
        pages.children("li").eq(pageNum+2).css({"cursor": "not-allowed", "color": "#999", "background-color": "#fff"});     //“下一页”按钮禁用
    }
    else{
        pages.children("li").eq(pageNum+3).click(function () {     //“尾页”按钮，注意前面的元素已插入完
            createListPage(type, name, total, pageNum);
        });
        pages.children("li").eq(pageNum+2).click(function () {     //“下一页”按钮，注意前面的元素已插入完
            createListPage(type, name, total, current+1);
        });
    }

}


/*搜索功能*/
$("#search").keydown(function () {
    if(event.keyCode===13){
        let type=$("#search-select").find("option:selected").val();
        let keywords=$("#search").val();
        $.get(`/search_${type}?keywords=${keywords}`, function (data) {
            if(type==="news"){
                displaySearchResult(data, "新闻", type, keywords);
            }
            else if(type==="blog"){
                displaySearchResult(data, "博客", type, keywords);
            }
        });
    }
});


/*创建搜索结果页*/
function displaySearchResult(data, type, name, keywords) {            //type：新闻/博客，name:news/blog
    /*创建头部的信息*/
    $("article").html(`<div id="manage-title">
    <i class="fa fa-info-circle" aria-hidden="true">&nbsp;</i>
    共有<span id="total"></span>条<span id="category"></span>,当前是第<span id="current-page"></span>页
    </div>`);
    $("#total").html(data.length);
    $("#category").html(type);
    $("#current-page").html(1);

    /*创建每一个列表的信息*/
    $("article").append("<ul id='content'></ul>");
    for(let i=0;i<data.length;i++){
        let item=data[i];
        let div=$("<div></div>");
        div.load("list.html",function () {
            $("#content").append(div);
            let preview=$(".preview").eq(i);
            let listDate=preview.find(".date");
            listDate.find(".year").html(item[name+"_time"].slice(0, 4));
            listDate.find("i").html(item[name+"_time"].slice(5, 7));
            let article=preview.find(".article");
            article.find(".detail-time").html(item[name+"_time"]);
            article.find(".article-title").html(markKeywords(keywords, item[name+"_title"]));
            article.find(".article-words").html(markKeywords(keywords, item[name+"_content"]));
            article.click(function () {
                createDetailPage(item, name, type);
            });

            /*为修改删除按钮绑定点击事件*/
            article.find(".delete-btn").click(function (event) {
                event.stopPropagation();
                deleteBtnEvent(item, name);
            });
            article.find(".modify-btn").click(function (event) {
                event.stopPropagation();
                modifyBtnEvent(item, type, name);
            });

            let img=item[name+"_content"].match(/<img[^>]/);    //找到正文部分第一个图片，并展示在列表页
            preview.find(".img").html(img);
        });
    }
}


/*高亮搜索关键词*/
function markKeywords(keywords, content) {
    return content.replace(keywords, "<mark>"+keywords+"</mark>");
}