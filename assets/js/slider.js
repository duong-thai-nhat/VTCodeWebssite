$(document).ready(function () {
    var $slider = $(".slider"),
      $slideBGs = $(".slide__bg"),
      diff = 0,
      curSlide = 0,
      numOfSlides = $(".slide").length - 1,
      animating = false,
      animTime = 500,
      autoSlideTimeout,
      autoSlideDelay = 6000,
      $pagination = $(".slider-pagi");
  
    function createBullets() {
      for (var i = 0; i < numOfSlides + 1; i++) {
        var $li = $("<li class='slider-pagi__elem'></li>");
        $li.addClass("slider-pagi__elem-" + i).data("page", i);
        if (!i) $li.addClass("active");
        $pagination.append($li);
      }
    }
  
    createBullets();
  
    // let $carousel = $('.carousel').flickity({
    //   autoPlay: 2000, wrapAround: true, prevNextButtons: false, pauseAutoPlayOnHover: false,
    // })
  
    // $(".carousel-cell").on('click', function(){
    //   $carousel.flickity('playPlayer');
    // })
  
    function manageControls() {
      $(".slider-control").removeClass("inactive");
      if (!curSlide) $(".slider-control.left").addClass("inactive");
      if (curSlide === numOfSlides)
        $(".slider-control.right").addClass("inactive");
    }
  
    function autoSlide() {
      autoSlideTimeout = setTimeout(function () {
        curSlide++;
        if (curSlide > numOfSlides) curSlide = 0;
        changeSlides();
      }, autoSlideDelay);
    }
  
    autoSlide();
  
    function changeSlides(instant) {
      if (!instant) {
        animating = true;
        manageControls();
        $slider.addClass("animating");
        $slider.css("top");
        $(".slide").removeClass("active");
        $(".slide-" + curSlide).addClass("active");
        setTimeout(function () {
          $slider.removeClass("animating");
          animating = false;
        }, animTime);
      }
      window.clearTimeout(autoSlideTimeout);
      $(".slider-pagi__elem").removeClass("active");
      $(".slider-pagi__elem-" + curSlide).addClass("active");
      $slider.css("transform", "translate3d(" + -curSlide * 100 + "%,0,0)");
      $slideBGs.css("transform", "translate3d(" + curSlide * 50 + "%,0,0)");
      diff = 0;
      autoSlide();
    }
  
    function navigateLeft() {
      if (animating) return;
      if (curSlide > 0) curSlide--;
      changeSlides();
    }
  
    function navigateRight() {
      if (animating) return;
      if (curSlide < numOfSlides) curSlide++;
      changeSlides();
    }
  
    $(document).on("mousedown touchstart", ".slider", function (e) {
      if (animating) return;
      window.clearTimeout(autoSlideTimeout);
      var startX = e.pageX || e.originalEvent.touches[0].pageX,
        winW = $(window).width();
      diff = 0;
  
      $(document).on("mousemove touchmove", function (e) {
        var x = e.pageX || e.originalEvent.touches[0].pageX;
        diff = ((startX - x) / winW) * 70;
        if ((!curSlide && diff < 0) || (curSlide === numOfSlides && diff > 0))
          diff /= 2;
        $slider.css(
          "transform",
          "translate3d(" + (-curSlide * 100 - diff) + "%,0,0)"
        );
        $slideBGs.css(
          "transform",
          "translate3d(" + (curSlide * 50 + diff / 2) + "%,0,0)"
        );
      });
    });
  
    $(document).on("mouseup touchend", function (e) {
      $(document).off("mousemove touchmove");
      if (animating) return;
      if (!diff) {
        changeSlides(true);
        return;
      }
      if (diff > -8 && diff < 8) {
        changeSlides();
        return;
      }
      if (diff <= -8) {
        navigateLeft();
      }
      if (diff >= 8) {
        navigateRight();
      }
    });
  
    $(document).on("click", ".slider-control", function () {
      if ($(this).hasClass("left")) {
        navigateLeft();
      } else {
        navigateRight();
      }
    });
  
    $(document).on("click", ".slider-pagi__elem", function () {
      curSlide = $(this).data("page");
      changeSlides();
    });
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  var slider = document.getElementById('project__slider__text'),
      sliderItems = document.getElementById('project__slides__text'),
      prev = document.getElementById('prev'),
      next = document.getElementById('next');
  
  function slide(wrapper, items, prev, next) {
    var posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = items.getElementsByClassName('mySlides1'),
        slidesLength = slides.length,
        slideSize = items.getElementsByClassName('mySlides1')[0].offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        allowShift = true;
    
    // Clone first and last slide
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);
    wrapper.classList.add('loaded');
    
    // Click events
    prev.addEventListener('click', function () { shiftSlide(-1) });
    next.addEventListener('click', function () { shiftSlide(1) });
    
    // Transition events
    items.addEventListener('transitionend', checkIndex);
    
    function shiftSlide(dir, action) {
      items.classList.add('shifting');
      
      if (allowShift) {
        if (!action) { posInitial = items.offsetLeft; }
  
        if (dir == 1) {
          items.style.left = (posInitial - slideSize) + "px";
          index++;      
        } else if (dir == -1) {
          items.style.left = (posInitial + slideSize) + "px";
          index--;      
        }
      };
      
      allowShift = false;
    }
      
    function checkIndex (){
      items.classList.remove('shifting');
  
      if (index == -1) {
        items.style.left = -(slidesLength * slideSize) + "px";
        index = slidesLength - 1;
      }
  
      if (index == slidesLength) {
        items.style.left = -(1 * slideSize) + "px";
        index = 0;
      }
      
      allowShift = true;
    }
  }
  
  slide(slider, sliderItems, prev, next);