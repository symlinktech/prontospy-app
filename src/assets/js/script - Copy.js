$(document).ready(function () {
	"use strict";
	
	$('header .btn-menu').on('click', function(){
		$('header .navigation-menu').addClass('active');
		$('header .menu-backdrop').addClass('active');
	});
	
	$('header .menu-backdrop, header .navigation-menu > li .menu-item').on('click', function(){
		$('header .navigation-menu').removeClass('active');
		$('header .menu-backdrop').removeClass('active');
	});
	
	// $('.banner-slider').owlCarousel({
	// 	items:1,
 //    loop:false,
 //    rewind:true,
 //    margin:0,
	// 	autoplay:true,
 //    autoplayTimeout:5000,
	// 	autoplayHoverPause:false,
	// 	lazyLoad:true,
	// 	dots:false,
	// 	nav:false,
	// 	animateOut: 'fadeOut',
 //    animateIn: 'fadeIn',
	// });
	
	$('.banner-search .form-control').on('focus', function(){
		$('.banner-search .search-input').addClass('has-focus');
	});
	$('.banner-search .form-control').on('blur', function(){
		$('.banner-search .search-input').removeClass('has-focus');
	});
	
	/* =====| Select 2 |===== */
	$('.select2').select2();
	$('.select2-multiple').select2({placeholder: " - Select Category - "});
	$('.select2-nosearch').select2({minimumResultsForSearch: -1});
	
	
	
	$('.sec-dashboard .menulink-button').on('click', function(){
		if($('.side-bar').hasClass('active') == false){
			$('.side-bar').addClass('active');
			$('.sidebar-overlay').fadeIn(300);
		}else{
			$('.side-bar').removeClass('active');
			$('.sidebar-overlay').fadeOut(300);
		}
	});
	
	$('.sec-dashboard .sidebar-overlay').on('click', function(){
		$('.side-bar').removeClass('active');
		$('.sidebar-overlay').fadeOut(300);
	});
	
	
	
	// $(".testimonial-slider").owlCarousel({
	// 	items:3,
	// 	loop:true,
	// 	margin:5,
	// 	dots:true,
	// 	nav:true,
	// 	center:false,
	// 	rewind:1,
	// 	autoplay:false,
	// 	responsive:{0:{items:1},550:{items:2},768:{items:2},1000:{items:3}}
	// });
	
	// $('#sideMenuTrigger').on('click', function(){
	// 	$("#modSideMenu").animate({
	// 		width: 'toggle'
	// 	});
	// });
	
	// $('.custom-accrodion-btn').on('click', function(){
	// 	$(this).parent().next().slideToggle();
	// 	$(this).parent().parent().siblings().find('.accrodion-item-body').slideUp();
	// 	$(this).parent().parent().toggleClass('show');
	// 	$(this).parent().parent().siblings().removeClass('show');
	// });

	function moseoverRating(item){
	    var onStar = parseInt($(item).data('value'));
	    var parent = $(item).parents('.rating-item');
	    //alert(onStar);
	    for(var i = 1; i <= onStar; i++){
	      $(parent).children('li:nth-child('+i+')').addClass('hover');
	      
	    }
  	}

  	function moseoutRating(item){
	    var onStar = parseInt($(item).data('value'));
	    var parent = $(item).parents('.rating-item');
	    for(var i = 1; i <= onStar; i++){
	      $(parent).children('li:nth-child('+i+')').removeClass('hover');
	    }
  	}

	
	// $('.message-footer .btn-attachment').on('click', function(){
	// 	$('.message-file-upload').addClass('active');
	// });
	// $('.message-file-upload .file-upload-header .btn-close').on('click', function(){
	// 	$('.message-file-upload').removeClass('active');
	// });

	// $('.sec-banner .btn-search').on('click', function(){
	// 	if($('.search-container').hasClass==false){
	// 		$('.search-container').addClass('active');
	// 	}else{
	// 		$('.search-container').removeClass('active');
	// 	}
	// 	});

	// 	$('.search-container .btn-close').on('click', function(){
	// 	$('.search-container').removeClass('active');
	// });

});
