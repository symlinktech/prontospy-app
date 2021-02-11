import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../i18n/language.service';

declare var $;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
name:any='dashboard';
past_appointment:any;
upcoming_appointment:any;
feedback:any;
role=localStorage.getItem('role')
  constructor(public router:Router, public dashboardService:DashboardService,public translate: TranslateService,public langService:LanguageService) { }

  ngOnInit() {
    $('.preloader').fadeIn(300);
    this.getCounts()
  }
  getCounts(){
  	let data={
  		user_id:localStorage.getItem('user_id'),
  		
  	}
  	this.dashboardService.postData(data,'dashboard/get').then((result)=>{
  		if(result['status_code']==200) {
  			this.past_appointment=result['data'].pastAppointments
        this.upcoming_appointment=result['data'].upcomingAppointments
        this.feedback=result['data'].feedback
        $('.preloader').fadeOut(300);
  		}
  		else{
        $('.preloader').fadeOut(300);
  			this.langService.apiFailureAlert(result['message'])
  		}
  	})
  }
}
