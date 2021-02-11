import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { ReviewsService } from './reviews.service';
import { LanguageService } from '../../i18n/language.service';

declare var $;
declare var moment;
declare var tz;
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ReviewsComponent implements OnInit {
id:any;
Reviews:any;
name='Reviews';
communication:any;
empathy_and_flexibility:any;
rating:any;
reliable_and_trustworthy:any;
  constructor(public router:Router, public reviewsService:ReviewsService, public activatedRoute:ActivatedRoute,public langService:LanguageService,public socket:Socket,public ngZone:NgZone) { }

  ngOnInit() {
    $('.preloader').fadeIn(300);
  	this.getReviews()
    this.getReviewsAverage()
  }

  getReviews(){
    let data={
      user_id:this.id
    }
    this.reviewsService.postData(data,'review/list').then((result)=>{
      if(result['status_code']==200) {
        this.Reviews=result['data'];
        if(this.Reviews.length>0) {
          for(let i=0;i<this.Reviews.length;i++){
            var splitted_name=this.Reviews[i].profile_name.split(" ")
            if(splitted_name.length==3) {
              this.Reviews[i]['first_name']=splitted_name[0]
              this.Reviews[i]['middle_name']=splitted_name[1]
              this.Reviews[i]['last_name']=this.returnFistChar(splitted_name[2])
            }
            else if(splitted_name.length==2){
              this.Reviews[i]['first_name']=splitted_name[0]
              this.Reviews[i]['last_name']=this.returnFistChar(splitted_name[1])
            }
            else{
              this.Reviews[i]['first_name']=splitted_name[0]
            }
            
          }
        }
        
      }
      else{
        this.langService.apiFailureAlert(result['message'])
      }
    })
  }
  returnFistChar(myStr){
    return myStr.match(/\b(\w)/g);
  }
  getReviewsAverage(){
      let data={
        user_id:localStorage.getItem('user_id')
      }
      this.reviewsService.postData(data,'review/average').then((result)=>{
        if(result['status_code']==200) {
          this.communication=parseFloat(result['data'].communication).toFixed(2)
          this.empathy_and_flexibility=parseFloat(result['data'].empathy_and_flexibility).toFixed(2)
          this.rating=result['data'].rating=parseFloat(result['data'].rating).toFixed(2)
          this.reliable_and_trustworthy=parseFloat(result['data'].reliable_and_trustworthy).toFixed(2)
          $('.preloader').fadeOut(300);
        }
        else{
          $('.preloader').fadeOut(300);
          this.langService.apiFailureAlert(result['message'])
        }
      })
   }
}
