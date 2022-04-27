/* ======= Fixed header when scrolled ======= */

$(window).bind('load', function() {
    if ($(window).scrollTop() > 0) {
        $('#header').addClass('header-scrolled');
    } else {
        $('#header').removeClass('header-scrolled');
    }
});

$(document).ready(function() {


    /* ======= Fixed header when scrolled ======= */

    $(window).bind('scroll resize', function() {
        if ($(window).scrollTop() > 0) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });

    /* ======= Scrollspy ======= */
    $('body').scrollspy({
        target: '#header',
        offset: 100
    });

    /* ======= ScrollTo ======= */
    $('a.scrollto').on('click', function(e) {

        //store hash
        var target = this.hash;

        e.preventDefault();

        $('body').scrollTo(target, 800, {
            offset: -50,
            'axis': 'y'
        });
        //Collapse mobile menu after clicking
        if ($('.navbar-collapse').hasClass('show')) {
            $('.navbar-collapse').removeClass('show');
        }

    });


});

// slider

let slideIndex = 1;
showSlides(slideIndex);
// showSlides1(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
  // showSlides1(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
  // showSlides1(slideIndex = n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");

  if (n > slides.length) {
    slideIndex = 1
  }

  if (n < 1) {
    slideIndex = slides.length
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}
