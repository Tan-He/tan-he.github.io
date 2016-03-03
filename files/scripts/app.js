var main = function () {

    $('.nav-icon').click(function () {
        $('html, body').stop().animate({
            scrollTop: '0px'
        }, 900);
    });

    $('.dropdown-button').click(slide);
    $('.close-bar span').click(slide);
}

var slide = function () {
    $('.dropdown-button').toggleClass('active')
    $('#about').slideToggle('700');
}


$(document).ready(function () {
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        if (target == '#about' && !$('.dropdown-button').hasClass('active'))
            $('.dropdown-button').click();

        $('html, body').stop().animate({
            scrollTop: $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });

    $(window).scroll(function () {
        console.log($(window).scrollTop());
        if ($(window).scrollTop() > 452) {
            $('.navbar-inverse').addClass('solid');
        } else if ($(window).scrollTop() <= 452) {
            $('.navbar-inverse.solid').removeClass('solid');
        }
    });
});

$(document).ready(main);
