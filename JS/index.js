$(document).ready(function(){
    // 轮播图图片动态插入
    $.get('/news_list',(headlineNews)=>{
        $('#firstImg').find('img').attr('src',`${headlineNews[0].news_image}`);
        $('#secondImg').find('img').attr('src',`${headlineNews[1].news_image}`);
        $('#thirdImg').find('img').attr('src',`${headlineNews[2].news_image}`);
    });
    // 主体新闻列表
});