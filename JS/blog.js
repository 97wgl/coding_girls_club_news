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
