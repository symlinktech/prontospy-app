
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from './home.service';
import { CommonService } from '../../common.service';
import { TranslateService } from '@ngx-translate/core';
import { Socket } from 'ngx-socket-io';
import { LanguageService } from '../../i18n/language.service';
import { Observable } from 'rxjs/Observable';
import { forkJoin} from "rxjs";
import { tap } from "rxjs/operators";
import { OpentokService } from '../../opentok.service';


declare var $;
declare var moment;
declare var tz;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
NationalityList:any;
LanguageList:any;
InterventionList:any;
TestimonialList:any;
consultantList:any;
blogList:any;
bannerList:any;
keyword:any;
gender:any;
status:any;
service_name:any;
service_price:any;
service_mode:any;
TimeSlot:any;
start_time:any;
end_time:any;
id:any;
currency:any;
price:any;
modes:any;
service_currency:any;
instantCommuType:any;
username:any;
video_token:any;
chat_token:any;
room_name:any;
channelObj:any;
channels:any=[]
currentSid:any;
private conSub: any;
consultant_id:any;
appointment_id:any;
timestamp:any;
isRoomParticipantCheck:boolean;
user_email:any;
email_text:any;
OfferedList:any;
OnlineServiceList:any;
GettingStartedList:any;
CmsData:any={name:'',description:''}
WebCount:any={appointment:'',consultant:'',intervention:'',user:''};
consultant_timezone:any;
consultant_name:any;
consultant_email:any;
consultant_professional_qualifications:any;
consultant_image:any;
search_toggle=false;
role=localStorage.getItem('role')
comm_mode:any;
calling_button_text='continue';
action='AuthorisePayment';
calling_button_disable=false;
user_id=localStorage.getItem('user_id')
home_middle_title:any;
home_middle_sub_title:any;
home_middle_description:any;
home_middle_image:any;
bannerData=this.commService.getBannerData()
  constructor(public router:Router,public commService:CommonService,public homeService:HomeService,public translate: TranslateService,public socket:Socket,public langService:LanguageService,public opentokService:OpentokService) { }

  ngOnInit() {
    $('.preloader').fadeIn(300);
    this.requestDataFromMultipleSources().subscribe(responseList => {
      if(responseList.length==13) {
        $('.preloader').fadeOut(300);
      }
    })

    $('.consultant-filter .btn-filter').on('click', function(){
      $(this).toggleClass('active');
      $('.consultant-filter .filter-content-wrap').slideToggle(300);
    });
    $('.consultant-filter .btn-clear-filter').on('click', function(){
      $('.consultant-filter .btn-filter').removeClass('active');
      $('.consultant-filter .filter-content-wrap').slideUp(300);
    });
    var _this=this
    $("#gender_checkbox .custom-checkbox-input").click(function(){
        var favorite2 = [];
        $.each($("#gender_checkbox .custom-checkbox-input:checked"), function(){
            favorite2.push($(this).val());
        });
        _this.genderCheck(favorite2)
    });
    $("#status_checkbox .custom-checkbox-input").click(function(){
        var favorite2 = [];
        $.each($("#status_checkbox .custom-checkbox-input:checked"), function(){
            favorite2.push($(this).val());
        });
        _this.statusCheck(favorite2)
    });
    $("#mode_checkbox .custom-checkbox-input").click(function(){
        var favorite2 = [];
        $.each($("#mode_checkbox .custom-checkbox-input:checked"), function(){
            favorite2.push($(this).val());
        });
        _this.modeCheck(favorite2)
    });
    // $('.sec-banner .btn-search').on('click', function(){
    // if($('.search-container').hasClass==false){
    //   $('.search-container').addClass('active');
    // }else{
    //   $('.search-container').removeClass('active');
    // }
    // });

    $('.search-container .btn-close').on('click', function(){
    $('.search-container').removeClass('active');
  });	 
  }
  genderCheck(value){
    this.gender=value
  }
  statusCheck(value){
    this.status=value
  }
  modeCheck(value){
    this.comm_mode=value
  }
  ngAfterViewInit(){
    var that=this;
     $('#booking_date').datetimepicker({format:'Y-m-d',timepicker:false,inline:false,lang:this.translate.currentLang,regional:this.translate.currentLang,scrollMonth : false,
    scrollInput : false,minDate: new Date(),onSelectDate:function () {
      that.getTimeSlot(); 
    }});
     $('.sec-banner .btn-search').on('click', function(){
    if($('.search-container').hasClass()==false){
      $('.search-container').addClass('active');
    }else{
      $('.search-container').removeClass('active');
    }
    });
    //$('.select2').select2();
    //$('.select2-multiple').select2({placeholder: " - Select Category - "});
    //$('.select2-nosearch').select2({minimumResultsForSearch: -1});
  }
  public requestDataFromMultipleSources(): Observable<any[]> {
    let response1 = this.getCountryList();
    let response2 = this.getLanguageList();
    let response3 = this.getInterventionList();
    let response4 = this.getTestimonialList();
    let response5 = this.getConsultants();
    let response6 = this.getBLogs();
    let response7 = this.getOffers();
    let response8 = this.getOnlineServices();
    let response9 = this.gettingStarted();
    let response10 = this.getCms();
    let response11 = this.getWebCount();
    let response12 = this.getBanners();
    let response13 = this.getHomeMiddleContent();

    return forkJoin([response1,response2,response3,response4,response5,response6,response7,response8,response9,response10,response11,response12,response13]);
  }
	navigatePage(data){
    this.router.navigate(['/consultant-details'],{queryParams:{id:data.id}})
  }
	searchConsultant(){
      let data={
        nationality_id:$('#nationality').val(),
        language_ids:$('#language').val(),
        keyword:this.keyword,
        intervention_ids:$('#intervention_ids').val(),
        gender:this.gender,
        active_status:this.status,
        mode:this.comm_mode,
        user_id:localStorage.getItem('user_id')?localStorage.getItem('user_id'):0
      }
      $('.search-container').removeClass('active');
      this.router.navigate(['/consultants'],{queryParams:{search:true,data:JSON.stringify(data)}})
  	}
  	
  	addWishlist(consultant_id,index,type){
      if(localStorage.getItem('user_id')) {
          let data={
            user_id:localStorage.getItem('user_id'),
            consultant_id:consultant_id
          }
          this.homeService.postData(data,'wishlist/add').then((result)=>{
            if(result['status_code']==200) {
             this.langService.apiSuccessAlert(result['message'])
             if(type==1) {
                this.consultantList[index].wishlist_id=result['data'].id
              }
              else{
                this.consultantList[index].wishlist_id=null
              }
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
    openEmailMeModal(consultant_id){
      this.consultant_id=consultant_id
      $("#email_me").modal('show');
    }
    sendEmail(){
      if(localStorage.getItem('user_id')) {
          let data={
            type:'1',
            email_id:'0',
            parent_id:'0',
            sender_id:localStorage.getItem('user_id'),
            receiver_id:this.consultant_id,
            description:this.email_text,
          }
          this.homeService.postData(data,'email/send').then((result)=>{
            if(result['status_code']==200) {
             this.langService.apiSuccessAlert(result['message'])
              $("#email_me").modal('hide');
              this.email_text='';
              
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
    startConversation(type,data){
      this.consultant_image=data.image
      this.consultant_name=data.profile_name
      this.consultant_email=data.email
      this.consultant_professional_qualifications=data.professional_qualifications
      this.instantCommuType=type;
      this.consultant_id=data.id
      this.consultant_timezone=data.zone
       localStorage.setItem('consultant_status',data.active_status)
      if(localStorage.getItem('user_id') && data.stripe_customer_id) {
        this.currency=data.currency;
        this.price=data.price;
        if(data.mode) {
          var mode_splited=data.mode.split(",")
          this.modes=mode_splited
        }
        $("#conversation_modal").modal('show');

      }
      else if(localStorage.getItem('user_id') && data.stripe_customer_id==null) {
        this.router.navigate(['account/payment-info'],{queryParams:{show:1}})
      }
      else{
        this.router.navigateByUrl('/login')
      }
    }
    allowConversation(){
      var date = new Date();
      var timestamp = date.getTime();
      if(this.instantCommuType=='1') {
      }
      else if(this.instantCommuType=='2') {
        $("#conversation_modal").modal('hide');
      }
      else if(this.instantCommuType=='3') {
        $("#conversation_modal").modal('hide');
      }
    }

    async AuthorisePayment(){
      const currentLang = this.translate.currentLang;
      const returnValue = this.translate.translations[currentLang]['please_wait_authorizing_stripe'];
      this.calling_button_text='please_wait_authorizing_stripe'
      this.calling_button_disable=true
      if(this.instantCommuType=='1') {
          let data={
            consultant_id:this.consultant_id,
            user_id:localStorage.getItem('user_id'),
            amount:this.price,
            currency:this.currency,
            service_type:this.instantCommuType,
            appointment_type:'1',
            session:'',
            token:'',
            user_join:1
          }
          console.log(data)
          this.homeService.postData(data,'connect/instant-call').then((result)=>{
            if(result['status_code']==200) {
              this.calling_button_text='connecting'
              this.appointment_id=result['data'].appointment_id
              this.InitiateSession()
              this.calling_button_disable=false
              //this.langService.successAlert('success_authorized')
            }
            else{
              this.calling_button_text='continue'
              this.calling_button_disable=false
              this.langService.apiFailureAlert(result['message'])
            }
          })
      }
      else{
          this.opentokService.createSessionFun().then(response => {
            localStorage.setItem('opentok_sessionId', response['sessionId'])
            localStorage.setItem('opentok_token',response['token'])
            let data={
              consultant_id:this.consultant_id,
              user_id:localStorage.getItem('user_id'),
              amount:this.price,
              currency:this.currency,
              service_type:this.instantCommuType,
              appointment_type:'1',
              session:response['sessionId'],
              token:response['token'],
              user_join:1
            }
            console.log(data)
            this.homeService.postData(data,'connect/instant-call').then((result)=>{
              if(result['status_code']==200) {
                this.calling_button_text='Connecting'
                //this.action='InitiateSession'
                this.appointment_id=result['data'].appointment_id
                this.InitiateSession()
                //this.calling_button_disable=false
                //this.langService.successAlert('success_authorized')
              }
              else{
                this.calling_button_text='Continue'
                this.calling_button_disable=false
                this.langService.apiFailureAlert(result['message'])
              }
            })
          })
      }
    }
    InitiateSession(){
      let data={
          appointment_id:this.appointment_id,
          consultant_timezone:this.consultant_timezone,
          from_timezone:localStorage.getItem('user_timezone'),
          consultant_name:this.consultant_name,
          consultant_email:this.consultant_email,
          consultant_professional_qualifications:this.consultant_professional_qualifications,
          user_name:localStorage.getItem('first_name') +' '+ localStorage.getItem('last_name'),
          user_image:localStorage.getItem('image'),
          consultant_image:this.consultant_image,
          service_type:this.instantCommuType,
          consultant_id:this.consultant_id,
          user_id:localStorage.getItem('user_id'),
          amount:this.price,
          currency:this.currency,
          appointment_type:'1',
          consultant_status:localStorage.getItem('consultant_status'),
          opentok_sessionId:localStorage.getItem('opentok_sessionId'),
          opentok_token:localStorage.getItem('opentok_token')
        }
        console.log(data)
        $("#conversation_modal").modal('hide');
        this.socket.emit('callConsultant',data)
    }
    getServiceAppoint(id,stripe_cus_id){
      this.consultant_id=id
      if(this.consultant_id==localStorage.getItem('user_id')) {
        this.langService.failureAlert('you_cannot_book_appointment_for_yourself')
      }
      else{
        if(localStorage.getItem('user_id') && stripe_cus_id) {
          this.id=id
          let data={
            id:this.id,
            service_id:2,
            limit:1,
          }
          this.homeService.postData(data,'profile/consultant-sevice/get').then((result)=>{
            if(result['status_code']==200) {
              if(result['data']) {
                var that=this
                 $('#booking_date').datetimepicker({format:'Y-m-d',timepicker:false,inline:false,lang:this.translate.currentLang,scrollMonth : false,
                scrollInput : false,disabledWeekDays:result['data'].not_available_days,minDate: new Date(),onSelectDate:function () {
                  that.getTimeSlot(); 
                }});
               this.service_name=result['data'].consultantService.name
                this.service_price=result['data'].consultantService.price
                this.service_currency=result['data'].consultantService.currency
                //this.service_mode=result['data'].mode
                if(result['data'].consultantService.mode) {
                  var mode_splited=result['data'].consultantService.mode.split(",")
                  this.service_mode=mode_splited
                }
                this.TimeSlot=[]
                $("#book_appointment").modal('show');
              }
              else{
                this.langService.failureAlert('no_service_available_for_booking')
              }
            }
            else{
              this.langService.apiFailureAlert(result['message'])
            }
          })
        }
        else if(localStorage.getItem('user_id') && stripe_cus_id==null) {
          this.router.navigateByUrl('/account/client/myprofile/payment-info')
        }
        else{
          this.router.navigateByUrl('/login')
        }
      }
    }
    getTimeSlot(){
      let data={
        id:this.id,
        date:$('#booking_date').val()
      }
      this.homeService.postData(data,'consultant/time-slot').then((result)=>{
        if(result['status_code']==200) {
          this.TimeSlot=result['data'].allTimeSlot
          this.consultant_timezone=result['data'].timezone
          if(this.TimeSlot.length>0) {
            moment.tz.setDefault(this.consultant_timezone);
            var tz = localStorage.getItem('user_timezone');
            for(let i=0;i<this.TimeSlot.length;i++){
              var start_time=this.convertTimeFormat(this.TimeSlot[i].start)
              var end_time=this.convertTimeFormat(this.TimeSlot[i].end)
              this.TimeSlot[i]['converted_start_time']=moment($('#booking_date').val()+' '+start_time).tz(tz).format("YYYY-MM-DD h:mm:ss A")
              this.TimeSlot[i]['converted_end_time']=moment($('#booking_date').val()+' '+end_time).tz(tz).format("YYYY-MM-DD h:mm:ss A")
            }
          }
          else{
            this.langService.failureAlert('time_slot_not_available')
          }
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }
    convertTimeFormat(default_time){
      var time = default_time;
      var hours = Number(time.match(/^(\d+)/)[1]);
      var minutes = Number(time.match(/:(\d+)/)[1]);
      var AMPM = time.match(/\s(.*)$/)[1];
      if(AMPM == "PM" && hours<12) hours = hours+12;
      if(AMPM == "AM" && hours==12) hours = hours-12;
      var sHours = hours.toString();
      var sMinutes = minutes.toString();
      if(hours<10) sHours = "0" + sHours;
      if(minutes<10) sMinutes = "0" + sMinutes;
      var formated_time=sHours + ":" + sMinutes
      return formated_time
      //alert(sHours + ":" + sMinutes);
    }
    getTime(start_time,end_time){
      this.start_time=start_time;
      this.end_time=end_time;
    }
    bookAppoint(){
      if(localStorage.getItem('user_id')) {
          let data={
            user_id:localStorage.getItem('user_id'),
            consultant_id:this.id,
            appointment_date:$('#booking_date').val(),
            appointment_start_time:this.start_time,
            appointment_end_time:this.end_time,
            amount:this.service_price,
            currency:this.service_currency,
            service_type:$('#service_type_select').val(),
            timezone:this.consultant_timezone
          }
          this.homeService.postData(data,'consultant/booking-appointment').then((result)=>{
            if(result['status_code']==200) {
              $("#book_appointment").modal('hide');
              this.langService.apiSuccessAlert(result['message'])
              var today = new Date();
              var date = today.getFullYear()+'-'+((today.getMonth()+1)<10)?'0'+(today.getMonth()+1):(today.getMonth()+1)+'-'+((today.getDate())<10)?'0'+(today.getDate()):today.getDate();
              console.log(data)
              $('#booking_date').val(date)
              this.TimeSlot=[]
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
    getCountryList(){
      let data={
        
      }
      return this.homeService.postData(data,'nationality/list').then((result)=>{
          if(result['status_code']==200) {
            this.NationalityList=result['data'];
          }
          else{
            this.langService.apiFailureAlert(result['message'])
          }
      })
    }
    getLanguageList(){
      let data={
        
      }
      return this.homeService.postData(data,'language/list').then((result)=>{
        if(result['status_code']==200) {
          this.LanguageList=result['data'];
          
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }
    getInterventionList(){
      let data={
        
      }
      return this.homeService.postData(data,'intervention/list').then((result)=>{
        if(result['status_code']==200) {
          this.InterventionList=result['data'];
          
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }
    getTestimonialList(){
      let data={
        
      }
      return this.homeService.postData(data,'testimonial/list').then((result)=>{
        if(result['status_code']==200) {
          $( document ).ready(function() {
               $(".testimonial-slider").owlCarousel({
                items:1,
                loop:true,
                margin:5,
                dots:true,
                nav:true,
                center:false,
                rewind:1,
                autoplay:false
              });

          });
          this.TestimonialList=result['data'];
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }
    getConsultants(){
      let data={
        
        user_id:localStorage.getItem('user_id')?localStorage.getItem('user_id'):0
      }
      return this.homeService.postData(data,'consultant/list').then((result)=>{
        if(result['status_code']==200) {
          this.consultantList=result['data']
          for(let i=0;i<this.consultantList.length;i++){
            if(this.consultantList[i].interventions) {
              var data = this.consultantList[i].interventions.split(",")
              this.consultantList[i].interventions=data[0]
            }
            if(this.consultantList[i].rating){
              this.consultantList[i].rating=parseFloat(this.consultantList[i].rating).toFixed(2)
            }
            if(this.consultantList[i].user_consultant_services) {
              this.consultantList[i].user_consultant_services=this.consultantList[i].user_consultant_services.split(",")
            }
            if(result['data'].mode) {
              this.consultantList[i].mode=this.consultantList[i].mode.split(",")
            }
          }
        }
        else{
            this.langService.apiFailureAlert(result['message'])
        }
      })
    }
  	getBLogs(){
	  	let data={
	  		
	  	}
	  	return this.homeService.postData(data,'blog/list').then((result)=>{
	  		if(result['status_code']==200) {
	  			this.blogList=result['data'];
	  		}
	  		else{
	  			this.langService.apiFailureAlert(result['message'])
	  		}
	  	})
  	}
  	blogDetails(data){
  	  this.router.navigate(['/blog-details'],{queryParams:{id:data.id}})
    }
    getOffers(){
      let data={

      }
      return this.homeService.postData(data,'offer-service/list').then((result)=>{
        if(result['status_code']==200) {
          this.OfferedList=result['data'];
          return result['data'];
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }
    getOnlineServices(){
      let data={

      }
      return this.homeService.postData(data,'online-service/list').then((result)=>{
        if(result['status_code']==200) {
          this.OnlineServiceList=result['data'];
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }
    gettingStarted(){
      let data={

      }
      return this.homeService.postData(data,'getting-started/list').then((result)=>{
        if(result['status_code']==200) {
          this.GettingStartedList=result['data'];
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }
    getCms(){
      let data={
        alias:'home'
      }
      return this.homeService.postData(data,'page/details').then((result)=>{
        if(result['status_code']==200) {
          this.CmsData.description=result['data'].description;
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }
    getWebCount(){
      let data={

      }
      return this.homeService.postData(data,'home/count').then((result)=>{
        if(result['status_code']==200) {
          this.WebCount.appointment=result['data'].appointment;
          this.WebCount.consultant=result['data'].consultant;
          this.WebCount.intervention=result['data'].intervention;
          this.WebCount.user=result['data'].user;
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }
    getBanners(){
      let data={

      }
      return this.homeService.postData(data,'banner/list').then((result)=>{
        if(result['status_code']==200) {
          $( document ).ready(function() {
            $('.banner-slider').owlCarousel({
              items:1,
              loop:false,
              rewind:true,
              margin:0,
              autoplay:true,
              autoplayTimeout:5000,
              autoplayHoverPause:false,
              lazyLoad:true,
              dots:false,
              nav:false,
              animateOut: 'fadeOut',
              animateIn: 'fadeIn',
            });
          });
          this.bannerList=result['data']
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }
    getHomeMiddleContent(){
      let data={
        alias:'home-middle-content'
      }
      return this.homeService.postData(data,'page/details').then((result)=>{
        if(result['status_code']==200) {
          this.home_middle_title=result['data'].name
          this.home_middle_sub_title=result['data'].sub_title
          this.home_middle_description=result['data'].description
          this.home_middle_image=result['data'].image
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }
}
