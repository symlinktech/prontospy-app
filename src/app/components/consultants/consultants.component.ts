  import { Component, OnInit, NgZone } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { ConsultantService } from './consultant.service';
  import { Socket } from 'ngx-socket-io';
  import { LanguageService } from '../../i18n/language.service';
  import { TranslateService } from '@ngx-translate/core';
  import { OpentokService } from '../../opentok.service';
	import { Options } from '@angular-slider/ngx-slider';
  declare var $;
  declare var moment;
  declare var tz;
  @Component({
    selector: 'app-consultants',
    templateUrl: './consultants.component.html',
    styleUrls: ['./consultants.component.scss']
  })
  export class ConsultantsComponent implements OnInit {
		minValue: number = 0;
  	maxValue: number = 100;
		options: Options = {
			floor: 0,
			ceil: 100,
			draggableRange: true,
		};
		sorting:any;
    consultantList:any;
    SpecializationList:any;
    NationalityList:any;
    LanguageList:any;
    InterventionList:any;
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
    direct_access_mode:any;
    current_date:any;
    consultant_timezone:any;
    consultant_name:any;
    consultant_email:any;
    consultant_professional_qualifications:any;
    consultant_image:any;
    filter_search=false;
    role=localStorage.getItem('role')
    comm_mode:any;
    showspinner=false;
    calling_button_text='continue';
    action='AuthorisePayment';
    calling_button_disable=false;
		country_code:any;
		country_name:any;
    constructor(public router:Router, public activatedRoute:ActivatedRoute,public translate:TranslateService,public consultantService:ConsultantService,public langService: LanguageService, public ngZone:NgZone,public socket:Socket,public opentokService:OpentokService) { }

    ngOnInit() {
      $('.preloader').fadeIn(300);
      this.current_date=localStorage.getItem('today_date')
      this.activatedRoute.queryParams.subscribe((res)=>{
        if(res.search) {
          this.getConsultants(JSON.parse(res.data))
        }
        else{
          this.getConsultants('')
        }
      })
      this.getSpecializationList();
      this.getCountryList();
      this.getLanguageList();
      this.getInterventionList();
      var that=this;
      $('.consultant-filter .filter-content-wrap').slideToggle(300);
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
      $('#booking_date').datetimepicker({format:'Y-m-d',timepicker:false,inline:false,lang:this.translate.currentLang,scrollMonth : false,
    scrollInput : false,minDate: new Date(),onSelectDate:function () {
        that.getTimeSlot(); 
      }});
      // $('.select2').select2();
      // $('.select2-multiple').select2({placeholder: " - Select Category - "});
      // $('.select2-nosearch').select2({minimumResultsForSearch: -1});
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
    navigatePage(data){
      this.router.navigate(['/consultant-details'],{queryParams:{id:data.id}})
    }
    getConsultants(search_data){
      let data;
      if(search_data) {
        data=search_data
      }
      else{
        data={
          user_id:localStorage.getItem('user_id')?localStorage.getItem('user_id'):0
        }
      }
      
      this.consultantService.postData(data,'consultant/list').then((result)=>{
        if(result['status_code']==200) {
          this.consultantList=result['data']
          var tz = localStorage.getItem('user_timezone');
          
          for(let i=0;i<this.consultantList.length;i++){
            this.consultantList[i]['can_call']=true
            moment.tz.setDefault(this.consultantList[i].zone);
            if(this.consultantList[i].appointment_dates) {
              var current_time=moment().format("YYYY-MM-DD h:mm:ss A")
               var appointment_dates_arr=this.consultantList[i].appointment_dates.split(",")
                for(let j=0;j<appointment_dates_arr.length;j++){
                  var splitted_time=appointment_dates_arr[j].split(" ")

                  var today_date=moment(new Date()).format("YYYY-MM-DD")
                  var added_time=moment(today_date+' '+splitted_time[0]).add(this.consultantList[i].direct_last_attempt_duration, 'minutes').format("YYYY-MM-DD h:mm:ss A")                   
                  var formatted_time=moment(today_date+' '+splitted_time[0]).format("YYYY-MM-DD  h:mm:ss A")

                  // console.log('current_time '+current_time)
                  // console.log('start_time '+formatted_time)
                  // console.log('end_time '+added_time)
                  
                  if(new Date(current_time).getTime()>=new Date(formatted_time).getTime() && new Date(current_time).getTime()<=new Date(added_time).getTime()) {
                   this.consultantList[i]['can_call']=false
                  }
                }
            }
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
          $('.preloader').fadeOut(300);
        }
        else{
           $('.preloader').fadeOut(300);
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }
    clearSearch(){
      $('#country').val('')
      $('#language').val('')
      this.keyword=''
      $('#intervention_ids').val('')
      $('#therapeutic_ids').val('')
      $('#mental_ids').val('')
      $('#psycho_ids').val('')
      $('#others_ids').val('')
			$('#sorting').val('')
      this.gender=''
      this.status='';
      this.filter_search=false;
      this.getConsultants('')
    }
    searchConsultant(){
			//console.log(this.minValue+' | '+this.maxValue);
			//console.log($('#sorting').val());
      $('.preloader').fadeIn(300);
      let data={
        nationality_id:$('#nationality').val(),
        language_ids:$('#language').val(),
        keyword:this.keyword,
        intervention_ids:$('#intervention_ids').val(),
        specialization_therapeutic_ids:$('#therapeutic_ids').val(),
        specialization_mental_ids:$('#mental_ids').val(),
        specialization_psycho_ids:$('#psycho_ids').val(),
        specialization_others_ids:$('#others_ids').val(),
        gender:this.gender,
        active_status:this.status,
        mode:this.comm_mode,
        user_id:localStorage.getItem('user_id')?localStorage.getItem('user_id'):0,
				min_price:this.minValue,
				max_price:this.maxValue,
				sortby:$('#sorting').val()
      }
      this.consultantService.postData(data,'consultant/list').then((result)=>{
        if(result['status_code']==200) {
          this.filter_search=true;
          this.consultantList=result['data']
          for(let i=0;i<this.consultantList.length;i++){
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
          $('.preloader').fadeOut(300);
        }
        else{
          $('.preloader').fadeOut(300);
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }
    addWishlist(consultant_id,index,type){
      if(localStorage.getItem('user_id')) {
          let data={
            user_id:localStorage.getItem('user_id'),
            consultant_id:consultant_id
          }
          this.consultantService.postData(data,'wishlist/add').then((result)=>{
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
          this.consultantService.postData(data,'email/send').then((result)=>{
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
			console.log(data);
      this.country_name=data.country_name
      this.country_code=data.nationality_code
      this.consultant_image=data.image
      this.consultant_name=data.profile_name
      this.consultant_email=data.email
      this.consultant_professional_qualifications=data.professional_qualifications
      this.instantCommuType=type;
      this.consultant_id=data.id;
      this.consultant_timezone=data.zone
      localStorage.setItem('consultant_status',data.active_status)
      if(localStorage.getItem('user_id') && data.stripe_customer_id) {
        this.currency=data.currency;
        this.price=data.price;
        if(data.mode) {
          var mode_splited=data.mode.split(",")
          this.modes=mode_splited
          // var mode_name=[]
          // for (let j = 0; j < mode_splited.length; j++) {
          //   if(mode_splited.indexOf('1')>-1 && mode_name.indexOf('Chat') == -1) {
          //     mode_name.push('Chat')
          //   }
          //   else if(mode_splited.indexOf('2')>-1 && mode_name.indexOf('Audio') == -1) {
          //     mode_name.push('Audio')
          //   }
          //   else if(mode_splited.indexOf('3')>-1 && mode_name.indexOf('Audio-Video') == -1) {
          //     mode_name.push('Audio-Video')
          //   }
          // }
          // this.modes=mode_name
        }
        $("#conversation_modal").modal('show');

      }
      else if(localStorage.getItem('user_id') && data.stripe_customer_id==null) {
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
            user_join:1,
          }
          console.log(data)
          this.consultantService.postData(data,'connect/instant-call').then((result)=>{
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
            this.consultantService.postData(data,'connect/instant-call').then((result)=>{
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
          country_name:this.country_name,
          country_code:this.country_code,
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
          this.consultantService.postData(data,'profile/consultant-sevice/get').then((result)=>{
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
      moment.tz.setDefault(localStorage.getItem('user_timezone'));
      let data={
        id:this.id,
        date:$('#booking_date').val(),
      }
      this.consultantService.postData(data,'consultant/time-slot').then((result)=>{
        if(result['status_code']==200) {
          this.TimeSlot=result['data'].allTimeSlot
          if(this.TimeSlot.length>0) {
            this.consultant_timezone=result['data'].timezone
            //console.log(tz)
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
        this.consultantService.postData(data,'consultant/booking-appointment').then((result)=>{
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
    getSpecializationList(){
      let data={
        
      }
      this.consultantService.postData(data,'specialization/list').then((result)=>{
        if(result['status_code']==200) {
          this.SpecializationList=result['data'];
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }

    getCountryList(){
      let data={
        
      }
      this.consultantService.postData(data,'nationality/list').then((result)=>{
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
      this.consultantService.postData(data,'language/list').then((result)=>{
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
      this.consultantService.postData(data,'intervention/list').then((result)=>{
        if(result['status_code']==200) {
          this.InterventionList=result['data'];

        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }
  }
