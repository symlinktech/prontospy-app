import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { ReviewsService } from './../reviews/reviews.service';
import { LanguageService } from '../../i18n/language.service';

declare var $;
declare var moment;
declare var tz;
@Component({
  selector: 'app-reviews',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {
id:any;
Reviews:any;
name='Reviews';
communication:any;
empathy_and_flexibility:any;
rating:any;
reliable_and_trustworthy:any;
consultantDetails={active_status: 0,description: '',image: '',lastname: '',profile_name: '',professional_qualifications: '',rating:0,review: '',long_description: '',therapeutic:'',mental:'',others:'',psycho:'',user_consultant_services:'',
appointment_id:'',stripe_account_id:'',stripe_customer_id:'',currency:'',language_names:'',country:'',wishlist_id:''};
ServiceOfferList:any;
service_name:any;
service_price:any;
service_mode:any;
TimeSlot:any;
start_time:any;
end_time:any;
instantCommuType:any;
username:any;
video_token:any;
chat_token:any;
room_name:any;
channelObj:any;
channels:any=[]
currentSid:any;
private conSub: any;
price:any;
currency:any;
modes:any;
consultant_id:any;
appointment_id:any;
timestamp:any;
email_text:any;
direct_access_mode:any;
consultant_timezone:any;
  constructor(public router:Router, public reviewsService:ReviewsService, public activatedRoute:ActivatedRoute,public langService:LanguageService,public socket:Socket,public ngZone:NgZone) { }

  ngOnInit() {
  	this.activatedRoute.queryParams.subscribe((res)=>{
  		this.id=res.id
      this.consultant_id=res.id
      this.price=res.price;
      this.currency=res.currency;
      this.modes=res.modes;
      this.getConsultantsDetails();
      this.getReviews()
      this.getReviewsAverage()
  	})
  }
getConsultantsDetails(){
    let data={
      id:(this.id)?this.id:localStorage.getItem('user_id'),
      user_id:localStorage.getItem('user_id')?localStorage.getItem('user_id'):0
    }
    this.reviewsService.postData(data,'consultant/details').then((result)=>{
      if(result['status_code']==200) {
        result['data'].rating=(result['data'].rating)?parseFloat(result['data'].rating).toFixed(2):null
        this.consultantDetails.active_status=result['data'].active_status
        this.consultantDetails.description=result['data'].description
        this.consultantDetails.image=result['data'].image
        this.consultantDetails.lastname=result['data'].lastname
        this.consultantDetails.profile_name=result['data'].profile_name
        this.consultantDetails.professional_qualifications=result['data'].professional_qualifications
        this.consultantDetails.rating=result['data'].rating
        this.consultantDetails.review=result['data'].review
        this.consultantDetails.long_description=result['data'].biography_long_description

        this.consultantDetails.mental=(result['data'].specialization_mental)?result['data'].specialization_mental.split(","):result['data'].specialization_mental

        this.consultantDetails.others=(result['data'].specialization_others)?result['data'].specialization_others.split(","):result['data'].specialization_others
        this.consultantDetails.psycho=(result['data'].specialization_psycho)?result['data'].specialization_others.split(","):result['data'].specialization_others
        this.consultantDetails.therapeutic=(result['data'].specialization_therapeutic)?result['data'].specialization_therapeutic.split(","):result['data'].specialization_therapeutic
        this.consultantDetails.user_consultant_services=(result['data'].user_consultant_services)?result['data'].user_consultant_services.split(","):result['data'].user_consultant_services
        this.consultantDetails.appointment_id=result['data'].appointment_id
        this.consultantDetails.stripe_account_id=result['data'].stripe_account_id
        this.consultantDetails.stripe_customer_id=result['data'].stripe_customer_id
        this.consultantDetails.currency=result['data'].currency
        this.consultantDetails.language_names=result['data'].language_names
        this.consultantDetails.country=result['data'].country_name
        this.consultantDetails.wishlist_id=result['data'].wishlist_id
        this.consultant_timezone=result['data'].zone
        if(this.modes) {
         this.direct_access_mode=this.modes.split(",")
        }
      }
      else{
        this.langService.apiFailureAlert(result['message'])
      }
    })
  }
  addWishlist(){
      if(localStorage.getItem('user_id')) {
          let data={
            user_id:localStorage.getItem('user_id'),
            consultant_id:this.id
          }
          this.reviewsService.postData(data,'wishlist/add').then((result)=>{
            if(result['status_code']==200) {
              this.langService.apiSuccessAlert(result['message'])
              this.getConsultantsDetails()
            }
            else{
              this.langService.apiFailureAlert(result['message'])
            }
          })
      }
      else{
        this.langService.failureAlert('you_need_to_login')
      }
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
            else{
              this.Reviews[i]['first_name']=splitted_name[0]
              this.Reviews[i]['last_name']=this.returnFistChar(splitted_name[1])
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
        user_id:this.id
      }
      this.reviewsService.postData(data,'review/average').then((result)=>{
        if(result['status_code']==200) {
          this.communication=parseFloat(result['data'].communication).toFixed(2)
          this.empathy_and_flexibility=parseFloat(result['data'].empathy_and_flexibility).toFixed(2)
          this.rating=result['data'].rating=parseFloat(result['data'].rating).toFixed(2)
          this.reliable_and_trustworthy=parseFloat(result['data'].reliable_and_trustworthy).toFixed(2)
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
   }
}
