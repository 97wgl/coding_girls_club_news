$(document).ready(function() {
    let count;
    $.ajax({
        type:'Get',
        url:'all_blog_count',
        async:false,
        success:function (data) {
            count = data[0].all_blogs_count;
        }
    });
});
/**
 * Created by xiongshasha on 17-8-16.
 */
$().ready(()=>{
    $.get("/latest_blog",function(res){
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
    })
});
