$(document).ready(function(){
    // 轮播图区域
    $.get('/news_list',(headlineNews)=>{
        let firstText = $('#top-news-firstText');
        $('#firstImg').find('img').attr('src',`${headlineNews[0].news_image}`);
        $('#secondImg').find('img').attr('src',`${headlineNews[1].news_image}`);
        $('#thirdImg').find('img').attr('src',`${headlineNews[2].news_image}`);
        firstText.find('span').html(headlineNews[0].news_title);
        firstText.find('p').html(headlineNews[0].news_content);
    });
});