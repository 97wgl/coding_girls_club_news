$(document).ready(function(){
    // 轮播图区域
    $.get('/news_list',(headlineNews)=>{
        $('#firstImg').find('img').attr('src',`${headlineNews[0].news_image}`);
        $('#secondImg').find('img').attr('src',`${headlineNews[1].news_image}`);
        $('#thirdImg').find('img').attr('src',`${headlineNews[2].news_image}`);
        $('#top-news-firstText').find('span').html(headlineNews[0].news_title);
    });

    let count = 0;
    $.get('/all_news_count',(result)=>{
        count = result[0].all_news_count;
        alert(count);
        console.log(count)
    });

    $(function() {
        $("#pagination").pagination({
            currentPage: 1,
            totalPage: 16,
            isShow: true,
            count: 7,
            homePageText: "首页",
            endPageText: "尾页",
            prevPageText: "上一页",
            nextPageText: "下一页",
            callback: function(current) {
                displaynews(current);
                alert(current);
            }
        });
    });
});

function displaynews(index) {
  $.get(`/all_news?page=${index}`,(nesws)=>{
        alert(nesws);
    })
}
