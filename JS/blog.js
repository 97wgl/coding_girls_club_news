/**
 * Created by xiongshasha on 17-8-16.
 */
$().ready(()=>{
    $.get("/latest_blog",function(res){
        // $('#post-title1').html(res[0].blog_title);
        // $('#post-title2').html(res[0].blog_title);
        // $('#post-title3').html(res[0].blog_title);
        // $('#post-title4').html(res[0].blog_title);
        // $('#post-title5').html(res[0].blog_title);
        let ul = $('#recent-post');
        let html_str ='';
        for(let i = 0;i < res.length;i ++){
            html_str+=`<li>
            <div class="recent-post-details">
                <a class="post-title" href="#" id="post-title1">${res[i].blog_title}</a><br>
                <div class="post-meta">
                <time>${res[i].blog_time}</time>
                <span href="#">  Administrator</span>
                </div>
            </div>
            </li>`;
        }
        ul.html(html_str);

    });
});
