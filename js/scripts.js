$(function() {
  "use strict";

  var wind = $(window);

  /* ----------------------------------------------------------------
                    [ Pagepiling Plugin ]
    -----------------------------------------------------------------*/

  if (matchMedia("only screen and (min-width: 991px)").matches) {
    $("#pagepiling").pagepiling({
      menu: "#menu",
      anchors: [
        "page1",
        "page2",
        "page3",
        "page4",
        "page5",
        "page6",
        "page7",
        "page8",
        "page9",
        "page10",
        "page11",
        "page12"
      ],
      loopTop: true,
      loopBottom: true
    });
  }

  /* ----------------------------------------------------------------
                    [ Navbar ( scrollIt ) ]
    -----------------------------------------------------------------*/

  if (matchMedia("only screen and (max-width: 991px)").matches) {
    $.scrollIt({
      upKey: 38, // key code to navigate to the next section
      downKey: 40, // key code to navigate to the previous section
      easing: "swing", // the easing function for animation
      scrollTime: 600, // how long (in ms) the animation takes
      activeClass: "active", // class given to the active nav element
      onPageChange: null, // function(pageIndex) that is called when page is changed
      topOffset: 0 // offste (in px) for fixed top navigation
    });
  }

  /* ----------------------------------------------------------------
                    [ Navbar Full Page ]
    -----------------------------------------------------------------*/

  $(".side-menu").on("click", ".icon-open", function() {
    $(this).toggleClass("icon-active");
    $(".nav-menu").toggleClass("menu-open");
  });

  $(".side-menu").on("click", ".menu-item", function() {
    $(".nav-menu").removeClass("menu-open");
  });

  $("#menu").on("click", "li", function() {
    $(".nav-menu").removeClass("menu-open");
  });

  /* ----------------------------------------------------------------
                    [ Sections Background Image With Data ]
    -----------------------------------------------------------------*/

  var pageSection = $(".bg-img, section");
  pageSection.each(function(indx) {
    if ($(this).attr("data-background")) {
      $(this).css(
        "background-image",
        "url(" + $(this).data("background") + ")"
      );
    }
  });

  /* ----------------------------------------------------------------
                    [ Carousel Plugines ]
    -----------------------------------------------------------------*/

  $(".services .slick").slick({
    centerPadding: "5px",
    centerMode: true,
    slidesToShow: 3,
    vertical: true,
    prevArrow: $(".services .prev"),
    nextArrow: $(".services .next")
  });

  $(".testimonials .slick").slick({
    centerPadding: "5px",
    slidesToShow: 1,
    prevArrow: $(".testimonials .prev"),
    nextArrow: $(".testimonials .next")
  });

  // === End slick === //

  /* ----------------------------------------------------------------
                    [ magnificPopup ]
    -----------------------------------------------------------------*/

  $(".gallery").magnificPopup({
    delegate: ".popimg",
    type: "image",
    gallery: {
      enabled: true
    }
  });

  /* ----------------------------------------------------------------
                    [ Progress Bar ]
    -----------------------------------------------------------------*/

  $(".skill-progress .progres").each(function() {
    var myVal = $(this).attr("data-value");

    $(this).css({
      width: myVal
    });
  });
});

// === window When Loading === //

$(window).on("load", function() {
  var wind = $(window);

  /* ----------------------------------------------------------------
                    [ Preloader ]
    -----------------------------------------------------------------*/

  $(".loading").fadeOut(500);

  /* ----------------------------------------------------------------
                    [ stellar ( Parallax ) ]
    -----------------------------------------------------------------*/

  wind.stellar();

  /* ----------------------------------------------------------------
                    [ isotope Portfolio ( Masonery Style ) ]
    -----------------------------------------------------------------*/

  $(".gallery").isotope({
    // options
    itemSelector: ".items"
  });

  var $gallery = $(".gallery").isotope({
    // options
  });

  // filter items on button click
  $(".filtering").on("click", "span", function() {
    var filterValue = $(this).attr("data-filter");

    $gallery.isotope({ filter: filterValue });
  });

  $(".filtering").on("click", "span", function() {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });

  // contact form validator
  $("#contact-form").validator();

  $("#contact-form").on("submit", function(e) {
    if (!e.isDefaultPrevented()) {
      var url = "contact.php";

      $.ajax({
        type: "POST",
        url: url,
        data: $(this).serialize(),
        success: function(data) {
          var messageAlert = "alert-" + data.type;
          var messageText = data.message;

          var alertBox =
            '<div class="alert ' +
            messageAlert +
            ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
            messageText +
            "</div>";
          if (messageAlert && messageText) {
            $("#contact-form")
              .find(".messages")
              .html(alertBox);
            $("#contact-form")[0].reset();
          }
        }
      });
      return false;
    }
  });
});
