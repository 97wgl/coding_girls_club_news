
with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];

$().ready(()=>{

    let id = window.location.href.split('?')[1].split('=')[1];
    $.get(`/detail?newsid=${id}`,(newsInfo)=>{
         let news = newsInfo[0];
         $('#text_title').html(news.news_title);
         $('#paper_author').html('CodingGirlsClub');
         $('#paper_content').html(news.news_content);
         $('#time').html(news.news_time);
            window._bd_share_config = {
                common : {
                    bdText :`${news.news_title}`,
                    bdDesc :`${news.news_title}`,
                    bdUrl : `${window.location.href}`,
                    bdPic : 'http://insights.thoughtworkers.org/wp-content/uploads/2015/07/cropped-cropped-TWInsights-1.jpg'
                },
                share : [{
                    "bdSize" : 16}],
            };

    })

});

$().ready(()=>{
    "use strict";
    $.get('/all_news3',(news)=>{
        for(let i=0;i<3;i++){
            let div1 = $('<div></div>');
            let div2 = $('<div></div>');
            let a = $('<a></a>');
            let img = news[i].news_content.match(/<img[^>]+>/);
            a.attr('href',`/HTML/detail.html?id=${news[i].id}`);
            div1.attr('class','each_news');
            div2.attr('class','news_list_title');
            div2.html(`${news[i].news_title}`);
            a.append(img);
            a.append(div2);
            div1.append(a);
            $('#news_list').append(div1);
        }
    })
})



