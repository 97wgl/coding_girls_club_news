
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
                <a class="post-title" href="http://localhost:3000/HTML/detail_blogs.html?id=${res[i].id}" id="post-title1">${res[i].blog_title}</a><br>
                <div class="post-meta">
                <time>${res[i].blog_time}</time>
                <span href="#">  Administrator</span>
                </div>
            </div>
            </li>`;
        }
        ul.html(html_str);
    });
//************************邓雍**********************************
    let count;
    $.get('/all_blog_count',(data)=>{
        count = data[0].all_blogs_count;
        let page = parseInt((count+4)/4);
        displaynews(1);
        $(function() {
            $("#pagination").pagination({
                currentPage: 1,
                totalPage: page,
                isShow: true,
                count: 4,
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
    });
    $('#searchIcon').click(()=>{
        $('#pagination').html('');
        $('#simplecontent').html('');
        $.get(`/search_blog?keywords=${$('#searchText').val()}`,(blogs)=>{
            for(i=0;i<blogs.length;i++){
                let li = $('<li></li>');
                let h3 = $('<h3></h3>');
                let div = $('<div></div>');
                let a = $('<a></a>');
                let span = $('<span></span>');
                let img = blogs[i].blog_content.match(/<img[^>]+>/);
                if(!img){
                    img = "<img src='../Images/假装有图.jpg'>";
                }
                a.attr('href',`http://localhost:3000/HTML/detail_blogs.html?id=${blogs[i].id}`);
                h3.html(`${blogs[i].blog_title}`);
                div.html(`${blogs[i].blog_content}`);
                span.html(`${blogs[i].blog_time}`);
                li.append(img);
                li.append(h3);
                li.append(div);
                li.append(span);
                a.append(li);
                $('#simplecontent').append(a);
            }
            $(window).scrollTop(600);
        })
    });
//************************邓雍**********************************
});

//************************邓雍**********************************
function displaynews(index) {
    $('#simplecontent').html('');
    $.get(`/all_blogs_pading?page=${index}`,(blogs)=>{
        for(i=0;i<blogs.length;i++){
            let li = $('<li></li>');
            let h3 = $('<h3></h3>');
            let div = $('<div></div>');
            let a = $('<a></a>');
            let span = $('<span></span>');
            let img = blogs[i].blog_content.match(/<img[^>]+>/);
            if(!img){
                img = "<img src='../Images/假装有图.jpg'>";
            }
            a.attr('href',`http://localhost:3000/HTML/detail_blogs.html?id=${blogs[i].id}`);
            h3.html(`${blogs[i].blog_title}`);
            div.html(`${blogs[i].blog_content}`);
            span.html(`${blogs[i].blog_time}`);
            li.append(img);
            li.append(h3);
            li.append(div);
            li.append(span);
            a.append(li);
            $('#simplecontent').append(a);
        }
    })
}
//************************邓雍**********************************
