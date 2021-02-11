import { Component, OnInit } from '@angular/core';
import { ForgotPasswordService } from './forgot-password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../i18n/language.service';
declare var $;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
email:any;
  constructor(public forgotService:ForgotPasswordService,public router:Router,public langService:LanguageService) { }

  ngOnInit() {
  }
  sendOtp(){
  	let data={
  		email:this.email
  	}
  	this.forgotService.postData(data,'user/forget-password').then((result)=>{
  		if(result['status_code']==200) {
        this.langService.apiSuccessAlert(result['message'])
  			this.router.navigate(['/verification'],{queryParams:{user_id:result['data'].user_id,email:result['data'].email,forgot:'true'},skipLocationChange: true})
  		}
  		else{
         this.langService.apiFailureAlert(result['message'])
  		}
  	})
  }
}
