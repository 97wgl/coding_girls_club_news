$(document).ready(function(){
    // 轮播图区域
    $.get('/news_list',(headlineNews)=>{
        $('#firstImg').find('img').attr('src',`${headlineNews[0].news_image}`);
        $('#secondImg').find('img').attr('src',`${headlineNews[1].news_image}`);
        $('#thirdImg').find('img').attr('src',`${headlineNews[2].news_image}`);
        let firstText = $('#top-news-firstText');
        firstText.find('span').html(headlineNews[0].news_title);
        firstText.find('p').html(headlineNews[0].news_content);
        let secondText = $('#top-news-secondText');
        secondText.find('span').html(headlineNews[1].news_title);
        secondText.find('p').html(headlineNews[1].news_content);
        let thirdText = $('#top-news-thirdText');
        thirdText.find('span').html(headlineNews[2].news_title);
        thirdText.find('p').html(headlineNews[2].news_content);
    });
});