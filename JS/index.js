//*******************邓雍*************************
$(document).ready(function(){
    newsListInfo();
    let count = 0;
   $.ajax({
       type:'GET',
       url:'/all_news_count',
       async:false,
       success:function (data) {
           count = data[0].all_news_count;
           let page = parseInt((count+4)/4);
           displaynews(1);
           $(function() {
               $("#pagination").pagination({
                   currentPage: 1,
                   totalPage: page,
                   isShow: true,
                   count: 7,
                   homePageText: "首页",
                   endPageText: "尾页",
                   prevPageText: "上一页",
                   nextPageText: "下一页",
                   callback: function(current) {
                       displaynews(current);
                       $(window).scrollTop(600);
                   }
               });
           });
       }
   });
});

 //搜索按钮事件
$('#searchIcon').click(()=>{
        $('#pagination').html('');
        $('#simplecontent').html('');
        $.get(`/search_news?keywords=${$('#searchText').val()}`,(news)=>{
            for(i=0;i<news.length;i++){
                let li = $('<li></li>');
                let h3 = $('<h3></h3>');
                let p = $('<p></p>');
                let a = $('<a></a>');
                let img = news[i].news_content.match(/<img[^>]+>/);
                a.attr('href',`/HTML/detail.html?id=${news[i].id}`);
                h3.html(`${news[i].news_title}`);
                p.html(`${news[i].news_content}`);
                li.append(img);
                li.append(h3);
                li.append(p);
                a.append(li);
                $('#simplecontent').append(a);
            }
            $(window).scrollTop(600);
        })
    });
// 轮播图以及旁边新闻列表
function newsListInfo() {
    $.get('/news_list',(headlineNews)=> {
        // 插入轮播图的图片
        let img1 = headlineNews[0].news_content.match(/<img[^>]+>/);
        let img2 = headlineNews[1].news_content.match(/<img[^>]+>/);
        let img3 = headlineNews[2].news_content.match(/<img[^>]+>/);
        $('#firstImg').prepend(img1);
        $('#secondImg').prepend(img2);
        $('#thirdImg').prepend(img3);

        // 轮播图旁边新闻
        for(let i = 0; i < headlineNews.length; i++) {
            let span = $('<span></span>');
            let a = $('<a></a>');
            let div = $('<div class="simplenews"></div>');
            span.html(headlineNews[i].news_title);
            div.append(headlineNews[i].news_content);
            div.find("img").attr("display", "none");
            a.attr('href', `/HTML/detail.html?id=${headlineNews[i].id}`);
            a.append(span);
            a.append(div);
            let idArr = ['#top-news-firstText','#top-news-secondText','#top-news-thirdText'];
            $(idArr[i]).append(a);
        }
    });
}
// 主要的新闻部分 dy不要改
function displaynews(index) {
    $('#simplecontent').html('');
    $.get(`/all_news_pading?page=${index}`,(news)=>{
        for(i=0;i<news.length;i++){
            let li = $('<li></li>');
            let h3 = $('<h3></h3>');
            let p = $('<p></p>');
            let a = $('<a></a>');
            let span = $('<span></span>');
            let img = news[i].news_content.match(/<img[^>]+>/);
            a.attr('href',`/HTML/detail.html?id=${news[i].id}`);
            h3.html(`${news[i].news_title}`);
            p.html(`${news[i].news_content}`);
            span.html(`${news[i].news_time}`);
            li.append(img);
            li.append(h3);
            li.append(p);
            li.append(span);
            a.append(li);
            $('#simplecontent').append(a);
        }
    })
}
//*******************邓雍*************************

// ***********************俊俊******************************
function displaySearch(news) {
    $('#pagination').html('');
    $('#simplecontent').html('');
    for (let i = 0; i < news.length; i++) {
        let li = $('<li></li>');
        let h3 = $('<h3></h3>');
        let p = $('<p></p>');
        let a = $('<a></a>');
        let span = $('<span></span>');
        let img = news[i].news_content.match(/<img[^>]+>/);
        a.attr('href', `/HTML/detail.html?id=${news[i].id}`);
        h3.html(`${news[i].news_title}`);
        p.html(`${news[i].news_content}`);
        span.html(`${news[i].news_time}`);
        li.append(img);
        li.append(h3);
        li.append(p);
        li.append(span);
        a.append(li);
        $('#simplecontent').append(a);

    }
}
$("#201701").click(function () {
    let id="2017-01";
    $.get(`/time_search?searchDate=${id}`,function (res) {
        displaySearch(res);
    });
    document.getElementById('pagination').totalPage=6;
});
$("#201702").click(function () {
    let id="2017-02";
    $.get(`/time_search?searchDate=${id}`,function (res) {
        displaySearch(res);
    });
});
$("#201703").click(function () {
    let id="2017-03";
    $.get(`/time_search?searchDate=${id}`,function (res) {
        displaySearch(res);
    });
});
$("#201704").click(function () {
    let id="2017-04";
    $.get(`/time_search?searchDate=${id}`,function (res) {
        displaySearch(res);
    });
});
$("#201708").click(function () {
    let id="2017-08";
    $.get(`/time_search?searchDate=${id}`,function (res) {
        displaySearch(res);
    });

});
$("#201709").click(function () {
    let id="2017-09";
    $.get(`/time_search?searchDate=${id}`,function (res) {
        displaySearch(res);
    });

});
// ***********************俊俊******************************
