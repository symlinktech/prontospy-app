import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from './appointment.service';
import { Socket } from 'ngx-socket-io';
import { LanguageService } from '../../i18n/language.service';
import { OpentokService } from '../../opentok.service';
declare var $;
declare var moment;
declare var tz;
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
appointmentList:any;
role:any;
id:any;
service_name:any;
service_price:any;
service_currency:any;
service_mode:any;
TimeSlot:any;
start_time:any;
end_time:any;
booking_id:any;
name:any='Appointments';
login_user_id:any;
instantCommuType:any;
consultant_id:any;
currency:any;
price:any;
chat_token:any;
video_token:any;
username:any;
room_name
appointment_id:any;
timestamp:any;
private conSub: any;
today:any;
consultant_timezone:any;
pastCount:number=0;
futureCount:number=0;
consultant_name:any;
consultant_image:any;
calling_button_text='continue';
action='AuthorisePayment';
calling_button_disable=false;
  constructor(public appointService:AppointmentService,public router:Router,public langService:LanguageService,public socket:Socket, public activatedRoute:ActivatedRoute,public opentokService:OpentokService) { }

  ngOnInit() {
    $('.preloader').fadeIn(300);
    this.today = new Date();
  	this.role=localStorage.getItem('role')
    this.login_user_id=localStorage.getItem('user_id')
    $('#past').removeClass('d-none')
  	this.getAppointmentList();
    //console.log(localStorage.getItem('count'))
    var that=this
      $('#booking_date').datetimepicker({format:'Y-m-d',timepicker:false,inline:false,lang:'en',minDate: new Date(),scrollMonth : false,
    scrollInput : false, value:new Date(),onSelectDate:function () {
       that.getTimeSlot(); 
      }});
      $(".card-nav a").click(function(){
        $(this).tab('show');
      });
  }
  showDiv(id){
    if(id=='past') {
      $('#past').removeClass('d-none')
      $('#upcoming').addClass('d-none')
    }
    else if(id=='in_progress') {
      $('#in_progress').removeClass('d-none')
      $('#in_progress').addClass('d-none')
    }
    else{
      $('#upcoming').removeClass('d-none')
      $('#past').addClass('d-none')
    }
  }
  details(id,consultant_id){
    if(localStorage.getItem('role')=='consultant') {
      this.router.navigate(['account/consultant/appointment-details'],{queryParams:{app_id:id}})
    }
    else{
      this.router.navigate(['account/client/appointment-details'],{queryParams:{app_id:id}})
    }
    // var url=(localStorage.getItem('role')=='consultant')?'account/consultant/appointment-details':'account/client/appointment-details'
    // this.router.navigate([url],{queryParams:{app_id:id,con_id:consultant_id}})
  }
  goToCall(appointment){
    moment.tz.setDefault(appointment.timezone);
    var call_start_time=moment(appointment.appointment_date+' '+appointment.appointment_start_time).tz(appointment.timezone).format("YYYY-MM-DD H:mm:ss")
    var call_end_time=moment(appointment.appointment_date+' '+appointment.appointment_end_time).tz(appointment.timezone).format("YYYY-MM-DD H:mm:ss")
    var current_time=moment().tz(appointment.timezone).format("YYYY-MM-DD H:mm:ss")
      if(appointment.appointment_type=='1'){
          if(appointment.status=='4' && (new Date(call_start_time).getTime()<=new Date(current_time).getTime()) && (new Date(call_end_time).getTime()>=new Date(current_time).getTime())) {
            if(appointment.service_type==1) {
              this.router.navigate(['media/chat'],{queryParams:{appointment_id:appointment.id}})
            }
            else if(appointment.service_type==2) {
              this.router.navigate(['media/voice'],{queryParams:{appointment_id:appointment.id,session_id:appointment.session,token:appointment.token}})
            }
            else if(appointment.service_type==3) {
              this.router.navigate(['media/video'],{queryParams:{appointment_id:appointment.id,session_id:appointment.session,token:appointment.token}})
            }
          }
      }
      else{
        if(appointment.status=='4' && (new Date(call_start_time).getTime()<=new Date(current_time).getTime()) && (new Date(call_end_time).getTime()>=new Date(current_time).getTime())) {
          if(appointment.service_type==1) {
            this.router.navigate(['media/schedule/chat'],{queryParams:{appointment_id:appointment.id}})
          }
          else if(appointment.service_type==2) {
            this.router.navigate(['media/schedule/voice'],{queryParams:{appointment_id:appointment.id,session_id:appointment.session,token:appointment.token}})
          }
          else if(appointment.service_type==3) {
            this.router.navigate(['media/schedule/video'],{queryParams:{appointment_id:appointment.id,session_id:appointment.session,token:appointment.token}})
          }
        }
      }
  }
  addReview(appointment_id,consultant_id){
    this.router.navigate(['review-add'],{queryParams:{id:consultant_id,appointment_id:appointment_id}})
  }
  getAppointmentList(){
  	let data={
      user_id:localStorage.getItem('user_id')
  	}
  	this.appointService.postData(data,'profile/appointment/get').then((result)=>{
  		if(result['status_code']==200) {
  			var today = new Date();
			  var date = new Date(today.getFullYear(),today.getMonth(),today.getDate());
  			this.appointmentList=result['data']
        var tz = localStorage.getItem('user_timezone');
  			for(let i=0;i<this.appointmentList.length;i++){
            moment.tz.setDefault(this.appointmentList[i].timezone);
            var call_start_time=moment(this.appointmentList[i].appointment_date+' '+this.appointmentList[i].appointment_start_time).tz(this.appointmentList[i].timezone).format("YYYY-MM-DD H:mm:ss")
            var call_end_time=moment(this.appointmentList[i].appointment_date+' '+this.appointmentList[i].appointment_end_time).tz(this.appointmentList[i].timezone).format("YYYY-MM-DD H:mm:ss")
            var current_time=moment().tz(this.appointmentList[i].timezone).format("YYYY-MM-DD H:mm:ss")
            if(this.appointmentList[i].appointment_type=='1') {
              if(this.appointmentList[i].status=='4' && (new Date(call_start_time).getTime()<=new Date(current_time).getTime()) && (new Date(call_end_time).getTime()>=new Date(current_time).getTime())) {
                this.appointmentList[i]['join']=true
              }
            }
            else{
              if(new Date(call_start_time).getTime()<=new Date(current_time).getTime() && new Date(call_end_time).getTime()>=new Date(current_time).getTime()) {
                if(this.appointmentList[i].status=='1'){
                  this.appointmentList[i]['start_call']=true
                }
                else if(this.appointmentList[i].status=='4'){
                  this.appointmentList[i]['join']=true
                }
              }
          }

            if(this.role=='user') {
               moment.tz.setDefault(this.appointmentList[i].timezone);
               var user_start_time=moment(this.appointmentList[i].appointment_date+' '+this.appointmentList[i].appointment_start_time).tz(tz).format("YYYY-MM-DD H:mm")
               this.appointmentList[i]['user_start_time']=user_start_time
               var user_end_time=moment(this.appointmentList[i].appointment_date+' '+this.appointmentList[i].appointment_end_time).tz(tz).format("YYYY-MM-DD H:mm")
               this.appointmentList[i]['user_end_time']=user_end_time
               var a = new Date(moment().tz(tz).format("YYYY-MM-DD  H:mm:ss"));
              var b = new Date(user_end_time);
              var c = new Date(user_start_time);
              if(a.getTime()<b.getTime()) {
                this.futureCount++
                this.appointmentList[i]['future']=true
              }
              else{
                if(a.getTime()==c.getTime()) {
                  this.appointmentList[i]['today']=true
                }
                else{
                  this.pastCount++
                  this.appointmentList[i]['past']=true
                }
              }
            }
            else{
               var consultant_start_time;
               var consultant_end_time;
              if(this.appointmentList[i].appointment_type=='1') {
                consultant_start_time=moment(this.appointmentList[i].appointment_date+' '+this.appointmentList[i].appointment_start_time).tz(tz).format("YYYY-MM-DD H:mm")
                consultant_end_time=moment(this.appointmentList[i].appointment_date+' '+this.appointmentList[i].appointment_end_time).tz(tz).format("YYYY-MM-DD H:mm")
                this.appointmentList[i]['consultant_start_time']=consultant_start_time
                this.appointmentList[i]['consultant_end_time']=consultant_end_time
              }
              else{
                 moment.tz.setDefault(this.appointmentList[i].timezone);
                consultant_start_time=moment(this.appointmentList[i].appointment_date+' '+this.appointmentList[i].appointment_start_time).tz(tz).format("YYYY-MM-DD H:mm")
                consultant_end_time=moment(this.appointmentList[i].appointment_date+' '+this.appointmentList[i].appointment_end_time).tz(tz).format("YYYY-MM-DD H:mm")
                this.appointmentList[i]['consultant_start_time']=consultant_start_time
                this.appointmentList[i]['consultant_end_time']=consultant_end_time
              }
              var a = new Date(moment().tz(tz).format("YYYY-MM-DD H:mm:ss"));
              var b = new Date(consultant_end_time);
              var c = new Date(consultant_start_time);
              if(a.getTime()<b.getTime()) {
                this.futureCount++
                this.appointmentList[i]['future']=true
              }
              else{
                if(a.getTime()==c.getTime()) {
                  this.appointmentList[i]['today']=true
                }
                else{
                  this.pastCount++
                  this.appointmentList[i]['past']=true
                }
              }
            }
  			}
         $('.preloader').fadeOut(300);
  		}
  		else{
        $('.preloader').fadeOut(300);
        this.langService.apiFailureAlert(result['message'])
  		}
  	})
  }
  removeAppoinment(appointment_id,index){
    let data={
      id:appointment_id
    }
    this.appointService.postData(data,'profile/appointment/delete').then((result)=>{
      if(result['status_code']==200) {
        this.langService.apiSuccessAlert(result['message'])
        this.appointmentList.splice(index,1)
      }
      else{
        this.langService.apiFailureAlert(result['message'])
      }
    })
  }
  getServiceAppoint(id,booking_id,date,type){
    this.id=id
    this.booking_id=booking_id
    $('#booking_date').val(date)
    $('#service_type_select').val(type)
    let data={
      id:this.id,
      service_id:2,
      limit:1,
    }
    this.appointService.postData(data,'profile/consultant-sevice/get').then((result)=>{
      if(result['status_code']==200) {
        if(result['data']) {
          this.service_name=result['data'].name
          this.service_price=result['data'].price
          this.service_currency=result['data'].currency
          //this.service_mode=result['data'].mode
          if(result['data'].mode) {
              var mode_splited=result['data'].mode.split(",")
              var mode_name=[]
              for (let j = 0; j < mode_splited.length; j++) {
                if(mode_splited.indexOf('1')>-1 && mode_name.indexOf('Chat') == -1) {
                  mode_name.push('Chat')
                }
                else if(mode_splited.indexOf('2')>-1 && mode_name.indexOf('Audio') == -1) {
                  mode_name.push('Audio')
                }
                else if(mode_splited.indexOf('3')>-1 && mode_name.indexOf('Audio-Video') == -1) {
                   mode_name.push('Audio-Video')
                }
              }
              this.service_mode=mode_name
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
  getTimeSlot(){
    let data={
      id:this.id,
      date:$('#booking_date').val()
    }
    this.appointService.postData(data,'consultant/time-slot').then((result)=>{
      if(result['status_code']==200) {
        this.TimeSlot=result['data'].allTimeSlot
        this.consultant_timezone=result['data'].timezone
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
    let data={
      //user_id:localStorage.getItem('user_id'),
      //consultant_id:this.id,
      appointment_date:$('#booking_date').val(),
      appointment_start_time:this.start_time,
      appointment_end_time:this.end_time,
      id:this.booking_id,
      service_type:$('#service_type_select').val(),
      timezone:this.consultant_timezone
    }
    this.appointService.postData(data,'profile/update-booking-appointment').then((result)=>{
      if(result['status_code']==200) {
        $("#book_appointment").modal('hide');
        this.langService.apiSuccessAlert(result['message'])
        var today = new Date();
        var date = today.getFullYear()+'-'+((today.getMonth()+1)<10)?'0'+(today.getMonth()+1):(today.getMonth()+1)+'-'+((today.getDate())<10)?'0'+(today.getDate()):today.getDate();
        $('#booking_date').val(date)
        this.TimeSlot=[]
        this.getAppointmentList()
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
//====================================Twilio Voice/Chat/Video=============================================//

    startConversation(type,data){
      moment.tz.setDefault(data.timezone);
      var call_start_time=moment(data.appointment_date+' '+data.appointment_start_time).tz(data.timezone).format("YYYY-MM-DD H:mm:ss")
      var call_end_time=moment(data.appointment_date+' '+data.appointment_end_time).tz(data.timezone).format("YYYY-MM-DD H:mm:ss")
      var current_time=moment().tz(data.timezone).format("YYYY-MM-DD H:mm:ss")
      console.log(call_start_time)
      console.log(call_end_time)
      console.log(current_time)
      if((new Date(call_start_time).getTime()<=new Date(current_time).getTime()) && (new Date(call_end_time).getTime()>=new Date(current_time).getTime())) {
        this.instantCommuType=type;
        this.consultant_id=data.consultant_id
        this.appointment_id=data.id
        this.currency=data.per_minute_amount;
        this.price=data.currency;
        this.consultant_timezone=data.timezone
        this.consultant_name=data.consultant_profile_name
        this.consultant_image=data.consultant_image
        localStorage.setItem('consultant_status',data.consultant_active_status)
        $("#conversation_modal").modal('show');
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
      this.calling_button_text='Please wait authorizing to stripe'
      this.calling_button_disable=true
      if(this.instantCommuType=='1') {
        let data={
            user_id:localStorage.getItem('user_id'),
            consultant_id:this.consultant_id,
            appointment_id:this.appointment_id,
            appointment_type:'1',
            user_join:1,
            token:'',
            session:''
          }
          console.log(data)
          this.appointService.postData(data,'connect/schedule-call').then((result)=>{
            if(result['status_code']==200) {
              this.calling_button_text='Connecting'
              this.action='InitiateSession'
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
      }
      else{
        this.opentokService.createSessionFun().then(response => {
          localStorage.setItem('opentok_sessionId', response['sessionId'])
          localStorage.setItem('opentok_token',response['token'])
          let data={
            user_id:localStorage.getItem('user_id'),
            consultant_id:this.consultant_id,
            appointment_id:this.appointment_id,
            user_join:1,
            appointment_type:'2',
            token:response['token'],
            session:response['sessionId']
          }
          console.log(data)
          this.appointService.postData(data,'connect/schedule-call').then((result)=>{
            if(result['status_code']==200) {
              this.calling_button_text='Connecting'
              this.action='InitiateSession'
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
          user_name:localStorage.getItem('first_name') +' '+ localStorage.getItem('last_name'),
          user_image:localStorage.getItem('image'),
          consultant_image:this.consultant_image,
          service_type:this.instantCommuType,
          consultant_id:this.consultant_id,
          user_id:localStorage.getItem('user_id'),
          amount:this.price,
          currency:this.currency,
          appointment_type:'2',
          consultant_status:localStorage.getItem('consultant_status'),
          opentok_sessionId:localStorage.getItem('opentok_sessionId'),
          opentok_token:localStorage.getItem('opentok_token')
        }
        console.log(data)
        $("#conversation_modal").modal('hide');
        this.socket.emit('callConsultant',data)
    }
}
