$(window).scroll(function() {
    var scrollDistance = $(window).scrollTop() + 100;

    // Show/hide menu on scroll
    //if (scrollDistance >= 850) {
    //		$('nav').fadeIn("fast");
    //} else {
    //		$('nav').fadeOut("fast");
    //}

    // Assign active class to nav links while scolling
    $('.page-section').each(function(i) {
            if ($(this).position().top <= scrollDistance) {
                    $('.navbar a.active').removeClass('active');
                    $('.navbar a').eq(i).addClass('active');
            }
    });
}).scroll();
