import { Component, OnInit, ViewChild, NgZone, ElementRef, OnDestroy, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Route} from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { AppComponent } from '../../../app.component';
import { LanguageService } from '../../../i18n/language.service';
import { CommonService } from '../../../common.service';
import { environment } from '../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
declare var require;
declare var navigator;
declare var $;
declare var moment;
declare var tz;
var accountSid = 'AC5aba9b261821c49fb2b0db24f2aa62d7';
var authToken = '3fe8eaec146a0c64d02fab848974d5f9';

@Component({
  selector: 'app-chat-schedule',
  templateUrl: './chat-schedule.component.html',
  styleUrls: ['./chat-schedule.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ChatScheduleComponent implements OnInit {
  user_id:any;
  consultant_id:any;
  appointment_id:any;
  amount:any;
  comment:any;
  base64=[];
  messageList:any=[];
  loginId=localStorage.getItem('user_id')
  baseUrl=environment.baseUrl
  consultant_profile_name:any;
  user_profile_name:any;
  @ViewChild('chatElement', { static: true }) chatElement: any;
  count:any;
  counter:any;
  hDisplay:any;
  mDisplay:any;
  sDisplay:any;
  consultant_join:any;
  user_join:any;
  call_start_time:any;
  queryParamsRes:any;
  appointment_start_time:any;
  appointment_end_time:any;
  max_call_duration:any;
  get_data=0;
  appointment_type:any;
  schedule_count=0;
  constructor(public socket:Socket,public translate: TranslateService,public langService:LanguageService,public appComponent:AppComponent,public commonService:CommonService,public activatdRoute:ActivatedRoute,public router:Router) {
        this.socket.removeListener('user-consultant-join')
        this.socket.removeListener('call-disconnect')
        this.socket.removeListener('call-auto-disconnect')
        this.socket.removeListener('get-message-list')
        this.socket.removeListener('get-last-message')
        this.socket.on('user-consultant-join', (res) => {
          if(res.user_join!=2) {
            this.user_join=res.user_join
          }
          if(res.consultant_join!=2) {
            this.consultant_join=res.consultant_join
          }
          if(this.user_join==1 && this.consultant_join==1) {
            var rcv= this.getUrlParameter('rcv')
            var user_id=this.getUrlParameter('user_id')
            var consultant_id=this.getUrlParameter('consultant_id')
            var appointment_id=this.getUrlParameter('appointment_id')
            if(rcv=='true') {
              if(consultant_id==localStorage.getItem('user_id')) {
                this.getCredentials(appointment_id,'no')
                moment.tz.setDefault(localStorage.getItem('user_timezone'));
                this.call_start_time=moment().tz(localStorage.getItem('user_timezone')).format("H:mm:ss")
                this.count=0
                this.startCountDown()
                this.acceptCall(user_id,consultant_id,appointment_id)
                this.clearPosParam(appointment_id)
              }
              else{
                this.getCredentials(appointment_id,'no')
                this.count=0
                this.startCountDown()
                this.clearPosParam(appointment_id)
              }
            }
            
            
            // code...
          }
        })
        this.socket.on('call-disconnect', (res) => {
          var _this=this
          const currentLang = this.translate.currentLang;
          const returnValue1 = this.translate.translations[currentLang]['call_status'];
          const returnValue2 = this.translate.translations[currentLang]['user_disconnected_call'];
          const returnValue3 = this.translate.translations[currentLang]['consultant_disconnected_call'];
          if(res.user_disconnect==1 && res.consult_disconnect==2) {
            if(this.consultant_id==localStorage.getItem('user_id')) {
              clearInterval(this.counter);
              $.confirm({
                title: returnValue1,
                content: returnValue2,
                buttons: {
                  Close: function () {
                    _this.router.navigate(['/account/client/appointment-details'],{queryParams:{app_id:_this.appointment_id}}).then(() => {
                      window.location.reload();
                    });
                  }
                }
              });
                
            }
          }
          else if(res.user_disconnect==2 && res.consult_disconnect==1) {
            if(this.user_id==localStorage.getItem('user_id')) {
               clearInterval(this.counter);
                $.confirm({
                title: returnValue1,
                content: returnValue3,
                buttons: {
                  Close: function () {
                   _this.router.navigate(['/account/consultant/appointments'],{queryParams:{app_id:_this.appointment_id}}).then(() => {
                      window.location.reload();
                    });
                  }
                }
              });
                
            }
          }
        });
        this.socket.on('call-auto-disconnect',(res)=>{
          if(this.user_id==localStorage.getItem('user_id')) {
              this.disconnectFun('limit_over')
            }
        })
      this.socket.on('get-message-list', (res) => {
        this.messageList=res.result
        
        for(let i=0;i<this.messageList.length;i++){
          if(this.messageList[i].files) {
            this.messageList[i].files=JSON.parse(this.messageList[i].files)
            for(let j=0;j<this.messageList[i].files.length;j++){
              this.messageList[i].files[j]['file_exist']=this.UrlExists(this.messageList[i].files[j].file)
            }
          }
        }
        //console.log(this.messageList)
        var _this=this
         setTimeout(function(){ _this.chatElement.nativeElement.scrollTop = _this.chatElement.nativeElement.scrollHeight; }, 500);
       
      })
      this.socket.on('get-last-message', (res) => {
      for(let i=0;i<res.result.length;i++){
        if(res.result[i].files) {
          res.result[i].files=JSON.parse(res.result[i].files)
          for(let j=0;j<res.result[i].files.length;j++){
            res.result[i].files[j]['file_exist']=this.UrlExists(res.result[i].files[j].file)
          }
        }
      }
     this.messageList=this.messageList.concat(res.result)
      var _this=this
      setTimeout(function(){ _this.chatElement.nativeElement.scrollTop = _this.chatElement.nativeElement.scrollHeight; }, 500);
       //console.log(this.messageList)
      })
   
  }

  ngOnInit(){
    var rcv= this.getUrlParameter('rcv')
    var appointment_id=this.getUrlParameter('appointment_id')
    this.appointment_id=appointment_id
    if(rcv=='true') {
      var user_id=this.getUrlParameter('user_id')
      if(appointment_id) {
        if(user_id==localStorage.getItem('user_id')) {
          let data={
            user_join:1,
            consultant_join:2
          }
          this.socket.emit('userConsultantJoin',data)
        }
        else{
          let data={
            user_join:2,
            consultant_join:1
          }
          this.socket.emit('userConsultantJoin',data)
        }
      }
      else{
         this.router.navigate(['']).then(() => {
            window.location.reload();
          });
      }
      
    }
    else if(rcv==undefined) {
      if(appointment_id) {
         this.getCredentials(appointment_id,'yes')
      }
      else{
        this.router.navigate(['']).then(() => {
            window.location.reload();
          });
      }
    }
   
  }
    getUrlParameter(sParam) {
      var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

      for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
      }
    }
  acceptCall(user_id,consultant_id,appointment_id){
    if(consultant_id==localStorage.getItem('user_id')) {
      let data={
        user_id:user_id,
        consultant_id:consultant_id,
        appointment_id:appointment_id,
        consultant_join:1,
        service_type:1,
        appointment_start_time:this.call_start_time

      }
      this.commonService.postData(data,'receive/schedule-call').then((result)=>{
        if(result['status_code']==200) {
          //this.autoStatusChange('3',this.consultant_id)
          
        }
        else{

        }
      })
    }
  }
  clearPosParam(appointment_id) {
    this.router.navigate(
      ['.'], 
      { relativeTo: this.activatdRoute, queryParams: { appointment_id: appointment_id} }
    );
  }
  getCredentials(appointment_id,action){
    let data={
      appointment_id:appointment_id
    }
    this.commonService.postData(data,'profile/appointment/get').then((result)=>{
      if(result['status_code']==200) {
          if((localStorage.getItem('user_id')==result['data'].user_id) || (localStorage.getItem('user_id')==result['data'].consultant_id)) {
              this.user_id=result['data'].user_id
              this.consultant_id=result['data'].consultant_id
              this.appointment_id=result['data'].id
              this.amount=result['data'].amount
              this.consultant_profile_name=result['data'].consultant_profile_name
              this.user_profile_name=result['data'].user_profile_name
              this.appointment_start_time=result['data'].appointment_start_time
              this.appointment_end_time=result['data'].appointment_end_time
              this.appointment_type=result['data'].appointment_type
              var difference_in_minute=(new Date(result['data'].appointment_date+' '+this.appointment_end_time).getTime())-(new Date(result['data'].appointment_date+' '+this.appointment_start_time).getTime())
              this.max_call_duration=(difference_in_minute/1000)/60
            moment.tz.setDefault(result['data'].timezone);
            var call_start_time=moment(result['data'].appointment_date+' '+result['data'].appointment_start_time).tz(result['data'].timezone).format("YYYY-MM-DD H:mm:ss")
            var call_end_time=moment(result['data'].appointment_date+' '+result['data'].appointment_end_time).tz(result['data'].timezone).format("YYYY-MM-DD H:mm:ss")
            var current_time=moment().tz(result['data'].timezone).format("YYYY-MM-DD H:mm:ss")
            if(action=='yes') {
              if(result['data'].status=='4' && (new Date(call_start_time).getTime()<=new Date(current_time).getTime()) && (new Date(call_end_time).getTime()>=new Date(current_time).getTime())) {
                moment.tz.setDefault(result['data'].timezone);
                var call_start_time=moment(result['data'].appointment_date+' '+result['data'].appointment_start_time).tz(result['data'].timezone).format("YYYY-MM-DD H:mm:ss")
                var start_time_in_seconds=new Date(call_start_time).getTime()
                var current_time=moment().tz(result['data'].timezone).format("YYYY-MM-DD H:mm:ss")
                var current_time_in_seconds=new Date(current_time).getTime()
                var difference_of_time=(current_time_in_seconds-start_time_in_seconds)/1000

                var call_schedule_start_time=moment(result['data'].appointment_date+' '+result['data'].current_start_time).tz(result['data'].timezone).format("YYYY-MM-DD H:mm:ss")
                var current_schedule_time_in_seconds=new Date(call_schedule_start_time).getTime()
                var difference_of_schedule_time=(current_time_in_seconds-current_schedule_time_in_seconds)/1000
                this.count=difference_of_time
                this.schedule_count=difference_of_schedule_time
                this.startCountDown()
              }
              this.socket.emit('getMessageList',data)
            }
            else{
              console.log(call_start_time)
              console.log(call_end_time)
              console.log(current_time)
            }

          }
      }
      else{
        this.langService.apiFailureAlert(result['message'])
      }
    })
  }
  secondMinute(d){
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    this.hDisplay =(h>9)?h:'0'+h
    this.mDisplay = (m>9)?m:'0'+m;
    this.sDisplay = (s>9)?s:'0'+s;
    //return hDisplay + mDisplay + sDisplay; 
  }
  startCountDown(){
      this.counter = setInterval(timer, 1000); //1000 will  run it every 1 second
      var _this=this
      function timer() {
        _this.count=_this.count+1
        _this.schedule_count=_this.schedule_count+1
        _this.secondMinute(_this.schedule_count)
        var max_call=_this.max_call_duration*60
        if(_this.count==max_call) {
           _this.callAutoDisconnect()
        }
      }
  }
  callAutoDisconnect(){
      clearInterval(this.counter);
      if(localStorage.getItem('user_id')==this.consultant_id) {
        this.disconnectFun('limit_over')
      }
      else{
        this.socket.emit('callAutoDisconnect')
      }
    }
  disconnectFun(action){
    if(action=='normal') {
      clearInterval(this.counter);
    }
    let data={
      user_disconnect:(this.user_id==localStorage.getItem('user_id'))?1:2,
      consult_disconnect:(this.consultant_id==localStorage.getItem('user_id'))?1:2
    }
    this.socket.emit('callDisconnect',data)
    this.appComponent.disConnectSchedule(this.user_id,this.consultant_id,this.appointment_id,this.amount,this.schedule_count,data.user_disconnect,data.consult_disconnect,action,this.max_call_duration);
    
    //this.publishComp.disconnectSession(this.session)
  }
  sendMessage(){
    if(this.comment!=undefined || this.comment!=null || this.comment.trim()!='') {
      let data={
        sender_id:(this.user_id==localStorage.getItem('user_id'))?this.user_id:this.consultant_id,
        receiver_id:(this.user_id==localStorage.getItem('user_id'))?this.consultant_id:this.user_id,
        appointment_id:this.appointment_id,
        comment:this.comment,
        msg_files:this.base64
      }
      console.log(data)
      this.socket.emit('sendMessage',data)
      this.comment=''
    }
    else{
      this.langService.failureAlert('msg_validation')
    }
  }
  sendAttachment(){
    if(this.base64.length>0) {
      let data={
        sender_id:(this.user_id==localStorage.getItem('user_id'))?this.user_id:this.consultant_id,
        receiver_id:(this.user_id==localStorage.getItem('user_id'))?this.consultant_id:this.user_id,
        appointment_id:this.appointment_id,
        comment:'',
        msg_files:this.base64
      }
     // console.log(data)
      this.socket.emit('sendMessage',data)
      this.base64=[]
      $('.message-file-upload').removeClass('active')
    }
    else{
      this.langService.failureAlert('file_validation')
    }
  }
  onFileChange(event) {
    var name=[];
    var newname:any;
    var fileData:any;
    var that=this;
    if (event.target.files && event.target.files.length > 0) {
      fileData = event.target.files;

      $(fileData).each(function(i, obj) {
        name.push(obj.name);
      });
      newname = name.join(' | ');
      $('#filename').html(newname);

      $.each(fileData , function(index, val) {
        let reader = new FileReader(); 
        reader.readAsDataURL(val);
        reader.onload = () => {
          that.base64.push({file:reader.result,name:val.name,fileName:new Date().getTime()+'-'+val.name,type:val.type,size:that.formatBytes(val.size,2)});
        };
      });
    }
  }
  removeFile(index){
    this.base64.splice(index,1)
  }
  manageAttachment(type){
    if(type=='show') {
      $('.message-file-upload').addClass('active')
    }
    else{
      $('.message-file-upload').removeClass('active')
    }
  }
  formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  UrlExists(url){  
    var full_url=this.baseUrl+url
    var http = new XMLHttpRequest();
    http.open('HEAD', full_url, false);
    http.send();
    if(http.status==200) {
      return true;
    }
    else{
      return false;
    }
  }
}
