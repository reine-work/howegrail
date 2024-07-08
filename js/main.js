// $(window).scroll(function () {
//     if ($(this).scrollTop()) {
//         $('#top').fadeIn();
//     } else {
//         $('#top').fadeOut();
//     }
// });

// $(window).scroll(function () {
//     if ($(this).scrollTop() > 10) {
//         $('#top').fadeIn();
//     } else {
//         $('#top').fadeOut();
//     }
// });
// $('#top').click(function () {
//     $('html, body').animate({
//         scrollTop: 0
//     }, 0);
//     return false;
// });

$(document).ready(function() {
    $("#toggle-nav").click(function() {
        $("#mobile-nav").toggle();
        $(".hamburger").toggleClass("is-active");
    });
});