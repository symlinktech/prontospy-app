import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { VerificationService } from './verification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../i18n/language.service';

declare var $;
@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {
entered_otp:any='';
user_id:any;
email:any;
resend:any;
forgot:any;
  constructor(public verifyService:VerificationService,public router:Router,public activatedRoute:ActivatedRoute,public langService:LanguageService) { }

  ngOnInit() {
  	this.activatedRoute.queryParams.subscribe((res)=>{
  		this.user_id=res.user_id;
      this.email=res.email;
      this.resend=res.resend;
      this.forgot=res.forgot;
      if(this.resend=='true') {
        this.resendOtp();
      }
  	})	
  }

  verifyOtp(){
  	let data={
  		otp:this.entered_otp,
  		user_id:this.user_id,
      type:'email'
  	}
  	this.verifyService.postData(data,'user/email-phone-verify').then((result)=>{
  		if(result['status_code']==200) {
        if(this.forgot=='true') {
           this.router.navigate(['/change-password'],{queryParams:{user_id:this.user_id},skipLocationChange: true})
        }
        else{
          this.langService.apiSuccessAlert(result['message'])
          this.router.navigateByUrl('/login')
        }
  			
  		}
  		else{
          this.langService.apiFailureAlert(result['message'])
  		}
  	})
  }
  resendOtp(){
  	let data={
  		user_id:this.user_id,
      type:'email',
      email:this.email
  	}
  	this.verifyService.postData(data,'user/resend-otp').then((result)=>{
  		if(result['status_code']==200) {
  			this.langService.apiSuccessAlert(result['message'])
  		}
  		else{
  			this.langService.apiFailureAlert(result['message'])
  		}
  	})
  }
}
