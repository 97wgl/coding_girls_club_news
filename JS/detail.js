window._bd_share_config = {
    common : {
        bdText :'Coding Girls Club',
        bdDesc : 'Fly to sky',
        bdUrl : `${window.location.href}`,
        bdPic : 'http://insights.thoughtworkers.org/wp-content/uploads/2015/07/cropped-cropped-TWInsights-1.jpg'
    },
    share : [{
        "bdSize" : 16}],
};
with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];

$().ready(()=>{
    let id = window.location.href.split('?')[1].split('=')[1]
    $.get(`/detail?newsid=${id}`,(newsInfo)=>{
         let news = newsInfo[0];
         $('#paper_title').find("h1").html(news.news_title);
         $('#paper_author').find('p').html(news.news_time);
         $('#paper_content').find('p').html(news.news_content);
         $('#paper_image').find('img').attr('src',`${news.news_image}`)
    })
});



