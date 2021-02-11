import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd  } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { CommonService } from './common.service';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Subject, of, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

declare var $;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prontospy';
  username:any;
	room_name:any;
	video_token:any;
	chat_token:any;
	channelObj:any;
	channels:any=[]
	currentSid:any;
	private conSub: any;
	lastIndex:any;
	timestamp:any;
	user_id:any;
	consultant_id:any;
	service_type:any;
	amount:any;
  currency:any;
	appointment_id:any;
	grant_type:any;
	identity:any;
  htmlElement:any;
  userhtmlElement:any;
  timeout:any;
  usertimeout:any;
  isChatRoomParticipant:any='false';
  count:any;
  counter:any;
  user_voice_token:any;
  consultant_voice_token:any;
  connection:any;
  chat_sid:any;
  consultant_timezone:any;
  from_timezone:any;
  user_name:any;
  consultant_name:any;
  user_image:any;
  consultant_image:any;
  consultant_email:any;
  consultant_professional_qualifications:any;
  consultant_status:any;
  calling_status:any='calling';
  opentok_sessionId:any;
  opentok_token:any;
  appointment_type:any;
  country_name:any;
  country_code:any;
  user_email:any;
  constructor(public authGuard: AuthGuardService,public translate: TranslateService, public router: Router,public commService:CommonService,public socket:Socket,public ngZone:NgZone,private datePipe: DatePipe) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
      /* Your code goes here on every router change */
        const node = document.createElement('script');
        node.src = 'assets/js/script.js'; // put there your js file location
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }
    });
    // var _this=this
    // window.addEventListener("beforeunload", async function(event) {
    //     console.log('reload') 
    //     //_this.autoStatusChange()
    // });
    //this.getDefaultTimezone();
    // if(localStorage.getItem('count')) {
    //   this.startCountDown('connect')
    // }
    //this.socket.removeListener('call-consultant');
    //this.socket.removeListener('call-response-consultant');
  	this.socket.on('call-consultant', (res) => {
      console.log(res)
  		if(res.consultant_id==localStorage.getItem('user_id')) {
        this.htmlElement=document.getElementById("myAudioCon");
        this.user_name=res.user_name
        this.user_image=res.user_image
        this.user_email=res.user_email
  			this.user_id=res.user_id;
				this.country_name=res.country_name,
				this.country_code=res.country_code,
  			this.consultant_id=res.consultant_id
  			this.service_type=res.service_type
  			this.amount=res.amount
        this.currency=res.currency
  			this.appointment_id=res.appointment_id
  			this.grant_type=res.grant_type
        this.consultant_status=res.consultant_status
        this.opentok_sessionId=res.opentok_sessionId
        this.opentok_token=res.opentok_token
        this.appointment_type=res.appointment_type
        localStorage.setItem('opentok_sessionId',res.opentok_sessionId)
        localStorage.setItem('opentok_token',res.opentok_token)
        this.consultant_timezone=res.consultant_timezone
        localStorage.setItem('from_timezone',res.from_timezone)
        this.from_timezone=res.from_timezone
        $("#consultant_modal").modal({backdrop: 'static',keyboard: false,show:true});
        this.playAudio();
        
  		}
      else if(res.user_id==localStorage.getItem('user_id')) {
        this.userhtmlElement=document.getElementById("myAudioUser");
        this.consultant_name=res.consultant_name
        this.consultant_email=res.consultant_email
        this.consultant_professional_qualifications=res.consultant_professional_qualifications
        this.consultant_image=res.consultant_image
				this.country_name=res.country_name,
				this.country_code=res.country_code,
        this.user_id=res.user_id;
        this.consultant_id=res.consultant_id
        this.service_type=res.service_type
        this.amount=res.amount
        this.currency=res.currency
        this.appointment_id=res.appointment_id
        this.grant_type=res.grant_type
        this.consultant_status=res.consultant_status
        this.appointment_type=res.appointment_type
        this.consultant_timezone=res.consultant_timezone
        localStorage.setItem('from_timezone',res.from_timezone)
        this.from_timezone=res.from_timezone
        $("#user_calling_modal").modal({backdrop: 'static',keyboard: false,show:true});
        this.playUserAudio();
      }
	  });
    this.socket.on('call-response-consultant', (res) => {
      console.log(res)
      if(res.consultant_join=='1' && res.consultant_id==localStorage.getItem('user_id')) {
        if(res.service_type=='2') {
          this.stopAudio()
          $("#consultant_modal").modal('hide');
          if(this.appointment_type=='1') {
            this.ngZone.run(() => 
            this.router.navigate(['media/voice'],{queryParams:{
            appointment_id:this.appointment_id,user_id:this.user_id,consultant_id:this.consultant_id,session_id:res.opentok_sessionId,token:res.opentok_token,rcv:true}}))
          }
          else{
            this.ngZone.run(() => 
            this.router.navigate(['media/schedule/voice'],{queryParams:{
            appointment_id:this.appointment_id,user_id:this.user_id,consultant_id:this.consultant_id,session_id:res.opentok_sessionId,token:res.opentok_token,rcv:true}}))
          }
          //this.startCountDown('connect')
          
        }
        else if(res.service_type=='1') {
          $("#consultant_modal").modal('hide');
          this.stopAudio()
          //this.startCountDown('connect')
          if(this.appointment_type=='1') {
            this.ngZone.run(() => 
          this.router.navigate(['media/chat'],{queryParams:{
            appointment_id:this.appointment_id,user_id:this.user_id,consultant_id:this.consultant_id,rcv:true}}))
          }
          else{
            this.ngZone.run(() => 
          this.router.navigate(['media/schedule/chat'],{queryParams:{
            appointment_id:this.appointment_id,user_id:this.user_id,consultant_id:this.consultant_id,rcv:true}}))
          }
          
        }
        else if(res.service_type=='3') {
          $("#consultant_modal").modal('hide');
          this.stopAudio()
          //this.startCountDown('connect')
          if(this.appointment_type=='1') {
            this.ngZone.run(() =>  
            this.router.navigate(['media/video'],{queryParams:{
            appointment_id:this.appointment_id,user_id:this.user_id,consultant_id:this.consultant_id,session_id:res.opentok_sessionId,token:res.opentok_token,rcv:true}}))
          }
          else{
            this.ngZone.run(() =>  
            this.router.navigate(['media/schedule/video'],{queryParams:{
            appointment_id:this.appointment_id,user_id:this.user_id,consultant_id:this.consultant_id,session_id:res.opentok_sessionId,token:res.opentok_token,rcv:true}}))
          }
          
        }
        
      }
      else if(res.consultant_join=='1' && res.user_id==localStorage.getItem('user_id')){
        if(res.service_type=='2') {
          this.stopUserAudio()
          $("#user_calling_modal").modal('hide');
          //this.startCountDown('connect')
          if(this.appointment_type=='1') {
            this.ngZone.run(() => 
            this.router.navigate(['media/voice'],{queryParams:{
            appointment_id:this.appointment_id,user_id:this.user_id,consultant_id:this.consultant_id,session_id:res.opentok_sessionId,token:res.opentok_token,rcv:true}}))
          }
          else{
            this.ngZone.run(() => 
            this.router.navigate(['media/schedule/voice'],{queryParams:{
            appointment_id:this.appointment_id,user_id:this.user_id,consultant_id:this.consultant_id,session_id:res.opentok_sessionId,token:res.opentok_token,rcv:true}}))
          }
        }
        else if(res.service_type=='1') {
          $("#user_calling_modal").modal('hide'); 
          this.stopUserAudio()
          //this.startCountDown('connect')
          if(this.appointment_type=='1') {
            this.ngZone.run(() => 
          this.router.navigate(['media/chat'],{queryParams:{
            appointment_id:this.appointment_id,user_id:this.user_id,consultant_id:this.consultant_id,rcv:true}}))
          }
          else{
            this.ngZone.run(() => 
          this.router.navigate(['media/schedule/chat'],{queryParams:{
            appointment_id:this.appointment_id,user_id:this.user_id,consultant_id:this.consultant_id,rcv:true}}))
          }
        }
        else if(res.service_type=='3') {
          $("#user_calling_modal").modal('hide');
          this.stopUserAudio()
          //this.startCountDown('connect')
                    if(this.appointment_type=='1') {
            this.ngZone.run(() =>  
            this.router.navigate(['media/video'],{queryParams:{
            appointment_id:this.appointment_id,user_id:this.user_id,consultant_id:this.consultant_id,session_id:res.opentok_sessionId,token:res.opentok_token,rcv:true}}))
          }
          else{
            this.ngZone.run(() =>  
            this.router.navigate(['media/schedule/video'],{queryParams:{
            appointment_id:this.appointment_id,user_id:this.user_id,consultant_id:this.consultant_id,session_id:res.opentok_sessionId,token:res.opentok_token,rcv:true}}))
          }
        }
      }
      else if(res.consultant_join=='2' && res.user_join=='3' && res.user_id==localStorage.getItem('user_id')) {
        $("#user_calling_modal").modal('hide'); 
         this.stopUserAudio();
         window.location.reload();
      }
      else if(res.consultant_join=='3' && res.user_join=='1' && res.user_id==localStorage.getItem('user_id')) {
        $("#user_calling_modal").modal('hide');
        const currentLang = this.translate.currentLang;
        const returnValue1 = this.translate.translations[currentLang]['call_status']; 
        const returnValue2 = this.translate.translations[currentLang]['consultant_cannot_answer']; 
         this.stopUserAudio();
          $.confirm({
            title:returnValue1,
            content: returnValue2,
            buttons: {
            Close: function () {
                window.location.reload();
            }
        }
        });
      }
      else if(res.consultant_join=='2' && res.user_join=='3' && res.consultant_id==localStorage.getItem('user_id')) {
        $("#consultant_modal").modal('hide');
        this.stopAudio();
        window.location.reload();
      }
      else if(res.consultant_join=='3'&& res.user_join=='1' && res.consultant_id==localStorage.getItem('user_id')) {
        $("#consultant_modal").modal('hide');
        this.stopAudio();
        window.location.reload();
      }
      else if(res.consultant_join=='4'){
        $("#user_calling_modal").modal('hide');
        $("#consultant_modal").modal('hide');
        const currentLang = this.translate.currentLang;
        const returnValue1 = this.translate.translations[currentLang]['call_status']; 
        const returnValue2 = this.translate.translations[currentLang]['consultant_cannot_answer']; 
        $.confirm({
            title: returnValue1,
            content: returnValue2,
            buttons: {
            Close: function () {
                window.location.reload();
            }
          }
        });
      }
    });
  }
    playAudio(){
      this.htmlElement.play();
      var that=this
      this.timeout=setTimeout(function(){ that.htmlElement.pause();
        that.htmlElement.currentTime=0;
        clearTimeout(that.timeout);
         //$("#consultant_modal").modal('hide');
         that.notResponded();
        //alert('hi')
      }, 60000); 
    }
    playUserAudio(){
      this.userhtmlElement.play();
      var that=this
      this.usertimeout=setTimeout(function(){ that.userhtmlElement.pause();
        that.userhtmlElement.currentTime=0;
        clearTimeout(that.usertimeout);
         $("#user_calling_modal").modal('hide');
         //that.router.navigate([''])
         //window.location.reload();
         //that.notResponded();
        //alert('hi')
      }, 60000); 
    }
    stopAudio(){  
      this.htmlElement.pause();
      this.htmlElement.currentTime = 0;
      clearTimeout(this.timeout);
    }
    stopUserAudio(){
      this.userhtmlElement.pause();
      this.userhtmlElement.currentTime = 0;
      clearTimeout(this.usertimeout);
    }
    notResponded(){
      //$("#consultant_modal").modal('hide');
      let data={
          user_id:this.user_id,
          consultant_id:this.consultant_id,
          appointment_id:this.appointment_id,
          consultant_join:4,
          user_join:1,
          service_type:this.service_type
        }
        var url=(this.appointment_type=='1')?'reject/instant-call':'reject/schedule-call'
        this.commService.postData(data,url).then((result)=>{
        if(result['status_code']==200) {
          this.socket.emit('callResponseConsultant',data)
        }
      });
    }
    userCancel(){
       //$("#user_calling_modal").modal('hide');
       let data={
          user_id:this.user_id,
          consultant_id:this.consultant_id,
          appointment_id:this.appointment_id,
          consultant_join:2,
          user_join:3,
          service_type:this.service_type
        }
        var url=(this.appointment_type=='1')?'reject/instant-call':'reject/schedule-call'
        this.commService.postData(data,url).then((result)=>{
          if(result['status_code']==200) {
            this.socket.emit('callResponseConsultant',data)
          }
        });
    }
    acceptCall(){
      let data={
        user_id:this.user_id,
        consultant_id:this.consultant_id,
        appointment_id:this.appointment_id,
        consultant_join:1,
        service_type:this.service_type,
        opentok_sessionId:this.opentok_sessionId,
        opentok_token:this.opentok_token
      }
      this.socket.emit('callResponseConsultant',data)
    }
    rejectCall(){
      let data={
        user_id:this.user_id,
        consultant_id:this.consultant_id,
        appointment_id:this.appointment_id,
        consultant_join:3,
        user_join:1,
        service_type:this.service_type
      }
      var url=(this.appointment_type=='1')?'reject/instant-call':'reject/schedule-call'

      this.commService.postData(data,url).then((result)=>{
        if(result['status_code']==200) {
          this.socket.emit('callResponseConsultant',data)
          this.router.navigate([''])
        }
      });
      
    }
    disConnectInstant(user_id,consultant_id,appointment_id,amount,count,user_disconnect,consult_disconnect,action,max_call_duration){
          this.count=count
          var m = Math.floor(this.count % 3600 / 60);
          var s = Math.floor(this.count % 3600 % 60);
          if(s>0) {
            m=m+1
          }
          let data={
              user_id:user_id,
              consultant_id:consultant_id,
              appointment_id:appointment_id,
              minutes:(action=='limit_over')?max_call_duration:m
            }
            this.commService.postData(data,'disconnect/instant-call').then((result)=>{
              if(result['status_code']==200) {
                if(localStorage.getItem('role')=='consultant') {
                  this.router.navigate(['/account/consultant/appointment-details'],{queryParams:{app_id:appointment_id}}).then(() => {
                    window.location.reload();
                  });
                }
                else{
                  this.router.navigate(['/account/client/appointment-details'],{queryParams:{app_id:appointment_id}}).then(() => {
                      window.location.reload();
                    });
                }
              }
            })
    }
      disConnectSchedule(user_id,consultant_id,appointment_id,amount,count,user_disconnect,consult_disconnect,action,max_call_duration){
          this.count=count
          var m = Math.floor(this.count % 3600 / 60);
          var s = Math.floor(this.count % 3600 % 60);
          if(s>0) {
            m=m+1
          }
          let data={
              user_id:user_id,
              consultant_id:consultant_id,
              appointment_id:appointment_id,
              minutes:(action=='limit_over')?max_call_duration:m
            }
            this.commService.postData(data,'disconnect/schedule-call').then((result)=>{
              if(result['status_code']==200) {
                if(localStorage.getItem('role')=='consultant') {
                  this.router.navigate(['/account/consultant/appointment-details'],{queryParams:{app_id:appointment_id}}).then(() => {
                    window.location.reload();
                  });
                }
                else{
                  this.router.navigate(['/account/client/appointment-details'],{queryParams:{app_id:appointment_id}}).then(() => {
                      window.location.reload();
                    });
                }
              }
            })
    }
    getDefaultTimezone(){
      let data={}
      this.commService.postData(data,'default/timezone').then((result)=>{
        localStorage.setItem('global_default_timezone',result['data'].data.timezone)
      })
    }
    autoStatusChange(){
      if(localStorage.getItem('role')=='consultant') {
        let data={
          id:localStorage.getItem('user_id'),
          status:'2'
        }
      //console.log(data)
        this.commService.postData(data,'profile/update-status').then((result)=>{
          if(result['status_code']==200) {
            localStorage.removeItem('user_email');
            localStorage.removeItem('user_name');
            localStorage.removeItem('user_id');
            localStorage.removeItem('role');
            localStorage.removeItem('count');
            localStorage.removeItem('user_timezone')
            localStorage.removeItem('user_offset')
            localStorage.removeItem('image')
            this.authGuard.isLogged();
          }
          else{

          }
        })
      }
      
    }
}
