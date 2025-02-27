
!(function($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 15;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('ri-menu-line ri-close-line');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-md-none"><i class="ri-menu-line"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('ri-menu-line ri-close-line');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('ri-menu-line ri-close-line');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
/*   $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  }); */

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      900: {
        items: 2
      }
    }
  }); 

  /* Scholar dashboard
  const scholars = [
            {
                name: "Fatin Alia binti Khairuddin",
                image: "images/scholars/fatin-alia.jpg",
                course: "Actuarial Science",
                sponsor: "Yayasan Khazanah",
                services: ["Essay Proof-Reading", "Mock Interviews", "CV Preparation"],
                email: "fatinaliah@gmail.com",
                telegram: "@fritalia",
                instagram: "@fritalia",
                availability: "Free"
            },
            {
                name: "Lee Zixuan",
                image: "images/scholars/lee-zixuan.jpg",
                course: "Social Science",
                sponsor: "JPA",
                services: ["Mock Interviews"],
                email: "zixuanlee2017@gmail.com",
                telegram: "@zixuan_lee",
                instagram: "@zixuan_lee",
                availability: "Busy"
            },
            // Add more scholars as needed
        ];

        function populateScholarGrid(filteredScholars) {
            const grid = document.getElementById('scholarGrid');
            grid.innerHTML = '';

            filteredScholars.forEach(scholar => {
                const card = document.createElement('div');
                card.className = 'scholar-card';
                card.innerHTML = `
                    <img src="${scholar.image}" class="scholar-image" alt="${scholar.name}">
                    <h2 class="scholar-name">${scholar.name}</h2>
                    <div class="scholar-details">
                        <p>${scholar.course}</p>
                        <p>${scholar.sponsor}</p>
                    </div>
                    <div class="scholar-services">
                        ${scholar.services.map(service => 
                            <span class="service-tag">${service}</span>
                        ).join('')}
                    </div>
                    <div class="scholar-contact">
                        <a href="mailto:${scholar.email}" class="contact-link">
                            <i class="fas fa-envelope"></i>${scholar.email}
                        </a>
                        <a href="https://t.me/${scholar.telegram}" class="contact-link">
                            <i class="fab fa-telegram"></i>@${scholar.telegram}
                        </a>
                        <a href="https://instagram.com/${scholar.instagram}" class="contact-link">
                            <i class="fab fa-instagram"></i>@${scholar.instagram}
                        </a>
                    </div>
                    <div class="availability" style="color: ${scholar.availability === 'Free' ? 'var(--success-green)' : 'var(--accent-red)'}">
                        ${scholar.availability}
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        // Filter functionality
        document.querySelectorAll('.service-filter, #sponsorFilter, #courseFilter').forEach(element => {
            element.addEventListener('change', applyFilters);
        });

        function applyFilters() {
            const selectedServices = Array.from(document.querySelectorAll('.service-filter:checked'))
                .map(checkbox => checkbox.value);
            
            const selectedSponsor = document.getElementById('sponsorFilter').value;
            const selectedCourse = document.getElementById('courseFilter').value;

            const filtered = scholars.filter(scholar => {
                const serviceMatch = selectedServices.length === 0 || 
                    selectedServices.every(service => scholar.services.includes(service));
                
                const sponsorMatch = selectedSponsor === 'all' || 
                    scholar.sponsor.includes(selectedSponsor);
                
                const courseMatch = selectedCourse === 'all' || 
                    scholar.course === selectedCourse;

                return serviceMatch && sponsorMatch && courseMatch;
            });

            populateScholarGrid(filtered);
        }

        // Initial load
        window.onload = () => {
            populateScholarGrid(scholars);
        }; */

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.features-container').isotope({
      itemSelector: '.features-item',
      layoutMode: 'fitRows'
    });

    $('#features-flters li').on('click', function() {
      $("#features-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
    });
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

})(jQuery);
