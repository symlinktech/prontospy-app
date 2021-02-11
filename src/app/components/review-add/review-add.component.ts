import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ReviewAddService } from './review-add.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../i18n/language.service';
declare var $;
@Component({
  selector: 'app-review-add',
  templateUrl: './review-add.component.html',
  styleUrls: ['./review-add.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ReviewAddComponent implements OnInit {
empathy_flexibility:any;
reliable_trustworthy:any;
communication:any;
review_to:any;
appointment_id:any;
  constructor(public reviewaddService:ReviewAddService,public router:Router,public activatedRoute:ActivatedRoute,public langService:LanguageService) { }

  	ngOnInit() {
  		this.activatedRoute.queryParams.subscribe((res)=>{
  			this.review_to=res.id
  			this.appointment_id=res.appointment_id
  		})
  		var that=this
	  	$(document).ready(function(){
	  		
	 		$('.rating-item.empathy li.star').on('click', function(){
	 			var onStar = parseInt($(this).data('value'), 10);
			      var stars = $(this).parent().children('li.star');
			      for (var i = 0; i < stars.length; i++) {
			        $(stars[i]).removeClass('hover');
			      }
			      for (var i = 0; i < onStar; i++) {
			        $(stars[i]).addClass('hover');
			      }
			   	var empathy_flexibility = parseInt($('.rating-item.empathy li.star.hover').last().data('value'), 10);
			   	that.setData(empathy_flexibility,'empathy')
		    });
		    $('.rating-item.realiable li.star').on('click', function(){
	 			var onStar = parseInt($(this).data('value'), 10);
			      var stars = $(this).parent().children('li.star');
			      for (var i = 0; i < stars.length; i++) {
			        $(stars[i]).removeClass('hover');
			      }
			      for (var i = 0; i < onStar; i++) {
			        $(stars[i]).addClass('hover');
			      }
			   	var reliable_trustworthy = parseInt($('.rating-item.realiable li.star.hover').last().data('value'), 10);
			   	that.setData(reliable_trustworthy,'reliable')
		    });
		    $('.rating-item.communication li.star').on('click', function(){
			      var onStar = parseInt($(this).data('value'), 10);
			      var stars = $(this).parent().children('li.star');
			      for (var i = 0; i < stars.length; i++) {
			        $(stars[i]).removeClass('hover');
			      }
			      for (var i = 0; i < onStar; i++) {
			        $(stars[i]).addClass('hover');
			      }
			      var communication = parseInt($('.rating-item.communication li.star.hover').last().data('value'), 10);
			      that.setData(communication,'communication')
		    });
		});
  	}

  	setData(data,type){
  		if(type=='empathy') {
  			this.empathy_flexibility=data
  		}
  		else if(type=='reliable') {
  			this.reliable_trustworthy=data
  		}
  		else{
  			this.communication=data
  		}
  	}

  	addReview(){
  		let data={
  			empathy_and_flexibility:this.empathy_flexibility,
  			reliable_and_trustworthy:this.reliable_trustworthy,
  			communication:this.communication,
  			personal_experience:$('#personal_experience').val(),
			personal_note_for_consultant:$('#personal_note_for_consultant').val(),
			comment_for_prontopsy_staff:$('#comment_for_prontopsy_staff').val(),
			user_id:this.review_to,
			review_by:localStorage.getItem('user_id'),
			appointment_id:this.appointment_id
  		}
  		this.reviewaddService.postData(data,'review/add').then((result)=>{
  			if(result['status_code']==200) {
  				var that=this
  				$.confirm({
		            title: 'Success',
		            content: result['message'],
		            buttons: {
			            Close: function () {
			                that.router.navigate([(localStorage.getItem('role')=='consultant')?'/account/consultant/appointments':'/account/client/appointments'])
			                //window.location.reload();
			            }
		        	}
			     });
  			}
  			else{
  				this.langService.apiFailureAlert(result['message'])
  			}
  		})
  	}

}
