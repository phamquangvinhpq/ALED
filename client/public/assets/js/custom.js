(function ($) {

	"use strict";

	$(document).ready(function() {

		$("#Youtube").on('click',function(){
	    	$('#html5_url').hide();
	    	$('#pdf_url').hide();
			$('#youtube_url').show();
	  	});

	  	$("#HTML5").on('click',function(){
	    	$('#youtube_url').hide();
	    	$('#pdf_url').hide();
			$('#html5_url').show();
	  	});

	  	$("#Pdf").on('click',function(){
	    	$('#youtube_url').hide();
	    	$('#html5_url').hide();
			$('#pdf_url').show();
	  	});

	    $('.select2').select2();

	    $('[data-toggle="tooltip"]').tooltip();

	    $('#status').fadeOut();
			$('#preloader').delay(350).fadeOut('slow');
			$('body').delay(350).css({
			'overflow': 'visible'
		});

		$('#only-one [data-accordion]').accordion();

        $('#multiple [data-accordion]').accordion({
        	singleOpen: false
        });

        $('#single[data-accordion]').accordion({
          	transitionEasing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
          	transitionSpeed: 200
        });

	});



	$('.slide-carousel').owlCarousel({
		loop: true,
		autoplay: true,
		autoplayHoverPause: true,
		autoplaySpeed: 1500,
		smartSpeed: 1500,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		margin: 0,
		dots: true,
		nav: true,
		navText: ["<i class='fa fa-caret-left'></i>", "<i class='fa fa-caret-right'></i>"],
		responsive: {
			0: {
				items: 1,
				nav: false
			},
			576: {
				items: 1
			},
			1000: {
				items: 1
			}
		}
	});

	$('.slide-carousel').on('translate.owl.carousel', function () {
		$('.text-animated h1').removeClass('fadeInDown animated').hide();
		$('.text-animated p').removeClass('fadeInUp animated').hide();
		$('.text-animated .button').removeClass('fadeInUp animated').hide();
	});

	$('.slide-carousel').on('translated.owl.carousel', function () {
		$('.text-animated h1').addClass('fadeInDown animated').show();
		$('.text-animated p').addClass('fadeInUp animated').show();
		$('.text-animated .button').addClass('fadeInUp animated').show();
	});

	$('.home-product-item-carousel').owlCarousel({
		loop: false,
		autoplay: true,
		autoplayHoverPause: true,
		margin: 15,
		dots: true,
		nav: false,
		touchDrag: false,
     	mouseDrag: false,
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		responsive: {
			0: {
				items: 1,
				dots: false,
				nav: true
			},
			460: {
				items: 2,
				dots: false,
				nav: true
			},
			768: {
				items: 3
			},
			992: {
				items: 4
			},
			1200: {
				items: 4
			}
		}
	});


	$('.testimonial-carousel').owlCarousel({
        loop: true,
		autoplay: true,
		autoplayHoverPause: true,
		margin: 15,
		dots: true,
		nav: false,
		touchDrag: false,
     	mouseDrag: false,
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });


	$(window).on('scroll',function(){
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });
    
    $('.scrollup').on("click",function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });

    
    $('#priceData').hide();
	$('#priceData2').hide();

	$('#priceType').on('change',function() {
	    if ( $('#priceType').val() == 'Paid' ) {
	       	$('#priceData').show();
	       	$('#priceData2').show();
	    } else if ( $('#priceType').val() == 'Free' ) {
	       	$('#priceData').hide();
	       	$('#priceData2').hide();
	    }
	});


	$('#youtubeBox').hide();
	$('#vimeoBox').hide();
	$('#mp4Box').hide();
	$('#pdfBox').hide();
	$('#durationBox').hide();

	$('#lessonTypeSelect').on('change',function() {
		if ( $('#lessonTypeSelect').val() == '' ) {
			$('#youtubeBox').hide();
			$('#vimeoBox').hide();
			$('#mp4Box').hide();
			$('#pdfBox').hide();
			$('#durationBox').hide();
		} else if ( $('#lessonTypeSelect').val() == 'video_youtube' ) {
			$('#youtubeBox').show();
			$('#vimeoBox').hide();
			$('#mp4Box').hide();
			$('#pdfBox').hide();
			$('#durationBox').show();
		} else if ( $('#lessonTypeSelect').val() == 'video_vimeo' ) {
			$('#youtubeBox').hide();
			$('#vimeoBox').show();
			$('#mp4Box').hide();
			$('#pdfBox').hide();
			$('#durationBox').show();
		} else if ( $('#lessonTypeSelect').val() == 'video_mp4' ) {
			$('#youtubeBox').hide();
			$('#vimeoBox').hide();
			$('#mp4Box').show();
			$('#pdfBox').hide();
			$('#durationBox').show();
		} else if ( $('#lessonTypeSelect').val() == 'pdf' ) {
			$('#youtubeBox').hide();
			$('#vimeoBox').hide();
			$('#mp4Box').hide();
			$('#pdfBox').show();
			$('#durationBox').hide();
		}
	});


	$('#fyoutubeBox').hide();
	$('#fvimeoBox').hide();
	$('#fmp4Box').hide();
	$('#featuredVideoType').on('change',function() {
		if ( $('#featuredVideoType').val() == '' ) {
			$('#fyoutubeBox').hide();
			$('#fvimeoBox').hide();
			$('#fmp4Box').hide();
		} else if ( $('#featuredVideoType').val() == 'f_video_youtube' ) {
			$('#fyoutubeBox').show();
			$('#fvimeoBox').hide();
			$('#fmp4Box').hide();
		} else if ( $('#featuredVideoType').val() == 'f_video_vimeo' ) {
			$('#fyoutubeBox').hide();
			$('#fvimeoBox').show();
			$('#fmp4Box').hide();
		} else if ( $('#featuredVideoType').val() == 'f_video_mp4' ) {
			$('#fyoutubeBox').hide();
			$('#fvimeoBox').hide();
			$('#fmp4Box').show();
		}
	});

})(jQuery);


function confirm_delete()
{
	return confirm("Are you sure?");
}