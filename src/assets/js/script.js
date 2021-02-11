$(document).ready(function () {
"use strict";
$('header .btn-menu').on('click', function(){$('header .navigation-menu').addClass('active');$('header .menu-backdrop').addClass('active');});
$('header .menu-backdrop, header .navigation-menu > li .menu-item').on('click', function(){$('header .navigation-menu').removeClass('active');$('header .menu-backdrop').removeClass('active');});
$('.banner-search .form-control').on('focus', function(){$('.banner-search .search-input').addClass('has-focus');});
$('.banner-search .form-control').on('blur', function(){$('.banner-search .search-input').removeClass('has-focus');});
$('.select2').select2();
$('.select2-multiple').select2({placeholder: " - Select Category - "});
$('.select2-nosearch').select2({minimumResultsForSearch: -1});
$('.sec-dashboard .menulink-button').on('click', function(){
if($('.side-bar').hasClass('active') == false){$('.side-bar').addClass('active');$('.sidebar-overlay').fadeIn(300);}
else{$('.side-bar').removeClass('active');$('.sidebar-overlay').fadeOut(300);}
});
$('.sec-dashboard .sidebar-overlay').on('click', function(){$('.side-bar').removeClass('active');$('.sidebar-overlay').fadeOut(300);});
function moseoverRating(item){var onStar = parseInt($(item).data('value'));var parent = $(item).parents('.rating-item');for(var i = 1; i <= onStar; i++){$(parent).children('li:nth-child('+i+')').addClass('hover');}}
function moseoutRating(item){var onStar = parseInt($(item).data('value'));var parent = $(item).parents('.rating-item');for(var i = 1; i <= onStar; i++){$(parent).children('li:nth-child('+i+')').removeClass('hover');}}
});