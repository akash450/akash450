var count = 0;
$(document).ready(function(){
    var img = $('#image');
    $('.toggle').click(function() {
        count++;
        $('.toggle').toggleClass("active");
        $('.sharescroll').toggleClass("active");
        $('.graphscroll').toggleClass("active");
        $('#threed').toggleClass("active");
        $('body').toggleClass("night");
        $(this).find('i').toggleClass('fas fa-sun fas fa-moon');
        if (count % 2 !== 0) {
            img.attr("src", img.attr("src").replace("daylogo", "nightlogo"));
        } else {
            img.attr("src", img.attr("src").replace("nightlogo", "daylogo"));
        }
    })
})