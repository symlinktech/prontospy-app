import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserinfoService } from '../userinfo.service';
import { AuthGuardService } from '../../../auth-guard.service';
import { LanguageService } from '../../../i18n/language.service';

declare var $;
declare var moment;
declare var tz;
@Component({
  selector: 'app-daily-time',
  templateUrl: './daily-time.component.html',
  styleUrls: ['./daily-time.component.scss'],
	encapsulation:ViewEncapsulation.None
})
export class DailyTimeComponent implements OnInit {
scheduleList=[{id:1,day:'monday',value:'00:00'},
	{id:2,day:'tuesday',value:'00:00'},
	{id:3,day:'wednesday',value:'00:00'},
	{id:4,day:'thursday',value:'00:00'},
	{id:5,day:'friday',value:'00:00'},
	{id:6,day:'saturday',value:'00:00'},
	{id:7,day:'sunday',value:'00:00'}]
	TimeTableList:any=[];
	id:any;
	day:any;
	day_number:any;
	first_half_from:any;
	first_half_to:any;
	second_half_from:any;
	second_half_to:any;
	first_half_close:any;
	second_half_close:any;
	interval_duration:any;
	schedule_duration:any;
	last_attempt_duration:any;
	offset:any;
	current_date:any;
	count=0
  constructor(public userinfoService:UserinfoService,public authGuard:AuthGuardService,public langService:LanguageService) { }

	ngOnInit() {
		var tz = localStorage.getItem('user_timezone');
		moment.tz.setDefault(tz);
		 $('.preloader').fadeIn(300);
		this.offset=localStorage.getItem('user_offset')
		this.current_date=moment().tz(tz).format("YYYY-MM-DD")
		console.log(this.current_date)
	  	this.getProfileDetails();
	  	this.getTimetable();
	}
  	ngAfterViewInit(){
  		$('.timepicker').datetimepicker({format:'H:i',formatTime:'H:i',defaultTime:'00:00',step:1,datepicker:false,scrollMonth : false,
    	scrollInput : false,inline:false,lang:'en'});
    	$('.timepicker-1').datetimepicker({format:'H:i',formatTime:'H:i',defaultTime:'00:00',step:1,datepicker:false,inline:false,lang:'en',scrollMonth : false,
    	scrollInput : false});
  	}
  	
  	getProfileDetails(){
	    let data={
	      id:localStorage.getItem('user_id'),
	      
	    }
    	this.userinfoService.postData(data,'profile/get').then((result)=>{
	      if(result['status_code']==200){
	//========================================Account Info===============================================
	        this.interval_duration=result['data'].interval_duration
			this.schedule_duration=result['data'].schedule_duration
			this.last_attempt_duration=result['data'].last_attempt_duration

	//===================================================================================================
	      }
	      else{
		        this.langService.apiFailureAlert(result['message'])
		    }
    	})
  	}
  	getTimetable(){
	  	let data={
	  		id:localStorage.getItem('user_id')
	  	}
	  	this.userinfoService.postData(data,'profile/daily-timetable/get').then((result)=>{
	  		if(result['status_code']==200) {
	  			this.TimeTableList=result['data']
	  			for(let i=0;i<this.TimeTableList.length;i++){
	  				if(this.TimeTableList[i].first_from) {
	  					//this.TimeTableList[i].first_from=new Date("01/01/2007 " + this.TimeTableList[i].first_from).getHours()+':'+new Date("01/01/2007 " + this.TimeTableList[i].first_from).getMinutes()
	  					//this.TimeTableList[i].first_from=moment("01/01/2007 " + this.TimeTableList[i].first_from).format("H:mm")
	  				}
	  				else{
	  					this.TimeTableList[i].first_from='00:00'
	  				}

	  				if(this.TimeTableList[i].second_from) {
	  					//this.TimeTableList[i].second_from=moment("01/01/2007 " + this.TimeTableList[i].second_from).format("H:mm")
	  					//this.TimeTableList[i].second_from=new Date("01/01/2007 " + this.TimeTableList[i].second_from).getHours()+':'+new Date("01/01/2007 " + this.TimeTableList[i].second_from).getMinutes()
	  				}
	  				else{
	  					this.TimeTableList[i].second_from='00:00'
	  				}

	  				if(this.TimeTableList[i].first_to) {
	  					//this.TimeTableList[i].first_to=moment("01/01/2007 " + this.TimeTableList[i].first_to).format("H:mm")
	  					//this.TimeTableList[i].first_to=new Date("01/01/2007 " + this.TimeTableList[i].first_to).getHours()+':'+new Date("01/01/2007 " + this.TimeTableList[i].first_to).getMinutes()
	  				}
	  				else{
	  					this.TimeTableList[i].first_to='00:00'
	  				}
	  				
	  				if(this.TimeTableList[i].second_to) {
	  					//this.TimeTableList[i].second_to=moment("01/01/2007 " + this.TimeTableList[i].second_to).format("H:mm")
	  					//this.TimeTableList[i].second_to=new Date("01/01/2007 " + this.TimeTableList[i].second_to).getHours()+':'+new Date("01/01/2007 " + this.TimeTableList[i].second_to).getMinutes()
	  				}
	  				else{
	  					this.TimeTableList[i].second_to='00:00'
	  				}
	  				
	  				if(this.TimeTableList[i].first_is_close=="2") {
	  					this.TimeTableList[i]['first_is_checked']=true;
			          //$("input[name='first_close']").prop("checked", true)
			        }
			        if(this.TimeTableList[i].second_is_close=="2") {
			        	this.TimeTableList[i]['second_is_checked']=true;
			          //$("input[name='second_close']").prop("checked", true)
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
	initializeFun(){
		if(this.count==0) {
			console.log('hi')
			$('.timepicker-1').datetimepicker({format:'H:i',formatTime:'H:i',defaultTime:'00:00',step:1,datepicker:false,inline:false,lang:'en',scrollMonth : false,
    	scrollInput : false});
			this.count++
		}
		
	}
	updateSchedule(){
		this.id=[];
		this.day=[];
		this.day_number=[];
		this.first_half_from=[];
		this.first_half_to=[];
		this.second_half_from=[];
		this.second_half_to=[];
		this.first_half_close=[];
		this.second_half_close=[];
		var that=this
		$( ".schedule_list" ).each(function( index ) {
	      that.id.push($(this).find('input[name="id"]').val())

	      that.day.push($(this).find('input[name="day"]').val())

	      that.day_number.push($(this).find('input[name="day_number"]').val())

	      that.first_half_from.push(that.current_date+' '+$(this).find('input[name="first_half_from"]').val())

	      that.first_half_to.push(that.current_date+' '+ $(this).find('input[name="first_half_to"]').val())

	      var first_close=(($(this).find("input[name='first_close']").is(":checked")==true)?'2':'1')
	      that.first_half_close.push(first_close)

	      that.second_half_from.push(that.current_date+' '+$(this).find('input[name="second_half_from"]').val())

	      that.second_half_to.push(that.current_date+' '+ $(this).find('input[name="second_half_to"]').val())

	      var second_close=(($(this).find("input[name='second_close']").is(":checked")==true)?'2':'1')

	      that.second_half_close.push(second_close)

	    });
	    let data={
	    	id:this.id,
	    	day_name:this.day,
			day_number:this.day_number,
			first_is_close:this.first_half_close,
			first_from:this.first_half_from,
			first_to:this.first_half_to,
			second_is_close:this.second_half_close,
			second_from:this.second_half_from,
			second_to:this.second_half_to,
			user_id:localStorage.getItem('user_id'),
			interval_duration:this.interval_duration,
			schedule_duration:this.schedule_duration,
			last_attempt_duration:this.last_attempt_duration,
			timezone:localStorage.getItem('user_timezone')
	    }
	    //console.log(data)
	    this.userinfoService.postData(data,'profile/daily-timetable/update').then((result)=>{
	    	if(result['status_code']==200) {
	    		this.langService.apiSuccessAlert(result['message'])
	    		//window.location.reload()
	    	}
	    	else{
	    		this.langService.apiFailureAlert(result['message'])
	    	}
	    })
	}
	
}
