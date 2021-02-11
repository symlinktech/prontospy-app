import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsService } from './details.service';
import { Socket } from 'ngx-socket-io';
import { LanguageService } from '../../i18n/language.service';
import { TranslateService } from '@ngx-translate/core';
import { OpentokService } from '../../opentok.service';

declare var $;
declare var moment;
declare var tz;
@Component({
  selector: 'app-consultant-details',
  templateUrl: './consultant-details.component.html',
  styleUrls: ['./consultant-details.component.scss']
})
export class ConsultantDetailsComponent implements OnInit {
consultantDetails={active_status: 0,email:'',description: '',image: '',lastname: '',profile_name: '',professional_qualifications: '',rating:0,review: '',long_description: '',therapeutic:'',mental:'',others:'',psycho:'',user_consultant_services:'',
appointment_id:'',stripe_account_id:'',stripe_customer_id:'',currency:'',language_names:'',country:'',wishlist_id:'',interventions:'',nationality:'',nationality_code:'',daily_time_table_status:0,next_appointment_status:0,account_info_completed:0,biography_info_completed:0,fiscal_info_completed:0,insurance_info_completed:0,intervention_info_completed:0,language_info_completed:0,membership_info_completed:0,personal_info_completed:0,service_offered_info_completed:0,daily_schedule_info_completed:0};
id:any;
Reviews:any;
ServiceOfferList:any=[];
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
communication:any;
empathy_and_flexibility:any;
rating:any;
reliable_and_trustworthy:any;
direct_access_mode:any;
consultant_timezone:any;
role=localStorage.getItem('role')
calling_button_text='continue';
action='AuthorisePayment';
calling_button_disable=false;
  constructor(public router:Router, public detailsService:DetailsService,public translate:TranslateService,public langService:LanguageService,public socket:Socket,public ngZone:NgZone, public activatedRoute:ActivatedRoute,public opentokService:OpentokService) { }

  ngOnInit() {
  	this.activatedRoute.queryParams.subscribe((res)=>{
  		this.id=res.id
      this.consultant_id=res.id
      this.getServiceOfferList();
  		this.getConsultantsDetails();
  		this.getReviews()
      this.getReviewsAverage()
  	})
    var that=this
    $('#booking_date').datetimepicker({format:'Y-m-d',timepicker:false,inline:false,lang:this.translate.currentLang,scrollMonth : false,
    scrollInput : false,minDate: new Date(),onSelectDate:function () {
       that.getTimeSlot(); 
    }});   
    // $('#booking_date').on('change', function(e){ 
    //   //console.log(e.date);
    //   that.getTimeSlot(); 
    // })
  }
  getConsultantsDetails(){
  	let data={
      id:this.id,
      user_id:localStorage.getItem('user_id')?localStorage.getItem('user_id'):0
  	}
  	this.detailsService.postData(data,'consultant/details').then((result)=>{
  		if(result['status_code']==200) {
  			result['data'].rating=(result['data'].rating)?parseFloat(result['data'].rating).toFixed(2):null
  			this.consultantDetails.active_status=result['data'].active_status
        this.consultantDetails.daily_time_table_status=result['data'].daily_time_table_status
        this.consultantDetails.next_appointment_status=result['data'].next_appointment_status

        this.consultantDetails.account_info_completed=result['data'].account_info_completed
        this.consultantDetails.biography_info_completed=result['data'].biography_info_completed
        this.consultantDetails.fiscal_info_completed=result['data'].fiscal_info_completed
        this.consultantDetails.insurance_info_completed=result['data'].insurance_info_completed
        this.consultantDetails.intervention_info_completed=result['data'].intervention_info_completed
        this.consultantDetails.language_info_completed=result['data'].language_info_completed
        this.consultantDetails.membership_info_completed=result['data'].membership_info_completed
        this.consultantDetails.personal_info_completed=result['data'].personal_info_completed
        this.consultantDetails.email=result['data'].email
        this.consultantDetails.service_offered_info_completed=result['data'].service_offered_info_completed
        this.consultantDetails.daily_schedule_info_completed=result['data'].daily_schedule_info_completed

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
        this.consultantDetails.psycho=(result['data'].specialization_psycho)?result['data'].specialization_psycho.split(","):result['data'].specialization_psycho
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
        this.consultantDetails.interventions=result['data'].interventions
        this.consultantDetails.nationality=result['data'].nationality
        this.consultantDetails.nationality_code=result['data'].nationality_code
        this.price=result['data'].price;
        this.currency=result['data'].currency;
        this.modes=result['data'].mode;
        if(this.modes) {
         this.direct_access_mode=this.modes.split(",")
        }
  		}
  		else{
  			this.langService.apiFailureAlert(result['message'])
  		}
  	})
  }
  addWishlist(type){
      if(localStorage.getItem('user_id')) {
          let data={
            user_id:localStorage.getItem('user_id'),
            consultant_id:this.id
          }
          this.detailsService.postData(data,'wishlist/add').then((result)=>{
            if(result['status_code']==200) {
              this.langService.apiSuccessAlert(result['message'])
              if(type==1) {
               this.consultantDetails.wishlist_id=result['data'].id
              }
              else{
                this.consultantDetails.wishlist_id=null
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
  openEmailMeModal(){
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
          this.detailsService.postData(data,'email/send').then((result)=>{
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
  getReviews(){
  	let data={
      user_id:this.id
  	}
  	this.detailsService.postData(data,'review/list').then((result)=>{
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
      this.detailsService.postData(data,'review/average').then((result)=>{
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
  startConversation(type,stripe_cus_id){
      this.instantCommuType=type;
      if(localStorage.getItem('user_id') && stripe_cus_id) {
        if(this.modes) {
          var mode_splited=this.modes.split(",")
          this.service_mode=mode_splited
        }
        $("#conversation_modal").modal('show');
        localStorage.setItem('consultant_status',this.consultantDetails.active_status.toString())

      }
      else if(localStorage.getItem('user_id') && stripe_cus_id==null) {
       this.router.navigate(['/account/client/myprofile/payment-info'],{queryParams:{show:1}})
      }
      else{
        this.router.navigateByUrl('/login')
      }
  }
    allowConversation(){
      var date = new Date();
      var timestamp = date.getTime();
      if(this.instantCommuType=='1') {
        // code...
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
      this.calling_button_text=returnValue
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
        this.detailsService.postData(data,'connect/instant-call').then((result)=>{
          if(result['status_code']==200) {
              this.calling_button_text='Connecting'
              this.appointment_id=result['data'].appointment_id
              this.InitiateSession()
              this.calling_button_disable=false
              //this.langService.successAlert('success_authorized')
            }
            else{
              this.calling_button_text='Continue'
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
        this.detailsService.postData(data,'connect/instant-call').then((result)=>{
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
          consultant_name:this.consultantDetails.profile_name,
          consultant_email:this.consultantDetails.email,
          consultant_professional_qualifications:this.consultantDetails.professional_qualifications,
          user_name:localStorage.getItem('first_name') +' '+ localStorage.getItem('last_name'),
          user_image:localStorage.getItem('image'),
          consultant_image:this.consultantDetails.image,
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
    getServiceAppoint(stripe_cus_id){
      if(this.consultant_id==localStorage.getItem('user_id')) {
        this.langService.failureAlert('you_cannot_book_appointment_for_yourself')
      }
      else{
        if(localStorage.getItem('user_id') && stripe_cus_id) {
          let data={
            id:this.id,
            service_id:2,
            limit:1
          }
        this.detailsService.postData(data,'profile/consultant-sevice/get').then((result)=>{
          if(result['status_code']==200) {
            if(result['data']) {
              var that=this
                 $('#booking_date').datetimepicker({format:'Y-m-d',timepicker:false,inline:false,lang:this.translate.currentLang,scrollMonth : false,
                scrollInput : false,disabledWeekDays:result['data'].not_available_days,minDate: new Date(),onSelectDate:function () {
                  that.getTimeSlot(); 
                }});
              this.service_name=result['data'].consultantService.name
                this.service_price=result['data'].consultantService.price
                this.currency=result['data'].consultantService.currency
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
            this.langService.failureAlert('no_service_available_for_booking')
          }
        })
      }
      else if(localStorage.getItem('user_id') && stripe_cus_id==null) {
        this.router.navigateByUrl('account/payment-info')
      }
      else{
        this.router.navigateByUrl('/login')
      }
    }
  }
  getTimeSlot(){
    console.log('time')
    let data={
      id:this.id,
      date:$('#booking_date').val()
    }
    this.detailsService.postData(data,'consultant/time-slot').then((result)=>{
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
        //this.TimeSlot=[];
        // var today = new Date();
        // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        // $('#booking_date').val(date)
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
        currency:this.currency,
        service_type:$('#service_type_select').val(),
        timezone:this.consultant_timezone
      }
      this.detailsService.postData(data,'consultant/booking-appointment').then((result)=>{
        if(result['status_code']==200) {
          $("#book_appointment").modal('hide');
          this.langService.apiSuccessAlert(result['message'])
          var today = new Date();
          var date = today.getFullYear()+'-'+((today.getMonth()+1)<10)?'0'+(today.getMonth()+1):(today.getMonth()+1)+'-'+((today.getDate())<10)?'0'+(today.getDate()):today.getDate();
          $('#booking_date').val(date)
          this.TimeSlot=[]
          // $.dialog({
          //   title: 'Failure',
          //   content: result['message'],
          // });

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
  reviewsPages(){
    this.router.navigate(['/review/list'],{queryParams:{id:this.id}})
  }
  getServiceOfferList(){
      let data={
        id:this.id
      }
      this.detailsService.postData(data,'profile/consultant-sevice/get').then((result)=>{
        if(result['status_code']==200) {
          this.ServiceOfferList=result['data'].consultantService;
          for(let i=0;i<this.ServiceOfferList.length;i++){
            if(this.ServiceOfferList[i].mode) {
              var mode_splited=this.ServiceOfferList[i].mode.split(",")
              var mode_name=[]
              for (let j = 0; j < mode_splited.length; j++) {
                if(mode_splited.indexOf('1')>-1 && mode_name.indexOf('Chat') == -1) {
                  mode_name.push('Chat')
                }
                else if(mode_splited.indexOf('2')>-1 && mode_name.indexOf('Audio') == -1) {
                  mode_name.push('Audio')
                }
                else if(mode_splited.indexOf('3')>-1 && mode_name.indexOf('Video') == -1) {
                   mode_name.push('Video')
                }
              }
              this.ServiceOfferList[i]['mode_name']=mode_name
            }
          }
        }
        else{
           this.langService.apiFailureAlert(result['message'])
        }
      })
  }
}
