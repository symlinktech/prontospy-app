import { Component, OnInit } from '@angular/core';
import { ChangePasswordService } from './change-password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../i18n/language.service';
declare var $;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
confirm_password:any;
password:any;
user_id:any;
  constructor(public changepassService:ChangePasswordService,public router:Router,public activatedRoute:ActivatedRoute,public langService:LanguageService) { }

  ngOnInit() {
  	this.activatedRoute.queryParams.subscribe((res)=>{
  		this.user_id=res.user_id;
  	})	
  }

  updatePass(){
  	let data={
  		password:this.password,
  		password_confirmation:this.confirm_password,
  		user_id:this.user_id
  	}
  	this.changepassService.postData(data,'user/change-password').then((result)=>{
  		if(result['status_code']==200) {
        this.langService.apiSuccessAlert(result['message'])
  			this.router.navigateByUrl('/login')
  		}
  		else{
        this.langService.apiFailureAlert(result['message'])
  		}
  	})
  }
}
