import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuardService } from '../../auth-guard.service';
import { LanguageService } from '../../i18n/language.service';
import { DatePipe } from '@angular/common';
import { CommonService } from '../../common.service';

declare var $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
email:any;
password:any;
showspinner=false;
  constructor(public loginService:LoginService, public router:Router,public authGuard:AuthGuardService,public langService:LanguageService,private datePipe: DatePipe,public commService:CommonService) { }

  ngOnInit() {
     // var remember = $.cookie('remember');
     //    if (remember == 'true') 
     //    {
     //      var username = $.cookie('username');
     //      var password = $.cookie('password');
     //      // autofill the fields
     //      $('#email').val(username);
     //      $('#password').val(password);
     //    }
  }

  Signin(){
    //this.showspinner=true
  	let data={
  		email:this.email,
  		password:this.password
  	}
  	this.loginService.postData(data,'user/login').then((result)=>{
  		if(result['status_code']==200) {
        this.commService.setProfileImage(result['data'].image)
        localStorage.setItem('user_email',result['data'].email)
        localStorage.setItem('first_name',result['data'].firstname)
        localStorage.setItem('last_name',result['data'].lastname)
        localStorage.setItem('user_id',result['data'].id)
        localStorage.setItem('role',result['data'].role)
        localStorage.setItem('user_timezone',result['data'].timezone)
        localStorage.setItem('user_offset',result['data'].offset)
        localStorage.setItem('image',result['data'].image)
        localStorage.setItem('active_staus',result['data'].active_staus)
        this.autoStatusChange()
        // let options = {
        //   timeZone: result['data'].timezone,
        //   year: 'numeric',
        //   month: 'numeric',
        //   day: 'numeric',
        //   format:'YYYY-MM-DD'
        //   }, 

        //   formatter = new Intl.DateTimeFormat([],options);
        //   var datePipeString = this.datePipe.transform(formatter.format(new Date()),'yyyy-MM-dd');
        //   localStorage.setItem('today_date',datePipeString)
          this.authGuard.isLogged();
          //this.showspinner=true
          this.langService.apiSuccessAlert(result['message'])
    			this.router.navigateByUrl((result['data'].role=='consultant')?'/account/consultant/myprofile/personal-info':'/account/client/myprofile/personal-info')
  		}
  		else{
  			if(result['data']) {
          if(result['data'].email_verification=='2') {
            this.router.navigate(['/verification'],{queryParams:{user_id:result['data'].user_id,email:result['data'].email,resend:'true'},skipLocationChange: true})
          }
  			}
  			else{
  				this.langService.apiFailureAlert(result['message'])
  			}
  		}
  	})
  }
    autoStatusChange(){
      if(localStorage.getItem('role')=='consultant') {
        let data={
          id:localStorage.getItem('user_id'),
          status:1
        }
        this.loginService.postData(data,'profile/update-status').then((result)=>{
          if(result['status_code']==200) {
            localStorage.setItem('active_status',result['data'].active_staus)
          }
          else{

          }
        })
      }
    }
}
