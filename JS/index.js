$(document).ready(function(){
    
    newsListInfo();
    let count = 0;
    $.ajax({
        type:'GET',
        url:'/all_news_count',
        async:false,
        success:function (data) {
            count = data[0].all_news_count;
        }
    });

    let page = parseInt((count+4)/4);
    displaynews(1);
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
            alert('fdhsjfd')
          displaynews(current);
        }
    });
    //分页
    $('#searchSubmit').click(()=>{
        $('#simplecontent').html('');
        $('#pagination').html('');
        let SearchNews = $('#searchText').val();
        $.get(`/search_news?keywords=${SearchNews}`,(afterSearchNews)=>{
            let count = afterSearchNews.length;
            page = parseInt((count+4)/4);
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
                    alert(current);
                    $('#simplecontent').html('');
                    let end = 0;
                    let start = (current-1)*4-1;
                    if(current==page){
                        end = afterSearchNews.length;
                    } else{
                        end = current*4
                    }
                    for(i=start;i<end;i++){
                        let li = $('<li></li>');
                        let img = $('<img>');
                        let h3 = $('<h3></h3>');
                        let p = $('<p></p>');
                        let a = $('<a></a>');
                        img.attr('src',`${afterSearchNews[i].news_image}`);
                        a.attr('href',`http://localhost:3000/HTML/detail.html?id=${afterSearchNews[i].id}`);
                        h3.html(`${afterSearchNews[i].news_title}`);
                        p.html(`${afterSearchNews[i].news_content}`);
                        li.append(img);
                        li.append(h3);
                        li.append(p);
                        a.append(li);
                        $('#simplecontent').append(a);
                    }
                }
            });
        });
    })
});



$().ready(()=>{
    $('#searchForm').on('submit',(event)=>{
        event.preventDefault();
    })
});

// 轮播图以及旁边新闻列表
function newsListInfo() {
    $.get('/news_list',(headlineNews)=> {
        // 插入轮播图的图片
        $('#firstImg').find('img').attr('src', `${headlineNews[0].news_image}`);
        $('#secondImg').find('img').attr('src', `${headlineNews[1].news_image}`);
        $('#thirdImg').find('img').attr('src', `${headlineNews[2].news_image}`);

        // 轮播图旁边新闻
        for(let i = 0; i < headlineNews.length; i++) {
            let span = $('<span></span>');
            let p = $('<p></p>');
            let a = $('<a></a>');
            span.html(headlineNews[i].news_title);
            p.html(headlineNews[i].news_content);
            a.attr('href', `http://localhost:3000/HTML/detail.html?id=${headlineNews[i].id}`);
            a.append(span);
            a.append(p);
            let idArr = ['#top-news-firstText','#top-news-secondText','#top-news-thirdText'];
            $(idArr[i]).append(a);
        }
    });
}


// 主要的新闻部分
function displaynews(index) {
    $('#simplecontent').html('');
    $.get(`/all_news_pading?page=${index}`,(nesws)=>{
        for(i=0;i<nesws.length;i++){
            let li = $('<li></li>');
            let img = $('<img>');
            let h3 = $('<h3></h3>');
            let p = $('<p></p>');
            let a = $('<a></a>');
            img.attr('src',`${nesws[i].news_image}`);
            a.attr('href',`http://localhost:3000/HTML/detail.html?id=${nesws[i].id}`);
            h3.html(`${nesws[i].news_title}`);
            p.html(`${nesws[i].news_content}`);
            li.append(img);
            li.append(h3);
            li.append(p);
            a.append(li);
            $('#simplecontent').append(a);
        }
    })
}
